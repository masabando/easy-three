"use client"
import { useEffect, useRef } from "react";
import { init } from "@dist/easy-three.js";

export function Ex1(props) {
  const ref = useRef();
  useEffect(() => {
    const { camera, controls, create, animate, destroy } = init(ref.current);
    controls.connect();
    camera.position.set(0, 4, -4);
    create.ambientLight({ intensity: 1 });
    create.directionalLight({ intensity: 3 });

    create.sky();

    const cube = create.cube({ position: [0, 2, 0] });

    const ocean = create.ocean("/easy-three/texture/water/NormalMap-1.jpg");

    animate(({ delta }) => {
      ocean.update(delta)
      cube.rotation.x += delta;
      cube.rotation.y += delta;
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
    const { camera, controls, create, animate, THREE, destroy } = init(ref.current);
    controls.connect();
    camera.position.set(0, 4, -4);
    create.ambientLight({ intensity: 1 });
    create.directionalLight({ intensity: 3 });

    create.sky();

    const ocean = create.ocean("/easy-three/texture/water/NormalMap-1.jpg", {
      geometry: new THREE.SphereGeometry(3, 32, 32),
    });

    animate(({ delta }) => {
      ocean.update(delta)
    });
    return () => {
      destroy();
    };
  }, []);
  return <div ref={ref} {...props}></div>;
}