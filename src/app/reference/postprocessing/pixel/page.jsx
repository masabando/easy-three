"use client";
import Container from "react-bootstrap/Container";
import CodeBlock from "@/components/CodeBlock";
import { useEffect, useRef } from "react";
import { init } from "@dist/easy-three.js";
import ReferenceContent from "@/components/ReferenceContent";
import { Link } from "@/components/BaseKit";

function Ex1(props) {
  const ref = useRef();
  useEffect(() => {
    const { camera, create, animate, postprocessing, destroy } = init(ref.current);
    camera.position.set(0, 0, 2);
    create.ambientLight();
    create.directionalLight();
    const cube = create.cube();
    const { pixel } = postprocessing.pixel();
    animate(({ delta }) => {
      cube.rotation.x += delta;
      cube.rotation.y += delta;
      pixel()
    }, false);
    return () => {
      destroy();
    };
  }, []);
  return <div ref={ref} {...props}></div>;
}

function Ex2(props) {
  const ref = useRef();
  useEffect(() => {
    const { camera, create, animate, postprocessing, destroy } = init(
      ref.current
    );
    camera.position.set(0, 0, 2);
    create.ambientLight();
    create.directionalLight();
    const cube = create.cube();
    const { pixel } = postprocessing.pixel();
    animate(({ delta, time }) => {
      cube.rotation.x += delta;
      cube.rotation.y += delta;
      pixel({
        size: ~~(6 + 5 * Math.sin(time)),
      });
    }, false);
    return () => {
      destroy();
    };
  }, []);
  return <div ref={ref} {...props}></div>;
}

export default function Page() {
  return (
    <Container className="pt-4 pb-5">
      <title>postprocessing.pixel | easy-three</title>
      <h1>postprocessing.pixel</h1>
      <ReferenceContent
        name="postprocessing.pixel"
        args="props : Object"
        returnObject="Object"
        argsInfo={
          <>
            <div>
              <span>props</span> - 設定オブジェクト。
              <ul>
                <li>size (Number) : ピクセルサイズ (デフォルト : 6)。</li>
                <li>
                  normalEdge (Number) : 法線エッジの強さ (デフォルト : 0.3)。
                </li>
                <li>
                  depthEdge (Number) : 深度エッジの強さ (デフォルト : 0.4)。
                </li>
              </ul>
            </div>
          </>
        }
      >
        <p>
          Pixelエフェクトを追加します。
          <br />
          ピクセルサイズ、法線エッジの強さ、深度エッジの強さを設定できます。
          <br />
          戻り値は、pixel のみのオブジェクトです。
          <br />
          戻り値の pixel は、animate の中で呼び出すことでエフェクトを適用します。
          <br />
          animate の第2引数を false にしてください。
        </p>
      </ReferenceContent>

      <h2>コードの例</h2>
      <h4>ピクセルエフェクト</h4>
      <Ex1
        className="border"
        style={{
          width: "240px",
          height: "240px",
        }}
      />
      <CodeBlock>
        {`const { camera, create, animate, postprocessing } = init()

camera.position.set(0, 0, 2)

create.ambientLight()
create.directionalLight()

const cube = create.cube()

const { pixel } = postprocessing.pixel()

animate(({ delta }) => {
  cube.rotation.x += delta
  cube.rotation.y += delta
  pixel()
}, false)
`}
      </CodeBlock>
      <h4 className="mt-5">時間とともにピクセルサイズを変更する</h4>
      <Ex2
        className="border"
        style={{
          width: "240px",
          height: "240px",
        }}
      />
      <CodeBlock>
        {`const { camera, create, animate, postprocessing } = init()

camera.position.set(0, 0, 2)

create.ambientLight()
create.directionalLight()

const cube = create.cube()

const { pixel } = postprocessing.pixel()

animate(({ delta, time }) => {
  cube.rotation.x += delta
  cube.rotation.y += delta
  pixel({
    size: ~~(6 + 5 * Math.sin(time))
  })
}, false)
`}
      </CodeBlock>
    </Container>
  );
}
