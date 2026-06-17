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
    camera.position.set(0, 1.5, -1.5);
    controls.target.set(0, 1, 0);

    controls.connect();
    helper.axes();
    helper.grid();

    load.vrm("/easy-three/model/sample.vrm");

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
    camera.position.set(0, 1.5, -1.5);
    controls.target.set(0, 1, 0);

    controls.connect();
    helper.axes();
    helper.grid();

    let model;
    load.vrm("/easy-three/model/sample.vrm").then((vrm) => {
      model = vrm;
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

export function Ex3(props) {
  const ref = useRef();
  useEffect(() => {
    const { camera, create, helper, controls, load, animate, destroy } = init(
      ref.current
    );
    create.ambientLight();
    create.directionalLight();
    camera.position.set(0, 1.5, -1.5);
    controls.target.set(0, 1, 0);

    controls.connect();
    helper.axes();
    helper.grid();

    let model;
    load
      .vrm("/easy-three/model/sample.vrm", {
        position: [0, -0.55, 0],
        bvh: "/easy-three/motion/sampleMotion.bvh",
      })
      .then((vrm) => {
        model = vrm;
      });

    animate(({ delta }) => {
      if (model) {
        model.updateWithAnimation(delta);
      }
    });
    return () => {
      destroy();
    };
  }, []);
  return <div ref={ref} {...props}></div>;
}