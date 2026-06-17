"use client";
import { useEffect, useRef } from "react";
import { init } from "@dist/easy-three.js";

export function Ex1(props) {
  const ref = useRef();
  useEffect(() => {
    const { camera, create, controls, load, scene, animate, destroy } = init(
      ref.current
    );
    create.ambientLight({ intensity: 1 });
    create.directionalLight({ intensity: 2 });
    camera.position.set(0, 0, 2);
    controls.connect();

    scene.background = load.cubeTexture(
      [
        "red_brick_diff_1k.jpg",
        "red_brick_diff_1k.jpg",
        "red_brick_diff_1k.jpg",
        "red_brick_diff_1k.jpg",
        "red_brick_diff_1k.jpg",
        "red_brick_diff_1k.jpg",
      ],
      {
        path: "/easy-three/texture/img/",
      }
    );

    const cube = create.cube({
      rounded: true,
      segments: 16,
    });

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
