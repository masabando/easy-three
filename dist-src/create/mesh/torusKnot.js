const torusKnot = ({ create, THREE, sizeToArray }) => {
  return ({ size = 1, tube = 0.3, segments = [128, 8], ...props } = {}) => {
    return create.object(THREE.TorusKnotGeometry, {
      ...props,
      args: [size, tube, ...sizeToArray(segments, 2)]
    });
  }
}

export default torusKnot
