"use client"
import { useEffect, useRef } from "react";
import { init } from "@dist/easy-three.js";

export function Ex1(props) {
  const ref = useRef();
  useEffect(() => {
    const { camera, controls, create, animate, load, destroy } = init(ref.current);
    controls.connect();
    camera.position.set(0, 4, -4);
    create.ambientLight({ intensity: 1 });
    create.directionalLight({ intensity: 1 });

    create.sky();

    // const cube = create.cube({ position: [0, 2, 0] });

    create.plane({
      size: 8,
      rotation: [-Math.PI / 2, 0, 0],
      option: {
        map: load.texture("/easy-three/texture/img/red_brick_diff_1k.jpg"),
      }
    })

    const water = create.water(
      "/easy-three/texture/water/NormalMap-1.jpg",
      "/easy-three/texture/water/NormalMap-2.jpg",
      {
        size: 5,
        position: [0, 1, 0],
        scale: 0.4,
      }
    );

    animate(({ delta }) => {
      // cube.rotation.x += delta;
      // cube.rotation.y += delta;
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
    const { camera, controls, create, animate, load, THREE, destroy } = init(ref.current);
    controls.connect();
    camera.position.set(0, 4, -4);
    create.ambientLight({ intensity: 1 });
    create.directionalLight({ intensity: 1 });

    create.sky();

    create.plane({
      size: 14,
      rotation: [-Math.PI / 2, 0, 0],
      option: {
        map: load.texture("/easy-three/texture/img/red_brick_diff_1k.jpg"),
      }
    })

    create.water(
      "/easy-three/texture/water/NormalMap-1.jpg",
      "/easy-three/texture/water/NormalMap-2.jpg",
      {
        scale: 0.4,
        position: [0, 2.2, 0],
        geometry: new THREE.SphereGeometry(2, 32, 32),
      });

    animate();
    return () => {
      destroy();
    };
  }, []);
  return <div ref={ref} {...props}></div>;
}
