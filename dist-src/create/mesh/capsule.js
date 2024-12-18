const capsule = ({ create, THREE, sizeToArray }) => {
  return ({ size = 1, segments = [10, 20], ...props } = {}) => {
    return create.object(THREE.CapsuleGeometry, {
      ...props,
      args: [...sizeToArray(size, 2), ...sizeToArray(segments, 2)]
    });
  }
}

export default capsule
