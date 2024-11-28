
import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'


function sizeToArray(size, n = 3) {
  return isNaN(size) ? size : Array(n).fill(size)
}


export function init(targetName) {
  const Default = {
    material: "Physical",
    color: 0x1155ff,
  }

  const domElement = targetName ? document.querySelector(targetName) : document.body;

  const scene = new THREE.Scene()

  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
  renderer.shadowMap.enabled = true

  const controls = new OrbitControls(camera, renderer.domElement)
  controls.enabled = false


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

  function color(col) {
    return new THREE.Color(col)
  }

  const clock = new THREE.Clock();
  function animate(proc = () => { }) {
    function loop() {
      proc({ clock })
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
  }
}

