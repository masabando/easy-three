const textTexture = ({ THREE }) => {
  return (text, {
    fontSize = 48,
    font = "'Noto Sans JP', sans-serif",
    fontWeight = "",
    color = "#000000",
    size = [500, 500],
    textAlign = "center",
    textBaseline = "middle",
    background = false,
    guide = 0,
    guideColor = "#ff0000",
  } = {}) => {
    const canvas = document.createElement("canvas");
    canvas.width = size[0];
    canvas.height = size[1];
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = guideColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    if (background) {
      ctx.fillStyle = background;
      ctx.fillRect(guide, guide, canvas.width - guide * 2, canvas.height - guide * 2);
    } else {
      ctx.clearRect(guide, guide, canvas.width - guide * 2, canvas.height - guide * 2);
    }
    ctx.font = `${fontWeight} ${fontSize}px ${font}`;
    ctx.fillStyle = color;
    ctx.textAlign = textAlign;
    ctx.textBaseline = textBaseline;
    ctx.fillText(text, canvas.width / 2, canvas.height / 2);
    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    return texture;
  }
}

export default textTexture
