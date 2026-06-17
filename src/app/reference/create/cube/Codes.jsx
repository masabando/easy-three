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
    create.cube();
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
    const { camera, create, animate, destroy } = init(ref.current);
    camera.position.set(0, 0, 2);
    create.ambientLight();
    create.directionalLight();
    const cube = create.cube();
    animate(({ delta }) => {
      cube.rotation.x += delta;
    });
    return () => {
      destroy();
    };
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
    const cube1 = create.cube({
      size: 1,
      position: [-1, 0, 0],
      material: "Normal",
    });
    const cube2 = create.cube({
      size: 1.5,
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
    const cube3 = create.cube({
      size: 3,
      position: [0, 0, -3],
    });
    animate(({ time, delta }) => {
      cube1.rotation.x += delta;
      cube2.rotation.y += delta;
      cube3.rotation.x += delta;
      cube3.rotation.z += delta;
      cube3.position.y = Math.sin(time) * 2;
    });
    return () => {
      destroy();
    };
  }, []);
  return <div ref={ref} {...props}></div>;
}

export function Ex4(props) {
  const ref = useRef();
  useEffect(() => {
    const { camera, create, animate, destroy } = init(ref.current);
    camera.position.set(0, 0, 2);
    create.ambientLight();
    create.directionalLight();
    create.cube({
      rounded: true,
      radius: 0.2,
      segments: 16,
    });
    animate();
    return () => {
      destroy();
    };
  }, []);
  return <div ref={ref} {...props}></div>;
}