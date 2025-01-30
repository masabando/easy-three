import { OrbitControls } from 'three/addons/controls/OrbitControls.js'

const prep = ({ targetName, THREE }) => {
  const domElement = targetName ?
    (typeof targetName === "string" ? document.querySelector(targetName) : targetName) :
    document.body;

  const scene = new THREE.Scene()

  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)

  let renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
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

  function color(col) {
    return new THREE.Color(col)
  }

  function _destroy() {
    sizeTarget.removeEventListener("resize", sizeTargetResize)
    if (sizeTarget !== window) {
      window.removeEventListener("resize", windowResize)
    }
    // dispose all meshes
    scene.children.forEach(obj => {
      obj.traverse(x => {
        switch (x.type) {
          case "Mesh":
            if (x.geometry) {
              x.geometry.dispose();
              x.geometry = null;
            }
            if (x.material) {
              if (Array.isArray(x.material)) {
                x.material.forEach(m => {
                  if (m.map) {
                    m.map.dispose();
                    m.map = null;
                  }
                  m.dispose()
                });
                x.material = null;
              } else {
                if (x.material.map) {
                  x.material.map.dispose();
                  x.material.map = null;
                }
                x.material.dispose();
                x.material = null;
              }
            }
        }
        scene.remove(x);
      })
    })
    renderer.setAnimationLoop(null);
    domElement.removeChild(renderer.domElement);
    renderer.dispose();
    renderer.forceContextLoss();
    renderer.domElement = null;
  }

  function destroy() {
    sizeTarget.removeEventListener("resize", sizeTargetResize);
    if (sizeTarget !== window) {
      window.removeEventListener("resize", windowResize);
    }

    // OrbitControlsの破棄
    controls.dispose();

    // 確実にsceneのオブジェクトを削除
    while (scene.children.length > 0) {
      const obj = scene.children[0];
      obj.traverse((x) => {
        if (x instanceof THREE.Mesh) {
          if (x.geometry) {
            x.geometry.dispose();
          }
          if (x.material) {
            if (Array.isArray(x.material)) {
              x.material.forEach((m) => {
                if (m.map) m.map.dispose();
                m.dispose();
              });
            } else {
              if (x.material.map) x.material.map.dispose();
              x.material.dispose();
            }
          }
        }
      });
      scene.remove(obj);
    }

    // WebGLコンテキストの解放
    renderer.forceContextLoss();
    renderer.dispose();

    // DOMからCanvasを削除
    if (renderer.domElement && renderer.domElement.parentNode) {
      renderer.domElement.parentNode.removeChild(renderer.domElement);
    }
    renderer.domElement.remove();
    renderer.domElement = null;
    renderer = null;
  }

  function noToneMapping() {
    renderer.toneMapping = THREE.NoToneMapping;
  }


  return {
    domElement,
    scene,
    camera,
    renderer,
    controls,
    sizeTarget,
    sizeTargetResize,
    windowResize,
    color,
    noToneMapping,
    destroy,
  }
}

export default prep
