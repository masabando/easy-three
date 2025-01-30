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
    helper.axes();

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
      <title>helper.axes | easy-three</title>
      <h1>helper.axes</h1>

      <ReferenceContent
        name="helper.axes"
        args="props : Object"
        returnObject="AxesHelper"
        argsInfo={
          <div>
            <span>props</span> - 設定オブジェクト。
            <ul>
              <li>size (Number) : 軸ヘルパーのサイズ (デフォルト : 10)。</li>
            </ul>
          </div>
        }
      >
        軸ヘルパーを作成してシーンに追加します。
      </ReferenceContent>

      <h2>コードの例</h2>
      <h4>軸ヘルパーの表示</h4>
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
    </Container>
  );
}
