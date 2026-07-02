const text = ({ create, THREE, sizeToArray, scene }) => {
  return (text, {
    fontSize = 48,
    font = "'Noto Sans JP', sans-serif",
    fontWeight = "",
    position = [0, 0, 0],
    rotation = [0, 0, 0],
    color = "#000000",
    size = 1,
    resolution = 1,
    textAlign = "center",
    textBaseline = "middle",
    background = false,
    side = "DoubleSide",
    material = "Basic",
    autoAdd = true,
    guide = 0,
    guideColor = "#ff0000",
  } = {}) => {
    const s = sizeToArray(size, 2);
    const current = {
      text,
      fontSize,
      font,
      fontWeight,
      position,
      rotation,
      color,
      size,
      resolution,
      textAlign,
      textBaseline,
      background,
      side,
      material,
      autoAdd,
      guide,
      guideColor,
    }
    const texture = create.textTexture(text, {
      fontSize: current.fontSize * current.resolution,
      font: current.font,
      fontWeight: current.fontWeight,
      color: current.color,
      size: [s[0] * 100 * current.resolution, s[1] * 100 * current.resolution],
      textAlign: current.textAlign,
      textBaseline: current.textBaseline,
      background: current.background,
      guide: current.guide,
      guideColor: current.guideColor,
    });
    const mat = new THREE[`Mesh${material}Material`]({
      transparent: true,
      map: texture,
      side: THREE[side],
    });
    const geometry = new THREE.PlaneGeometry(...s);
    const mesh = new THREE.Mesh(geometry, mat);
    mesh.position.set(...current.position);
    mesh.rotation.set(...current.rotation);
    if (current.autoAdd) scene.add(mesh);
    mesh.setText = (newText) => {
      current.text = newText;
      texture.setText(current.text);
      texture.needsUpdate = true;
    }
    mesh.setFontSize = (newFontSize) => {
      current.fontSize = newFontSize;
      texture.set({ fontSize: current.fontSize * current.resolution });
      texture.setText(current.text);
      texture.needsUpdate = true;
    }
    mesh.setColor = (newColor) => {
      current.color = newColor;
      texture.set({ color: current.color });
      texture.setText(current.text);
      texture.needsUpdate = true;
    }
    mesh.setBackground = (newBackground) => {
      current.background = newBackground;
      texture.set({ background: current.background });
      texture.setText(current.text);
      texture.needsUpdate = true;
    }
    mesh.setGuideColor = (newGuideColor) => {
      current.guideColor = newGuideColor;
      texture.set({ guideColor: current.guideColor });
      texture.setText(current.text);
      texture.needsUpdate = true;
    }
    mesh.setGuide = (newGuide) => {
      current.guide = newGuide;
      texture.set({ guide: current.guide });
      texture.setText(current.text);
      texture.needsUpdate = true;
    }
    return mesh;
  }
}

export default text
