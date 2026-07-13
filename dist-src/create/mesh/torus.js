const torus = ({ create, THREE, sizeToArray }) => {
  return ({ size = 1, tube = 0.4, segments = 64, arc = Math.PI*2,  ...props } = {}) => {
    return create.object(THREE.TorusGeometry, {
      ...props,
      args: [size, tube, ...sizeToArray(segments, 2), arc]
    });
  }
}

export default torus
