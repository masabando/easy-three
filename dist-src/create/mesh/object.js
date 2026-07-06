const object = ({ Default, scene, THREE }) => {
  return (geometry, {
    args = [1, 1, 1],
    position = [0, 0, 0],
    rotation = [0, 0, 0],
    doubleSide = false,
    upsideDown = false,
    option = {
      color: Default.color,
    },
    material = Default.material,
    castShadow = true,
    receiveShadow = true,
    autoAdd = true,
  } = {}) => {
    const op = option;
    const side = op.side ? op.side : (doubleSide ? THREE.DoubleSide : (upsideDown ? THREE.BackSide : THREE.FrontSide));
    //op.color = op.color || Default.color;
    function createMaterial() {
      if (op.map && Array.isArray(op.map)) {
        return op.map.map((mp) => {
          const newOp = { ...op, map: mp, side };
          return typeof material === "string" ? new THREE[`Mesh${material}Material`](material === "Normal" ?
            ({ side })
            : newOp) : material;
        })
      } else {
        return typeof material === "string" ? new THREE[`Mesh${material}Material`](material === "Normal" ?
          ({ side })
          : { ...op, side }) : material;
      }
    }
    const m = new THREE.Mesh(
      //new THREE[geometry](...args),
      new geometry(...args),
      createMaterial()
    )
    m.position.set(...position)
    m.rotation.set(...rotation)
    m.castShadow = castShadow
    m.receiveShadow = receiveShadow
    if (autoAdd) scene.add(m);
    return m;
  }
}

export default object