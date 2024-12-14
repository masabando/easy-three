const axes = ({ scene, THREE }) => {
  return ({
    size = 10,
  } = {}) => {
    const a = new THREE.AxesHelper(size)
    a.position.y = 0.01
    scene.add(a)
    return a;
  }
}

export default axes
