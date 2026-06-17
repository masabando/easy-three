import CodeBlock from "@/components/CodeBlock";
import ReferenceContent from "@/components/ReferenceContent";
import { Note, Link } from "@/components/BaseKit";
import H1 from "@/components/H1";
import H2 from "@/components/H2";
import H3 from "@/components/H3";
import { Ex1, Ex2, Ex3 } from "./Codes";

export const metadata = {
  title: "load.vrm",
};


export default function Page() {
  return (
    <div>
      <H1>load.vrm</H1>

      <ReferenceContent
        name="load.vrm"
        args="url : String, props : Object"
        returnObject="Promise<VRM>"
        argsInfo={
          <>
            <div>
              <span>url</span> - VRMモデルのURL。
            </div>
            <div>
              <span>props</span> - 設定オブジェクト。
              <ul className="list-disc list-inside ml-4">
                <li>
                  position (Array) : モデルの位置 (デフォルト : [0, 0, 0])。
                </li>
                <li>
                  rotation (Array) : モデルの回転 (デフォルト : [0, 0, 0])。
                </li>
                <li>
                  scale (Array) : モデルのスケール (デフォルト : [1, 1, 1])。
                </li>
                <li>
                  castShadow (Boolean) : モデルが影を落とすか (デフォルト :
                  true)。
                </li>
                <li>
                  autoAdd (Boolean) : 自動でシーンに追加するか (デフォルト :
                  true)。
                </li>
                <li>onProgress (Function) : 読み込み中のコールバック関数。</li>
                <li>onLoad (Function) : 読み込み完了時のコールバック関数。</li>
                <li>bvh (String) : BVHファイルのURL (デフォルト : false)</li>
              </ul>
            </div>
          </>
        }
      >
        <p>VRMモデルを読み込み、オプションに基づいてシーンに追加します。</p>
        <p className="mt-4">BVHファイルを読み込み、VRMモデルに適用することもできます。</p>
      </ReferenceContent>

      <p className="mt-4">
        モデルの読み込みは非同期で行われます。
        <br />
        そのため、
        <Note>
          変数にモデルを代入する場合は then メソッドを使用してください
        </Note>{" "}
        (下記の例を参照)。
        <br />
        また、animate のコールバック関数内でモデルを操作する場合は、
        モデルが読み込まれるまでの処理を考慮してください。
      </p>

      <p className="mt-4">
        戻り値は Mesh ではなく VRM オブジェクトです。
        <br />
        <Note>Meshを操作する場合は、戻り値の scene プロパティを使用</Note>{" "}
        してください。
        <br />
      </p>

      <p className="mt-4">
        ボーンや表情などの操作については 教育機関向け活用例の{" "}
        <Link className="text-blue-500 underline" href="/classroom/advanced/part5/">
          5. VRMモデルの操作とアニメーション
        </Link>{" "}
        を参照してください。
      </p>

      <H2 className="mt-14">コードの例</H2>
      <H3>VRMモデルの表示</H3>
      <Ex1
        className="border"
        style={{
          width: "240px",
          height: "240px",
        }}
      />
      <CodeBlock>
        {`const { camera, create, helper, load, controls, animate } = init()
create.ambientLight();
create.directionalLight();
camera.position.set(0, 1.5, -1.5);
controls.target.set(0, 1, 0);

controls.connect();

helper.axes();
helper.grid();

load.vrm("/easy-three/model/sample.vrm");

animate();
`}
      </CodeBlock>

      <H3 className="mt-10">VRMモデルのMesh操作</H3>
      <Ex2
        className="border"
        style={{
          width: "240px",
          height: "240px",
        }}
      />
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
load.vrm("/easy-three/model/sample.vrm").then((vrm) => {
  model = vrm;
});

animate(({ delta }) => {
  if (model) {
    model.scene.rotation.y += delta;
  }
});
`}
      </CodeBlock>

      <H3 className="mt-10">アニメーションの再生</H3>
      <p>
        VRMモデルにBVHファイルを適用することで、アニメーションを再生できます。
        <br />
        animate のコールバック関数内で、 model.updateWithAnimation(delta)
        を呼び出すことでアニメーションを更新します。
        <br />
        この処理は、load.vrm と{" "}
        <Link className="text-blue-500 underline" href="/reference/load/bvh2/">load.bvh2</Link>{" "}
        を併用するシンプルなケースのシンタックスシュガーです。
        <br />
        load.bvh2 で得られる mixer は model.mixer に格納されます。
        <br />
        複雑な処理が必要な場合は、model.mixer を使用してください。
      </p>
      <Ex3
        className="border my-4"
        style={{
          width: "240px",
          height: "240px",
        }}
      />
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
load.vrm("/easy-three/model/sample.vrm", {
  position: [0, -0.55, 0],
  bvh: "/easy-three/motion/sampleMotion.bvh",
}).then((vrm) => {
  model = vrm;
});

animate(({ delta }) => {
  if (model) {
    model.updateWithAnimation(delta);
    // あるいは
    // model.mixer?.update(delta);
    // model.update(delta);
  }
});
`}
      </CodeBlock>
    </div>
  );
}
