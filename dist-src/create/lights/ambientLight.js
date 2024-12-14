const ambientLight = ({ scene, THREE }) => {
  return ({
    color = 0xffffff,
    intensity = 0.5,
  } = {}) => {
    const l = new THREE.AmbientLight(color, intensity)
    scene.add(l);
    return l;
  }
}

export default ambientLight
