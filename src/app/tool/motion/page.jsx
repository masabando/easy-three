"use client";
import { useEffect, useRef } from "react";
import { init } from "@dist/easy-three";

export default function Page() {
  const ref = useRef();
  useEffect(() => {
    const {
      camera,
      create,
      animate,
      load,
      controls,
      helper,
      scene,
      color,
      THREE,
    } = init(ref.current);

    controls.connect();
    camera.position.set(0, 1, -3);
    create.ambientLight();
    create.directionalLight();

    scene.background = color(0xffffff);

    helper.grid();
    helper.axes();

    let model;
    let bvh = {};
    load.vrm("../../model/ktc-uniform_female_v5.vrm").then((vrm) => {
      model = vrm;
      load.bvh("../../motion/sampleMotion.bvh", vrm, bvh)
    });

    animate(({ delta, time }) => {
      if (model && bvh.mixer) {
        bvh.mixer.update(delta * 1000);
        model.update(delta * 1000);
      }
    });
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
