"use client"
import { EasyThreeBox } from "@/components/BaseKit";
import { init } from "@dist/easy-three";

export function Ex1() {
  return (
    <EasyThreeBox
      effect={(r) => {
        const { camera, create, animate, destroy } = init(r);
        camera.position.set(-2, 2, 2);
        create.ambientLight();
        create.directionalLight();
        create.cube();
        animate();
        return {
          destroy: () => {
            destroy();
          }
        };
      }}
    />

  )
}


export function Ex2() {
  return (
    <EasyThreeBox
      effect={(r) => {
        const { camera, create, animate, destroy } = init(r);
        camera.position.set(-3, -3, 5);
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
        const { camera, create, animate, destroy } = init(r);
        camera.position.set(-2, 2, 2);
        create.ambientLight({ intensity: 0.1 });
        create.directionalLight({
          intensity: 3,
          position: [-5, 5, -5],
        });
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

export function Ex4() {
  return (
    <EasyThreeBox
      effect={(r) => {
        const { camera, create, animate, destroy } = init(r);
        camera.position.set(-2, 2, 2);
        create.ambientLight();
        create.directionalLight();
        create.cube({
          option: { color: "red" },
        });
        create.cube({
          size: 0.6,
          position: [1, 1, 0],
          option: { color: "green" },
        });
        create.cube({
          size: [0.5, 3, 1.5],
          position: [-1, 0, -1],
          option: { color: "blue" },
        });
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
