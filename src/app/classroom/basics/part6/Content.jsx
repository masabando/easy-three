"use client"
import { Code, Note } from "@/components/BaseKit";
import CodeBlock from "@/components/CodeBlock";
import { Suspense } from "react";
import H1 from "@/components/H1";
import H2 from "@/components/H2";
import { Ex1, Ex2, Ex3, Ex4, Ex5, MJC } from "./Code";
import { MathJax } from "better-react-mathjax";

export default function Content() {
  return (
    <Suspense fallback={null}>
      <H1>6. アニメーションと物理</H1>
      <p>
        このセクションでは、物理法則を使ってリアルなアニメーションを作成する基礎を学びます。
      </p>

      <H2 className="mt-14">等速直線運動</H2>
      <MJC>
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
          <Code>animate</Code> 関数内では、 前フレームからの経過時時間{" "}
          <Code>delta</Code>、 現在の時間 <Code>time</Code> が取得できます。
        </p>
      </MJC>
      <CodeBlock>
        {`animate(({ time, delta }) => {
  // ここで、
  // 前フレームからの経過時間 delta と
  // 現在の時間 time
  // を使える
})`}
      </CodeBlock>
      <MJC>
        <p>
          つまり、1秒間に3メートル進む <MathJax inline>{"$3m/s$"}</MathJax>{" "}
          の物体を作るには、次のように記述します。
          <br />
          (ここでは、3D空間の距離1を1mとしています)
        </p>
      </MJC>
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
      <Ex1 />

      <H2 className="mt-14">等加速直線運動</H2>
      <MJC>
        <p>
          <Note>
            等加速直線運動とは、一定の加速度で直線的に移動する運動のこと
          </Note>
          です。
        </p>

        <p className="mt-4">
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
        <p className="mt-4">
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
      </MJC>
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
      <Ex2 />

      <p>
        ここで、 <Code>const</Code> ではなく <Code>let</Code>{" "}
        を使っていますが、
        <Code>const</Code> は変数の再代入を禁止するもので、
        <Code>let</Code> は再代入を許可するものです。
      </p>

      <H2 className="mt-14">鉛直投げ上げ</H2>
      <MJC>
        <p>
          <Note>
            鉛直投げ上げとは、上方に投げ上げた物体が地面に落ちるまでの運動のこと
          </Note>
          です。
        </p>
        <p className="mt-4">
          地球上の物体は、重力によって下方向に{" "}
          <MathJax inline>{"$9.8m/s^2$"}</MathJax> 加速されます。
          <br />
          これを考慮すると、鉛直投げ上げのプログラムは次のようになります。
        </p>
      </MJC>
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
      <Ex3 />

      <p>
        ここで、cubeはどこまでも落ちていきます。
        <br />
        これは、止まる条件を設定していないためです。
      </p>
      <p className="mt-4">
        例えば、次のように設定すると、<Code>y = 0</Code>
        の地面でぶつかって止まります。
        <br />(<Code>cube</Code>の位置はその中心なので、
        <Code>y = 0</Code>は地面に半分だけ埋まっていることになります。)
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
      <Ex4 />

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
      <Ex5 />

    </Suspense>
  )
}