"use client";
import { useEffect, useRef } from "react";
import { init } from "@dist/easy-three";

export default function Page() {
  const ref = useRef();
  useEffect(() => {
    const { camera, create, animate, load, helper, controls } = init(ref.current);

    controls.connect();
    camera.position.set(0, 2, 5);
    create.ambientLight();
    create.directionalLight();

    helper.grid()
    helper.axes();

    create.shape({
      shapes: [
        { position: [0, 0] },
        { position: [2, 0] },
        { position: [1, 1] },
        { position: [0, 1] },
      ],
    });

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
