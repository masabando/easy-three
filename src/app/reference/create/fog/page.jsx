import CodeBlock from "@/components/CodeBlock";
import ReferenceContent from "@/components/ReferenceContent";
import H1 from "@/components/H1";
import H2 from "@/components/H2";
import H3 from "@/components/H3";
import { Ex1 } from "./Codes";

export const metadata = {
  title: "create.fog",
};

export default function Page() {
  return (
    <div>
      <H1>create.fog</H1>

      <ReferenceContent
        name="create.fog"
        args="props : Object"
        returnObject="Fog"
        argsInfo={
          <>
            <div>
              <span>props</span> - 設定オブジェクト。
              <ul className="list-disc list-inside ml-4">
                <li>
                  color (String | Hex) : フォグの色 (デフォルト : 0xffffff)。
                </li>
                <li>near (Number) : フォグの開始距離 (デフォルト : 1)。</li>
                <li>far (Number) : フォグの終了距離 (デフォルト : 1000)。</li>
              </ul>
            </div>
          </>
        }
      >
        <p>フォグを作成してシーンに追加します。</p>
      </ReferenceContent>

      <H2 className="mt-14">コードの例</H2>
      <H3>フォグの利用</H3>
      <Ex1
        className="border"
        style={{
          width: "240px",
          height: "240px",
        }}
      />
      <CodeBlock>
        {`const { camera, create, animate } = init()
create.ambientLight();
create.directionalLight();

create.fog({ near: 1, far: 4 });

camera.position.set(0, 0, 3);

const cube = create.cube();

animate(({ delta }) => {
  cube.rotation.x += delta;
  cube.rotation.y += delta;
});
`}
      </CodeBlock>

    </div>
  );
}
