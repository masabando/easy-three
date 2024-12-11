"use client";
import Container from "react-bootstrap/Container";
import CodeBlock from "@/components/CodeBlock";
import { useEffect, useRef } from "react";
import { init } from "@dist/easy-three.js";

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
      <h1>postprocessing.pixel</h1>
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
