import axes from "./axes.js";
import grid from "./grid.js";

const use = [
  { name: "axes", fn: axes },
  { name: "grid", fn: grid },
]


const addHelper = ({ THREE, scene, helper }) => {
  use.forEach((v) => {
    helper[v.name] = v.fn({ THREE, scene });
  })
}

export default addHelper
