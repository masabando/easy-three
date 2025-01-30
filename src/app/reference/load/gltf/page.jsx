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
    const { camera, create, helper, controls, load, animate, destroy } = init(
      ref.current
    );
    create.ambientLight();
    create.directionalLight();
    camera.position.set(2, 2, 0);
    controls.target.set(0, 1, 0);

    controls.connect();
    helper.axes();
    helper.grid();

    load.gltf("/easy-three/model/didelta_spinosa/didelta_spinosa_1k.gltf");

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
    const { camera, create, helper, controls, load, animate, destroy } = init(
      ref.current
    );
    create.ambientLight();
    create.directionalLight();
    camera.position.set(2, 2, 0);
    controls.target.set(0, 1, 0);

    controls.connect();
    helper.axes();
    helper.grid();

    let model;
    load
      .gltf("/easy-three/model/didelta_spinosa/didelta_spinosa_1k.gltf")
      .then((gltf) => {
        model = gltf;
      });

    animate(({ delta }) => {
      if (model) {
        model.scene.rotation.y += delta;
      }
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
      <title>load.gltf | easy-three</title>
      <h1>load.gltf</h1>

      <ReferenceContent
        name="load.gltf"
        args="url : String, props : Object"
        returnObject="Promise<GLTF>"
        argsInfo={
          <>
            <div>
              <span>url</span> - GLTFモデルのURL。
            </div>
            <div>
              <span>props</span> - 設定オブジェクト。
              <ul>
                <li>
                  position (Array) : モデルの位置 (デフォルト : [0, 0, 0])。
                </li>
                <li>
                  rotation (Array) : モデルの回転 (デフォルト : [0, 0, 0])。
                </li>
                <li>
                  scale (Array) : モデルのスケール (デフォルト : [1, 1, 1])。
                </li>
                <li>
                  autoAdd (Boolean) : 自動でシーンに追加するか (デフォルト :
                  true)。
                </li>
              </ul>
            </div>
          </>
        }
      >
        <p>GLTFモデルを読み込み、オプションに基づいてシーンに追加します。</p>
      </ReferenceContent>

      <p>
        モデルの読み込みは非同期で行われます。
        <br />
        そのため、
        <Note>
          変数にモデルを代入する場合は then メソッドを使用してください
        </Note>{" "}
        (下記の例を参照)。
        <br />
        また、animate のコールバック関数内でモデルを操作する場合は、
        モデルが読み込まれるまでの処理を考慮してください。
      </p>

      <p>
        戻り値は Mesh ではなく GLTF オブジェクトです。
        <br />
        <Note>Meshを操作する場合は、戻り値の scene プロパティを使用</Note>{" "}
        してください。
        <br />
      </p>

      <p>
        ボーンや表情などの操作については 教育機関向け活用例の{" "}
        <Link href="/classroom/advanced/part5/">
          5. VRMモデルの操作とアニメーション
        </Link>{" "}
        を参照してください。
      </p>

      <h2>コードの例</h2>
      <h4>GLTFモデルの表示</h4>
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
camera.position.set(2, 2, 0);
controls.target.set(0, 1, 0);

controls.connect();

helper.axes();
helper.grid();

load.gltf("/easy-three/model/didelta_spinosa/didelta_spinosa_1k.gltf");

animate();
`}
      </CodeBlock>

      <h4 className="mt-5">VRMモデルのMesh操作</h4>
      <Ex2
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
camera.position.set(2, 2, 0);
controls.target.set(0, 1, 0);

controls.connect();

helper.axes();
helper.grid();

let model;
load.gltf("/easy-three/model/didelta_spinosa/didelta_spinosa_1k.gltf").then((gltf) => {
  model = gltf;
});

animate(({ delta }) => {
  if (model) {
    model.scene.rotation.y += delta;
  }
});
`}
      </CodeBlock>
    </Container>
  );
}
