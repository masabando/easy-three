import CodeBlock from "@/components/CodeBlock";
import H1 from "@/components/H1";
import H2 from "@/components/H2";
import H3 from "@/components/H3";
import { Ex1 } from "./Codes";

export const metadata = {
  title: "controls",
};

export default function Page() {
  return (
    <div>
      <H1>controls</H1>

      <div
        className="alert mb-3 alert-info alert-soft"
        type="info"
        >
            Three.js の r175 で OrbitControls の connect() の引数に対象要素が必要となりましたが、easy-three の connect() には必要ありません。<br />
            easy-three のcontrols の実態はただの OrbitControls インスタンスですが、この変更を受けて connect() のデフォルト引数を renderer.domElement としています。
      </div>

      <p>カメラの操作を行うためのコントロールを提供します。</p>
      <p>
        以下を設定済みの{" "}
        <a
          className="text-blue-600 underline"
          href="https://threejs.org/docs/#examples/en/controls/OrbitControls"
          target="_blank"
          rel="noreferrer"
        >
          Three.js の OrbitControls
        </a>{" "}
        です。
      </p>
      <ul className="list-disc list-inside ml-4 my-4">
        <li>enableDamping = true</li>
        <li>dampingFactor = 0.25</li>
      </ul>
      <p>
        初期状態では無効化されています。
        <br />
        connect() を呼び出すことで有効化されます。
      </p>
      <CodeBlock>{`controls.connect()`}</CodeBlock>
      <p>無効化する場合は、disconnect() を呼び出します。</p>
      <CodeBlock>{`controls.disconnect()`}</CodeBlock>

      <H2 className="mt-14">コードの例</H2>
      <H3>視点移動</H3>
      <p>マウス操作で視点移動ができます。</p>
      <Ex1
        className="border my-4"
        style={{
          width: "240px",
          height: "240px",
        }}
      />

      <CodeBlock>
        {`const { camera, create, animate, controls } = init();

controls.connect()

camera.position.set(0, 0, 2);

create.ambientLight();
create.directionalLight();

create.cube();

animate();
`}
      </CodeBlock>
    </div>
  );
}
