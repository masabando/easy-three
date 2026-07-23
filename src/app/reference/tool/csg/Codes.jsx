"use client";
import { useEffect, useRef } from "react";
import { init } from "@dist/easy-three.js";


export function Ex1(props) {
  const ref = useRef();
  useEffect(() => {
    const { camera, create, animate, destroy, controls, tool } = init(ref.current);

    camera.position.set(0, 1.6, 2)
    controls.connect()

    create.ambientLight();
    create.directionalLight();
    create.sky()

    const cube = create.cube();

    const sphere = create.sphere({
      size: 0.7,
    });

    tool.csg(cube, sphere)

    animate(({ delta }) => {
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
    const { camera, create, animate, destroy, controls, tool } = init(ref.current);

    camera.position.set(0, 1.6, 2)
    controls.connect()

    create.ambientLight();
    create.directionalLight();
    create.sky()

    const cube = create.cube({
      autoAdd: false,
    });

    const sphere = create.sphere({
      size: 0.7,
      option: {
        color: 0xffcccc,
        transmission: 0.9,
        roughness: 0,
        thickness: 0.5,
      }
    });

    tool.csg(cube, sphere, {
      dispose: false,
      remove: false,
    })

    animate(({ delta }) => {
    });
    return () => {
      destroy();
    };
  }, []);
  return <div ref={ref} {...props}></div>;
}
