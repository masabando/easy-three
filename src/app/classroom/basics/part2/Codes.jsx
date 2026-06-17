"use client"
import { EasyThreeBox } from "@/components/BaseKit";
import { init } from "@dist/easy-three";

export function Ex1() {
  return (
    <EasyThreeBox
      effect={(r) => {
        const { camera, create, animate, controls, destroy } = init(r);
        controls.connect();
        camera.position.set(-2, 2, 2);
        create.ambientLight();
        create.directionalLight();
        create.cube();
        animate();
        return {
          destroy: () => {
            destroy();
          },
        };
      }}
    />
  )
}

export function Ex2() {
  return (
    <EasyThreeBox
      effect={(r) => {
        const { camera, create, animate, controls, destroy } = init(r);
        controls.autoRotate = true;
        controls.autoRotateSpeed = 10;
        camera.position.set(-2, 2, 2);
        create.ambientLight();
        create.directionalLight();
        create.cube();
        animate();
        return {
          destroy: () => {
            destroy();
          },
        };
      }}
    />

  )
}

export function Ex3() {
  return (
    <EasyThreeBox
      effect={(r) => {
        const { camera, create, animate, controls, helper, destroy } =
          init(r);
        controls.autoRotate = true;
        helper.grid();
        helper.axes();
        camera.position.set(-2, 2, 2);
        create.ambientLight();
        create.directionalLight();
        create.cube();
        animate();
        return {
          destroy: () => {
            destroy();
          },
        };
      }}
    />
  )
}
