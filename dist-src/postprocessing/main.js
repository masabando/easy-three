import bloom from './bloom.js'
import selectedBloom from './selectedBloom.js'
import pixel from './pixel.js'
import mask from './mask.js'
import glitch from './glitch.js'
import bokeh from './bokeh.js'

const use = [
  { name: "bloom", fn: bloom },
  { name: "selectedBloom", fn: selectedBloom },
  { name: "pixel", fn: pixel },
  { name: "mask", fn: mask },
  { name: "glitch", fn: glitch },
  { name: "bokeh", fn: bokeh },
]


const addPostprocessing = ({ renderer, camera, scene, THREE, postprocessing, color, sizeTarget, Default }) => {
  use.forEach((v) => {
    postprocessing[v.name] = v.fn({ renderer, camera, scene, THREE, color, sizeTarget, Default });
  })
}

export default addPostprocessing
