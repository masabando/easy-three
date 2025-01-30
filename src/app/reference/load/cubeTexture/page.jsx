"use client";
import Container from "react-bootstrap/Container";
import CodeBlock from "@/components/CodeBlock";
import { useEffect, useRef } from "react";
import { init } from "@dist/easy-three.js";
import { noto } from "@/app/layout";
import ReferenceContent from "@/components/ReferenceContent";
import { Note, Link } from "@/components/BaseKit";

function Ex1(props) {
  const ref = useRef();
  useEffect(() => {
    const { camera, create, controls, load, scene, animate, destroy } = init(
      ref.current
    );
    create.ambientLight({ intensity: 1 });
    create.directionalLight({ intensity: 2 });
    camera.position.set(0, 0, 2);
    controls.connect();

    scene.background = load.cubeTexture(
      [
        "red_brick_diff_1k.jpg",
        "red_brick_diff_1k.jpg",
        "red_brick_diff_1k.jpg",
        "red_brick_diff_1k.jpg",
        "red_brick_diff_1k.jpg",
        "red_brick_diff_1k.jpg",
      ],
      {
        path: "/easy-three/texture/img/",
      }
    );

    const cube = create.cube({
      rounded: true,
      segments: 16,
    });

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
      <title>load.cubeTexture | easy-three</title>
      <h1>load.cubeTexture</h1>

      <ReferenceContent
        name="load.cubeTexture"
        args="urls : Array<String>, props : Object"
        returnObject="CubeTexture"
        argsInfo={
          <>
            <div>
              <span>urls</span> - テクスチャのURLの配列 (サイズ : 6)。
            </div>
            <div>
              <span>props</span> - 設定オブジェクト。
              <ul>
                <li>
                  path (String) : テクスチャのパスのベース (デフォルト :
                  &quot;./&quot;)。
                </li>
              </ul>
            </div>
          </>
        }
      >
        <p>
          指定された6つの画像をロードし、キューブテクスチャを作成します。
          <br />
          キューブテクスチャは、シーンの背景や環境マップに使用できます。
        </p>
      </ReferenceContent>

      <h2>コードの例</h2>
      <h4>キューブテクスチャによる背景</h4>
      <Ex1
        className="border"
        style={{
          width: "240px",
          height: "240px",
        }}
      />
      <CodeBlock>
        {`const { camera, create, load, scene, controls, animate } = init()
create.ambientLight({ intensity: 1 });
create.directionalLight({ intensity: 2 });
camera.position.set(0, 0, 2);
controls.connect();

scene.background = load.cubeTexture(
  [
    "red_brick_diff_1k.jpg",
    "red_brick_diff_1k.jpg",
    "red_brick_diff_1k.jpg",
    "red_brick_diff_1k.jpg",
    "red_brick_diff_1k.jpg",
    "red_brick_diff_1k.jpg",
  ],
  {
    path: "/easy-three/texture/img/",
  }
);

const cube = create.cube({
  rounded: true,
  segments: 16,
});

animate(({ delta }) => {
  cube.rotation.x += delta;
  cube.rotation.y += delta;
});
`}
      </CodeBlock>
    </Container>
  );
}
