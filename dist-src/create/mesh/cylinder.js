const cylinder = ({ create, THREE, sizeToArray }) => {
  return ({ size = [1, 1, 2], segments = [32, 1], ...props } = {}) => {
    return create.object(THREE.CylinderGeometry, {
      ...props,
      args: [...sizeToArray(size, 3), ...sizeToArray(segments, 2)]
    });
  }
}

export default cylinder
