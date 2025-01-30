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
    const { camera, create, animate, destroy } = init(ref.current);
    camera.position.set(0, 0, 3);
    create.ambientLight();
    create.directionalLight();

    create.circle();

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
    const { camera, create, animate, destroy, THREE, Default } = init(
      ref.current
    );
    camera.position.set(0, 0, 3);
    create.ambientLight();
    create.directionalLight();

    create.ring();

    animate()
    return () => {
      destroy();
    };
  }, []);
  return <div ref={ref} {...props}></div>;
}



export default function Reference_Create_Cube() {
  return (
    <Container className="pt-4 pb-5">
      <title>create.circle | easy-three</title>
      <h1>create.circle / create.ring</h1>
      <ReferenceContent
        name="create.circle"
        args="props : Object"
        returnObject="Mesh"
        argsInfo={
          <div>
            <span>props</span> - 設定オブジェクト。
            <ul>
              <li>size (Number) : サイズ (デフォルト : 1)。</li>
              <li>segments (Number) : 分割数 (デフォルト : 32)。</li>
              <li>position (Array) : 位置 (デフォルト : [0, 0, 0])。</li>
              <li>rotation (Array) : 回転 (デフォルト : [0, 0, 0])。</li>
              <li>
                option (Object) : オプション (デフォルト :{" "}
                {`{color: Default.color }`})。
              </li>
              <li>
                material (String) : マテリアルタイプ (デフォルト :
                {`Default.material`})。
              </li>
              <li>
                castShadow (Boolean) : 別のオブジェクトに影を落とすかどうか
                (デフォルト : true)。
              </li>
              <li>
                receiveShadow (Boolean) :
                別のオブジェクトからの影を受けるかどうか (デフォルト : true)。
              </li>
              <li>
                autoAdd (Boolean) : 自動でシーンに追加 (デフォルト : true)。
              </li>
            </ul>
          </div>
        }
      >
        <p>円を作成してシーンに追加します。</p>
      </ReferenceContent>

      <ReferenceContent
        name="create.ring"
        args="props : Object"
        returnObject="Mesh"
        argsInfo={
          <div>
            <span>props</span> - 設定オブジェクト。
            <ul>
              <li>size (Array | Number) : サイズ (デフォルト : [0.5, 1])。</li>
              <li>
                segments (Number | Array) : 分割数 (デフォルト : [32, 1])。
              </li>
              <li>angle (Number | Array) : 描画する角度の始点と終点 (デフォルト : [0, Math.PI * 2])。</li>
              <li>position (Array) : 位置 (デフォルト : [0, 0, 0])。</li>
              <li>rotation (Array) : 回転 (デフォルト : [0, 0, 0])。</li>
              <li>
                option (Object) : オプション (デフォルト :{" "}
                {`{color: Default.color }`})。
              </li>
              <li>
                material (String) : マテリアルタイプ (デフォルト :
                {`Default.material`})。
              </li>
              <li>
                castShadow (Boolean) : 別のオブジェクトに影を落とすかどうか
                (デフォルト : true)。
              </li>
              <li>
                receiveShadow (Boolean) :
                別のオブジェクトからの影を受けるかどうか (デフォルト : true)。
              </li>
              <li>
                autoAdd (Boolean) : 自動でシーンに追加 (デフォルト : true)。
              </li>
            </ul>
          </div>
        }
      >
        <p>リングを作成してシーンに追加します。</p>
      </ReferenceContent>

      <h2>コードの例</h2>
      <h4>円</h4>
      <Ex1
        className="border"
        style={{
          width: "240px",
          height: "240px",
        }}
      />
      <CodeBlock>
        {`const { camera, create, animate } = init()
camera.position.set(0, 0, 3)
create.ambientLight()
create.directionalLight()

create.circle()

animate()
`}
      </CodeBlock>

      <h4 className="mt-5">リング</h4>
      <Ex2
        className="border"
        style={{
          width: "240px",
          height: "240px",
        }}
      />
      <CodeBlock>
        {`const { camera, create, animate } = init()
camera.position.set(0, 2, 2)
create.ambientLight()
create.directionalLight()

create.ring()

animate()
`}
      </CodeBlock>
    </Container>
  );
}
