import setPixelRatio from './setPixelRatio.js';
import distance from './distance.js';
import csg from './csg.js';

const use = [
  { name: "setPixelRatio", fn: setPixelRatio },
  { name: "distance", fn: distance },
  { name: "csg", fn: csg },
]

const addTool = ({ tool, renderer, scene }) => {
  use.forEach((v) => {
    tool[v.name] = v.fn({ renderer, scene });
  })
}

export default addTool
