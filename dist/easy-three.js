import * as $1LQKV$three from "three";
import {OrbitControls as $1LQKV$OrbitControls} from "three/addons/controls/OrbitControls.js";
import {RoundedBoxGeometry as $1LQKV$RoundedBoxGeometry} from "three/addons/geometries/RoundedBoxGeometry.js";
import {EffectComposer as $1LQKV$EffectComposer} from "three/addons/postprocessing/EffectComposer.js";
import {RenderPass as $1LQKV$RenderPass} from "three/addons/postprocessing/RenderPass.js";
import {UnrealBloomPass as $1LQKV$UnrealBloomPass} from "three/addons/postprocessing/UnrealBloomPass.js";
import {OutputPass as $1LQKV$OutputPass} from "three/addons/postprocessing/OutputPass.js";
import {ShaderPass as $1LQKV$ShaderPass} from "three/addons/postprocessing/ShaderPass.js";
import {RenderPixelatedPass as $1LQKV$RenderPixelatedPass} from "three/addons/postprocessing/RenderPixelatedPass.js";
import {ClearPass as $1LQKV$ClearPass} from "three/addons/postprocessing/ClearPass.js";
import {ClearMaskPass as $1LQKV$ClearMaskPass, MaskPass as $1LQKV$MaskPass} from "three/addons/postprocessing/MaskPass.js";
import {TexturePass as $1LQKV$TexturePass} from "three/addons/postprocessing/TexturePass.js";
import {GlitchPass as $1LQKV$GlitchPass} from "three/addons/postprocessing/GlitchPass.js";
import {RGBELoader as $1LQKV$RGBELoader} from "three/addons/loaders/RGBELoader.js";
import {GLTFLoader as $1LQKV$GLTFLoader} from "three/addons/loaders/GLTFLoader.js";
import {VRMLoaderPlugin as $1LQKV$VRMLoaderPlugin, VRMUtils as $1LQKV$VRMUtils} from "@pixiv/three-vrm";


const $05e1af71c54d2f4c$var$Default = {
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
var $05e1af71c54d2f4c$export$2e2bcd8739ae039 = $05e1af71c54d2f4c$var$Default;



const $b0f8916483f44240$var$prep = ({ targetName: targetName, THREE: THREE })=>{
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
    const controls = new (0, $1LQKV$OrbitControls)(camera, renderer.domElement);
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
var $b0f8916483f44240$export$2e2bcd8739ae039 = $b0f8916483f44240$var$prep;


const $9a66eab6426948d4$var$animate = ({ controls: controls, renderer: renderer, scene: scene, camera: camera, THREE: THREE })=>{
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
var $9a66eab6426948d4$export$2e2bcd8739ae039 = $9a66eab6426948d4$var$animate;


// mesh
const $5206c8db530eb142$var$object = ({ Default: Default, scene: scene, THREE: THREE })=>{
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
var $5206c8db530eb142$export$2e2bcd8739ae039 = $5206c8db530eb142$var$object;



const $c81e5b4e69e1e951$var$cube = ({ create: create, sizeToArray: sizeToArray, THREE: THREE })=>{
    return ({ size: size = 1, segments: segments = 1, rounded: rounded = false, radius: radius = 0.1, ...props } = {})=>{
        return create.object(rounded ? (0, $1LQKV$RoundedBoxGeometry) : THREE.BoxGeometry, {
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
var $c81e5b4e69e1e951$export$2e2bcd8739ae039 = $c81e5b4e69e1e951$var$cube;


const $46ce0a632517c8a3$var$sphere = ({ create: create, THREE: THREE, sizeToArray: sizeToArray })=>{
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
var $46ce0a632517c8a3$export$2e2bcd8739ae039 = $46ce0a632517c8a3$var$sphere;


const $a07f03dd5acbaa66$var$plane = ({ create: create, THREE: THREE, sizeToArray: sizeToArray })=>{
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
var $a07f03dd5acbaa66$export$2e2bcd8739ae039 = $a07f03dd5acbaa66$var$plane;


const $2ba94d3f1d60bf98$var$torus = ({ create: create, THREE: THREE, sizeToArray: sizeToArray })=>{
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
var $2ba94d3f1d60bf98$export$2e2bcd8739ae039 = $2ba94d3f1d60bf98$var$torus;


const $c40d2f6fe98574a8$var$torusKnot = ({ create: create, THREE: THREE, sizeToArray: sizeToArray })=>{
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
var $c40d2f6fe98574a8$export$2e2bcd8739ae039 = $c40d2f6fe98574a8$var$torusKnot;


const $2e753e7bb2101d8c$var$circle = ({ create: create, THREE: THREE, sizeToArray: sizeToArray })=>{
    return ({ size: size = 1, segments: segments = 32, ...props } = {})=>{
        return create.object(THREE.CircleGeometry, {
            ...props,
            args: [
                ...sizeToArray(size, 1),
                ...sizeToArray(segments, 1)
            ]
        });
    };
};
var $2e753e7bb2101d8c$export$2e2bcd8739ae039 = $2e753e7bb2101d8c$var$circle;


const $cee5cb5d0800a94b$var$capsule = ({ create: create, THREE: THREE, sizeToArray: sizeToArray })=>{
    return ({ size: size = 1, segments: segments = [
        10,
        20
    ], ...props } = {})=>{
        return create.object(THREE.CapsuleGeometry, {
            ...props,
            args: [
                ...sizeToArray(size, 2),
                ...sizeToArray(segments, 2)
            ]
        });
    };
};
var $cee5cb5d0800a94b$export$2e2bcd8739ae039 = $cee5cb5d0800a94b$var$capsule;


const $90f6112d67ec1df1$var$cone = ({ create: create, THREE: THREE, sizeToArray: sizeToArray })=>{
    return ({ size: size = [
        1,
        2
    ], segments: segments = [
        32,
        1
    ], ...props } = {})=>{
        return create.object(THREE.ConeGeometry, {
            ...props,
            args: [
                ...sizeToArray(size, 2),
                ...sizeToArray(segments, 2)
            ]
        });
    };
};
var $90f6112d67ec1df1$export$2e2bcd8739ae039 = $90f6112d67ec1df1$var$cone;


const $06e78acfa0e00e3a$var$cylinder = ({ create: create, THREE: THREE, sizeToArray: sizeToArray })=>{
    return ({ size: size = [
        1,
        1,
        2
    ], segments: segments = [
        32,
        1
    ], ...props } = {})=>{
        return create.object(THREE.CylinderGeometry, {
            ...props,
            args: [
                ...sizeToArray(size, 3),
                ...sizeToArray(segments, 2)
            ]
        });
    };
};
var $06e78acfa0e00e3a$export$2e2bcd8739ae039 = $06e78acfa0e00e3a$var$cylinder;


const $1f41a0d3661f3f3a$var$octahedron = ({ create: create, THREE: THREE, sizeToArray: sizeToArray })=>{
    return ({ size: size = 1, detail: detail = 0, ...props } = {})=>{
        return create.object(THREE.OctahedronGeometry, {
            ...props,
            args: [
                ...sizeToArray(size, 1),
                ...sizeToArray(detail, 1)
            ]
        });
    };
};
var $1f41a0d3661f3f3a$export$2e2bcd8739ae039 = $1f41a0d3661f3f3a$var$octahedron;


const $b0892750231ca436$var$ring = ({ create: create, THREE: THREE, sizeToArray: sizeToArray })=>{
    return ({ size: size = [
        0.5,
        1
    ], segments: segments = [
        32,
        1
    ], angle: angle = [
        0,
        Math.PI * 2
    ], ...props } = {})=>{
        return create.object(THREE.RingGeometry, {
            ...props,
            args: [
                ...sizeToArray(size, 2),
                ...sizeToArray(segments, 3),
                ...sizeToArray(angle, 2)
            ]
        });
    };
};
var $b0892750231ca436$export$2e2bcd8739ae039 = $b0892750231ca436$var$ring;


const $ae10af728513f1cf$var$shape = ({ create: create, THREE: THREE, sizeToArray: sizeToArray })=>{
    return ({ shapes: shapes = [], ...props } = {})=>{
        const s = new THREE.Shape();
        s.moveTo(...sizeToArray(shapes[0].position, 2));
        shapes.slice(1).forEach(({ position: position, type: type })=>{
            switch(type){
                case 'curve':
                    s.bezierCurveTo(...sizeToArray(position, 6));
                    break;
                default:
                    s.lineTo(...sizeToArray(position, 2));
                    break;
            }
        });
        return create.object(THREE.ShapeGeometry, {
            ...props,
            args: [
                s
            ]
        });
    };
};
var $ae10af728513f1cf$export$2e2bcd8739ae039 = $ae10af728513f1cf$var$shape;


const $d2e3c151fb3aa58c$var$directionalLight = ({ scene: scene, THREE: THREE })=>{
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
var $d2e3c151fb3aa58c$export$2e2bcd8739ae039 = $d2e3c151fb3aa58c$var$directionalLight;


const $2ab9fe92e6f4a93c$var$pointLight = ({ scene: scene, THREE: THREE })=>{
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
var $2ab9fe92e6f4a93c$export$2e2bcd8739ae039 = $2ab9fe92e6f4a93c$var$pointLight;


const $18bc11ddc30b0de4$var$ambientLight = ({ scene: scene, THREE: THREE })=>{
    return ({ color: color = 0xffffff, intensity: intensity = 0.5 } = {})=>{
        const l = new THREE.AmbientLight(color, intensity);
        scene.add(l);
        return l;
    };
};
var $18bc11ddc30b0de4$export$2e2bcd8739ae039 = $18bc11ddc30b0de4$var$ambientLight;


const $ac7cae9b7d01be93$var$fog = ({ scene: scene, THREE: THREE })=>{
    return ({ color: color = 0xffffff, near: near = 1, far: far = 1000 } = {})=>{
        scene.fog = new THREE.Fog(color, near, far);
        return scene.fog;
    };
};
var $ac7cae9b7d01be93$export$2e2bcd8739ae039 = $ac7cae9b7d01be93$var$fog;


const $66f7ec66020d0646$var$group = ({ THREE: THREE, scene: scene })=>{
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
var $66f7ec66020d0646$export$2e2bcd8739ae039 = $66f7ec66020d0646$var$group;


const $0dc93202973ecc34$var$textTexture = ({ THREE: THREE })=>{
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
var $0dc93202973ecc34$export$2e2bcd8739ae039 = $0dc93202973ecc34$var$textTexture;


const $3101df724e47b485$var$text = ({ create: create, THREE: THREE, sizeToArray: sizeToArray, scene: scene })=>{
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
var $3101df724e47b485$export$2e2bcd8739ae039 = $3101df724e47b485$var$text;


const $f88a658689c91c8b$var$use = [
    // mesh
    {
        name: "object",
        fn: (0, $5206c8db530eb142$export$2e2bcd8739ae039)
    },
    {
        name: 'cube',
        fn: (0, $c81e5b4e69e1e951$export$2e2bcd8739ae039)
    },
    {
        name: 'box',
        fn: (0, $c81e5b4e69e1e951$export$2e2bcd8739ae039)
    },
    {
        name: 'sphere',
        fn: (0, $46ce0a632517c8a3$export$2e2bcd8739ae039)
    },
    {
        name: 'plane',
        fn: (0, $a07f03dd5acbaa66$export$2e2bcd8739ae039)
    },
    {
        name: 'torus',
        fn: (0, $2ba94d3f1d60bf98$export$2e2bcd8739ae039)
    },
    {
        name: 'torusKnot',
        fn: (0, $c40d2f6fe98574a8$export$2e2bcd8739ae039)
    },
    {
        name: 'circle',
        fn: (0, $2e753e7bb2101d8c$export$2e2bcd8739ae039)
    },
    {
        name: 'capsule',
        fn: (0, $cee5cb5d0800a94b$export$2e2bcd8739ae039)
    },
    {
        name: 'cone',
        fn: (0, $90f6112d67ec1df1$export$2e2bcd8739ae039)
    },
    {
        name: 'cylinder',
        fn: (0, $06e78acfa0e00e3a$export$2e2bcd8739ae039)
    },
    {
        name: 'octahedron',
        fn: (0, $1f41a0d3661f3f3a$export$2e2bcd8739ae039)
    },
    {
        name: 'ring',
        fn: (0, $b0892750231ca436$export$2e2bcd8739ae039)
    },
    {
        name: 'shape',
        fn: (0, $ae10af728513f1cf$export$2e2bcd8739ae039)
    },
    // lights
    {
        name: 'directionalLight',
        fn: (0, $d2e3c151fb3aa58c$export$2e2bcd8739ae039)
    },
    {
        name: 'pointLight',
        fn: (0, $2ab9fe92e6f4a93c$export$2e2bcd8739ae039)
    },
    {
        name: 'ambientLight',
        fn: (0, $18bc11ddc30b0de4$export$2e2bcd8739ae039)
    },
    // misc
    {
        name: 'fog',
        fn: (0, $ac7cae9b7d01be93$export$2e2bcd8739ae039)
    },
    {
        name: 'group',
        fn: (0, $66f7ec66020d0646$export$2e2bcd8739ae039)
    },
    {
        name: 'textTexture',
        fn: (0, $0dc93202973ecc34$export$2e2bcd8739ae039)
    },
    {
        name: 'text',
        fn: (0, $3101df724e47b485$export$2e2bcd8739ae039)
    }
];
function $f88a658689c91c8b$var$sizeToArray(size, n = 3) {
    return isNaN(size) ? size : Array(n).fill(size);
}
const $f88a658689c91c8b$var$addCreate = ({ Default: Default, create: create, scene: scene, THREE: THREE })=>{
    $f88a658689c91c8b$var$use.forEach((v)=>{
        create[v.name] = v.fn({
            Default: Default,
            create: create,
            scene: scene,
            sizeToArray: $f88a658689c91c8b$var$sizeToArray,
            THREE: THREE
        });
    });
};
var $f88a658689c91c8b$export$2e2bcd8739ae039 = $f88a658689c91c8b$var$addCreate;






const $82e99d3de43fda9b$var$bloom = ({ renderer: renderer, scene: scene, camera: camera, THREE: THREE, color: color, sizeTarget: sizeTarget })=>{
    return ({ exposure: exposure = 1, background: background = 0x000000, threshold: threshold = 0, strength: strength = 1, radius: radius = 0.5 } = {})=>{
        renderer.toneMappingExposure = Math.pow(exposure, 4.0);
        scene.background = color(background);
        const renderScene = new (0, $1LQKV$RenderPass)(scene, camera);
        const bloomPass = new (0, $1LQKV$UnrealBloomPass)(new THREE.Vector2(sizeTarget.scrollWidth, sizeTarget.scrollHeight), 1.5, 0.4, 0.85);
        bloomPass.threshold = threshold;
        bloomPass.strength = strength;
        bloomPass.radius = radius;
        const outputPass = new (0, $1LQKV$OutputPass)();
        const composer = new (0, $1LQKV$EffectComposer)(renderer);
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
var $82e99d3de43fda9b$export$2e2bcd8739ae039 = $82e99d3de43fda9b$var$bloom;







const $00a521dcadbc2e33$var$selectedBloom = ({ renderer: renderer, scene: scene, camera: camera, THREE: THREE, color: color, sizeTarget: sizeTarget, Default: Default })=>{
    return ({ exposure: exposure = 1, background: background = false, threshold: threshold = 0, strength: strength = 1, radius: radius = 0.5 } = {})=>{
        renderer.toneMappingExposure = Math.pow(exposure, 4.0);
        if (background) scene.background = color(background);
        const bloomLayer = new THREE.Layers();
        bloomLayer.set(Default.layer.bloom);
        const renderScene = new (0, $1LQKV$RenderPass)(scene, camera);
        const bloomPass = new (0, $1LQKV$UnrealBloomPass)(new THREE.Vector2(sizeTarget.scrollWidth, sizeTarget.scrollHeight), 1.5, 0.4, 0.85);
        bloomPass.threshold = threshold;
        bloomPass.strength = strength;
        bloomPass.radius = radius;
        const bloomComposer = new (0, $1LQKV$EffectComposer)(renderer);
        bloomComposer.renderToScreen = false;
        bloomComposer.addPass(renderScene);
        bloomComposer.addPass(bloomPass);
        const mixPass = new (0, $1LQKV$ShaderPass)(new THREE.ShaderMaterial({
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
        const outputPass = new (0, $1LQKV$OutputPass)();
        const finalComposer = new (0, $1LQKV$EffectComposer)(renderer);
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
var $00a521dcadbc2e33$export$2e2bcd8739ae039 = $00a521dcadbc2e33$var$selectedBloom;





const $64bc4e94f23ce7bf$var$pixel = ({ renderer: renderer, scene: scene, camera: camera })=>{
    return ({ size: size = 6, normalEdge: normalEdge = 0.3, depthEdge: depthEdge = 0.4 } = {})=>{
        const composer = new (0, $1LQKV$EffectComposer)(renderer);
        const renderPixelatedPass = new (0, $1LQKV$RenderPixelatedPass)(size, scene, camera);
        composer.addPass(renderPixelatedPass);
        const outputPass = new (0, $1LQKV$OutputPass)();
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
var $64bc4e94f23ce7bf$export$2e2bcd8739ae039 = $64bc4e94f23ce7bf$var$pixel;







const $4a2aed6a42ac671a$var$mask = ({ renderer: renderer, scene: scene, camera: camera, THREE: THREE, sizeTarget: sizeTarget })=>{
    return (texture)=>{
        renderer.autoClear = false;
        const clearPass = new (0, $1LQKV$ClearPass)();
        const clearMaskPass = new (0, $1LQKV$ClearMaskPass)();
        const maskPass = new (0, $1LQKV$MaskPass)(scene, camera);
        const texturePass = new (0, $1LQKV$TexturePass)(texture);
        const outputPass = new (0, $1LQKV$OutputPass)();
        const renderTarget = new THREE.WebGLRenderTarget(sizeTarget.scrollWidth, sizeTarget.scrollHeight, {
            stencilBuffer: true
        });
        const composer = new (0, $1LQKV$EffectComposer)(renderer, renderTarget);
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
var $4a2aed6a42ac671a$export$2e2bcd8739ae039 = $4a2aed6a42ac671a$var$mask;






const $d51fd00e5a1a0206$var$glitch = ({ renderer: renderer, scene: scene, camera: camera })=>{
    return ({ wild: wild = false } = {})=>{
        const composer = new (0, $1LQKV$EffectComposer)(renderer);
        composer.addPass(new (0, $1LQKV$RenderPass)(scene, camera));
        const glitchPass = new (0, $1LQKV$GlitchPass)();
        composer.addPass(glitchPass);
        const outputPass = new (0, $1LQKV$OutputPass)();
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
var $d51fd00e5a1a0206$export$2e2bcd8739ae039 = $d51fd00e5a1a0206$var$glitch;


const $cd66eeeec2914b13$var$use = [
    {
        name: "bloom",
        fn: (0, $82e99d3de43fda9b$export$2e2bcd8739ae039)
    },
    {
        name: "selectedBloom",
        fn: (0, $00a521dcadbc2e33$export$2e2bcd8739ae039)
    },
    {
        name: "pixel",
        fn: (0, $64bc4e94f23ce7bf$export$2e2bcd8739ae039)
    },
    {
        name: "mask",
        fn: (0, $4a2aed6a42ac671a$export$2e2bcd8739ae039)
    },
    {
        name: "glitch",
        fn: (0, $d51fd00e5a1a0206$export$2e2bcd8739ae039)
    }
];
const $cd66eeeec2914b13$var$addPostprocessing = ({ renderer: renderer, camera: camera, scene: scene, THREE: THREE, postprocessing: postprocessing, color: color, sizeTarget: sizeTarget, Default: Default })=>{
    $cd66eeeec2914b13$var$use.forEach((v)=>{
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
var $cd66eeeec2914b13$export$2e2bcd8739ae039 = $cd66eeeec2914b13$var$addPostprocessing;



const $a99c7549dd4b7f0d$var$background = ({ THREE: THREE, scene: scene })=>{
    return (url, { background: background = true, environment: environment = true } = {})=>{
        const t = new (0, $1LQKV$RGBELoader)().load(url, (texture)=>{
            texture.mapping = THREE.EquirectangularReflectionMapping;
            if (background) scene.background = texture;
            if (environment) scene.environment = texture;
        });
        return t;
    };
};
var $a99c7549dd4b7f0d$export$2e2bcd8739ae039 = $a99c7549dd4b7f0d$var$background;


const $a13a0f97a119f709$var$texture = ({ Default: Default, THREE: THREE })=>{
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
var $a13a0f97a119f709$export$2e2bcd8739ae039 = $a13a0f97a119f709$var$texture;



const $a2d43aa4ebc8a120$var$gltf = ({ scene: scene })=>{
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
        const gltf = await new (0, $1LQKV$GLTFLoader)().loadAsync(url);
        gltf.scene.position.set(...position);
        gltf.scene.rotation.set(...rotation);
        gltf.scene.scale.set(...scale);
        if (autoAdd) scene.add(gltf.scene);
        return gltf;
    };
};
var $a2d43aa4ebc8a120$export$2e2bcd8739ae039 = $a2d43aa4ebc8a120$var$gltf;




const $aad201fb457a6818$var$vrm = ({ scene: scene })=>{
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
        const vrmLoader = new (0, $1LQKV$GLTFLoader)();
        vrmLoader.register((parser)=>new (0, $1LQKV$VRMLoaderPlugin)(parser));
        const gltf = await vrmLoader.loadAsync(url, onProgress);
        const model = gltf.userData.vrm;
        (0, $1LQKV$VRMUtils).removeUnnecessaryVertices(model.scene);
        //VRMUtils.removeUnnecessaryJoints(model.scene); // deprecated
        (0, $1LQKV$VRMUtils).combineSkeletons(model.scene);
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
            (0, $1LQKV$VRMUtils).deepDispose(model.scene);
        };
        if (autoAdd) scene.add(model.scene);
        return model;
    };
};
var $aad201fb457a6818$export$2e2bcd8739ae039 = $aad201fb457a6818$var$vrm;


const $f50147e13f0a1e9b$var$videoTexture = ({ THREE: THREE })=>{
    return (url, { autoPlay: autoPlay = true, loop: loop = true } = {})=>{
        const video = document.createElement("video");
        video.crossOrigin = "anonymous";
        video.onloadeddata = ()=>{
            video.play();
        };
        //video.muted = true;
        video.loop = loop;
        video.muted = true;
        video.playsInline = true;
        video.setAttribute("playsinline", "");
        video.setAttribute("muted", "");
        if (autoPlay) video.setAttribute("autoplay", "");
        video.src = url;
        const texture = new THREE.VideoTexture(video);
        texture.colorSpace = THREE.SRGBColorSpace;
        return texture;
    };
};
var $f50147e13f0a1e9b$export$2e2bcd8739ae039 = $f50147e13f0a1e9b$var$videoTexture;


const $4e19fd0962a645af$var$cubeTexture = ({ THREE: THREE })=>{
    return (urls, { path: path = "./" } = {})=>{
        const texture = new THREE.CubeTextureLoader().setPath(path).load(urls);
        return texture;
    };
};
var $4e19fd0962a645af$export$2e2bcd8739ae039 = $4e19fd0962a645af$var$cubeTexture;


const $bf21102bcb721113$var$use = [
    {
        name: "background",
        fn: (0, $a99c7549dd4b7f0d$export$2e2bcd8739ae039)
    },
    {
        name: "texture",
        fn: (0, $a13a0f97a119f709$export$2e2bcd8739ae039)
    },
    {
        name: "gltf",
        fn: (0, $a2d43aa4ebc8a120$export$2e2bcd8739ae039)
    },
    {
        name: "vrm",
        fn: (0, $aad201fb457a6818$export$2e2bcd8739ae039)
    },
    {
        name: "videoTexture",
        fn: (0, $f50147e13f0a1e9b$export$2e2bcd8739ae039)
    },
    {
        name: "cubeTexture",
        fn: (0, $4e19fd0962a645af$export$2e2bcd8739ae039)
    }
];
const $bf21102bcb721113$var$addLoad = ({ Default: Default, THREE: THREE, load: load, scene: scene })=>{
    $bf21102bcb721113$var$use.forEach((v)=>{
        load[v.name] = v.fn({
            Default: Default,
            THREE: THREE,
            scene: scene
        });
    });
};
var $bf21102bcb721113$export$2e2bcd8739ae039 = $bf21102bcb721113$var$addLoad;


const $1a38d18d04c590bb$var$axes = ({ scene: scene, THREE: THREE })=>{
    return ({ size: size = 10 } = {})=>{
        const a = new THREE.AxesHelper(size);
        a.position.y = 0.01;
        scene.add(a);
        return a;
    };
};
var $1a38d18d04c590bb$export$2e2bcd8739ae039 = $1a38d18d04c590bb$var$axes;


const $78f39797acf4e05c$var$grid = ({ scene: scene, THREE: THREE })=>{
    return ({ size: size = 10, divisions: divisions = 10, colorCenterLine: colorCenterLine = 0x444444, colorGrid: colorGrid = 0x888888 } = {})=>{
        const g = new THREE.GridHelper(size, divisions, colorCenterLine, colorGrid);
        g.position.y = 0.005;
        scene.add(g);
        return g;
    };
};
var $78f39797acf4e05c$export$2e2bcd8739ae039 = $78f39797acf4e05c$var$grid;


const $2229d07e1a6c10a6$var$use = [
    {
        name: "axes",
        fn: (0, $1a38d18d04c590bb$export$2e2bcd8739ae039)
    },
    {
        name: "grid",
        fn: (0, $78f39797acf4e05c$export$2e2bcd8739ae039)
    }
];
const $2229d07e1a6c10a6$var$addHelper = ({ THREE: THREE, scene: scene, helper: helper })=>{
    $2229d07e1a6c10a6$var$use.forEach((v)=>{
        helper[v.name] = v.fn({
            THREE: THREE,
            scene: scene
        });
    });
};
var $2229d07e1a6c10a6$export$2e2bcd8739ae039 = $2229d07e1a6c10a6$var$addHelper;


const $d1220da5e7e2f617$var$mouse = ({ Default: Default, THREE: THREE, domElement: domElement, event: event })=>{
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
var $d1220da5e7e2f617$export$2e2bcd8739ae039 = $d1220da5e7e2f617$var$mouse;


const $3e9b8bc319967eda$var$key = ({ Default: Default, domElement: domElement, event: event })=>{
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
var $3e9b8bc319967eda$export$2e2bcd8739ae039 = $3e9b8bc319967eda$var$key;


const $76a082e7504265af$var$use = [
    {
        name: "mouse",
        fn: (0, $d1220da5e7e2f617$export$2e2bcd8739ae039)
    },
    {
        name: "key",
        fn: (0, $3e9b8bc319967eda$export$2e2bcd8739ae039)
    }
];
const $76a082e7504265af$var$addEvent = ({ Default: Default, THREE: THREE, event: event, domElement: domElement })=>{
    $76a082e7504265af$var$use.forEach((v)=>{
        event[v.name] = v.fn({
            Default: Default,
            THREE: THREE,
            event: event,
            domElement: domElement
        });
    });
};
var $76a082e7504265af$export$2e2bcd8739ae039 = $76a082e7504265af$var$addEvent;


function $0cde3fdde307ec9a$export$2cd8252107eb640b(targetName) {
    const Default = (0, $05e1af71c54d2f4c$export$2e2bcd8739ae039);
    const { domElement: domElement, scene: scene, camera: camera, renderer: renderer, controls: controls, sizeTarget: sizeTarget, sizeTargetResize: sizeTargetResize, windowResize: windowResize, color: color, noToneMapping: noToneMapping, destroy: destroy } = (0, $b0f8916483f44240$export$2e2bcd8739ae039)({
        targetName: targetName,
        THREE: $1LQKV$three
    });
    const create = {};
    (0, $f88a658689c91c8b$export$2e2bcd8739ae039)({
        create: create,
        Default: Default,
        scene: scene,
        THREE: $1LQKV$three
    });
    const animate = (0, $9a66eab6426948d4$export$2e2bcd8739ae039)({
        controls: controls,
        renderer: renderer,
        scene: scene,
        camera: camera,
        THREE: $1LQKV$three
    });
    const helper = {};
    (0, $2229d07e1a6c10a6$export$2e2bcd8739ae039)({
        helper: helper,
        scene: scene,
        THREE: $1LQKV$three
    });
    const postprocessing = {};
    (0, $cd66eeeec2914b13$export$2e2bcd8739ae039)({
        postprocessing: postprocessing,
        renderer: renderer,
        camera: camera,
        scene: scene,
        THREE: $1LQKV$three,
        color: color,
        sizeTarget: sizeTarget,
        Default: Default
    });
    const load = {};
    (0, $bf21102bcb721113$export$2e2bcd8739ae039)({
        load: load,
        Default: Default,
        THREE: $1LQKV$three,
        scene: scene
    });
    const event = {};
    (0, $76a082e7504265af$export$2e2bcd8739ae039)({
        Default: Default,
        THREE: $1LQKV$three,
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
        THREE: $1LQKV$three,
        color: color,
        postprocessing: postprocessing,
        noToneMapping: noToneMapping,
        destroy: destroy
    };
}


export {$0cde3fdde307ec9a$export$2cd8252107eb640b as init};
