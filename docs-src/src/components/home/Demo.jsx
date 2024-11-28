import { init } from "https://cdn.jsdelivr.net/gh/masabando/easy-three@0.0.7/dist/easy-three.js";
import { useEffect, useRef } from "react";

export const Demo = {
  Simple: (props) => {
    const ref = useRef()
    useEffect(() => {
      const { camera, create, animate } = init(ref.current)
      camera.position.set(5, 5, 5);
      create.ambientLight()
      create.directionalLight()
      const cube = create.cube({ size: 3 })
      animate(({ clock }) => {
        cube.rotation.x = clock.getElapsedTime()
        cube.rotation.y = clock.getElapsedTime()
      })
    }, [])
    return (
      <div ref={ref} {...props}></div>
    )
  },
  Model: (props) => {
    const ref = useRef()
    useEffect(() => {
      const { camera, create, animate, controls, helper, load } = init(ref.current);

      controls.connect()
      controls.autoRotate = true
      camera.position.set(0, 2, -2)
      controls.target.set(0, 1, 0)
      create.ambientLight()
      create.directionalLight({ intensity: 2, position: [10, 10, -10] })
      helper.axes();
      helper.grid();

      const cube = create.cube({ size: 0.5, position: [1, 1, 0] })

      let model;
      load.vrm("./model/sample.vrm").then(m => {
        model = m
      })

      animate(({ clock, delta }) => {
        cube.rotation.y += delta
        cube.rotation.x += delta
        if (model) {
          model.humanoid.getNormalizedBoneNode("leftUpperArm").rotation.z = Math.sin(clock.getElapsedTime()) * Math.PI * 0.25
          model.update(delta)
        }
      })
    }, [])
    return (
      <div ref={ref} {...props}></div>
    )
  },
  World: (props) => {
    const ref = useRef()
    useEffect(() => {
      const { camera, scene, create, controls, animate, load } = init(ref.current)
      load.background('./texture/symmetrical_garden_02_1k.hdr')
      animate()
    }, [])
    return (
      <div ref={ref} {...props}></div>
    )
  }
}