"use client"
import { useEffect, useRef } from "react";
import { init } from "@dist/easy-three.js";

export function Ex1(props) {
  const ref = useRef();
  useEffect(() => {
    const { camera, create, animate, destroy } = init(ref.current);
    camera.position.set(0, 0, 2);
    create.ambientLight();
    create.directionalLight();
    create.sphere();
    animate();
    return () => {
      destroy()
    }
  }, []);
  return <div ref={ref} {...props}></div>;
}

export function Ex2(props) {
  const ref = useRef();
  useEffect(() => {
    const { camera, create, animate, destroy } = init(ref.current);
    camera.position.set(0, 0, 2);
    create.ambientLight();
    create.directionalLight();
    const sphere = create.sphere({
      size: 0.3
    });
    animate(({ time }) => {
      sphere.position.x = Math.sin(time);
    });
    return () => {
      destroy()
    }
  }, []);
  return <div ref={ref} {...props}></div>;
}

export function Ex3(props) {
  const ref = useRef();
  useEffect(() => {
    const { camera, create, animate, destroy } = init(ref.current);
    camera.position.set(0, 0, 4);
    create.ambientLight();
    create.directionalLight();
    create.sphere({
      size: 0.5,
      position: [-1, 0, 0],
      material: "Normal",
    });
    create.sphere({
      size: 0.7,
      position: [1, 0, 0],
      option: {
        // material settings
        color: 0x00ff00,
        metalness: 0.6,
        roughness: 0,
        transparent: true,
        opacity: 0.5,
      },
    });
    const sphere3 = create.sphere({
      size: 1.5,
      position: [0, 0, -3],
    });
    animate(({ time }) => {
      sphere3.position.y = Math.sin(time) * 2;
    });
    return () => {
      destroy()
    }
  }, []);
  return <div ref={ref} {...props}></div>;
}