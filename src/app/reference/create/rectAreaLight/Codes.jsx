"use client"
import { useEffect, useRef } from "react";
import { init } from "@dist/easy-three.js";

export function Ex1(props) {
  const ref = useRef();
  useEffect(() => {
    const { camera, create, controls, animate, destroy, THREE, Default } = init(ref.current);

    controls.connect();
    camera.position.set(0, 2, 3);

    create.cube({
      position: [0, 0.5, 0],
      rotation: [0, Math.PI / 4, 0],
      option: {
        color: 0xffffff,
      }
    })

    create.plane({
      size: 10,
      rotation: [-Math.PI / 2, 0, 0],
      option: {
        color: 0xffffff,
      }
    })

    create.rectAreaLight({
      intensity: 3,
      color: 0xff0000,
      size: [1, 2],
      position: [1.5, 1, -1],
      rotation: [0, 3 * Math.PI / 4, 0],
      // helper: true,
    })

    create.rectAreaLight({
      intensity: 3,
      color: 0x0000ff,
      size: [1, 2],
      position: [-1.5, 1, -1],
      rotation: [0, -(3 * Math.PI) / 4, 0],
      // helper: true,
    });

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
    const { camera, create, controls, animate, destroy, THREE, Default } = init(
      ref.current
    );

    controls.connect();
    camera.position.set(0, 2, 3);

    create.cube({
      position: [0, 0.5, 0],
      rotation: [0, Math.PI / 4, 0],
      option: {
        color: 0xffffff,
      },
    });

    create.plane({
      size: 10,
      rotation: [-Math.PI / 2, 0, 0],
      option: {
        color: 0xffffff,
      },
    });

    create.rectAreaLight({
      intensity: 3,
      color: 0xff0000,
      size: [1, 2],
      position: [1.5, 1, -1],
      rotation: [0, (3 * Math.PI) / 4, 0],
      helper: true,
    });

    create.rectAreaLight({
      intensity: 3,
      color: 0x0000ff,
      size: [1, 2],
      position: [-1.5, 1, -1],
      rotation: [0, -(3 * Math.PI) / 4, 0],
      helper: true,
    });

    animate(({ delta }) => { });
    return () => {
      destroy();
    };
  }, []);
  return <div ref={ref} {...props}></div>;
}