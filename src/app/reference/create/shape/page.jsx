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
    create.directionalLight();

    const shape = create.shape({
      shapes: [
        { position: [0, 0] },
        { position: [1, 0] },
        { position: [1, 1] },
        { position: [0, 1] }
      ],
      option: {
        color: Default.color,
        side: THREE.DoubleSide
      }
    });

    animate(({ delta }) => {
      shape.rotation.x += delta;
      shape.rotation.y += delta;
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
    create.ambientLight();
    create.directionalLight();

    const shape = create.shape({
      shapes: [
        { position: [0, 0] },
        { position: [0.2, 0.3, 0.8, 0.3, 1, 0], type: "curve" },
        { position: [0.7, 0.2, 0.7, 0.8, 1, 1], type: "curve" },
        { position: [0.8, 0.7, 0.2, 0.7, 0, 1], type: "curve" },
        { position: [0.3, 0.8, 0.3, 0.2, 0, 0], type: "curve" }
      ],
      option: {
        color: Default.color,
        side: THREE.DoubleSide,
      },
    });

    animate(({ delta }) => {
      shape.rotation.x += delta;
      shape.rotation.y += delta;
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
      <title>create.shape | easy-three</title>
      <h1>create.shape</h1>
      <ReferenceContent
        name="create.shape"
        args="props : Object"
        returnObject="Mesh"
        argsInfo={
          <div>
            <span>props</span> - 設定オブジェクト。
            <ul>
              <li>shapes (Array) : シェイプの配列 (デフォルト : [])。</li>
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
        <p>任意の形のシェイプを作成してシーンに追加します。</p>
      </ReferenceContent>
      <p>
        直線を用いる場合、shapes には position として 2要素 (x, y)
        の配列をもつオブジェクトの配列を指定します。
      </p>
      <CodeBlock>{`create.shape({
  shapes: [
    { position: [0, 0] },
    { position: [1, 0] },
    { position: [1, 1] },
    { position: [0, 1] }
  ]
})`}</CodeBlock>
      <p>
        ベジエ曲線を用いる場合、shapes には position として 6要素 (cp1X, cp1Y,
        cp2X, cp2Y, x, y) の配列をもつオブジェクトの配列を指定し、 type に
        "curve" を指定します。
        <br />
        この場合、cp1 は制御点1(始点側の制御点)、cp2 は制御点2(終点側の制御点)、x, y は終点を表します。
      </p>
      <CodeBlock>{`create.shape({
  shapes: [
    { position: [0, 0] },
    { position: [0.2, 0.3, 0.8, 0.3, 1, 0], type: "curve" },
    { position: [0.7, 0.2, 0.7, 0.8, 1, 1], type: "curve" },
    { position: [0.8, 0.7, 0.2, 0.7, 0, 1], type: "curve" },
    { position: [0.3, 0.8, 0.3, 0.2, 0, 0], type: "curve" }
  ]
})`}</CodeBlock>

      <h2>コードの例</h2>
      <h4>直線によるシェイプ</h4>
      <Ex1
        className="border"
        style={{
          width: "240px",
          height: "240px",
        }}
      />
      <CodeBlock>
        {`const { camera, create, animate, THREE, Default } = init()
camera.position.set(0, 0, 2)
create.ambientLight()
create.directionalLight()

const shape = create.shape({
  shapes: [
    { position: [0, 0] },
    { position: [1, 0] },
    { position: [1, 1] },
    { position: [0, 1] }
  ],
  option: {
    color: Default.color,
    side: THREE.DoubleSide
  }
});

animate(({ delta }) => {
  shape.rotation.x += delta;
  shape.rotation.y += delta;
});
`}
      </CodeBlock>

      <h4 className="mt-5">ベジエ曲線を使ったシェイプ</h4>
      <Ex2
        className="border"
        style={{
          width: "240px",
          height: "240px",
        }}
      />
      <CodeBlock>
        {`const { camera, create, animate, THREE, Default } = init()
camera.position.set(0, 0, 2)
create.ambientLight()
create.directionalLight()

const shape = create.shape({
  shapes: [
    { position: [0, 0] },
    { position: [0.2, 0.3, 0.8, 0.3, 1, 0], type: "curve" },
    { position: [0.7, 0.2, 0.7, 0.8, 1, 1], type: "curve" },
    { position: [0.8, 0.7, 0.2, 0.7, 0, 1], type: "curve" },
    { position: [0.3, 0.8, 0.3, 0.2, 0, 0], type: "curve" }
  ],
  option: {
    color: Default.color,
    side: THREE.DoubleSide,
  },
});

animate(({ delta }) => {
  shape.rotation.x += delta;
  shape.rotation.y += delta;
})
`}
      </CodeBlock>
    </Container>
  );
}
