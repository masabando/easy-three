import CodeBlock from "@/components/CodeBlock";
import ReferenceContent from "@/components/ReferenceContent";
import H1 from "@/components/H1";
import H2 from "@/components/H2";
import H3 from "@/components/H3";
import { Ex1, Ex2 } from "./Codes";

export const metadata = {
  title: "create.ambientLight",
};

export default function Reference_Create_AmbientLight() {
  return (
    <div>
      <H1>create.ambientLight</H1>
      <ReferenceContent
        name="create.ambientLight"
        args="props : Object"
        returnObject="Light"
        argsInfo={
          <div>
            <span>props</span> - 設定オブジェクト。
            <ul className="list-disc list-inside ml-4">
              <li>color (Hex) : ライトの色 (デフォルト : 0xffffff)。</li>
              <li>intensity (Number) : 光の強さ (デフォルト : 0.5)。</li>
            </ul>
          </div>
        }
      >
        <p>環境光を作成してシーンに追加します。</p>
      </ReferenceContent>

      <p className="mt-4">
        環境光は全体を均等に照らす光源です。
        <br />
        シーン全体に均等に光を当てるため、影は作成されません。
      </p>

      <H2 className="mt-14">コードの例</H2>
      <H3>環境光</H3>
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

const cube = create.cube()

animate(({ delta }) => {
  cube.rotation.x += delta;
  cube.rotation.y += delta;
});
`}
      </CodeBlock>
      <H3 className="mt-10">光量を変化させる</H3>
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
const ambientLight = create.ambientLight()

const cube = create.cube()

animate(({ delta, time }) => {
  cube.rotation.x += delta;
  cube.rotation.y += delta;
  ambientLight.intensity = Math.sin(time) * 0.5 + 0.5;
});
`}
      </CodeBlock>
    </div>
  );
}
