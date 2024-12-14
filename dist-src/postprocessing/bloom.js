import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import { RenderPass } from "three/addons/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/addons/postprocessing/UnrealBloomPass.js";
import { OutputPass } from "three/addons/postprocessing/OutputPass.js";

const bloom = ({ renderer, scene, camera, THREE, color, sizeTarget }) => {
  return ({
    exposure = 1,
    background = 0x000000,
    threshold = 0,
    strength = 1,
    radius = 0.5,
  } = {}) => {
    renderer.toneMappingExposure = Math.pow(exposure, 4.0);
    scene.background = color(background);
    const renderScene = new RenderPass(scene, camera);
    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(sizeTarget.scrollWidth, sizeTarget.scrollHeight),
      1.5,
      0.4,
      0.85
    );
    bloomPass.threshold = threshold;
    bloomPass.strength = strength;
    bloomPass.radius = radius;
    const outputPass = new OutputPass();
    const composer = new EffectComposer(renderer);
    composer.addPass(renderScene);
    composer.addPass(bloomPass);
    composer.addPass(outputPass);
    const p = {
      threshold, strength, radius
    }
    return {
      bloom: ({
        threshold = p.threshold,
        strength = p.strength,
        radius = p.radius,
      } = {}) => {
        bloomPass.threshold = threshold;
        bloomPass.strength = strength;
        bloomPass.radius = radius;
        composer.render();
      }
    }
  }
}

export default bloom
