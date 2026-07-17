import setPixelRatio from './setPixelRatio.js';
import distance from './distance.js';

const use = [
  { name: "setPixelRatio", fn: setPixelRatio },
  { name: "distance", fn: distance },
]

const addTool = ({ tool, renderer }) => {
  use.forEach((v) => {
    tool[v.name] = v.fn({ renderer });
  })
}

export default addTool
