import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import { RenderPass } from "three/addons/postprocessing/RenderPass.js";
import { BokehPass } from "three/addons/postprocessing/BokehPass.js";
import { OutputPass } from "three/addons/postprocessing/OutputPass.js";

const bokeh = ({ renderer, scene, camera }) => {
  return ({
    focus = 1,
    aperture = 0.01,
    maxblur = 0.01,
  } = {}) => {
    const b = {};
    function initPostprocessing() {
      const renderPass = new RenderPass(scene, camera);

      const bokehPass = new BokehPass(scene, camera, {
        focus,
        aperture,
        maxblur
      });

      const outputPass = new OutputPass();

      const composer = new EffectComposer(renderer);

      composer.addPass(renderPass);
      composer.addPass(bokehPass);
      composer.addPass(outputPass);

      b.composer = composer;
      b.bokeh = bokehPass;
      b.composer.setSize(renderer.domElement.width, renderer.domElement.height);
    }
    initPostprocessing();

    const p = {
      focus, aperture, maxblur
    }
    return {
      bokeh: (delta, {
        focus = p.focus,
        aperture = p.aperture,
        maxblur = p.maxblur,
      } = {}) => {
        b.bokeh.uniforms["focus"].value = focus;
        b.bokeh.uniforms["aperture"].value = aperture;
        b.bokeh.uniforms["maxblur"].value = maxblur;
        b.composer.render(delta);
      }
    }
  }
}

export default bokeh
