"use client";
import { useEffect, useRef } from "react";
import { init } from "@dist/easy-three.js";


export function Ex1(props) {
  const ref = useRef();
  useEffect(() => {
    const { camera, create, animate, controls, transformControls, destroy } = init(ref.current);
    camera.position.set(0, 0, 3);

    controls.connect();
    create.ambientLight();
    create.directionalLight();

    const cube1 = create.cube({
      position: [1, 0, 0],
    });

    const cube2 = create.cube({
      position: [-1, 0, 0],
    });

    transformControls.attach(cube1)

    transformControls.attach(cube2, {
      mode: "rotate"
    })

    animate();
    return () => {
      destroy();
    };
  }, []);
  return <div ref={ref} {...props}></div>;
}
