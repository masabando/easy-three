"use client";
import { useEffect, useRef } from "react";
import { init } from "@dist/easy-three.js";


export function Ex1(props) {
  const ref = useRef();
  useEffect(() => {
    const { camera, create, animate, controls, destroy } = init(ref.current);

    controls.connect()
    camera.position.set(0, 0, 2);
    create.ambientLight();
    create.directionalLight();
    create.cube();
    animate();
    return () => {
      destroy();
    };
  }, []);
  return <div ref={ref} {...props}></div>;
}
