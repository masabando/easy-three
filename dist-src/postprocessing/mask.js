import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import { OutputPass } from "three/addons/postprocessing/OutputPass.js";
import { ClearPass } from 'three/addons/postprocessing/ClearPass.js';
import { MaskPass, ClearMaskPass } from 'three/addons/postprocessing/MaskPass.js';
import { TexturePass } from 'three/addons/postprocessing/TexturePass.js';

const mask = ({ renderer, scene, camera, THREE }) => {
  return (texture) => {
    renderer.autoClear = false;
    const clearPass = new ClearPass();
    const clearMaskPass = new ClearMaskPass();
    const maskPass = new MaskPass(scene, camera);
    const texturePass = new TexturePass(texture);
    const outputPass = new OutputPass();
    const size = renderer.getSize(new THREE.Vector2());
    const renderTarget = new THREE.WebGLRenderTarget(size.x, size.y, {
      stencilBuffer: true,
    });
    const composer = new EffectComposer(renderer, renderTarget);
    composer.addPass(clearPass);
    composer.addPass(maskPass);
    composer.addPass(texturePass);
    composer.addPass(clearMaskPass);
    composer.addPass(outputPass);
    return {
      mask: () => {
        renderer.clear();
        composer.render();
      }
    }
  }
}

export default mask
