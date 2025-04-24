import { RectAreaLightHelper } from "three/addons/helpers/RectAreaLightHelper.js";
import { RectAreaLightUniformsLib } from "three/addons/lights/RectAreaLightUniformsLib.js";

const rectAreaLight = ({ scene, sizeToArray, THREE }) => {
  return ({
    color = 0xffffff,
    intensity = 1,
    size = 1,
    position = [0, 0, 0],
    rotation = [0, 0, 0],
    helper = false,
  } = {}) => {
    RectAreaLightUniformsLib.init();
    const l = new THREE.RectAreaLight(color, intensity, ...sizeToArray(size, 2))
    l.position.set(...position)
    l.rotation.set(...rotation)
    scene.add(l)
    if (helper) {
      const h = new RectAreaLightHelper(l)
      l.add(h)
    }
    return l
  }
}

export default rectAreaLight
