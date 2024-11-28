import { init } from "https://cdn.jsdelivr.net/gh/masabando/easy-three@0.0.5/dist/easy-three.js";
import { useEffect, useRef } from "react";


export const Demo = {
  Simple: (props) => {
    const ref = useRef()
    useEffect(() => {
      const { camera, create, animate } = init(ref.current)
      camera.position.set(-2, 2, 2)
      create.ambientLight()
      create.directionalLight()
      const cube = create.cube({
        size: 2
      })
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