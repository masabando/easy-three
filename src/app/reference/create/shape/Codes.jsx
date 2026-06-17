"use client"
import { useEffect, useRef } from "react";
import { init } from "@dist/easy-three.js";

export function Ex1(props) {
  const ref = useRef();
  useEffect(() => {
    const { camera, create, animate, destroy, THREE, Default } = init(ref.current);
    camera.position.set(0, 0, 2);
    create.ambientLight();
    create.directionalLight();

    const shape = create.shape({
      shapes: [
        { position: [0, 0] },
        { position: [1, 0] },
        { position: [1, 1] },
        { position: [0, 1] }
      ],
      option: {
        color: Default.color,
        side: THREE.DoubleSide
      }
    });

    animate(({ delta }) => {
      shape.rotation.x += delta;
      shape.rotation.y += delta;
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
    create.ambientLight();
    create.directionalLight();

    const shape = create.shape({
      shapes: [
        { position: [0, 0] },
        { position: [0.2, 0.3, 0.8, 0.3, 1, 0], type: "curve" },
        { position: [0.7, 0.2, 0.7, 0.8, 1, 1], type: "curve" },
        { position: [0.8, 0.7, 0.2, 0.7, 0, 1], type: "curve" },
        { position: [0.3, 0.8, 0.3, 0.2, 0, 0], type: "curve" }
      ],
      option: {
        color: Default.color,
        side: THREE.DoubleSide,
      },
    });

    animate(({ delta }) => {
      shape.rotation.x += delta;
      shape.rotation.y += delta;
    })
    return () => {
      destroy();
    };
  }, []);
  return <div ref={ref} {...props}></div>;
}