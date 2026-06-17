"use client";
import { useEffect, useRef } from "react";
import { init } from "@dist/easy-three.js";

export function Ex1(props) {
  const ref = useRef();
  useEffect(() => {
    const { camera, create, animate, color, destroy } = init(ref.current);

    camera.position.set(-1, 1, 1);
    create.ambientLight();
    create.directionalLight();

    create.cube({
      option: {
        color: color("hotpink"),
      }
    });

    animate();
    return () => {
      destroy();
    };
  }, []);
  return <div ref={ref} {...props}></div>;
}
