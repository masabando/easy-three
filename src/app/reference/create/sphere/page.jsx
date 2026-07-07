import CodeBlock from "@/components/CodeBlock";
import ReferenceContent from "@/components/ReferenceContent";
import H1 from "@/components/H1";
import H2 from "@/components/H2";
import H3 from "@/components/H3";
import { Ex1, Ex2, Ex3 } from "./Codes";
import MeshBaseProps from "@/app/reference/create/MeshBaseProps";

export const metadata = {
  title: "create.sphere",
};

export default function Reference_Create_Sphere() {
  return (
    <div>
      <H1>create.sphere</H1>
      <ReferenceContent
        name="create.sphere"
        args="props : Object"
        returnObject="Mesh"
        argsInfo={
          <div>
            <span>props</span> - 設定オブジェクト。
            <ul className="list-disc list-inside ml-4">
              <li>size (Number) : 半径 (デフォルト : 1)。</li>
              <li>
                segments (Array | Number) : セグメント (デフォルト : 64)。
              </li>
              <MeshBaseProps />
            </ul>
          </div>
        }
      >
        <p>球体を作成してシーンに追加します。</p>
        <p>
          segments については、通常2つの値を持つ配列で指定します。
          <br />
          配列でなく1つの数値を指定した場合、その値を2つ持つ配列として扱います。
          <br />
          (例 : segments: 16 は [16, 16] と同じ)
        </p>
      </ReferenceContent>
      <H2 className="mt-14">コードの例</H2>
      <H3>球の作成</H3>
      <Ex1
        className="border"
        style={{
          width: "240px",
          height: "240px",
        }}
      />
      <CodeBlock>
        {`const { camera, create, animate } = init()
camera.position.set(0, 0, 2)
create.ambientLight()
create.directionalLight()

create.sphere()

animate()
`}
      </CodeBlock>

      <H3 className="mt-10">アニメーション</H3>
      <Ex2
        className="border"
        style={{
          width: "240px",
          height: "240px",
        }}
      />
      <CodeBlock>
        {`const { camera, create, animate } = init()
camera.position.set(0, 0, 2)
create.ambientLight()
create.directionalLight()

const sphere = create.sphere()

animate(({ time }) => {
  sphere.position.x = Math.sin(time)
})
`}
      </CodeBlock>

      <H3 className="mt-10">オプションの変更</H3>
      <Ex3
        className="border"
        style={{
          width: "240px",
          height: "240px",
        }}
      />
      <CodeBlock>
        {`const { camera, create, animate } = init()
camera.position.set(0, 0, 4);
create.ambientLight();
create.directionalLight();

create.sphere({
  size: 0.5,
  position: [-1, 0, 0],
  material: "Normal",
});

create.sphere({
  size: 0.7,
  position: [1, 0, 0],
  option: {
    // material settings
    color: 0x00ff00,
    metalness: 0.6,
    roughness: 0,
    transparent: true,
    opacity: 0.5,
  },
});

const sphere3 = create.sphere({
  size: 1.5,
  position: [0, 0, -3],
});

animate(({ time }) => {
  sphere3.position.y = Math.sin(time) * 2;
});
`}
      </CodeBlock>
    </div>
  );
}
