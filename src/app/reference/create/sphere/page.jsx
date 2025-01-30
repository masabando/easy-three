"use client"
import Container from "react-bootstrap/Container";
import CodeBlock from "@/components/CodeBlock";
import { useEffect, useRef } from "react";
import { init } from "@dist/easy-three.js";
import ReferenceContent from "@/components/ReferenceContent";

function Ex1(props) {
  const ref = useRef();
  useEffect(() => {
    const { camera, create, animate, destroy } = init(ref.current);
    camera.position.set(0, 0, 2);
    create.ambientLight();
    create.directionalLight();
    create.sphere();
    animate();
    return () => {
      destroy()
    }
  }, []);
  return <div ref={ref} {...props}></div>;
}

function Ex2(props) {
  const ref = useRef();
  useEffect(() => {
    const { camera, create, animate, destroy } = init(ref.current);
    camera.position.set(0, 0, 2);
    create.ambientLight();
    create.directionalLight();
    const sphere = create.sphere({
      size: 0.3
    });
    animate(({ clock }) => {
      sphere.position.x = Math.sin(clock.getElapsedTime());
    });
    return () => {
      destroy()
    }
  }, []);
  return <div ref={ref} {...props}></div>;
}

function Ex3(props) {
  const ref = useRef();
  useEffect(() => {
    const { camera, create, animate, destroy } = init(ref.current);
    camera.position.set(0, 0, 4);
    create.ambientLight();
    create.directionalLight();
    create.sphere({
      size: 0.5,
      position: [-1, 0, 0],
      material: "Normal",
    });
    create.sphere({
      size: 0.7,
      position: [1, 0, 0],
      option: {
        // material settings
        color: 0x00ff00,
        metalness: 0.6,
        roughness: 0,
        transparent: true,
        opacity: 0.5,
      },
    });
    const sphere3 = create.sphere({
      size: 1.5,
      position: [0, 0, -3],
    });
    animate(({ clock }) => {
      sphere3.position.y = Math.sin(clock.getElapsedTime()) * 2;
    });
    return () => {
      destroy()
    }
  }, []);
  return <div ref={ref} {...props}></div>;
}

export default function Reference_Create_Sphere() {
  return (
    <Container className="pt-4 pb-5">
      <title>create.sphere | easy-three</title>
      <h1>create.sphere</h1>
      <ReferenceContent
        name="create.sphere"
        args="props : Object"
        returnObject="Mesh"
        argsInfo={
          <div>
            <span>props</span> - 設定オブジェクト。
            <ul>
              <li>size (Number) : 半径 (デフォルト : 1)。</li>
              <li>
                segments (Array | Number) : セグメント (デフォルト : 64)。
              </li>
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
        <p>球体を作成してシーンに追加します。</p>
        <p>
          segments については、通常2つの値を持つ配列で指定します。
          <br />
          配列でなく1つの数値を指定した場合、その値を2つ持つ配列として扱います。
          <br />
          (例 : segments: 16 は [16, 16] と同じ)
        </p>
      </ReferenceContent>
      <h2>コードの例</h2>
      <h4>球の作成</h4>
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
create.directionalLight()

create.sphere()

animate()
`}
      </CodeBlock>

      <h4 className="mt-5">アニメーション</h4>
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
create.ambientLight()
create.directionalLight()

const sphere = create.sphere()

animate(({ clock }) => {
  sphere.position.x = Math.sin(clock.getElapsedTime())
})
`}
      </CodeBlock>

      <h4 className="mt-5">オプションの変更</h4>
      <Ex3
        className="border"
        style={{
          width: "240px",
          height: "240px",
        }}
      />
      <CodeBlock>
        {`const { camera, create, animate } = init()
camera.position.set(0, 0, 4);
create.ambientLight();
create.directionalLight();

create.sphere({
  size: 0.5,
  position: [-1, 0, 0],
  material: "Normal",
});

create.sphere({
  size: 0.7,
  position: [1, 0, 0],
  option: {
    // material settings
    color: 0x00ff00,
    metalness: 0.6,
    roughness: 0,
    transparent: true,
    opacity: 0.5,
  },
});

const sphere3 = create.sphere({
  size: 1.5,
  position: [0, 0, -3],
});

animate(({ clock }) => {
  sphere3.position.y = Math.sin(clock.getElapsedTime()) * 2;
});
`}
      </CodeBlock>
    </Container>
  );
}
