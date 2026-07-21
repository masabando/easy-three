import { VRButton } from "three/examples/jsm/webxr/VRButton.js"
import { XRHandModelFactory } from "three/examples/jsm/webxr/XRHandModelFactory.js"
import { XRControllerModelFactory } from "three/examples/jsm/webxr/XRControllerModelFactory.js"

const xr = ({ THREE, renderer, scene, camera, domElement }) => {

  function setupVRHands(index) {
    const handModelFactory = new XRHandModelFactory()
    const hand = renderer.xr.getHand(index);
    hand.add(handModelFactory.createHandModel(hand, 'mesh'))
    scene.add(hand)
  }

  function setupVRControllers(index, selectableObjects = []) {
    const controllerModelFactory = new XRControllerModelFactory()
    const controller = renderer.xr.getController(index)
    scene.add(controller)

    const controllerGrip = renderer.xr.getControllerGrip(index)
    controllerGrip.add(
      controllerModelFactory.createControllerModel(controllerGrip)
    )
    scene.add(controllerGrip)

    const geometry = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(0, 0, -1)
    ])

    const line = new THREE.Line(geometry)
    line.name = 'line'
    line.scale.z = 5
    line.material.color = new THREE.Color(index === 0 ? 0xff0000 : 0x0000ff)
    controller.add(line.clone())

    controller.addEventListener('selectstart', (event) => {
      const controller = event.target
      const intersections = getIntersections(controller, selectableObjects)
      if (intersections.length > 0) {
        const intersection = intersections[0]
        const object = intersection.object
        controller.userData.selected = object
      }
    })
    controller.addEventListener('selectend', (event) => {
      const controller = event.target
      if (controller.userData.selected) {
        controller.userData.selected = undefined
      }
    })

    return controller
  }

  const tempMatrix = new THREE.Matrix4();
  const raycaster = new THREE.Raycaster();

  function getIntersections(controller, objects, recursive = true) {
    tempMatrix.identity().extractRotation(controller.matrixWorld);
    raycaster.ray.origin.setFromMatrixPosition(controller.matrixWorld);
    raycaster.ray.direction.set(0, 0, -1).applyMatrix4(tempMatrix);
    return raycaster.intersectObjects(objects, recursive);
  }

  function setup({
    position = [0, 1.6, 3],
    lookAt = [0, 1.6, 0],
    leftController = true,
    rightController = true,
    leftHand = true,
    rightHand = true,
    buttonTarget = domElement,
    selectableObjects = [],
  } = {}) {
    buttonTarget.appendChild(VRButton.createButton(renderer))
    renderer.xr.enabled = true
    camera.position.set(...position)
    camera.lookAt(...lookAt)

    const _leftController = leftController ? setupVRControllers(0, selectableObjects) : null
    const _rightController = rightController ? setupVRControllers(1, selectableObjects) : null
    const _leftHand = leftHand ? setupVRHands(0) : null
    const _rightHand = rightHand ? setupVRHands(1) : null

    return {
      leftController: _leftController,
      rightController: _rightController,
      leftHand: _leftHand,
      rightHand: _rightHand,
    }
  }

  return {
    setup,
  }
}

export default xr;
