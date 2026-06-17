"use client";
import { useEffect, useRef } from "react";
import { init } from "@dist/easy-three.js";

export function Ex1(props) {
  const ref = useRef();
  useEffect(() => {
    const { camera, create, event, helper, animate, destroy } = init(
      ref.current
    );
    create.ambientLight();
    create.directionalLight();
    camera.position.set(-2, 2, 2);

    const cube = create.cube();
    helper.grid();
    helper.axes();

    let scale = 1;
    event.mouse.add((pos, e) => {
      scale += 0.2;
      cube.scale.set(scale, scale, scale);
    });

    animate();
    return () => {
      destroy();
    };
  }, []);
  return <div ref={ref} {...props}></div>;
}
