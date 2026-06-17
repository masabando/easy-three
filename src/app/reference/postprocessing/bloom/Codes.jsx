"use client";
import { useEffect, useRef } from "react";
import { init } from "@dist/easy-three.js";

export function Ex1(props) {
  const ref = useRef();
  useEffect(() => {
    const { camera, create, animate, postprocessing, destroy } = init(ref.current);
    camera.position.set(0, 0, 2);
    create.ambientLight();
    create.directionalLight();
    const cube = create.cube();
    const { bloom } = postprocessing.bloom();
    animate(({ delta }) => {
      cube.rotation.x += delta;
      cube.rotation.y += delta;
      bloom()
    }, false);
    return () => {
      destroy();
    };
  }, []);
  return <div ref={ref} {...props}></div>;
}

export
  function Ex2(props) {
  const ref = useRef();
  useEffect(() => {
    const { camera, create, animate, postprocessing, destroy } = init(
      ref.current
    );
    camera.position.set(0, 0, 2);
    create.ambientLight();
    create.directionalLight();
    const cube = create.cube();
    const { bloom } = postprocessing.bloom();
    animate(({ delta, time }) => {
      cube.rotation.x += delta;
      cube.rotation.y += delta;
      bloom({
        strength: 2 * Math.abs(Math.sin(time))
      });
    }, false);
    return () => {
      destroy();
    };
  }, []);
  return <div ref={ref} {...props}></div>;
}