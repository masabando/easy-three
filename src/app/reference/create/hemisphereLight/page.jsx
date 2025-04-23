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

    create.hemisphereLight({
      skyColor: 0x0000ff,
      groundColor: 0xff0000,
    });

    const cube = create.cube({
      option: {
        color: "#ffffff",
      }
    })

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
      <title>create.hemisphereLight | easy-three</title>
      <h1>create.hemisphereLight</h1>
      <ReferenceContent
        name="create.hemisphereLight"
        args="props : Object"
        returnObject="Light"
        argsInfo={
          <div>
            <span>props</span> - 設定オブジェクト。
            <ul>
              <li>
                skyColor (Hex) : 上部からのライトの色 (デフォルト : 0xeeddff)。
              </li>
              <li>
                groundColor (Hex) : 下部からのライトの色 (デフォルト :
                0x887777)。
              </li>
              <li>intensity (Number) : 光の強さ (デフォルト : 0.5)。</li>
            </ul>
          </div>
        }
      >
        <p>半球光源を作成してシーンに追加します。</p>
      </ReferenceContent>

      <p>
        半球光源は、上部からの光と下部からの光を持つ光源です。
        <br />
        上部からの光は空の色を表し、下部からの光は地面からの反射光を表します。
        <br />
        環境光と同じくシーン全体を均一に照らすために使用されますが、上部と下部の光の色を別々に設定できる点が異なります。
        <br />
        半球光源では影は生成されません。
      </p>

      <h2>コードの例</h2>
      <h4>半球光源</h4>
      <Ex1
        className="border"
        style={{
          width: "240px",
          height: "240px",
        }}
      />
      <CodeBlock>
        {`const { camera, create, animate } = init()
camera.position.set(0, 0, 2);

create.hemisphereLight({
  skyColor: 0x0000ff,
  groundColor: 0xff0000,
});

const cube = create.cube({
  option: {
    color: "#ffffff",
  }
})

animate(({ delta }) => {
  cube.rotation.x += delta;
  cube.rotation.y += delta;
});
`}
      </CodeBlock>
    </Container>
  );
}
