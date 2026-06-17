"use client"
import { EasyThreeBox } from "@/components/BaseKit";
import { init } from "@dist/easy-three";

export function Ex1() {
  return (
    <EasyThreeBox
      toggleControls
      effect={(r) => {
        const {
          camera,
          create,
          animate,
          controls,
          helper,
          scene,
          color,
          destroy,
        } = init(r);
        helper.grid();
        helper.axes();
        camera.position.set(-2, 2, 2);
        create.ambientLight();
        create.directionalLight();
        create.cube();
        scene.background = color("black");
        animate();
        return {
          destroy: () => {
            destroy();
          },
          controls: (f) => {
            if (f) controls.connect();
            else controls.disconnect();
          }
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
        const { camera, create, animate, controls, helper, destroy } =
          init(r);
        helper.grid();
        helper.axes();
        camera.position.set(-2, 2, 2);
        create.ambientLight();
        create.directionalLight();
        const cube = create.cube();
        animate(({ delta }) => {
          cube.rotation.x += delta;
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

export function Ex3() {
  return (
    <EasyThreeBox
      toggleControls
      effect={(r) => {
        const { camera, create, animate, controls, helper, destroy } =
          init(r);
        helper.grid();
        helper.axes();
        camera.position.set(-2, 2, 2);
        create.ambientLight();
        create.directionalLight();
        const cube = create.cube();
        animate(({ delta, time }) => {
          cube.rotation.x += delta;
          cube.rotation.y += delta;
          cube.position.set(0, 0, Math.sin(time) * 2);
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

