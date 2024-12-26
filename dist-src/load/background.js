import { RGBELoader } from "three/addons/loaders/RGBELoader.js";

const background = ({ THREE, scene }) => {
  return (url, {
    background = true,
    environment = true,
    manager = {
      onStart: () => {},
      onLoad: () => {},
      onProgress: () => {},
      onError: () => { },
    },
  } = {}) => {
    const loadingManager = new THREE.LoadingManager()
    if (manager.onLoad) loadingManager.onLoad = manager.onLoad
    if (manager.onStart) loadingManager.onStart = manager.onStart
    if (manager.onProgress) loadingManager.onProgress = manager.onProgress
    if (manager.onError) loadingManager.onError = manager.onError

    const t = new RGBELoader(loadingManager).load(url, (texture) => {
      texture.mapping = THREE.EquirectangularReflectionMapping
      if (background) scene.background = texture
      if (environment) scene.environment = texture
    })
    return t;
  }
}

export default background
