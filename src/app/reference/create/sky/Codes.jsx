"use client"
import { useEffect, useRef } from "react";
import { init } from "@dist/easy-three.js";

export function Ex1(props) {
  const ref = useRef();
  useEffect(() => {
    const { camera, controls, create, animate, destroy } = init(ref.current);
    controls.connect();
    camera.position.set(0, 1, -4);
    create.ambientLight();
    create.directionalLight();
    create.plane({
      size: 10,
      rotation: [-Math.PI / 2, 0, 0]
    });
    create.sky();
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
    const { camera, controls, create, animate, destroy } = init(ref.current);
    controls.connect();
    camera.position.set(0, 1, -4);
    create.ambientLight();
    create.directionalLight();
    create.plane({
      size: 10,
      rotation: [-Math.PI / 2, 0, 0]
    });
    create.sky({
      theta: Math.PI * 0.495,
      phi: Math.PI * 0.1
    });
    animate();
    return () => {
      destroy();
    };
  }, []);
  return <div ref={ref} {...props}></div>;
}
