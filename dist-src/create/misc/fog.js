const fog = ({ scene, THREE }) => {
  return ({
    color = 0xffffff,
    near = 1,
    far = 1000,
  } = {}) => {
    scene.fog = new THREE.Fog(color, near, far);
    return scene.fog;
  }
}

export default fog
