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
  }
}