const shape = ({ create, THREE, sizeToArray }) => {
  return ({ shapes = [], ...props } = {}) => {
    const s = new THREE.Shape();
    s.moveTo(...sizeToArray(shapes[0].position, 2))
    shapes.slice(1).forEach(({ position, type }) => {
      switch (type) {
        case 'curve':
          s.bezierCurveTo(...sizeToArray(position, 6))
          break
        default:
          s.lineTo(...sizeToArray(position, 2))
          break;
      }
    })
    return create.object(THREE.ShapeGeometry, {
      ...props,
      args: [s]
    });
  }
}

export default shape
