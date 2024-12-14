import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { VRMLoaderPlugin, VRMUtils } from '@pixiv/three-vrm';

const vrm = ({ scene }) => {
  return async (url, {
    position = [0, 0, 0],
    rotation = [0, 0, 0],
    scale = [1, 1, 1],
    autoAdd = true,
    onProgress = (p) => { },
  } = {}) => {
    const vrmLoader = new GLTFLoader();
    vrmLoader.register(parser => new VRMLoaderPlugin(parser));
    const gltf = await vrmLoader.loadAsync(url, onProgress);
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
    model.bone = (name) => model.humanoid.getNormalizedBoneNode(name);
    model.dispose = () => {
      scene.remove(model.scene);
      VRMUtils.deepDispose(model.scene);
    }
    if (autoAdd) scene.add(model.scene);
    return model;
  }
}

export default vrm
