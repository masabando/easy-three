import { init } from "https://cdn.jsdelivr.net/gh/masabando/easy-three@0.0.3/dist/easy-three.js";
import { useEffect, useRef } from "react";


export const Demo = {
  Simple: () => {
    const ref = useRef()
    useEffect(() => {
      const { camera, create, animate } = init(ref.current)
      camera.position.set(-2, 2, 2)
      create.ambientLight()
      create.directionalLight()
      create.cube()
      animate()
    }, [])
    return (
      <div ref={ref} style={{
        width: "300px",
        height: "300px"
      }}></div>
    )
  }
}