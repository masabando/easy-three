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
    create.pointLight({
      position: [0, 0, 2],
    });

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
    const pointLight = create.pointLight({
      position: [0, 0, 2],
    });

    const cube = create.cube();

    animate(({ delta, time }) => {
      cube.rotation.x += delta;
      cube.rotation.y += delta;
      pointLight.intensity = Math.sin(time) * 1 + 1;
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
      <title>create.pointLight | easy-three</title>
      <h1>create.pointLight</h1>
      <ReferenceContent
        name="create.pointLight"
        args="props : Object"
        returnObject="Light"
        argsInfo={
          <div>
            <span>props</span> - 設定オブジェクト。
            <ul>
              <li>color (Hex) : ライトの色 (デフォルト : 0xffffff)。</li>
              <li>intensity (Number) : 光の強さ (デフォルト : 1)。</li>
              <li>distance (Number) : ライトの距離 (デフォルト : 0)。</li>
              <li>decay (Number) : 光の減衰率 (デフォルト : 2)。</li>
              <li>position (Array) : 位置 (デフォルト : [6, 6, 6])。</li>
              <li>
                castShadow (Boolean) : 影を投影するかどうか (デフォルト :
                true)。
              </li>
              <li>
                shadow (Object) : シャドウの設定 (デフォルト :{" "}
                {`{width: 1024, height: 1024}`})。
              </li>
            </ul>
          </div>
        }
      >
        点光源を作成してシーンに追加します。
      </ReferenceContent>

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
create.pointLight({
  position: [0, 0, 2],
});

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
const pointLight = create.pointLight({
  position: [0, 0, 2],
});

const cube = create.cube()

animate(({ delta, time }) => {
  cube.rotation.x += delta;
  cube.rotation.y += delta;
  pointLight.intensity = Math.sin(time) * 1 + 1;
});
`}
      </CodeBlock>
    </Container>
  );
}
