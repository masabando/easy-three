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
        create.cube({
          option: {
            map: load.texture(
              "/easy-three/texture/img/coast_sand_rocks_02/coast_sand_rocks_02_diff_1k.jpg"
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
        // load.background(
        //   "/easy-three/texture/hdr/kloofendal_48d_partly_cloudy_puresky_1k.hdr"
        // );
        create.cube({
          option: {
            map: load.texture(
              "/easy-three/texture/img/coast_sand_rocks_02/coast_sand_rocks_02_diff_1k.jpg"
            ),
            normalMap: load.texture(
              "/easy-three/texture/img/coast_sand_rocks_02/coast_sand_rocks_02_nor_gl_1k.jpg"
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

export function Ex3() {
  return (
    <EasyThreeBox
      toggleControls
      effect={(r) => {
        const { camera, create, animate, controls, load, destroy } = init(r);
        camera.position.set(0, 1, 2);
        //controls.autoRotate = true;
        create.ambientLight();
        create.directionalLight();
        load.background(
          "/easy-three/texture/hdr/kloofendal_48d_partly_cloudy_puresky_1k.hdr"
        );
        const texture = load.texture(
          "/easy-three/texture/img/coast_sand_rocks_02/coast_sand_rocks_02_diff_1k.jpg"
        );
        const cube = create.cube({
          position: [-1, 0, 0],
          option: {
            map: texture,
          },
        });
        const normalCube = create.cube({
          position: [1, 0, 0],
          option: {
            map: texture,
            normalMap: load.texture(
              "/easy-three/texture/img/coast_sand_rocks_02/coast_sand_rocks_02_nor_gl_1k.jpg"
            ),
          },
        });
        animate(({ time }) => {
          cube.rotation.x = time;
          cube.rotation.y = time;
          normalCube.rotation.x = time;
          normalCube.rotation.y = time;
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

export function Ex4() {
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
        const texture = load.texture(
          "/easy-three/texture/img/coast_sand_rocks_02/coast_sand_rocks_02_diff_1k.jpg"
        );
        create.cube({
          option: {
            map: texture,
            bumpMap: texture,
            bumpScale: 3,
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

export function Ex5() {
  return (
    <EasyThreeBox
      toggleControls
      effect={(r) => {
        const { camera, create, animate, controls, load, destroy } = init(r);
        camera.position.set(0, 1, 2);
        //controls.autoRotate = true;
        create.ambientLight();
        create.directionalLight();
        load.background(
          "/easy-three/texture/hdr/kloofendal_48d_partly_cloudy_puresky_1k.hdr"
        );
        const texture = load.texture(
          "/easy-three/texture/img/coast_sand_rocks_02/coast_sand_rocks_02_diff_1k.jpg"
        );
        const bumpCube = create.cube({
          position: [1, 0, 0],
          option: {
            map: texture,
            bumpMap: texture,
            bumpScale: 3,
          },
        });
        const normalCube = create.cube({
          position: [-1, 0, 0],
          option: {
            map: texture,
            normalMap: load.texture(
              "/easy-three/texture/img/coast_sand_rocks_02/coast_sand_rocks_02_nor_gl_1k.jpg"
            ),
          },
        });
        animate(({ time }) => {
          bumpCube.rotation.x = time;
          bumpCube.rotation.y = time;
          normalCube.rotation.x = time;
          normalCube.rotation.y = time;
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
