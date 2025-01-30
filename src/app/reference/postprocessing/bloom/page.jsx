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
    const { bloom } = postprocessing.bloom();
    animate(({ delta }) => {
      cube.rotation.x += delta;
      cube.rotation.y += delta;
      bloom()
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
    const { bloom } = postprocessing.bloom();
    animate(({ delta, time }) => {
      cube.rotation.x += delta;
      cube.rotation.y += delta;
      bloom({
        strength: 2 * Math.abs(Math.sin(time))
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
      <title>postprocessing.bloom | easy-three</title>
      <h1>postprocessing.bloom</h1>
      <ReferenceContent
        name="postprocessing.bloom"
        args="props : Object"
        returnObject="Object"
        argsInfo={
          <>
            <div>
              <span>props</span> - 設定オブジェクト。
              <ul>
                <li>exposure (Number) : 曝光度 (デフォルト : 1)。</li>
                <li>background (Color) : 背景色 (デフォルト : 0x000000)。</li>
                <li>threshold (Number) : 閾値 (デフォルト : 0)。</li>
                <li>strength (Number) : ブルームの強さ (デフォルト : 1)。</li>
                <li>radius (Number) : ブラー半径 (デフォルト : 0.5)。</li>
              </ul>
            </div>
          </>
        }
      >
        <p>
          Bloomエフェクトを追加します。
          <br />
          曝光度、背景色、閾値、強さ、半径を設定できます。
          <br />
          戻り値は、bloom のみのオブジェクトです。
          <br />
          戻り値の bloom は、animate の中で呼び出すことでエフェクトを適用します。
          <br />
          animate の第2引数を false にしてください。
        </p>
      </ReferenceContent>

      <p>
        Bloomエフェクトは、画面の全ての明るい部分をぼかして輝かせるエフェクトです。
        <br />
        そのため、背景画像に対しても効果があります。
        <br />
        もし個別のオブジェクトにだけBloomエフェクトを適用したい場合は、
        <Link href="/reference/postprocessing/selectedBloom/">selectedBloom</Link>
        を使用してください。
      </p>


      <h2>コードの例</h2>
      <h4>ブルームエフェクト</h4>
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

const { bloom } = postprocessing.bloom()

animate(({ delta }) => {
  cube.rotation.x += delta
  cube.rotation.y += delta
  bloom()
}, false)
`}
      </CodeBlock>
      <h4 className="mt-5">時間とともに輝度を変更する</h4>
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

const { bloom } = postprocessing.bloom()

animate(({ delta, time }) => {
  cube.rotation.x += delta
  cube.rotation.y += delta
  bloom({
    strength: 2 * Math.abs(Math.sin(time))
  })
}, false)
`}
      </CodeBlock>
    </Container>
  );
}
