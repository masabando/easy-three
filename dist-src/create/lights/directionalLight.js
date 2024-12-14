const directionalLight = ({ scene, THREE }) => {
  return ({
    intensity = 1,
    color = 0xffffff,
    position = [10, 10, 10],
    castShadow = true,
    shadow = {
      mapSize: {
        width: 1024,
        height: 1024,
      },
      camera: {
        left: -10,
        right: 10,
        top: 10,
        bottom: -10,
      }
    },
  } = {}) => {
    const l = new THREE.DirectionalLight(color, intensity)
    l.position.set(...position)
    l.castShadow = castShadow
    if (castShadow) {
      l.shadow.mapSize.width = shadow.mapSize.width
      l.shadow.mapSize.height = shadow.mapSize.height
      l.shadow.camera.left = shadow.camera.left
      l.shadow.camera.right = shadow.camera.right
      l.shadow.camera.top = shadow.camera.top
      l.shadow.camera.bottom = shadow.camera.bottom
    }
    scene.add(l);
    return l;
  }
}

export default directionalLight
