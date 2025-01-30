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
    const { camera, create, controls, load, animate, destroy } = init(
      ref.current
    );
    create.ambientLight({ intensity: 1 });
    create.directionalLight({ intensity: 2 });
    camera.position.set(0, 0, 2);
    controls.connect();


    const cube = create.cube({
      rounded: true,
      segments: 16,
      option: {
        map: load.texture("/easy-three/texture/img/red_brick_diff_1k.jpg"),
        normalMap: load.texture("/easy-three/texture/img/red_brick_nor_gl_1k.jpg"),
      },
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
      <title>load.texture | easy-three</title>
      <h1>load.texture</h1>

      <ReferenceContent
        name="load.texture"
        args="url : String, props : Object"
        returnObject="Texture"
        argsInfo={
          <>
            <div>
              <span>url</span> - テクスチャのURL。
            </div>
            <div>
              <span>props</span> - 設定オブジェクト。
              <ul>
                <li>
                  wrapS (number) : テクスチャのラッピングモード (デフォルト :
                  Default.texture.wrapping)。
                </li>
                <li>
                  wrapT (number) : テクスチャのラッピングモード (デフォルト :
                  Default.texture.wrapping)。
                </li>
                <li>
                  repeat (Array) : テクスチャの繰り返し回数 (デフォルト : [1,
                  1])。
                </li>
                <li>
                  manager (Object) :
                  ローダマネージャ用のコールバック関数をまとめたオブジェクト。
                  <ul>
                    <li>
                      onStart (Function) : ロード開始時のコールバック関数。
                    </li>
                    <li>
                      onLoad (Function) : ロード完了時のコールバック関数。
                    </li>
                    <li>
                      onProgress (Function) : ロード中のコールバック関数。
                    </li>
                    <li>
                      onError (Function) : ロードエラー時のコールバック関数。
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </>
        }
      >
        <p>
          指定された画像をロードし、テクスチャを作成します。
          <br />
          テクスチャの繰り返しを有効にするには、wrapSおよびwrapTを
          &quot;Repeat&quot; または &quot;MirroredRepeat&quot;
          に設定する必要があります。
        </p>
      </ReferenceContent>

      <h2>コードの例</h2>
      <h4>テクスチャの適用</h4>
      <Ex1
        className="border"
        style={{
          width: "240px",
          height: "240px",
        }}
      />
      <CodeBlock>
        {`const { camera, create, helper, load, controls, animate } = init()
create.ambientLight({ intensity: 1 });
create.directionalLight({ intensity: 2 });
camera.position.set(0, 0, 2);
controls.connect();

const cube = create.cube({
  rounded: true,
  segments: 16,
  option: {
    map: load.texture("/easy-three/texture/img/red_brick_diff_1k.jpg"),
    normalMap: load.texture("/easy-three/texture/img/red_brick_nor_gl_1k.jpg"),
  },
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
