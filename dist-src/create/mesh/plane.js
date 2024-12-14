const plane = ({ create, THREE, sizeToArray }) => {
  return ({ size = 1, segments = 1, ...props } = {}) => {
    return create.object(THREE.PlaneGeometry, {
      ...props,
      args: [...sizeToArray(size, 2), ...sizeToArray(segments, 2)]
    });
  }
}

export default plane
