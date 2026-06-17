import CodeBlock from "@/components/CodeBlock";
import ReferenceContent from "@/components/ReferenceContent";
import H1 from "@/components/H1";
import H2 from "@/components/H2";
import H3 from "@/components/H3";
import { Ex1 } from "./Codes";

export const metadata = {
  title: "create.hemisphereLight",
};

export default function Reference_Create_HemisphereLight() {
  return (
    <div>
      <H1>create.hemisphereLight</H1>
      <ReferenceContent
        name="create.hemisphereLight"
        args="props : Object"
        returnObject="Light"
        argsInfo={
          <div>
            <span>props</span> - 設定オブジェクト。
            <ul className="list-disc list-inside ml-4">
              <li>
                skyColor (Hex) : 上部からのライトの色 (デフォルト : 0xeeddff)。
              </li>
              <li>
                groundColor (Hex) : 下部からのライトの色 (デフォルト :
                0x887777)。
              </li>
              <li>intensity (Number) : 光の強さ (デフォルト : 0.5)。</li>
            </ul>
          </div>
        }
      >
        <p>半球光源を作成してシーンに追加します。</p>
      </ReferenceContent>

      <p className="mt-4">
        半球光源は、上部からの光と下部からの光を持つ光源です。
        <br />
        上部からの光は空の色を表し、下部からの光は地面からの反射光を表します。
        <br />
        環境光と同じくシーン全体を均一に照らすために使用されますが、上部と下部の光の色を別々に設定できる点が異なります。
        <br />
        半球光源では影は生成されません。
      </p>

      <H2 className="mt-14">コードの例</H2>
      <H3>半球光源</H3>
      <Ex1
        className="border my-4"
        style={{
          width: "240px",
          height: "240px",
        }}
      />
      <CodeBlock>
        {`const { camera, create, animate } = init()
camera.position.set(0, 0, 2);

create.hemisphereLight({
  skyColor: 0x0000ff,
  groundColor: 0xff0000,
});

const cube = create.cube({
  option: {
    color: "#ffffff",
  }
})

animate(({ delta }) => {
  cube.rotation.x += delta;
  cube.rotation.y += delta;
});
`}
      </CodeBlock>
    </div>
  );
}
