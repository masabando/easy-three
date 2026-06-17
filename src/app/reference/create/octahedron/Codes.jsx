"use client"
import { useEffect, useRef } from "react";
import { init } from "@dist/easy-three.js";

export function Ex1(props) {
  const ref = useRef();
  useEffect(() => {
    const { camera, create, animate, destroy } = init(ref.current);
    camera.position.set(0, 2, 2);
    create.ambientLight();
    create.directionalLight();

    const octahedron = create.octahedron();

    animate(({ delta }) => {
      octahedron.rotation.x += delta;
      octahedron.rotation.y += delta;
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
    camera.position.set(0, 2, 2);
    create.ambientLight();
    create.directionalLight();

    const octahedron = create.octahedron({
      detail: 1,
    });

    animate(({ delta }) => {
      octahedron.rotation.x += delta;
      octahedron.rotation.y += delta;
    })
    return () => {
      destroy();
    };
  }, []);
  return <div ref={ref} {...props}></div>;
}