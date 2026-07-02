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
    camera.position.set(0, 2, 4);

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

    const text = create.text("Hello", {
      size: [4, 1],
      position: [0, 2, 0],
      guide: 1,
    })


    let frameCount = 0;
    animate(({ delta, time }) => {
      const r = 20 + Math.sin(time * 1.5 * 0) * 18;
      if (model) {
        model.updateWithAnimation(delta);
      }
      text.setText(frameCount + " Hello")
      text.setColor(`hsl(${frameCount} 100% 50%)`)
      frameCount++;
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
