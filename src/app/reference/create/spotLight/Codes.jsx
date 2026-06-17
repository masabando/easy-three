"use client"
import { useEffect, useRef } from "react";
import { init } from "@dist/easy-three.js";

export function Ex1(props) {
  const ref = useRef();
  useEffect(() => {
    const { camera, controls, create, animate, destroy, THREE, Default } = init(ref.current);
    controls.connect();
    camera.position.set(0, 1, 1.5);
    create.spotLight({
      position: [-1, 1, 1],
    });

    create.cube({
      size: 0.5,
      position: [0, 0.25, 0],
    })
    const plane = create.plane({
      position: [0, 0, 0],
      rotation: [-Math.PI / 2, 0, 0],
      size: [10, 10],
      option: {
        color: "#ffffff",
      },
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
    const { camera, controls, create, animate, destroy, THREE, Default } = init(
      ref.current
    );
    controls.connect();
    camera.position.set(0, 1, 1.5);
    const red = create.spotLight({
      position: [-1, 1, 1],
      angle: Math.PI / 6,
      color: 0xff6666,
    });
    const green = create.spotLight({
      position: [1, 1, 1],
      angle: Math.PI / 6,
      color: 0x66ff66,
    });
    const blue = create.spotLight({
      position: [0, 1, 1],
      angle: Math.PI / 6,
      color: 0x6666ff,
    });

    create.cube({
      size: 0.5,
      position: [0, 0.25, 0],
    });
    create.plane({
      position: [0, 0, 0],
      rotation: [-Math.PI / 2, 0, 0],
      size: [10, 10],
      option: {
        color: "#ffffff",
      },
    });

    animate(({ time }) => {
      red.target.position.set(Math.sin(time), 0, 0);
      green.target.position.set(Math.sin(-time), 0, 0);
      blue.target.position.set(0, 0, Math.sin(time));
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
    const { camera, controls, create, animate, destroy, THREE, Default } = init(
      ref.current
    );
    controls.connect();
    camera.position.set(0, 2, 3);
    create.spotLight({
      position: [-1, 1, 1],
      helper: 1,
      helperColor: 0xff0000,
    });

    create.cube({
      size: 0.5,
      position: [0, 0.25, 0],
    });
    create.plane({
      position: [0, 0, 0],
      rotation: [-Math.PI / 2, 0, 0],
      size: [10, 10],
      option: {
        color: "#ffffff",
      },
    });

    animate();
    return () => {
      destroy();
    };
  }, []);
  return <div ref={ref} {...props}></div>;
}