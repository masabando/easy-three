"use client";
import { EasyThreeBox } from "@/components/BaseKit";
import { init } from "@dist/easy-three";

export function Ex1() {
  return (
    <EasyThreeBox
      toggleControls
      effect={(r) => {
        const { camera, create, animate, controls, load, helper, destroy } =
          init(r);
        camera.position.set(0, 1.3, -1.5);
        controls.target.set(0, 1, 0);
        helper.grid({ size: 10 });
        helper.axes();
        create.ambientLight({ intensity: 0.2 });
        create.directionalLight({
          intensity: 2,
          position: [-10, 10, -10],
        });
        create.plane({
          size: 10,
          rotation: [-Math.PI / 2, 0, 0],
          option: {
            color: 0xaaaaaa,
          },
        });
        // load.background(
        //   "/easy-three/texture/hdr/kloofendal_48d_partly_cloudy_puresky_1k.hdr"
        // );
        load.vrm("/easy-three/model/sample.vrm");
        animate();
        return {
          destroy: () => {
            destroy();
          },
          controls: (f) => {
            if (f) controls.connect();
            else controls.disconnect();
          },
        };
      }}
    />
  )
}

export function Ex2() {
  return (
    <EasyThreeBox
      toggleControls
      effect={(r) => {
        const { camera, create, animate, controls, load, destroy } = init(r);
        camera.position.set(0, 1.3, -1.5);
        controls.target.set(0, 1, 0);
        create.ambientLight({ intensity: 0.2 });
        create.directionalLight({
          intensity: 2,
          position: [-10, 10, -10],
        });
        create.plane({
          size: 10,
          rotation: [-Math.PI / 2, 0, 0],
          option: {
            color: 0xaaaaaa,
            map: load.texture(
              "/easy-three/texture/img/coast_sand_rocks_02/coast_sand_rocks_02_diff_1k.jpg",
              { repeat: [5, 5] }
            ),
            normalMap: load.texture(
              "/easy-three/texture/img/coast_sand_rocks_02/coast_sand_rocks_02_nor_gl_1k.jpg",
              { repeat: [5, 5] }
            ),
          },
        });
        load.background(
          "/easy-three/texture/hdr/kloofendal_48d_partly_cloudy_puresky_1k.hdr"
        );
        load.vrm("/easy-three/model/sample.vrm");
        animate();
        return {
          destroy: () => {
            destroy();
          },
          controls: (f) => {
            if (f) controls.connect();
            else controls.disconnect();
          },
        };
      }}
    />
  )
}


export function Ex3() {
  return (
    <EasyThreeBox
      toggleControls
      effect={(r) => {
        const { camera, create, animate, controls, load, helper, destroy } =
          init(r);
        camera.position.set(0, 1.3, -1.5);
        controls.target.set(0, 1, 0);
        helper.grid({ size: 10 });
        helper.axes();
        create.ambientLight({ intensity: 0.2 });
        create.directionalLight({
          intensity: 2,
          position: [-10, 10, -10],
        });
        create.plane({
          size: 10,
          rotation: [-Math.PI / 2, 0, 0],
          option: {
            color: 0xaaaaaa,
          },
        });
        let model;
        load.vrm("/easy-three/model/sample.vrm").then((m) => (model = m));
        animate(({ delta }) => {
          if (model) {
            model.scene.rotation.y += delta;
          }
        });
        return {
          destroy: () => {
            destroy();
          },
          controls: (f) => {
            if (f) controls.connect();
            else controls.disconnect();
          },
        };
      }}
    />
  )
}

