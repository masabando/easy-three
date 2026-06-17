import CodeBlock from "@/components/CodeBlock";
import ReferenceContent from "@/components/ReferenceContent";
import { Note, Link } from "@/components/BaseKit";
import H1 from "@/components/H1";
import H2 from "@/components/H2";
import H3 from "@/components/H3";

export const metadata = {
  title: "load.bvh",
};


export default function Page() {
  return (
    <div>
      <H1>load.bvh</H1>

      <div className="alert alert-warning alert-soft">
        <div>
        <div className="font-bold">load.bvh は非推奨になりました。</div>
        Three.js r175 で AnimationClip.parseAnimation() が非推奨になったため、
        load.bvh は非推奨になりました。<br />
        今後は <Link className="text-blue-500 underline" href="/reference/load/bvh2/">load.bvh2</Link>{" "}
          をご利用ください。
        </div>
      </div>

      <ReferenceContent
        name="load.bvh"
        args="url : String, vrm : VRM, props : Object"
        returnObject="{ mixer, duration }"
        argsInfo={
          <>
            <div>
              <span>url</span> - BVHファイルのURL。
            </div>
            <div>
              <span>vrm</span> - VRM。
            </div>
            <div>
              <span>props</span> - 設定オブジェクト。
              <ul className="list-disc list-inside ml-4">
                <li>effectiveWeight (Number) : ウェイト (デフォルト : 1)。</li>
                <li>
                  timeScale (Number) : タイムスケール (デフォルト : 1000)。
                </li>
                <li>nameList (Array) : VRMボーン名のリスト。</li>
                <li>idList (Array) : BVHボーン名のリスト。</li>
                <li>
                  onProgress (Function) : 読み込み進捗のコールバック関数。
                </li>
              </ul>
            </div>
          </>
        }
      >
        <p>
          BVH形式のアニメーションファイルを読み込み、指定したVRMモデルに適用します。
          <br />
          <Note>VRMモデルは、あらかじめ読み込んでおく必要があります。</Note>
          <br />
          戻り値は、mixerとdurationが格納されたオブジェクトです。
          <br />
          timeScale で指定した値だけ、アニメーションの時間が遅くなっています。
          そのため、<Note>delta にtimeScale相当の値を掛けてください</Note>。
          <br />
          mocopiで取得したBVHファイルを使用することを想定しています。
          <br />
          そうでない場合は、idListを変更する必要があるかもしれません。
        </p>
        <p>nameListとidListの初期値は以下の通りです。</p>
      </ReferenceContent>

      <CodeBlock>
        {`nameList = [
"head", "neck", "chest",
"spine", "hips",
"rightShoulder", "rightUpperArm",
"rightLowerArm", "rightHand",
"leftShoulder", "leftUpperArm",
"leftLowerArm", "leftHand",
"rightUpperLeg", "rightLowerLeg",
"rightFoot",
"leftUpperLeg", "leftLowerLeg",
"leftFoot"]

idList = [
"head", "neck_1", "torso_5",
"torso_3", "root",
"r_shoulder", "r_up_arm",
"r_low_arm", "r_hand",
"l_shoulder", "l_up_arm",
"l_low_arm", "l_hand",
"r_up_leg", "r_low_leg",
"r_foot",
"l_up_leg", "l_low_leg",
"l_foot"]`}
      </CodeBlock>

      <H2 className="mt-14">コードの例</H2>
      <H3>BVHによるVRMモデルのアニメーション</H3>
      {/* <Ex1
        className="border"
        style={{
          width: "240px",
          height: "240px",
        }}
      /> */}
      <CodeBlock>
        {`const { camera, create, helper, load, controls, animate } = init()
create.ambientLight();
create.directionalLight();
camera.position.set(0, 1.5, -1.5);
controls.target.set(0, 1, 0);

controls.connect();

helper.axes();
helper.grid();

let model;
let mixer;

load.vrm("/easy-three/model/sample.vrm").then((vrm) => {
  model = vrm;
  load.bvh("/easy-three/motion/sampleMotion.bvh", vrm).then((_bvhObj) => {
    mixer = _bvhObj.mixer;
  });
});

animate(({ delta }) => {
  if (model && mixer) {
    mixer.update(delta * 1000);
    model.update(delta * 1000);
  }
});

`}
      </CodeBlock>
    </div>
  );
}
