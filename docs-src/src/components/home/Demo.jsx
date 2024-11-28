import { init } from "https://cdn.jsdelivr.net/gh/masabando/easy-three@0.0.2/dist/easy-three.js";
import { useEffect } from "react";


export const Demo = {
  Simple: () => {
    useEffect(() => {
      const { camera, create, animate } = init()
      camera.position.set(-2, 2, 2)
      create.ambientLight()
      create.directionalLight()
      create.cube()
      animate()
    }, [])
    return (
      <div></div>
    )
  }
}