"use client";
import { useEffect, useRef } from "react";
import { init } from "@dist-src/easy-three";
import H1 from "@/components/H1";

export default function Page() {
  const soundRef = useRef();
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
      tool,
    } = init(ref.current, { pixelRatio: 1 });

    controls.connect();
    camera.position.set(0, 4, 8);

    create.ambientLight()

    create.hemisphereLight({
      intensity: 3
    });

    let model;
    load.vrm("../../model/ktc-uniform_female_v5.vrm", {
      bvh: "../../motion/sampleMotion.bvh",
      position: [0, -1.15, 0],
      castShadow: false,
    }).then(vrm => {
      model = vrm;
    })

    create.directionalLight({
      intensity: 4,
    })

    const sky = create.sky();

    create.plane({
      size: 30,
      position: [0, -0.5, 0],
      rotation: [-Math.PI / 2, 0, 0],
      option: {
        map: load.texture("/easy-three/texture/img/monastery_stone_floor_diff_1k.jpg", {
          repeat: [10, 10]
        })
      }
    })

    const cube = create.cube({
      option: {
        color: "#ffffff",
      }
    });

    const instances = create.instances(cube, 8, {
      position: [0, 1, 0],
      rotation: [0, 0, 0],
      offset: [1, 1, 1],
      layout: "line",
      // centering: false,
    })

    instances.at(2).color.set("#ff0000");
    instances.at(3).scale.set(3, 1, 0);

    let frameCount = 0;
    animate(({ delta, time }) => {
      const r = 20 + Math.sin(time * 1.5 * 0) * 18;
      if (model) {
        model.updateWithAnimation(delta);
      }
    });

    return () => {
      destroy();
    };
  }, []);

  return (
    <div>
      <H1>motion</H1>
      <div className="mb-3">
        <button
          className="btn btn-primary"
          onClick={() => {
            if (soundRef.current.isPlaying) {
              soundRef.current.stop();
            } else {
              soundRef.current.play();
            }
          }}
        >positional Audio</button>
      </div>
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
