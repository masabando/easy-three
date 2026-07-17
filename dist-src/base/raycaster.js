const raycaster = ({ camera, THREE, domElement }) => {
  const settings = {
    useMouse: true,
    mouseEvent: "pointermove",
  }

  const caster = new THREE.Raycaster();
  const pointer = new THREE.Vector2(1, 1);

  function updatePointer(event) {
    const rect = domElement.getBoundingClientRect();
    pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    pointer.y = -(((event.clientY - rect.top) / rect.height) * 2 - 1);
  }

  const connect = ({
    useMouse = true,
    mouseEvent = "pointermove",
  } = {}) => {
    settings.useMouse = useMouse;
    settings.mouseEvent = mouseEvent;
    if (settings.useMouse) {
      domElement.addEventListener(settings.mouseEvent, updatePointer);
    }
  }

  const disconnect = () => {
    if (settings.useMouse) {
      domElement.removeEventListener(settings.mouseEvent, updatePointer);
    }
  }

  const getIntersections = (objects, {
    recursive = true,
  } = {}) => {
    caster.setFromCamera(pointer, camera);
    return caster.intersectObjects(objects, recursive);
  }

  return {
    connect,
    disconnect,
    getIntersections,
  };
}

export default raycaster
