import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import { OutputPass } from "three/addons/postprocessing/OutputPass.js";
import { RenderPixelatedPass } from 'three/addons/postprocessing/RenderPixelatedPass.js';

const pixel = ({ renderer, scene, camera }) => {
  return ({
    size = 6,
    normalEdge = 0.3,
    depthEdge = 0.4,
  } = {}) => {
    const composer = new EffectComposer(renderer);
    const renderPixelatedPass = new RenderPixelatedPass(size, scene, camera);
    composer.addPass(renderPixelatedPass);
    const outputPass = new OutputPass();
    composer.addPass(outputPass);
    const p = {
      size, normalEdge, depthEdge
    }
    return {
      pixel: ({
        size = p.size,
        normalEdge = p.normalEdge,
        depthEdge = p.depthEdge,
      } = {}) => {
        renderPixelatedPass.setPixelSize(size);
        renderPixelatedPass.normalEdge = normalEdge;
        renderPixelatedPass.depthEdge = depthEdge;
        composer.render();
      }
    }
  }
}

export default pixel
