const spotLight = ({ scene, THREE }) => {
  return ({
    color = 0xffffff,
    intensity = 1,
    distance = 0,
    angle = Math.PI / 4,
    penumbra = 0.1,
    decay = 2,
    position = [6, 6, 6],
    castShadow = true,
    helper = 0,
    helperColor = 0xffffff,
    shadow = {
      mapSize: {
        width: 1024,
        height: 1024,
      }
    },
  } = {}) => {
    const l = new THREE.SpotLight(color, intensity, distance, angle, penumbra, decay)
    l.position.set(...position)
    l.castShadow = castShadow
    if (castShadow) {
      l.shadow.mapSize.width = shadow.mapSize.width
      l.shadow.mapSize.height = shadow.mapSize.height
    }
    if (helper > 0) {
      const h = new THREE.SpotLightHelper(l, helperColor)
      scene.add(h)
    }
    scene.add(l);
    scene.add(l.target)
    return l;
  }
}

export default spotLight
