"use client";
import { EasyThreeBox, Note } from "@/components/BaseKit";
import CodeBlock from "@/components/CodeBlock";
import { init } from "@dist/easy-three";

export default function Page() {
  return (
    <div className="classroomPart">
      <h2>4. VRMモデルを用いたアバターの表示</h2>
      <p>
        このセクションでは、VRMモデルを用いてアバターを表示する方法を学びます。
      </p>

      <h3>VRMモデルの作成</h3>
      <p>
        <Note>VRMモデルは、3Dモデルの一種で、人間の形をしたアバター</Note>です。
        <br />
        VRMモデルは、表情やポーズなどの情報を持っているため、リアルな人間の動きを再現することができます。
      </p>
      <p>
        VRMモデルは無料で作成することができます。
        <br />
        例えば、
        <Note>
          <a
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
      <p>
        ここでは、作成したVRMモデルを <code>sample.vrm</code>
        という名前で保存したとします。
        <br />
        サンプルのモデルファイルを
        <a href="/easy-three/model/sample.vrm" download>
          こちら
        </a>
        からダウンロードしても構いません。
      </p>

      <p>
        モデルファイルは、プログラムのファイルと同じ場所に配置してください。
      </p>

      <h3>VRMモデルの表示</h3>
      <p>
        VRMモデルを読み込むには、
        <code>load.vrm(モデルファイルのパス)</code> を使います。
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
      <EasyThreeBox
        toggleControls
        effect={(r) => {
          const { camera, create, animate, controls, load, helper, destroy } =
            init(r);
          camera.position.set(0, 1.3, -1.5);
          controls.target.set(0, 1, 0);
          helper.grid({ size: 10 });
          helper.axes();
          create.ambientLight({ intensity: 0.2 });
          create.directionalLight({
            intensity: 2,
            position: [-10, 10, -10],
          });
          create.plane({
            size: 10,
            rotation: [-Math.PI / 2, 0, 0],
            option: {
              color: 0xaaaaaa,
            },
          });
          // load.background(
          //   "/easy-three/texture/hdr/kloofendal_48d_partly_cloudy_puresky_1k.hdr"
          // );
          load.vrm("/easy-three/model/sample.vrm");
          animate();
          return {
            destroy: () => {
              destroy();
            },
            controls: (f) => {
              if (f) controls.connect();
              else controls.disconnect();
            },
          };
        }}
      />
      <p>
        他のオブジェクトを作るときと同じように、
        サイズや位置を調整することができます。
      </p>
      <p>
        背景画像や環境マップ、テクスチャなどと併用すると、
        よりリアルな3Dシーンを作成することができます。
      </p>
      <EasyThreeBox
        toggleControls
        effect={(r) => {
          const { camera, create, animate, controls, load, destroy } = init(r);
          camera.position.set(0, 1.3, -1.5);
          controls.target.set(0, 1, 0);
          create.ambientLight({ intensity: 0.2 });
          create.directionalLight({
            intensity: 2,
            position: [-10, 10, -10],
          });
          create.plane({
            size: 10,
            rotation: [-Math.PI / 2, 0, 0],
            option: {
              color: 0xaaaaaa,
              map: load.texture(
                "/easy-three/texture/img/coast_sand_rocks_02/coast_sand_rocks_02_diff_1k.jpg",
                { repeat: [5, 5] }
              ),
              normalMap: load.texture(
                "/easy-three/texture/img/coast_sand_rocks_02/coast_sand_rocks_02_nor_gl_1k.jpg",
                { repeat: [5, 5] }
              ),
            },
          });
          load.background(
            "/easy-three/texture/hdr/kloofendal_48d_partly_cloudy_puresky_1k.hdr"
          );
          load.vrm("/easy-three/model/sample.vrm");
          animate();
          return {
            destroy: () => {
              destroy();
            },
            controls: (f) => {
              if (f) controls.connect();
              else controls.disconnect();
            },
          };
        }}
      />

      <h3>VRMモデルを変数に入れる</h3>
      <p>
        読み込んだVRMモデルは、変数に代入して操作することができます。
        <br />
        読み込みは非同期処理なので、変数に入れる場合は
        非同期処理の終了時の処理を指定できる <code>then</code> か、
        非同期処理の終了を待つ <code>await</code> を利用します。
        <br />
        <code>then</code> を使う場合、後から再代入するため
        <code>const</code> ではなく <code>let</code> を使います。
      </p>
      <CodeBlock>{`const model = await load.vrm(モデルファイルのパス)`}</CodeBlock>
      <CodeBlock>{`let model
load.vrm(モデルファイルのパス).then(m => model = m)`}</CodeBlock>
      <p>
        <code>then</code> を使う場合、
        <code>model</code> は読み込みが完了するまで <code>undefined</code>{" "}
        です。
        <br />
        つまり、<code>await</code> を使う場合は
      </p>
      <CodeBlock>{`const model = load.vrm(モデルファイルのパス)

animate(({ delta }) => {
  // modelの操作
})
`}</CodeBlock>
      <p>
        と書くことができますが、
        <code>then</code> を使う場合は
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
      <p>
        <code>await</code>{" "}
        を利用すると、モデルの読み込みが完了するまで待機します。
        <br />
        通常モデルはそれなりに重いため、読み込みに時間がかかり、
        その間なにも表示できないことになります。
        <br />
        また <code>await</code> はトップレベルなどでしか使えないため、 関数内で{" "}
        <code>load.vrm</code> を行う場合には <code>then</code>
        を使う必要があります。
      </p>
      <p>
        これらのことから、<Note>
          VRMモデルを読み込む場合は、
          基本的には <code>then</code> を使う
        </Note>ことをオススメします。
      </p>

      <h3>VRMモデル全体を動かす</h3>
      <p>
        VRMモデル全体を動かしたり回転させるには、
        <code>model</code>そのものではなく、
        <code>model.scene</code> を操作します。
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
      <EasyThreeBox
        toggleControls
        effect={(r) => {
          const { camera, create, animate, controls, load, helper, destroy } =
            init(r);
          camera.position.set(0, 1.3, -1.5);
          controls.target.set(0, 1, 0);
          helper.grid({ size: 10 });
          helper.axes();
          create.ambientLight({ intensity: 0.2 });
          create.directionalLight({
            intensity: 2,
            position: [-10, 10, -10],
          });
          create.plane({
            size: 10,
            rotation: [-Math.PI / 2, 0, 0],
            option: {
              color: 0xaaaaaa,
            },
          });
          let model;
          load.vrm("/easy-three/model/sample.vrm").then((m) => (model = m));
          animate(({ delta }) => {
            if (model) {
              model.scene.rotation.y += delta;
            }
          });
          return {
            destroy: () => {
              destroy();
            },
            controls: (f) => {
              if (f) controls.connect();
              else controls.disconnect();
            },
          };
        }}
      />
    </div>
  );
}
