"use client";
import { useEffect, useRef, useState } from "react";
import { init } from "@dist-src/easy-three";
import H1 from "@/components/H1";
import { HTMLMesh } from 'three/addons/interactive/HTMLMesh.js';

export default function Page() {
  const meshRef = useRef();
  const soundRef = useRef();
  const [count, setCount] = useState(0);
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
      // fpv,
      color,
      THREE,
      destroy,
      tool,
    } = init(ref.current, { pixelRatio: 1 });

    camera.position.set(0, 1.5, 3);
    // fpv.connect()
    controls.connect();

    create.ambientLight()


    let model;
    load.vrm("../../model/ktc-uniform_female_v5.vrm", {
      bvh: "../../motion/sampleMotion.bvh",
      position: [0, -1.15, 0],
      castShadow: false,
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

    const m1 = create.material({
      map: load.texture("/easy-three/texture/img/monastery_stone_floor_diff_1k.jpg")
    });
    const m2 = create.material({
      map: load.texture("/easy-three/texture/img/red_brick_diff_1k.jpg")
    });


    create.cube({
      material: [m1, m1, m1, m2, m2, m2]
    })


    create.plane({ position: [1, 1, 1], doubleSide: true });

    //=========================
    const div = document.createElement("div");
    div.style.width = "300px";
    div.style.height = "150px";
    div.style.background = "white";
    div.style.color = "black";
    div.style.padding = "16px";
    div.textContent = "Hello HTMLMesh";
    div.style.position = "absolute";
    div.style.left = "-10000px";
    div.style.top = "0";
    document.body.appendChild(div);
    //=========================
    const mesh = create.html(div, {
      position: [-0.2, 1.5, 2],
      scale: [2, 2, 2]
    })

    const mesh2 = create.html(meshRef.current, {
      position: [0.2, 1.5, 2],
    })

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
        <button className="btn btn-primary" onClick={() => {
          setCount(count + 1)
        }}>counter</button>
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
