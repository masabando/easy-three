"use client";
import { useEffect, useRef } from "react";
import { init } from "@dist/easy-three.js";


export function Ex1(props) {
  const ref = useRef();
  useEffect(() => {
    const { camera, create, animate, raycaster, controls, destroy } = init(ref.current);
    camera.position.set(0, 0, 3);

    controls.connect();
    create.ambientLight();
    create.directionalLight();

    raycaster.connect();

    const cube1 = create.cube({
      position: [1, 0, 0],
    });

    const cube2 = create.cube({
      position: [-1, 0, 0],
    });

    animate(({ delta }) => {
      cube1.rotation.y += delta;
      cube2.rotation.y += delta;

      const intersections = raycaster.getIntersections([cube1, cube2])
      cube1.material.color.set(0xffffff);
      cube2.material.color.set(0xffffff);
      if (intersections.length > 0) {
        intersections[0].object.material.color.set(0xff0000);
      }
    });
    return () => {
      destroy();
    };
  }, []);
  return <div ref={ref} {...props}></div>;
}
