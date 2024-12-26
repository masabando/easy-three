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
    const loadingManager = new THREE.LoadingManager()
    if (manager.onLoad) loadingManager.onLoad = manager.onLoad
    if (manager.onStart) loadingManager.onStart = manager.onStart
    if (manager.onProgress) loadingManager.onProgress = manager.onProgress
    if (manager.onError) loadingManager.onError = manager.onError

    const textureLoader = new THREE.TextureLoader(loadingManager);
    const texture = textureLoader.load(url);
    texture.wrapS = THREE[`${wrapS}Wrapping`];
    texture.wrapT = THREE[`${wrapT}Wrapping`];
    texture.repeat = new THREE.Vector2(...repeat);
    texture.colorSpace = THREE.SRGBColorSpace;
    return texture;
  }
}

export default texture
