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
    camera.position.set(0, 2, 2);
    create.ambientLight();
    create.directionalLight();

    const octahedron = create.octahedron();

    animate(({ delta }) => {
      octahedron.rotation.x += delta;
      octahedron.rotation.y += delta;
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
    camera.position.set(0, 2, 2);
    create.ambientLight();
    create.directionalLight();

    const octahedron = create.octahedron({
      detail: 1,
    });

    animate(({ delta }) => {
      octahedron.rotation.x += delta;
      octahedron.rotation.y += delta;
    })
    return () => {
      destroy();
    };
  }, []);
  return <div ref={ref} {...props}></div>;
}



export default function Reference_Create_Cube() {
  return (
    <Container className="pt-4 pb-5">
      <title>create.octahedron | easy-three</title>
      <h1>create.octahedron</h1>
      <ReferenceContent
        name="create.octahedron"
        args="props : Object"
        returnObject="Mesh"
        argsInfo={
          <div>
            <span>props</span> - 設定オブジェクト。
            <ul>
              <li>size (Number) : サイズ (デフォルト : 1)。</li>
              <li>detail (Number) : ディテール (デフォルト : 0)。</li>
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
        <p>八面体を作成してシーンに追加します。</p>
      </ReferenceContent>
      <p>
        detail
        を増やすことで、さらに多くの面を持つ立体を作成することができます。
      </p>

      <h2>コードの例</h2>
      <h4>八面体</h4>
      <Ex1
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

const octahedron = create.octahedron()

animate(({ delta }) => {
  octahedron.rotation.x += delta;
  octahedron.rotation.y += delta;
})
`}
      </CodeBlock>

      <h4 className="mt-5">多面体</h4>
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

const octahedron = create.octahedron({
  detail: 1,
})

animate(({ delta }) => {
  octahedron.rotation.x += delta;
  octahedron.rotation.y += delta;
})
`}
      </CodeBlock>
    </Container>
  );
}
