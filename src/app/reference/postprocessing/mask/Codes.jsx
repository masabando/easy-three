"use client";
import { useEffect, useRef } from "react";
import { init } from "@dist/easy-three.js";

export function Ex1(props) {
  const ref = useRef();
  useEffect(() => {
    const { camera, create, animate, load, postprocessing, destroy } = init(ref.current);
    camera.position.set(0, 0, 2);

    const torusKnot = create.torusKnot({ size: 0.5, tube: 0.16 });

    const texture = load.texture(
      "/easy-three/texture/img/red_brick_diff_1k.jpg"
    );
    const { mask } = postprocessing.mask(texture);
    animate(({ delta, time }) => {
      torusKnot.rotation.x += delta;
      torusKnot.rotation.y += delta;
      mask(time)
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
    const { camera, create, animate, load, postprocessing, destroy } = init(
      ref.current
    );
    camera.position.set(0, 0, 2);
    const torusKnot = create.torusKnot({ size: 0.5, tube: 0.16 });

    const texture = load.background(
      "/easy-three/texture/hdr/kloofendal_48d_partly_cloudy_puresky_1k.hdr",
      {
        background: false,
        environment: false,
      }
    );
    const { mask } = postprocessing.mask(texture);
    animate(({ delta, time }) => {
      torusKnot.rotation.x += delta;
      torusKnot.rotation.y += delta;
      mask(time);
    }, false);
    return () => {
      destroy();
    };
  }, []);
  return <div ref={ref} {...props}></div>;
}