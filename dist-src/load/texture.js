const texture = ({ Default, THREE }) => {
  return (url, {
    wrapS = Default.texture.wrapping,
    wrapT = Default.texture.wrapping,
    repeat = [1, 1]
  } = {}) => {
    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load(url);
    texture.wrapS = THREE[`${wrapS}Wrapping`];
    texture.wrapT = THREE[`${wrapT}Wrapping`];
    texture.repeat = new THREE.Vector2(...repeat);
    texture.colorSpace = THREE.SRGBColorSpace;
    return texture;
  }
}

export default texture
