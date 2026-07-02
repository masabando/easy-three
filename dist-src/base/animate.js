const animate = ({ controls, renderer, scene, camera, THREE }) => {
  return (proc = () => { }, renderFlag = true) => {
    const clock = new THREE.Clock();
    let frameCount = 0;
    function loop() {
      frameCount++;
      controls.update()
      const delta = clock.getDelta()
      const time = clock.getElapsedTime()
      proc({ clock, delta, time, frameCount })
      if (renderFlag) renderer.render(scene, camera)
    }
    renderer.setAnimationLoop(loop)
  }
}

export default animate
