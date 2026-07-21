"use client";
import { useEffect, useRef } from "react";
import { init } from "@dist/easy-three.js";


export function Ex1(props) {
  const ref = useRef();
  useEffect(() => {
    const { camera, create, animate, xr, destroy } = init(ref.current);

    create.ambientLight();
    create.directionalLight();
    create.sky()

    const cube1 = create.cube({
      position: [1, 1, 0],
    });

    const cube2 = create.cube({
      position: [-1, 1, 0],
    });

    const ocean = create.ocean("/easy-three/texture/water/NormalMap-1.jpg");

    const { rightController } = xr.setup({
      selectableObjects: [cube1, cube2],
    });

    animate(({ delta }) => {
      ocean.update(delta);
      cube1.material.color.set(0x0000ff)
      cube2.material.color.set(0x0000ff)
      if (rightController.userData.selected) {
        rightController.userData.selected.rotation.y += delta;
        rightController.userData.selected.material.color.set(0xff0000)
      }
    });
    return () => {
      destroy();
    };
  }, []);
  return <div ref={ref} {...props}></div>;
}
