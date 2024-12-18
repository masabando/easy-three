const octahedron = ({ create, THREE, sizeToArray }) => {
  return ({ size = 1, detail = 0, ...props } = {}) => {
    return create.object(THREE.OctahedronGeometry, {
      ...props,
      args: [...sizeToArray(size, 1), ...sizeToArray(detail, 1)]
    });
  }
}

export default octahedron
