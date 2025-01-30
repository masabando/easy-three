"use client";
import Container from "react-bootstrap/Container";
import CodeBlock from "@/components/CodeBlock";
import { useEffect, useRef } from "react";
import { init } from "@dist/easy-three.js";
import { noto } from "@/app/layout";
import ReferenceContent from "@/components/ReferenceContent";
import { Note, Link } from "@/components/BaseKit";

function Ex1(props) {
  const ref = useRef();
  useEffect(() => {
    const { camera, create, helper, controls, animate, destroy } = init(ref.current);
    create.ambientLight();
    create.directionalLight();
    camera.position.set(2, 2, 2);

    controls.connect()
    helper.grid();

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
      <title>helper.grid | easy-three</title>
      <h1>helper.grid</h1>

      <ReferenceContent
        name="helper.grid"
        args="props : Object"
        returnObject="GridHelper"
        argsInfo={
          <div>
            <span>props</span> - 設定オブジェクト。
            <ul>
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

      <h2>コードの例</h2>
      <h4>グリッドヘルパーの表示</h4>
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
    </Container>
  );
}
