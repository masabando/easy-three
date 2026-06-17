import CodeBlock from "@/components/CodeBlock";
import ReferenceContent from "@/components/ReferenceContent";
import H1 from "@/components/H1";
import H2 from "@/components/H2";
import H3 from "@/components/H3";
import { Ex1, Ex2 } from "./Codes";

export const metadata = {
  title: "create.torus",
};

export default function Reference_Create_Torus() {
  return (
    <div>
      <H1>create.torus / create.torusKnot</H1>
      <ReferenceContent
        name="create.torus"
        args="props : Object"
        returnObject="Mesh"
        argsInfo={
          <div>
            <span>props</span> - 設定オブジェクト。
            <ul className="list-disc list-inside ml-4">
              <li>size (Array | Number) : サイズ (デフォルト : 1)。</li>
              <li>tube (Number) : チューブの半径 (デフォルト : 0.4)。</li>
              <li>segments (Number | Array) : 分割数 (デフォルト : 64)。</li>
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
        <p>トーラスを作成してシーンに追加します。</p>
      </ReferenceContent>
      <p className="mt-4">
        segments については、通常2つの値を持つ配列で指定します。
        <br />
        配列でなく1つの数値を指定した場合、その値を2つ持つ配列として扱います。
        <br />
        (例 : segments: 64 は [64, 64] と同じ)
      </p>

      <ReferenceContent
        name="create.torusKnot"
        args="props : Object"
        returnObject="Mesh"
        argsInfo={
          <div>
            <span>props</span> - 設定オブジェクト。
            <ul className="list-disc list-inside ml-4">
              <li>size (Array | Number) : サイズ (デフォルト : 1)。</li>
              <li>tube (Number) : チューブの半径 (デフォルト : 0.3)。</li>
              <li>
                segments (Number | Array) : 分割数 (デフォルト : [128, 8])。
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
        <p>トーラス結び目を作成してシーンに追加します。</p>
      </ReferenceContent>
      <p className="mt-4">
        segments については、通常2つの値を持つ配列で指定します。
        <br />
        配列でなく1つの数値を指定した場合、その値を2つ持つ配列として扱います。
        <br />
        (例 : segments: 64 は [64, 64] と同じ)
      </p>

      <H2 className="mt-14">コードの例</H2>
      <H3>トーラス</H3>
      <Ex1
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

create.torus()

animate()
`}
      </CodeBlock>

      <H3 className="mt-10">トーラス結び目</H3>
      <Ex2
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

create.torusKnot()

animate()
`}
      </CodeBlock>
    </div>
  );
}
