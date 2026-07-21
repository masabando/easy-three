"use client";
import { useEffect, useRef, useState } from "react";
import { init } from "@dist-src/easy-three";
import H1 from "@/components/H1";

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
      renderer,
      helper,
      scene,
      raycaster,
      // fpv,
      color,
      THREE,
      destroy,
      tool,
      xr,
    } = init(ref.current, { pixelRatio: 1 });

    camera.position.set(0, 1.5, 3);
    // fpv.connect()
    // controls.connect();

    create.ambientLight()


    let model;
    load.vrm("../../model/ktc-uniform_female_v5.vrm", {
      bvh: "../../motion/sampleMotion.bvh",
      position: [2, -1.15, -2],
      rotation: [0, Math.PI, 0],
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


    const texture = create.canvasTexture((context) => {
      context.fillStyle = "red";
      context.fillRect(100, 100, 200, 200);
    },
      {
        size: 400
      }
    )
    const context = texture.userData.context;
    context.fillStyle = "white";
    context.fillRect(0, 0, 200, 200);
    texture.update()

    texture.update((ctx) => {
      ctx.fillStyle = "blue";
      ctx.fillRect(200, 200, 200, 200);
    })


    const cube1 = create.cube({
      position: [-1, 0, 0],
    })
    const cube2 = create.cube({
      position: [1, 0, 0],
    })

    raycaster.connect()

    xr.setup();

    animate(({ delta, time, frameCount }) => {
      const r = 20 + Math.sin(time * 1.5 * 0) * 18;
      if (model) {
        model.updateWithAnimation(delta);
      }
      const intersections = raycaster.getIntersections([cube1, cube2])
      cube1.material.color.set(0x00ff00);
      cube2.material.color.set(0x00ff00);
      if (intersections.length > 0) {
        const hit = intersections[0];
        hit.object.material.color.set(0xff0000);
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
