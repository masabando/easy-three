import mouse from "./mouse.js";
import key from "./key.js";

const use = [
  { name: "mouse", fn: mouse },
  { name: "key", fn: key },
]


const addEvent = ({ Default, THREE, event, domElement }) => {
  use.forEach((v) => {
    event[v.name] = v.fn({ Default, THREE, event, domElement });
  })
}

export default addEvent
