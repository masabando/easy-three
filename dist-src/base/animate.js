const animate = ({ controls, renderer, scene, camera, THREE, fpv }) => {
  return (proc = () => { }, renderFlag = true) => {
    const clock = new THREE.Clock();
    let frameCount = 0;
    function loop() {
      frameCount++;
      const delta = clock.getDelta()
      const time = clock.getElapsedTime()
      if (fpv && fpv.isActive()) fpv.update(delta)
      controls.update()
      proc({ clock, delta, time, frameCount })
      if (renderFlag) renderer.render(scene, camera)
    }
    renderer.setAnimationLoop(loop)
  }
}

export default animate
