---
name: easy-three
description: Official easy-three skill. Use when generating JavaScript, TypeScript, HTML, JSX, or React code for easy-three, beginner-friendly three.js scenes, WebGL examples, 3D objects, cameras, lights, models, VRM, GLTF, textures, events, helpers, or postprocessing.
metadata:
  version: 1.13.x
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
- Use this skill when the user mentions easy-three, three.js simplification, 3D objects, scene setup, camera controls, lights, textures, GLTF, VRM, BVH, helpers, events, water, sky, ocean, text in 3D, or postprocessing.
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

For CDN usage, define import maps for `three`, `three/addons/`, `@pixiv/three-vrm`, and `easy-three` as shown in the official getting-started documentation.

## Usage Rules

1. Prefer easy-three helpers over raw three.js boilerplate.
2. Always start from `init()` and finish scene setup by calling `animate()`.
3. Use `create.*` for meshes, lights, text, helpers, sky/ocean/water, HTML meshes, audio, groups, and instancing.
4. Use `load.*` for textures, video textures, cube textures, HDR backgrounds, GLTF, VRM, and BVH.
5. Use `controls.connect()` for orbit-style controls, or `fpv.connect()` for first-person controls. Do not use both in the same scene.
6. In React, call `init(ref.current)` inside `useEffect()` and clean up with `return () => destroy()`.
7. In normal CDN/plain JavaScript snippets, do not include `destroy()` unless the scene is explicitly torn down dynamically.
8. Put material settings under `option`.
9. Use arrays for `position`, `rotation`, `scale`, and multi-axis `size`/`segments` props.
10. If easy-three does not expose a required feature, destructure `THREE` from `init()` and use minimal raw three.js code only for that feature.

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
- `tool.setPixelRatio(pixelRatio)`

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
- `create.fog(props)`
- `create.sky(props)`
- `create.ocean(texture, props)`
- `create.water(normalMap0, normalMap1, props)`
- `create.html(domElement, props)`
- `create.positionalAudio(soundFile, target, props)`

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

`init()` returns `Default`, `scene`, `camera`, `renderer`, `controls`, `fpv`, `create`, `load`, `helper`, `event`, `animate`, `THREE`, `color`, `postprocessing`, `noToneMapping`, `destroy`, and `tool`.

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
- `tool.setPixelRatio(pixelRatio)`: update renderer pixel ratio at runtime.

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
```

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

## Events

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
- Use `create.*` for meshes, lights, text, helpers, sky/ocean/water, HTML meshes, audio, and instancing.
- Use `load.*` for textures, HDR backgrounds, GLTF, VRM, BVH, cube textures, and video textures.
- Always call `animate()`.
- Use `delta` for frame-rate-independent animation.
- Use `time` for periodic motion.
- Use array props for easy-three `position`, `rotation`, `scale`, and most `size`/`segments` values when multiple axes are involved.
- Put material properties under `option`.
- Do not set `autoAdd: false` unless you will add the object to a group/scene manually.
- Use `controls.connect()` for orbit controls, or `fpv.connect()` for first-person controls, not both.
- In React, pass the ref element to `init(ref.current)` inside `useEffect()` and clean up with `return () => destroy()`.
- In CDN/plain JavaScript usage, omit `destroy()` unless the user is explicitly tearing down a scene.
- If easy-three lacks a needed feature, use `const { THREE } = init()` and write the minimal three.js code for that feature while keeping the rest of the scene in easy-three.
- For postprocessing, call the returned effect function inside `animate(..., false)`.
- For async loaded models, guard inside `animate()` until the model exists.
