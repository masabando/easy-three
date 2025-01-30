"use client";
import Container from "react-bootstrap/Container";
import CodeBlock from "@/components/CodeBlock";
import ReferenceContent from "@/components/ReferenceContent";
import { Link } from "@/components/BaseKit";
import { useEffect, useRef } from "react";
import { init } from "@dist/easy-three.js";

function Ex1(props) {
  const ref = useRef();
  useEffect(() => {
    const { camera, create, animate, controls, destroy } = init(ref.current);

    controls.connect()
    camera.position.set(0, 0, 2);
    create.ambientLight();
    create.directionalLight();
    create.cube();
    animate();
    return () => {
      destroy();
    };
  }, []);
  return <div ref={ref} {...props}></div>;
}

export default function Page() {
  return (
    <Container className="pt-4 pb-5">
      <title>controls | easy-three</title>
      <h1 className="mb-5">controls</h1>

      <p>カメラの操作を行うためのコントロールを提供します。</p>
      <p>
        以下を設定済みの{" "}
        <a
          href="https://threejs.org/docs/#examples/en/controls/OrbitControls"
          target="_blank"
          rel="noreferrer"
        >
          Three.js の OrbitControls
        </a>{" "}
        です。
      </p>
      <ul>
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

      <h2>コードの例</h2>
      <h4>視点移動</h4>
      <p>マウス操作で視点移動ができます。</p>
      <Ex1
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
    </Container>
  );
}
