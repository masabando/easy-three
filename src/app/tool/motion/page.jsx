"use client";
import { useEffect, useRef } from "react";
import { init } from "@dist/easy-three";

export default function Page() {
  const ref = useRef();
  useEffect(() => {
    const { renderer, camera, create, animate, scene, color, load, helper, controls, postprocessing } = init(ref.current);

    controls.connect();
    camera.position.set(0, 2, 5);
    create.ambientLight();
    create.directionalLight();

    scene.background = color(0xffffff)

    helper.grid()
    helper.axes();

    for (let i = 0; i < 10; i++) {
      create.cube({
        size: 0.5,
        position: [0, 0, 2-i],
    });
    }

    const { bokeh } = postprocessing.bokeh({
      aperture: 0.003,
    });

    animate(({ delta, time }) => {
      const f = 10 * Math.abs(Math.sin(time*0.1));
      bokeh(delta, {
        focus: f
      });
    }, false);
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
