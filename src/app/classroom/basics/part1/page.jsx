"use client";
import { EasyThreeBox, Note } from "@/components/BaseKit";
import CodeBlock from "@/components/CodeBlock";
import { init } from "@dist/easy-three";
import { currentVersion } from "@/components/CurrentVersion";

export default function Page() {
  return (
    <div className="classroomPart">
      <h2>1. プログラムの基礎と立方体の表示</h2>
      <p>
        このセクションでは、easy-threeライブラリを使用して、シンプルな立方体を表示する方法を学びます。
        <br />
        以下のサンプルコードを使って、基本的な3D描画の手法を理解しましょう。
      </p>
      <h3>サンプルコードを開く</h3>
      <code>index.html</code>
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
        "three": "https://cdn.jsdelivr.net/npm/three@0.170.0/build/three.module.js",
        "three/addons/": "https://cdn.jsdelivr.net/npm/three@0.170.0/examples/jsm/",
        "@pixiv/three-vrm": "https://cdn.jsdelivr.net/npm/@pixiv/three-vrm@3/lib/three-vrm.module.min.js",
        "easy-three": "https://cdn.jsdelivr.net/gh/masabando/easy-three@${currentVersion}/dist/easy-three.js"
      }
    }
  </script>
</head>

<body>
  <script type="module">
    import { init } from "easy-three";
    const { camera, create, animate } = init();

    camera.position.set(-2, 2, 2)
    create.ambientLight()
    create.directionalLight()
    create.cube()

    animate()
  </script>
</body>

</html>
`}
      </CodeBlock>
      <p>
        このコードは、easy-threeライブラリを使って立方体を表示するための小さなコードです。
        <br />
        このコードを実行してみましょう。
      </p>
      <p>
        VSCodeであれば、VSCodeの右下にある「Go
        Live」ボタンをクリックするとWebブラウザに立方体が表示されます。
      </p>
      <p>
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
      <EasyThreeBox
        effect={(r) => {
          const { camera, create, animate, destroy } = init(r);
          camera.position.set(-2, 2, 2);
          create.ambientLight();
          create.directionalLight();
          create.cube();
          animate();
          return {
            destroy: () => {
              destroy();
            }
          };
        }}
      />
      <h3>テンプレート部分とプログラム部分</h3>
      <p>
        サンプルコードは一見長いように見えますが、
        実際のところほとんどの部分はコピー＆ペーストで使用できるテンプレートです。
      </p>
      <p>
        <Note>
          実際にプログラムを書く部分は、下の「ここでプログラムを書く」部分だけ
        </Note>
        になります。
      </p>
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
        "three": "https://cdn.jsdelivr.net/npm/three@0.170.0/build/three.module.js",
        "three/addons/": "https://cdn.jsdelivr.net/npm/three@0.170.0/examples/jsm/",
        "@pixiv/three-vrm": "https://cdn.jsdelivr.net/npm/@pixiv/three-vrm@3/lib/three-vrm.module.min.js",
        "easy-three": "https://cdn.jsdelivr.net/gh/masabando/easy-three@0.0.14/dist/easy-three.js"
      }
    }
  </script>
</head>

<body>
  <script type="module">
    import { init } from "easy-three";

    // ここでプログラムを書く

  </script>
</body>

</html>
`}
      </CodeBlock>
      <p>
        つまり、上のサンプルコードで、 大切な部分は以下の部分だけになります。
      </p>
      <CodeBlock filename="index.html">
        {`const { camera, create, animate } = init();

camera.position.set(-2, 2, 2)
create.ambientLight()
create.directionalLight()
create.cube()

animate()
`}
      </CodeBlock>
      <p>
        そのため、今後の解説ではテンプレート部分は省略し、 上記のように
        <Note>プログラムを書く部分だけを表示・解説</Note>します。
      </p>
      <h3>プログラムの概要</h3>
      <p>
        3Dの描画は、3次元の座標を使ってオブジェクトやカメラなどを配置することで行います。
        <br />
        つまり、x座標、y座標、z座標を指定することになります。
      </p>
      <p>
        通常<Note>x軸は左右、y軸は上下、z軸は前後</Note>を表しますが、
        カメラを動かすことで見え方は変わります。
      </p>
      <p>easy-threeでは基本的にプログラムを</p>
      <CodeBlock>{`オブジェクトやグループ.すること(指定すること)`}</CodeBlock>
      <p>あるいは</p>
      <CodeBlock>{`一連の処理(指定すること)`}</CodeBlock>
      <p>のような形で記述します。</p>
      <p>特に、なにかを作り出すときは</p>
      <CodeBlock>{`create.何か()`}</CodeBlock>
      <p>のように記述します。</p>
      <h3>カメラの設置</h3>
      <p>3Dの描画では、空間上の視点をカメラで設定することが重要です。</p>
      <CodeBlock>{`camera.position.set(-2, 2, 2)`}</CodeBlock>
      <p>
        このコードは、
        <Note>
          カメラ(camera)の位置(position)を <code>x=-2</code>, <code>y=2</code>,{" "}
          <code>z=2</code> の位置に設定(set)
        </Note>
        しています。
      </p>
      <p>
        カメラは原点(0, 0, 0)を見るように設定されてるため、
        カメラは自分の右前ななめ下を見ています。
      </p>
      <h4>やってみよう</h4>
      <p>
        カメラの位置を変更して、立方体がどのように表示されるか確認してみましょう。
        <br />
        例えば、カメラの位置を <code>(-3, -3, 5)</code> に変更してみましょう。
      </p>
      <p>
        変更後は、保存すると自動的にブラウザが更新され、立方体が新しい位置で表示されます。
        <br />
        (自動的に更新されない場合は、ブラウザを再読み込みしてください。)
      </p>
      <EasyThreeBox
        effect={(r) => {
          const { camera, create, animate, destroy } = init(r);
          camera.position.set(-3, -3, 5);
          create.ambientLight();
          create.directionalLight();
          create.cube();
          animate();
          return {
            destroy: () => {
              destroy();
            },
          };
        }}
      />
      <h3>環境光と指向性光</h3>
      <p>
        3Dの描画では、環境光と指向性光を設定することで、
        オブジェクトの立体感や影を表現することができます。
        <br />
        現実の世界と同じで、光がないと物体は黒く見えます。
      </p>
      <p>
        <Note>環境光とは、全体をまんべんなく照らす光</Note>です。
        <br />
        現実でも、部屋の電気が消えていても外からの光が入ってくるため、真っ暗にはなりません。
        <br />
        このような光を環境光と言います。
      </p>
      <p>環境光を作るには、以下のようにします。</p>
      <CodeBlock>{`create.ambientLight()`}</CodeBlock>
      <p>環境光では影はできません。</p>
      <p>
        <Note>指向性光とは、特定の方向からのまっすぐな光</Note>です。
        <br />
        例えば、太陽光や蛍光灯の光などが指向性光です。
        <br />
        指向性光は、向きがあるため、光があたっていない部分は影になります。
      </p>
      <p>指向性光を作るには、以下のようにします。</p>
      <CodeBlock>{`create.directionalLight()`}</CodeBlock>
      <p>指向性光では影ができます。</p>
      <p>どちらの光も、<Note>光の強さ(intensity)を指定することができます</Note>。</p>
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
      <h4>やってみよう</h4>
      <p>
        環境光の強さ、指向性光の強さと位置を変更して、
        立方体がどのように表示されるか確認してみましょう。
        <br />
        例えば、環境光の強さを <code>0.1</code> に、 指向性光の強さを{" "}
        <code>3</code> に, 指向性光の位置を <code>[-5, 5, -5]</code>{" "}
        に変更してみましょう。
      </p>
      <EasyThreeBox
        effect={(r) => {
          const { camera, create, animate, destroy } = init(r);
          camera.position.set(-2, 2, 2);
          create.ambientLight({ intensity: 0.1 });
          create.directionalLight({
            intensity: 3,
            position: [-5, 5, -5],
          });
          create.cube();
          animate();
          return {
            destroy: () => {
              destroy();
            },
          };
        }}
      />
      <h3>立方体の表示</h3>
      <p>立方体を作り出すには、以下のようにします。</p>
      <CodeBlock>{`create.cube()`}</CodeBlock>
      <p>立方体は、デフォルトでは中心が原点(0, 0, 0)、サイズが1になります。</p>
      <h4>サイズと位置の変更</h4>
      <p>立方体のサイズを変更するには、次のようにします。</p>
      <CodeBlock>{`create.cube({ size: 2 })`}</CodeBlock>
      <p>このコードは、サイズが2の立方体を作り出します。</p>
      <p>立方体の位置を変更するには、次のようにします。</p>
      <CodeBlock>{`create.cube({ position: [1, 1, 1] })`}</CodeBlock>
      <p>このコードは、位置が(1, 1, 1)の立方体を作り出します。</p>
      <p>
        サイズと位置を両方変更するときは、これらの指定をカンマで区切って記述します。
      </p>
      <CodeBlock>{`create.cube({ size: 2, position: [1, 1, 1] })`}</CodeBlock>
      <p>このコードは、サイズが2で位置が(1, 1, 1)の立方体を作り出します。</p>
      <p>
        プログラムは意味が変わらない範囲で改行ができます。
        <br />
        2つ以上のものを変更するときは、次のように改行したほうが分かりやすいでしょう。
      </p>
      <CodeBlock>{`create.cube({
  size: 2,
  position: [1, 1, 1]
})`}</CodeBlock>
      <h4>色の変更</h4>
      <p>立方体の色を変更するには、次のようにします。</p>
      <CodeBlock>{`create.cube({
  option: { color: "red" }
})`}</CodeBlock>
      <p>
        このコードは、赤色の立方体を作り出します。
        <br />
        このように、色は英語の名前でしていすることができますが、
        <Note>16進数で指定することもできます</Note>。<br />
        16進数で指定するときは、<code>0x</code> を先頭に付けて、
        <code>0xff0000</code> のように記述します。
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
        <a href="https://www.colordic.org" target="_blank" rel="noreferrer">
          WEB色見本 原色大辞典
        </a>{" "}
        などのサイトで色を調べることができます。
      </p>
      <h4>直方体の作成</h4>
      <p>3辺の長さを変えることで、立方体ではなく直方体を作ることもできます。</p>
      <CodeBlock>{`create.cube({ size: [2, 3, 4] })`}</CodeBlock>
      <p>
        このコードは、x軸方向に2、y軸方向に3、z軸方向に4の直方体を作り出します。
      </p>
      <p>
        <code>create.cube</code>は何度でも呼び出すことができます。
        <br />
        呼び出した分だけ立方体や直方体が表示されます。
      </p>
      <h4>やってみよう</h4>
      <p>
        赤、緑、青の立方体または直方体をそれぞれ作成して、
        それぞれの位置やサイズを変えて表示してみましょう。
        <br />
        赤は <code>"red"</code> または <code>0xff0000</code> 、 緑は{" "}
        <code>"green"</code> または <code>0x00ff00</code> 、 青は{" "}
        <code>"blue"</code> または <code>0x0000ff</code> で指定します。
      </p>
      <EasyThreeBox
        effect={(r) => {
          const { camera, create, animate, destroy } = init(r);
          camera.position.set(-2, 2, 2);
          create.ambientLight();
          create.directionalLight();
          create.cube({
            option: { color: "red" },
          });
          create.cube({
            size: 0.6,
            position: [1, 1, 0],
            option: { color: "green" },
          });
          create.cube({
            size: [0.5, 3, 1.5],
            position: [-1, 0, -1],
            option: { color: "blue" },
          });
          animate();
          return {
            destroy: () => {
              destroy();
            },
          };
        }}
      />
      <h3>初期化</h3>
      <p>
        ここまでの内容で、カメラの位置、環境光、指向性光、立方体の表示を行いました。<br />
        このセクションの最後に、プログラムの1行目と最終行について説明します。
      </p>
      <CodeBlock filename="index.html">
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
      <p>
        簡単に言うと、この1行目は「<Note>プログラム中でつかうものを用意する</Note>」行です。<br />
        今回は、カメラ、オブジェクト、アニメーションを使うために、
        <code>camera</code>、<code>create</code>、<code>animate</code> を用意しています。
      </p>
      <p>
        最終行の
      </p>
      <CodeBlock>{`animate()`}</CodeBlock>
      <p>
        は、アニメーションを開始するための関数です。
        <br />
        この関数を呼び出すことで、アニメーションが開始されます。
      </p>
      <p>
        原則として <code>animate</code> は必ず最後に呼び出すようにします。
      </p>
    </div>
  );
}

