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
    const { camera, create, animate, load, postprocessing, destroy } = init(ref.current);
    camera.position.set(0, 0, 2);

    const torusKnot = create.torusKnot({ size: 0.5, tube: 0.16 });

    const texture = load.texture(
      "/easy-three/texture/img/red_brick_diff_1k.jpg"
    );
    const { mask } = postprocessing.mask(texture);
    animate(({ delta, time }) => {
      torusKnot.rotation.x += delta;
      torusKnot.rotation.y += delta;
      mask(time)
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
    const { camera, create, animate, load, postprocessing, destroy } = init(
      ref.current
    );
    camera.position.set(0, 0, 2);
    const torusKnot = create.torusKnot({ size: 0.5, tube: 0.16 });

    const texture = load.background(
      "/easy-three/texture/hdr/kloofendal_48d_partly_cloudy_puresky_1k.hdr",
      {
        background: false,
        environment: false,
      }
    );
    const { mask } = postprocessing.mask(texture);
    animate(({ delta, time }) => {
      torusKnot.rotation.x += delta;
      torusKnot.rotation.y += delta;
      mask(time);
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
      <title>postprocessing.mask | easy-three</title>
      <h1>postprocessing.mask</h1>
      <ReferenceContent
        name="postprocessing.mask"
        args="texture : Texture"
        returnObject="Object"
        argsInfo={
          <>
            <div>
              <span>texture</span> - マスクテクスチャ。
            </div>
          </>
        }
      >
        Maskエフェクトを追加します。
        <br />
        戻り値は、mask のみのオブジェクトです。
        <br />
        戻り値の mask は、animate の中で呼び出すことでエフェクトを適用します。
        <br />
        animate の第2引数を false にしてください。
      </ReferenceContent>
      <h2>コードの例</h2>
      <h4>マスクエフェクト</h4>
      <Ex1
        className="border"
        style={{
          width: "240px",
          height: "240px",
        }}
      />
      <CodeBlock>
        {`const { camera, create, animate, load, postprocessing } = init()

camera.position.set(0, 0, 2)

const torusKnot = create.torusKnot({ size: 0.5, tube: 0.16 })

const texture = load.texture("path_to_texture_file.jpg")

const { mask } = postprocessing.mask(texture)

animate(({ delta, time }) => {
  torusKnot.rotation.x += delta
  torusKnot.rotation.y += delta
  mask(time)
}, false)
`}
      </CodeBlock>
      <h4 className="mt-5">HDR画像をテクスチャとして使う</h4>
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

const torusKnot = create.torusKnot({ size: 0.5, tube: 0.16 })

const texture = load.background("path_to_HDR_file.hdr", {
  background: false,
  environment: false
})

const { mask } = postprocessing.mask(texture)

animate(({ delta, time }) => {
  torusKnot.rotation.x += delta
  torusKnot.rotation.y += delta
  mask(time)
}, false)
`}
      </CodeBlock>
    </Container>
  );
}
