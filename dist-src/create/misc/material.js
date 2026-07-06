const material = ({ THREE, Default }) => {
  return ({
    doubleSide = false,
    upsideDown = false,
    material = Default.material,
    ...props
  } = {}) => {

    const side = doubleSide ? THREE.DoubleSide : (upsideDown ? THREE.BackSide : THREE.FrontSide);

    return new THREE[`Mesh${material}Material`]({
      side: side,
      ...props,
    });
  }
}

export default material
