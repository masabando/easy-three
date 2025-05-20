import { Water } from 'three/addons/objects/Water2.js';

const water = ({ THREE, sizeToArray, scene, load }) => {
  return (normalMap0, normalMap1, {
    size = 1,
    geometry = null,
    color = 0xffffff,
    scale = 4,
    flow = [1, 1],
    textureSize = 512,
    position = [0, 0, 0],
    rotation = [-Math.PI / 2, 0, 0],
    autoAdd = true,
  } = {}) => {
    const waterGeometry = geometry || new THREE.PlaneGeometry(...sizeToArray(size, 2));
    const texSize = sizeToArray(textureSize, 2);
    const mesh = new Water(
      waterGeometry,
      {
        normalMap0: load.texture(normalMap0),
        normalMap1: load.texture(normalMap1),
        textureWidth: texSize[0],
        textureHeight: texSize[1],
        color,
        scale,
        flowDirection: new THREE.Vector2(...flow),
      }
    );

    mesh.position.set(...position);
    mesh.rotation.set(...rotation);
    if (autoAdd) scene.add(mesh);
    return mesh;
  }
}

export default water
