"use client"
import { EasyThreeBox } from "@/components/BaseKit";
import { init } from "@dist/easy-three";

export function Ex1() {
  return (
    <EasyThreeBox
      toggleControls
      effect={(r) => {
        const { camera, create, animate, controls, helper, destroy } =
          init(r);
        helper.grid();
        helper.axes();
        create.ambientLight();
        create.directionalLight();
        camera.position.set(0, 3, 3);
        const group = create.group();
        const cube1 = create.cube({ position: [-2, 0, 0], autoAdd: false });
        const cube2 = create.cube({ position: [2, 0, 0], autoAdd: false });
        const cube3 = create.cube({ position: [0, 0, -2], autoAdd: false });
        const cube4 = create.cube({ position: [0, 0, 2], autoAdd: false });
        group.add(cube1);
        group.add(cube2);
        group.add(cube3);
        group.add(cube4);
        animate(({ delta }) => {
          group.rotation.x += delta;
          group.rotation.y += delta;
          cube1.rotation.x += delta * 3;
          cube1.rotation.y += delta * 4;
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

export function Ex2() {
  return (
    <EasyThreeBox
      toggleControls
      effect={(r) => {
        const { camera, create, animate, controls, helper, destroy } =
          init(r);
        helper.grid();
        helper.axes();
        create.ambientLight();
        create.directionalLight();
        camera.position.set(0, 3, 3);
        const group = create.group({
          children: [
            create.cube({ position: [-2, 0, 0], autoAdd: false }),
            create.cube({ position: [2, 0, 0], autoAdd: false }),
            create.cube({ position: [0, 0, -2], autoAdd: false }),
            create.cube({ position: [0, 0, 2], autoAdd: false }),
          ],
        });
        animate(({ delta }) => {
          group.rotation.x += delta;
          group.rotation.y += delta;
          group.children[0].rotation.x += delta * 3;
          group.children[0].rotation.y += delta * 4;
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
