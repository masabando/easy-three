const group = ({ THREE, scene }) => {
  return ({
    position = [0, 0, 0],
    rotation = [0, 0, 0],
    children = [],
    autoAdd = true,
    ...props
  } = {}) => {
    const result = new THREE.Group();
    result.position.set(...position);
    result.rotation.set(...rotation);
    children.forEach((c) => {
      if (c instanceof THREE.Object3D) {
        result.add(c);
      }
    });
    if (autoAdd) scene.add(result);
    return result;
  }
}

export default group
