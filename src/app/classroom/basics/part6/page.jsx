"use client";
import { EasyThreeBox, Note } from "@/components/BaseKit";
import CodeBlock from "@/components/CodeBlock";
import { init } from "@dist/easy-three";
import { MathJax, MathJaxContext } from "better-react-mathjax";

export default function Page() {
  return (
    <div className="classroomPart">
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
        <h2>6. アニメーションと物理</h2>
        <p>
          このセクションでは、物理法則を使ってリアルなアニメーションを作成する基礎を学びます。
        </p>

        <h3>等速直線運動</h3>
        <p>
          <Note>等速直線運動とは、一定の速度で直線的に移動する運動のこと</Note>
          です。
        </p>
        <p>
          速さとは、<MathJax inline>{"$1$"}</MathJax>{" "}
          の時間で進む距離のことです。
          <br />
          通常、物理では <MathJax inline>{"$m/s$"}</MathJax>{" "}
          が速さの単位として使われますが、これは
          <Note>
            <MathJax inline>{"$1$"}</MathJax> 秒間に進む距離(メートル)のこと
          </Note>
          です。
        </p>
        <p>
          つまり、 経過時間を <MathJax inline>{"$t$"}</MathJax> 、速度を{" "}
          <MathJax inline>{"$v$"}</MathJax> とすると、 進む距離{" "}
          <MathJax inline>{"$x$"}</MathJax> は次のように表されます。
        </p>
        <MathJax>{`\\[x = v t\\]`}</MathJax>
        <p>
          <code>animate</code> 関数内では、 前フレームからの経過時時間{" "}
          <code>delta</code>、 現在の時間 <code>time</code> が取得できます。
        </p>
        <CodeBlock>
          {`animate(({ time, delta }) => {
  // ここで、
  // 前フレームからの経過時間 delta と
  // 現在の時間 time
  // を使える
})`}
        </CodeBlock>
        <p>
          つまり、1秒間に3メートル進む <MathJax inline>{"$3m/s$"}</MathJax>{" "}
          の物体を作るには、次のように記述します。
          <br />
          (ここでは、3D空間の距離1を1mとしています)
        </p>
        <CodeBlock>{`const { camera, create, helper, animate } = init();

helper.grid()
helper.axes()
camera.position.set(0, 2, 4)
create.ambientLight()
create.directionalLight()
const cube = create.cube({ position: [-3, 0, 0] })

const v = 3; // 速さ

animate(({ delta }) => {
  // 1秒間に3メートル進む (v * delta ずつ進む)
  cube.position.x += v * delta
})`}</CodeBlock>
        <EasyThreeBox
          toggleControls
          effect={(r, controlsFlag) => {
            const { camera, create, animate, helper, controls, destroy } =
              init(r);
            if (controlsFlag) controls.connect();
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
            return () => {
              destroy();
            };
          }}
        />

        <h3>等加速直線運動</h3>
        <p>
          <Note>
            等加速直線運動とは、一定の加速度で直線的に移動する運動のこと
          </Note>
          です。
        </p>

        <p>
          加速度とは、<MathJax inline>{"$1$"}</MathJax>{" "}
          の時間で速度が変化する量のことです。
          <br />
          通常、物理では <MathJax inline>{"$m/s^2$"}</MathJax>{" "}
          が速さの単位として使われますが、これは
          <Note>
            <MathJax inline>{"$1$"}</MathJax> 秒間に増える速さのこと
          </Note>
          です。
        </p>
        <p>
          つまり、 経過時間を <MathJax inline>{"$t$"}</MathJax> 、 加速度を{" "}
          <MathJax inline>{"$a$"}</MathJax> 、 はじめの速さを{" "}
          <MathJax inline>{"$v_0$"}</MathJax> とすると、 速さ{" "}
          <MathJax inline>{"$v$"}</MathJax> と進む距離{" "}
          <MathJax inline>{"$x$"}</MathJax> は次のように表されます。
        </p>
        <MathJax>{`\\[v = v_0 + a t\\]`}</MathJax>
        <MathJax>{`\\[x = v_0 t + \\displaystyle\\frac{1}{2}a t^2\\]`}</MathJax>
        <p>
          つまり、1秒間に3 <MathJax inline>{"$m/s$"}</MathJax> ずつ早くなる{" "}
          <MathJax inline>{"$3m/s^2$"}</MathJax>{" "}
          の物体を作るには、次のように記述します。
          <br />
          (ここでは、3D空間の距離1を1mとしています)
        </p>
        <CodeBlock>{`const { camera, create, helper, animate } = init();

helper.grid()
helper.axes()
camera.position.set(0, 2, 4)
create.ambientLight()
create.directionalLight()
const cube = create.cube({ position: [-3, 0, 0] })

const a = 3;// 加速度
let v = 0;// 速さ

animate(({ delta }) => {
  // 1秒間に3メートルずつ早くなる (a * delta ずつ速くなる)
  v += a * delta
  cube.position.x += v * delta
})`}</CodeBlock>
        <EasyThreeBox
          toggleControls
          effect={(r, controlsFlag) => {
            const { camera, create, animate, helper, controls, destroy } =
              init(r);
            if (controlsFlag) controls.connect();
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
            return () => {
              destroy();
            };
          }}
        />
        <p>
          ここで、 <code>const</code> ではなく <code>let</code>{" "}
          を使っていますが、
          <code>const</code> は変数の再代入を禁止するもので、
          <code>let</code> は再代入を許可するものです。
        </p>

        <h3>鉛直投げ上げ</h3>
        <p>
          <Note>
            鉛直投げ上げとは、上方に投げ上げた物体が地面に落ちるまでの運動のこと
          </Note>
          です。
        </p>
        <p>
          地球上の物体は、重力によって下方向に{" "}
          <MathJax inline>{"$9.8m/s^2$"}</MathJax> 加速されます。
          <br />
          これを考慮すると、鉛直投げ上げのプログラムは次のようになります。
        </p>
        <CodeBlock>{`const { camera, create, helper, animate } = init();

helper.grid()
helper.axes()
camera.position.set(0, 2, 4)
create.ambientLight()
create.directionalLight()
const cube = create.cube({ position: [0, 0, 0] })

const g = -9.8;// 重力加速度
let v = 8;// 投げる速さ

animate(({ delta }) => {
  // 重力による速度の変化
  v += g * delta
  cube.position.y += v * delta
})`}</CodeBlock>
        <EasyThreeBox
          toggleControls
          effect={(r, controlsFlag) => {
            const { camera, create, animate, helper, controls, destroy } =
              init(r);
            if (controlsFlag) controls.connect();
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
            return () => {
              destroy();
            };
          }}
        />
        <p>
          ここで、cubeはどこまでも落ちていきます。
          <br />
          これは、止まる条件を設定していないためです。
        </p>
        <p>
          例えば、次のように設定すると、<code>y = 0</code>
          の地面でぶつかって止まります。
          <br />(<code>cube</code>の位置はその中心なので、
          <code>y = 0</code>は地面に半分だけ埋まっていることになります。)
        </p>
        <CodeBlock>{`const { camera, create, helper, animate } = init();

helper.grid()
helper.axes()
camera.position.set(0, 2, 4)
create.ambientLight()
create.directionalLight()
const cube = create.cube({ position: [0, 0.5, 0] })

const g = -9.8;// 重力加速度
let v = 8;// 投げる速さ

animate(({ delta }) => {
  // 重力による速度の変化
  v += g * delta
  cube.position.y += v * delta
  // 地面にあたったら止まる
  if (cube.position.y < 0.5) {
    cube.position.y = 0.5
    v = 0
  }
})`}</CodeBlock>
        <EasyThreeBox
          toggleControls
          effect={(r, controlsFlag) => {
            const { camera, create, animate, helper, controls, destroy } =
              init(r);
            if (controlsFlag) controls.connect();
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
              return () => {
                destroy();
              };
            });
          }}
        />
        <p>地面にぶつかったとき、跳ね返るようにするには、次のようにします。</p>
        <CodeBlock>{`const { camera, create, helper, animate } = init();

helper.grid()
helper.axes()
camera.position.set(0, 2, 4)
create.ambientLight()
create.directionalLight()
const cube = create.cube({ position: [0, 0.5, 0] })

const g = -9.8;// 重力加速度
let v = 8;// 投げる速さ

animate(({ delta }) => {
  // 重力による速度の変化
  v += g * delta
  cube.position.y += v * delta
  // 地面にあたったら止まる
  if (cube.position.y < 0.5) {
    cube.position.y = 0.5
    v = -v
  }
})`}</CodeBlock>
        <EasyThreeBox
          toggleControls
          effect={(r, controlsFlag) => {
            const { camera, create, animate, helper, controls, destroy } =
              init(r);
            if (controlsFlag) controls.connect();
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
              return () => {
                destroy();
              };
            });
          }}
        />
      </MathJaxContext>
    </div>
  );
}
