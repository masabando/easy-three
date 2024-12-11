"use client";
import { useEffect, useRef } from "react";
import { init } from "@dist/easy-three";

export default function Page() {
  const ref = useRef();
  useEffect(() => {
    const { create, animate, camera, load, helper, controls, event, destroy } = init(
      ref.current
    );

    controls.connect();

    camera.position.set(-2.4, 1.2, 7);
    controls.target.set(0, 1, 0);

    const videoTexture = load.videoTexture(
      "https://www.ktc.ac.jp/img/top/topmovie_720p.mp4"
    );
    create.plane({
      size: [8, 4.5],
      position: [0, 2.5, 0],
      material: "Basic",
      option: {
        map: videoTexture,
      }
    })

    event.mouse.add(() => {
      if (videoTexture.source.data.paused) {
        videoTexture.source.data.play();
      } else {
        videoTexture.source.data.pause();
      }
    })

    helper.grid();
    helper.axes();

    create.ambientLight();
    create.directionalLight();

    animate(({ delta, time }) => {
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
