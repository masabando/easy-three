import { HTMLMesh } from 'three/addons/interactive/HTMLMesh.js';
const html = ({ scene }) => {
  return (domElement, {
    position = [0, 0, 0],
    rotation = [0, 0, 0],
    scale = [1, 1, 1],
    autoAdd = true,
  } = {}) => {
    const m = new HTMLMesh(domElement)
    m.position.set(...position);
    m.rotation.set(...rotation);
    m.scale.set(...scale);
    if (autoAdd) {
      scene.add(m);
    }
    return m;
  }
}

export default html
