const cone = ({ create, THREE, sizeToArray }) => {
  return ({ size = [1, 2], segments = [32, 1], ...props } = {}) => {
    return create.object(THREE.ConeGeometry, {
      ...props,
      args: [...sizeToArray(size, 2), ...sizeToArray(segments, 2)]
    });
  }
}

export default cone
