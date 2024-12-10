"use client";
import { useEffect, useRef } from "react";
import { init } from "@dist/easy-three";

export default function Page() {
  const ref = useRef();
  useEffect(() => {
    const { create, animate, camera, load, helper, controls, postprocessing, destroy } = init(
      ref.current
    );

    controls.connect();
    const sphere = create.sphere({
      size: 0.5,
      position: [-2, 1, 0],
      color: 0x00ff00,
    });

    create.sphere({
      size: 0.5,
      position: [2, 1, 0],
      color: 0xff0000,
    });

    const cube = create.cube({
      size: 1,
      position: [0, 1, -2],
      color: 0x0000ff,
    });

    create.cube({
      size: 1,
      position: [0, 1, 2],
      color: 0xffff00,
    });

    const g = helper.grid();
    const a = helper.axes();

    camera.position.set(-2.4, 1.2, -3);
    controls.target.set(0, 1, 0);
    create.ambientLight();
    //create.directionalLight({ intensity: 2, position: [10, 10, -10] });
    let model;
    load.vrm("/easy-three/model/sample.vrm").then((m) => {
      model = m;
    });

    // const { selectedBloom, addSelectedBloom } = create.selectedBloom();
    // addSelectedBloom(sphere, cube, g);
    //const { bloom } = postprocessing.bloom();
    // const { pixel } = postprocessing.pixel();
    // const texture = load.background(
    //   "/easy-three/texture/hdr/kloofendal_48d_partly_cloudy_puresky_1k.hdr",
    //   {
    //     background: false,
    //     environment: false,
    //   }
    // );
    // const { mask } = postprocessing.mask(texture);
    const { glitch } = postprocessing.glitch();

    animate(({ delta, time }) => {
      if (model) {
        model.update(delta);
      }
      cube.rotation.y += delta;
      // selectedBloom({
      //   strength: 2 * Math.abs(Math.sin(time)),
      // });
      // bloom({
      //   strength: 2 * Math.abs(Math.sin(time)),
      // });
      // pixel({ size: ~~(6 + 5 * Math.sin(time)) });
      //mask(time);
      glitch();
    }, false);
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
