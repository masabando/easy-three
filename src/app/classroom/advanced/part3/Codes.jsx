"use client";
import { EasyThreeBox } from "@/components/BaseKit";
import { init } from "@dist/easy-three";

export function Ex1() {
  return (
    <EasyThreeBox
      toggleControls
      effect={(r) => {
        const { camera, create, animate, controls, load, destroy } = init(r);
        camera.position.set(0, 1, 2);
        controls.autoRotate = true;
        create.ambientLight();
        create.directionalLight();
        // load.background(
        //   "/easy-three/texture/hdr/kloofendal_48d_partly_cloudy_puresky_1k.hdr"
        // );
        load.gltf(
          "/easy-three/model/didelta_spinosa/didelta_spinosa_1k.gltf"
        );
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
        camera.position.set(0, 1, 2);
        controls.autoRotate = true;
        create.ambientLight();
        create.directionalLight();
        load.background(
          "/easy-three/texture/hdr/kloofendal_48d_partly_cloudy_puresky_1k.hdr"
        );
        load.gltf(
          "/easy-three/model/didelta_spinosa/didelta_spinosa_1k.gltf"
        );

        create.plane({
          size: 10,
          rotation: [-Math.PI / 2, 0, 0],
          option: {
            map: load.texture(
              "/easy-three/texture/img/coast_sand_rocks_02/coast_sand_rocks_02_diff_1k.jpg",
              { repeat: [10, 10] }
            ),
            normalMap: load.texture(
              "/easy-three/texture/img/coast_sand_rocks_02/coast_sand_rocks_02_nor_gl_1k.jpg",
              { repeat: [10, 10] }
            ),
          },
        });
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

