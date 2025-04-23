"use client";
import { useEffect, useRef } from "react";
import { init } from "@dist-src/easy-three";

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
      destroy,
    } = init(ref.current);

    controls.connect();
    camera.position.set(0, 1, -3);

    create.hemisphereLight({
      intensity: 3
    });

    scene.background = color(0xffffff);

    helper.grid();
    helper.axes();

    create.plane({
      position: [0, 0, 0],
      rotation: [-Math.PI / 2, 0, 0],
      size: [10, 10],
      option: {
        color: color("#aaaaaa"),
      }
    });

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
