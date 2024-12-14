const animate = ({ controls, renderer, scene, camera, THREE }) => {
  return (proc = () => { }, renderFlag = true) => {
    const clock = new THREE.Clock();
    function loop() {
      controls.update()
      const delta = clock.getDelta()
      const time = clock.getElapsedTime()
      proc({ clock, delta, time })
      if (renderFlag) renderer.render(scene, camera)
    }
    renderer.setAnimationLoop(loop)
  }
}

export default animate
