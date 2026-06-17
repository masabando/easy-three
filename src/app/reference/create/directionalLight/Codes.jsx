"use client"
import { useEffect, useRef } from "react";
import { init } from "@dist/easy-three.js";

export function Ex1(props) {
  const ref = useRef();
  useEffect(() => {
    const { camera, create, animate, destroy, THREE, Default } = init(ref.current);
    camera.position.set(0, 0, 2);
    create.directionalLight();

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
    const directionalLight = create.directionalLight();

    const cube = create.cube();

    animate(({ delta, time }) => {
      cube.rotation.x += delta;
      cube.rotation.y += delta;
      directionalLight.intensity = Math.sin(time) * 0.5 + 0.5;
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
    const { camera, create, controls, animate, destroy, THREE, Default } = init(
      ref.current
    );
    camera.position.set(0, 0, 3);
    controls.connect();
    create.directionalLight({
      position: [0.6, 0.6, 1.6],
      helper: 0.1,
      helperColor: 0xff0000,
    });

    const cube = create.cube();

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
