"use client";
import { useEffect, useRef } from "react";
import { init } from "@dist/easy-three";
import { noto } from "@/app/layout";

export default function Page() {
  const ref = useRef();
  useEffect(() => {
    const { camera, create, animate, load, helper, controls } = init(ref.current);

    controls.connect();
    camera.position.set(0, 2, 5);
    create.ambientLight();
    create.directionalLight();

    create.plane({
      position: [0, 2, 0],
      size: [16 / 4, 9 / 4],
      material: "Basic",
      option: {
        map: load.videoTexture("https://www.ktc.ac.jp/img/top/topmovie_720p.mp4"),
      },
    });

    helper.grid();
    helper.axes();

    animate(({ delta, time }) => {
      //g.rotation.x += delta;
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
