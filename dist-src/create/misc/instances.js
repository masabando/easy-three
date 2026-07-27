const instances = ({ scene, THREE }) => {
  return (originalMesh, count = 1, {
    position = [0, 0, 0],
    rotation = [0, 0, 0],
    removeOriginal = true,
    offset = [0, 0, 0],
    layout = "line",
    radius = 1,
    castShadow = null,
    receiveShadow = null,
    autoAdd = true,
  } = {}) => {
    const m = new THREE.InstancedMesh(
      originalMesh.geometry,
      originalMesh.material,
      count
    )
    const dummy = new THREE.Object3D();
    const axes = layout.split("-")[1] || "xz";
    for (let i = 0; i < count; i++) {
      const theta = i / count * Math.PI * 2;
      switch (layout) {
        case "none":
          break;
        case "line":
          dummy.position.set(
            originalMesh.position.x + offset[0] * i,
            originalMesh.position.y + offset[1] * i,
            originalMesh.position.z + offset[2] * i
          );
          break;
        case "grid":
        case "grid-xy":
        case "grid-xz":
        case "grid-yx":
        case "grid-yz":
        case "grid-zx":
        case "grid-zy":
          const columns = Math.ceil(Math.sqrt(count));
          dummy.position.set(
            originalMesh.position.x + (axes[0] === "x" ? (i % columns) * offset[0] : (axes[1] === "x" ? Math.floor(i / columns) * offset[0] : 0)),
            originalMesh.position.y + (axes[0] === "y" ? (i % columns) * offset[1] : (axes[1] === "y" ? Math.floor(i / columns) * offset[1] : 0)),
            originalMesh.position.z + (axes[0] === "z" ? (i % columns) * offset[2] : (axes[1] === "z" ? Math.floor(i / columns) * offset[2] : 0))
          );
          break;
        case "cube":
        case "cube-xy":
        case "cube-xz":
        case "cube-yx":
        case "cube-yz":
        case "cube-zx":
        case "cube-zy":
          const cubeColumns = Math.ceil(Math.cbrt(count));
          dummy.position.set(
            originalMesh.position.x + (axes[0] === "x" ? (i % cubeColumns) * offset[0] : (axes[1] === "x" ? Math.floor(i / cubeColumns) % cubeColumns * offset[0] : Math.floor(i / (cubeColumns * cubeColumns)) * offset[0])),
            originalMesh.position.y + (axes[0] === "y" ? (i % cubeColumns) * offset[1] : (axes[1] === "y" ? Math.floor(i / cubeColumns) % cubeColumns * offset[1] : Math.floor(i / (cubeColumns * cubeColumns)) * offset[1])),
            originalMesh.position.z + (axes[0] === "z" ? (i % cubeColumns) * offset[2] : (axes[1] === "z" ? Math.floor(i / cubeColumns) % cubeColumns * offset[2] : Math.floor(i / (cubeColumns * cubeColumns)) * offset[2]))
          );
          break;
        case "circle":
        case "circle-xy":
        case "circle-xz":
        case "circle-yx":
        case "circle-yz":
        case "circle-zx":
        case "circle-zy":
          dummy.position.set(
            originalMesh.position.x + (axes[0] === "x" ? Math.cos(theta) * radius : (axes[1] === "x" ? Math.sin(theta) * radius : 0)),
            originalMesh.position.y + (axes[0] === "y" ? Math.cos(theta) * radius : (axes[1] === "y" ? Math.sin(theta) * radius : 0)),
            originalMesh.position.z + (axes[0] === "z" ? Math.cos(theta) * radius : (axes[1] === "z" ? Math.sin(theta) * radius : 0))
          );
          break;
      }
      dummy.rotation.copy(originalMesh.rotation);
      dummy.scale.copy(originalMesh.scale);
      dummy.updateMatrix();
      m.setMatrixAt(i, dummy.matrix);
    }
    m.instanceMatrix.needsUpdate = true;
    m.position.set(...position);
    m.rotation.set(...rotation)
    m.castShadow = castShadow ?? originalMesh.castShadow
    m.receiveShadow = receiveShadow ?? originalMesh.receiveShadow

    m.setColor = (color) => {
      const colorObj = new THREE.Color(color);
      for (let i = 0; i < count; i++) {
        m.setColorAt(i, colorObj);
      }
      m.instanceColor.needsUpdate = true;
    }

    m.at = (index) => {
      return {
        position: {
          set: (x, y, z) => {
            m.getMatrixAt(index, dummy.matrix);
            dummy.matrix.decompose(
              dummy.position,
              dummy.quaternion,
              dummy.scale
            )
            dummy.position.set(x, y, z);
            dummy.updateMatrix();
            m.setMatrixAt(index, dummy.matrix);
            m.instanceMatrix.needsUpdate = true;
          },
          get: () => {
            m.getMatrixAt(index, dummy.matrix);
            dummy.matrix.decompose(
              dummy.position,
              dummy.quaternion,
              dummy.scale
            )
            return dummy.position.clone();
          }
        },
        rotation: {
          set: (x, y, z) => {
            m.getMatrixAt(index, dummy.matrix);
            dummy.matrix.decompose(
              dummy.position,
              dummy.quaternion,
              dummy.scale
            )
            dummy.rotation.set(x, y, z);
            dummy.updateMatrix();
            m.setMatrixAt(index, dummy.matrix);
            m.instanceMatrix.needsUpdate = true;
          },
          get: () => {
            m.getMatrixAt(index, dummy.matrix);
            dummy.matrix.decompose(
              dummy.position,
              dummy.quaternion,
              dummy.scale
            )
            return dummy.rotation.clone();
          }
        },
        scale: {
          set: (x, y, z) => {
            m.getMatrixAt(index, dummy.matrix);
            dummy.matrix.decompose(
              dummy.position,
              dummy.quaternion,
              dummy.scale
            )
            dummy.scale.set(x, y, z);
            dummy.updateMatrix();
            m.setMatrixAt(index, dummy.matrix);
            m.instanceMatrix.needsUpdate = true;
          },
          get: () => {
            m.getMatrixAt(index, dummy.matrix);
            dummy.matrix.decompose(
              dummy.position,
              dummy.quaternion,
              dummy.scale
            )
            return dummy.scale.clone();
          }
        },
        color: {
          set: (color) => {
            const colorObj = new THREE.Color(color);
            m.setColorAt(index, colorObj);
            m.instanceColor.needsUpdate = true;
          },
          get: () => {
            const colorObj = new THREE.Color();
            m.getColorAt(index, colorObj);
            return colorObj;
          }
        }
      }
    }

    if (removeOriginal) originalMesh.removeFromParent();
    if (autoAdd) scene.add(m);
    return m;
  }
}

export default instances