"use client";
import { EasyThreeBox, Note } from "@/components/BaseKit";
import CodeBlock from "@/components/CodeBlock";
import { init } from "@dist/easy-three";

export default function Page() {
  return (
    <div className="classroomPart">
      <h2>5. VRMモデルの操作とアニメーション</h2>
      <p>
        このセクションでは、VRMモデルの関節を操作してアニメーションを作成する方法を学びます。
      </p>

      <h3>VRMモデルのボーン</h3>
      <p>
        VRMモデルには、人間の骨格に対応したボーンがあります。
        <br />
        これを利用することで、アバターの動きを制御することができます。
      </p>
      <p>
        ボーンの一覧は次の通りです。
        <br />
        よく使うものをハイライトしています。
      </p>
      <h4>上半身</h4>
      <ul>
        <li>
          <Note>head : 頭</Note>
        </li>
        <li>rightEye : 右目</li>
        <li>leftEye : 左目</li>
        <li>jaw : 顎</li>
        <li>
          <Note>neck : 首</Note>
        </li>
        <li>upperChest : 上胸部</li>
        <li>chest : 胸</li>
        <li>
          <Note>spine : 腰(背骨)</Note>
        </li>
        <li>rightShoulder : 右肩</li>
        <li>leftShoulder : 左肩</li>
        <li>
          <Note>rightUpperArm : 右上腕</Note>
        </li>
        <li>
          <Note>leftUpperArm : 左上腕</Note>
        </li>
        <li>
          <Note>rightLowerArm : 右ひじ</Note>
        </li>
        <li>
          <Note>leftLowerArm : 左ひじ</Note>
        </li>
        <li>rightHand : 右手</li>
        <li>leftHand : 左手</li>
      </ul>
      <h4>下半身</h4>
      <ul>
        <li>
          <Note>hips : 腰(体全体の中央)</Note>
        </li>
        <li>
          <Note>rightUpperLeg : 右足の付け根</Note>
        </li>
        <li>
          <Note>leftUpperLeg : 左足の付け根</Note>
        </li>
        <li>
          <Note>rightLowerLeg : 右ひざ</Note>
        </li>
        <li>
          <Note>leftLowerLeg : 左ひざ</Note>
        </li>
        <li>rightFoot : 右足</li>
        <li>leftFoot : 左足</li>
        <li>rightToes : 右つま先</li>
        <li>leftToes : 左つま先</li>
      </ul>
      <h4>手の指</h4>
      <ul>
        <li>
          親指
          <ul>
            <li>rightThumbProximal : 右親指基部</li>
            <li>rightThumbMetacarpal : 右親指中手骨</li>
            <li>rightThumbDistal : 右親指先端</li>
            <li>leftThumbProximal : 左親指基部</li>
            <li>leftThumbMetacarpal : 左親指中手骨</li>
            <li>leftThumbDistal : 左親指先端</li>
          </ul>
        </li>
        <li>
          人指し指
          <ul>
            <li>rightIndexProximal : 右人差し指基部</li>
            <li>rightIndexIntermediate : 右人差し指中間</li>
            <li>rightIndexDistal : 右人差し指先端</li>
            <li>leftIndexProximal : 左人差し指基部</li>
            <li>leftIndexIntermediate : 左人差し指中間</li>
            <li>leftIndexDistal : 左人差し指先端</li>
          </ul>
        </li>
        <li>
          中指
          <ul>
            <li>rightMiddleProximal : 右中指基部</li>
            <li>rightMiddleIntermediate : 右中指中間</li>
            <li>rightMiddleDistal : 右中指先端</li>
            <li>leftMiddleProximal : 左中指基部</li>
            <li>leftMiddleIntermediate : 左中指中間</li>
            <li>leftMiddleDistal : 左中指先端</li>
          </ul>
        </li>
        <li>
          薬指
          <ul>
            <li>rightRingProximal : 右薬指基部</li>
            <li>rightRingIntermediate : 右薬指中間</li>
            <li>rightRingDistal : 右薬指先端</li>
            <li>leftRingProximal : 左薬指基部</li>
            <li>leftRingIntermediate : 左薬指中間</li>
            <li>leftRingDistal : 左薬指先端</li>
          </ul>
        </li>
        <li>
          小指
          <ul>
            <li>rightLittleProximal : 右小指基部</li>
            <li>rightLittleIntermediate : 右小指中間</li>
            <li>rightLittleDistal : 右小指先端</li>
            <li>leftLittleProximal : 左小指基部</li>
            <li>leftLittleIntermediate : 左小指中間</li>
            <li>leftLittleDistal : 左小指先端</li>
          </ul>
        </li>
      </ul>

      <h3>VRMモデルのボーンを操作する</h3>
      <p>
        ここでは、作成したVRMモデルを <code>sample.vrm</code>
        という名前で保存したとします。
        <br />
        サンプルのモデルファイルを
        <a href="/easy-three/model/sample.vrm" download>
          こちら
        </a>
        からダウンロードしても構いません。
        <br />
        モデルファイルは、プログラムのファイルと同じ場所に配置してください。
      </p>

      <p>
        VRMモデルのボーンを取得するには、
        <code>モデル.bone(ボーン名)</code> を使います。
        <br />
        得られたボーンは、<code>rotation</code> で回転操作を行うことができます。
        <br />
        例えば、右上腕を回転させる場合、次のようにします。
      </p>

      <CodeBlock>{`model.bone("rightUpperArm").rotation.z = 回転角`}</CodeBlock>
      <p>
        モデルのボーンを操作した場合、最後に <code>model.update(delta)</code>{" "}
        をしないと変更が反映されません。
      </p>
      <p>
        今の場合、次のようにするとVRMモデルの右腕全体を動かすことができます。
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
load.vrm("./sample.vrm").then((m) => (model = m))

animate(({ time, delta }) => {
  if (model) {
    model.bone("rightUpperArm").rotation.z = Math.sin(time) * Math.PI * 0.25
    model.update(delta)
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
          animate(({ delta, time }) => {
            if (model) {
              model.bone("rightUpperArm").rotation.z =
                Math.sin(time) * Math.PI * 0.25;
              model.update(delta);
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
      <p>
        決まった回転角で固定するなら、読み込み時に指定することもできます。
        <br />
        下の例は、右上腕、右ひじ、首、頭をアニメーションさせつつ、左上腕は固定の角度で固定する例です。
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
load.vrm("./sample.vrm").then((m) => {
  model = m
  model.bone("leftUpperArm").rotation.z = Math.PI * 0.4
})

animate(({ time, delta }) => {
  if (model) {
    model.bone("rightUpperArm").rotation.z = Math.sin(time) * Math.PI * 0.25
    model.bone("neck").rotation.x = Math.sin(time) * Math.PI * 0.25
    model.bone("head").rotation.y = Math.cos(time * 1.6) * Math.PI * 0.25
    model.bone("rightLowerArm").rotation.y = -Math.sin(time * 1.4) * Math.PI * 0.25 + Math.PI * 0.25
    model.update(delta)
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
          load.vrm("/easy-three/model/sample.vrm").then((m) => {
            model = m;
            model.bone("leftUpperArm").rotation.z = Math.PI * 0.4;
          });
          animate(({ delta, time }) => {
            if (model) {
              model.bone("rightUpperArm").rotation.z =
                Math.sin(time) * Math.PI * 0.25;
              model.bone("neck").rotation.x = Math.sin(time) * Math.PI * 0.25;
              model.bone("head").rotation.y =
                Math.cos(time * 1.6) * Math.PI * 0.25;
              model.bone("rightLowerArm").rotation.y =
                -Math.sin(time * 1.4) * Math.PI * 0.25 + Math.PI * 0.25;
              model.update(delta);
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
      <p>
        VRMモデルのボーンを操作するときに大切なことは、
        「自分の体でその動きをするとき、なにを動かしているのか」
        を意識することです。
        <br />
        例えば上を向く場合は「頭が回転」します。
        <br />
        一方で、右を向く場合は「首が回転」することで、
        結果的に頭も回転しているように見えます(が、実際は首と頭の間の関係は変わっていないので頭は回転していません)。
      </p>

      <h3>VRMの表情を変える</h3>
      <p>モデルの表情を変えるには、</p>
      <CodeBlock>{`model.expressionManager.setValue("表情名", 強さ)`}</CodeBlock>
      <p>
        とします。<br />
        強さは0から1の間で指定します。
        <br />
        ボーンと同様に、<code>model.update(delta)</code>{" "}
        をしないと変更が反映されません。
        <br />
        表情名は次のものがあります。
      </p>
      <ul>
        <li>aa : 「あ」の口の形</li>
        <li>ih : 「い」の口の形</li>
        <li>ou : 「う」の口の形</li>
        <li>ee : 「え」の口の形</li>
        <li>oh : 「お」の口の形</li>
        <li>blink : 両目を閉じる</li>
        <li>blinkLeft : 左目を閉じる</li>
        <li>blinkRight : 右目を閉じる</li>
        <li>lookDown : 下を見る</li>
        <li>lookLeft : 左を見る</li>
        <li>lookRight : 右を見る</li>
        <li>lookUp : 上を見る</li>
        <li>happy : 嬉しい</li>
        <li>angry : 怒り</li>
        <li>sad : 悲しい</li>
        <li>surprised : 驚き</li>
        <li>neutral : ニュートラル</li>
        <li>relaxed : リラックス</li>
      </ul>
      <p>
        モデルによっては、該当する表情がない場合があります。
      </p>
      <p>
        例えば、次のように記述すると、
        嬉しい表情と通常の表情を繰り返します。
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
load.vrm("./sample.vrm").then((m) => (model = m))

animate(({ time, delta }) => {
  if (model) {
    model.expressionManager.setValue("happy", Math.sin(time)*0.5 + 0.5)
    model.update(delta)
  }
})
`}
      </CodeBlock>
      <EasyThreeBox
        toggleControls
        effect={(r) => {
          const { camera, create, animate, controls, load, helper, destroy } =
            init(r);
          camera.position.set(0, 1.6, -0.4);
          controls.target.set(0, 1.6, 0);
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
          animate(({ delta, time }) => {
            if (model) {
              model.expressionManager.setValue(
                "happy",
                Math.sin(time) * 0.5 + 0.5
              );
              model.update(delta);
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
