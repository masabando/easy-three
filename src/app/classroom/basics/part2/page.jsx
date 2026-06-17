import { Note, Code } from "@/components/BaseKit";
import CodeBlock from "@/components/CodeBlock";
import H1 from "@/components/H1";
import H2 from "@/components/H2";
import H3 from "@/components/H3";
import { Ex1, Ex2, Ex3 } from "./Codes";

export const metadata = {
  title: "カメラコントロールとガイド",
};

export default function Page() {
  return (
    <div>
      <H1>2. カメラコントロールとガイド</H1>
      <p>
        このセクションでは、カメラの簡単な操作方法と、
        座標をわかりやすくするためのガイドの表示方法を学びます。
      </p>

      <H2 className="mt-14">カメラコントロール</H2>
      <p>
        <Code>controls</Code>{" "}
        を使うことで、ユーザのマウス操作やタッチ操作によってカメラを操作することができます。
      </p>
      <p className="mt-4">
        <Code>controls</Code> を利用するには、
        <Note>
          1行目の使うものリストに <Code>controls</Code> を追加し、
          <Code>controls.connect()</Code> を記述するだけ
        </Note>
        です。
      </p>
      <CodeBlock filename="main.js">
        {`const { camera, create, animate, controls } = init();

controls.connect()
camera.position.set(-2, 2, 2)
create.ambientLight()
create.directionalLight()
create.cube()

animate()
`}
      </CodeBlock>
      <Ex1 />

      <p>
        これだけで、マウスやタッチ操作によってカメラを操作することができます。
        <br />
        実際に試してみましょう。
      </p>
      <p className="mt-4">
        また、マウスホイール (スマホならピンチイン・アウト)
        でズームイン・アウトができます。
        <br />
        さらに、マウス右ドラッグ (スマホなら2本指でスワイプ)
        でカメラ位置を並行に移動できます。
      </p>

      <H3 className="mt-10">カメラの自動回転</H3>
      <p>カメラを自動で回転させることもできます。</p>
      <CodeBlock>{`controls.autoRotate = true
controls.autoRotateSpeed = 10
`}</CodeBlock>
      <p>カメラはy軸を中心に自動で回転します。<br />
      カメラの手動操作をONにするかどうかに関わらず利用できます。</p>
      <CodeBlock filename="main.js">
        {`const { camera, create, animate, controls } = init();

controls.autoRotate = true
controls.autoRotateSpeed = 10
camera.position.set(-2, 2, 2)
create.ambientLight()
create.directionalLight()
create.cube()

animate()
`}
      </CodeBlock>
      <Ex2 />

      <H2 className="mt-14">ガイドの表示</H2>
      <p>
        3D
        空間上で座標をわかりやすくするために、ガイドを表示することができます。
        <br />
        ガイドの表示には、<Code>helper</Code> を使います。
      </p>
      <CodeBlock>{`helper.grid()`}</CodeBlock>
      <p>
        で、<Code>y = 0</Code> の<Code>x-z</Code>{" "}
        面にグリッドを表示することができます。
      </p>
      <CodeBlock>{`helper.axes()`}</CodeBlock>
      <p>軸を表示することができます。</p>
      <CodeBlock filename="main.js">
        {`const { camera, create, animate, controls, helper } = init();

controls.autoRotate = true
helper.grid()
helper.axes()
camera.position.set(-2, 2, 2)
create.ambientLight()
create.directionalLight()
create.cube()

animate()
`}
      </CodeBlock>
      <Ex3 />
    </div>
  );
}