import { Code, Note } from "@/components/BaseKit";
import CodeBlock from "@/components/CodeBlock";
import H1 from "@/components/H1";
import H2 from "@/components/H2";
import H3 from "@/components/H3";
import { Ex1, Ex2, Ex3 } from "./Codes";

export const metadata = {
  title: "背景とアニメーションの基礎",
};

export default function Page() {
  return (
    <div>
      <H1>4. 背景とアニメーションの基礎</H1>
      <p>
        このセクションでは、背景色の変更と、アニメーションの基本的な使い方を学びます。
      </p>

      <H2 className="mt-14">背景色の変更</H2>
      <p>
        デフォルトでは、背景色は透明です。
        <br />
        Webページの基本色が白なので、これまでは背景が白く見えていました。
        <br />
        背景色を変更するには、次のように<Code>scene.background</Code>{" "}
        に色を指定します。
      </p>
      <CodeBlock>{`scene.background = color(色)`}</CodeBlock>
      <p>例えば背景を黒にするには、次のように記述します。</p>
      <CodeBlock filename="main.js">
        {`const { camera, create, animate, controls, helper, color, scene } = init();

scene.background = color("black")
controls.connect()
helper.grid()
helper.axes()
camera.position.set(-2, 2, 2)
create.ambientLight()
create.directionalLight()
create.cube()

animate()
`}
      </CodeBlock>
      <Ex1 />

      <H2 className="mt-14">アニメーションの基礎</H2>
      <p>
        <Code>animate</Code>の引数で、アニメーションの処理を記述できます。
      </p>

      <H3 className="mt-10">アニメーションしたいオブジェクトを変数に入れる</H3>
      <p>
        <Note>アニメーションしたいオブジェクトを変数に入れておく</Note>ことで、
        アニメーション処理の中でそのオブジェクトを操作できます。
      </p>
      <CodeBlock>{`const myCube = create.cube()`}</CodeBlock>
      <p>
        ここで、<Code>myCube</Code> は変数名であり、 自由に名前を付けられます
        (半角英字のみ)。
      </p>

      <H3 className="mt-10">アニメーションする</H3>
      <p>
        <Code>animate</Code>の引数を次のようにします。
      </p>
      <CodeBlock>{`animate(({ delta, time }) => {
  // ここでアニメーション処理を記述
})`}</CodeBlock>
      <p>
        ここで、<Note>
          <Code>delta</Code> は前回のフレームからの経過時間(秒)、
          <Code>time</Code> はアニメーション開始からの経過時間(秒)
        </Note>です。<br />
        使用しない場合は省略できます。
      </p>
      <p className="mt-4">例えば、次のように記述すると立方体がx軸周りに回転します。</p>
      <CodeBlock filename="main.js">
        {`const { camera, create, animate, controls, helper } = init();

controls.connect()
helper.grid()
helper.axes()
camera.position.set(-2, 2, 2)
create.ambientLight()
create.directionalLight()
const cube = create.cube()
animate(({ delta }) => {
  cube.rotation.x += delta
})
`}
      </CodeBlock>
      <Ex2 />

      <H3 className="mt-10">オブジェクトの位置を変更する</H3>
      <p>
        オブジェクトの位置を変更するには、<Code>position.set</Code> を使います。<br />
        三角関数 (<Code>Math.sin</Code>, <Code>Math.cos</Code>) を使うと、
        オブジェクトを波打たせることができます。
      </p>
      <CodeBlock filename="main.js">
        {`const { camera, create, animate, controls, helper } = init();

controls.connect()
helper.grid()
helper.axes()
camera.position.set(-2, 2, 2)
create.ambientLight()
create.directionalLight()
const cube = create.cube()
animate(({ delta, time }) => {
  cube.rotation.x += delta
  cube.rotation.y += delta
  cube.position.set(0, 0, Math.sin(time) * 2)
})
`}
      </CodeBlock>
      <Ex3 />
    </div>
  );
}