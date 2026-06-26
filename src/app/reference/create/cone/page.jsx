import CodeBlock from "@/components/CodeBlock";
import ReferenceContent from "@/components/ReferenceContent";
import H1 from "@/components/H1";
import H2 from "@/components/H2";
import H3 from "@/components/H3";
import { Ex1, Ex2 } from "./Codes";
import MeshBaseProps from "@/app/reference/create/MeshBaseProps";

export const metadata = {
  title: "create.cone",
};

export default function Reference_Create_Cone() {
  return (
    <div>
      <H1>create.cone</H1>
      <ReferenceContent
        name="create.cone"
        args="props : Object"
        returnObject="Mesh"
        argsInfo={
          <div>
            <span>props</span> - 設定オブジェクト。
            <ul className="list-disc list-inside ml-4">
              <li>size (Array | Number) : サイズ (デフォルト : [1, 2])。</li>
              <li>segments (Number | Array) : 分割数 (デフォルト : [32, 1])。</li>
              <MeshBaseProps />
            </ul>
          </div>
        }
      >
        <p>円錐を作成してシーンに追加します。</p>
      </ReferenceContent>
      <p className="mt-4">
        size と segments については、通常2つの値を持つ配列で指定します。
        <br />
        配列でなく1つの数値を指定した場合、その値を2つ持つ配列として扱います。
        <br />
        (例 : segments: 64 は [64, 64] と同じ)
      </p>
      <p className="mt-4">
        segments の2つ目の値はそれぞれ、円周方向と高さ方向の分割数を表します。
        <br />
        一般的に高さ方向については1で十分ですが、円周方向については大きくすることで円錐となり、小さくすることで三角錐などを表すことができます。
      </p>

      <H2 className="mt-14">コードの例</H2>
      <H3>円錐</H3>
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

create.cone()

animate()
`}
      </CodeBlock>

      <H3 className="mt-10">三角錐</H3>
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

const cone = create.cone({
  segments: [3, 1]
})

animate(({ delta }) => {
  cone.rotation.x += delta;
  cone.rotation.y += delta;
})
`}
      </CodeBlock>
    </div>
  );
}
