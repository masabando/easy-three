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
    const current = {
      text,
      fontSize,
      font,
      fontWeight,
      color,
      size,
      textAlign,
      textBaseline,
      background,
      guide,
      guideColor,
    }
    canvas.width = size[0];
    canvas.height = size[1];
    const ctx = canvas.getContext("2d");
    function setText(newText) {
      current.text = newText;
      ctx.fillStyle = current.guideColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      if (current.background) {
        ctx.fillStyle = current.background;
        ctx.fillRect(current.guide, current.guide, canvas.width - current.guide * 2, canvas.height - current.guide * 2);
      } else {
        ctx.clearRect(current.guide, current.guide, canvas.width - current.guide * 2, canvas.height - current.guide * 2);
      }
      ctx.font = `${current.fontWeight} ${current.fontSize}px ${current.font}`;
      ctx.fillStyle = current.color;
      ctx.textAlign = current.textAlign;
      ctx.textBaseline = current.textBaseline;
      switch (textAlign) {
        case "left":
        case "start":
          ctx.fillText(current.text, current.guide, canvas.height / 2);
          break;
        case "right":
        case "end":
          ctx.fillText(current.text, canvas.width - current.guide, canvas.height / 2);
          break;
        default:
          ctx.fillText(current.text, canvas.width / 2, canvas.height / 2);
      }
    }
    setText(text);
    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.userData = {
      canvas,
      context: ctx,
    };
    texture.set = (newOptions) => {
      Object.keys(newOptions).forEach(key => {
        if (current.hasOwnProperty(key)) {
          current[key] = newOptions[key];
        }
      })
      setText(current.text);
      texture.needsUpdate = true;
    }
    texture.needsUpdate = true;
    return texture;
  }
}

export default textTexture
