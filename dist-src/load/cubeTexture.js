const cubeTexture = ({ THREE }) => {
  return (urls, {
    path = "./"
  } = {}) => {
    const texture = new THREE.CubeTextureLoader().setPath(path).load(urls);
    return texture;
  }
}

export default cubeTexture
