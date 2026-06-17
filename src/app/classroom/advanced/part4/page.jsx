import { Code, Note } from "@/components/BaseKit";
import CodeBlock from "@/components/CodeBlock";
import H1 from "@/components/H1";
import H2 from "@/components/H2";
import { Ex1, Ex2, Ex3 } from "./Codes";

export const metadata = {
  title: "VRMモデルを用いたアバターの表示",
};

export default function Page() {
  return (
    <div>
      <H1>4. VRMモデルを用いたアバターの表示</H1>
      <p>
        このセクションでは、VRMモデルを用いてアバターを表示する方法を学びます。
      </p>

      <H2 className="mt-14">VRMモデルの作成</H2>
      <p>
        <Note>VRMモデルは、3Dモデルの一種で、人間の形をしたアバター</Note>です。
        <br />
        VRMモデルは、表情やポーズなどの情報を持っているため、リアルな人間の動きを再現することができます。
      </p>
      <p className="mt-4">
        VRMモデルは無料で作成することができます。
        <br />
        例えば、
        <Note>
          <a
            className="text-blue-600 underline"
            href="https://vroid.com/studio"
            target="_blank"
            rel="noopener noreferrer"
          >
            VRoid Studio
          </a>
          というソフトウェアを使うと、簡単にVRMモデルを作成することができます
        </Note>
        。
        <br />
        VRoid Studio は、PC(Window, Mac)はもちろん、
        iPadでも利用することができます。
      </p>
      <p className="mt-4">
        ここでは、作成したVRMモデルを <Code>sample.vrm</Code>
        という名前で保存したとします。
        <br />
        サンプルのモデルファイルを
        <a
          className="text-blue-600 underline"
          href="/easy-three/model/sample.vrm"
          download
        >
          こちら
        </a>
        からダウンロードしても構いません。
      </p>

      <p>
        モデルファイルは、プログラムのファイルと同じ場所に配置してください。
      </p>

      <H2 className="mt-14">VRMモデルの表示</H2>
      <p>
        VRMモデルを読み込むには、
        <Code>load.vrm(モデルファイルのパス)</Code> を使います。
      </p>
      <CodeBlock>{`load.vrm(VRMモデルのパス)`}</CodeBlock>
      <p>今の場合、次のようにするとVRMモデルが表示されます。</p>
      <CodeBlock filename="index.html">
        {`const { camera, create, animate, controls, load, helper } = init()

controls.connect()
camera.position.set(0, 1.3, -1.5)
controls.target.set(0, 1, 0)

helper.grid({ size: 10 })
helper.axes()

create.ambientLight({ intensity: 0.2 })
create.directionalLight({
  intensity: 2,
  position: [-10, 10, -10]
});

create.plane({
  size: 10,
  rotation: [-Math.PI / 2, 0, 0],
  option: {
    color: 0xaaaaaa,
  }
})

load.vrm("./sample.vrm")

animate()
`}
      </CodeBlock>
      <Ex1 />

      <p>
        他のオブジェクトを作るときと同じように、
        サイズや位置を調整することができます。
      </p>
      <p className="mt-4">
        背景画像や環境マップ、テクスチャなどと併用すると、
        よりリアルな3Dシーンを作成することができます。
      </p>
      <Ex2 />


      <H2 className="mt-14">VRMモデルを変数に入れる</H2>
      <p>
        読み込んだVRMモデルは、変数に代入して操作することができます。
        <br />
        読み込みは非同期処理なので、変数に入れる場合は
        非同期処理の終了時の処理を指定できる <Code>then</Code> か、
        非同期処理の終了を待つ <Code>await</Code> を利用します。
        <br />
        <Code>then</Code> を使う場合、後から再代入するため
        <Code>const</Code> ではなく <Code>let</Code> を使います。
      </p>
      <CodeBlock>{`const model = await load.vrm(モデルファイルのパス)`}</CodeBlock>
      <CodeBlock>{`let model
load.vrm(モデルファイルのパス).then(m => model = m)`}</CodeBlock>
      <p>
        <Code>then</Code> を使う場合、
        <Code>model</Code> は読み込みが完了するまで <Code>undefined</Code>{" "}
        です。
        <br />
        つまり、<Code>await</Code> を使う場合は
      </p>
      <CodeBlock>{`const model = load.vrm(モデルファイルのパス)

animate(({ delta }) => {
  // modelの操作
})
`}</CodeBlock>
      <p>
        と書くことができますが、
        <Code>then</Code> を使う場合は
      </p>
      <CodeBlock>{`let model
load.vrm(モデルファイルのパス).then(m => model = m)

animate(({ delta }) => {
  if (model) {
    // modelの操作
  }
})
`}</CodeBlock>
      <p>と書く必要があります。</p>
      <p className="mt-4">
        <Code>await</Code>{" "}
        を利用すると、モデルの読み込みが完了するまで待機します。
        <br />
        通常モデルはそれなりに重いため、読み込みに時間がかかり、
        その間なにも表示できないことになります。
        <br />
        また <Code>await</Code> はトップレベルなどでしか使えないため、 関数内で{" "}
        <Code>load.vrm</Code> を行う場合には <Code>then</Code>
        を使う必要があります。
      </p>
      <p className="mt-4">
        これらのことから、<Note>
          VRMモデルを読み込む場合は、
          基本的には <Code>then</Code> を使う
        </Note>ことをオススメします。
      </p>

      <H2 className="mt-14">VRMモデル全体を動かす</H2>
      <p>
        VRMモデル全体を動かしたり回転させるには、
        <Code>model</Code>そのものではなく、
        <Code>model.scene</Code> を操作します。
      </p>
      <CodeBlock filename="index.html">
        {`const { camera, create, animate, controls, load, helper } = init()

controls.connect()
camera.position.set(0, 1.3, -1.5)
controls.target.set(0, 1, 0)

helper.grid({ size: 10 })
helper.axes()

create.ambientLight({ intensity: 0.2 })
create.directionalLight({
  intensity: 2,
  position: [-10, 10, -10]
})

create.plane({
  size: 10,
  rotation: [-Math.PI / 2, 0, 0],
  option: {
    color: 0xaaaaaa,
  }
})

let model
load.vrm("./sample.vrm").then(m => model = m)

animate(({ delta }) => {
  if (model) {
    model.scene.rotation.y += delta
  }
})
`}
      </CodeBlock>
      <Ex3 />

    </div>
  );
}
