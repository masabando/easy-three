const pointLight = ({ scene, THREE }) => {
  return ({
    color = 0xffffff,
    intensity = 1,
    distance = 0,
    decay = 2,
    position = [6, 6, 6],
    castShadow = true,
    shadow = {
      mapSize: [1024, 1024],
    },
  } = {}) => {
    const l = new THREE.PointLight(color, intensity, distance, decay)
    l.position.set(...position)
    l.castShadow = castShadow
    if (castShadow) {
      l.shadow.mapSize = shadow.mapSize
    }
    scene.add(l);
    return l;
  }
}

export default pointLight
