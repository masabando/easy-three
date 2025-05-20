"use client"
import Container from "react-bootstrap/Container";
import CodeBlock from "@/components/CodeBlock";
import { useEffect, useRef } from "react";
import { init } from "@dist/easy-three.js";
import ReferenceContent from "@/components/ReferenceContent";
import { Note } from "@/components/BaseKit";


function Ex1(props) {
  const ref = useRef();
  useEffect(() => {
    const { camera, controls, create, animate, destroy } = init(ref.current);
    controls.connect();
    camera.position.set(0, 1, -4);
    create.ambientLight();
    create.directionalLight();
    create.plane({
      size: 10,
      rotation: [-Math.PI / 2, 0, 0]
    });
    create.sky();
    animate();
    return () => {
      destroy();
    };
  }, []);
  return <div ref={ref} {...props}></div>;
}

function Ex2(props) {
  const ref = useRef();
  useEffect(() => {
    const { camera, controls, create, animate, destroy } = init(ref.current);
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
    return () => {
      destroy();
    };
  }, []);
  return <div ref={ref} {...props}></div>;
}



export default function Reference_Create_Cube() {
  return (
    <Container className="pt-4 pb-5">
      <title>create.sky | easy-three</title>
      <h1>create.sky</h1>
      <ReferenceContent
        name="create.sky"
        args="props : Object"
        returnObject="Mesh"
        argsInfo={
          <div>
            <span>props</span> - 設定オブジェクト。
            <ul>
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
        <p>
          sizeには十分大きな値を指定してください。
        </p>
        <p>
          phi は太陽の方位角、theta は太陽の頂点からの角度を指定します。
        </p>
      </ReferenceContent>
      <h2>コードの例</h2>
      <h4>空の作成</h4>
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

      <h4 className="mt-5">角度の変更</h4>
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

    </Container>
  );
}
