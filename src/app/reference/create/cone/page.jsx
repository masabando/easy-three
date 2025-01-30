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

    create.cone();

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
    camera.position.set(0, 2, 2);
    create.ambientLight();
    create.directionalLight();

    const cone = create.cone({
      segments: [3, 1]
    });

    animate(({ delta }) => {
      cone.rotation.x += delta;
      cone.rotation.y += delta;
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
      <title>create.cone | easy-three</title>
      <h1>create.cone</h1>
      <ReferenceContent
        name="create.cone"
        args="props : Object"
        returnObject="Mesh"
        argsInfo={
          <div>
            <span>props</span> - 設定オブジェクト。
            <ul>
              <li>size (Array | Number) : サイズ (デフォルト : [1, 2])。</li>
              <li>segments (Number | Array) : 分割数 (デフォルト : [32, 1])。</li>
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
        <p>円錐を作成してシーンに追加します。</p>
      </ReferenceContent>
      <p>
        size と segments については、通常2つの値を持つ配列で指定します。
        <br />
        配列でなく1つの数値を指定した場合、その値を2つ持つ配列として扱います。
        <br />
        (例 : segments: 64 は [64, 64] と同じ)
      </p>
      <p>
        segments の2つ目の値はそれぞれ、円周方向と高さ方向の分割数を表します。
        <br />
        一般的に高さ方向については1で十分ですが、円周方向については大きくすることで円錐となり、小さくすることで三角錐などを表すことができます。
      </p>


      <h2>コードの例</h2>
      <h4>円錐</h4>
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

create.cone()

animate()
`}
      </CodeBlock>

      <h4 className="mt-5">三角錐</h4>
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

const cone = create.cone({
  segments: [3, 1]
})

animate(({ delta }) => {
  cone.rotation.x += delta;
  cone.rotation.y += delta;
})
`}
      </CodeBlock>
    </Container>
  );
}
