const object = ({ Default, scene, THREE }) => {
  return (geometry, {
    args = [1, 1, 1],
    position = [0, 0, 0],
    rotation = [0, 0, 0],
    option = {
      color: Default.color,
    },
    material = Default.material,
    castShadow = true,
    receiveShadow = true,
    autoAdd = true,
  } = {}) => {
    const m = new THREE.Mesh(
      //new THREE[geometry](...args),
      new geometry(...args),
      new THREE[`Mesh${material}Material`](material === "Normal" ? {} : option)
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