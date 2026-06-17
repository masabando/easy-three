"use client";
import { useEffect, useRef } from "react";
import { init } from "@dist/easy-three.js";

export function Ex1(props) {
  const ref = useRef();
  useEffect(() => {
    const { camera, create, animate, postprocessing, destroy } = init(ref.current);
    camera.position.set(0, 0, 2);

    create.ambientLight();
    create.directionalLight();

    const torusKnot = create.torusKnot({ size: 0.5, tube: 0.16 });

    const { glitch } = postprocessing.glitch();

    animate(({ delta }) => {
      torusKnot.rotation.x += delta;
      torusKnot.rotation.y += delta;
      glitch()
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
    const { camera, create, animate, postprocessing, destroy } = init(
      ref.current
    );
    camera.position.set(0, 0, 2);

    create.ambientLight();
    create.directionalLight();

    const torusKnot = create.torusKnot({ size: 0.5, tube: 0.16 });

    const { glitch } = postprocessing.glitch({ wild: true });

    animate(({ delta }) => {
      torusKnot.rotation.x += delta;
      torusKnot.rotation.y += delta;
      glitch();
    }, false);
    return () => {
      destroy();
    };
  }, []);
  return <div ref={ref} {...props}></div>;
}