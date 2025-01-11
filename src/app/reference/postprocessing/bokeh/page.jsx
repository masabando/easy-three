"use client";
import Container from "react-bootstrap/Container";
import CodeBlock from "@/components/CodeBlock";
import { useEffect, useRef } from "react";
import { init } from "@dist/easy-three.js";

function Ex1(props) {
  const ref = useRef();
  useEffect(() => {
    const { camera, create, scene, color, animate, postprocessing, destroy } =
      init(ref.current);
    camera.position.set(0, 2, 3);

    create.ambientLight();
    create.directionalLight();

    scene.background = color(0xffffff);

    const cubes = [];
    for (let i = 0; i < 5; i++) {
      cubes.push(
        create.cube({
          size: 0.5,
          position: [i - 2, 0, 0.5 * (i - 2)],
        })
      );
    }

    const { bokeh } = postprocessing.bokeh({
      focus: camera.position.distanceTo(cubes[2].position),
      aperture: 0.04,
      maxblur: 0.03,
    });

    animate(({ delta }) => {
      bokeh(delta);
      cubes.forEach((cube) => {
        cube.rotation.x += delta;
        cube.rotation.y += delta;
      })
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
    const { camera, create, scene, color, animate, postprocessing, destroy } =
      init(ref.current);
    camera.position.set(0, 2, 3);

    create.ambientLight();
    create.directionalLight();

    scene.background = color(0xffffff);

    const cubes = [];
    for (let i = 0; i < 5; i++) {
      cubes.push(
        create.cube({
          size: 0.5,
          position: [i - 2, 0, 0.5 * (i - 2)],
        })
      );
    }

    const { bokeh } = postprocessing.bokeh();

    animate(({ delta, time }) => {
      bokeh(delta, {
        focus:
          camera.position.distanceTo(cubes[2].position) + 2 * Math.sin(time),
        aperture: 0.01,
        maxblur: 0.03,
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
      <h1>postprocessing.bokeh</h1>
      <h2>コードの例</h2>

      <h4>ぼかしエフェクト</h4>
      <Ex1
        className="border"
        style={{
          width: "240px",
          height: "240px",
        }}
      />
      <CodeBlock>
        {`const { camera, create, scene, color, animate, postprocessing } = init()

camera.position.set(0, 2, 3);

create.ambientLight();
create.directionalLight();
scene.background = color(0xffffff);

const cubes = [];
for (let i = 0; i < 5; i++) {
  cubes.push(
    create.cube({
      size: 0.5,
      position: [i - 2, 0, 0.5 * (i - 2)],
    })
  );
}

const { bokeh } = postprocessing.bokeh({
  focus: camera.position.distanceTo(cubes[2].position),
  aperture: 0.04,
  maxblur: 0.03,
});

animate(({ delta }) => {
  bokeh(delta);
  cubes.forEach((cube) => {
    cube.rotation.x += delta;
    cube.rotation.y += delta;
  })
}, false);
`}
      </CodeBlock>

      <h4 className="mt-5">焦点の移動</h4>
      <Ex2
        className="border"
        style={{
          width: "240px",
          height: "240px",
        }}
      />
      <CodeBlock>
        {`const { camera, create, scene, color, animate, postprocessing, destroy } = init()

camera.position.set(0, 2, 3);

create.ambientLight();
create.directionalLight();
scene.background = color(0xffffff);

const cubes = [];
for (let i = 0; i < 5; i++) {
  cubes.push(
    create.cube({
      size: 0.5,
      position: [i - 2, 0, 0.5 * (i - 2)],
    })
  );
}

const { bokeh } = postprocessing.bokeh();

animate(({ delta, time }) => {
  bokeh(delta, {
    focus:
      camera.position.distanceTo(cubes[2].position) + 2 * Math.sin(time),
    aperture: 0.01,
    maxblur: 0.03,
  });
}, false);
`}
      </CodeBlock>
    </Container>
  );
}
