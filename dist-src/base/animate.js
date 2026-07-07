const animate = ({ controls, renderer, scene, camera, THREE, fpv }) => {
  return (proc = () => { }, renderFlag = true) => {
    // const clock = new THREE.Clock();
    const timer = new THREE.Timer();
    timer.connect(document);
    const clock = timer;
    clock.getElapsedTime = () => timer.getElapsed();
    let frameCount = 0;
    function loop() {
      timer.update();
      frameCount++;
      // const delta = clock.getDelta()
      // const time = clock.getElapsedTime()
      const delta = timer.getDelta();
      const time = timer.getElapsed();
      if (fpv && fpv.isActive()) fpv.update(delta)
      controls.update()
      proc({ clock, timer, delta, time, frameCount })
      if (renderFlag) renderer.render(scene, camera)
    }
    renderer.setAnimationLoop(loop)
  }
}

export default animate
