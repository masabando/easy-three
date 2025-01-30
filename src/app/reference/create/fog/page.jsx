"use client"
import Container from "react-bootstrap/Container";
import CodeBlock from "@/components/CodeBlock";
import { useEffect, useRef } from "react";
import { init } from "@dist/easy-three.js";
import { noto } from "@/app/layout"
import ReferenceContent from "@/components/ReferenceContent";
import { Note, Link } from "@/components/BaseKit";

function Ex1(props) {
  const ref = useRef();
  useEffect(() => {
    const { camera, create, animate, destroy } = init(ref.current);
    create.ambientLight();
    create.directionalLight();
    create.fog({ near: 1, far: 4 });
    camera.position.set(0, 0, 3);

    const cube = create.cube();
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



export default function Page() {
  return (
    <Container className="pt-4 pb-5">
      <title>create.fog | easy-three</title>
      <h1>create.fog</h1>

      <ReferenceContent
        name="create.fog"
        args="props : Object"
        returnObject="Fog"
        argsInfo={
          <>
            <div>
              <span>props</span> - 設定オブジェクト。
              <ul>
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

      <h2>コードの例</h2>
      <h4>フォグの利用</h4>
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

    </Container>
  );
}
