import { RoundedBoxGeometry } from "three/addons/geometries/RoundedBoxGeometry.js";

const cube = ({ create, sizeToArray, THREE }) => {
  return ({
    size = 1,
    segments = 1,
    rounded = false,
    radius = 0.1,
    ...props
  } = {}) => {
    return create.object(rounded ? RoundedBoxGeometry : THREE.BoxGeometry, {
      ...props,
      args: [
        ...sizeToArray(size, 3),
        ...(rounded ? [segments, radius] : sizeToArray(segments, 3))
      ]
    });
  }
}

export default cube