"use client";
import Container from "react-bootstrap/Container";
import CodeBlock from "@/components/CodeBlock";
import { useEffect, useRef } from "react";
import { init } from "@dist/easy-three.js";
import ReferenceContent from "@/components/ReferenceContent";
import { Note } from "@/components/BaseKit";

function Ex1(props) {
  const ref = useRef();
  useEffect(() => {
    const { camera, create, animate, destroy, THREE, Default } = init(ref.current);
    camera.position.set(0, 0, 2);
    create.ambientLight();

    const cube = create.cube()

    animate(({ delta }) => {
      cube.rotation.x += delta;
      cube.rotation.y += delta;
    });
    return () => {
      destroy();
    };
  }, []);
  return <div ref={ref} {...props}></div>;
}

function Ex2(props) {
  const ref = useRef();
  useEffect(() => {
    const { camera, create, animate, destroy, THREE, Default } = init(
      ref.current
    );
    camera.position.set(0, 0, 2);
    const ambientLight = create.ambientLight();

    const cube = create.cube();

    animate(({ delta, time }) => {
      cube.rotation.x += delta;
      cube.rotation.y += delta;
      ambientLight.intensity = Math.sin(time) * 0.5 + 0.5;
    });
    return () => {
      destroy();
    };
  }, []);
  return <div ref={ref} {...props}></div>;
}



export default function Reference_Create_Cube() {
  return (
    <Container className="pt-4 pb-5">
      <title>create.ambientLight | easy-three</title>
      <h1>create.ambientLight</h1>
      <ReferenceContent
        name="create.ambientLight"
        args="props : Object"
        returnObject="Light"
        argsInfo={
          <div>
            <span>props</span> - 設定オブジェクト。
            <ul>
              <li>color (Hex) : ライトの色 (デフォルト : 0xffffff)。</li>
              <li>intensity (Number) : 光の強さ (デフォルト : 0.5)。</li>
            </ul>
          </div>
        }
      >
        <p>環境光を作成してシーンに追加します。</p>
      </ReferenceContent>

      <p>
        環境光は全体を均等に照らす光源です。
        <br />
        シーン全体に均等に光を当てるため、影は作成されません。
      </p>

      <h2>コードの例</h2>
      <h4>環境光</h4>
      <Ex1
        className="border"
        style={{
          width: "240px",
          height: "240px",
        }}
      />
      <CodeBlock>
        {`const { camera, create, animate } = init()
camera.position.set(0, 0, 2)
create.ambientLight()

const cube = create.cube()

animate(({ delta }) => {
  cube.rotation.x += delta;
  cube.rotation.y += delta;
});
`}
      </CodeBlock>
      <h4 className="mt-5">光量を変化させる</h4>
      <Ex2
        className="border"
        style={{
          width: "240px",
          height: "240px",
        }}
      />
      <CodeBlock>
        {`const { camera, create, animate } = init()
camera.position.set(0, 0, 2)
const ambientLight = create.ambientLight()

const cube = create.cube()

animate(({ delta, time }) => {
  cube.rotation.x += delta;
  cube.rotation.y += delta;
  ambientLight.intensity = Math.sin(time) * 0.5 + 0.5;
});
`}
      </CodeBlock>
    </Container>
  );
}
