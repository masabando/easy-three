const cylinder = ({ create, THREE, sizeToArray }) => {
  return ({
    size = [1, 1, 2],
    segments = [32, 1],
    openEnded = false,
    thetaStart = 0,
    thetaLength = Math.PI * 2,
    ...props
  } = {}) => {
    return create.object(THREE.CylinderGeometry, {
      ...props,
      args: [...sizeToArray(size, 3), ...sizeToArray(segments, 2), openEnded, thetaStart, thetaLength]
    });
  }
}

export default cylinder
