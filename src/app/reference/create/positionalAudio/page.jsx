import CodeBlock from "@/components/CodeBlock";
import ReferenceContent from "@/components/ReferenceContent";
import H1 from "@/components/H1";
import H2 from "@/components/H2";
import H3 from "@/components/H3";
import { Ex1, Ex2 } from "./Codes";

export const metadata = {
  title: "create.positionalAudio",
};

export default function Reference_Create_PositionalAudio() {
  return (
    <div>
      <H1>create.positionalAudio</H1>
      <ReferenceContent
        name="create.positionalAudio"
        args="soundFile : String, target : Object, props : Object"
        returnObject="PositionalAudio"
        argsInfo={
          <div>
            <div>
              <span>soundFile</span> - 音声ファイルのパス。
            </div>
            <div>
              <span>target</span> - 音声を再生するオブジェクト。
            </div>
            <div>
              <span>props</span> - 設定オブジェクト。
              <ul className="list-disc list-inside ml-4">
                <li>
                  refDistance (Number) : 音声の参照距離 (デフォルト : 1)。
                </li>
                <li>
                  maxDistance (Number) : 音声の最大距離 (デフォルト : 100)
                </li>
                <li>loop (Boolean) : 音声のループ再生 (デフォルト : true)</li>
                <li>volume (Number) : 音量 (デフォルト : 0.5)</li>
                <li>
                  distanceModel (String) : 距離モデル (デフォルト :
                  'exponential')
                </li>
                <li>rolloffFactor (Number) : 減衰係数 (デフォルト : 1)</li>
                <li>
                  innerAngle (Number) : 指向性コーンの内角度 (デフォルト : 360)
                </li>
                <li>
                  outerAngle (Number) : 指向性コーンの外角度 (デフォルト : 360)
                </li>
                <li>
                  outerGain (Number) : 指向性コーンの外側の音量 (デフォルト : 0)
                </li>
                <li>
                  helper (Boolean) : ヘルパーを表示するかどうか (デフォルト :
                  false)
                </li>
              </ul>
            </div>
          </div>
        }
      >
        指定したオーディオファイルから点音源を作成します。
        <br />
        点音源は、3D空間内で位置に基づいて音声を再生するためのオブジェクトです。
        <br />
        音源の位置に応じて音量やパンニングが変化します。
        <br />
        <br />
        refDistance
        は、音源からの距離がこの値に達するまで音量が減衰しない距離を指定します。
        <br />
        maxDistance
        は、音源からの距離がこの値を超えると音量が減衰しなくなる距離を指定します。
        <br />
        innerAngle と outerAngle は、指向性コーンの内角度と外角度を指定します。
        <br />
        outerGain は、指向性コーンの外側の音量を指定します。
        <br />
        指向性コーンの内角度内において、音量は向きによる減衰をしません。
        <br />
        指向性コーンの内角度を超え、外角度内においては音量が徐々に減衰します。
        <br />
        外角度を超えた場合、音量は outerGain に設定された値になります。
        <br />
        <br />
        helper を true
        に設定すると、点音源の位置と指向性コーンを視覚的に確認できるヘルパーが表示されます。
        <br />
        <br />
        戻り値である音源は、Meshに持たせることができます。
      </ReferenceContent>

      <H2 className="mt-14">コードの例</H2>
      <H3>点音源</H3>
      <Ex1
        className="border my-4"
        style={{
          width: "240px",
          height: "240px",
        }}
      />
      <CodeBlock>
        {`const { camera, controls, create, animate } = init()
controls.connect();
camera.position.set(0, 1, 0);
controls.target.set(0, 0, 1);

create.ambientLight({ intensity: 0.2 });
create.directionalLight({ intensity: 1, position: [5, 5, -7] });

// 音源をもたせるオブジェクトの作成
const cube = create.cube({ size: 0.2 });

// 点音源の作成
soundRef.current = create.positionalAudio(
  "/easy-three/sound/chill_gravity.mp3",
  camera,
  {
    refDistance: 1,
    maxDistance: 100,
  }
)

// cubeに音源を持たせる
cube.add(soundRef.current);

animate(({ time }) => {
  cube.position.z = 10*Math.abs(Math.sin(time));
});
`}
      </CodeBlock>
      <H3 className="mt-10">指向性コーン</H3>
      <p className="mb-4">
        innerAngle、outerAngle、outerGainを設定することで、指向性コーンを持つ点音源を作成できます。
        <br />
        指向性コーンは、音源が特定の方向に向かって音を放射するように設定するために使用されます。
      </p>
      <Ex2
        className="border my-4"
        style={{
          width: "240px",
          height: "240px",
        }}
      />
      <CodeBlock>
        {`const { camera, create, animate } = init()
controls.connect();
camera.position.set(0, 1, 1);

create.ambientLight({ intensity: 0.2 });
create.directionalLight({ intensity: 1, position: [5, 5, -7] });

// 音源をもたせるオブジェクトの作成
const cube = create.cube({ size: 0.5 });

// 点音源の作成
soundRef.current = create.positionalAudio(
  "/easy-three/sound/chill_gravity.mp3",
  camera,
  {
    refDistance: 1,
    maxDistance: 100,
    innerAngle: 60,
    outerAngle: 180,
    outerGain: 0,
  }
)

// cubeに音源を持たせる
cube.add(soundRef.current);
// 指向性コーンの向きを設定
cube.lookAt(0, 0, 0);

animate(({ time }) => {
  cube.rotation.y += 0.01;
});
`}
      </CodeBlock>
    </div>
  );
}
