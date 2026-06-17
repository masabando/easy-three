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
        let model;
        load.vrm("/easy-three/model/sample.vrm").then((m) => (model = m));
        animate(({ delta, time }) => {
          if (model) {
            model.bone("rightUpperArm").rotation.z =
              Math.sin(time) * Math.PI * 0.25;
            model.update(delta);
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

export function Ex2() {
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
        load.vrm("/easy-three/model/sample.vrm").then((m) => {
          model = m;
          model.bone("leftUpperArm").rotation.z = Math.PI * 0.4;
        });
        animate(({ delta, time }) => {
          if (model) {
            model.bone("rightUpperArm").rotation.z =
              Math.sin(time) * Math.PI * 0.25;
            model.bone("neck").rotation.x = Math.sin(time) * Math.PI * 0.25;
            model.bone("head").rotation.y =
              Math.cos(time * 1.6) * Math.PI * 0.25;
            model.bone("rightLowerArm").rotation.y =
              -Math.sin(time * 1.4) * Math.PI * 0.25 + Math.PI * 0.25;
            model.update(delta);
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

export function Ex3() {
  return (
    <EasyThreeBox
      toggleControls
      effect={(r) => {
        const { camera, create, animate, controls, load, helper, destroy } =
          init(r);
        camera.position.set(0, 1.6, -0.4);
        controls.target.set(0, 1.6, 0);
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
        animate(({ delta, time }) => {
          if (model) {
            model.expressionManager.setValue(
              "happy",
              Math.sin(time) * 0.5 + 0.5
            );
            model.update(delta);
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

