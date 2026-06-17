"use client"
import { EasyThreeBox } from "@/components/BaseKit";
import { init } from "@dist/easy-three";
import { MathJax, MathJaxContext } from "better-react-mathjax";


export function MJC({ children }) {
  return (
    <MathJaxContext
      version={2}
      config={{
        messageStyle: "none",
        "fast-preview": {
          disabled: true,
        },
        tex2jax: {
          inlineMath: [
            ["$", "$"],
            ["\\(", "\\)"],
          ],
          displayMath: [
            ["$$", "$$"],
            ["\\[", "\\]"],
          ],
        },
      }}
    >
      {children}
    </MathJaxContext>
  )
}

export function Ex1() {
  return (
    <EasyThreeBox
      toggleControls
      effect={(r) => {
        const { camera, create, animate, helper, controls, destroy } =
          init(r);
        helper.grid();
        helper.axes();
        create.ambientLight();
        create.directionalLight();
        camera.position.set(0, 2, 4);
        const cube = create.cube({ position: [-3, 0, 0] });
        const v = 3; // 速さ
        animate(({ delta }) => {
          cube.position.x += v * delta;
          if (cube.position.x > 3) {
            cube.position.x = -3;
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
        const { camera, create, animate, helper, controls, destroy } =
          init(r);
        helper.grid();
        helper.axes();
        create.ambientLight();
        create.directionalLight();
        camera.position.set(0, 2, 4);
        const cube = create.cube({ position: [-3, 0, 0] });
        const a = 3;
        let v = 0; // 初速度
        animate(({ delta }) => {
          v += a * delta;
          cube.position.x += v * delta;
          if (cube.position.x > 3) {
            cube.position.x = -3;
            v = 0;
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
        const { camera, create, animate, helper, controls, destroy } =
          init(r);
        helper.grid();
        helper.axes();
        create.ambientLight();
        create.directionalLight();
        camera.position.set(0, 2, 4);
        const cube = create.cube({ position: [0, 0, 0] });
        const g = -9.8;
        let v = 8; // 初速度
        animate(({ delta }) => {
          v += g * delta;
          cube.position.y += v * delta;
          if (cube.position.y < -10) {
            cube.position.y = 0;
            v = 8;
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

export function Ex4() {
  return (
    <EasyThreeBox
      toggleControls
      effect={(r) => {
        const { camera, create, animate, helper, controls, destroy } =
          init(r);
        helper.grid();
        helper.axes();
        create.ambientLight();
        create.directionalLight();
        camera.position.set(0, 2, 4);
        const cube = create.cube({ position: [0, 0.5, 0] });
        const g = -9.8;
        let v = 8; // 初速度
        animate(({ delta, time }) => {
          v += g * delta;
          cube.position.y += v * delta;
          if (cube.position.y < 0.5) {
            cube.position.y = 0.5;
            v = 0;

            if (time % 3 < 1) {
              v = 8;
            }
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

export function Ex5() {
  return (
    <EasyThreeBox
      toggleControls
      effect={(r) => {
        const { camera, create, animate, helper, controls, destroy } =
          init(r);
        helper.grid();
        helper.axes();
        create.ambientLight();
        create.directionalLight();
        camera.position.set(0, 2, 4);
        const cube = create.cube({ position: [0, 0.5, 0] });
        const g = -9.8;
        let v = 8; // 初速度
        animate(({ delta, time }) => {
          v += g * delta;
          cube.position.y += v * delta;
          if (cube.position.y < 0.5) {
            v = -v;
            cube.position.y = 0.5;
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
