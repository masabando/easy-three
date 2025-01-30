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
      <title>postprocessing.bokeh | easy-three</title>
      <h1>postprocessing.bokeh</h1>
      <ReferenceContent
        name="postprocessing.bokeh"
        args="delta : Number, props : Object"
        returnObject="Object"
        argsInfo={
          <>
            <div>
              <span>delta</span> - 経過時間。
            </div>
            <div>
              <span>props</span> - 設定オブジェクト。
              <ul>
                <li>focus (Number) : フォーカス距離 (デフォルト : 1)。</li>
                <li>aperture (Number) : 絞り値 (デフォルト : 0.01)。</li>
                <li>maxblur (Number) : 最大ブラー (デフォルト : 0.01)。</li>
              </ul>
            </div>
          </>
        }
      >
        ぼかしエフェクトを追加します。
        <br />
        戻り値は、bokeh のみのオブジェクトです。
        <br />
        戻り値の bokeh は、animate の中で呼び出すことでエフェクトを適用します。
        <br />
        animate の第2引数を false にしてください。
      </ReferenceContent>

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
