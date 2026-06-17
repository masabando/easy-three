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
        camera.position.set(-2, 2, 2);
        create.ambientLight();
        create.directionalLight();
        create.sphere();
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
        create.sphere({
          size: 0.5,
          position: [1, 1, 1],
          option: {
            color: 0xff0000,
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
          }
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
        create.sphere({ segments: [4, 2] });
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

export function Ex4() {
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
        create.sphere({
          segments: 10,
          option: {
            wireframe: true,
            color: 0x0000ff,
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
          }
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
        camera.position.set(-1, 1, 1);
        create.ambientLight();
        create.directionalLight();
        create.plane();
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

export function Ex6() {
  return (
    <EasyThreeBox
      toggleControls
      effect={(r) => {
        const { camera, create, animate, controls, helper, destroy } =
          init(r);
        helper.grid();
        helper.axes();
        camera.position.set(-1, 1, 1);
        create.ambientLight();
        create.directionalLight();
        create.plane({
          size: 1.5,
          position: [1, 0, 0],
          option: {
            color: 0xff0000,
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
          }
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
        const { camera, create, animate, controls, helper, destroy } =
          init(r);
        helper.grid();
        helper.axes();
        camera.position.set(-1, 1, 1);
        create.ambientLight();
        create.directionalLight();
        create.plane({
          size: 1.5,
          rotation: [-Math.PI / 2, 0, 0],
        });
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

export function Ex8() {
  return (
    <EasyThreeBox
      toggleControls
      effect={(r) => {
        const { camera, create, animate, controls, destroy } = init(r);
        camera.position.set(-1, 1, 1);
        create.ambientLight();
        create.directionalLight();
        create.box({
          size: 1,
          rounded: true,
          segments: 7,
          radius: 0.1,
        });
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

export function Ex9() {
  return (
    <EasyThreeBox
      toggleControls
      effect={(r) => {
        const { camera, create, animate, controls, destroy } = init(r);
        camera.position.set(0, -2, 3);
        create.ambientLight();
        create.directionalLight();
        create.torus({ tube: 0.3 });
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

export function Ex10() {
  return (
    <EasyThreeBox
      toggleControls
      effect={(r) => {
        const { camera, create, animate, controls, destroy } = init(r);
        camera.position.set(0, -2, 3);
        create.ambientLight();
        create.directionalLight();
        create.torusKnot({ tube: 0.3 });
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

