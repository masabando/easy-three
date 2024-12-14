import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const gltf = ({ scene }) => {
  return async (url, {
    position = [0, 0, 0],
    rotation = [0, 0, 0],
    scale = [1, 1, 1],
    autoAdd = true
  } = {}) => {
    const gltf = await new GLTFLoader().loadAsync(url);
    gltf.scene.position.set(...position);
    gltf.scene.rotation.set(...rotation);
    gltf.scene.scale.set(...scale);
    if (autoAdd) scene.add(gltf.scene);
    return gltf;
  }
}

export default gltf
