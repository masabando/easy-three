"use client";
import { useEffect, useRef } from "react";
import { init } from "@dist/easy-three.js";
import { noto } from "@/app/noto";

export function Ex1(props) {
  const ref = useRef();
  useEffect(() => {
    const { camera, create, animate, destroy } = init(ref.current);
    camera.position.set(0, 0, 3);

    create.ambientLight();
    create.directionalLight();

    const texture = create.textTexture("easy-three", {
      size: [300, 300],
      font: noto.style.fontFamily,
      background: "#66ff66",
    });

    const cube = create.cube({
      size: 1,
      position: [-1, 0, 0],
      option: {
        map: texture,
      },
    });
    const sphere = create.sphere({
      size: 0.7,
      position: [1, 0, 0],
      option: {
        map: texture,
      },
    });
    animate(({ delta }) => {
      cube.rotation.x += delta;
      cube.rotation.y += delta;
      sphere.rotation.x += delta;
      sphere.rotation.y += delta * 0.7;
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
    const { camera, create, animate, THREE, destroy } = init(ref.current);
    camera.position.set(0, 0, 2);

    create.ambientLight();
    create.directionalLight();

    const texture = create.textTexture("easy-three", {
      size: [300, 300],
      font: noto.style.fontFamily,
      guide: 8,
    });

    const cube = create.cube({
      size: 1,
      option: {
        transparent: true,
        map: texture,
        side: THREE.DoubleSide,
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

export function Ex3(props) {
  const ref = useRef();
  useEffect(() => {
    const { camera, create, animate, THREE, destroy } = init(ref.current);
    camera.position.set(0, 0, 2);

    create.ambientLight();
    create.directionalLight();

    const texture = create.textTexture("easy-three", {
      size: [300, 300],
      font: noto.style.fontFamily,
      guide: 8,
    });

    const cube = create.cube({
      size: 1,
      option: {
        transparent: true,
        map: texture,
        side: THREE.DoubleSide,
      },
    });
    animate(({ delta, frameCount }) => {
      cube.rotation.x += delta;
      cube.rotation.y += delta;
      if (frameCount % 60 === 0) {
        texture.set({ text: frameCount % 1000, fontSize: 100 });
      }
    });
    return () => {
      destroy();
    };
  }, []);
  return <div ref={ref} {...props}></div>;
}