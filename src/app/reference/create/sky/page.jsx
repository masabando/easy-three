import CodeBlock from "@/components/CodeBlock";
import ReferenceContent from "@/components/ReferenceContent";
import H1 from "@/components/H1";
import H2 from "@/components/H2";
import H3 from "@/components/H3";
import { Ex1, Ex2 } from "./Codes";

export const metadata = {
  title: "create.sky",
};



export default function Reference_Create_Sky() {
  return (
    <div>
      <H1>create.sky</H1>
      <ReferenceContent
        name="create.sky"
        args="props : Object"
        returnObject="Mesh"
        argsInfo={
          <div>
            <span>props</span> - 設定オブジェクト。
            <ul className="list-disc list-inside ml-4">
              <li>size (Array | Number) : サイズ (デフォルト : 10000)。</li>
              <li>
                phi (Number) : 太陽の方位角 (デフォルト : 0)。
              </li>
              <li>theta (Number) : 太陽の頂点からの角度 (デフォルト : Math.PI * 0.47)。</li>
              <li>
                autoAdd (Boolean) : 自動でシーンに追加 (デフォルト : true)。
              </li>
            </ul>
          </div>
        }
      >
        <p>
          空を作成します。
        </p>
        <p className="mt-4">
          sizeには十分大きな値を指定してください。
        </p>
        <p className="mt-4">
          phi は太陽の方位角、theta は太陽の頂点からの角度を指定します。
        </p>
      </ReferenceContent>
      <H2 className="mt-14">コードの例</H2>
      <H3>空の作成</H3>
      <Ex1
        className="border"
        style={{
          width: "240px",
          height: "240px",
        }}
      />
      <CodeBlock>
        {`const { camera, controls, create, animate } = init()
controls.connect();
camera.position.set(0, 1, -4);
create.ambientLight();
create.directionalLight();
create.plane({
  size: 10,
  rotation: [-Math.PI / 2, 0, 0]
});

create.sky();

animate();`
      }
      </CodeBlock>

      <H3 className="mt-10">角度の変更</H3>
      <Ex2
        className="border"
        style={{
          width: "240px",
          height: "240px",
        }}
      />
      <CodeBlock>
        {`const { camera, controls, create, animate } = init()
controls.connect();
camera.position.set(0, 1, -4);
create.ambientLight();
create.directionalLight();
create.plane({
  size: 10,
  rotation: [-Math.PI / 2, 0, 0]
});

create.sky({
  theta: Math.PI *0.495,
  phi: Math.PI * 0.1
});

animate();
`}
      </CodeBlock>

    </div>
  );
}
