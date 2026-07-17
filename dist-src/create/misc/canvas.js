const canvas = ({ create, scene, sizeToArray }) => {
  return (
    proc = (context) => { },
    {
      size = 1,
      resolution = 100,
      transparent = true,
      material = "Basic",
      ...props
    } = {}) => {
    const options = {
      proc,
      size: sizeToArray(size, 2),
      resolution,
      transparent,
      material,
    }
    if (typeof proc === "object") {
      options.size = sizeToArray(proc.size, 2) || sizeToArray(size, 2);
      options.proc = () => { };
      options.resolution = proc.resolution || resolution;
      options.transparent = proc.transparent || transparent;
      options.material = proc.material || material;
    }
    const texture = create.canvasTexture(
      options.proc,
      {
        size: [options.size[0] * options.resolution, options.size[1] * options.resolution]
      }
    );
    const context = texture.userData.context;
    const canvas = texture.userData.canvas;
    const m = create.plane({
      ...props,
      size: options.size,
      material: options.material,
      option: {
        ...props.option,
        map: texture,
        transparent: options.transparent,
      }
    });
    m.userData = {
      texture,
      context,
      canvas
    }
    m.update = (p = () => { }) => {
      p(context, canvas);
      texture.needsUpdate = true;
    }

    return m;
  }
}

export default canvas
