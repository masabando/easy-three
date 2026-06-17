"use client";
import { useEffect, useRef } from "react";
import { init } from "@dist/easy-three.js";

export function Ex1(props) {
  const ref = useRef();
  useEffect(() => {
    const { camera, create, helper, controls, animate, destroy } = init(ref.current);
    create.ambientLight();
    create.directionalLight();
    camera.position.set(2, 2, 2);

    controls.connect()
    helper.grid();

    create.cube();

    animate();
    return () => {
      destroy();
    };
  }, []);
  return <div ref={ref} {...props}></div>;
}