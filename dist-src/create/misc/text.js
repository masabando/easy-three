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
    autoAdd = true,
    guide = 0,
    guideColor = "#ff0000",
  } = {}) => {
    const s = sizeToArray(size, 2);
    const texture = create.textTexture(text, {
      fontSize: fontSize * resolution,
      font,
      fontWeight,
      color,
      size: [s[0] * 100 * resolution, s[1] * 100 * resolution],
      textAlign,
      textBaseline,
      background,
      guide,
      guideColor,
    });
    const material = new THREE.MeshBasicMaterial({
      transparent: true,
      map: texture,
      side: THREE[side],
    });
    const geometry = new THREE.PlaneGeometry(...s);
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(...position);
    mesh.rotation.set(...rotation);
    if (autoAdd) scene.add(mesh);
    return mesh;
  }
}

export default text
