// mesh
import object from './mesh/object.js';
import cube from './mesh/cube.js';
import sphere from './mesh/sphere.js';
import plane from './mesh/plane.js';
import torus from './mesh/torus.js';
import torusKnot from './mesh/torusKnot.js';
// lights
import directionalLight from './lights/directionalLight.js';
import pointLight from './lights/pointLight.js';
import ambientLight from './lights/ambientLight.js';
// misc
import fog from './misc/fog.js';
import group from './misc/group.js';
import textTexture from './misc/textTexture.js';
import text from './misc/text.js';

const use = [
  // mesh
  { name: "object", fn: object },
  { name: 'cube', fn: cube },
  { name: 'box', fn: cube },
  { name: 'sphere', fn: sphere },
  { name: 'plane', fn: plane },
  { name: 'torus', fn: torus },
  { name: 'torusKnot', fn: torusKnot },
  // lights
  { name: 'directionalLight', fn: directionalLight },
  { name: 'pointLight', fn: pointLight },
  { name: 'ambientLight', fn: ambientLight },
  // misc
  { name: 'fog', fn: fog },
  { name: 'group', fn: group },
  { name: 'textTexture', fn: textTexture },
  { name: 'text', fn: text },
]

function sizeToArray(size, n = 3) {
  return isNaN(size) ? size : Array(n).fill(size)
}

const addCreate = ({ Default, create, scene, THREE }) => {
  use.forEach((v) => {
    create[v.name] = v.fn({ Default, create, scene, sizeToArray, THREE });
  })
}

export default addCreate
