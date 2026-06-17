"use client";
import { useEffect, useRef } from "react";
import { init } from "@dist/easy-three.js";


export function Ex1(props) {
  const ref = useRef();
  useEffect(() => {
    const { camera, create, event, controls, animate, destroy } = init(
      ref.current
    );
    create.ambientLight();
    create.directionalLight();
    camera.position.set(0, 0, 1);
    controls.connect();

    const text = create.text("Press Key", { fontSize: 20 })

    event.key.add((key, e) => {
      text.material.map.dispose();
      text.material.map = create.textTexture(key, { fontSize: 140 })
      text.material.needsUpdate = true;
    });

    animate();
    return () => {
      destroy();
    };
  }, []);
  return <div
    tabIndex={0}
    ref={ref}
    {...props}
  ></div>;
}
