// 404 shark: a real 3D great white looming out of the dark.
// Bundled with three.js into js/shark3d.js by `npm run build:shark`
// (self-hosted: no CDN, so no third party sees visitors).
//
// Model: "Great White Shark Attack Bite Animation Loop" by LasquetiSpice,
// CC BY 4.0 — https://sketchfab.com/3d-models/great-white-shark-attack-bite-animation-loop-936d4110b39945f5a46cb2d831ece920
// Optimised to img/abyss/shark.glb (meshopt + WebP); see README.
import {
  AdditiveBlending,
  AmbientLight,
  AnimationMixer,
  Box3,
  CanvasTexture,
  Clock,
  Color,
  DirectionalLight,
  FogExp2,
  Group,
  MathUtils,
  PerspectiveCamera,
  Scene,
  SRGBColorSpace,
  Sprite,
  SpriteMaterial,
  Vector3,
  WebGLRenderer,
} from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { MeshoptDecoder } from "three/examples/jsm/libs/meshopt_decoder.module.js";

// One loop of the choreography, in seconds
const LOOP = 19;
const FAR = 32; // start/end distance (hidden in the fog)
const NEAR = 4.4; // closest approach

const ease = (t) => t * t * (3 - 2 * t);

function glowTexture() {
  const c = document.createElement("canvas");
  c.width = c.height = 64;
  const g = c.getContext("2d");
  const r = g.createRadialGradient(32, 32, 0, 32, 32, 32);
  r.addColorStop(0, "rgba(255,255,220,1)");
  r.addColorStop(0.25, "rgba(220,255,120,0.9)");
  r.addColorStop(1, "rgba(200,255,90,0)");
  g.fillStyle = r;
  g.fillRect(0, 0, 64, 64);
  const t = new CanvasTexture(c);
  t.colorSpace = SRGBColorSpace;
  return t;
}

// Any CSS colour (incl. oklch) → sRGB hex, via a 1px canvas
function cssToHex(css) {
  const c = document.createElement("canvas");
  c.width = c.height = 1;
  const g = c.getContext("2d");
  g.fillStyle = css;
  g.fillRect(0, 0, 1, 1);
  const [r, gg, b] = g.getImageData(0, 0, 1, 1).data;
  return (r << 16) | (gg << 8) | b;
}

// GLTFLoader sanitises node names ("Head.5_5" → "Head5_5"), so find
// bones by their base name followed by the Sketchfab index digits
function bone(root, base) {
  const re = new RegExp(`^${base}\\d`);
  let hit = null;
  root.traverse((o) => {
    if (!hit && re.test(o.name)) hit = o;
  });
  if (!hit) throw new Error(`bone ${base} not found`);
  return hit;
}

export async function mount(host, { src, waterColor, light, onReady }) {
  const renderer = new WebGLRenderer({
    antialias: true,
    alpha: true,
    powerPreference: "low-power",
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
  renderer.outputColorSpace = SRGBColorSpace;
  renderer.setClearColor(0x000000, 0);
  host.appendChild(renderer.domElement);

  const scene = new Scene();
  const water = new Color(cssToHex(waterColor));
  scene.fog = new FogExp2(water, light ? 0.06 : 0.065);

  const camera = new PerspectiveCamera(38, 1, 0.1, 200);
  camera.position.set(0, 0, 0);
  camera.lookAt(0, 0, -10);

  // Cold light from the surface above, a faint fill from below
  const ambient = new AmbientLight(0x6fa8b8, light ? 1.1 : 0.75);
  scene.add(ambient);
  const sun = new DirectionalLight(0xbfefff, 2.6);
  sun.position.set(0.4, 10, 2);
  scene.add(sun);
  const under = new DirectionalLight(0x1d4b5c, 0.5);
  under.position.set(0, -6, -2);
  scene.add(under);

  const loader = new GLTFLoader();
  loader.setMeshoptDecoder(MeshoptDecoder);
  const gltf = await loader.loadAsync(src);
  const model = gltf.scene;

  // Normalise: size by the skinned bounding box, then point the head at
  // the camera using the Head and last Spine bones
  model.updateMatrixWorld(true);
  const box = new Box3().setFromObject(model, true);
  const size = box.getSize(new Vector3());
  const scale = 8.5 / Math.max(size.x, size.y, size.z);
  model.scale.setScalar(scale);
  model.updateMatrixWorld(true);
  const head = new Vector3();
  const tail = new Vector3();
  bone(model, "Head").getWorldPosition(head);
  bone(model, "Spine7").getWorldPosition(tail);
  const dir = head.sub(tail).setY(0).normalize();
  // rotate so the tail→head direction points at the camera (+Z)
  model.rotation.y = Math.atan2(dir.x, dir.z) * -1;
  model.updateMatrixWorld(true);
  const centre = new Box3().setFromObject(model, true).getCenter(new Vector3());
  model.position.sub(centre);

  const rig = new Group();
  rig.add(model);
  scene.add(rig);

  // Faint bioluminescent eyes, riding the eye bones
  const eyeMat = new SpriteMaterial({
    map: glowTexture(),
    blending: AdditiveBlending,
    depthWrite: false,
    fog: false,
    transparent: true,
    opacity: 0.85,
  });
  ["L_Eye", "R_Eye"].forEach((name) => {
    const s = new Sprite(eyeMat);
    s.scale.setScalar(1.1 / scale);
    bone(model, name).add(s);
  });

  const mixer = new AnimationMixer(model);
  const bite = mixer.clipAction(gltf.animations[0]);
  bite.play();

  const resize = () => {
    const w = host.clientWidth;
    const h = host.clientHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    // phones: pull back a little so the head fits the narrow frame
    camera.fov = w < 700 ? 52 : 38;
    camera.updateProjectionMatrix();
  };
  resize();
  window.addEventListener("resize", resize);

  const clock = new Clock();
  // start mid-fog so the first approach comes soon (?shark-t= for tests)
  const q = new URLSearchParams(location.search);
  const tParam = parseFloat(q.get("shark-t"));
  let t = Number.isFinite(tParam) ? tParam : 4;
  const frozen = q.has("shark-freeze");
  let running = true;
  let ready = false;

  const frame = () => {
    if (!running) return;
    const dt = frozen ? 0 : Math.min(clock.getDelta(), 0.05);
    t = (t + dt) % LOOP;

    // 0–8 approach from the right · 8–11 lunge + bite · 11–16 turn and
    // swim off past the left edge · 16–19 gone (reset far right)
    // x is in units of the visible half-width at that depth, so "right of
    // the dive computer" holds on every screen size.
    const halfW = (d) =>
      Math.tan(MathUtils.degToRad(camera.fov / 2)) * d * camera.aspect;
    let z;
    let xr; // -1 = left edge, 0 = centre, 1 = right edge
    let yaw; // 0 = facing us, -π/2 = facing left
    let speed;
    if (t < 8) {
      const k = ease(t / 8);
      z = MathUtils.lerp(FAR, NEAR + 2.2, k);
      xr = MathUtils.lerp(0.55, 0.34, k);
      yaw = -0.22;
      speed = 0.25;
    } else if (t < 11) {
      const k = (t - 8) / 3;
      z = MathUtils.lerp(NEAR + 2.2, NEAR, Math.sin(k * Math.PI));
      xr = MathUtils.lerp(0.34, 0.26, k);
      yaw = MathUtils.lerp(-0.22, -0.4, k);
      speed = 1;
    } else if (t < 16) {
      const k = (t - 11) / 5;
      z = MathUtils.lerp(NEAR + 2.2, NEAR + 5, k);
      // accelerate out past the left edge (body length clears the frame)
      xr = MathUtils.lerp(0.26, -2.4, k * k);
      yaw = MathUtils.lerp(-0.4, -1.45, ease(Math.min(1, k * 1.6)));
      speed = 0.6;
    } else {
      z = FAR;
      xr = 0.55;
      yaw = -0.22;
      speed = 0.2;
    }
    rig.position.set(xr * halfW(z), 1.15 + Math.sin(t * 0.5) * 0.15, -z);
    rig.rotation.y = yaw + Math.sin(t * 0.4) * 0.05;
    rig.rotation.x = Math.sin(t * 0.27) * 0.04;
    bite.timeScale = speed;
    mixer.update(dt);

    // eyes fade in only when the shark is close enough to matter
    eyeMat.opacity =
      t >= 16 ? 0 : MathUtils.clamp((FAR - z) / (FAR - NEAR - 4), 0, 1) * 0.85;

    renderer.render(scene, camera);
    if (!ready) {
      ready = true;
      onReady?.();
    }
    requestAnimationFrame(frame);
  };
  requestAnimationFrame(frame);

  // Pause off-screen tabs
  document.addEventListener("visibilitychange", () => {
    running = !document.hidden;
    if (running) {
      clock.getDelta();
      requestAnimationFrame(frame);
    }
  });

  return {
    // live theme switch: re-tint the fog and the light levels
    setTheme(isLight, css) {
      scene.fog.color.set(cssToHex(css));
      scene.fog.density = isLight ? 0.06 : 0.065;
      ambient.intensity = isLight ? 1.1 : 0.75;
      sun.intensity = 2.6;
    },
  };
}
