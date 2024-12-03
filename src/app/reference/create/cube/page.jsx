"use client"
import Container from "react-bootstrap/Container";
import CodeBlock from "@/components/CodeBlock";
import { useEffect, useRef } from "react";
import { init } from "@dist/easy-three.js";

function Ex1(props) {
  const ref = useRef();
  useEffect(() => {
    const { camera, create, animate, destroy } = init(ref.current);
    camera.position.set(0, 0, 2);
    create.ambientLight();
    create.directionalLight();
    create.cube();
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
    const { camera, create, animate, destroy } = init(ref.current);
    camera.position.set(0, 0, 2);
    create.ambientLight();
    create.directionalLight();
    const cube = create.cube();
    animate(({ delta }) => {
      cube.rotation.x += delta;
    });
    return () => {
      destroy();
    };
  }, []);
  return <div ref={ref} {...props}></div>;
}

function Ex3(props) {
  const ref = useRef();
  useEffect(() => {
    const { camera, create, animate, destroy } = init(ref.current);
    camera.position.set(0, 0, 4);
    create.ambientLight();
    create.directionalLight();
    const cube1 = create.cube({
      size: 1,
      position: [-1, 0, 0],
      material: "Normal",
    });
    const cube2 = create.cube({
      size: 1.5,
      position: [1, 0, 0],
      option: {
        // material settings
        color: 0x00ff00,
        metalness: 0.6,
        roughness: 0,
        transparent: true,
        opacity: 0.5,
      },
    });
    const cube3 = create.cube({
      size: 3,
      position: [0, 0, -3],
    });
    animate(({ clock, delta }) => {
      cube1.rotation.x += delta;
      cube2.rotation.y += delta;
      cube3.rotation.x += delta;
      cube3.rotation.z += delta;
      cube3.position.y = Math.sin(clock.getElapsedTime()) * 2;
    });
    return () => {
      destroy();
    };
  }, []);
  return <div ref={ref} {...props}></div>;
}

export default function Reference_Create_Cube() {
  return (
    <Container className="pt-4 pb-5">
      <h1>create.cube</h1>

      <h2>コードの例</h2>
      <h4>立方体の作成</h4>
      <Ex1
        className="border"
        style={{
          width: "240px",
          height: "240px",
        }}
      />
      <CodeBlock>
        {`const { camera, create, animate } = init()
camera.position.set(0, 0, 2)
create.ambientLight()
create.directionalLight()
create.cube()
animate()
`}
      </CodeBlock>

      <h4 className="mt-5">アニメーション</h4>
      <Ex2
        className="border"
        style={{
          width: "240px",
          height: "240px",
        }}
      />
      <CodeBlock>
        {`const { camera, create, animate } = init()
camera.position.set(0, 0, 2)
create.ambientLight()
create.directionalLight()
const cube = create.cube()
animate(({ delta }) => {
  cube.rotation.x += delta
})
`}
      </CodeBlock>

      <h4 className="mt-5">オプションの変更</h4>
      <Ex3
        className="border"
        style={{
          width: "240px",
          height: "240px",
        }}
      />
      <CodeBlock>
        {`const { camera, create, animate } = init()
camera.position.set(0, 0, 4);
create.ambientLight();
create.directionalLight();
const cube1 = create.cube({
  size: 1,
  position: [-1, 0, 0],
  material: "Normal",
});
const cube2 = create.cube({
  size: 1.5,
  position: [1, 0, 0],
  option: {
    // material settings
    color: 0x00ff00,
    metalness: 0.6,
    roughness: 0,
    transparent: true,
    opacity: 0.5,
  },
});
const cube3 = create.cube({
  size: 3,
  position: [0, 0, -3],
});
animate(({ clock, delta }) => {
  cube1.rotation.x += delta;
  cube2.rotation.y += delta;
  cube3.rotation.x += delta;
  cube3.rotation.z += delta;
  cube3.position.y = Math.sin(clock.getElapsedTime()) * 2;
});
`}
      </CodeBlock>
    </Container>
  );
}
