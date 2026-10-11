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
import { clone as cloneSkinned } from "three/examples/jsm/utils/SkeletonUtils.js";

// One loop of the choreography, in seconds
const LOOP = 30; // the attack: 13 s of action, 17 s of empty water
const FAR = 28; // where the attacker appears (deep in the fog)
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
  // the 404 water is darker than the rest of the site (see .dn-nf CSS)
  const deepen = (css, isLight) =>
    new Color(cssToHex(css)).multiplyScalar(isLight ? 0.72 : 0.5);
  scene.fog = new FogExp2(deepen(waterColor, light), light ? 0.06 : 0.065);

  const camera = new PerspectiveCamera(38, 1, 0.1, 200);
  camera.position.set(0, 0, 0);
  camera.lookAt(0, 0, -10);

  // Cold light from the surface above, a faint fill from below
  const ambient = new AmbientLight(0x6fa8b8, light ? 0.8 : 0.45);
  scene.add(ambient);
  const sun = new DirectionalLight(0xbfefff, light ? 2.2 : 1.8);
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
  bite.paused = true; // its time is set per frame: one bite per pass
  bite.setEffectiveWeight(0);
  const BITE = 1.3; // seconds the single open-and-close takes

  // A second shark far back in the dark, always circling
  const circler = cloneSkinned(model);
  circler.scale.multiplyScalar(0.62);
  // own materials (its fade is independent) and no glowing eye sprites
  const drop = [];
  circler.traverse((o) => {
    if (o.isSprite) drop.push(o);
    else if (o.material) o.material = o.material.clone();
  });
  drop.forEach((o) => o.removeFromParent());
  const circleRig = new Group();
  circleRig.add(circler);
  scene.add(circleRig);
  const circleMixer = new AnimationMixer(circler);
  const circling = clip("Circling");
  circleMixer.clipAction(circling).play();
  // The clip swims a wide loop (root motion). Sample it once and shift
  // the shark so the loop is centred on the rig, then shrink the rig so
  // the whole loop stays on screen.
  {
    const sum = new Vector3();
    const steps = 16;
    for (let i = 0; i < steps; i++) {
      circleMixer.setTime((circling.duration * i) / steps);
      circleRig.updateMatrixWorld(true);
      sum.add(new Box3().setFromObject(circler, true).getCenter(new Vector3()));
    }
    circler.position.sub(sum.divideScalar(steps));
    circleMixer.setTime(0);
  }
  circleRig.scale.setScalar(0.62);
  const fadeCircler = fader(circler);
  let circleFade = 0;

  // The anglerfish: small, far back, lit only by its own lure
  let anglerRig = null;
  let anglerMixer = null;
  let fadeAngler = () => {};
  if (angler) {
    const fish = angler.scene;
    // swims left → right
    normalise(fish, 2.6, "Head_Upper", "Fin_Tail7", new Vector3(1, 0, 0));
    fish.traverse((o) => {
      if (o.material) o.material.emissiveIntensity = 4;
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
    halo.scale.setScalar(1.7 / fish.scale.x);
    lure.add(halo);
    const lureLight = new PointLight(0x5fe8d0, 16, 6, 2);
    lure.add(lureLight);
    scene.add(anglerRig);
    anglerMixer = new AnimationMixer(fish);
    angler.animations.forEach((c) => anglerMixer.clipAction(c).play());
    fadeAngler = fader(fish);
    const haloMat = halo.material;
    const inner = fadeAngler;
    fadeAngler = (v) => {
      inner(v);
      haloMat.opacity = v * (0.85 + Math.sin(performance.now() / 500) * 0.15);
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
  // t = 15: the page opens on 15 s of empty water before the first attack
  let t = Number.isFinite(tParam) ? tParam : 15;
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

    const halfW = (d) =>
      Math.tan(MathUtils.degToRad(camera.fov / 2)) * d * camera.aspect;
    // The attack, every 30 s. x is in units of the visible half-width at
    // that depth, so it reads the same on every screen size.
    // 0–1.2 out of the fog · 1.2–4 rushes at us · 4–5.3 one bite ·
    // 5.3–6.3 thinks better of it, veers left · 6.3–13 cruises off left ·
    // 13–30 gone
    let z;
    let xr; // -1 = left edge, 0 = centre, 1 = right edge
    let yaw; // 0 = facing us, -π/2 = facing left
    let swimRate;
    if (t < 1.2) {
      const k = t / 1.2;
      z = MathUtils.lerp(FAR, FAR - 3, k);
      xr = 0.45;
      yaw = -0.12;
      swimRate = 1.6;
    } else if (t < 4) {
      const k = (t - 1.2) / 2.8;
      z = MathUtils.lerp(FAR - 3, NEAR + 2.4, k * k * (2 - k)); // fast, then braking
      xr = MathUtils.lerp(0.45, 0.2, k);
      yaw = -0.12;
      swimRate = 1.9;
    } else if (t < 4 + BITE) {
      const k = (t - 4) / BITE;
      z = MathUtils.lerp(NEAR + 2.4, NEAR + 1.8, Math.sin(k * Math.PI * 0.5));
      xr = 0.2;
      yaw = -0.12 - k * 0.08;
      swimRate = 0.6;
    } else if (t < 6.3) {
      const k = (t - 4 - BITE) / (6.3 - 4 - BITE);
      z = MathUtils.lerp(NEAR + 1.8, NEAR + 3, k);
      xr = MathUtils.lerp(0.2, 0.05, k);
      yaw = MathUtils.lerp(-0.2, -1.4, ease(k));
      swimRate = 1.3;
    } else if (t < 13) {
      const k = (t - 6.3) / 6.7;
      z = MathUtils.lerp(NEAR + 3, NEAR + 5, k);
      xr = MathUtils.lerp(0.05, -2.4, k);
      yaw = -1.45;
      swimRate = 0.65;
    } else {
      z = FAR;
      xr = 0.45;
      yaw = -0.12;
      swimRate = 0.5;
    }
    rig.position.set(xr * halfW(z), 1.15 + Math.sin(t * 0.5) * 0.12, -z);
    rig.rotation.y = yaw + Math.sin(t * 0.4) * 0.04;
    rig.rotation.x = Math.sin(t * 0.27) * 0.03;
    fadeShark(t < 1.2 ? ease(t / 1.2) : t >= 13 ? 0 : 1);

    // exactly one open-and-close of the jaws, then back to swimming
    const inBite = t >= 4 && t < 4 + BITE;
    const bw = inBite ? Math.min(1, (t - 4) / 0.15, (4 + BITE - t) / 0.15) : 0;
    bite.time = inBite ? ((t - 4) / BITE) * bite.getClip().duration : 0;
    bite.setEffectiveWeight(bw);
    swim.setEffectiveWeight(1 - bw);
    swim.timeScale = swimRate;
    mixer.update(dt);

    // The circler: far back, slightly left of centre, low, always there
    circleFade = Math.min(1, circleFade + dt / 3);
    circleRig.position.set(0, 0.9, -15);
    fadeCircler(ease(circleFade));
    circleMixer.update(dt);

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
      t >= 13 ? 0 : MathUtils.clamp((FAR - z) / (FAR - NEAR - 4), 0, 1) * 0.85;

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
      scene.fog.color.copy(deepen(css, isLight));
      scene.fog.density = isLight ? 0.06 : 0.065;
      ambient.intensity = isLight ? 0.8 : 0.45;
      sun.intensity = isLight ? 2.2 : 1.8;
    },
  };
}
