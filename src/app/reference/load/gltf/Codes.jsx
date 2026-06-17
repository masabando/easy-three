"use client";
import { useEffect, useRef } from "react";
import { init } from "@dist/easy-three.js";

export function Ex1(props) {
  const ref = useRef();
  useEffect(() => {
    const { camera, create, helper, controls, load, animate, destroy } = init(
      ref.current
    );
    create.ambientLight();
    create.directionalLight();
    camera.position.set(2, 2, 0);
    controls.target.set(0, 1, 0);

    controls.connect();
    helper.axes();
    helper.grid();

    load.gltf("/easy-three/model/didelta_spinosa/didelta_spinosa_1k.gltf");

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
    const { camera, create, helper, controls, load, animate, destroy } = init(
      ref.current
    );
    create.ambientLight();
    create.directionalLight();
    camera.position.set(2, 2, 0);
    controls.target.set(0, 1, 0);

    controls.connect();
    helper.axes();
    helper.grid();

    let model;
    load
      .gltf("/easy-three/model/didelta_spinosa/didelta_spinosa_1k.gltf")
      .then((gltf) => {
        model = gltf;
      });

    animate(({ delta }) => {
      if (model) {
        model.scene.rotation.y += delta;
      }
    });
    return () => {
      destroy();
    };
  }, []);
  return <div ref={ref} {...props}></div>;
}