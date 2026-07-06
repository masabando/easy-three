"use client"
import { useEffect, useRef } from "react";
import { init } from "@dist/easy-three.js";

export function Ex1(props) {
  const ref = useRef();
  useEffect(() => {
    const { camera, create, controls, animate, destroy } = init(ref.current);
    camera.position.set(1, 1, 2);
    controls.connect();
    create.ambientLight();
    create.directionalLight();
    const material = create.material({
      color: 0x00ff00,
    })
    create.cube({
      material: material,
    });
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
    const { camera, create, animate, controls, destroy } = init(ref.current);
    camera.position.set(1, 1, 2);
    controls.connect();
    create.ambientLight();
    create.directionalLight();

    const redMaterial = create.material({ color: 0xff0000 });
    const greenMaterial = create.material({ color: 0x00ff00 });
    const blueMaterial = create.material({ color: 0x0000ff });

    const cube = create.cube({
      material: [
        redMaterial,
        greenMaterial,
        blueMaterial,
        redMaterial,
        greenMaterial,
        blueMaterial,
      ],
    });
    animate(({ delta }) => {
    });
    return () => {
      destroy();
    };
  }, []);
  return <div ref={ref} {...props}></div>;
}
