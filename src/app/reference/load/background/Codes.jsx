"use client";
import { useEffect, useRef } from "react";
import { init } from "@dist/easy-three.js";

export function Ex1(props) {
  const ref = useRef();
  useEffect(() => {
    const { camera, create, controls, load, animate, destroy } = init(
      ref.current
    );
    create.ambientLight();
    create.directionalLight();
    camera.position.set(0, 0, 2);
    controls.connect();

    load.background(
      "/easy-three/texture/hdr/kloofendal_48d_partly_cloudy_puresky_1k.hdr"
    );

    const cube = create.cube({
      rounded: true,
      segments: 16,
      option: {
        color: 0xffffff,
        metalness: 0.9,
        roughness: 0.1,
      }
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
