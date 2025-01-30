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

    const torusKnot = create.torusKnot({ size: 0.5, tube: 0.16 });

    const { glitch } = postprocessing.glitch();

    animate(({ delta }) => {
      torusKnot.rotation.x += delta;
      torusKnot.rotation.y += delta;
      glitch()
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

    const torusKnot = create.torusKnot({ size: 0.5, tube: 0.16 });

    const { glitch } = postprocessing.glitch({ wild: true });

    animate(({ delta }) => {
      torusKnot.rotation.x += delta;
      torusKnot.rotation.y += delta;
      glitch();
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
      <title>postprocessing.glitch | easy-three</title>
      <h1>postprocessing.glitch</h1>
      <ReferenceContent
        name="postprocessing.glitch"
        args="props : Object"
        returnObject="Object"
        argsInfo={
          <>
            <div>
              <span>props</span> - 設定オブジェクト。
              <ul>
                <li>wild (Boolean) : ワイルドモード (デフォルト : false)。</li>
              </ul>
            </div>
          </>
        }
      >
        Glitch エフェクトを追加します。
        <br />
        戻り値は、glitch のみのオブジェクトです。
        <br />
        戻り値の glitch は、animate の中で呼び出すことでエフェクトを適用します。
        <br />
        animate の第2引数を false にしてください。
      </ReferenceContent>

      <h2>コードの例</h2>
      <h4>グリッチエフェクト</h4>
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

const torusKnot = create.torusKnot({ size: 0.5, tube: 0.16 })

const { glitch } = postprocessing.glitch()

animate(({ delta }) => {
  torusKnot.rotation.x += delta
  torusKnot.rotation.y += delta
  glitch()
}, false)
`}
      </CodeBlock>
      <h4 className="mt-5">激しいエフェクト</h4>
      <Ex2
        className="border"
        style={{
          width: "240px",
          height: "240px",
        }}
      />
      <CodeBlock>
        {`const { camera, create, animate, load, postprocessing } = init()

camera.position.set(0, 0, 2)

create.ambientLight()
create.directionalLight()

const torusKnot = create.torusKnot({ size: 0.5, tube: 0.16 })

const { glitch } = postprocessing.glitch({ wild: true })

animate(({ delta }) => {
  torusKnot.rotation.x += delta
  torusKnot.rotation.y += delta
  glitch()
}, false)
`}
      </CodeBlock>
    </Container>
  );
}
