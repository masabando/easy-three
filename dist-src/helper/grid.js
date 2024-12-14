const grid = ({ scene, THREE }) => {
  return ({
    size = 10,
    divisions = 10,
    colorCenterLine = 0x444444,
    colorGrid = 0x888888,
  } = {}) => {
    const g = new THREE.GridHelper(size, divisions, colorCenterLine, colorGrid)
    g.position.y = 0.005
    scene.add(g)
    return g;
  }
}

export default grid
