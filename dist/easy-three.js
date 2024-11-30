
import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { VRMLoaderPlugin, VRMUtils } from 'https://cdn.jsdelivr.net/npm/@pixiv/three-vrm@3/lib/three-vrm.module.min.js';
import { RGBELoader } from "three/addons/loaders/RGBELoader.js";




function sizeToArray(size, n = 3) {
  return isNaN(size) ? size : Array(n).fill(size)
}


export function init(targetName) {
  const Default = {
    material: "Physical",
    color: 0x1155ff,
    texture: {
      wrapping: "Repeat"
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

  sizeTarget.addEventListener("resize", (e) => {
    if (sizeTarget === window) {
      renderer.setSize(sizeTarget.innerWidth, sizeTarget.innerHeight)
      camera.aspect = sizeTarget.innerWidth / sizeTarget.innerHeight
    } else {
      renderer.setSize(sizeTarget.scrollWidth, sizeTarget.scrollHeight)
      camera.aspect = sizeTarget.scrollWidth / sizeTarget.scrollHeight
    }
    camera.updateProjectionMatrix()
  })

  if (sizeTarget !== window) {
    window.addEventListener("resize", (e) => {
      renderer.setSize(sizeTarget.scrollWidth, sizeTarget.scrollHeight, false)
      camera.aspect = sizeTarget.scrollWidth / sizeTarget.scrollHeight
      camera.updateProjectionMatrix()
    })
  }

  renderer.domElement.style.aspectRatio = renderer.domElement.width / renderer.domElement.height;
  renderer.domElement.style.width = "100%"
  renderer.domElement.style.height = "auto"

  const create = {
    object: function (geometry, {
      size = [1, 1, 1],
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
        new THREE[geometry](...size),
        new THREE[`Mesh${material}Material`](material === "Normal" ? {} : option)
      )
      m.position.set(...position)
      m.rotation.set(...rotation)
      m.castShadow = castShadow
      m.receiveShadow = receiveShadow
      if (autoAdd) scene.add(m);
      return m;
    },
    cube: function (props = {}) {
      return create.object("BoxGeometry", {
        ...props, size: sizeToArray(props.size, 3)
      });
    },
    sphere: function (props = {}) {
      return create.object("SphereGeometry", {
        ...props, size: sizeToArray(props.size, 1)
      });
    },
    plane: function (props = {}) {
      return create.object("PlaneGeometry", {
        ...props, size: sizeToArray(props.size, 2)
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
    vrm: async function (url, {
      position = [0, 0, 0],
      rotation = [0, 0, 0],
      scale = [1, 1, 1],
      autoAdd = true
    } = {}) {
      const vrmLoader = new GLTFLoader();
      vrmLoader.register(parser => new VRMLoaderPlugin(parser));
      const gltf = await vrmLoader.loadAsync(url);
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
      if (autoAdd) scene.add(model.scene);
      return model;
    },
    background: (url) => {
      new RGBELoader().load(url, (texture) => {
        texture.mapping = THREE.EquirectangularReflectionMapping
        scene.background = texture
        scene.environment = texture
      })
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
        return texture;
    }
  }

  function color(col) {
    return new THREE.Color(col)
  }

  function animate(proc = () => { }) {
    const clock = new THREE.Clock();
    function loop() {
      controls.update()
      const delta = clock.getDelta()
      proc({ clock, delta })
      renderer.render(scene, camera)
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
    THREE,
    helper,
    load,
  }
}

