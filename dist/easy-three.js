import * as $hCVgC$three from "three";
import {OrbitControls as $hCVgC$OrbitControls} from "three/addons/controls/OrbitControls.js";
import {RoundedBoxGeometry as $hCVgC$RoundedBoxGeometry} from "three/addons/geometries/RoundedBoxGeometry.js";
import {EffectComposer as $hCVgC$EffectComposer} from "three/addons/postprocessing/EffectComposer.js";
import {RenderPass as $hCVgC$RenderPass} from "three/addons/postprocessing/RenderPass.js";
import {UnrealBloomPass as $hCVgC$UnrealBloomPass} from "three/addons/postprocessing/UnrealBloomPass.js";
import {OutputPass as $hCVgC$OutputPass} from "three/addons/postprocessing/OutputPass.js";
import {ShaderPass as $hCVgC$ShaderPass} from "three/addons/postprocessing/ShaderPass.js";
import {RenderPixelatedPass as $hCVgC$RenderPixelatedPass} from "three/addons/postprocessing/RenderPixelatedPass.js";
import {ClearPass as $hCVgC$ClearPass} from "three/addons/postprocessing/ClearPass.js";
import {ClearMaskPass as $hCVgC$ClearMaskPass, MaskPass as $hCVgC$MaskPass} from "three/addons/postprocessing/MaskPass.js";
import {TexturePass as $hCVgC$TexturePass} from "three/addons/postprocessing/TexturePass.js";
import {GlitchPass as $hCVgC$GlitchPass} from "three/addons/postprocessing/GlitchPass.js";
import {RGBELoader as $hCVgC$RGBELoader} from "three/addons/loaders/RGBELoader.js";
import {GLTFLoader as $hCVgC$GLTFLoader} from "three/addons/loaders/GLTFLoader.js";
import {VRMLoaderPlugin as $hCVgC$VRMLoaderPlugin, VRMUtils as $hCVgC$VRMUtils} from "@pixiv/three-vrm";


const $9919a41b7dfae622$var$Default = {
    material: "Physical",
    color: 0x1155ff,
    texture: {
        wrapping: "Repeat"
    },
    event: {
        type: "once",
        keyTrigger: /^[A-Za-z]$/
    },
    layer: {
        bloom: 999
    },
    shader: {
        vertexShader: `varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,
        fragmentShader: `uniform sampler2D baseTexture;
uniform sampler2D bloomTexture;
varying vec2 vUv;
void main() {
  gl_FragColor = ( texture2D( baseTexture, vUv ) + vec4( 1.0 ) * texture2D( bloomTexture, vUv ) );
}`
    }
};
var $9919a41b7dfae622$export$2e2bcd8739ae039 = $9919a41b7dfae622$var$Default;



const $0ced7b84dfd9b0f2$var$prep = ({ targetName: targetName, THREE: THREE })=>{
    const domElement = targetName ? typeof targetName === "string" ? document.querySelector(targetName) : targetName : document.body;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true
    });
    renderer.shadowMap.enabled = true;
    renderer.setPixelRatio(window.devicePixelRatio);
    //renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    const controls = new (0, $hCVgC$OrbitControls)(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;
    controls.disconnect();
    const sizeTarget = domElement === document.body ? window : domElement;
    if (sizeTarget === window) {
        domElement.style.margin = 0;
        renderer.setSize(sizeTarget.innerWidth, sizeTarget.innerHeight);
    } else {
        renderer.setSize(sizeTarget.scrollWidth, sizeTarget.scrollHeight);
        camera.aspect = sizeTarget.scrollWidth / sizeTarget.scrollHeight;
        camera.updateProjectionMatrix();
    }
    domElement.appendChild(renderer.domElement);
    function sizeTargetResize() {
        if (sizeTarget === window) {
            renderer.setSize(sizeTarget.innerWidth, sizeTarget.innerHeight);
            camera.aspect = sizeTarget.innerWidth / sizeTarget.innerHeight;
        } else {
            renderer.setSize(sizeTarget.scrollWidth, sizeTarget.scrollHeight);
            camera.aspect = sizeTarget.scrollWidth / sizeTarget.scrollHeight;
        }
        camera.updateProjectionMatrix();
    }
    sizeTarget.addEventListener("resize", sizeTargetResize);
    function windowResize() {
        renderer.setSize(sizeTarget.scrollWidth, sizeTarget.scrollHeight, false);
        camera.aspect = sizeTarget.scrollWidth / sizeTarget.scrollHeight;
        camera.updateProjectionMatrix();
    }
    if (sizeTarget !== window) window.addEventListener("resize", windowResize);
    renderer.domElement.style.aspectRatio = renderer.domElement.width / renderer.domElement.height;
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "auto";
    function color(col) {
        return new THREE.Color(col);
    }
    function destroy() {
        sizeTarget.removeEventListener("resize", sizeTargetResize);
        if (sizeTarget !== window) window.removeEventListener("resize", windowResize);
        domElement.removeChild(renderer.domElement);
        renderer.dispose();
        renderer.forceContextLoss();
    }
    function noToneMapping() {
        renderer.toneMapping = THREE.NoToneMapping;
    }
    return {
        domElement: domElement,
        scene: scene,
        camera: camera,
        renderer: renderer,
        controls: controls,
        sizeTarget: sizeTarget,
        sizeTargetResize: sizeTargetResize,
        windowResize: windowResize,
        color: color,
        noToneMapping: noToneMapping,
        destroy: destroy
    };
};
var $0ced7b84dfd9b0f2$export$2e2bcd8739ae039 = $0ced7b84dfd9b0f2$var$prep;


const $bae33cf867b92199$var$animate = ({ controls: controls, renderer: renderer, scene: scene, camera: camera, THREE: THREE })=>{
    return (proc = ()=>{}, renderFlag = true)=>{
        const clock = new THREE.Clock();
        function loop() {
            controls.update();
            const delta = clock.getDelta();
            const time = clock.getElapsedTime();
            proc({
                clock: clock,
                delta: delta,
                time: time
            });
            if (renderFlag) renderer.render(scene, camera);
        }
        renderer.setAnimationLoop(loop);
    };
};
var $bae33cf867b92199$export$2e2bcd8739ae039 = $bae33cf867b92199$var$animate;


// mesh
const $f20e365c32c9805e$var$object = ({ Default: Default, scene: scene, THREE: THREE })=>{
    return (geometry, { args: args = [
        1,
        1,
        1
    ], position: position = [
        0,
        0,
        0
    ], rotation: rotation = [
        0,
        0,
        0
    ], option: option = {
        color: Default.color
    }, material: material = Default.material, castShadow: castShadow = true, receiveShadow: receiveShadow = true, autoAdd: autoAdd = true } = {})=>{
        const m = new THREE.Mesh(//new THREE[geometry](...args),
        new geometry(...args), new THREE[`Mesh${material}Material`](material === "Normal" ? {} : option));
        m.position.set(...position);
        m.rotation.set(...rotation);
        m.castShadow = castShadow;
        m.receiveShadow = receiveShadow;
        if (autoAdd) scene.add(m);
        return m;
    };
};
var $f20e365c32c9805e$export$2e2bcd8739ae039 = $f20e365c32c9805e$var$object;



const $82f2398112651ad6$var$cube = ({ create: create, sizeToArray: sizeToArray, THREE: THREE })=>{
    return ({ size: size = 1, segments: segments = 1, rounded: rounded = false, radius: radius = 0.1, ...props } = {})=>{
        return create.object(rounded ? (0, $hCVgC$RoundedBoxGeometry) : THREE.BoxGeometry, {
            ...props,
            args: [
                ...sizeToArray(size, 3),
                ...rounded ? [
                    segments,
                    radius
                ] : sizeToArray(segments, 3)
            ]
        });
    };
};
var $82f2398112651ad6$export$2e2bcd8739ae039 = $82f2398112651ad6$var$cube;


const $30cdc88952cd52d5$var$sphere = ({ create: create, THREE: THREE, sizeToArray: sizeToArray })=>{
    return ({ size: size = 1, segments: segments = 64, ...props } = {})=>{
        return create.object(THREE.SphereGeometry, {
            ...props,
            args: [
                ...sizeToArray(size, 1),
                ...sizeToArray(segments, 2)
            ]
        });
    };
};
var $30cdc88952cd52d5$export$2e2bcd8739ae039 = $30cdc88952cd52d5$var$sphere;


const $df5b3088953555a3$var$plane = ({ create: create, THREE: THREE, sizeToArray: sizeToArray })=>{
    return ({ size: size = 1, segments: segments = 1, ...props } = {})=>{
        return create.object(THREE.PlaneGeometry, {
            ...props,
            args: [
                ...sizeToArray(size, 2),
                ...sizeToArray(segments, 2)
            ]
        });
    };
};
var $df5b3088953555a3$export$2e2bcd8739ae039 = $df5b3088953555a3$var$plane;


const $f86b604c4fdbfd07$var$torus = ({ create: create, THREE: THREE, sizeToArray: sizeToArray })=>{
    return ({ size: size = 1, tube: tube = 0.4, segments: segments = 64, ...props } = {})=>{
        return create.object(THREE.TorusGeometry, {
            ...props,
            args: [
                size,
                tube,
                ...sizeToArray(segments, 2)
            ]
        });
    };
};
var $f86b604c4fdbfd07$export$2e2bcd8739ae039 = $f86b604c4fdbfd07$var$torus;


const $fd3cde552b6e8ec9$var$torusKnot = ({ create: create, THREE: THREE, sizeToArray: sizeToArray })=>{
    return ({ size: size = 1, tube: tube = 0.3, segments: segments = [
        128,
        8
    ], ...props } = {})=>{
        return create.object(THREE.TorusKnotGeometry, {
            ...props,
            args: [
                size,
                tube,
                ...sizeToArray(segments, 2)
            ]
        });
    };
};
var $fd3cde552b6e8ec9$export$2e2bcd8739ae039 = $fd3cde552b6e8ec9$var$torusKnot;


const $508270d3dd032c37$var$directionalLight = ({ scene: scene, THREE: THREE })=>{
    return ({ intensity: intensity = 1, color: color = 0xffffff, position: position = [
        10,
        10,
        10
    ], castShadow: castShadow = true, shadow: shadow = {
        mapSize: {
            width: 1024,
            height: 1024
        },
        camera: {
            left: -10,
            right: 10,
            top: 10,
            bottom: -10
        }
    } } = {})=>{
        const l = new THREE.DirectionalLight(color, intensity);
        l.position.set(...position);
        l.castShadow = castShadow;
        if (castShadow) {
            l.shadow.mapSize.width = shadow.mapSize.width;
            l.shadow.mapSize.height = shadow.mapSize.height;
            l.shadow.camera.left = shadow.camera.left;
            l.shadow.camera.right = shadow.camera.right;
            l.shadow.camera.top = shadow.camera.top;
            l.shadow.camera.bottom = shadow.camera.bottom;
        }
        scene.add(l);
        return l;
    };
};
var $508270d3dd032c37$export$2e2bcd8739ae039 = $508270d3dd032c37$var$directionalLight;


const $78f6317fd2074636$var$pointLight = ({ scene: scene, THREE: THREE })=>{
    return ({ color: color = 0xffffff, intensity: intensity = 1, distance: distance = 0, decay: decay = 2, position: position = [
        6,
        6,
        6
    ], castShadow: castShadow = true, shadow: shadow = {
        mapSize: [
            1024,
            1024
        ]
    } } = {})=>{
        const l = new THREE.PointLight(color, intensity, distance, decay);
        l.position.set(...position);
        l.castShadow = castShadow;
        if (castShadow) l.shadow.mapSize = shadow.mapSize;
        scene.add(l);
        return l;
    };
};
var $78f6317fd2074636$export$2e2bcd8739ae039 = $78f6317fd2074636$var$pointLight;


const $84fd401be7488881$var$ambientLight = ({ scene: scene, THREE: THREE })=>{
    return ({ color: color = 0xffffff, intensity: intensity = 0.5 } = {})=>{
        const l = new THREE.AmbientLight(color, intensity);
        scene.add(l);
        return l;
    };
};
var $84fd401be7488881$export$2e2bcd8739ae039 = $84fd401be7488881$var$ambientLight;


const $da304eeb988bba6b$var$fog = ({ scene: scene, THREE: THREE })=>{
    return ({ color: color = 0xffffff, near: near = 1, far: far = 1000 } = {})=>{
        scene.fog = new THREE.Fog(color, near, far);
        return scene.fog;
    };
};
var $da304eeb988bba6b$export$2e2bcd8739ae039 = $da304eeb988bba6b$var$fog;


const $a86c558581692e3f$var$group = ({ THREE: THREE, scene: scene })=>{
    return ({ position: position = [
        0,
        0,
        0
    ], rotation: rotation = [
        0,
        0,
        0
    ], children: children = [], autoAdd: autoAdd = true, ...props } = {})=>{
        const result = new THREE.Group();
        result.position.set(...position);
        result.rotation.set(...rotation);
        children.forEach((c)=>{
            if (c instanceof THREE.Object3D) result.add(c);
        });
        if (autoAdd) scene.add(result);
        return result;
    };
};
var $a86c558581692e3f$export$2e2bcd8739ae039 = $a86c558581692e3f$var$group;


const $0a045edf0b7cf4c6$var$textTexture = ({ THREE: THREE })=>{
    return (text, { fontSize: fontSize = 48, font: font = "'Noto Sans JP', sans-serif", fontWeight: fontWeight = "", color: color = "#000000", size: size = [
        500,
        500
    ], textAlign: textAlign = "center", textBaseline: textBaseline = "middle", background: background = false, guide: guide = 0, guideColor: guideColor = "#ff0000" } = {})=>{
        const canvas = document.createElement("canvas");
        canvas.width = size[0];
        canvas.height = size[1];
        const ctx = canvas.getContext("2d");
        ctx.fillStyle = guideColor;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        if (background) {
            ctx.fillStyle = background;
            ctx.fillRect(guide, guide, canvas.width - guide * 2, canvas.height - guide * 2);
        } else ctx.clearRect(guide, guide, canvas.width - guide * 2, canvas.height - guide * 2);
        ctx.font = `${fontWeight} ${fontSize}px ${font}`;
        ctx.fillStyle = color;
        ctx.textAlign = textAlign;
        ctx.textBaseline = textBaseline;
        ctx.fillText(text, canvas.width / 2, canvas.height / 2);
        const texture = new THREE.CanvasTexture(canvas);
        texture.colorSpace = THREE.SRGBColorSpace;
        return texture;
    };
};
var $0a045edf0b7cf4c6$export$2e2bcd8739ae039 = $0a045edf0b7cf4c6$var$textTexture;


const $6fd9e9b597d04ec7$var$text = ({ create: create, THREE: THREE, sizeToArray: sizeToArray, scene: scene })=>{
    return (text, { fontSize: fontSize = 48, font: font = "'Noto Sans JP', sans-serif", fontWeight: fontWeight = "", position: position = [
        0,
        0,
        0
    ], rotation: rotation = [
        0,
        0,
        0
    ], color: color = "#000000", size: size = 1, resolution: resolution = 1, textAlign: textAlign = "center", textBaseline: textBaseline = "middle", background: background = false, side: side = "DoubleSide", autoAdd: autoAdd = true, guide: guide = 0, guideColor: guideColor = "#ff0000" } = {})=>{
        const s = sizeToArray(size, 2);
        const texture = create.textTexture(text, {
            fontSize: fontSize * resolution,
            font: font,
            fontWeight: fontWeight,
            color: color,
            size: [
                s[0] * 100 * resolution,
                s[1] * 100 * resolution
            ],
            textAlign: textAlign,
            textBaseline: textBaseline,
            background: background,
            guide: guide,
            guideColor: guideColor
        });
        const material = new THREE.MeshBasicMaterial({
            transparent: true,
            map: texture,
            side: THREE[side]
        });
        const geometry = new THREE.PlaneGeometry(...s);
        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(...position);
        mesh.rotation.set(...rotation);
        if (autoAdd) scene.add(mesh);
        return mesh;
    };
};
var $6fd9e9b597d04ec7$export$2e2bcd8739ae039 = $6fd9e9b597d04ec7$var$text;


const $3dadf42ac8c3d0c8$var$use = [
    // mesh
    {
        name: "object",
        fn: (0, $f20e365c32c9805e$export$2e2bcd8739ae039)
    },
    {
        name: 'cube',
        fn: (0, $82f2398112651ad6$export$2e2bcd8739ae039)
    },
    {
        name: 'box',
        fn: (0, $82f2398112651ad6$export$2e2bcd8739ae039)
    },
    {
        name: 'sphere',
        fn: (0, $30cdc88952cd52d5$export$2e2bcd8739ae039)
    },
    {
        name: 'plane',
        fn: (0, $df5b3088953555a3$export$2e2bcd8739ae039)
    },
    {
        name: 'torus',
        fn: (0, $f86b604c4fdbfd07$export$2e2bcd8739ae039)
    },
    {
        name: 'torusKnot',
        fn: (0, $fd3cde552b6e8ec9$export$2e2bcd8739ae039)
    },
    // lights
    {
        name: 'directionalLight',
        fn: (0, $508270d3dd032c37$export$2e2bcd8739ae039)
    },
    {
        name: 'pointLight',
        fn: (0, $78f6317fd2074636$export$2e2bcd8739ae039)
    },
    {
        name: 'ambientLight',
        fn: (0, $84fd401be7488881$export$2e2bcd8739ae039)
    },
    // misc
    {
        name: 'fog',
        fn: (0, $da304eeb988bba6b$export$2e2bcd8739ae039)
    },
    {
        name: 'group',
        fn: (0, $a86c558581692e3f$export$2e2bcd8739ae039)
    },
    {
        name: 'textTexture',
        fn: (0, $0a045edf0b7cf4c6$export$2e2bcd8739ae039)
    },
    {
        name: 'text',
        fn: (0, $6fd9e9b597d04ec7$export$2e2bcd8739ae039)
    }
];
function $3dadf42ac8c3d0c8$var$sizeToArray(size, n = 3) {
    return isNaN(size) ? size : Array(n).fill(size);
}
const $3dadf42ac8c3d0c8$var$addCreate = ({ Default: Default, create: create, scene: scene, THREE: THREE })=>{
    $3dadf42ac8c3d0c8$var$use.forEach((v)=>{
        create[v.name] = v.fn({
            Default: Default,
            create: create,
            scene: scene,
            sizeToArray: $3dadf42ac8c3d0c8$var$sizeToArray,
            THREE: THREE
        });
    });
};
var $3dadf42ac8c3d0c8$export$2e2bcd8739ae039 = $3dadf42ac8c3d0c8$var$addCreate;






const $d94cab559425feb6$var$bloom = ({ renderer: renderer, scene: scene, camera: camera, THREE: THREE, color: color, sizeTarget: sizeTarget })=>{
    return ({ exposure: exposure = 1, background: background = 0x000000, threshold: threshold = 0, strength: strength = 1, radius: radius = 0.5 } = {})=>{
        renderer.toneMappingExposure = Math.pow(exposure, 4.0);
        scene.background = color(background);
        const renderScene = new (0, $hCVgC$RenderPass)(scene, camera);
        const bloomPass = new (0, $hCVgC$UnrealBloomPass)(new THREE.Vector2(sizeTarget.scrollWidth, sizeTarget.scrollHeight), 1.5, 0.4, 0.85);
        bloomPass.threshold = threshold;
        bloomPass.strength = strength;
        bloomPass.radius = radius;
        const outputPass = new (0, $hCVgC$OutputPass)();
        const composer = new (0, $hCVgC$EffectComposer)(renderer);
        composer.addPass(renderScene);
        composer.addPass(bloomPass);
        composer.addPass(outputPass);
        const p = {
            threshold: threshold,
            strength: strength,
            radius: radius
        };
        return {
            bloom: ({ threshold: threshold = p.threshold, strength: strength = p.strength, radius: radius = p.radius } = {})=>{
                bloomPass.threshold = threshold;
                bloomPass.strength = strength;
                bloomPass.radius = radius;
                composer.render();
            }
        };
    };
};
var $d94cab559425feb6$export$2e2bcd8739ae039 = $d94cab559425feb6$var$bloom;







const $6c5c5eeb939e3191$var$selectedBloom = ({ renderer: renderer, scene: scene, camera: camera, THREE: THREE, color: color, sizeTarget: sizeTarget, Default: Default })=>{
    return ({ exposure: exposure = 1, background: background = false, threshold: threshold = 0, strength: strength = 1, radius: radius = 0.5 } = {})=>{
        renderer.toneMappingExposure = Math.pow(exposure, 4.0);
        if (background) scene.background = color(background);
        const bloomLayer = new THREE.Layers();
        bloomLayer.set(Default.layer.bloom);
        const renderScene = new (0, $hCVgC$RenderPass)(scene, camera);
        const bloomPass = new (0, $hCVgC$UnrealBloomPass)(new THREE.Vector2(sizeTarget.scrollWidth, sizeTarget.scrollHeight), 1.5, 0.4, 0.85);
        bloomPass.threshold = threshold;
        bloomPass.strength = strength;
        bloomPass.radius = radius;
        const bloomComposer = new (0, $hCVgC$EffectComposer)(renderer);
        bloomComposer.renderToScreen = false;
        bloomComposer.addPass(renderScene);
        bloomComposer.addPass(bloomPass);
        const mixPass = new (0, $hCVgC$ShaderPass)(new THREE.ShaderMaterial({
            uniforms: {
                baseTexture: {
                    value: null
                },
                bloomTexture: {
                    value: bloomComposer.renderTarget2.texture
                }
            },
            vertexShader: Default.shader.vertexShader,
            fragmentShader: Default.shader.fragmentShader,
            defines: {}
        }), "baseTexture");
        mixPass.needsSwap = true;
        const outputPass = new (0, $hCVgC$OutputPass)();
        const finalComposer = new (0, $hCVgC$EffectComposer)(renderer);
        finalComposer.addPass(renderScene);
        finalComposer.addPass(mixPass);
        finalComposer.addPass(outputPass);
        const darkMaterial = new THREE.MeshBasicMaterial({
            color: "black"
        });
        const materials = {};
        let bg = scene.background;
        const p = {
            threshold: threshold,
            strength: strength,
            radius: radius
        };
        return {
            selectedBloom: ({ threshold: threshold = p.threshold, strength: strength = p.strength, radius: radius = p.radius } = {})=>{
                bloomPass.threshold = threshold;
                bloomPass.strength = strength;
                bloomPass.radius = radius;
                scene.traverse((obj)=>{
                    if (obj.isMesh && bloomLayer.test(obj.layers) === false) {
                        materials[obj.uuid] = obj.material;
                        obj.material = darkMaterial;
                    } else if (/Helper$/.test(obj.type) && bloomLayer.test(obj.layers) === false) {
                        materials[obj.uuid] = obj.material;
                        obj.material = darkMaterial;
                    }
                });
                bg = scene.background;
                scene.background = color(0x000000);
                bloomComposer.render();
                scene.background = bg;
                scene.traverse((obj)=>{
                    if (materials[obj.uuid]) {
                        obj.material = materials[obj.uuid];
                        delete materials[obj.uuid];
                    }
                });
                finalComposer.render();
            },
            addSelectedBloom: (...list)=>{
                list.forEach((obj)=>{
                    obj.layers.enable(Default.layer.bloom);
                });
            }
        };
    };
};
var $6c5c5eeb939e3191$export$2e2bcd8739ae039 = $6c5c5eeb939e3191$var$selectedBloom;





const $0f9bb4f7bf17a1a2$var$pixel = ({ renderer: renderer, scene: scene, camera: camera })=>{
    return ({ size: size = 6, normalEdge: normalEdge = 0.3, depthEdge: depthEdge = 0.4 } = {})=>{
        const composer = new (0, $hCVgC$EffectComposer)(renderer);
        const renderPixelatedPass = new (0, $hCVgC$RenderPixelatedPass)(size, scene, camera);
        composer.addPass(renderPixelatedPass);
        const outputPass = new (0, $hCVgC$OutputPass)();
        composer.addPass(outputPass);
        const p = {
            size: size,
            normalEdge: normalEdge,
            depthEdge: depthEdge
        };
        return {
            pixel: ({ size: size = p.size, normalEdge: normalEdge = p.normalEdge, depthEdge: depthEdge = p.depthEdge } = {})=>{
                renderPixelatedPass.setPixelSize(size);
                renderPixelatedPass.normalEdge = normalEdge;
                renderPixelatedPass.depthEdge = depthEdge;
                composer.render();
            }
        };
    };
};
var $0f9bb4f7bf17a1a2$export$2e2bcd8739ae039 = $0f9bb4f7bf17a1a2$var$pixel;







const $ca829de28b5e12e0$var$mask = ({ renderer: renderer, scene: scene, camera: camera, THREE: THREE, sizeTarget: sizeTarget })=>{
    return (texture)=>{
        renderer.autoClear = false;
        const clearPass = new (0, $hCVgC$ClearPass)();
        const clearMaskPass = new (0, $hCVgC$ClearMaskPass)();
        const maskPass = new (0, $hCVgC$MaskPass)(scene, camera);
        const texturePass = new (0, $hCVgC$TexturePass)(texture);
        const outputPass = new (0, $hCVgC$OutputPass)();
        const renderTarget = new THREE.WebGLRenderTarget(sizeTarget.scrollWidth, sizeTarget.scrollHeight, {
            stencilBuffer: true
        });
        const composer = new (0, $hCVgC$EffectComposer)(renderer, renderTarget);
        composer.addPass(clearPass);
        composer.addPass(maskPass);
        composer.addPass(texturePass);
        composer.addPass(clearMaskPass);
        composer.addPass(outputPass);
        return {
            mask: (time)=>{
                renderer.clear();
                composer.render(time);
            }
        };
    };
};
var $ca829de28b5e12e0$export$2e2bcd8739ae039 = $ca829de28b5e12e0$var$mask;






const $055c605dd3f7b6e5$var$glitch = ({ renderer: renderer, scene: scene, camera: camera })=>{
    return ({ wild: wild = false } = {})=>{
        const composer = new (0, $hCVgC$EffectComposer)(renderer);
        composer.addPass(new (0, $hCVgC$RenderPass)(scene, camera));
        const glitchPass = new (0, $hCVgC$GlitchPass)();
        composer.addPass(glitchPass);
        const outputPass = new (0, $hCVgC$OutputPass)();
        composer.addPass(outputPass);
        glitchPass.goWild = wild;
        const p = {
            wild: wild
        };
        return {
            glitch: ({ wild: wild = p.wild } = {})=>{
                glitchPass.goWild = wild;
                composer.render();
            }
        };
    };
};
var $055c605dd3f7b6e5$export$2e2bcd8739ae039 = $055c605dd3f7b6e5$var$glitch;


const $06168e3617d4de6e$var$use = [
    {
        name: "bloom",
        fn: (0, $d94cab559425feb6$export$2e2bcd8739ae039)
    },
    {
        name: "selectedBloom",
        fn: (0, $6c5c5eeb939e3191$export$2e2bcd8739ae039)
    },
    {
        name: "pixel",
        fn: (0, $0f9bb4f7bf17a1a2$export$2e2bcd8739ae039)
    },
    {
        name: "mask",
        fn: (0, $ca829de28b5e12e0$export$2e2bcd8739ae039)
    },
    {
        name: "glitch",
        fn: (0, $055c605dd3f7b6e5$export$2e2bcd8739ae039)
    }
];
const $06168e3617d4de6e$var$addPostprocessing = ({ renderer: renderer, camera: camera, scene: scene, THREE: THREE, postprocessing: postprocessing, color: color, sizeTarget: sizeTarget, Default: Default })=>{
    $06168e3617d4de6e$var$use.forEach((v)=>{
        postprocessing[v.name] = v.fn({
            renderer: renderer,
            camera: camera,
            scene: scene,
            THREE: THREE,
            color: color,
            sizeTarget: sizeTarget,
            Default: Default
        });
    });
};
var $06168e3617d4de6e$export$2e2bcd8739ae039 = $06168e3617d4de6e$var$addPostprocessing;



const $36f4aba2b21150b9$var$background = ({ THREE: THREE, scene: scene })=>{
    return (url, { background: background = true, environment: environment = true } = {})=>{
        const t = new (0, $hCVgC$RGBELoader)().load(url, (texture)=>{
            texture.mapping = THREE.EquirectangularReflectionMapping;
            if (background) scene.background = texture;
            if (environment) scene.environment = texture;
        });
        return t;
    };
};
var $36f4aba2b21150b9$export$2e2bcd8739ae039 = $36f4aba2b21150b9$var$background;


const $2f28222868c4bfe6$var$texture = ({ Default: Default, THREE: THREE })=>{
    return (url, { wrapS: wrapS = Default.texture.wrapping, wrapT: wrapT = Default.texture.wrapping, repeat: repeat = [
        1,
        1
    ] } = {})=>{
        const textureLoader = new THREE.TextureLoader();
        const texture = textureLoader.load(url);
        texture.wrapS = THREE[`${wrapS}Wrapping`];
        texture.wrapT = THREE[`${wrapT}Wrapping`];
        texture.repeat = new THREE.Vector2(...repeat);
        texture.colorSpace = THREE.SRGBColorSpace;
        return texture;
    };
};
var $2f28222868c4bfe6$export$2e2bcd8739ae039 = $2f28222868c4bfe6$var$texture;



const $1ebf844a5f41bb5b$var$gltf = ({ scene: scene })=>{
    return async (url, { position: position = [
        0,
        0,
        0
    ], rotation: rotation = [
        0,
        0,
        0
    ], scale: scale = [
        1,
        1,
        1
    ], autoAdd: autoAdd = true } = {})=>{
        const gltf = await new (0, $hCVgC$GLTFLoader)().loadAsync(url);
        gltf.scene.position.set(...position);
        gltf.scene.rotation.set(...rotation);
        gltf.scene.scale.set(...scale);
        if (autoAdd) scene.add(gltf.scene);
        return gltf;
    };
};
var $1ebf844a5f41bb5b$export$2e2bcd8739ae039 = $1ebf844a5f41bb5b$var$gltf;




const $375b7e47b2efb671$var$vrm = ({ scene: scene })=>{
    return async (url, { position: position = [
        0,
        0,
        0
    ], rotation: rotation = [
        0,
        0,
        0
    ], scale: scale = [
        1,
        1,
        1
    ], autoAdd: autoAdd = true, onProgress: onProgress = (p)=>{} } = {})=>{
        const vrmLoader = new (0, $hCVgC$GLTFLoader)();
        vrmLoader.register((parser)=>new (0, $hCVgC$VRMLoaderPlugin)(parser));
        const gltf = await vrmLoader.loadAsync(url, onProgress);
        const model = gltf.userData.vrm;
        (0, $hCVgC$VRMUtils).removeUnnecessaryVertices(model.scene);
        //VRMUtils.removeUnnecessaryJoints(model.scene); // deprecated
        (0, $hCVgC$VRMUtils).combineSkeletons(model.scene);
        model.scene.traverse((obj)=>{
            obj.frustumCulled = false;
            if (obj.isMesh) obj.castShadow = true;
        });
        model.scene.position.set(...position);
        model.scene.rotation.set(...rotation);
        model.scene.scale.set(...scale);
        model.bone = (name)=>model.humanoid.getNormalizedBoneNode(name);
        model.dispose = ()=>{
            scene.remove(model.scene);
            (0, $hCVgC$VRMUtils).deepDispose(model.scene);
        };
        if (autoAdd) scene.add(model.scene);
        return model;
    };
};
var $375b7e47b2efb671$export$2e2bcd8739ae039 = $375b7e47b2efb671$var$vrm;


const $0f236b0a392c464e$var$videoTexture = ({ THREE: THREE })=>{
    return (url, { autoPlay: autoPlay = true, loop: loop = true } = {})=>{
        const video = document.createElement("video");
        video.crossOrigin = "anonymous";
        video.onloadeddata = ()=>{
            video.play();
        };
        //video.muted = true;
        video.loop = loop;
        video.setAttribute("playsinline", "");
        video.setAttribute("muted", "");
        if (autoPlay) video.setAttribute("autoplay", "");
        video.src = url;
        const texture = new THREE.VideoTexture(video);
        texture.colorSpace = THREE.SRGBColorSpace;
        return texture;
    };
};
var $0f236b0a392c464e$export$2e2bcd8739ae039 = $0f236b0a392c464e$var$videoTexture;


const $a47b782ec0f8ff15$var$cubeTexture = ({ THREE: THREE })=>{
    return (urls, { path: path = "./" } = {})=>{
        const texture = new THREE.CubeTextureLoader().setPath(path).load(urls);
        return texture;
    };
};
var $a47b782ec0f8ff15$export$2e2bcd8739ae039 = $a47b782ec0f8ff15$var$cubeTexture;


const $076b402cfa10e3f5$var$use = [
    {
        name: "background",
        fn: (0, $36f4aba2b21150b9$export$2e2bcd8739ae039)
    },
    {
        name: "texture",
        fn: (0, $2f28222868c4bfe6$export$2e2bcd8739ae039)
    },
    {
        name: "gltf",
        fn: (0, $1ebf844a5f41bb5b$export$2e2bcd8739ae039)
    },
    {
        name: "vrm",
        fn: (0, $375b7e47b2efb671$export$2e2bcd8739ae039)
    },
    {
        name: "videoTexture",
        fn: (0, $0f236b0a392c464e$export$2e2bcd8739ae039)
    },
    {
        name: "cubeTexture",
        fn: (0, $a47b782ec0f8ff15$export$2e2bcd8739ae039)
    }
];
const $076b402cfa10e3f5$var$addLoad = ({ Default: Default, THREE: THREE, load: load, scene: scene })=>{
    $076b402cfa10e3f5$var$use.forEach((v)=>{
        load[v.name] = v.fn({
            Default: Default,
            THREE: THREE,
            scene: scene
        });
    });
};
var $076b402cfa10e3f5$export$2e2bcd8739ae039 = $076b402cfa10e3f5$var$addLoad;


const $5e752c2c9922649e$var$axes = ({ scene: scene, THREE: THREE })=>{
    return ({ size: size = 10 } = {})=>{
        const a = new THREE.AxesHelper(size);
        a.position.y = 0.01;
        scene.add(a);
        return a;
    };
};
var $5e752c2c9922649e$export$2e2bcd8739ae039 = $5e752c2c9922649e$var$axes;


const $84f356d5940bb3c4$var$grid = ({ scene: scene, THREE: THREE })=>{
    return ({ size: size = 10, divisions: divisions = 10, colorCenterLine: colorCenterLine = 0x444444, colorGrid: colorGrid = 0x888888 } = {})=>{
        const g = new THREE.GridHelper(size, divisions, colorCenterLine, colorGrid);
        g.position.y = 0.005;
        scene.add(g);
        return g;
    };
};
var $84f356d5940bb3c4$export$2e2bcd8739ae039 = $84f356d5940bb3c4$var$grid;


const $775915307885c7ae$var$use = [
    {
        name: "axes",
        fn: (0, $5e752c2c9922649e$export$2e2bcd8739ae039)
    },
    {
        name: "grid",
        fn: (0, $84f356d5940bb3c4$export$2e2bcd8739ae039)
    }
];
const $775915307885c7ae$var$addHelper = ({ THREE: THREE, scene: scene, helper: helper })=>{
    $775915307885c7ae$var$use.forEach((v)=>{
        helper[v.name] = v.fn({
            THREE: THREE,
            scene: scene
        });
    });
};
var $775915307885c7ae$export$2e2bcd8739ae039 = $775915307885c7ae$var$addHelper;


const $2fc0d12897a274b3$var$mouse = ({ Default: Default, THREE: THREE, domElement: domElement, event: event })=>{
    return class {
        static #eventList = {
            click: [],
            mousedown: [],
            mouseup: [],
            mousemove: []
        };
        static #id = 0;
        static #idMap = {};
        static{
            domElement.addEventListener("click", (e)=>{
                const target = e.target;
                const rect = target.getBoundingClientRect();
                const pos = new THREE.Vector2(e.clientX - rect.x, e.clientY - rect.y);
                this.#eventList.click.forEach((callback)=>{
                    callback(pos, e);
                });
            });
            domElement.addEventListener("mousedown", (e)=>{
                const target = e.target;
                const rect = target.getBoundingClientRect();
                const pos = new THREE.Vector2(e.clientX - rect.x, e.clientY - rect.y);
                this.#eventList.mousedown.forEach((callback)=>{
                    callback(pos, e);
                });
            });
            domElement.addEventListener("mouseup", (e)=>{
                const target = e.target;
                const rect = target.getBoundingClientRect();
                const pos = new THREE.Vector2(e.clientX - rect.x, e.clientY - rect.y);
                this.#eventList.mouseup.forEach((callback)=>{
                    callback(pos, e);
                });
            });
            domElement.addEventListener("mousemove", (e)=>{
                const target = e.target;
                const rect = target.getBoundingClientRect();
                const pos = new THREE.Vector2(e.clientX - rect.x, e.clientY - rect.y);
                this.#eventList.mousemove.forEach((callback)=>{
                    callback(pos, e);
                });
            });
            domElement.addEventListener("touchstart", (e)=>{
                const target = e.target;
                const rect = target.getBoundingClientRect();
                const touch = e.changedTouches[0];
                const pos = new THREE.Vector2(touch.clientX - rect.x, touch.clientY - rect.y);
                this.#eventList.mousedown.forEach((callback)=>{
                    callback(pos, e);
                });
            });
            domElement.addEventListener("touchend", (e)=>{
                const target = e.target;
                const rect = target.getBoundingClientRect();
                const touch = e.changedTouches[0];
                const pos = new THREE.Vector2(touch.clientX - rect.x, touch.clientY - rect.y);
                this.#eventList.mouseup.forEach((callback)=>{
                    callback(pos, e);
                });
            });
            domElement.addEventListener("touchmove", (e)=>{
                const target = e.target;
                const rect = target.getBoundingClientRect();
                const touch = e.changedTouches[0];
                const pos = new THREE.Vector2(touch.clientX - rect.x, touch.clientY - rect.y);
                this.#eventList.mousemove.forEach((callback)=>{
                    callback(pos, e);
                });
            });
        }
        static #addMap(key, index) {
            if (this.#idMap[this.#id] === undefined) this.#idMap[this.#id] = {};
            if (this.#idMap[this.#id][key] === undefined) this.#idMap[this.#id][key] = [];
            this.#idMap[this.#id][key].push(index);
        }
        static add(callback = ()=>{}, { type: type = Default.event.type } = {}) {
            const listener = {
                once: "click",
                down: "mousedown",
                up: "mouseup",
                move: "mousemove"
            };
            if (typeof type === "string") {
                if (type === "all") {
                    Object.entries(this.#eventList).forEach(([key, list])=>{
                        this.#addMap(`${key}`, list.length);
                        list.push(callback);
                    });
                    const _id = this.#id;
                    const result = ()=>{
                        event.mouse.remove(_id);
                    };
                    this.#id++;
                    return result;
                }
                if (this.#eventList[listener[type]] !== undefined) {
                    this.#addMap(listener[type], this.#eventList[listener[type]].length);
                    this.#eventList[listener[type]].push(callback);
                    const _id = this.#id;
                    const result = ()=>{
                        event.mouse.remove(_id);
                    };
                    this.#id++;
                    return result;
                }
            }
        }
        static remove(id) {
            Object.entries(this.#idMap[id])?.forEach(([key, list])=>{
                list.forEach((index)=>{
                    this.#eventList[key][index] = ()=>{};
                });
            });
        }
    };
};
var $2fc0d12897a274b3$export$2e2bcd8739ae039 = $2fc0d12897a274b3$var$mouse;


const $9281a0aa93afcf8e$var$key = ({ Default: Default, domElement: domElement, event: event })=>{
    return class {
        static #eventList = {
            keypress: [],
            keydown: [],
            keyup: []
        };
        static #id = 0;
        static #idMap = {};
        static{
            domElement.addEventListener("keypress", (e)=>{
                this.#eventList.keypress.forEach((callback)=>{
                    callback(e.key, e);
                });
            });
            domElement.addEventListener("keydown", (e)=>{
                this.#eventList.keydown.forEach((callback)=>{
                    callback(e.key, e);
                });
            });
            domElement.addEventListener("keyup", (e)=>{
                this.#eventList.keyup.forEach((callback)=>{
                    callback(e.key, e);
                });
            });
        }
        static #addMap(key, index) {
            if (this.#idMap[this.#id] === undefined) this.#idMap[this.#id] = {};
            if (this.#idMap[this.#id][key] === undefined) this.#idMap[this.#id][key] = [];
            this.#idMap[this.#id][key].push(index);
        }
        static #wrapCallback(callback, trigger) {
            let result;
            if (trigger instanceof RegExp) result = (key, e)=>{
                if (trigger.test(key)) callback(key, e);
            };
            else result = (key, e)=>{
                if (key === trigger) callback(key, e);
            };
            return result;
        }
        static add(callback = ()=>{}, { type: type = Default.event.type, trigger: trigger = Default.event.keyTrigger } = {}) {
            const listener = {
                once: "keypress",
                down: "keydown",
                up: "keyup"
            };
            if (typeof type === "string") {
                if (type === "all") {
                    Object.entries(this.#eventList).forEach(([key, list])=>{
                        this.#addMap(`${key}`, list.length);
                        list.push(this.#wrapCallback(callback, trigger));
                    });
                    const _id = this.#id;
                    const result = ()=>{
                        event.key.remove(_id);
                    };
                    this.#id++;
                    return result;
                }
                if (this.#eventList[listener[type]] !== undefined) {
                    this.#addMap(listener[type], this.#eventList[listener[type]].length);
                    this.#eventList[listener[type]].push(this.#wrapCallback(callback, trigger));
                    const _id = this.#id;
                    const result = ()=>{
                        event.key.remove(_id);
                    };
                    this.#id++;
                    return result;
                }
            }
        }
        static remove(id) {
            Object.entries(this.#idMap[id])?.forEach(([key, list])=>{
                list.forEach((index)=>{
                    this.#eventList[key][index] = ()=>{};
                });
            });
        }
    };
};
var $9281a0aa93afcf8e$export$2e2bcd8739ae039 = $9281a0aa93afcf8e$var$key;


const $ca7a14e07c23f2ee$var$use = [
    {
        name: "mouse",
        fn: (0, $2fc0d12897a274b3$export$2e2bcd8739ae039)
    },
    {
        name: "key",
        fn: (0, $9281a0aa93afcf8e$export$2e2bcd8739ae039)
    }
];
const $ca7a14e07c23f2ee$var$addEvent = ({ Default: Default, THREE: THREE, event: event, domElement: domElement })=>{
    $ca7a14e07c23f2ee$var$use.forEach((v)=>{
        event[v.name] = v.fn({
            Default: Default,
            THREE: THREE,
            event: event,
            domElement: domElement
        });
    });
};
var $ca7a14e07c23f2ee$export$2e2bcd8739ae039 = $ca7a14e07c23f2ee$var$addEvent;


function $a1e4e17f7ef16c93$export$2cd8252107eb640b(targetName) {
    const Default = (0, $9919a41b7dfae622$export$2e2bcd8739ae039);
    const { domElement: domElement, scene: scene, camera: camera, renderer: renderer, controls: controls, sizeTarget: sizeTarget, sizeTargetResize: sizeTargetResize, windowResize: windowResize, color: color, noToneMapping: noToneMapping, destroy: destroy } = (0, $0ced7b84dfd9b0f2$export$2e2bcd8739ae039)({
        targetName: targetName,
        THREE: $hCVgC$three
    });
    const create = {};
    (0, $3dadf42ac8c3d0c8$export$2e2bcd8739ae039)({
        create: create,
        Default: Default,
        scene: scene,
        THREE: $hCVgC$three
    });
    const animate = (0, $bae33cf867b92199$export$2e2bcd8739ae039)({
        controls: controls,
        renderer: renderer,
        scene: scene,
        camera: camera,
        THREE: $hCVgC$three
    });
    const helper = {};
    (0, $775915307885c7ae$export$2e2bcd8739ae039)({
        helper: helper,
        scene: scene,
        THREE: $hCVgC$three
    });
    const postprocessing = {};
    (0, $06168e3617d4de6e$export$2e2bcd8739ae039)({
        postprocessing: postprocessing,
        renderer: renderer,
        camera: camera,
        scene: scene,
        THREE: $hCVgC$three,
        color: color,
        sizeTarget: sizeTarget,
        Default: Default
    });
    const load = {};
    (0, $076b402cfa10e3f5$export$2e2bcd8739ae039)({
        load: load,
        Default: Default,
        THREE: $hCVgC$three,
        scene: scene
    });
    const event = {};
    (0, $ca7a14e07c23f2ee$export$2e2bcd8739ae039)({
        Default: Default,
        THREE: $hCVgC$three,
        event: event,
        domElement: domElement
    });
    return {
        Default: Default,
        scene: scene,
        camera: camera,
        renderer: renderer,
        controls: controls,
        create: create,
        load: load,
        helper: helper,
        event: event,
        animate: animate,
        THREE: $hCVgC$three,
        color: color,
        postprocessing: postprocessing,
        noToneMapping: noToneMapping,
        destroy: destroy
    };
}


export {$a1e4e17f7ef16c93$export$2cd8252107eb640b as init};
//# sourceMappingURL=easy-three.js.map
