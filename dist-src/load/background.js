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
    const manager = new THREE.LoadingManager()
    if (manager.onLoad) manager.onLoad = manager.onLoad
    if (manager.onStart) manager.onStart = manager.onStart
    if (manager.onProgress) manager.onProgress = manager.onProgress
    if (manager.onError) manager.onError = manager.onError

    const t = new RGBELoader(manager).load(url, (texture) => {
      texture.mapping = THREE.EquirectangularReflectionMapping
      if (background) scene.background = texture
      if (environment) scene.environment = texture
    })
    return t;
  }
}

export default background
