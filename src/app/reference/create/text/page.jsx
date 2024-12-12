"use client"
import Container from "react-bootstrap/Container";
import CodeBlock from "@/components/CodeBlock";
import { useEffect, useRef } from "react";
import { init } from "@dist/easy-three.js";
import { noto } from "@/app/layout"

function Ex1(props) {
  const ref = useRef();
  useEffect(() => {
    const { camera, create, animate, destroy } = init(ref.current);
    camera.position.set(0, 0, 3);

    const text = create.text("easy-three", {
      size: [3, 1],
      font: noto.style.fontFamily
    })
    animate(({ delta }) => {
      text.rotation.x += delta;
      text.rotation.y += delta;
    });
    return () => {
      destroy();
    };
  }, []);
  return <div ref={ref} {...props}></div>;
}

function Ex2(props) {
  const ref = useRef();
  useEffect(() => {
    const { camera, create, animate, destroy } = init(ref.current);
    camera.position.set(0, 0, 3);

    const text = create.text("easy-three", {
      size: [3, 1],
      font: noto.style.fontFamily,
      guide: 4,
      background: "#66ff66"
    });
    animate(({ delta }) => {
      text.rotation.x += delta;
      text.rotation.y += delta;
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
      <h1>create.text</h1>

      <h2>コードの例</h2>
      <h4>テキストの作成</h4>
      <Ex1
        className="border"
        style={{
          width: "240px",
          height: "240px",
        }}
      />
      <CodeBlock>
        {`const { camera, create, animate } = init()
camera.position.set(0, 0, 3)

const text = create.text("easy-three", {
  size: [3, 1]
})

animate(({ delta }) => {
  text.rotation.x += delta
  text.rotation.y += delta
})
`}
      </CodeBlock>

      <h4 className="mt-5">ガイドと背景色の設定</h4>
      <Ex2
        className="border"
        style={{
          width: "240px",
          height: "240px",
        }}
      />
      <CodeBlock>
        {`const { camera, create, animate } = init()
camera.position.set(0, 0, 3)

const text = create.text("easy-three", {
  size: [3, 1],
  guide: 4,
  background: "#66ff66"
})

animate(({ delta }) => {
  text.rotation.x += delta
  text.rotation.y += delta
})
`}
      </CodeBlock>


    </Container>
  );
}
