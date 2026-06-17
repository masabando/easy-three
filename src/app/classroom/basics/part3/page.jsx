import { Code, Note } from "@/components/BaseKit";
import CodeBlock from "@/components/CodeBlock";
import H1 from "@/components/H1";
import H2 from "@/components/H2";
import H3 from "@/components/H3";
import { Ex1, Ex2, Ex3, Ex4, Ex5, Ex6, Ex7, Ex8, Ex9, Ex10 } from "./Codes";

export const metadata = {
  title: "球体・平面・角丸立方体などの表示",
};

export default function Page() {
  return (
    <div>
      <H1>3. 球体・平面・角丸立方体などの表示</H1>
      <p>
        このセクションでは、球体、平面、そして角丸の立方体を表示する方法を学びます。
      </p>

      <H2 className="mt-14">球体の表示</H2>
      <p>
        球体を表示するには、<Code>create.sphere()</Code> を使います。
      </p>
      <CodeBlock filename="main.js">
        {`const { camera, create, animate, controls, helper } = init();

controls.connect()
helper.grid()
helper.axes()
camera.position.set(-2, 2, 2)
create.ambientLight()
create.directionalLight()
create.sphere()

animate()
`}
      </CodeBlock>
      <Ex1 />

      <p>立方体と同様に、デフォルトでは原点 (0, 0, 0) に表示されます。</p>

      <H3 className="mt-10">サイズ、位置、色の変更</H3>
      <p>球体のサイズ、位置、色の変更も、立方体と同様にできます。</p>
      <CodeBlock filename="main.js">
        {`const { camera, create, animate, controls, helper } = init();

controls.connect()
helper.grid()
helper.axes()
camera.position.set(-2, 2, 2)
create.ambientLight()
create.directionalLight()
create.sphere({
  size: 0.5,
  position: [1, 1, 1],
  option: {
    color: 0xff0000,
  }
})

animate()
`}
      </CodeBlock>
      <Ex2 />

      <H3 className="mt-10">セグメント数の変更</H3>
      <p>
        球体のセグメント数を変更することもできます。
        <br />
        3Dの描画では、球体を表現するために多数の平面を使っています。
        <br />
        平面の数が多くなるほど、球体の表現が滑らかになります。
        <br />
        セグメント数とは、球体をどの程度平面に分割するかの数値です。
      </p>
      <CodeBlock>
        {`create.sphere({ segments: [横の分割数, 縦の分割数] })`}
      </CodeBlock>
      <p>もし横と縦の分割数が同じ場合は、次のように省略して記述できます。</p>
      <CodeBlock>{`create.sphere({ segments: 縦横の分割数 })`}</CodeBlock>
      <p>
        例えば、次のように記述すると、横4分割、縦2分割の球体が表示されます。
      </p>
      <CodeBlock filename="main.js">
        {`const { camera, create, animate, controls, helper } = init();

controls.connect()
helper.grid()
helper.axes()
camera.position.set(-2, 2, 2)
create.ambientLight()
create.directionalLight()
create.sphere({ segments: [4, 2] })

animate()
`}
      </CodeBlock>
      <Ex3 />
      <p>
        球がどのように分割されているかを確認するには、
        次のようにワイヤーフレーム表示にするとわかりやすいです。
      </p>
      <CodeBlock filename="main.js">
        {`const { camera, create, animate, controls, helper } = init();

controls.connect()
helper.grid()
helper.axes()
camera.position.set(-2, 2, 2)
create.ambientLight()
create.directionalLight()
create.sphere({
  segments: 10,
  option: {
    wireframe: true,
    color: 0x0000ff,
  },
})

animate()
`}
      </CodeBlock>
      <Ex4 />

      <H2 className="mt-14">平面の表示</H2>
      <p>
        平面を表示するには、<Code>create.plane()</Code> を使います。
      </p>
      <CodeBlock filename="main.js">
        {`const { camera, create, animate, controls, helper } = init();

controls.connect()
helper.grid()
helper.axes()
camera.position.set(-1, 1, 1)
create.ambientLight()
create.directionalLight()
create.plane()

animate()
`}
      </CodeBlock>
      <Ex5 />
      <p>
        立方体と同様に、デフォルトでは原点 (0, 0, 0) に表示されます。
        <br />
        向きは、<Code>x-z</Code> 平面になります。
      </p>

      <H3 className="mt-10">サイズ、位置、色の変更</H3>
      <p>平面のサイズ、位置、色の変更も、立方体と同様にできます。</p>
      <CodeBlock filename="main.js">
        {`const { camera, create, animate, controls, helper } = init();

controls.connect()
helper.grid()
helper.axes()
camera.position.set(-1, 1, 1)
create.ambientLight()
create.directionalLight()
create.plane({
  size: 1.5,
  position: [1, 0, 0],
  option: {
    color: 0xff0000,
  }
})

animate()
`}
      </CodeBlock>
      <Ex6 />

      <H3 className="mt-10">平面の回転</H3>
      <p>
        <Code>rotation</Code> を指定することで、平面を回転させることができます。
        <br />
        <Code>rotation</Code> は、<Code>[x, y, z]</Code> の配列で指定します。
        <br />
        回転角はラジアンで指定します (つまり、180度が <Code>Math.PI</Code>{" "}
        です)。
      </p>
      <p className="mt-4">
        例えば、x軸周りに <Code>-90</Code> 度回転させることで、
        <Code>x-z</Code> 平面上に平面を表示することができます。
      </p>
      <CodeBlock filename="main.js">
        {`const { camera, create, animate, controls, helper } = init();

controls.connect()
helper.grid()
helper.axes()
camera.position.set(-1, 1, 1)
create.ambientLight()
create.directionalLight()
create.plane({
  size: 1.5,
  rotation: [-Math.PI/2, 0, 0],
})

animate()
`}
      </CodeBlock>
      <Ex7 />

      <Note>
        回転は、平面以外のオブジェクト(立方体、球など)にも適用できます。
      </Note>

      <H2 className="mt-14">角丸の立方体の表示</H2>
      <p>
        立方体を作成するとき、<Code>rounded: true</Code>{" "}
        を指定することで、角丸の立方体を表示することができます。
        <br />
        <Code>segments</Code> で角丸の滑らかさを指定します。
        <br />
        <Code>radius</Code> で角丸の半径を指定します。
      </p>
      <CodeBlock filename="main.js">
        {`const { camera, create, animate, controls, helper } = init();

controls.connect()
helper.grid()
helper.axes()
camera.position.set(-1, 1, 1)
create.ambientLight()
create.directionalLight()
create.cube({
  rounded: true,
  segments: 7,
  radius: 0.1,
})

animate()
`}
      </CodeBlock>
      <Ex8 />

      <H2 className="mt-14">トーラスの表示</H2>
      <p>
        トーラスを表示するには、<Code>create.torus()</Code> を使います。
        <br />
        トーラスは、ドーナツのような形状です。
      </p>
      <p className="mt-4">
        <Code>tube</Code> に数値を指定することで、トーラスの太さを調整できます。
      </p>
      <CodeBlock filename="main.js">
        {`const { camera, create, animate, controls, helper } = init();

controls.connect()
helper.grid()
helper.axes()
camera.position.set(-1, 1, 1)
create.ambientLight()
create.directionalLight()
create.torus({ tube: 0.3 })

animate()
`}
      </CodeBlock>
      <Ex9 />

      <H2 className="mt-14">トーラス結び目の表示</H2>
      <p>
        トーラス結び目を表示するには、<Code>create.torusKnot()</Code>{" "}
        を使います。
        <br />
        トーラス結び目は、トーラスを結び目状にした形状です。
      </p>
      <p className="mt-4">
        <Code>tube</Code>{" "}
        に数値を指定することで、トーラス結び目の太さを調整できます。
      </p>
      <CodeBlock filename="main.js">
        {`const { camera, create, animate, controls, helper } = init();

controls.connect()
helper.grid()
helper.axes()
camera.position.set(-1, 1, 1)
create.ambientLight()
create.directionalLight()
create.torusKnot({ tube: 0.3 })

animate()
`}
      </CodeBlock>
      <Ex10 />
    </div>
  );
}