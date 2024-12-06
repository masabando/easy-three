"use client";
import { EasyThreeBox, Note } from "@/components/BaseKit";
import CodeBlock from "@/components/CodeBlock";
import { init } from "@dist/easy-three";

export default function Page() {
  return (
    <div className="classroomPart">
      <h2>VRMモデルを用いたアバターの表示</h2>
      <p>
        このセクションでは、VRMモデルを用いてアバターを表示する方法を学びます。
      </p>

      <h3>VRMモデルの作成</h3>
      <p>
        VRMモデルは、3Dモデルの一種で、人間の形をしたアバターです。
        <br />
        VRMモデルは、表情やポーズなどの情報を持っているため、リアルな人間の動きを再現することができます。
      </p>
      <p>
        VRMモデルは無料で作成することができます。
        <br />
        例えば、
        <a
          href="https://vroid.com/studio"
          target="_blank"
          rel="noopener noreferrer"
        >
          VRoid Studio
        </a>
        というソフトウェアを使うと、簡単にVRMモデルを作成することができます。
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

controls.connect();
camera.position.set(0, 1.3, -1.5);
controls.target.set(0, 1, 0);

helper.grid({ size: 10 })
helper.axes()

create.ambientLight({ intensity: 0.2 });
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
});

load.vrm("./sample.vrm");

animate();
`}
      </CodeBlock>
      <EasyThreeBox
        toggleControls
        effect={(r, controlsFlag) => {
          const { camera, create, animate, controls, load, helper, destroy } =
            init(r);
          if (controlsFlag) controls.connect();
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
          return () => {
            destroy();
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
        effect={(r, controlsFlag) => {
          const { camera, create, animate, controls, load, destroy } =
            init(r);
          if (controlsFlag) controls.connect();
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
          return () => {
            destroy();
          };
        }}
      />
    </div>
  );
}
