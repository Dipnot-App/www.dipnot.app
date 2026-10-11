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
// One 50 s scene: the small shark crosses 0–32 s, the attack runs
// 34–48 s; never both on screen
const LOOP = 50;
const CRUISE = 32; // small shark's crossing
const ATTACK_AT = 34; // attack start in the scene loop
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
  const BITE_AT = 3.2; // jaws start working just before it arrives
  const BITE = 1.4; // one open-and-close of the jaws

  // A second, smaller shark: swims in from the right, makes a wide
  // turn far back in the dark and swims out on the left (no fades)
  const circler = cloneSkinned(model);
  circler.scale.multiplyScalar(0.5);
  // own materials and no glowing eye sprites
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
  circleMixer.clipAction(clip("Swimming")).play();
  let cHeading = -Math.PI / 2;
  let cBank = 0;

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
  // T is the scene clock; ?shark-t= jumps straight into the attack
  const sParam = parseFloat(q.get("scene-t"));
  let T = Number.isFinite(sParam)
    ? sParam
    : Number.isFinite(tParam)
      ? ATTACK_AT + tParam
      : 0;
  const frozen = q.has("shark-freeze");
  // angler has its own clock (37 s cycle); -4 → first pass ~4 s in
  const aParam = parseFloat(q.get("angler-t"));
  let at = Number.isFinite(aParam) ? aParam : -4;
  let running = true;
  let ready = false;
  let heading = -0.15;
  let bank = 0;
  const ATTACK_END = 14;
  const hw = (d) =>
    Math.tan(MathUtils.degToRad(camera.fov / 2)) * d * camera.aspect;
  // World position of the attacker at attack time `t` (camera looks −Z)
  // The attack path as keyframes with explicit velocities (cubic
  // Hermite): position and speed are continuous, and every velocity
  // points along the way it's going, so the path can't loop back on
  // itself (an auto Catmull-Rom tangent overshot the bite and spun the
  // shark round).
  const attackAt = (t) => {
    const y = 1.15 + Math.sin(t * 0.5) * 0.12;
    const P = (xr, d) => ({ x: xr * hw(d), z: -d });
    // well right of the dive computer, so the bite is in clear view
    const near = P(0.66, NEAR + 2.6);
    // [time, point, velocity (units/s; +z = toward the viewer)]
    const keys = [
      [0, P(1, FAR), { x: -4, z: 7 }],
      [1.8, P(0.88, 15), { x: -3, z: 5.5 }], // the rush
      [3.6, near, { x: -0.8, z: 1 }], // arrives, braking
      [4.8, { x: near.x - 0.3, z: near.z + 0.5 }, { x: -0.5, z: 0.35 }], // the bite
      [6.2, { x: near.x - 2, z: near.z + 0.4 }, { x: -1.6, z: -0.5 }], // swings left
      [8.2, { x: near.x - 4.4, z: near.z - 1.4 }, { x: -2, z: -0.9 }], // and away
      [ATTACK_END, P(-2.6, NEAR + 7), { x: -2.8, z: -0.3 }], // off the left edge
    ];
    const tt = MathUtils.clamp(t, 0, ATTACK_END);
    let i = 0;
    while (i < keys.length - 2 && tt > keys[i + 1][0]) i++;
    const [t1, p1, v1] = keys[i];
    const [t2, p2, v2] = keys[i + 1];
    const h = t2 - t1;
    const u = (tt - t1) / h;
    const u2 = u * u;
    const u3 = u2 * u;
    const herm = (k) =>
      (2 * u3 - 3 * u2 + 1) * p1[k] +
      (u3 - 2 * u2 + u) * v1[k] * h +
      (-2 * u3 + 3 * u2) * p2[k] +
      (u3 - u2) * v2[k] * h;
    return { x: herm("x"), y, z: herm("z") };
  };

  const frame = () => {
    if (!running) return;
    const dt = frozen ? 0 : Math.min(clock.getDelta(), 0.05);
    T = (T + dt) % LOOP;
    // attack-local time; >= ATTACK_END means the attacker is off stage
    const t =
      T >= ATTACK_AT && T < ATTACK_AT + ATTACK_END
        ? T - ATTACK_AT
        : ATTACK_END + 1;

    const halfW = (d) =>
      Math.tan(MathUtils.degToRad(camera.fov / 2)) * d * camera.aspect;
    // The attack, at 34 s of each 50 s loop. Positions come from a
    // path; the heading follows the direction of travel with a little
    // lag and the body banks into the turn, so it swims an arc instead
    // of rotating in place.
    //   0–1 out of the fog · 1–3.6 rushes at us · 3.2–4.6 one snap of the
    //   jaws as it arrives · 4.8–8.2 swings away to the left ·
    //   8.2–14 cruises off the left edge · 14–30 gone
    const at3 = attackAt(t);
    const ahead = attackAt(Math.min(t + 0.25, ATTACK_END));
    const z = -at3.z;
    if (t < ATTACK_END) {
      const dx = ahead.x - at3.x;
      const dz = ahead.z - at3.z;
      // keep the last heading once the look-ahead runs out of path, and
      // never let it wrap past facing left (that read as a full spin)
      const want =
        dx * dx + dz * dz > 1e-4
          ? MathUtils.clamp(Math.atan2(dx, dz), -1.9, 0.4)
          : heading;
      const prev = heading;
      heading +=
        Math.atan2(Math.sin(want - heading), Math.cos(want - heading)) *
        Math.min(1, dt * 4 || 1);
      const turnRate = dt ? (heading - prev) / dt : 0;
      bank +=
        (MathUtils.clamp(-turnRate * 0.35, -0.5, 0.5) - bank) *
        Math.min(1, dt * 3 || 1);
    } else {
      heading = -0.15;
      bank = 0;
    }
    rig.position.set(at3.x, at3.y, at3.z);
    rig.rotation.set(Math.sin(t * 0.27) * 0.03, heading, bank, "YXZ");
    fadeShark(t < 1 ? ease(t) : t >= ATTACK_END ? 0 : 1);

    // one snap of the jaws, then back to swimming
    const inBite = t >= BITE_AT && t < BITE_AT + BITE;
    const bw = inBite
      ? Math.min(1, (t - BITE_AT) / 0.15, (BITE_AT + BITE - t) / 0.15)
      : 0;
    const dur = bite.getClip().duration;
    bite.time = inBite ? ((t - BITE_AT) / BITE) * dur : 0;
    bite.setEffectiveWeight(bw);
    swim.setEffectiveWeight(1 - bw);
    // tail beat eases between paces instead of switching
    const pace = t < 3.6 ? 1.9 : t < 8 ? 1.25 : 0.65;
    swim.timeScale += (pace - swim.timeScale) * Math.min(1, dt * 1.5 || 1);
    mixer.update(dt);

    // The small shark: in from the right edge, a wide loop out into the
    // dark and back, out past the left edge. Heading follows its path.
    const cAt = (tt) => {
      const k = MathUtils.clamp(tt / CRUISE, 0, 1);
      const d = 10.5 + 4 * (1 - Math.cos(k * Math.PI * 2)) * 0.5;
      const loop = Math.sin(k * Math.PI * 2) * 0.35;
      return {
        x: (1.45 - 2.9 * k + loop) * hw(d),
        // high, in the water between the nav and the dive computer
        y: 2.6 + Math.sin(tt * 0.35) * 0.25,
        z: -d,
      };
    };
    if (T < CRUISE) {
      const c0 = cAt(T);
      const c1 = cAt(T + 0.3);
      const want = Math.atan2(c1.x - c0.x, c1.z - c0.z);
      const prev = cHeading;
      cHeading +=
        Math.atan2(Math.sin(want - cHeading), Math.cos(want - cHeading)) *
        Math.min(1, dt * 2.5 || 1);
      const rate = dt ? (cHeading - prev) / dt : 0;
      cBank +=
        (MathUtils.clamp(-rate * 0.4, -0.45, 0.45) - cBank) *
        Math.min(1, dt * 2 || 1);
      circleRig.visible = true;
      circleRig.position.set(c0.x, c0.y, c0.z);
      circleRig.rotation.set(0, cHeading, cBank, "YXZ");
    } else {
      circleRig.visible = false;
      cHeading = -Math.PI / 2;
    }
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
      t >= ATTACK_END
        ? 0
        : MathUtils.clamp((FAR - z) / (FAR - NEAR - 4), 0, 1) * 0.85;

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
