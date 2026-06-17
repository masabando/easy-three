import CodeBlock from "@/components/CodeBlock";
import ReferenceContent from "@/components/ReferenceContent";
import H1 from "@/components/H1";
import H2 from "@/components/H2";
import H3 from "@/components/H3";
import { Ex1, Ex2 } from "./Codes";

export const metadata = {
  title: "create.capsule",
};

export default function Reference_Create_Capsule() {
  return (
    <div>
      <H1>create.capsule / create.cylinder</H1>
      <ReferenceContent
        name="create.capsule"
        args="props : Object"
        returnObject="Mesh"
        argsInfo={
          <div>
            <span>props</span> - 設定オブジェクト。
            <ul className="list-disc list-inside ml-4">
              <li>size (Array | Number) : サイズ (デフォルト : 1)。</li>
              <li>segments (Number | Array) : 分割数 (デフォルト : [10, 20])。</li>
              <li>position (Array) : 位置 (デフォルト : [0, 0, 0])。</li>
              <li>rotation (Array) : 回転 (デフォルト : [0, 0, 0])。</li>
              <li>
                option (Object) : オプション (デフォルト :{" "}
                {`{color: Default.color }`})。
              </li>
              <li>
                material (String) : マテリアルタイプ (デフォルト :
                {`Default.material`})。
              </li>
              <li>
                castShadow (Boolean) : 別のオブジェクトに影を落とすかどうか
                (デフォルト : true)。
              </li>
              <li>
                receiveShadow (Boolean) :
                別のオブジェクトからの影を受けるかどうか (デフォルト : true)。
              </li>
              <li>
                autoAdd (Boolean) : 自動でシーンに追加 (デフォルト : true)。
              </li>
            </ul>
          </div>
        }
      >
        <p>カプセルを作成してシーンに追加します。</p>
      </ReferenceContent>
      <p className="mt-4">
        size と segments については、通常2つの値を持つ配列で指定します。
        <br />
        配列でなく1つの数値を指定した場合、その値を2つ持つ配列として扱います。
        <br />
        (例 : segments: 64 は [64, 64] と同じ)
      </p>

      <ReferenceContent
        name="create.cylinder"
        args="props : Object"
        returnObject="Mesh"
        argsInfo={
          <div>
            <span>props</span> - 設定オブジェクト。
            <ul className="list-disc list-inside ml-4">
              <li>size (Array | Number) : サイズ (デフォルト : [1, 1, 2])。</li>
              <li>
                segments (Number | Array) : 分割数 (デフォルト : [32, 1])。
              </li>
              <li>
                openEnded (Boolean) : 両端を開けるかどうか (デフォルト : false)。
              </li>
              <li>thetaStart (Number) : 開始角度 (デフォルト : 0)。
              </li>
              <li>
                thetaLength (Number) : 角度の長さ (デフォルト : {`Math.PI * 2`} )。
              </li>
              <li>position (Array) : 位置 (デフォルト : [0, 0, 0])。</li>
              <li>rotation (Array) : 回転 (デフォルト : [0, 0, 0])。</li>
              <li>
                option (Object) : オプション (デフォルト :{" "}
                {`{color: Default.color }`})。
              </li>
              <li>
                material (String) : マテリアルタイプ (デフォルト :
                {`Default.material`})。
              </li>
              <li>
                castShadow (Boolean) : 別のオブジェクトに影を落とすかどうか
                (デフォルト : true)。
              </li>
              <li>
                receiveShadow (Boolean) :
                別のオブジェクトからの影を受けるかどうか (デフォルト : true)。
              </li>
              <li>
                autoAdd (Boolean) : 自動でシーンに追加 (デフォルト : true)。
              </li>
            </ul>
          </div>
        }
      >
        <p>円柱を作成してシーンに追加します。</p>
      </ReferenceContent>
      <p className="mt-4">
        size については通常3つ、segments については通常2つの値を持つ配列で指定します。
        <br />
        配列でなく1つの数値を指定した場合、その値を3つまたは2つ持つ配列として扱います。
        <br />
        (例 : size: 1 は [1, 1, 1] と同じ)
      </p>

      <H2 className="mt-14">コードの例</H2>
      <H3>カプセル</H3>
      <Ex1
        className="border"
        style={{
          width: "240px",
          height: "240px",
        }}
      />
      <CodeBlock>
        {`const { camera, create, animate } = init()
camera.position.set(0, 0, 3)
create.ambientLight()
create.directionalLight()

create.capsule()

animate()
`}
      </CodeBlock>

      <H3 className="mt-10">円柱</H3>
      <Ex2
        className="border"
        style={{
          width: "240px",
          height: "240px",
        }}
      />
      <CodeBlock>
        {`const { camera, create, animate } = init()
camera.position.set(0, 2, 2)
create.ambientLight()
create.directionalLight()

create.cylinder()

animate()
`}
      </CodeBlock>
    </div>
  );
}
