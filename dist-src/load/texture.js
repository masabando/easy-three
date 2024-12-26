const texture = ({ Default, THREE }) => {
  return (url, {
    wrapS = Default.texture.wrapping,
    wrapT = Default.texture.wrapping,
    repeat = [1, 1],
    manager = {
      onStart: () => { },
      onLoad: () => { },
      onProgress: () => { },
      onError: () => { },
    },
  } = {}) => {
    const manager = new THREE.LoadingManager()
    if (manager.onLoad) manager.onLoad = manager.onLoad
    if (manager.onStart) manager.onStart = manager.onStart
    if (manager.onProgress) manager.onProgress = manager.onProgress
    if (manager.onError) manager.onError = manager.onError

    const textureLoader = new THREE.TextureLoader(manager);
    const texture = textureLoader.load(url);
    texture.wrapS = THREE[`${wrapS}Wrapping`];
    texture.wrapT = THREE[`${wrapT}Wrapping`];
    texture.repeat = new THREE.Vector2(...repeat);
    texture.colorSpace = THREE.SRGBColorSpace;
    return texture;
  }
}

export default texture
