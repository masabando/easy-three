import { Code } from "@/components/BaseKit";
import CodeBlock from "@/components/CodeBlock";
import H1 from "@/components/H1";
import H2 from "@/components/H2";
import { Ex1, Ex2, Ex3 } from "./Codes";

export const metadata = {
  title: "面の変形",
};

export default function Page() {
  return (
    <div>
      <H1>6. 面の変形</H1>
      <p>
        このセクションでは、面の変形を学びます。
        <br />
        面を変形させることで、波打つような表現などが可能になります。
      </p>

      <H2 className="mt-14">面の変形</H2>
      <p>
        面の変形は、頂点の座標を変更することで行います。
        <br />
        3Dでの形は、たくさんの面が集まってできていますが、
        それぞれの面は頂点で構成されています。
        <br />
        そのため、頂点の座標を変更することで、面の形状を変えることができます。
      </p>

      <p className="mt-4">
        頂点の座標を扱うには、オブジェクトのgeometry属性のattributes.positionを使います。
      </p>
      <CodeBlock>{`const position = オブジェクト.geometry.attributes.position`}</CodeBlock>
      <p>
        こうして得られた<Code>position</Code>は、各頂点の座標を保持しています。
        <br />
        <Code>i</Code> 番目の頂点のx座標を取得するには、
      </p>
      <CodeBlock>{`const x = position.getX(i)`}</CodeBlock>
      <p>
        とします。
        <br />
        また、<Code>i</Code> 番目の頂点のx座標を変更するには、
      </p>
      <CodeBlock>{`position.setX(i, 値)`}</CodeBlock>
      <p>
        とします。
        <br />
        頂点の座標を変更したら、<Code>position.needsUpdate = true</Code>{" "}
        を記述することで変更を反映させます。
        <br />
        環境マップなどの反射を使う場合は、さらに <Code>オブジェクト.geometry.computeVertexNormals()</Code>{" "}
        で法線を再計算する必要があります。
      </p>
      <CodeBlock>{`position.needsUpdate = true
オブジェクト.geometry.computeVertexNormals()
`}</CodeBlock>
      <p>
        また、<Code>position.count</Code> で頂点の数を取得できます。
      </p>
      <p className="mt-4">
        これを使うと、例えばx座標の値に応じてz座標を変えることができます。
        <br />
        <Code>segments</Code> を指定することを忘れないようにしましょう。
        <Code>plane</Code>はデフォルトでは<Code>segments: 1</Code>
        になっているので、波打つことができません。
        <br />
        また、フラットシェーディングを有効にすることで、
        面の位置の変化をよりわかりやすくしています。
      </p>

      <CodeBlock filename="index.html">
        {`const { camera, create, animate, controls } = init()

controls.connect()
camera.position.set(-6, 6, 6)

create.ambientLight()
create.directionalLight()

const plane = create.plane({
  size: 10,
  segments: 30,
  option: {
    flatShading: true,
  },
})
const position = plane.geometry.attributes.position

animate(({ time }) => {
  for (let i = 0; i < position.count; i++) {
    const x = position.getX(i)
    position.setZ(i, Math.sin(x + time))
  }
  position.needsUpdate = true
})
`}
      </CodeBlock>
      <Ex1 />


      <CodeBlock filename="index.html">
        {`const { camera, create, animate, controls } = init()

controls.connect()
camera.position.set(--6, 6, 6)

create.ambientLight()
create.directionalLight()

const plane = create.plane({
  size: 10,
  segments: 30,
  option: {
    flatShading: true,
  }
})
const position = plane.geometry.attributes.position

animate(({ time }) => {
  for (let i = 0; i < position.count; i++) {
    const x = position.getX(i)
    const y = position.getY(i)
    position.setZ(i, Math.sin(x + time) * Math.cos(y + time))
  }
  position.needsUpdate = true
})
`}
      </CodeBlock>
      <Ex2 />


      <p>
        背景を入れると、よりリアルな感じになります。
      </p>

      <Ex3 />

    </div>
  );
}
