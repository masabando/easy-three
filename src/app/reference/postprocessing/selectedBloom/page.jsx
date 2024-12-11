"use client";
import Container from "react-bootstrap/Container";
import CodeBlock from "@/components/CodeBlock";
import { useEffect, useRef } from "react";
import { init } from "@dist/easy-three.js";

function Ex1(props) {
  const ref = useRef();
  useEffect(() => {
    const { camera, create, animate, postprocessing, destroy } = init(
      ref.current
    );
    camera.position.set(0, 0, 2);
    create.ambientLight();
    create.directionalLight();
    const cube1 = create.cube({
      size: 0.5,
      position: [-0.7, 0, 0],
    });
    const cube2 = create.cube({
      size: 0.5,
      position: [0.7, 0, 0],
    });
    const sphere = create.sphere({
      size: 0.3,
      position: [0, 0.8, 0]
    });
    const { selectedBloom, addSelectedBloom } = postprocessing.selectedBloom();
    addSelectedBloom(cube1, sphere);
    animate(({ delta }) => {
      cube1.rotation.x += delta;
      cube1.rotation.y += delta;
      cube2.rotation.x += delta;
      cube2.rotation.y += delta;
      selectedBloom();
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
    const cube1 = create.cube({
      size: 0.5,
      position: [-0.7, 0, 0],
    });
    const cube2 = create.cube({
      size: 0.5,
      position: [0.7, 0, 0],
    });
    const sphere = create.sphere({
      size: 0.3,
      position: [0, 0.8, 0],
    });
    const { selectedBloom, addSelectedBloom } = postprocessing.selectedBloom();
    addSelectedBloom(cube1, sphere);
    animate(({ delta, time }) => {
      cube1.rotation.x += delta;
      cube1.rotation.y += delta;
      cube2.rotation.x += delta;
      cube2.rotation.y += delta;
      selectedBloom({
        strength: 2 * Math.abs(Math.sin(time)),
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
      <h1>postprocessing.selectedBloom</h1>
      <h2>コードの例</h2>

      <h4>選択的ブルームエフェクト</h4>
      <Ex1
        className="border"
        style={{
          width: "240px",
          height: "240px",
        }}
      />
      <CodeBlock>
        {`const { camera, create, animate, postprocessing } = init();

camera.position.set(0, 0, 2)

create.ambientLight()
create.directionalLight()

const cube1 = create.cube({
  size: 0.5,
  position: [-0.7, 0, 0]
})
const cube2 = create.cube({
  size: 0.5,
  position: [0.7, 0, 0]
})
const sphere = create.sphere({
  size: 0.3,
  position: [0, 0.8, 0]
})

// use selectedBloom
const { selectedBloom, addSelectedBloom } = postprocessing.selectedBloom()
// add Object3D to selectedBloom
addSelectedBloom(cube1, sphere)

animate(({ delta }) => {
  cube1.rotation.x += delta
  cube1.rotation.y += delta
  cube2.rotation.x += delta
  cube2.rotation.y += delta

  // render
  selectedBloom()
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

const cube1 = create.cube({
  size: 0.5,
  position: [-0.7, 0, 0]
})
const cube2 = create.cube({
  size: 0.5,
  position: [0.7, 0, 0]
})
const sphere = create.sphere({
  size: 0.3,
  position: [0, 0.8, 0]
})

const { selectedBloom, addSelectedBloom } = postprocessing.selectedBloom()
addSelectedBloom(cube1, sphere)

animate(({ delta, time }) => {
  cube1.rotation.x += delta
  cube1.rotation.y += delta
  cube2.rotation.x += delta
  cube2.rotation.y += delta
  selectedBloom({
    strength: 2 * Math.abs(Math.sin(time))
  })
}, false)
`}
      </CodeBlock>
    </Container>
  );
}
