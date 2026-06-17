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
    } = init(ref.current);

    controls.connect();
    camera.position.set(0, 3, 3);

    create.ambientLight()

    create.hemisphereLight({
      intensity: 3
    });

    // scene.background = color(0xffffff);

    // helper.grid();
    // helper.axes();

    // create.plane({
    //   position: [0, 0, 0],
    //   rotation: [-Math.PI / 2, 0, 0],
    //   size: [10, 10],
    //   option: {
    //     color: color("#aaaaaa"),
    //   },
    // });

    let model;
    let mixer;
    // load.vrm("../../model/ktc-uniform_male_v1.vrm").then((vrm) => {
    //   model = vrm;
    //   model.scene.position.set(0, -0.5, -3);
    //   model.scene.rotation.set(0, Math.PI, 0);
    //   load.bvh2("../../motion/sampleMotion.bvh", vrm).then((_bvhObj) => {
    //     mixer = _bvhObj.mixer;
    //   });
    // });
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

    create.rectAreaLight({
      helper: true,
      size: [1, 2],
      position: [0, 1, 3],
    });

    create.rectAreaLight({
      helper: true,
      intensity: 10,
      color: 0xff0000,
      size: [1, 2],
      position: [2, 1, 0.5],
      rotation: [0, Math.PI / 4, 0],
    });

    const sky = create.sky();

    // const ocean = create.ocean(
    //   "/easy-three/texture/water/NormalMap-1.png",
    //   {
    //   size: 30,
    //   position: [0, 0, 0],
    //   rotation: [-Math.PI / 2, 0, 0],
    //   textureSize: 512,
    // });

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

    // create.water({
    //   size: 20,
    //   color: 0xffffff,
    //   rotation: [-Math.PI / 2, 0, 0]
    // })

    soundRef.current = create.positionalAudio(
      "/easy-three/sound/chill_gravity.mp3",
      camera,
      {
        refDistance: 30,
        maxDistance: 200,
        innerAngle: 90,
        outerAngle: 180,
        outerGain: 0,
        helper: true,
      }
    )
    const soundBox = create.box({ size: 0.2 });
    soundBox.lookAt(0, 0, 1);
    soundBox.add(soundRef.current);

    animate(({ delta, time }) => {
      // if (model && mixer) {
      //   mixer.update(delta);
      //   model.update(delta);
      // }
      // ocean.update(delta);
      const r = 20 + Math.sin(time * 1.5 * 0) * 18;
      soundBox.position.x = Math.sin(time*0) * r;
      soundBox.position.z = -Math.cos(time*0 + Math.PI/2) * r;
      if (model) {
        model.updateWithAnimation(delta);
      }
    });
    return () => {
      soundRef.current.destroy();
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
