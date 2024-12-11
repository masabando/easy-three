import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { VRMLoaderPlugin, VRMUtils } from '@pixiv/three-vrm';
import { RGBELoader } from "three/addons/loaders/RGBELoader.js";
import { RoundedBoxGeometry } from "three/addons/geometries/RoundedBoxGeometry.js";
import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import { RenderPass } from "three/addons/postprocessing/RenderPass.js";
import { ShaderPass } from "three/addons/postprocessing/ShaderPass.js";
import { UnrealBloomPass } from "three/addons/postprocessing/UnrealBloomPass.js";
import { OutputPass } from "three/addons/postprocessing/OutputPass.js";
import { RenderPixelatedPass } from 'three/addons/postprocessing/RenderPixelatedPass.js';
import { TexturePass } from 'three/addons/postprocessing/TexturePass.js';
import { ClearPass } from 'three/addons/postprocessing/ClearPass.js';
import { MaskPass, ClearMaskPass } from 'three/addons/postprocessing/MaskPass.js';
import { GlitchPass } from 'three/addons/postprocessing/GlitchPass.js';


const Shader = {
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
const layer = {
  bloom: 999,
}


function sizeToArray(size, n = 3) {
  return isNaN(size) ? size : Array(n).fill(size)
}


export function init(targetName) {
  const Default = {
    material: "Physical",
    color: 0x1155ff,
    texture: {
      wrapping: "Repeat"
    },
    event: {
        type: "once",
        keyTrigger: /^[A-Za-z]$/
    }
  }

  const domElement = targetName ?
    (typeof targetName === "string" ? document.querySelector(targetName) : targetName) :
    document.body;

  const scene = new THREE.Scene()

  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
  renderer.shadowMap.enabled = true
  renderer.setPixelRatio(window.devicePixelRatio)
  //renderer.outputEncoding = THREE.sRGBEncoding;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;


  const controls = new OrbitControls(camera, renderer.domElement)
  controls.enableDamping = true
  controls.dampingFactor = 0.25
  controls.disconnect()


  const sizeTarget = domElement === document.body ? window : domElement;
  if (sizeTarget === window) {
    domElement.style.margin = 0
    renderer.setSize(sizeTarget.innerWidth, sizeTarget.innerHeight)
  } else {
    renderer.setSize(sizeTarget.scrollWidth, sizeTarget.scrollHeight)
    camera.aspect = sizeTarget.scrollWidth / sizeTarget.scrollHeight
    camera.updateProjectionMatrix()
  }
  domElement.appendChild(renderer.domElement)

  function sizeTargetResize() {
    if (sizeTarget === window) {
      renderer.setSize(sizeTarget.innerWidth, sizeTarget.innerHeight)
      camera.aspect = sizeTarget.innerWidth / sizeTarget.innerHeight
    } else {
      renderer.setSize(sizeTarget.scrollWidth, sizeTarget.scrollHeight)
      camera.aspect = sizeTarget.scrollWidth / sizeTarget.scrollHeight
    }
    camera.updateProjectionMatrix()
  }
  sizeTarget.addEventListener("resize", sizeTargetResize)

  function windowResize() {
    renderer.setSize(sizeTarget.scrollWidth, sizeTarget.scrollHeight, false)
    camera.aspect = sizeTarget.scrollWidth / sizeTarget.scrollHeight
    camera.updateProjectionMatrix()
  }
  if (sizeTarget !== window) {
    window.addEventListener("resize", windowResize)
  }

  renderer.domElement.style.aspectRatio = renderer.domElement.width / renderer.domElement.height;
  renderer.domElement.style.width = "100%"
  renderer.domElement.style.height = "auto"

  const create = {
    object: function (geometry, {
      args = [1, 1, 1],
      position = [0, 0, 0],
      rotation = [0, 0, 0],
      option = {
        color: Default.color,
      },
      material = Default.material,
      castShadow = true,
      receiveShadow = true,
      autoAdd = true,
    } = {}) {
      const m = new THREE.Mesh(
        //new THREE[geometry](...args),
        new geometry(...args),
        new THREE[`Mesh${material}Material`](material === "Normal" ? {} : option)
      )
      m.position.set(...position)
      m.rotation.set(...rotation)
      m.castShadow = castShadow
      m.receiveShadow = receiveShadow
      if (autoAdd) scene.add(m);
      return m;
    },
    cube: function ({
      size = 1,
      segments = 1,
      rounded = false,
      radius = 0.1,
      ...props
    } = {}) {
      return create.object(rounded ? RoundedBoxGeometry : THREE.BoxGeometry, {
        ...props,
        args: [
          ...sizeToArray(size, 3),
          ...(rounded ? [segments, radius] : sizeToArray(segments, 3))
        ]
      });
    },
    box: function ({
      size = 1,
      segments = 1,
      rounded = false,
      radius = 0.1,
      ...props
    } = {}) {
      return create.object(rounded ? RoundedBoxGeometry : THREE.BoxGeometry, {
        ...props,
        args: [
          ...sizeToArray(size, 3),
          ...(rounded ? [segments, radius] : sizeToArray(segments, 3))
        ]
      });
    },
    sphere: function ({ size = 1, segments = 64, ...props } = {}) {
      return create.object(THREE.SphereGeometry, {
        ...props,
        args: [...sizeToArray(size, 1), ...sizeToArray(segments, 2)]
      });
    },
    plane: function ({ size = 1, segments = 1, ...props } = {}) {
      return create.object(THREE.PlaneGeometry, {
        ...props,
        args: [...sizeToArray(size, 2), ...sizeToArray(segments, 2)]
      });
    },
    torus: function ({ size = 1, tube = 0.4, segments = 64, ...props } = {}) {
      return create.object(THREE.TorusGeometry, {
        ...props,
        args: [size, tube, ...sizeToArray(segments, 2)]
      });
    },
    torusKnot: function ({ size = 1, tube = 0.3, segments = [128, 8], ...props } = {}) {
      return create.object(THREE.TorusKnotGeometry, {
        ...props,
        args: [size, tube, ...sizeToArray(segments, 2)]
      });
    },
    ambientLight: function ({
      color = 0xffffff,
      intensity = 0.5,
    } = {}) {
      const l = new THREE.AmbientLight(color, intensity)
      scene.add(l);
      return l;
    },
    pointLight: function ({
      color = 0xffffff,
      intensity = 1,
      distance = 0,
      decay = 2,
      position = [6, 6, 6],
      castShadow = true,
      shadow = {
        mapSize: [1024, 1024],
      },
    } = {}) {
      const l = new THREE.PointLight(color, intensity, distance, decay)
      l.position.set(...position)
      l.castShadow = castShadow
      if (castShadow) {
        l.shadow.mapSize = shadow.mapSize
      }
      scene.add(l);
      return l;
    },
    directionalLight: function ({
      intensity = 1,
      color = 0xffffff,
      position = [10, 10, 10],
      castShadow = true,
      shadow = {
        mapSize: {
          width: 1024,
          height: 1024,
        },
        camera: {
          left: -10,
          right: 10,
          top: 10,
          bottom: -10,
        }
      },
    } = {}) {
      const l = new THREE.DirectionalLight(color, intensity)
      l.position.set(...position)
      l.castShadow = castShadow
      if (castShadow) {
        l.shadow.mapSize.width = shadow.mapSize.width
        l.shadow.mapSize.height = shadow.mapSize.height
        l.shadow.camera.left = shadow.camera.left
        l.shadow.camera.right = shadow.camera.right
        l.shadow.camera.top = shadow.camera.top
        l.shadow.camera.bottom = shadow.camera.bottom
      }
      scene.add(l);
      return l;
    },
    group: function ({
      position = [0, 0, 0],
      rotation = [0, 0, 0],
      children = [],
      autoAdd = true,
      ...props
    } = {}) {
      const result = new THREE.Group();
      result.position.set(...position);
      result.rotation.set(...rotation);
      children.forEach((c) => {
        if (c instanceof THREE.Object3D) {
          result.add(c);
        }
      });
      if (autoAdd) scene.add(result);
      return result;
    },
    fog: function ({
      color = 0xffffff,
      near = 1,
      far = 1000,
    } = {}) {
      scene.fog = new THREE.Fog(color, near, far);
      return scene.fog;
    }
  }

  const postprocessing = {
    bloom: function ({
      exposure = 1,
      background = 0x000000,
      threshold = 0,
      strength = 1,
      radius = 0.5,
    } = {}) {
      renderer.toneMappingExposure = Math.pow(exposure, 4.0);
      //renderer.toneMapping = THREE.ReinhardToneMapping;
      scene.background = color(background);
      const renderScene = new RenderPass(scene, camera);
      const bloomPass = new UnrealBloomPass(
        new THREE.Vector2(sizeTarget.scrollWidth, sizeTarget.scrollHeight),
        1.5,
        0.4,
        0.85
      );
      bloomPass.threshold = threshold;
      bloomPass.strength = strength;
      bloomPass.radius = radius;
      const outputPass = new OutputPass();
      const composer = new EffectComposer(renderer);
      composer.addPass(renderScene);
      composer.addPass(bloomPass);
      composer.addPass(outputPass);
      const p = {
        threshold, strength, radius
      }
      return {
        bloom: ({
          threshold = p.threshold,
          strength = p.strength,
          radius = p.radius,
        } = {}) => {
          bloomPass.threshold = threshold;
          bloomPass.strength = strength;
          bloomPass.radius = radius;
          composer.render();
        }
      }
    },
    selectedBloom: function ({
      exposure = 1,
      background = false,
      threshold = 0,
      strength = 1,
      radius = 0.5,
    } = {}) {
      renderer.toneMappingExposure = Math.pow(exposure, 4.0);
      if (background) scene.background = color(background);
      const bloomLayer = new THREE.Layers();
      bloomLayer.set(layer.bloom);
      const renderScene = new RenderPass(scene, camera);
      const bloomPass = new UnrealBloomPass(
        new THREE.Vector2(sizeTarget.scrollWidth, sizeTarget.scrollHeight),
        1.5,
        0.4,
        0.85
      );
      bloomPass.threshold = threshold;
      bloomPass.strength = strength;
      bloomPass.radius = radius;
      const bloomComposer = new EffectComposer(renderer);
      bloomComposer.renderToScreen = false;
      bloomComposer.addPass(renderScene);
      bloomComposer.addPass(bloomPass);
      const mixPass = new ShaderPass(
        new THREE.ShaderMaterial({
          uniforms: {
            baseTexture: { value: null },
            bloomTexture: { value: bloomComposer.renderTarget2.texture },
          },
          vertexShader: Shader.vertexShader,
          fragmentShader: Shader.fragmentShader,
          defines: {},
        }),
        "baseTexture"
      );
      mixPass.needsSwap = true;
      const outputPass = new OutputPass();
      const finalComposer = new EffectComposer(renderer);
      finalComposer.addPass(renderScene);
      finalComposer.addPass(mixPass);
      finalComposer.addPass(outputPass);
      const darkMaterial = new THREE.MeshBasicMaterial({ color: "black" });
      const materials = {}
      let bg = scene.background;
      const p = {
        threshold, strength, radius
      }
      return {
        selectedBloom: ({
          threshold = p.threshold,
          strength = p.strength,
          radius = p.radius,
        } = {}) => {
          bloomPass.threshold = threshold;
          bloomPass.strength = strength;
          bloomPass.radius = radius;
          scene.traverse((obj) => {
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
          scene.traverse(obj => {
            if (materials[obj.uuid]) {
              obj.material = materials[obj.uuid];
              delete materials[obj.uuid];
            }
          })
          finalComposer.render();
        },
        addSelectedBloom: (...list) => {
          list.forEach((obj) => {
            obj.layers.enable(layer.bloom);
          });
        }
      }
    },
    pixel: function ({
      size = 6,
      normalEdge = 0.3,
      depthEdge = 0.4,
    } = {}) {
      const composer = new EffectComposer(renderer);
      const renderPixelatedPass = new RenderPixelatedPass(size, scene, camera);
      composer.addPass(renderPixelatedPass);
      const outputPass = new OutputPass();
      composer.addPass(outputPass);
      const p = {
        size, normalEdge, depthEdge
      }
      return {
        pixel: ({
          size = p.size,
          normalEdge = p.normalEdge,
          depthEdge = p.depthEdge,
        } = {}) => {
          renderPixelatedPass.setPixelSize(size);
          renderPixelatedPass.normalEdge = normalEdge;
          renderPixelatedPass.depthEdge = depthEdge;
          composer.render();
        }
      }
    },
    mask: function (texture) {
      renderer.autoClear = false;
      const clearPass = new ClearPass();
      const clearMaskPass = new ClearMaskPass();
      const maskPass = new MaskPass(scene, camera);
      const texturePass = new TexturePass(texture);
      const outputPass = new OutputPass();
      const renderTarget = new THREE.WebGLRenderTarget(sizeTarget.scrollWidth, sizeTarget.scrollHeight, {
        stencilBuffer: true,
      });
      const composer = new EffectComposer(renderer, renderTarget);
      composer.addPass(clearPass);
      composer.addPass(maskPass);
      composer.addPass(texturePass);
      composer.addPass(clearMaskPass);
      composer.addPass(outputPass);
      return {
        mask: (time) => {
          renderer.clear();
          composer.render(time);
        }
      }
    },
    glitch: function ({
      wild = false
    } = {}) {
      const composer = new EffectComposer(renderer);
      composer.addPass(new RenderPass(scene, camera));
      const glitchPass = new GlitchPass();
      composer.addPass(glitchPass);
      const outputPass = new OutputPass();
      composer.addPass(outputPass);
      glitchPass.goWild = wild;
      const p = {
        wild
      }
      return {
        glitch: ({
          wild = p.wild
        } = {}) => {
          glitchPass.goWild = wild;
          composer.render();
        }
      }
    },
  }

  const helper = {
    grid: function ({
      size = 10,
      divisions = 10,
      colorCenterLine = 0x444444,
      colorGrid = 0x888888,
    } = {}) {
      const g = new THREE.GridHelper(size, divisions, colorCenterLine, colorGrid)
      g.position.y = 0.005
      scene.add(g)
      return g;
    },
    axes: function ({
      size = 10,
    } = {}) {
      const a = new THREE.AxesHelper(size)
      a.position.y = 0.01
      scene.add(a)
      return a;
    }
  }

  const textureLoader = new THREE.TextureLoader();
  const load = {
    gltf: async function (url, {
      position = [0, 0, 0],
      rotation = [0, 0, 0],
      scale = [1, 1, 1],
      autoAdd = true
    } = {}) {
      const gltf = await new GLTFLoader().loadAsync(url);
      gltf.scene.position.set(...position);
      gltf.scene.rotation.set(...rotation);
      gltf.scene.scale.set(...scale);
      if (autoAdd) scene.add(gltf.scene);
      return gltf;
    },
    vrm: async function (url, {
      position = [0, 0, 0],
      rotation = [0, 0, 0],
      scale = [1, 1, 1],
      autoAdd = true,
      onProgress = (p) => { },
    } = {}) {
      const vrmLoader = new GLTFLoader();
      vrmLoader.register(parser => new VRMLoaderPlugin(parser));
      const gltf = await vrmLoader.loadAsync(url, onProgress);
      const model = gltf.userData.vrm;
      VRMUtils.removeUnnecessaryVertices(model.scene);
      //VRMUtils.removeUnnecessaryJoints(model.scene); // deprecated
      VRMUtils.combineSkeletons(model.scene);
      model.scene.traverse((obj) => {
        obj.frustumCulled = false;
        if (obj.isMesh) {
          obj.castShadow = true;
        }
      });
      model.scene.position.set(...position);
      model.scene.rotation.set(...rotation);
      model.scene.scale.set(...scale);
      model.bone = (name) => model.humanoid.getNormalizedBoneNode(name);
      model.dispose = () => {
        scene.remove(model.scene);
        VRMUtils.deepDispose(model.scene);
      }
      if (autoAdd) scene.add(model.scene);
      return model;
    },
    background: (url, {
      background = true,
      environment = true
    } = {}) => {
      const t = new RGBELoader().load(url, (texture) => {
        texture.mapping = THREE.EquirectangularReflectionMapping
        if (background) scene.background = texture
        if (environment) scene.environment = texture
      })
      return t;
    },
    texture: (url, {
      wrapS = Default.texture.wrapping,
      wrapT = Default.texture.wrapping,
      repeat = [1, 1]
    } = {}) => {
      const texture = textureLoader.load(url);
      texture.wrapS = THREE[`${wrapS}Wrapping`];
      texture.wrapT = THREE[`${wrapT}Wrapping`];
      texture.repeat = new THREE.Vector2(...repeat);
      texture.colorSpace = THREE.SRGBColorSpace;
      return texture;
    },
    videoTexture: (url, {
      autoPlay = true,
      loop = true,
    } = {}) => {
      const video = document.createElement("video");
      video.crossOrigin = "anonymous";
      video.onloadeddata = () => {
        video.play();
      }
      //video.muted = true;
      video.loop = loop;
      video.setAttribute("playsinline", "")
      video.setAttribute("muted", "")
      if (autoPlay) video.setAttribute("autoplay", "");

      video.src = url;
      const texture = new THREE.VideoTexture(video);
      texture.colorSpace = THREE.SRGBColorSpace;
      return texture;
    },
    cubeTexture: (urls, {
      path = "./"
    } = {}) => {
      const texture = new THREE.CubeTextureLoader().setPath(path).load(urls);
      return texture;
    }
  }

  const event = {
    mouse: class{
        static #eventList = {
            click: [],
            mousedown: [],
            mouseup: [],
            mousemove: []
        };
        static #id = 0;
        static #idMap = {};

        static {
            domElement.addEventListener("click", (e) => {
                const target = e.target;
                const rect = target.getBoundingClientRect();
                const pos = new THREE.Vector2(e.clientX - rect.x, e.clientY - rect.y);
                this.#eventList.click.forEach((callback) => {
                    callback(pos, e);
                });
            });
            domElement.addEventListener("mousedown", (e) => {
                const target = e.target;
                const rect = target.getBoundingClientRect();
                const pos = new THREE.Vector2(e.clientX - rect.x, e.clientY - rect.y);
                this.#eventList.mousedown.forEach((callback) => {
                    callback(pos, e);
                });
            });
            domElement.addEventListener("mouseup", (e) => {
                const target = e.target;
                const rect = target.getBoundingClientRect();
                const pos = new THREE.Vector2(e.clientX - rect.x, e.clientY - rect.y);
                this.#eventList.mouseup.forEach((callback) => {
                    callback(pos, e);
                });
            });
            domElement.addEventListener("mousemove", (e) => {
                const target = e.target;
                const rect = target.getBoundingClientRect();
                const pos = new THREE.Vector2(e.clientX - rect.x, e.clientY - rect.y);
                this.#eventList.mousemove.forEach((callback) => {
                    callback(pos, e);
                });
            });
            domElement.addEventListener("touchstart", (e) => {
                const target = e.target;
                const rect = target.getBoundingClientRect();
                const touch = e.changedTouches[0];
                const pos = new THREE.Vector2(touch.clientX - rect.x, touch.clientY - rect.y);
                this.#eventList.mousedown.forEach((callback) => {
                    callback(pos, e);
                });
            });
            domElement.addEventListener("touchend", (e) => {
                const target = e.target;
                const rect = target.getBoundingClientRect();
                const touch = e.changedTouches[0];
                const pos = new THREE.Vector2(touch.clientX - rect.x, touch.clientY - rect.y);
                this.#eventList.mouseup.forEach((callback) => {
                    callback(pos, e);
                });
            });
            domElement.addEventListener("touchmove", (e) => {
                const target = e.target;
                const rect = target.getBoundingClientRect();
                const touch = e.changedTouches[0];
                const pos = new THREE.Vector2(touch.clientX - rect.x, touch.clientY - rect.y);
                this.#eventList.mousemove.forEach((callback) => {
                    callback(pos, e);
                });
            });
            
        }

        static #addMap(key, index){
            if(this.#idMap[this.#id] === undefined) this.#idMap[this.#id] = {};
            if(this.#idMap[this.#id][key] === undefined) this.#idMap[this.#id][key] = [];
            this.#idMap[this.#id][key].push(index);
        }

        static add(callback = () => {}, {
            type = Default.event.type
        } = {}){
            const listener = {
                once: "click",
                down: "mousedown",
                up: "mouseup",
                move: "mousemove"
            };
            if(typeof(type) === "string"){
                if(type === "all"){
                    Object.entries(this.#eventList).forEach(([key, list]) => {
                        this.#addMap(`${key}`, list.length);
                        list.push(callback);
                    });
                    const _id = this.#id;
                    const result = () => {
                        event.mouse.remove(_id);
                    }
                    this.#id++;
                    return result;
                }
                if(this.#eventList[listener[type]] !== undefined){
                    this.#addMap(listener[type], this.#eventList[listener[type]].length);
                    this.#eventList[listener[type]].push(callback);
                    const _id = this.#id;
                    const result = () => {
                        event.mouse.remove(_id);
                    }
                    this.#id++;
                    return result;
                }
            }
        }

        static remove(id){
            Object.entries(this.#idMap[id])?.forEach(([key, list]) => {
                list.forEach(index => {
                    this.#eventList[key][index] = () => {};
                });
            });
        }
    },
    key: class{
        static #eventList = {
            keypress: [],
            keydown: [],
            keyup: []
        };
        static #id = 0;
        static #idMap = {};

        static {
            domElement.addEventListener("keypress", (e) => {
                this.#eventList.keypress.forEach((callback) => {
                    callback(e.key, e);
                });
            });
            domElement.addEventListener("keydown", (e) => {
                this.#eventList.keydown.forEach((callback) => {
                    callback(e.key, e);
                });
            });
            domElement.addEventListener("keyup", (e) => {
                this.#eventList.keyup.forEach((callback) => {
                    callback(e.key, e);
                });
            });
        }

        static #addMap(key, index){
            if(this.#idMap[this.#id] === undefined) this.#idMap[this.#id] = {};
            if(this.#idMap[this.#id][key] === undefined) this.#idMap[this.#id][key] = [];
            this.#idMap[this.#id][key].push(index);
        }

        static #wrapCallback(callback, trigger){
            let result;
            if(trigger instanceof RegExp) result = (key, e) => {
                if(trigger.test(key)) callback(key, e);
            };
            else result = (key, e) => {
                if(key === trigger) callback(key, e);
            };

            return result;
        }

        static add(callback = () => {}, {
            type = Default.event.type,
            trigger = Default.event.keyTrigger
        } = {}){
            const listener = {
                once: "keypress",
                down: "keydown",
                up: "keyup"
            };
            if(typeof(type) === "string"){
                if(type === "all"){
                    Object.entries(this.#eventList).forEach(([key, list]) => {
                        this.#addMap(`${key}`, list.length);
                        list.push(this.#wrapCallback(callback, trigger));
                    });
                    const _id = this.#id;
                    const result = () => {
                        event.key.remove(_id);
                    }
                    this.#id++;
                    return result;
                }
                if(this.#eventList[listener[type]] !== undefined){
                    this.#addMap(listener[type], this.#eventList[listener[type]].length);
                    this.#eventList[listener[type]].push(this.#wrapCallback(callback, trigger));
                    const _id = this.#id;
                    const result = () => {
                        event.key.remove(_id);
                    }
                    this.#id++;
                    return result;
                }
            }
        }

        static remove(id){
            Object.entries(this.#idMap[id])?.forEach(([key, list]) => {
                list.forEach(index => {
                    this.#eventList[key][index] = () => {};
                });
            });
        }
    }
  }

  function color(col) {
    return new THREE.Color(col)
  }

  function destroy() {
    sizeTarget.removeEventListener("resize", sizeTargetResize)
    if (sizeTarget !== window) {
      window.removeEventListener("resize", windowResize)
    }
    domElement.removeChild(renderer.domElement);
    renderer.dispose();
    renderer.forceContextLoss();
  }

  function animate(proc = () => { }, renderFlag = true) {
    const clock = new THREE.Clock();
    function loop() {
      controls.update()
      const delta = clock.getDelta()
      const time = clock.getElapsedTime()
      proc({ clock, delta, time })
      if (renderFlag) renderer.render(scene, camera)
    }
    renderer.setAnimationLoop(loop)
  }
  return {
    Default,
    scene,
    camera,
    renderer,
    controls,
    create,
    animate,
    color,
    destroy,
    THREE,
    helper,
    load,
    postprocessing,
    layer,
    event,
  }
}
