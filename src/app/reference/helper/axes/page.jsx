import CodeBlock from "@/components/CodeBlock";
import ReferenceContent from "@/components/ReferenceContent";
import { Ex1 } from "./Codes";
import H1 from "@/components/H1";
import H2 from "@/components/H2";
import H3 from "@/components/H3";

export const metadata = {
  title: "helper.axes",
};

export default function Page() {
  return (
    <div>
      <H1>helper.axes</H1>

      <ReferenceContent
        name="helper.axes"
        args="props : Object"
        returnObject="AxesHelper"
        argsInfo={
          <div>
            <span>props</span> - 設定オブジェクト。
            <ul className="list-disc list-inside ml-4">
              <li>size (Number) : 軸ヘルパーのサイズ (デフォルト : 10)。</li>
            </ul>
          </div>
        }
      >
        軸ヘルパーを作成してシーンに追加します。
      </ReferenceContent>

      <H2 className="mt-14">コードの例</H2>
      <H3>軸ヘルパーの表示</H3>
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

helper.axes();

create.cube();

animate();
`}
      </CodeBlock>
    </div>
  );
}
