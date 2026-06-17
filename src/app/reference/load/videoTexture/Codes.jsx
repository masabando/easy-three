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
    camera.position.set(-1, 1, 1);
    controls.connect();


    create.plane({
      size: [1.28 * 2, 0.72 * 2],
      option: {
        map: load.videoTexture("https://www.ktc.ac.jp/img/top/movie/topmovie_new_480p.mp4"),
      }
    });

    animate();
    return () => {
      destroy();
    };
  }, []);
  return <div ref={ref} {...props}></div>;
}