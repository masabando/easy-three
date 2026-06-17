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
        camera.position.set(0, 2, 2);
        const physicalCube = create.cube({ position: [-1, 0, 0] });
        const basicCube = create.cube({
          material: "Basic",
          position: [1, 0, 0],
        });
        animate(({ delta }) => {
          physicalCube.rotation.x += delta;
          physicalCube.rotation.y += delta;
          basicCube.rotation.x += delta;
          basicCube.rotation.y += delta;
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
        camera.position.set(0, 2, 2);
        create.ambientLight();
        create.directionalLight();
        const physicalCube = create.cube({ position: [-1, 0, 0] });
        const basicCube = create.cube({
          material: "Basic",
          position: [1, 0, 0],
        });
        animate(({ delta }) => {
          physicalCube.rotation.x += delta;
          physicalCube.rotation.y += delta;
          basicCube.rotation.x += delta;
          basicCube.rotation.y += delta;
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
        camera.position.set(0, 3, 3);
        create.ambientLight();
        create.directionalLight({ intensity: 4 });
        create.sphere({
          position: [-2, 0, 0],
          option: {
            color: "blue",
            metalness: 0.6,
            roughness: 0.3,
          },
        });
        create.sphere({
          material: "Phong",
          position: [2, 0, 0],
          option: {
            color: "blue",
            shininess: 90,
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

export function Ex4() {
  return (
    <EasyThreeBox
      toggleControls
      effect={(r) => {
        const { camera, create, animate, controls, helper, destroy } =
          init(r);
        helper.grid();
        helper.axes();
        camera.position.set(0, 3, 3);
        create.ambientLight();
        create.directionalLight();
        create.sphere({ position: [-2, 0, 0] });
        create.sphere({
          material: "Lambert",
          position: [2, 0, 0],
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
        const { camera, create, animate, controls, helper, destroy } =
          init(r);
        helper.grid();
        helper.axes();
        camera.position.set(0, 3, 3);
        create.ambientLight();
        create.directionalLight();
        create.sphere({
          position: [-2.5, 0, 0],
          option: {
            color: "blue",
            metalness: 0.7,
            roughness: 0.2,
          },
        });
        create.sphere({
          option: {
            color: "blue",
            metalness: 0.5,
            roughness: 0.5,
          },
        });
        create.sphere({
          position: [2.5, 0, 0],
          option: {
            color: "blue",
            metalness: 0.2,
            roughness: 0.7,
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

export function Ex6() {
  return (
    <EasyThreeBox
      toggleControls
      effect={(r) => {
        const { camera, create, animate, controls, destroy } = init(r);
        camera.position.set(0, 0, 2.5);
        create.ambientLight();
        create.directionalLight();
        const cube = create.cube({
          option: {
            metalness: 0,
            roughness: 0.1,
            transmission: 0.9,
            thickness: 0.4,
          },
        });
        create.cube({ size: 3, position: [0, 0, -4] });
        animate(({ delta, time }) => {
          cube.rotation.x += delta;
          cube.rotation.y += delta;
          cube.position.set(Math.sin(time) * 2, 0, 0);
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

export function Ex7() {
  return (
    <EasyThreeBox
      toggleControls
      effect={(r) => {
        const { camera, create, animate, controls, destroy } = init(r);
        camera.position.set(0, 0, 5);
        create.ambientLight();
        create.directionalLight();
        const physicalTorusKnot = create.torusKnot({
          position: [-2, 0, 0],
          material: "Physical",
        });
        const toonTorusKnot = create.torusKnot({
          position: [2, 0, 0],
          material: "Toon",
        });
        animate(({ delta }) => {
          physicalTorusKnot.rotation.x += delta;
          physicalTorusKnot.rotation.y += delta;
          toonTorusKnot.rotation.x += delta;
          toonTorusKnot.rotation.y += delta;
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

export function Ex8() {
  return (
    <EasyThreeBox
      toggleControls
      effect={(r) => {
        const { camera, create, animate, controls, destroy } = init(r);
        camera.position.set(0, 0, 3);
        create.ambientLight();
        create.directionalLight();
        const physicalCube = create.cube({
          position: [-1, 0, 0],
          material: "Physical",
        });
        const normalCube = create.cube({
          position: [1, 0, 0],
          material: "Normal",
        });
        animate(({ delta }) => {
          physicalCube.rotation.x += delta;
          physicalCube.rotation.y += delta;
          normalCube.rotation.x += delta;
          normalCube.rotation.y += delta;
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
