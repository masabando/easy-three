import CodeBlock from "@/components/CodeBlock";
import H1 from "@/components/H1";
import H2 from "@/components/H2";
import H3 from "@/components/H3";
import { Ex1 } from "./Codes";

export const metadata = {
  title: "fpv",
};

export default function Page() {
  return (
    <div>
      <H1>fpv</H1>

      <p>一人称のカメラ操作を行うためのコントロールを提供します。</p>
      <p>
        初期状態では無効化されています。
        <br />
        connect() を呼び出すことで有効化されます。
      </p>
      <CodeBlock>{`fpv.connect()`}</CodeBlock>
      <p>connect の引数で、各種の設定を行うことができます。</p>
      <ul className="list-disc list-inside ml-4 mt-4">
        <li>mouse : マウス操作で視点移動を行うかどうか (デフォルト: true)</li>
        <li>mouseDownMove : マウス押し込みで前進するか (デフォルト: false)</li>
        <li>arrow : 矢印キーで移動を行うかどうか (デフォルト: true)</li>
        <li>wasd : WASDキーで移動を行うかどうか (デフォルト: true)</li>
        <li>touch : タッチ操作で視点移動を行うかどうか (デフォルト: true)</li>
        <li>height : カメラの高さ (デフォルト: 1.6)</li>
        <li>speed : 移動速度 (デフォルト: 5)</li>
        <li>viewSpeed : 視点移動速度 (デフォルト: 0.4)</li>
        <li>position : カメラの初期位置 (デフォルト: [0, 0])</li>
      </ul>
      <p className="mt-4">
        つまり、connect()
        を引数なしで実行することは、以下を実行することと同じです。
      </p>
      <CodeBlock>{`fpv.connect({
  mouse: true,
  mouseDownMove: false,
  arrow: true,
  wasd: true,
  touch: true,
  height: 1.6,
  speed: 5,
  viewSpeed: 0.4,
  position: [0, 0],
})`}</CodeBlock>
      <p className="mt-4">
        カメラの位置を x, z 座標のみで指定することに注意してください。y 座標は
        height の値が使用されます。
      </p>
      <p className="mt-4">無効化する場合は、disconnect() を呼び出します。</p>
      <CodeBlock>{`fpv.disconnect()`}</CodeBlock>
      <p>
        その性質から、fpv は controls と併用することはできません。
      </p>

      <H2 className="mt-14">操作方法</H2>
      <H3>マウス</H3>
      <ul className="list-disc list-inside ml-4 mt-4">
        <li>ボタン押し込み : 前進 (mouseDownMove: true の場合)</li>
        <li>ドラッグ : 視点移動</li>
      </ul>
      <p>
        キー操作中は、マウスボタンを押し込まなくてもマウスの動きに応じて視点移動が行われます。
      </p>

      <H3 className="mt-10">キー</H3>
      <ul className="list-disc list-inside ml-4 mt-4">
        <li>ArrowUp : 前進</li>
        <li>ArrowDown : 後退</li>
        <li>ArrowLeft : 左移動</li>
        <li>ArrowRight : 右移動</li>
        <li>W : 前進</li>
        <li>S : 後退</li>
        <li>A : 左移動</li>
        <li>D : 右移動</li>
      </ul>

      <H3 className="mt-10">タッチ</H3>
      <ul className="list-disc list-inside ml-4 mt-4">
        <li>タッチ : 視点移動 ＆ 前進</li>
      </ul>

      <H2 className="mt-14">コードの例</H2>
      <H3>視点移動</H3>
      <p>マウス操作で視点移動ができます。</p>
      <Ex1
        className="border my-4"
        style={{
          width: "240px",
          height: "240px",
        }}
      />

      <CodeBlock>
        {`const { camera, create, animate, fpv } = init();

fpv.connect()
create.ambientLight();
create.directionalLight();

create.cube({
  position: [0, 0.5, 10],
});

create.plane({
  size: 30,
  rotation: [-Math.PI / 2, 0, 0],
  option: {
    color: 0xffffff,
  }
})

animate();
`}
      </CodeBlock>
    </div>
  );
}
