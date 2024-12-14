import background from "./background.js";
import texture from "./texture.js";
import gltf from "./gltf.js";
import vrm from "./vrm.js";
import videoTexture from "./videoTexture.js";
import cubeTexture from "./cubeTexture.js";

const use = [
  { name: "background", fn: background },
  { name: "texture", fn: texture },
  { name: "gltf", fn: gltf },
  { name: "vrm", fn: vrm },
  { name: "videoTexture", fn: videoTexture },
  { name: "cubeTexture", fn: cubeTexture },
]


const addLoad = ({ Default, THREE, load, scene }) => {
  use.forEach((v) => {
    load[v.name] = v.fn({ Default, THREE, scene });
  })
}

export default addLoad
