const defaultValue = {
  shadow: {
    mapSize: {
      width: 1024,
      height: 1024,
    },
    camera: {
      left: -10,
      right: 10,
      top: 10,
      bottom: -10,
      near: 0.5,
      far: 500,
    },
    bias: 0
  }
}

const directionalLight = ({ scene, THREE }) => {
  return ({
    intensity = 1,
    color = 0xffffff,
    position = [10, 10, 10],
    castShadow = true,
    helper = 0,
    helperColor = 0xffffff,
    shadow = defaultValue.shadow,
  } = {}) => {
    const l = new THREE.DirectionalLight(color, intensity)
    l.position.set(...position)
    l.castShadow = castShadow
    if (castShadow) {
      l.shadow.mapSize.width = shadow.mapSize.width || defaultValue.shadow.mapSize.width
      l.shadow.mapSize.height = shadow.mapSize.height || defaultValue.shadow.mapSize.height
      l.shadow.camera.left = shadow.camera.left || defaultValue.shadow.camera.left
      l.shadow.camera.right = shadow.camera.right || defaultValue.shadow.camera.right
      l.shadow.camera.top = shadow.camera.top || defaultValue.shadow.camera.top
      l.shadow.camera.bottom = shadow.camera.bottom || defaultValue.shadow.camera.bottom
      l.shadow.camera.near = shadow.camera.near || defaultValue.shadow.camera.near
      l.shadow.camera.far = shadow.camera.far || defaultValue.shadow.camera.far
      l.shadow.bias = shadow.bias || defaultValue.shadow.bias;
    }
    if (helper > 0) {
      const h = new THREE.DirectionalLightHelper(l, helper, helperColor)
      scene.add(h)
    }
    scene.add(l);
    return l;
  }
}

export default directionalLight
