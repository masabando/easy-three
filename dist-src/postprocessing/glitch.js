import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import { OutputPass } from "three/addons/postprocessing/OutputPass.js";
import { GlitchPass } from 'three/addons/postprocessing/GlitchPass.js';
import { RenderPass } from "three/addons/postprocessing/RenderPass.js";

const glitch = ({ renderer, scene, camera }) => {
  return ({
    wild = false
  } = {}) => {
    const composer = new EffectComposer(renderer);
    composer.addPass(new RenderPass(scene, camera));
    const glitchPass = new GlitchPass();
    composer.addPass(glitchPass);
    const outputPass = new OutputPass();
    composer.addPass(outputPass);
    glitchPass.goWild = wild;
    const p = {
      wild
    }
    return {
      glitch: ({
        wild = p.wild
      } = {}) => {
        glitchPass.goWild = wild;
        composer.render();
      }
    }
  }
}

export default glitch
