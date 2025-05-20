import { Water } from 'three/addons/objects/Water.js';

const ocean = ({ THREE, sizeToArray, scene }) => {
  return (texture, {
    size = 100,
    geometry = null,
    sunDirection = new THREE.Vector3(1, 1, 1),
    sunColor = 0xffffff,
    waterColor = 0x001e0f,
    distortionScale = 3.7,
    textureSize = 512,
    fog = false,
    position = [0, 0, 0],
    rotation = [-Math.PI / 2, 0, 0],
    autoAdd = true,
  } = {}) => {
    const waterGeometry = geometry || new THREE.PlaneGeometry(...sizeToArray(size, 2));
    const texSize = sizeToArray(textureSize, 2);
    const mesh = new Water(
      waterGeometry,
      {
        textureWidth: texSize[0],
        textureHeight: texSize[1],
        waterNormals: new THREE.TextureLoader().load(texture, function (texture) {
          texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
        }),
        waterColor,
        sunColor,
        sunDirection,
        distortionScale,
        fog,
      }
    );

    mesh.position.set(...position);
    mesh.rotation.set(...rotation);
    if (autoAdd) scene.add(mesh);
    return {
      mesh,
      update: (delta, sun) => {
        mesh.material.uniforms['time'].value += delta;
        if (sun) {
          mesh.material.uniforms['sunDirection'].value.copy(sun).normalize();
        }
      }
    };
  }
}

export default ocean
