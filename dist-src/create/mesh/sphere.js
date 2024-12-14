const sphere = ({ create, THREE, sizeToArray }) => {
  return ({ size = 1, segments = 64, ...props } = {}) => {
    return create.object(THREE.SphereGeometry, {
      ...props,
      args: [...sizeToArray(size, 1), ...sizeToArray(segments, 2)]
    });
  }
}

export default sphere
