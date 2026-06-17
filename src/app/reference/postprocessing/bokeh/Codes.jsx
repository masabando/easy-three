"use client";
import { useEffect, useRef } from "react";
import { init } from "@dist/easy-three.js";

export function Ex1(props) {
  const ref = useRef();
  useEffect(() => {
    const { camera, create, scene, color, animate, postprocessing, destroy } =
      init(ref.current);
    camera.position.set(0, 2, 3);

    create.ambientLight();
    create.directionalLight();

    scene.background = color(0xffffff);

    const cubes = [];
    for (let i = 0; i < 5; i++) {
      cubes.push(
        create.cube({
          size: 0.5,
          position: [i - 2, 0, 0.5 * (i - 2)],
        })
      );
    }

    const { bokeh } = postprocessing.bokeh({
      focus: camera.position.distanceTo(cubes[2].position),
      aperture: 0.04,
      maxblur: 0.03,
    });

    animate(({ delta }) => {
      bokeh(delta);
      cubes.forEach((cube) => {
        cube.rotation.x += delta;
        cube.rotation.y += delta;
      })
    }, false);
    return () => {
      destroy();
    };
  }, []);
  return <div ref={ref} {...props}></div>;
}

export function Ex2(props) {
  const ref = useRef();
  useEffect(() => {
    const { camera, create, scene, color, animate, postprocessing, destroy } =
      init(ref.current);
    camera.position.set(0, 2, 3);

    create.ambientLight();
    create.directionalLight();

    scene.background = color(0xffffff);

    const cubes = [];
    for (let i = 0; i < 5; i++) {
      cubes.push(
        create.cube({
          size: 0.5,
          position: [i - 2, 0, 0.5 * (i - 2)],
        })
      );
    }

    const { bokeh } = postprocessing.bokeh();

    animate(({ delta, time }) => {
      bokeh(delta, {
        focus:
          camera.position.distanceTo(cubes[2].position) + 2 * Math.sin(time),
        aperture: 0.01,
        maxblur: 0.03,
      });
    }, false);
    return () => {
      destroy();
    };
  }, []);
  return <div ref={ref} {...props}></div>;
}