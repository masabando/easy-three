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
    create.directionalLight();

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
    const directionalLight = create.directionalLight();

    const cube = create.cube();

    animate(({ delta, time }) => {
      cube.rotation.x += delta;
      cube.rotation.y += delta;
      directionalLight.intensity = Math.sin(time) * 0.5 + 0.5;
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
      <title>create.directionalLight | easy-three</title>
      <h1>create.directionalLight</h1>

      <ReferenceContent
        name="create.directionalLight"
        args="props : Object"
        returnObject="Light"
        argsInfo={
          <div>
            <span>props</span> - 設定オブジェクト。
            <ul>
              <li>intensity (Number) : 光の強さ (デフォルト : 1)。</li>
              <li>color (Hex) : ライトの色 (デフォルト : 0xffffff)。</li>
              <li>
                position (Array) : ライトの位置 (デフォルト : [10, 10, 10])。
              </li>
              <li>
                castShadow (Boolean) : 影を投影するかどうか (デフォルト :
                true)。
              </li>
              <li>
                shadow (Object) : シャドウの設定。
                <ul>
                  <li>
                    mapSize (Object) : シャドウマップのサイズ (デフォルト :{" "}
                    {`{width: 1024, height: 1024 }`})。
                  </li>
                  <li>
                    camera (Object) : シャドウカメラの設定。
                    <ul>
                      <li>
                        left (Number) : カメラの左範囲 (デフォルト : -10)。
                      </li>
                      <li>
                        right (Number) : カメラの右範囲 (デフォルト : 10)。
                      </li>
                      <li>top (Number) : カメラの上範囲 (デフォルト : 10)。</li>
                      <li>
                        bottom (Number) : カメラの下範囲 (デフォルト : -10)。
                      </li>
                    </ul>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        }
      >
        <p>平行光源を作成してシーンに追加します。</p>
      </ReferenceContent>

      <p>
        この光源は、シーン全体に均等に光を当てる環境光とは異なり、特定の方向からの光を当てることができます。
        <br />
        そのため、影を作成することができます。
      </p>

      <h2>コードの例</h2>
      <h4>並行光源</h4>
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
create.directionalLight()

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
const directionalLight = create.directionalLight()

const cube = create.cube()

animate(({ delta, time }) => {
  cube.rotation.x += delta;
  cube.rotation.y += delta;
  directionalLight.intensity = Math.sin(time) * 0.5 + 0.5;
});
`}
      </CodeBlock>
    </Container>
  );
}
