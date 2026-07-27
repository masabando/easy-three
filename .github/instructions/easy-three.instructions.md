---
name: easy-three
description: Official easy-three skill. Use when generating JavaScript, TypeScript, HTML, JSX, or React code for easy-three, beginner-friendly three.js scenes, WebGL/WebXR examples, 3D objects, cameras, lights, raycasting, canvas textures, models, VRM, GLTF, textures, events, helpers, XR, VR, controllers, hands, or postprocessing.
metadata:
  version: 1.15.x
  source: https://masabando.github.io/easy-three/llms.txt
alwaysApply: true
applyTo: "**/*.{js,jsx,ts,tsx,html,md}"
---

# easy-three

easy-three is a beginner-friendly wrapper around three.js. When writing code for a project that uses easy-three, prefer the high-level easy-three APIs shown here instead of raw three.js setup code.

Use this file as both:

- the public `llms.txt` for easy-three
- a Copilot instructions source that users may download, rename to `easy-three.instructions.md`, and place in `.github/instructions/`

## When to Use This Skill

- Use this skill when the project imports `@masabando/easy-three` or `"easy-three"`.
- Use this skill when generating beginner-friendly three.js/WebGL scenes with easy-three.
- Use this skill when the user mentions easy-three, three.js simplification, 3D objects, scene setup, camera controls, transform controls, raycasting, CSG/boolean mesh operations, lights, canvas textures, GLTF, VRM, BVH, helpers, events, water, sky, ocean, text in 3D, XR, VR, WebXR, controllers, hands, or postprocessing.
- Use this skill for React components that render easy-three scenes.
- Do not use this skill for unrelated UI-only work.

## Install and Import

NPM install:

```bash
npm install @masabando/easy-three
```

Package import:

```js
import { init } from "@masabando/easy-three";
```

CDN/import-map import:

```js
import { init } from "easy-three";
```

For CDN usage, define import maps for `three`, `three/addons/`, `@pixiv/three-vrm`, `three-mesh-bvh`, `three-bvh-csg`, and `easy-three` as shown in the official getting-started documentation.

## Usage Rules

1. Prefer easy-three helpers over raw three.js boilerplate.
2. Always start from `init()` and finish scene setup by calling `animate()`.
3. Use `create.*` for meshes, lights, text, canvas textures, helpers, sky/ocean/water, HTML meshes, audio, groups, and instancing.
4. Use `load.*` for textures, video textures, cube textures, HDR backgrounds, GLTF, VRM, and BVH.
5. Use `controls.connect()` for orbit-style controls, or `fpv.connect()` for first-person controls. Do not use both in the same scene.
6. For XR scenes, use `xr.setup()` and do not use `controls` or `fpv` camera controls in XR mode.
7. Use `transformControls.attach(object)` when users need to move, rotate, or scale an object interactively.
8. Use `tool.csg(mesh1, mesh2, props)` for boolean mesh operations such as subtract, add, difference, and intersect.
9. In React, call `init(ref.current)` inside `useEffect()` and clean up with `return () => destroy()`.
10. In normal CDN/plain JavaScript snippets, do not include `destroy()` unless the scene is explicitly torn down dynamically.
11. Put material settings under `option`.
12. Use arrays for `position`, `rotation`, `scale`, and multi-axis `size`/`segments` props.
13. If easy-three does not expose a required feature, destructure `THREE` from `init()` and use minimal raw three.js code only for that feature.

## API Selection Protocol

Before writing easy-three code:

1. Identify whether the target environment is React or CDN/plain JavaScript.
2. Pick the closest easy-three API from the command list below before falling back to `THREE`.
3. Use reference-page patterns for argument names and cleanup behavior.
4. For models or external assets, use `load.*` and guard async values inside `animate()`.
5. For postprocessing, use the returned effect function and call `animate(..., false)`.
6. If no easy-three helper fits, keep the main scene in easy-three and use `const { THREE } = init()` for the missing low-level feature.

## Command Discovery List

Base:

- `init(target, options)`
- `animate(proc, renderFlag)`
- `destroy()`
- `color(value)`
- `controls.connect()`, `controls.disconnect()`
- `fpv.connect(props)`, `fpv.disconnect()`
- `transformControls.attach(object, props)`
- `raycaster.connect(props)`, `raycaster.disconnect()`, `raycaster.getIntersections(objects, props)`
- `xr.setup(props)`, `controller.getIntersections(objects, recursive)`
- `tool.setPixelRatio(pixelRatio)`
- `tool.distance(mesh1, mesh2, usePixelRatio)`
- `tool.csg(mesh1, mesh2, props)`

Create meshes and objects:

- `create.cube(props)`, `create.box(props)`
- `create.sphere(props)`
- `create.plane(props)`
- `create.cone(props)`
- `create.octahedron(props)`
- `create.capsule(props)`
- `create.cylinder(props)`
- `create.circle(props)`
- `create.ring(props)`
- `create.torus(props)`
- `create.torusKnot(props)`
- `create.shape(props)`
- `create.object(geometry, props)`
- `create.group(props)`
- `create.instances(originalMesh, count, props)`

Create lights:

- `create.ambientLight(props)`
- `create.directionalLight(props)`
- `create.pointLight(props)`
- `create.spotLight(props)`
- `create.hemisphereLight(props)`
- `create.rectAreaLight(props)`

Create scene features:

- `create.material(props)`
- `create.text(text, props)`
- `create.textTexture(text, props)`
- `create.canvas(proc, props)`
- `create.canvasTexture(proc, props)`
- `create.fog(props)`
- `create.sky(props)`
- `create.ocean(texture, props)`
- `create.water(normalMap0, normalMap1, props)`
- `create.html(domElement, props)`
- `create.positionalAudio(soundFile, target, props)`
- `create.audio(soundFile, props)`

Load assets:

- `load.texture(url, props)`
- `load.videoTexture(url, props)`
- `load.cubeTexture(urls, props)`
- `load.background(url, props)`
- `load.gltf(url, props)`
- `load.vrm(url, props)`
- `load.bvh(url, vrm, props)`
- `load.bvh2(url, vrm, props)`

Helpers, events, and effects:

- `helper.grid(props)`
- `helper.axes(props)`
- `event.mouse.add(callback, option)`
- `event.key.add(callback, option)`
- `postprocessing.bloom(props)`
- `postprocessing.selectedBloom(props)`
- `postprocessing.pixel(props)`
- `postprocessing.mask(texture)`
- `postprocessing.glitch(props)`
- `postprocessing.bokeh(props)`

## Core Pattern

Initialize with `init()`, create objects with `create`, then call `animate()` once at the end.

```js
const { camera, create, animate, controls } = init();

controls.connect();
camera.position.set(0, 0, 2);
create.ambientLight();
create.directionalLight();

const cube = create.cube({
  rounded: true,
  radius: 0.2,
  segments: 16,
});

animate(({ delta }) => {
  cube.rotation.x += delta;
  cube.rotation.y += delta;
});
```

`init(target, options)` accepts no target, a CSS selector string, or an HTMLElement. `options.pixelRatio` sets the pixel ratio.

`init()` returns `Default`, `scene`, `camera`, `renderer`, `controls`, `fpv`, `raycaster`, `xr`, `transformControls`, `create`, `load`, `helper`, `event`, `animate`, `THREE`, `color`, `postprocessing`, `noToneMapping`, `destroy`, and `tool`.

Do not write manual `THREE.Scene`, `THREE.WebGLRenderer`, resize listeners, or requestAnimationFrame loops unless the user explicitly asks for raw three.js. If easy-three does not expose a feature you need, destructure `THREE` from `init()` and use three.js directly for that specific part.

## React Pattern

In React, pass a ref element to `init()` inside `useEffect()` and call `destroy()` on unmount.

```jsx
import { useEffect, useRef } from "react";
import { init } from "@masabando/easy-three";

export default function Scene() {
  const ref = useRef(null);

  useEffect(() => {
    const { camera, create, animate, destroy } = init(ref.current);

    camera.position.set(0, 0, 2);
    create.ambientLight();
    create.directionalLight();

    const cube = create.cube();

    animate(({ delta }) => {
      cube.rotation.x += delta;
      cube.rotation.y += delta;
    });

    return () => destroy();
  }, []);

  return <div ref={ref} style={{ width: "100%", height: 400 }} />;
}
```

Only use `destroy()` for lifecycle cleanup such as React unmounting. In normal CDN/plain JavaScript examples, do not add `destroy()` unless the code explicitly creates and removes scenes dynamically.

## Base APIs

- `animate(proc, renderFlag)`: starts the animation loop. `proc` receives `{ timer, clock, delta, time, frameCount }`. `delta` and `time` are seconds. Call `animate()` even for static scenes.
- `destroy()`: stops rendering and disposes the scene. Use it for React cleanup or explicit dynamic teardown; do not include it in ordinary CDN/plain JavaScript snippets.
- `color(value)`: returns a `THREE.Color`; accepts strings and hex values such as `"#ff0000"`, `0xff0000`, or `"hotpink"`.
- `controls.connect()` / `controls.disconnect()`: enable or disable orbit-style mouse/touch camera control.
- `fpv.connect(props)` / `fpv.disconnect()`: first-person camera control. Do not use `fpv` and `controls` together.
- `transformControls.attach(object, props)`: attach a three.js `TransformControls` helper to an object so the user can translate, rotate, or scale it interactively.
- `raycaster.connect(props)` / `raycaster.disconnect()`: enable or disable object picking from the current mouse/touch position.
- `xr.setup(props)`: enables WebXR/VR, adds a VR button, and optionally creates controllers and hand models.
- `tool.setPixelRatio(pixelRatio)`: update renderer pixel ratio at runtime.
- `tool.distance(mesh1, mesh2, usePixelRatio)`: returns the distance between two meshes, or between a mesh and the camera. `usePixelRatio` defaults to `true`.
- `tool.csg(mesh1, mesh2, props)`: performs a CSG/boolean operation between two meshes and returns the result mesh.

`fpv.connect()` props:

```js
fpv.connect({
  mouse: true,
  mouseDownMove: false,
  arrow: true,
  wasd: true,
  touch: true,
  height: 1.6,
  speed: 5,
  viewSpeed: 0.4,
  position: [0, 0],
});
```

For `fpv.position`, pass only `[x, z]`; the camera y value comes from `height`.

`transformControls.attach()` props:

```js
transformControls.attach(object, {
  mode: "translate",
  disableOrbitControls: true,
});
```

`mode` accepts `"translate"`, `"rotate"`, or `"scale"`. When `disableOrbitControls` is `true`, easy-three disables the normal orbit controls while the transform handle is being dragged. The return value is the underlying three.js `TransformControls` instance.

`raycaster.connect()` props:

```js
raycaster.connect({
  useMouse: true,
  mouseEvent: "pointermove",
});
```

Use `raycaster.getIntersections(objects, props)` inside `animate()` to get the objects currently under the pointer. The result is sorted from nearest to farthest. Pass `{ recursive: false }` to ignore child objects.

`xr.setup()` props:

```js
const {
  leftController,
  rightController,
  leftHand,
  rightHand,
  cameraGroup,
  getIntersections,
} = xr.setup({
  leftController: true,
  rightController: true,
  leftHand: true,
  rightHand: true,
  buttonTarget: document.body,
  selectableObjects: [],
});
```

`buttonTarget` is where the VR button is appended; by default it uses the easy-three target element. If the easy-three target is not fullscreen, give that target element `position: relative` so the VR button is placed correctly.

`selectableObjects` is the array of objects that controllers can select. On `selectstart`, easy-three stores the full `THREE.Intersection[]` result in `controller.userData.selected`. Use `controller.userData.selected?.[0]?.object` to access the nearest selected object. On `selectend`, `controller.userData.selected` becomes an empty array.

Each controller returned by `xr.setup()` also has `controller.getIntersections(objects?, recursive?)`. It raycasts from that controller and defaults to the same `selectableObjects` passed to `xr.setup()`. Use it inside `animate()` when you need continuous controller-ray intersections, such as dragging an object after selection.

`cameraGroup` is a `THREE.Group` that contains the camera, controllers, and hands. Change `cameraGroup.position` when you need to offset the initial XR floor/origin. In XR mode, the headset still controls the user's live head pose relative to that group.

In XR mode, do not call `controls.connect()` or `fpv.connect()`. The XR device controls the camera position and rotation. Direct camera pose changes such as `camera.position` are ignored while presenting in XR, but they can still be useful for non-XR preview.

`tool.csg()` props:

```js
tool.csg(mesh1, mesh2, {
  mode: "subtract",
  dispose: true,
  remove: true,
});
```

`mode` accepts `"add"`, `"subtract"`, `"reverseSubtract"`, `"difference"`, and `"intersect"`. The default mode is `"subtract"`. When `dispose` is `true`, easy-three disposes the original meshes' geometry and material after the operation. When `remove` is `true`, easy-three removes the original meshes from the scene. `tool.csg()` adds the result mesh to the scene and returns it.

## Mesh Creation

Use `create.*` helpers instead of manually creating geometry, material, mesh, and scene addition.

Shared mesh props:

- `position: [x, y, z]`
- `rotation: [x, y, z]`
- `option: { ... }` for material options such as `color`, `wireframe`, `map`, `normalMap`, `metalness`, `roughness`, `transparent`, `opacity`, or `side`
- `material: string | THREE.Material | THREE.Material[]`, default `Default.material`
- `castShadow: boolean`, default `true`
- `receiveShadow: boolean`, default `true`
- `doubleSide: boolean`, default `false`
- `upsideDown: boolean`, default `false`
- `autoAdd: boolean`, default `true`

Material names are the three.js material names with `THREE.` and `Mesh` removed. For example `"Physical"` means `THREE.MeshPhysicalMaterial`; `"Basic"` means `THREE.MeshBasicMaterial`; `"Normal"` is the normal-material shortcut.

Common mesh APIs:

- `create.cube(props)` / `create.box(props)`: box mesh. Props: `size`, `segments`, `rounded`, `radius`, plus shared mesh props. `size: 2` means `[2, 2, 2]`.
- `create.sphere(props)`: sphere mesh. Props: `size` for radius, `segments`, plus shared mesh props.
- `create.plane(props)`: plane mesh. Props: `size`, plus shared mesh props. Use `doubleSide: true` or `option.side = THREE.DoubleSide` when both sides should render.
- `create.cone(props)`: cone mesh. Props: `size`, `segments`, plus shared mesh props. `segments: [3, 1]` creates a triangular pyramid.
- `create.octahedron(props)`: octahedron mesh.
- `create.capsule(props)`: capsule mesh.
- `create.cylinder(props)`: cylinder mesh.
- `create.circle(props)`: circle mesh.
- `create.ring(props)`: ring mesh.
- `create.torus(props)`: torus mesh.
- `create.torusKnot(props)`: torus-knot mesh.
- `create.shape(props)`: custom shape mesh from line or curve points.
- `create.object(geometry, props)`: mesh from a custom three.js geometry.

Example with material options:

```js
const cube = create.cube({
  size: 1.5,
  position: [1, 0, 0],
  option: {
    color: 0x00ff00,
    metalness: 0.6,
    roughness: 0,
    transparent: true,
    opacity: 0.5,
  },
});
```

Example with custom geometry:

```js
const { create, THREE } = init();

create.object(new THREE.TorusGeometry(1, 0.3), {
  option: { color: "#66ff66" },
});
```

Use the `THREE` value returned by `init()` whenever easy-three does not have a dedicated helper for the required three.js feature.

## Materials and Text

- `create.material(props)`: creates a material. Use this when reusing a material or when passing a material instance into `material`.
- `create.text(text, props)`: creates a text mesh by drawing text onto a texture. Japanese text is supported.
- `create.textTexture(text, props)`: returns a texture drawn from text. Use it to map text onto cubes, spheres, planes, etc.

`create.text()` props include `fontSize`, `fontWeight`, `font`, `color`, `position`, `rotation`, `size`, `resolution`, `textAlign`, `textBaseline`, `background`, `material`, `side`, `guide`, `guideColor`, and `autoAdd`.

Text meshes support dynamic update methods: `setText`, `setFontSize`, `setColor`, `setBackground`, `setGuide`, and `setGuideColor`.

`create.textTexture()` props include `fontSize`, `fontWeight`, `font`, `color`, `size`, `textAlign`, `textBaseline`, `background`, `guide`, and `guideColor`. The returned texture supports `texture.set({...})`.

```js
const texture = create.textTexture("easy-three", {
  size: [300, 300],
  background: "#66ff66",
});

create.cube({
  option: { map: texture },
});
```

Text is drawn on a plane/texture. Increase `size` or reduce `fontSize` if text is clipped.

## Canvas Textures

- `create.canvas(proc, props)`: creates a plane with a canvas texture applied.
- `create.canvasTexture(proc, props)`: creates a `CanvasTexture` that can be mapped onto any mesh.

Both APIs pass `(ctx, canvas)` to `proc`. Both support dynamic drawing with `update(proc?)`, and expose `userData.context` and `userData.canvas`.

`create.canvas()` props include `size`, `resolution`, `transparent`, `material`, and other `create.plane()` props.

`create.canvasTexture()` props include `size`, default `[500, 500]`.

Use `create.canvas()` when the target is a plane. Use `create.canvasTexture()` when the texture should be applied to another mesh such as a cube or sphere.

```js
const plane = create.canvas(
  (ctx) => {
    ctx.fillStyle = "red";
    ctx.fillRect(50, 50, 100, 100);
    ctx.fillStyle = "blue";
    ctx.fillRect(150, 150, 100, 100);
  },
  {
    size: 1,
    resolution: 300,
    transparent: true,
  }
);

plane.update((ctx, canvas) => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "green";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
});
```

Canvas texture example for non-plane meshes:

```js
const { create, THREE } = init();

const texture = create.canvasTexture(
  (ctx) => {
    ctx.fillStyle = "red";
    ctx.fillRect(50, 50, 100, 100);
  },
  { size: 300 }
);

create.cube({
  option: {
    map: texture,
    transparent: true,
    side: THREE.DoubleSide,
  },
});
```

## Groups and Instances

- `create.group(props)`: creates a `THREE.Group`. Use `children` with `autoAdd: false` objects, or call `group.add(...)`.
- `create.instances(originalMesh, count, props)`: creates instanced meshes.

`create.instances()` props include `position`, `rotation`, `removeOriginal`, `offset`, `layout`, `radius`, `castShadow`, `receiveShadow`, and `autoAdd`.

Layouts: `"line"`, `"grid"`, `"circle"`, `"cube"`. Axis suffixes such as `"-xy"`, `"-xz"`, `"-yx"`, `"-yz"`, `"-zx"`, and `"-zy"` can be added to grid/circle/cube layouts.

```js
const cube = create.cube();
const instances = create.instances(cube, 8, {
  layout: "circle",
  radius: 3,
});

instances.at(0).position.set(0, 0, 0);
instances.at(1).color.set("#ff0000");
instances.at(2).rotation.set(Math.PI / 4, Math.PI / 4, 0);
instances.at(3).scale.set(1.5, 1.5, 1.5);

const position = instances.at(2).position.get();
instances.at(2).position.set(position.x, position.y + 1, position.z);
```

Use `instances.at(index).position.get()`, `.rotation.get()`, `.scale.get()`, and `.color.get()` to read a single instance's current transform or color. The setters and getters work per instance without converting the instanced mesh back into separate meshes.

## Transform Controls

Use `transformControls.attach(object, props)` when the user should manipulate an object directly in the scene.

```js
const { camera, create, animate, controls, transformControls } = init();

camera.position.set(0, 0, 3);
controls.connect();

create.ambientLight();
create.directionalLight();

const cube = create.cube();

transformControls.attach(cube, {
  mode: "translate",
  disableOrbitControls: true,
});

animate();
```

Use `"translate"` for movement, `"rotate"` for rotation, and `"scale"` for scaling. Prefer `disableOrbitControls: true` when orbit controls are connected, so dragging the transform handle does not also rotate the camera.

## CSG Boolean Mesh Operations

Use `tool.csg(mesh1, mesh2, props)` for boolean operations between two meshes. This is useful for subtracting holes, combining meshes, or creating intersection shapes without writing raw CSG setup code.

```js
const { camera, create, animate, controls, tool } = init();

camera.position.set(0, 1.6, 2);
controls.connect();

create.ambientLight();
create.directionalLight();

const cube = create.cube();
const sphere = create.sphere({
  size: 0.7,
});

const result = tool.csg(cube, sphere, {
  mode: "subtract",
});

result.material.color.set(0x66aaff);

animate();
```

CSG modes:

- `"subtract"`: subtract `mesh2` from `mesh1`; this is the default.
- `"add"`: combine `mesh1` and `mesh2`.
- `"reverseSubtract"`: subtract `mesh1` from `mesh2`.
- `"difference"`: keep the non-overlapping parts.
- `"intersect"`: keep only the overlapping part.

By default, `tool.csg()` disposes and removes the original meshes. Pass `{ dispose: false, remove: false }` when the originals should remain usable or visible after the operation.

## Lights

- `create.ambientLight(props)`: ambient light. Props: `color`, `intensity`.
- `create.directionalLight(props)`: directional light. Props: `intensity`, `color`, `position`, `castShadow`, `shadow`, `helper`, `helperColor`.
- `create.pointLight(props)`: point light. Props: `color`, `intensity`, `distance`, `decay`, `position`, `castShadow`, `shadow`, `helper`, `helperColor`.
- `create.spotLight(props)`: spot light. Props: `color`, `intensity`, `distance`, `angle`, `penumbra`, `decay`, `position`, `castShadow`, `shadow`, `helper`, `helperColor`.
- `create.hemisphereLight(props)`: hemisphere light. Props include `skyColor`, `groundColor`, and `intensity`.
- `create.rectAreaLight(props)`: rectangular area light.

Use `helper` greater than `0` on supported lights to visualize the light. For GLTF surface artifacts with directional-light shadows, set a small `shadow.bias` such as `0.0001` or `-0.0001`.

Avoid `create.spotLight()` with VRM models; the reference warns that this combination can error.

## Scene Helpers and Environment

- `helper.grid(props)`: grid helper. Props: `size`, `divisions`, `colorCenterLine`, `colorGrid`.
- `helper.axes(props)`: axes helper. Props: `size`.
- `create.fog(props)`: scene fog. Common props: `color`, `near`, `far`.
- `create.sky(props)`: sky mesh.
- `create.ocean(texture, props)`: ocean surface. Returns `{ mesh, update }`; call `update(delta)` in `animate()` when needed.
- `create.water(normalMap0, normalMap1, props)`: water mesh. Can accept a custom `geometry`.
- `create.html(domElement, props)`: creates a mesh from an HTMLElement. Useful for HTML UI in 3D.
- `create.positionalAudio(soundFile, target, props)`: positional audio attached to a target object.
- `create.audio(soundFile, props)`: non-positional audio with a listener attached to `props.target` or the camera by default. Returns `{ audio, analyser }`.

`create.audio()` props include `loop`, `volume`, `target`, `fftSize`, `onLoad`, `onError`, and `onProgress`.

Browser audio playback must start from a user gesture such as a click or tap. Do not call `audio.play()` automatically on load.

```js
const { camera, create, animate } = init();

camera.position.set(0, 0, 3);
create.ambientLight();
create.directionalLight();

const box = create.box();
const { audio, analyser } = create.audio("/easy-three/sound/neon_eternity.mp3", {
  fftSize: 128,
  onLoad: ({ audio, analyser }) => {
    console.log(audio, analyser);
  },
});

animate(({ delta }) => {
  if (!audio.isPlaying) return;

  const frequencyData = analyser.getFrequencyData();
  box.rotation.x += delta;
  box.rotation.y += delta;
  box.scale.y = Math.max(0.2, frequencyData[0] / 32);
});

document.querySelector(".playButton").addEventListener("click", () => {
  if (audio.isPlaying) {
    audio.stop();
  } else {
    audio.play();
  }
});
```

In React, call `audio.destroy()` in the `useEffect` cleanup before or alongside `destroy()` so the audio listener is removed from the target.

Example water:

```js
const { camera, controls, create, animate, THREE } = init();

controls.connect();
camera.position.set(0, 4, -4);
create.ambientLight({ intensity: 1 });
create.directionalLight({ intensity: 1 });
create.sky();

create.water("./NormalMap-1.jpg", "./NormalMap-2.jpg", {
  size: 5,
  position: [0, 1, 0],
  scale: 0.4,
  geometry: new THREE.SphereGeometry(2, 32, 32),
});

animate();
```

## Loading Assets

Use `load.*` helpers instead of direct loader classes.

- `load.texture(url, props)`: returns `Texture`. Props include `wrapS`, `wrapT`, and `repeat`.
- `load.videoTexture(url, props)`: returns `VideoTexture`. Props include `autoPlay` and `loop`.
- `load.cubeTexture(urls, props)`: returns `CubeTexture`. Props include `path`.
- `load.background(url, props)`: loads HDR and sets scene background/environment by default. Props: `background`, `environment`.
- `load.gltf(url, props)`: returns `Promise<GLTF>`.
- `load.vrm(url, props)`: returns `Promise<VRM>`.
- `load.bvh(url, vrm, props)` / `load.bvh2(url, vrm, props)`: applies BVH animation to a VRM and returns `{ mixer, duration }`.

Asset placement props for GLTF/VRM commonly include `position`, `rotation`, `scale`, `castShadow`, `receiveShadow`, `autoAdd`, and callbacks such as `onProgress`/`onLoad`.

Texture example:

```js
const { camera, create, load, controls, animate } = init();

controls.connect();
camera.position.set(0, 0, 2);
create.ambientLight({ intensity: 1 });
create.directionalLight({ intensity: 2 });

const cube = create.cube({
  rounded: true,
  segments: 16,
  option: {
    map: load.texture("./red_brick_diff_1k.jpg"),
    normalMap: load.texture("./red_brick_nor_gl_1k.jpg"),
  },
});

animate(({ delta }) => {
  cube.rotation.x += delta;
  cube.rotation.y += delta;
});
```

GLTF example:

```js
let model;

load.gltf("./model.gltf").then((gltf) => {
  model = gltf;
});

animate(({ delta }) => {
  if (model) {
    model.scene.rotation.y += delta;
  }
});
```

VRM with BVH example:

```js
let model;

load.vrm("./model.vrm", {
  position: [0, -0.55, 0],
  bvh: "./motion.bvh",
}).then((vrm) => {
  model = vrm;
});

animate(({ delta }) => {
  if (model) {
    model.updateWithAnimation(delta);
  }
});
```

When using async assets in `animate()`, always guard against undefined until the promise resolves.

## XR

Use `xr.setup()` for WebXR/VR scenes. It enables `renderer.xr`, appends a `VRButton`, and creates controller/hand objects when enabled.

```js
const { camera, controls, create, animate, xr } = init();

// Useful for non-XR preview. XR devices control the camera in XR mode.
camera.position.set(0, 1.6, 0);
controls.target.set(0, 1.6, -1);

create.ambientLight();
create.directionalLight();
create.sky();

const cube1 = create.cube({
  position: [1, 1, -3],
});

const cube2 = create.cube({
  position: [-1, 1, -3],
});

const ocean = create.ocean("./NormalMap-1.jpg");

const { rightController, cameraGroup } = xr.setup({
  selectableObjects: [cube1, cube2],
});

cameraGroup.position.set(0, 0, 0);

animate(({ delta }) => {
  ocean.update(delta);

  cube1.material.color.set(0x0000ff);
  cube2.material.color.set(0x0000ff);

  const selected = rightController.userData.selected?.[0];
  if (selected) {
    selected.object.rotation.y += delta;
    selected.object.material.color.set(0xff0000);
  }
});
```

`xr.setup()` returns:

- `leftController`
- `rightController`
- `leftHand`
- `rightHand`
- `cameraGroup`
- `getIntersections(controller, objects?, recursive?)`

Each disabled controller/hand returns `null`. When an object from `selectableObjects` is selected with a controller, the controller stores the raycast intersection array in `controller.userData.selected` until selection ends. The selected object is usually `controller.userData.selected?.[0]?.object`, not `controller.userData.selected` itself.

Continuous controller-ray example:

```js
const cube = create.cube();

const { rightController } = xr.setup({
  selectableObjects: [cube],
});

animate(() => {
  const selected = rightController.userData.selected?.[0];
  if (!selected) return;

  const intersections = rightController.getIntersections();
  if (intersections.length > 0) {
    const point = intersections[0].point;
    selected.object.position.x = point.x;
    selected.object.position.y = point.y;
  }
});
```

XR rules:

- Do not use `controls.connect()` or `fpv.connect()` in XR mode.
- XR uses the same `animate()` loop. easy-three already uses `renderer.setAnimationLoop()`.
- Use `selectableObjects` for simple controller picking.
- Read selected XR objects from `controller.userData.selected?.[0]?.object`.
- Use `controller.getIntersections()` for continuous controller-ray picking after selection.
- Put XR setup after creating objects that should be selectable.
- Do not pass camera pose to `xr.setup()`; set camera position only when a useful non-XR preview is needed.
- Use `cameraGroup.position` to offset the initial XR origin/floor.
- WebXR requires a supported browser/device and a secure context such as HTTPS or localhost.

## Events and Raycaster

- `event.mouse.add(callback, option)`: registers mouse/pointer events and returns an unregister function. Callback receives `(pos, e)`, where `pos` is a `THREE.Vector2` relative to the target object and `e` is the pointer event. `option.type` defaults to `"once"`.
- `event.key.add(callback, option)`: registers keyboard events and returns an unregister function. Callback receives `(key, e)`. `option.type` defaults to `"once"`; `option.trigger` defaults to `/[A-Za-z]/`.

For keyboard events on a `div` container, set `tabIndex={0}` so it can receive focus.

```js
const { camera, create, event, controls, animate } = init();

camera.position.set(0, 0, 1);
controls.connect();

const text = create.text("Press Key", { fontSize: 20 });

event.key.add((key) => {
  text.material.map.dispose();
  text.material.map = create.textTexture(key, { fontSize: 140 });
  text.material.needsUpdate = true;
});

animate();
```

Raycaster example:

```js
const { camera, create, animate, controls, raycaster } = init();

camera.position.set(0, 0, 3);
controls.connect();
raycaster.connect();

create.ambientLight();
create.directionalLight();

const cube1 = create.cube({ position: [1, 0, 0] });
const cube2 = create.cube({ position: [-1, 0, 0] });

animate(({ delta }) => {
  cube1.rotation.y += delta;
  cube2.rotation.y += delta;

  const intersections = raycaster.getIntersections([cube1, cube2]);

  cube1.material.color.set(0xffffff);
  cube2.material.color.set(0xffffff);

  if (intersections.length > 0) {
    intersections[0].object.material.color.set(0xff0000);
  }
});
```

## Postprocessing

Postprocessing helpers return render functions that must be called inside `animate()`. Pass `false` as the second argument to `animate()` to disable the default render pass.

- `postprocessing.bloom(props)`: returns `{ bloom }`.
- `postprocessing.selectedBloom(props)`: returns `{ selectedBloom, addSelectedBloom }`.
- `postprocessing.pixel(props)`: returns `{ pixel }`.
- `postprocessing.mask(texture)`: returns `{ mask }`.
- `postprocessing.glitch(props)`: returns `{ glitch }`.
- `postprocessing.bokeh(props)`: returns `{ bokeh }`.

Common bloom props: `exposure`, `background`, `threshold`, `strength`, `radius`.

Pixel props: `size`, `normalEdge`, `depthEdge`.

Glitch props: `wild`.

Bokeh props: `focus`, `aperture`, `maxblur`.

```js
const { camera, create, animate, postprocessing } = init();

camera.position.set(0, 0, 2);
create.ambientLight();
create.directionalLight();

const cube = create.cube();
const { pixel } = postprocessing.pixel();

animate(({ delta, time }) => {
  cube.rotation.x += delta;
  cube.rotation.y += delta;
  pixel({
    size: ~~(6 + 5 * Math.sin(time)),
  });
}, false);
```

Selected bloom example:

```js
const cube1 = create.cube({ size: 0.5, position: [-0.7, 0, 0] });
const cube2 = create.cube({ size: 0.5, position: [0.7, 0, 0] });
const sphere = create.sphere({ size: 0.3, position: [0, 0.8, 0] });

const { selectedBloom, addSelectedBloom } = postprocessing.selectedBloom();
addSelectedBloom(cube1, sphere);

animate(({ delta }) => {
  cube1.rotation.x += delta;
  cube2.rotation.y += delta;
  selectedBloom();
}, false);
```

## Defaults

`Default` configures global defaults:

- `Default.material`: default material type, default `"Physical"`
- `Default.color`: default mesh color, default `0x1155ff`
- `Default.texture.wrapping`: texture wrapping, default `"Repeat"`
- `Default.event.type`: event listener type, default `"once"`
- `Default.event.keyTrigger`: default key-event trigger, default `/^[A-Za-z]$/`
- `Default.layer.bloom`: selected-bloom layer, default `30`
- `Default.shader.vertexShader` and `Default.shader.fragmentShader`: shader code used by selected bloom

```js
const { Default } = init();

Default.material = "Basic";
Default.color = "#ff0000";
Default.texture.wrapping = "Repeat";
```

## AI Code Generation Rules

- Prefer easy-three APIs from this file and the reference pages over raw three.js boilerplate.
- Use `create.*` for meshes, lights, text, canvas textures, helpers, sky/ocean/water, HTML meshes, audio, and instancing.
- Use `load.*` for textures, HDR backgrounds, GLTF, VRM, BVH, cube textures, and video textures.
- Always call `animate()`.
- Use `delta` for frame-rate-independent animation.
- Use `time` for periodic motion.
- Use array props for easy-three `position`, `rotation`, `scale`, and most `size`/`segments` values when multiple axes are involved.
- Put material properties under `option`.
- Do not set `autoAdd: false` unless you will add the object to a group/scene manually.
- Use `controls.connect()` for orbit controls, or `fpv.connect()` for first-person controls, not both.
- Use `transformControls.attach(object)` when the user needs interactive object translation, rotation, or scaling.
- When using `transformControls` with orbit controls, keep `disableOrbitControls: true` unless the user explicitly wants simultaneous camera and object dragging.
- Use `raycaster.connect()` and `raycaster.getIntersections()` for pointer-based object picking.
- Use `xr.setup()` for WebXR/VR scenes, and avoid `controls.connect()` and `fpv.connect()` in XR mode.
- Use `selectableObjects` and `controller.userData.selected?.[0]?.object` for simple XR controller selection.
- Use `controller.getIntersections()` when an XR controller needs continuous raycast information, such as moving a selected object.
- In XR scenes, create selectable objects before calling `xr.setup({ selectableObjects })`.
- Use `cameraGroup.position` from `xr.setup()` when XR content needs a different initial floor/origin offset.
- Use `tool.csg(mesh1, mesh2, { mode })` for boolean mesh operations. Prefer it over raw `three-bvh-csg` setup.
- Remember that `tool.csg()` removes and disposes the original meshes by default; use `{ remove: false, dispose: false }` if later code still needs them.
- Use `create.canvas()` for canvas-backed planes and `create.canvasTexture()` for canvas textures mapped onto other meshes.
- Use `create.audio(soundFile, props)` for regular audio playback and frequency analysis. Start playback only from a user gesture, and call `audio.destroy()` during React cleanup.
- Use `create.positionalAudio(soundFile, target, props)` only when the sound should be spatially attached to a 3D object.
- In React, pass the ref element to `init(ref.current)` inside `useEffect()` and clean up with `return () => destroy()`.
- In CDN/plain JavaScript usage, omit `destroy()` unless the user is explicitly tearing down a scene.
- If easy-three lacks a needed feature, use `const { THREE } = init()` and write the minimal three.js code for that feature while keeping the rest of the scene in easy-three.
- For postprocessing, call the returned effect function inside `animate(..., false)`.
- For async loaded models, guard inside `animate()` until the model exists.
