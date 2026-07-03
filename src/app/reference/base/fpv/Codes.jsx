"use client";
import { useEffect, useRef } from "react";
import { init } from "@dist/easy-three.js";


export function Ex1(props) {
  const ref = useRef();
  useEffect(() => {
    const { camera, create, animate, fpv, destroy } = init(ref.current);

    fpv.connect()
    create.ambientLight();
    create.directionalLight();

    create.cube({
      position: [0, 0.5, 10],
    });

    create.plane({
      size: 30,
      rotation: [-Math.PI / 2, 0, 0],
      option: {
        color: 0xffffff,
      }
    })

    animate();
    return () => {
      destroy();
    };
  }, []);
  return <div ref={ref} {...props}></div>;
}
