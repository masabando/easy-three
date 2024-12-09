"use client";
import { useEffect, useRef } from "react";
import { init } from "@dist/easy-three";

export default function Page() {
  const currentMixer = useRef();
  const ref = useRef();
  useEffect(() => {
    const { create, animate, camera, load, helper, controls, destroy } = init(
      ref.current
    );
    controls.connect();
    helper.grid();
    helper.axes();
    camera.position.set(-0.7, 1.6, -1);
    controls.target.set(0, 1, 0);
    create.ambientLight();
    create.directionalLight({ intensity: 2, position: [10, 10, -10] });
    let model;
    load.vrm("/easy-three/model/sample.vrm").then((m) => {
      model = m;
    })

    animate(({ delta, time }) => {
      if (model) {
        //walk(model, time);
        model.update(delta);
      }
      if (currentMixer.current) {
        currentMixer.current.update(delta);
      }
    });
    return () => {
      destroy();
    };
  }, []);

  return (
    <div>
      <h1>motion</h1>
      <div>
        <div
          ref={ref}
          style={{
            width: "100%",
            maxWidth: "800px",
            aspectRatio: "1 / 1",
          }}
        ></div>
      </div>
    </div>
  );
}
