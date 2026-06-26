const setPixelRatio = ({ renderer }) => {
  return (ratio) => {
    renderer.setPixelRatio(ratio);
  }
}

export default setPixelRatio