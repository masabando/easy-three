import { Note, Code } from "@/components/BaseKit";
import CodeBlock from "@/components/CodeBlock";
import { currentVersion } from "@/components/CurrentVersion";
import H1 from "@/components/H1";
import H2 from "@/components/H2";
import H3 from "@/components/H3";
import { Ex1, Ex2, Ex3, Ex4 } from "./Codes";

export const metadata = {
  title: "プログラムの基礎と立方体の表示",
};

export default function Page() {
  return (
    <div>
      <H1>1. プログラムの基礎と立方体の表示</H1>
      <p>
        このセクションでは、easy-threeライブラリを使用して、シンプルな立方体を表示する方法を学びます。
        <br />
        以下のサンプルコードを使って、基本的な3D描画の手法を理解しましょう。
      </p>

      <H2 className="mt-14">サンプルコードを開く</H2>
      <Code>index.html</Code>
      というファイルを作成し、以下のコードを記述してください。
      <CodeBlock language="html" filename="index.html">
        {`<!DOCTYPE html>
<html lang="ja">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>easy-three template</title>
  <script type="importmap">
    {
      "imports": {
        "three": "https://cdn.jsdelivr.net/npm/three@0.185.1/build/three.module.js",
        "three/addons/": "https://cdn.jsdelivr.net/npm/three@0.185.1/examples/jsm/",
        "@pixiv/three-vrm": "https://cdn.jsdelivr.net/npm/@pixiv/three-vrm@3/lib/three-vrm.module.min.js",
        "@masabando/easy-three": "https://cdn.jsdelivr.net/gh/masabando/easy-three@${currentVersion}/dist/easy-three.js"
      }
    }
  </script>
</head>

<body>
  <script type="module" src="./main.js"></script>
</body>

</html>
`}
      </CodeBlock>
      <p>
        同じ場所に、 <Code>main.js</Code> というファイルを作成し、以下のコードを記述してください。
      </p>
      <CodeBlock language="javascript" filename="main.js">
        {`import { init } from "@masabando/easy-three";
const { camera, create, animate } = init();

camera.position.set(-2, 2, 2)
create.ambientLight()
create.directionalLight()
create.cube()

animate()
`}
      </CodeBlock>
      <p>
        このコードは、easy-threeライブラリを使って立方体を表示するための小さなコードです。
        <br />
        このコードを実行してみましょう。
      </p>
      <p className="mt-4">
        VSCodeであれば、VSCodeの右下にある「Go
        Live」ボタンをクリックするとWebブラウザに立方体が表示されます。
      </p>
      <p className="mt-4">
        Pythonであれば、<span>index.html</span>
        があるフォルダで以下のコマンドを実行し、ターミナルに表示されたURLにアクセスしてください。
      </p>
      <CodeBlock language="bash">{`python -m http.server`}</CodeBlock>
      <p>
        Node.jsであれば、<span>index.html</span>
        があるフォルダで以下のコマンドを実行し、ターミナルに表示されたURLにアクセスしてください。
      </p>
      <CodeBlock language="bash">{`npx http-server`}</CodeBlock>
      <p>
        ローカルサーバを使用しない場合、<span>index.html</span>
        ファイルをWebブラウザにドラッグ＆ドロップしてください。
      </p>
      <Ex1 />



      <H2 className="mt-14">テンプレート部分とプログラム部分</H2>
      <p>
        上のサンプルコードで、 大切な部分は <Code>main.js</Code> の以下の部分だけになります。
      </p>
      <CodeBlock filename="main.js">
        {`const { camera, create, animate } = init();

camera.position.set(-2, 2, 2)
create.ambientLight()
create.directionalLight()
create.cube()

animate()
`}
      </CodeBlock>
      <p>
        そのため、今後の解説ではテンプレートのその他の部分は省略し、 上記のように
        <Note>プログラムを書く部分だけを表示・解説</Note>します。
      </p>
      <H2 className="mt-14">プログラムの概要</H2>
      <p>
        3Dの描画は、3次元の座標を使ってオブジェクトやカメラなどを配置することで行います。
        <br />
        つまり、x座標、y座標、z座標を指定することになります。
      </p>
      <p className="mt-4">
        通常<Note>x軸は左右、y軸は上下、z軸は前後</Note>を表しますが、
        カメラを動かすことで見え方は変わります。
      </p>
      <p className="mt-4">easy-threeでは基本的にプログラムを</p>
      <CodeBlock>{`オブジェクトやグループ.すること(指定すること)`}</CodeBlock>
      <p>あるいは</p>
      <CodeBlock>{`一連の処理(指定すること)`}</CodeBlock>
      <p>のような形で記述します。</p>
      <p className="mt-4">特に、なにかを作り出すときは</p>
      <CodeBlock>{`create.何か()`}</CodeBlock>
      <p>のように記述します。</p>

      <H2 className="mt-14">カメラの設置</H2>
      <p>3Dの描画では、空間上の視点をカメラで設定することが重要です。</p>
      <CodeBlock>{`camera.position.set(-2, 2, 2)`}</CodeBlock>
      <p>
        このコードは、
        <Note>
          カメラ(camera)の位置(position)を <Code>x=-2</Code>, <Code>y=2</Code>,{" "}
          <Code>z=2</Code> の位置に設定(set)
        </Note>
        しています。
      </p>
      <p className="mt-4">
        カメラは原点(0, 0, 0)を見るように設定されてるため、
        カメラは自分の右前ななめ下を見ています。
      </p>

      <H3 className="mt-10">やってみよう</H3>
      <p>
        カメラの位置を変更して、立方体がどのように表示されるか確認してみましょう。
        <br />
        例えば、カメラの位置を <Code>(-3, -3, 5)</Code> に変更してみましょう。
      </p>
      <p className="mt-4">
        変更後は、保存すると自動的にブラウザが更新され、立方体が新しい位置で表示されます。
        <br />
        (自動的に更新されない場合は、ブラウザを再読み込みしてください。)
      </p>
      <Ex2 />



      <H2 className="mt-14">環境光と指向性光</H2>
      <p>
        3Dの描画では、環境光と指向性光を設定することで、
        オブジェクトの立体感や影を表現することができます。
        <br />
        現実の世界と同じで、光がないと物体は黒く見えます。
      </p>
      <p className="mt-4">
        <Note>環境光とは、全体をまんべんなく照らす光</Note>です。
        <br />
        現実でも、部屋の電気が消えていても外からの光が入ってくるため、真っ暗にはなりません。
        <br />
        このような光を環境光と言います。
      </p>
      <p className="mt-4">環境光を作るには、以下のようにします。</p>
      <CodeBlock>{`create.ambientLight()`}</CodeBlock>
      <p>環境光では影はできません。</p>
      <p className="mt-4">
        <Note>指向性光とは、特定の方向からのまっすぐな光</Note>です。
        <br />
        例えば、太陽光や蛍光灯の光などが指向性光です。
        <br />
        指向性光は、向きがあるため、光があたっていない部分は影になります。
      </p>
      <p className="mt-4">指向性光を作るには、以下のようにします。</p>
      <CodeBlock>{`create.directionalLight()`}</CodeBlock>
      <p>指向性光では影ができます。</p>
      <p className="mt-4">どちらの光も、<Note>光の強さ(intensity)を指定することができます</Note>。</p>
      <CodeBlock>{`create.ambientLight({ intensity: 2 })`}</CodeBlock>
      <CodeBlock>{`create.directionalLight({ intensity: 2 })`}</CodeBlock>
      <p>また、指向性光の位置(position)を変更することもできます。</p>
      <CodeBlock>{`create.directionalLight({ position: [10, 10, -10] })`}</CodeBlock>
      <p>
        指向性光の位置と強さを両方変更するには、これらの指定をカンマで区切って記述します。
      </p>
      <CodeBlock>{`create.directionalLight({ intensity: 2, position: [10, 10, -10] })`}</CodeBlock>
      <p>あるいは、改行して記述することもできます。</p>
      <CodeBlock>{`create.directionalLight({
  intensity: 2,
  position: [10, 10, -10]
})`}</CodeBlock>

      <H3 className="mt-10">やってみよう</H3>
      <p>
        環境光の強さ、指向性光の強さと位置を変更して、
        立方体がどのように表示されるか確認してみましょう。
        <br />
        例えば、環境光の強さを <Code>0.1</Code> に、 指向性光の強さを{" "}
        <Code>3</Code> に, 指向性光の位置を <Code>[-5, 5, -5]</Code>{" "}
        に変更してみましょう。
      </p>
      <Ex3 />



      <H2 className="mt-14">立方体の表示</H2>
      <p>立方体を作り出すには、以下のようにします。</p>
      <CodeBlock>{`create.cube()`}</CodeBlock>
      <p>立方体は、デフォルトでは中心が原点(0, 0, 0)、サイズが1になります。</p>

      <H3 className="mt-10">サイズと位置の変更</H3>
      <p>立方体のサイズを変更するには、次のようにします。</p>
      <CodeBlock>{`create.cube({ size: 2 })`}</CodeBlock>
      <p>このコードは、サイズが2の立方体を作り出します。</p>
      <p className="mt-4">立方体の位置を変更するには、次のようにします。</p>
      <CodeBlock>{`create.cube({ position: [1, 1, 1] })`}</CodeBlock>
      <p>このコードは、位置が(1, 1, 1)の立方体を作り出します。</p>
      <p className="mt-4">
        サイズと位置を両方変更するときは、これらの指定をカンマで区切って記述します。
      </p>
      <CodeBlock>{`create.cube({ size: 2, position: [1, 1, 1] })`}</CodeBlock>
      <p>このコードは、サイズが2で位置が(1, 1, 1)の立方体を作り出します。</p>
      <p className="mt-4">
        プログラムは意味が変わらない範囲で改行ができます。
        <br />
        2つ以上のものを変更するときは、次のように改行したほうが分かりやすいでしょう。
      </p>
      <CodeBlock>{`create.cube({
  size: 2,
  position: [1, 1, 1]
})`}</CodeBlock>
      <H3 className="mt-10">色の変更</H3>
      <p>立方体の色を変更するには、次のようにします。</p>
      <CodeBlock>{`create.cube({
  option: { color: "red" }
})`}</CodeBlock>
      <p>
        このコードは、赤色の立方体を作り出します。
        <br />
        このように、色は英語の名前でしていすることができますが、
        <Note>16進数で指定することもできます</Note>。<br />
        16進数で指定するときは、<Code>0x</Code> を先頭に付けて、
        <Code>0xff0000</Code> のように記述します。
        2桁ずつ、赤、緑、青の順に指定します。
      </p>
      <CodeBlock>{`create.cube({
  option: { color: 0xff0000 }
})`}</CodeBlock>
      <p>
        このコードは、赤色の立方体を作り出します。
        あるいは、次のように記述することもできます。
      </p>
      <CodeBlock>{`create.cube({
  option: { color: "#ff0000" }
})`}</CodeBlock>
      <p>
        色については、
        <a className="text-blue-500 underline" href="https://www.colordic.org" target="_blank" rel="noreferrer">
          WEB色見本 原色大辞典
        </a>{" "}
        などのサイトで色を調べることができます。
      </p>

      <H3 className="mt-10">直方体の作成</H3>
      <p>3辺の長さを変えることで、立方体ではなく直方体を作ることもできます。</p>
      <CodeBlock>{`create.cube({ size: [2, 3, 4] })`}</CodeBlock>
      <p>
        このコードは、x軸方向に2、y軸方向に3、z軸方向に4の直方体を作り出します。
      </p>
      <p className="mt-4">
        <Code>create.cube</Code>は何度でも呼び出すことができます。
        <br />
        呼び出した分だけ立方体や直方体が表示されます。
      </p>

      <H3 className="mt-10">やってみよう</H3>
      <p>
        赤、緑、青の立方体または直方体をそれぞれ作成して、
        それぞれの位置やサイズを変えて表示してみましょう。
        <br />
        赤は <Code>"red"</Code> または <Code>0xff0000</Code> 、 緑は{" "}
        <Code>"green"</Code> または <Code>0x00ff00</Code> 、 青は{" "}
        <Code>"blue"</Code> または <Code>0x0000ff</Code> で指定します。
      </p>
      <Ex4 />
      

      <H2 className="mt-14">初期化</H2>
      <p>
        ここまでの内容で、カメラの位置、環境光、指向性光、立方体の表示を行いました。<br />
        このセクションの最後に、プログラムの1行目と最終行について説明します。
      </p>
      <CodeBlock filename="main.js">
        {`const { camera, create, animate } = init();

camera.position.set(-2, 2, 2)
create.ambientLight()
create.directionalLight()
create.cube()

animate()
`}
      </CodeBlock>
      <p>
        1行目の
      </p>
      <CodeBlock>{`const { camera, create, animate } = init();`}</CodeBlock>
      <p>
        は、easy-threeライブラリを初期化して、
        カメラ(camera)、オブジェクト等を作成するためのオブジェクト(create)、
        アニメーション(animate)を行うための関数を取得しています。
      </p>
      <p className="mt-4">
        簡単に言うと、この1行目は「<Note>プログラム中でつかうものを用意する</Note>」行です。<br />
        今回は、カメラ、オブジェクト、アニメーションを使うために、
        <Code>camera</Code>、<Code>create</Code>、<Code>animate</Code> を用意しています。
      </p>
      <p className="mt-4">
        最終行の
      </p>
      <CodeBlock>{`animate()`}</CodeBlock>
      <p>
        は、アニメーションを開始するための関数です。
        <br />
        この関数を呼び出すことで、アニメーションが開始されます。
      </p>
      <p className="mt-4">
        原則として <Code>animate</Code> は必ず最後に呼び出すようにします。
      </p>
    </div>
  );
}

