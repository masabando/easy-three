"use client";
import { useEffect, useRef } from "react";
import { init } from "@dist/easy-three";
import { noto } from "@/app/layout"
import EasyThreeContainer from "@dist/react/EasyThreeContainer.js"

export default function Page() {
  const ref = useRef();
  useEffect(() => {
    const { create, animate, camera, helper, controls, noToneMapping, DoubleSide, destroy } = init(
      ref.current
    );

    controls.connect();

    camera.position.set(-2.4, 1.2, 7);
    
    create.ambientLight();
    create.directionalLight();


    create.text("easy-three", {
      font: `${noto.style.fontFamily}`,
      size: [3, 1],
      position: [2, 1, 0],
      resolution: 1,
    })

    const texture = create.textTexture("easy-three", {
      font: `${noto.style.fontFamily}`,
      size: [300, 300],
      guide: 16,
    });
    create.cube({
      position: [-2, 1, 0],
      option: {
        map: texture,
        transparent: true,
        side: DoubleSide,
      }
    })


    helper.grid();
    helper.axes();


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
        <EasyThreeContainer
          toggleControls
          switchStyle={{
            top: "10px",
            right: "10px"
          }}
          code={(r) => {
            const { create, camera, controls, animate, destroy } = init(r);
            camera.position.set(0, 0, 2);
            controls.connect()
            create.ambientLight();
            create.directionalLight();
            const cube = create.cube();
            animate(({ delta }) => {
              cube.rotation.x += delta;
              cube.rotation.y += delta;
            })
            return { destroy, controls };
          }}
        />
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
