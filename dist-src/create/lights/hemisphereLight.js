const hemisphereLight = ({ scene, THREE }) => {
  return ({
    skyColor = 0xeeddff,
    groundColor = 0x887777,
    intensity = 0.5,
  } = {}) => {
    const l = new THREE.HemisphereLight(skyColor, groundColor, intensity)
    scene.add(l);
    return l;
  }
}

export default hemisphereLight
