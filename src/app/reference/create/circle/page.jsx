import CodeBlock from "@/components/CodeBlock";
import ReferenceContent from "@/components/ReferenceContent";
import H1 from "@/components/H1";
import H2 from "@/components/H2";
import H3 from "@/components/H3";
import { Ex1, Ex2 } from "./Codes";
import MeshBaseProps from "@/app/reference/create/MeshBaseProps";

export const metadata = {
  title: "create.circle",
};

export default function Reference_Create_Circle() {
  return (
    <div>
      <H1>create.circle / create.ring</H1>
      <ReferenceContent
        name="create.circle"
        args="props : Object"
        returnObject="Mesh"
        argsInfo={
          <div>
            <span>props</span> - 設定オブジェクト。
            <ul className="list-disc list-inside ml-4">
              <li>size (Number) : サイズ (デフォルト : 1)。</li>
              <li>segments (Number) : 分割数 (デフォルト : 32)。</li>
              <MeshBaseProps />
            </ul>
          </div>
        }
      >
        <p>円を作成してシーンに追加します。</p>
      </ReferenceContent>

      <ReferenceContent
        name="create.ring"
        args="props : Object"
        returnObject="Mesh"
        argsInfo={
          <div>
            <span>props</span> - 設定オブジェクト。
            <ul className="list-disc list-inside ml-4">
              <li>size (Array | Number) : サイズ (デフォルト : [0.5, 1])。</li>
              <li>
                segments (Number | Array) : 分割数 (デフォルト : [32, 1])。
              </li>
              <li>angle (Number | Array) : 描画する角度の始点と終点 (デフォルト : [0, Math.PI * 2])。</li>
              <MeshBaseProps />
            </ul>
          </div>
        }
      >
        <p>リングを作成してシーンに追加します。</p>
      </ReferenceContent>

      <H2 className="mt-14">コードの例</H2>
      <H3>円</H3>
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

create.circle()

animate()
`}
      </CodeBlock>

      <H3 className="mt-10">リング</H3>
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

create.ring()

animate()
`}
      </CodeBlock>
    </div>
  );
}
