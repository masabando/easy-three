import CodeBlock from "@/components/CodeBlock";
import ReferenceContent from "@/components/ReferenceContent";
import { Ex1 } from "./Codes";
import H1 from "@/components/H1";
import H2 from "@/components/H2";
import H3 from "@/components/H3";

export const metadata = {
  title: "helper.grid",
};

export default function Page() {
  return (
    <div>
      <H1>helper.grid</H1>

      <ReferenceContent
        name="helper.grid"
        args="props : Object"
        returnObject="GridHelper"
        argsInfo={
          <div>
            <span>props</span> - 設定オブジェクト。
            <ul className="list-disc list-inside ml-4">
              <li>size (Number) : グリッドのサイズ (デフォルト : 10)。</li>
              <li>divisions (Number) : 分割数 (デフォルト : 10)。</li>
              <li>
                colorCenterLine (Hex) : 中心線の色 (デフォルト : 0x444444)。
              </li>
              <li>
                colorGrid (Hex) : グリッド線の色 (デフォルト : 0x888888)。
              </li>
            </ul>
          </div>
        }
      >
        グリッドヘルパーを作成してシーンに追加します。
      </ReferenceContent>

      <H2 className="mt-14">コードの例</H2>
      <H3>グリッドヘルパーの表示</H3>
      <Ex1
        className="border"
        style={{
          width: "240px",
          height: "240px",
        }}
      />
      <CodeBlock>
        {`const { camera, create, helper, animate } = init()
create.ambientLight();
create.directionalLight();
camera.position.set(2, 2, 2);

controls.connect()

helper.grid();

create.cube();

animate();
`}
      </CodeBlock>
    </div>
  );
}
