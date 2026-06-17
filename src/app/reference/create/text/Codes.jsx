"use client"
import { useEffect, useRef } from "react";
import { init } from "@dist/easy-three.js";
import { noto } from "@/app/noto";

export function Ex1(props) {
  const ref = useRef();
  useEffect(() => {
    const { camera, create, animate, destroy } = init(ref.current);
    camera.position.set(0, 0, 3);

    const text = create.text("easy-three", {
      size: [3, 1],
      font: noto.style.fontFamily
    })
    animate(({ delta }) => {
      text.rotation.x += delta;
      text.rotation.y += delta;
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
    const { camera, create, animate, destroy } = init(ref.current);
    camera.position.set(0, 0, 3);

    const text = create.text("easy-three", {
      size: [3, 1],
      font: noto.style.fontFamily,
      guide: 4,
      background: "#66ff66"
    });
    animate(({ delta }) => {
      text.rotation.x += delta;
      text.rotation.y += delta;
    });
    return () => {
      destroy();
    };
  }, []);
  return <div ref={ref} {...props}></div>;
}