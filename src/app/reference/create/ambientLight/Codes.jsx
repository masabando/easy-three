"use client"
import { useEffect, useRef } from "react";
import { init } from "@dist/easy-three.js";

export function Ex1(props) {
  const ref = useRef();
  useEffect(() => {
    const { camera, create, animate, destroy, THREE, Default } = init(ref.current);
    camera.position.set(0, 0, 2);
    create.ambientLight();

    const cube = create.cube()

    animate(({ delta }) => {
      cube.rotation.x += delta;
      cube.rotation.y += delta;
    });
    return () => {
      destroy();
    };
  }, []);
  return <div ref={ref} {...props}></div>;
}

export function Ex2(props) {
  const ref = useRef();
  useEffect(() => {
    const { camera, create, animate, destroy, THREE, Default } = init(
      ref.current
    );
    camera.position.set(0, 0, 2);
    const ambientLight = create.ambientLight();

    const cube = create.cube();

    animate(({ delta, time }) => {
      cube.rotation.x += delta;
      cube.rotation.y += delta;
      ambientLight.intensity = Math.sin(time) * 0.5 + 0.5;
    });
    return () => {
      destroy();
    };
  }, []);
  return <div ref={ref} {...props}></div>;
}
