import { OrbitControls } from 'three/addons/controls/OrbitControls.js'

const prep = ({ targetName, THREE }) => {
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
