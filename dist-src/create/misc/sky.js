import { Sky } from 'three/addons/objects/Sky.js';

const sky = ({ THREE, scene }) => {
  return ({
    size = 10000,
    theta = Math.PI * 0.47,
    phi = 0,
    autoAdd = true,
  } = {}) => {
    const sk = new Sky();
    sk.scale.setScalar(size);
    const skyUniforms = sk.material.uniforms;
    skyUniforms['turbidity'].value = 10;
    skyUniforms['rayleigh'].value = 2;
    skyUniforms['mieCoefficient'].value = 0.005;
    skyUniforms['mieDirectionalG'].value = 0.8;
    const sun = new THREE.Vector3();
    sun.setFromSphericalCoords(1, theta, phi);
    const _phi = phi;
    const _theta = theta;

    function update({ phi, theta }) {
      skyUniforms['sunPosition'].value.copy(sun);
      sun.setFromSphericalCoords(1, theta ?? _theta, phi ?? _phi);
      sk.material.uniforms['sunPosition'].value.copy(sun);
      return sun;
    }
    update({ phi, theta });

    if (autoAdd) scene.add(sk);
    return sk;
  }
}

export default sky
