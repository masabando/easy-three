const circle = ({ create, THREE, sizeToArray }) => {
  return ({ size = 1, segments = 32, ...props } = {}) => {
    return create.object(THREE.CircleGeometry, {
      ...props,
      args: [...sizeToArray(size, 1), ...sizeToArray(segments, 1)]
    });
  }
}

export default circle
