"use client"
import { useEffect, useRef } from "react";
import { init } from "@dist/easy-three.js";

export function Ex1(props) {
  const ref = useRef();
  useEffect(() => {
    const { camera, create, animate, destroy } = init(ref.current);
    camera.position.set(0, 0, 3);
    create.ambientLight();
    create.directionalLight();

    create.capsule();

    animate();
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
    camera.position.set(0, 2, 2);
    create.ambientLight();
    create.directionalLight();

    create.cylinder();

    animate()
    return () => {
      destroy();
    };
  }, []);
  return <div ref={ref} {...props}></div>;
}
