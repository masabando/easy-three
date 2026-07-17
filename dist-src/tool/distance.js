const distance = ({ renderer }) => {
  return (mesh1, mesh2, usePixelRatio = true) => {
    return mesh1.position.distanceTo(mesh2.position) * (usePixelRatio ? renderer.getPixelRatio() : 1);
  }
}

export default distance