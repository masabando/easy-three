/**
 * Generates a grid helper for the scene.
 *
 * @param {Object} scene - The scene object where the grid will be added.
 * @param {typeof import("three")} THREE - The THREE.js library instance.
 * @returns {Function} A function to create and add a grid helper.
 */
const grid = ({ scene, THREE }) => {
  /**
   * The returned function accepts the following parameters:
   * @param {Object} options - Configuration options for the grid.
   * @param {number} [options.size=10] - The size of the grid.
   * @param {number} [options.divisions=10] - The number of divisions in the grid.
   * @param {number} [options.colorCenterLine=0x444444] - The color of the center line.
   * @param {number} [options.colorGrid=0x888888] - The color of the grid lines.
   * @returns {THREE.GridHelper} The created GridHelper instance.
   */
  return ({
    size,
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
