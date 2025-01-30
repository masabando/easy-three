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
    create.ambientLight();
    create.directionalLight();
    camera.position.set(0, 0, 2);
    controls.connect();

    load.background(
      "/easy-three/texture/hdr/kloofendal_48d_partly_cloudy_puresky_1k.hdr"
    );

    const cube = create.cube({
      rounded: true,
      segments: 16,
      option: {
        color: 0xffffff,
        metalness: 0.9,
        roughness: 0.1,
      }
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
      <title>load.background | easy-three</title>
      <h1>load.background</h1>

      <ReferenceContent
        name="load.background"
        args="url : String, props : Object"
        returnObject="Texture"
        argsInfo={
          <>
            <div>
              <span>url</span> - 背景テクスチャのURL。
            </div>
            <div>
              <span>props</span> - 設定オブジェクト。
              <ul>
                <li>
                  background (Boolean) : 背景に設定するか (デフォルト : true)。
                </li>
                <li>
                  environment (Boolean) : 環境マップに設定するか (デフォルト :
                  true)。
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
          指定されたHDR形式の画像をロードし、シーンの背景と環境マップに設定します。
        </p>
      </ReferenceContent>

      <h2>コードの例</h2>
      <h4>背景と環境マップの設定</h4>
      <Ex1
        className="border"
        style={{
          width: "240px",
          height: "240px",
        }}
      />
      <CodeBlock>
        {`const { camera, create, helper, load, controls, animate } = init()
create.ambientLight();
create.directionalLight();
camera.position.set(0, 0, 2);
controls.connect();

load.background(
  "/easy-three/texture/hdr/kloofendal_48d_partly_cloudy_puresky_1k.hdr"
);

const cube = create.cube({
  rounded: true,
  segments: 16,
  option: {
    color: 0xffffff,
    metalness: 0.9,
    roughness: 0.1,
  }
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
