import CodeBlock from "@/components/CodeBlock";
import ReferenceContent from "@/components/ReferenceContent";
import { Note, Link } from "@/components/BaseKit";
import H1 from "@/components/H1";
import H2 from "@/components/H2";
import H3 from "@/components/H3";
import { Ex1, Ex2 } from "./Codes";

export const metadata = {
  title: "load.gltf",
};


export default function Page() {
  return (
    <div>
      <H1>load.gltf</H1>

      <ReferenceContent
        name="load.gltf"
        args="url : String, props : Object"
        returnObject="Promise<GLTF>"
        argsInfo={
          <>
            <div>
              <span>url</span> - GLTFモデルのURL。
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
                  receiveShadow (Boolean) : モデルが影を受けるか (デフォルト :
                  false)。
                </li>
                <li>
                  autoAdd (Boolean) : 自動でシーンに追加するか (デフォルト :
                  true)。
                </li>
                <li>
                  onProgress (Function) : GLTFの読み込み進捗コールバック。
                </li>
                <li>
                  onLoad (Function) : GLTFの読み込み完了コールバック。
                </li>
              </ul>
            </div>
          </>
        }
      >
        <p>GLTFモデルを読み込み、オプションに基づいてシーンに追加します。</p>
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
        戻り値は Mesh ではなく GLTF オブジェクトです。
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
      <H3>GLTFモデルの表示</H3>
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
camera.position.set(2, 2, 0);
controls.target.set(0, 1, 0);

controls.connect();

helper.axes();
helper.grid();

load.gltf("/easy-three/model/didelta_spinosa/didelta_spinosa_1k.gltf");

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
camera.position.set(2, 2, 0);
controls.target.set(0, 1, 0);

controls.connect();

helper.axes();
helper.grid();

let model;
load.gltf("/easy-three/model/didelta_spinosa/didelta_spinosa_1k.gltf").then((gltf) => {
  model = gltf;
});

animate(({ delta }) => {
  if (model) {
    model.scene.rotation.y += delta;
  }
});
`}
      </CodeBlock>
    </div>
  );
}
