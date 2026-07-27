"use client";
import { useEffect, useRef, useState } from "react";
import { init } from "@dist-src/easy-three";
import H1 from "@/components/H1";

export default function Page() {
  const meshRef = useRef();
  const soundRef = useRef();
  const analyserRef = useRef();
  const [count, setCount] = useState(0);
  const ref = useRef();
  useEffect(() => {
    const {
      camera,
      create,
      animate,
      load,
      controls,
      renderer,
      helper,
      scene,
      raycaster,
      // fpv,
      color,
      THREE,
      destroy,
      tool,
      // xr,
      transformControls,
    } = init(ref.current, { pixelRatio: 1 });

    create.ambientLight()
    camera.position.set(0, 1.6, 3)
    controls.connect()

    let model;
    load.vrm("../../model/ktc-uniform_female_v5.vrm", {
      bvh: "../../motion/sampleMotion.bvh",
      position: [2, -1.15, -2],
      rotation: [0, Math.PI, 0],
      castShadow: true,
    }).then(vrm => {
      model = vrm;
    })

    const directionalLight = create.directionalLight({
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

    // audio

    const fftSize = 128;
    const { audio: sound, analyser } = create.audio("/easy-three/sound/neon_eternity.mp3", {
      fftSize,
      onLoad: ({ audio: sound, analyser }) => {
        soundRef.current = sound;
        analyserRef.current = analyser;
      }
    })

    const soundCubes = Array.from({ length: fftSize/2 }).map((_, i) => {
      return create.cube({
        size: [0.02, 0.05, 0.02],
        position: [i * 0.025 - fftSize/2 * 0.025 / 2, 0, 0],
      })
    })


    animate(({ delta, time, frameCount }) => {
      if (model) {
        model.updateWithAnimation(delta);
      }
      if (sound.isPlaying) {
        const frequencyData = analyser.getFrequencyData();
        soundCubes.forEach((cube, i) => {
          cube.scale.y = frequencyData[i] / 10;
          cube.position.y = 0.05 * cube.scale.y / 2;
          cube.material.color = color(`hsl(240, ${100*frequencyData[i]/255}%, 50%)`)
        });
      }
    });

    return () => {
      sound.destroy();
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
        <button className="btn btn-primary" onClick={() => {
          console.log(analyserRef.current.getFrequencyData());
        }}>counter</button>
      </div>
      <div>
        <div
          ref={ref}
          style={{
            width: "100%",
            maxWidth: "800px",
            aspectRatio: "1 / 1",
            position: "relative",
          }}
        ></div>
      </div>
      <div>
        <div ref={meshRef}
          style={{
            background: "white",
            fontSize: "20px",
            width: "300px",
            height: "300px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            position: "absolute",
            left: "-10000px",
            top: "0",
            visibility: "hidden",
          }}
        >
          <button className="btn btn-primary">Hello HTMLMesh</button>
          <div>{count}</div>
        </div>
      </div>
    </div>
  );
}
