import setPixelRatio from './setPixelRatio.js';

const use = [
  { name: "setPixelRatio", fn: setPixelRatio },
]

const addTool = ({ tool, renderer }) => {
  use.forEach((v) => {
    tool[v.name] = v.fn({ renderer });
  })
}

export default addTool
