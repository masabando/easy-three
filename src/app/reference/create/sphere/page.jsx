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
    create.sphere();
    animate();
    return () => {
      destroy()
    }
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
    const sphere = create.sphere({
      size: 0.3
    });
    animate(({ clock }) => {
      sphere.position.x = Math.sin(clock.getElapsedTime());
    });
    return () => {
      destroy()
    }
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
    create.sphere({
      size: 0.5,
      position: [-1, 0, 0],
      material: "Normal",
    });
    create.sphere({
      size: 0.7,
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
    const sphere3 = create.sphere({
      size: 1.5,
      position: [0, 0, -3],
    });
    animate(({ clock }) => {
      sphere3.position.y = Math.sin(clock.getElapsedTime()) * 2;
    });
    return () => {
      destroy()
    }
  }, []);
  return <div ref={ref} {...props}></div>;
}

export default function Reference_Create_Sphere() {
  return (
    <Container className="pt-4 pb-5">
      <h1>create.sphere</h1>

      <h2>コードの例</h2>
      <h4>球の作成</h4>
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
create.sphere()
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
const sphere = create.sphere()
animate(({ clock }) => {
  sphere.position.x = Math.sin(clock.getElapsedTime())
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
create.sphere({
  size: 0.5,
  position: [-1, 0, 0],
  material: "Normal",
});
create.sphere({
  size: 0.7,
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
const sphere3 = create.sphere({
  size: 1.5,
  position: [0, 0, -3],
});
animate(({ clock }) => {
  sphere3.position.y = Math.sin(clock.getElapsedTime()) * 2;
});
`}
      </CodeBlock>
    </Container>
  );
}
