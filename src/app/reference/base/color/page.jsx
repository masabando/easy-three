"use client";
import Container from "react-bootstrap/Container";
import CodeBlock from "@/components/CodeBlock";
import ReferenceContent from "@/components/ReferenceContent";
import { Link } from "@/components/BaseKit";
import { useEffect, useRef } from "react";
import { init } from "@dist/easy-three.js";

function Ex1(props) {
  const ref = useRef();
  useEffect(() => {
    const { camera, create, animate, color, destroy } = init(ref.current);

    camera.position.set(-1, 1, 1);
    create.ambientLight();
    create.directionalLight();

    create.cube({
      option: {
        color: color("hotpink"),
      }
    });

    animate();
    return () => {
      destroy();
    };
  }, []);
  return <div ref={ref} {...props}></div>;
}

export default function Page() {
  return (
    <Container className="pt-4 pb-5">
      <title>color | easy-three</title>
      <h1 className="mb-5">color</h1>

      <p>
        色を指定するためのユーティリティ関数です。<br />
        主に create.cube() などのメソッドにおける
        option.color の設定に使用することを想定しています。
      </p>
      <p>引数は文字列または16進数を受け取ります。</p>
      <CodeBlock>{`color("#ff0000")`}</CodeBlock>
      <CodeBlock>{`color(0xff0000)`}</CodeBlock>
      <p>CSSと同様に色の名称を指定することもできます。</p>
      <CodeBlock>{`color("hotpink")`}</CodeBlock>

      <h2>コードの例</h2>
      <h4>色の指定</h4>
      <Ex1
        style={{
          width: "240px",
          height: "240px",
        }}
      />

      <CodeBlock>
        {`const { camera, create, animate, color } = init();

camera.position.set(-1, 1, 1);

create.ambientLight();
create.directionalLight();

create.cube({
  option: {
    color: color("hotpink")
  }
});

animate();
`}
      </CodeBlock>
    </Container>
  );
}
