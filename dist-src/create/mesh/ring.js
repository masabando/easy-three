const ring = ({ create, THREE, sizeToArray }) => {
  return ({ size = [0.5, 1], segments = [32, 1], angle=[0, Math.PI * 2], ...props } = {}) => {
    return create.object(THREE.RingGeometry, {
      ...props,
      args: [
        ...sizeToArray(size, 2),
        ...sizeToArray(segments, 3),
        ...sizeToArray(angle, 2)
      ]
    });
  }
}

export default ring
