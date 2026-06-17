import { Code, Note } from "@/components/BaseKit";
import CodeBlock from "@/components/CodeBlock";
import H1 from "@/components/H1";
import H2 from "@/components/H2";
import H3 from "@/components/H3";
import { Ex1, Ex2, Ex3, Ex4, Ex5, Ex6, Ex7, Ex8 } from "./Codes";

export const metadata = {
  title: "様々なマテリアル",
};

export default function Page() {
  return (
    <div>
      <H1>5. 様々なマテリアル</H1>
      <p>
        このセクションでは、3Dで利用できる様々な材質 (マテリアル) を学びます。
      </p>

      <H2 className="mt-14">マテリアルの変更方法</H2>
      <p>
        3Dオブジェクトの見た目を変更するには、マテリアルを変更します。
        <br />
        <Note>マテリアルは、オブジェクトに色や質感を与えるもの</Note>です。
        <br />
        マテリアルを変更するには、オブジェクトの作成時に <Code>
          material
        </Code>{" "}
        を指定します。
      </p>
      <CodeBlock>{`create.cube({ material: "マテリアル名" })`}</CodeBlock>
      <p>
        デフォルトでは、<Code>"Physical"</Code> が設定されています。
        <br />
        使用できる主なマテリアルは、次の通りです。
      </p>
      <ul className="list-disc list-inside ml-4 my-4">
        <li>
          <Code>Basic</Code> :
          光の影響を受けない、単色のマテリアル。とても軽い。
        </li>
        <li>
          <Code>Phong</Code> : 光沢感のあるマテリアル。軽い。
        </li>
        <li>
          <Code>Lambert</Code> : マットな質感のマテリアル。軽い。
        </li>
        <li>
          <Code>Standard</Code> : 物理ベースの(よりリアル感のある)マテリアル。
        </li>
        <li>
          <Code>Physical</Code> : Standard マテリアルを拡張したマテリアル。
        </li>
        <li>
          <Code>Toon</Code> : トゥーンシェーディング(3Dアニメ調)のマテリアル。
        </li>
        <li>
          <Code>Normal</Code> : 法線マップを使ったマテリアル。
        </li>
      </ul>
      <p>
        <Note>
          基本的にはデフォルトの <Code>Physical</Code> を使えば
          マットな質感から光沢感、ガラス表現など全て問題ありません。
        </Note>
        <br />
        ただし、<Code>Physical</Code>マテリアルは重いので、
        オブジェクトの数が大量になる場合は他のマテリアルを検討してください。
      </p>

      <H2 className="mt-14">Basic マテリアル</H2>
      <p>
        <Note>Basicマテリアルは、 光の影響を受けない単色のマテリアル</Note>
        です。
        <br />
        とても軽いので、大量のオブジェクトにも適しています。
      </p>
      <p className="mt-4">
        下のコードは、左側に Physical マテリアル、右側に Basic
        マテリアルの立方体を表示するものですが、光を入れていません。
        <br />
        左の Physical マテリアルは光の影響を受けますが光がないため真っ暗です。
        <br />
        一方、右の Basic マテリアルは光の影響を受けず、単色で表示されます。
      </p>
      <CodeBlock filename="index.html">
        {`const { camera, create, animate, controls, helper } = init();

controls.connect()
helper.grid()
helper.axes()
camera.position.set(0, 2, 2)
const physicalCube = create.cube({ position: [-1, 0, 0] })
const basicCube = create.cube({ material: "Basic", position: [1, 0, 0] })

animate(({ delta }) => {
  physicalCube.rotation.x += delta
  physicalCube.rotation.y += delta
  basicCube.rotation.x += delta
  basicCube.rotation.y += delta
})
`}
      </CodeBlock>
      <Ex1 />

      <p>ここで、光を入れてみましょう。</p>
      <CodeBlock filename="index.html">
        {`const { camera, create, animate, controls, helper } = init();

controls.connect()
helper.grid()
helper.axes()
camera.position.set(0, 2, 2)
create.ambientLight()
create.directionalLight()
const physicalCube = create.cube({ position: [-1, 0, 0] })
const basicCube = create.cube({ material: "Basic", position: [1, 0, 0] })

animate(({ delta }) => {
  physicalCube.rotation.x += delta
  physicalCube.rotation.y += delta
  basicCube.rotation.x += delta
  basicCube.rotation.y += delta
})
`}
      </CodeBlock>
      <Ex2 />

      <p>
        Physical マテリアルは光の影響を受けるため、光を入れると立体感が出ます。
        <br />
        一方、Basic
        マテリアルは光の影響を受けないため、立体感があまり感じられません。
      </p>

      <H2 className="mt-14">Phong マテリアル</H2>
      <p>
        <Note>Phongマテリアルは、光沢感のあるマテリアル</Note>
        です。
        <br />
        Basic マテリアルよりも光の反射がリアルになりますが、 Physical
        マテリアルや Standard マテリアルよりもクオリティは低くなります。
      </p>
      <p className="mt-4">
        Phong マテリアルで光沢感を出すには、
        <Code>option</Code> の <Code>shininess</Code> を 指定します。
      </p>
      <p className="mt-4">
        下のコードは、左側に Physical マテリアル、右側に Phong
        マテリアルの立方体を表示するものです。
      </p>
      <CodeBlock filename="index.html">
        {`const { camera, create, animate, controls, helper } = init();

controls.connect()
helper.grid()
helper.axes()
camera.position.set(0, 3, 3)
create.ambientLight()
create.directionalLight()
create.sphere({
  position: [-2, 0, 0],
  option: {
    color: "blue",
    metalness: 0.6,
    roughness: 0.3,
  }
})
create.sphere({
  material: "Phong",
  position: [2, 0, 0],
  option: {
    color: "blue",
    shininess: 90,
  }
})

animate()
`}
      </CodeBlock>
      <Ex3 />

      <H2 className="mt-14">Lambert マテリアル</H2>
      <p>
        <Note>Lambertマテリアルは、マットな質感のマテリアル</Note>
        です。
        <br />
        Phong マテリアルよりも質感がマットで、光の反射が少ないです。
      </p>
      <p className="mt-4">
        下のコードは、左側に Physical マテリアル、右側に Lambert
        マテリアルの立方体を表示するものです。
      </p>
      <CodeBlock filename="index.html">
        {`const { camera, create, animate, controls, helper } = init();

controls.connect()
helper.grid()
helper.axes()
camera.position.set(0, 3, 3)
create.ambientLight()
create.directionalLight()
create.sphere({ position: [-2, 0, 0] })
create.sphere({ material: "Lambert", position: [2, 0, 0] })

animate()
`}
      </CodeBlock>
      <Ex4 />

      <H2 className="mt-14">Standard マテリアル</H2>
      <p>
        <Note>Standardマテリアルは、物理ベースのマテリアル</Note>
        です。
        <br />
        Basic マテリアルや Phong マテリアル、Lambert
        マテリアルよりもリアル感があります。
        <br />
        利用方法はほぼ Physical マテリアルと同じなので割愛します。
      </p>

      <H2 className="mt-14">Physical マテリアル</H2>
      <p>
        <Note>
          Physicalマテリアルは、Standardマテリアルを拡張したマテリアル
        </Note>
        です。
        <br />
        Standard
        マテリアルよりもリアル感があり、さらにガラス表現なども可能です。
        <br />
        ただし、重いのでオブジェクトの数が大量になる場合は他のマテリアルを検討してください。
      </p>

      <H3 className="mt-10">金属感と粗さを調整する</H3>
      <p>
        Physical マテリアルでは、<Code>option</Code> の<Code>metalness</Code>{" "}
        で金属感を、
        <Code>roughness</Code> で粗さを調整できます。
      </p>
      <p>
        下のコードは、左側に金属感を強く、粗さを少なくした球体、中央に標準的な球体、
        右側に金属感を少なく、粗さを強くした球体を表示するものです。
      </p>
      <CodeBlock filename="index.html">
        {`const { camera, create, animate, controls, helper } = init();

controls.connect()
helper.grid()
helper.axes()
camera.position.set(0, 3, 3)
create.ambientLight()
create.directionalLight()
create.sphere({
  position: [-2.5, 0, 0],
  option: {
    color: "blue",
    metalness: 0.7,
    roughness: 0.2,
  }
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
  }
});

animate()
`}
      </CodeBlock>
      <Ex5 />

      <H3 className="mt-10">ガラスのような表現</H3>
      <p>
        Physical マテリアルでは、<Code>option</Code> の<Code>transmission</Code>{" "}
        で透明度を調整できます。
        <br />
        また、<Code>thickness</Code>{" "}
        を上げることで、屈折率を上げることができます。
      </p>
      <p className="mt-4">
        下のコードは、手前にガラスのような立方体、奥に標準的な立方体を表示するものです。
        <br />
        奥の立方体が屈折して見えるのがわかります。
      </p>
      <CodeBlock filename="index.html">
        {`const { camera, create, animate, controls, helper } = init();

controls.connect()
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
`}
      </CodeBlock>
      <Ex6 />

      <H2 className="mt-14">Toon マテリアル</H2>
      <p>
        <Note>Toonマテリアルは、3Dアニメ調のマテリアル</Note>
        です。
      </p>
      <p className="mt-4">
        下のコードは、左側に Physical マテリアル、右側に Toon
        マテリアルのトーラス結び目を表示するものです。
      </p>
      <CodeBlock filename="index.html">
        {`const { camera, create, animate, controls, helper } = init();

controls.connect()
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
`}
      </CodeBlock>
      <Ex7 />

      <H2 className="mt-14">Normal マテリアル</H2>
      <p>
        <Note>Normalマテリアルは、法線マップを使ったマテリアル</Note>
        です。
        <br />
        法線マップは、オブジェクトの凹凸を表現するために使用されます。
        <br />
        Normal マテリアルを使うことで、面がどの方向を向いているかがわかりやすくなります。
        <br />
        x軸方向を向いている面は赤、y軸方向を向いている面は緑、z軸方向を向いている面は青で表示されます。
      </p>
      <p className="mt-4">
        下のコードは、左側に Physical マテリアル、右側に Normal
        マテリアルの立方体を表示するものです。
      </p>
      <CodeBlock filename="index.html">
        {`const { camera, create, animate, controls, helper } = init();

controls.connect()
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
`}
      </CodeBlock>
      <Ex8 />
    </div>
  );
}
