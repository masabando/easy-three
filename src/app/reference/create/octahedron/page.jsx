import CodeBlock from "@/components/CodeBlock";
import ReferenceContent from "@/components/ReferenceContent";
import H1 from "@/components/H1";
import H2 from "@/components/H2";
import H3 from "@/components/H3";
import { Ex1, Ex2 } from "./Codes";

export const metadata = {
  title: "create.octahedron",
};

export default function Reference_Create_Octahedron() {
  return (
    <div>
      <H1>create.octahedron</H1>
      <ReferenceContent
        name="create.octahedron"
        args="props : Object"
        returnObject="Mesh"
        argsInfo={
          <div>
            <span>props</span> - 設定オブジェクト。
            <ul className="list-disc list-inside ml-4">
              <li>size (Number) : サイズ (デフォルト : 1)。</li>
              <li>detail (Number) : ディテール (デフォルト : 0)。</li>
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
        <p>八面体を作成してシーンに追加します。</p>
      </ReferenceContent>
      <p>
        detail
        を増やすことで、さらに多くの面を持つ立体を作成することができます。
      </p>

      <H2 className="mt-14">コードの例</H2>
      <H3>八面体</H3>
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

const octahedron = create.octahedron()

animate(({ delta }) => {
  octahedron.rotation.x += delta;
  octahedron.rotation.y += delta;
})
`}
      </CodeBlock>

      <H3 className="mt-10">多面体</H3>
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

const octahedron = create.octahedron({
  detail: 1,
})

animate(({ delta }) => {
  octahedron.rotation.x += delta;
  octahedron.rotation.y += delta;
})
`}
      </CodeBlock>
    </div>
  );
}
