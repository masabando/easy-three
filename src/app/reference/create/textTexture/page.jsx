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

    create.ambientLight();
    create.directionalLight();

    const texture = create.textTexture("easy-three", {
      size: [300, 300],
      font: noto.style.fontFamily,
      background: "#66ff66"
    })

    const cube = create.cube({
      size: 1,
      position: [-1, 0, 0],
      option: {
        map: texture
      }
    })
    const sphere = create.sphere({
      size: 0.7,
      position: [1, 0, 0],
      option: {
        map: texture
      }
    })
    animate(({ delta }) => {
      cube.rotation.x += delta;
      cube.rotation.y += delta;
      sphere.rotation.x += delta;
      sphere.rotation.y += delta * 0.7;
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
    const { camera, create, animate, DoubleSide, destroy } = init(ref.current);
    camera.position.set(0, 0, 2);

    create.ambientLight();
    create.directionalLight();

    const texture = create.textTexture("easy-three", {
      size: [300, 300],
      font: noto.style.fontFamily,
      guide: 8,
    });

    const cube = create.cube({
      size: 1,
      option: {
        transparent: true,
        map: texture,
        side: DoubleSide
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
      <h1>create.textTexture</h1>

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

create.ambientLight()
create.directionalLight()

const texture = create.textTexture("easy-three", {
  size: [300, 300],
  background: "#66ff66"
})

const cube = create.cube({
  size: 1,
  position: [-1, 0, 0],
  option: {
    map: texture
  }
})

const sphere = create.sphere({
  size: 0.7,
  position: [1, 0, 0],
  option: {
    map: texture
  }
})

animate(({ delta }) => {
  cube.rotation.x += delta
  cube.rotation.y += delta
  sphere.rotation.x += delta
  sphere.rotation.y += delta * 0.7
})
`}
      </CodeBlock>

      <h4 className="mt-5">ガイド、透過、表示面の設定</h4>
      <Ex2
        className="border"
        style={{
          width: "240px",
          height: "240px",
        }}
      />
      <CodeBlock>
        {`const { camera, create, DoubleSide, animate } = init()
camera.position.set(0, 0, 2)

create.ambientLight()
create.directionalLight()

const texture = create.textTexture("easy-three", {
  size: [300, 300],
  guide: 8
})

const cube = create.cube({
  size: 1,
  option: {
    transparent: true,
    map: texture,
    side: DoubleSide
  }
})

animate(({ delta }) => {
  cube.rotation.x += delta
  cube.rotation.y += delta
})
`}
      </CodeBlock>
    </Container>
  );
}
