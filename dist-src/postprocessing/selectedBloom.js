import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import { RenderPass } from "three/addons/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/addons/postprocessing/UnrealBloomPass.js";
import { OutputPass } from "three/addons/postprocessing/OutputPass.js";
import { ShaderPass } from "three/addons/postprocessing/ShaderPass.js";

const selectedBloom = ({ renderer, scene, camera, THREE, color, sizeTarget, Default }) => {
  return ({
    exposure = 1,
    background = false,
    threshold = 0,
    strength = 1,
    radius = 0.5,
  } = {}) => {
    renderer.toneMappingExposure = Math.pow(exposure, 4.0);
    if (background) scene.background = color(background);
    const bloomLayer = new THREE.Layers();
    bloomLayer.set(Default.layer.bloom);
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
    const bloomComposer = new EffectComposer(renderer);
    bloomComposer.renderToScreen = false;
    bloomComposer.addPass(renderScene);
    bloomComposer.addPass(bloomPass);
    const mixPass = new ShaderPass(
      new THREE.ShaderMaterial({
        uniforms: {
          baseTexture: { value: null },
          bloomTexture: { value: bloomComposer.renderTarget2.texture },
        },
        vertexShader: Default.shader.vertexShader,
        fragmentShader: Default.shader.fragmentShader,
        defines: {},
      }),
      "baseTexture"
    );
    mixPass.needsSwap = true;
    const outputPass = new OutputPass();
    const finalComposer = new EffectComposer(renderer);
    finalComposer.addPass(renderScene);
    finalComposer.addPass(mixPass);
    finalComposer.addPass(outputPass);
    const darkMaterial = new THREE.MeshBasicMaterial({ color: "black" });
    const materials = {}
    let bg = scene.background;
    const p = {
      threshold, strength, radius
    }
    return {
      selectedBloom: ({
        threshold = p.threshold,
        strength = p.strength,
        radius = p.radius,
      } = {}) => {
        bloomPass.threshold = threshold;
        bloomPass.strength = strength;
        bloomPass.radius = radius;
        scene.traverse((obj) => {
          if (obj.isMesh && bloomLayer.test(obj.layers) === false) {
            materials[obj.uuid] = obj.material;
            obj.material = darkMaterial;
          } else if (/Helper$/.test(obj.type) && bloomLayer.test(obj.layers) === false) {
            materials[obj.uuid] = obj.material;
            obj.material = darkMaterial;
          }
        });
        bg = scene.background;
        scene.background = color(0x000000);
        bloomComposer.render();
        scene.background = bg;
        scene.traverse(obj => {
          if (materials[obj.uuid]) {
            obj.material = materials[obj.uuid];
            delete materials[obj.uuid];
          }
        })
        finalComposer.render();
      },
      addSelectedBloom: (...list) => {
        list.forEach((obj) => {
          obj.layers.enable(Default.layer.bloom);
        });
      }
    }
  }
}

export default selectedBloom
