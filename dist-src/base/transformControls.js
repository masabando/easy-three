import { TransformControls } from "three/addons/controls/TransformControls.js";

const transformControls = ({ camera, renderer, controls, scene }) => {

  const attach = (object, {
    mode = "translate",
    disableOrbitControls = true,
  } = {}) => {
    const c = new TransformControls(camera, renderer.domElement);
    c.attach(object);
    if (disableOrbitControls) {
      c.addEventListener("dragging-changed", (event) => {
        controls.enabled = !event.value;
      })
    }
    c.setMode(mode);
    scene.add(c.getHelper());
    return c;
  }

  return {
    attach,
  };
}

export default transformControls
