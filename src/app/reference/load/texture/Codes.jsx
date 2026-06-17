"use client";
import { useEffect, useRef } from "react";
import { init } from "@dist/easy-three.js";

export function Ex1(props) {
  const ref = useRef();
  useEffect(() => {
    const { camera, create, controls, load, animate, destroy } = init(
      ref.current
    );
    create.ambientLight({ intensity: 1 });
    create.directionalLight({ intensity: 2 });
    camera.position.set(0, 0, 2);
    controls.connect();


    const cube = create.cube({
      rounded: true,
      segments: 16,
      option: {
        map: load.texture("/easy-three/texture/img/red_brick_diff_1k.jpg"),
        normalMap: load.texture("/easy-three/texture/img/red_brick_nor_gl_1k.jpg"),
      },
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
