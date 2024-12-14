import { RGBELoader } from "three/addons/loaders/RGBELoader.js";

const background = ({ THREE, scene }) => {
  return (url, {
    background = true,
    environment = true
  } = {}) => {
    const t = new RGBELoader().load(url, (texture) => {
      texture.mapping = THREE.EquirectangularReflectionMapping
      if (background) scene.background = texture
      if (environment) scene.environment = texture
    })
    return t;
  }
}

export default background
