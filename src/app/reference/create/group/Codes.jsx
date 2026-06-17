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

    const cube1 = create.cube({
      position: [-1, 0, 0],
      autoAdd: false,
    });
    const cube2 = create.cube({
      position: [1, 0, 0],
      autoAdd: false,
    });

    const group = create.group({
      children: [cube1, cube2],
    })

    animate(({ delta }) => {
      group.rotation.y += delta;
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
    const { camera, create, animate, destroy } = init(ref.current);
    camera.position.set(0, 2, 2);
    create.ambientLight();
    create.directionalLight();

    const group = create.group({
      children: [
        create.cube({
          position: [-1, 0, 0],
          autoAdd: false,
        }),
        create.cube({
          position: [1, 0, 0],
          autoAdd: false,
        }),
      ],
    });

    animate(({ delta }) => {
      group.rotation.y += delta;
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
    camera.position.set(0, 2, 2);
    create.ambientLight();
    create.directionalLight();

    const group = create.group();

    const cube1 = create.cube({
      position: [-1, 0, 0],
      autoAdd: false,
    });
    const cube2 = create.cube({
      position: [1, 0, 0],
      autoAdd: false,
    });

    group.add(cube1, cube2);

    animate(({ delta }) => {
      group.rotation.y += delta;
    });
    return () => {
      destroy();
    };
  }, []);
  return <div ref={ref} {...props}></div>;
}