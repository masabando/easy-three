import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const gltf = ({ scene }) => {
  return async (url, {
    position = [0, 0, 0],
    rotation = [0, 0, 0],
    scale = [1, 1, 1],
    castShadow = true,
    receiveShadow = false,
    autoAdd = true,
    onProgress = (p) => { },
    onLoad = (gltf) => { },
  } = {}) => {
    const gltf = await new GLTFLoader().loadAsync(url, onProgress);
    onLoad(gltf);
    gltf.scene.position.set(...position);
    gltf.scene.rotation.set(...rotation);
    gltf.scene.scale.set(...scale);
    if (autoAdd) scene.add(gltf.scene);
    gltf.scene.traverse((obj) => {
      obj.frustumCulled = false;
      if (obj.isMesh) {
        if (castShadow) {
          obj.castShadow = true;
        }
        if (receiveShadow) {
          obj.receiveShadow = true;
        }
      }
    });
    return gltf;
  }
}

export default gltf
