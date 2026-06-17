"use client"
import { useEffect, useRef } from "react";
import { init } from "@dist/easy-three.js";

export function Ex1(props) {
  const ref = useRef();
  useEffect(() => {
    const { camera, create, animate, destroy } = init(ref.current);
    camera.position.set(0, 1, 1);
    create.ambientLight();
    create.directionalLight();
    create.plane();
    animate();
    return () => {
      destroy();
    };
  }, []);
  return <div ref={ref} {...props}></div>;
}

export function Ex2(props) {
  const ref = useRef();
  useEffect(() => {
    const { camera, create, animate, destroy, THREE, Default } = init(
      ref.current
    );
    camera.position.set(0, 0, 2);
    create.ambientLight();
    create.directionalLight();
    const plane = create.plane({
      option: {
        side: THREE.DoubleSide,
        color: Default.color,
      },
    });
    animate(({ delta }) => {
      plane.rotation.x += delta;
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
    const { camera, create, animate, destroy, THREE, Default } = init(
      ref.current
    );
    camera.position.set(0, 0, 4);
    create.ambientLight();
    create.directionalLight();
    const plane1 = create.plane({
      size: 1,
      position: [-1, 0, 0],
      material: "Normal",
      option: {
        side: THREE.DoubleSide,
      },
    });
    const plane2 = create.plane({
      size: 1.5,
      position: [1, 0, 0],
      option: {
        // material settings
        color: 0x00ff00,
        metalness: 0.6,
        roughness: 0,
        transparent: true,
        opacity: 0.5,
        side: THREE.DoubleSide,
      },
    });
    const plane3 = create.plane({
      size: 3,
      position: [0, 0, -3],
      option: {
        side: THREE.DoubleSide,
        color: Default.color,
      },
    });
    animate(({ time, delta }) => {
      plane1.rotation.x += delta;
      plane2.rotation.y += delta;
      plane3.rotation.x += delta;
      plane3.rotation.z += delta;
      plane3.position.y = Math.sin(time) * 2;
    });
    return () => {
      destroy();
    };
  }, []);
  return <div ref={ref} {...props}></div>;
}
