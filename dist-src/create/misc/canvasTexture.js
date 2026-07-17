const canvasTexture = ({ THREE, sizeToArray }) => {
  return (
    proc = (context) => { },
    {
      size = [500, 500],
    } = {}) => {
    const canvas = document.createElement("canvas");
    const options = {
      proc,
      size: sizeToArray(size, 2),
    }

    // 引数が ({ ... }) なら、procの中にsizeがあるということなので、procの中でsizeを上書きする。
    if (typeof proc === "object") {
      options.size = sizeToArray(proc.size, 2) || sizeToArray(size, 2);
      options.proc = () => { };
    }

    canvas.width = options.size[0];
    canvas.height = options.size[1];
    const ctx = canvas.getContext("2d");
    options.proc(ctx, canvas);
    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.userData = {
      canvas,
      context: ctx,
    };
    texture.needsUpdate = true;
    texture.update = (p = () => { }) => {
      p(ctx, canvas);
      texture.needsUpdate = true;
    }
    return texture;
  }
}

export default canvasTexture
