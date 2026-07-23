import {
  Brush,
  Evaluator,
  ADDITION,
  SUBTRACTION,
  REVERSE_SUBTRACTION,
  DIFFERENCE,
  INTERSECTION,
} from "three-bvh-csg";

const csg = ({ scene }) => {

  function disposeMaterial(material) {
    if (Array.isArray(material)) {
      material.forEach(mat => mat.dispose())
    } else {
      material.dispose()
    }
  }

  const modeList = {
    "add": ADDITION,
    "subtract": SUBTRACTION,
    "reverseSubtract": REVERSE_SUBTRACTION,
    "difference": DIFFERENCE,
    "intersect": INTERSECTION,
  }

  return (mesh1, mesh2, {
    mode = "subtract",
    dispose = true,
    remove = true,
  } = {}) => {

    mesh1.updateWorldMatrix(true, false)
    mesh2.updateWorldMatrix(true, false)
    const brush1 = new Brush(mesh1.geometry, mesh1.material)
    const brush2 = new Brush(mesh2.geometry, mesh2.material)
    brush1.matrix.copy(mesh1.matrixWorld)
    brush2.matrix.copy(mesh2.matrixWorld)
    brush1.matrix.decompose(brush1.position, brush1.quaternion, brush1.scale)
    brush2.matrix.decompose(brush2.position, brush2.quaternion, brush2.scale)
    brush1.updateMatrixWorld(true)
    brush2.updateMatrixWorld(true)

    const evaluator = new Evaluator()
    const result = evaluator.evaluate(brush1, brush2, modeList[mode])

    result.material = Array.isArray(mesh1.material) ? mesh1.material.map(mat => mat.clone()) : mesh1.material.clone()

    scene.add(result)

    if (dispose) {
      mesh1.geometry.dispose()
      mesh2.geometry.dispose()
      disposeMaterial(mesh1.material)
      disposeMaterial(mesh2.material)
    }
    if (remove) {
      scene.remove(mesh1)
      scene.remove(mesh2)
    }
    return result
  }
}


export default csg
