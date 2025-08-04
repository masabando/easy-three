import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { VRMLoaderPlugin, VRMUtils } from '@pixiv/three-vrm';

const vrm = ({ scene, load }) => {
  return async (url, {
    position = [0, 0, 0],
    rotation = [0, 0, 0],
    scale = [1, 1, 1],
    autoAdd = true,
    castShadow = true,
    onProgress = (p) => { },
    onLoad = (vrm) => { },
    bvh = false,
  } = {}) => {
    const vrmLoader = new GLTFLoader();
    vrmLoader.register(parser => new VRMLoaderPlugin(parser));
    const gltf = await vrmLoader.loadAsync(url, onProgress);
    onLoad(gltf.userData.vrm);
    const model = gltf.userData.vrm;
    VRMUtils.removeUnnecessaryVertices(model.scene);
    //VRMUtils.removeUnnecessaryJoints(model.scene); // deprecated
    VRMUtils.combineSkeletons(model.scene);
    model.scene.traverse((obj) => {
      obj.frustumCulled = false;
      if (obj.isMesh && castShadow) {
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
    model.updateWithAnimation = () => { };

    if (bvh) {
      await load.bvh2(bvh, model).then(o => {
        model.mixer = o.mixer;
        model.duration = o.duration;
        model.updateWithAnimation = (delta) => {
          if (model && model.mixer) {
            if (model.duration < model.mixer.time + delta) {
              model.mixer.setTime(0);
            } else {
              model.mixer.update(delta);
              model.update(delta);
            }
          }
        }
      })
    }

    return model;
  }
}

export default vrm
