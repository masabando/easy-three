import CodeBlock from "@/components/CodeBlock";
import H1 from "@/components/H1";
import H2 from "@/components/H2";
import H3 from "@/components/H3";
import { Ex1 } from "./Codes";

export const metadata = {
  title: "transformControls",
};

export default function Page() {
  return (
    <div>
      <H1>transformControls</H1>

      <p>
        オブジェクトの位置、回転、スケールをユーザが操作するための仕組みを提供します。
      </p>

      <H2 className="mt-14">使用方法</H2>
      <p>まず、init() の戻り値から <code>transformControls</code> を取得します。</p>
      <CodeBlock>{`const { create, camera, controls, animate, transformControls } = init();`}</CodeBlock>
      <p className="mt-4">その後、対象のオブジェクトを引数にして <code>attach()</code> を呼び出すことで有効化されます。</p>
      <CodeBlock>{`transformControls.attach(object)`}</CodeBlock>

      <p className="mt-4">
        オプション引数で、モードや、操作中の OrbitControls の有効化の有無を指定することができます。
      </p>
      <CodeBlock>{`transformControls.attach(object, {
  mode: "translate", // "translate" | "rotate" | "scale"
  disableOrbitControls: true, // 操作中の OrbitControls の有効化の有無
})`}</CodeBlock>
      <p className="mt-4">
        戻り値のオブジェクトは、three.js の
        <a
          className="link link-primary"
          href="https://threejs.org/docs/#TransformControls"
          target="_blank"
          rel="noopener noreferrer"
        >
          TransformControls
        </a> のインスタンスです。<br />
      </p>

      <H2 className="mt-14">サンプルコード</H2>

      <Ex1
        className="border mt-4"
        style={{
          width: "240px",
          height: "240px",
        }}
      />

      <CodeBlock>
        {`const { camera, create, animate, controls, transformControls } = init();

camera.position.set(0, 0, 3);

controls.connect();
create.ambientLight();
create.directionalLight();

const cube1 = create.cube({
  position: [1, 0, 0],
});

const cube2 = create.cube({
  position: [-1, 0, 0],
});

transformControls.attach(cube1)

transformControls.attach(cube2, {
  mode: "rotate"
})

animate();
`}
      </CodeBlock>
    </div>
  );
}
