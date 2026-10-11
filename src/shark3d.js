// 404 scene: real 3D deep-sea animals looming out of the dark.
// Bundled with three.js into js/shark3d.js by `npm run build:shark`
// (self-hosted: no CDN, so no third party sees visitors).
//
// Models (CC BY 4.0, credits in README and on the page):
//   "Animated Swimming Great White Shark Loop" by LasquetiSpice
//   (swim + bite clips), "Anglerfish" by Abby_Holzworth1.
// Optimised to img/abyss/*.glb (meshopt + WebP).
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
  PointLight,
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
const LOOP = 31; // 16 s of action + 15 s of empty water
const FAR = 32; // start/end distance (hidden in the fog)
const NEAR = 4.8; // reference depth; it never comes closer than NEAR + 1.6

const ease = (t) => t * t * (3 - 2 * t);

function glowTexture(
  mid = "rgba(220,255,120,0.9)",
  edge = "rgba(200,255,90,0)",
) {
  const c = document.createElement("canvas");
  c.width = c.height = 64;
  const g = c.getContext("2d");
  const r = g.createRadialGradient(32, 32, 0, 32, 32, 32);
  r.addColorStop(0, "rgba(255,255,220,1)");
  r.addColorStop(0.25, mid);
  r.addColorStop(1, edge);
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
// bones by base name + Sketchfab index digits ("Head5_5", "Esca7_07")
function bone(root, base) {
  const re = new RegExp(`^${base}_?\\d`);
  let hit = null;
  root.traverse((o) => {
    if (!hit && re.test(o.name)) hit = o;
  });
  if (!hit) throw new Error(`bone ${base} not found`);
  return hit;
}

// Fade a whole model in/out through its materials (the canvas is shared)
function fader(root) {
  const mats = [];
  root.traverse((o) => {
    if (!o.material) return;
    (Array.isArray(o.material) ? o.material : [o.material]).forEach((m) => {
      m.transparent = true;
      mats.push(m);
    });
  });
  let last = -1;
  return (v) => {
    if (v === last) return;
    last = v;
    mats.forEach((m) => (m.opacity = v));
    root.visible = v > 0.001;
  };
}

// Size a model, turn its tail→head axis to `facing`, centre it
function normalise(model, length, headBone, tailBone, facing) {
  model.updateMatrixWorld(true);
  const size = new Box3().setFromObject(model, true).getSize(new Vector3());
  const scale = length / Math.max(size.x, size.y, size.z);
  model.scale.setScalar(scale);
  model.updateMatrixWorld(true);
  const head = new Vector3();
  const tail = new Vector3();
  bone(model, headBone).getWorldPosition(head);
  bone(model, tailBone).getWorldPosition(tail);
  const dir = head.sub(tail).setY(0).normalize();
  model.rotation.y = Math.atan2(facing.x, facing.z) - Math.atan2(dir.x, dir.z);
  model.updateMatrixWorld(true);
  const centre = new Box3().setFromObject(model, true).getCenter(new Vector3());
  model.position.sub(centre);
  return scale;
}

export async function mount(
  host,
  { src, anglerSrc, waterColor, light, onReady },
) {
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
  const [gltf, angler] = await Promise.all([
    loader.loadAsync(src),
    anglerSrc ? loader.loadAsync(anglerSrc).catch(() => null) : null,
  ]);
  const model = gltf.scene;
  // face the camera (+Z)
  const scale = normalise(model, 8.5, "Head", "Spine7", new Vector3(0, 0, 1));
  const fadeShark = fader(model);

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

  // Swim normally, crossfade to the bite for the surge, back to swimming
  const mixer = new AnimationMixer(model);
  const clip = (name) =>
    gltf.animations.find((c) => c.name === name) || gltf.animations[0];
  const swim = mixer.clipAction(clip("Swimming"));
  const bite = mixer.clipAction(clip("Biting"));
  swim.play();
  bite.play();
  bite.setEffectiveWeight(0);

  // The anglerfish: small, far back, lit only by its own lure
  let anglerRig = null;
  let anglerMixer = null;
  let fadeAngler = () => {};
  if (angler) {
    const fish = angler.scene;
    // swims left → right
    normalise(fish, 2.6, "Head_Upper", "Fin_Tail7", new Vector3(1, 0, 0));
    fish.traverse((o) => {
      if (o.material) o.material.emissiveIntensity = 2.2;
    });
    anglerRig = new Group();
    anglerRig.add(fish);
    const lure = bone(fish, "Esca7");
    const halo = new Sprite(
      new SpriteMaterial({
        map: glowTexture("rgba(150,255,235,1)", "rgba(60,220,200,0)"),
        blending: AdditiveBlending,
        depthWrite: false,
        fog: false,
        transparent: true,
      }),
    );
    halo.scale.setScalar(0.9 / fish.scale.x);
    lure.add(halo);
    const lureLight = new PointLight(0x5fe8d0, 6, 4, 2);
    lure.add(lureLight);
    scene.add(anglerRig);
    anglerMixer = new AnimationMixer(fish);
    angler.animations.forEach((c) => anglerMixer.clipAction(c).play());
    fadeAngler = fader(fish);
    const haloMat = halo.material;
    const inner = fadeAngler;
    fadeAngler = (v) => {
      inner(v);
      haloMat.opacity = v * (0.75 + Math.sin(performance.now() / 500) * 0.25);
    };
  }

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
  // each cycle (the first too) starts in empty water and fades in;
  // ?shark-t= / ?shark-freeze for screenshots
  const q = new URLSearchParams(location.search);
  const tParam = parseFloat(q.get("shark-t"));
  // t = 16: the page opens on 15 s of empty water before the first pass
  let t = Number.isFinite(tParam) ? tParam : 16;
  const frozen = q.has("shark-freeze");
  // angler has its own clock (37 s cycle); -4 → first pass ~4 s in
  const aParam = parseFloat(q.get("angler-t"));
  let at = Number.isFinite(aParam) ? aParam : -4;
  let running = true;
  let ready = false;

  const frame = () => {
    if (!running) return;
    const dt = frozen ? 0 : Math.min(clock.getDelta(), 0.05);
    t = (t + dt) % LOOP;

    // 0–8 approach from the right · 8–11 lunge + bite · 11–16 turn and
    // swim off past the left edge · 16–31 gone (reset far right)
    // x is in units of the visible half-width at that depth, so "right of
    // the dive computer" holds on every screen size.
    const halfW = (d) =>
      Math.tan(MathUtils.degToRad(camera.fov / 2)) * d * camera.aspect;
    let z;
    let xr; // -1 = left edge, 0 = centre, 1 = right edge
    let yaw; // 0 = facing us, -π/2 = facing left
    let speed;
    if (t < 8) {
      // a steady approach, straight at us
      const k = ease(t / 8);
      z = MathUtils.lerp(FAR, NEAR + 3.4, k);
      xr = MathUtils.lerp(0.55, 0.32, k);
      yaw = -0.18;
      speed = 0.25;
    } else if (t < 10.5) {
      // a short surge, jaws starting to open… then it thinks better of it:
      // the turn begins before it gets close
      const k = (t - 8) / 2.5;
      z = MathUtils.lerp(NEAR + 3.4, NEAR + 1.6, Math.sin(k * Math.PI * 0.5));
      xr = MathUtils.lerp(0.32, 0.22, k);
      yaw = MathUtils.lerp(-0.18, -0.75, ease(k));
      speed = MathUtils.lerp(0.4, 0.75, Math.sin(k * Math.PI));
    } else if (t < 16) {
      const k = (t - 10.5) / 5.5;
      z = MathUtils.lerp(NEAR + 1.6, NEAR + 5, k);
      // veers off and accelerates past the left edge
      xr = MathUtils.lerp(0.22, -2.4, k * k);
      yaw = MathUtils.lerp(-0.75, -1.45, ease(Math.min(1, k * 1.4)));
      speed = 0.45;
    } else {
      z = FAR;
      xr = 0.55;
      yaw = -0.22;
      speed = 0.2;
    }
    rig.position.set(xr * halfW(z), 1.15 + Math.sin(t * 0.5) * 0.15, -z);
    rig.rotation.y = yaw + Math.sin(t * 0.4) * 0.05;
    rig.rotation.x = Math.sin(t * 0.27) * 0.04;
    // fade in out of the dark over the first 2.5 s instead of popping in
    fadeShark(t < 2.5 ? ease(t / 2.5) : t >= 16 ? 0 : 1);
    // bite only during the surge; otherwise the real swim cycle
    const biting = t >= 8 && t < 10.5 ? Math.sin(((t - 8) / 2.5) * Math.PI) : 0;
    bite.setEffectiveWeight(biting);
    swim.setEffectiveWeight(1 - biting);
    swim.timeScale = 0.55 + speed;
    bite.timeScale = 0.7;
    mixer.update(dt);

    // Anglerfish: its own 37 s cycle, drifting left → right low behind
    // the copy; first pass ~4 s after the page opens
    if (anglerRig) {
      at = at + dt >= 37 ? at + dt - 37 : at + dt;
      const az = 11;
      if (at >= 0 && at < 18) {
        const k = at / 18;
        anglerRig.position.set(
          MathUtils.lerp(-1.25, 1.25, k) * halfW(az),
          -2.3 + Math.sin(at * 0.9) * 0.12,
          -az,
        );
        anglerRig.rotation.y = Math.sin(at * 0.6) * 0.12;
        anglerRig.rotation.z = Math.sin(at * 0.7) * 0.05;
        fadeAngler(Math.min(1, at / 2, (18 - at) / 2));
      } else {
        fadeAngler(0);
      }
      anglerMixer.update(dt);
    }

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
