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

    let model;
    let mixer;
    load.vrm("/easy-three/model/sample.vrm", {
      position: [0, -0.55, 0],
    }).then((vrm) => {
      model = vrm;
      load.bvh2("/easy-three/motion/sampleMotion.bvh", vrm).then((_bvhObj) => {
        mixer = _bvhObj.mixer;
      });
    });

    animate(({ delta }) => {
      if (model && mixer) {
        mixer.update(delta);
        model.update(delta);
      }
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
    load.vrm("/easy-three/model/sample.vrm", {
      position: [0, -0.55, 0],
    }).then((vrm) => {
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