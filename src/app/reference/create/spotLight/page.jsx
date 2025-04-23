"use client";
import Container from "react-bootstrap/Container";
import CodeBlock from "@/components/CodeBlock";
import { useEffect, useRef } from "react";
import { init } from "@dist/easy-three.js";
import ReferenceContent from "@/components/ReferenceContent";
import { Note } from "@/components/BaseKit";
import Alert from "react-bootstrap/Alert";

function Ex1(props) {
  const ref = useRef();
  useEffect(() => {
    const { camera, controls, create, animate, destroy, THREE, Default } = init(ref.current);
    controls.connect();
    camera.position.set(0, 1, 1.5);
    create.spotLight({
      position: [-1, 1, 1],
    });

    create.cube({
      size: 0.5,
      position: [0, 0.25, 0],
    })
    const plane = create.plane({
      position: [0, 0, 0],
      rotation: [-Math.PI / 2, 0, 0],
      size: [10, 10],
      option: {
        color: "#ffffff",
      },
    });

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
    const { camera, controls, create, animate, destroy, THREE, Default } = init(
      ref.current
    );
    controls.connect();
    camera.position.set(0, 1, 1.5);
    const red = create.spotLight({
      position: [-1, 1, 1],
      angle: Math.PI / 6,
      color: 0xff6666,
    });
    const green = create.spotLight({
      position: [1, 1, 1],
      angle: Math.PI / 6,
      color: 0x66ff66,
    });
    const blue = create.spotLight({
      position: [0, 1, 1],
      angle: Math.PI / 6,
      color: 0x6666ff,
    });

    create.cube({
      size: 0.5,
      position: [0, 0.25, 0],
    });
    create.plane({
      position: [0, 0, 0],
      rotation: [-Math.PI / 2, 0, 0],
      size: [10, 10],
      option: {
        color: "#ffffff",
      },
    });

    animate(({ time }) => {
      red.target.position.set(Math.sin(time), 0, 0);
      green.target.position.set(Math.sin(-time), 0, 0);
      blue.target.position.set(0, 0, Math.sin(time));
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
    const { camera, controls, create, animate, destroy, THREE, Default } = init(
      ref.current
    );
    controls.connect();
    camera.position.set(0, 2, 3);
    create.spotLight({
      position: [-1, 1, 1],
      helper: 1,
      helperColor: 0xff0000,
    });

    create.cube({
      size: 0.5,
      position: [0, 0.25, 0],
    });
    create.plane({
      position: [0, 0, 0],
      rotation: [-Math.PI / 2, 0, 0],
      size: [10, 10],
      option: {
        color: "#ffffff",
      },
    });

    animate();
    return () => {
      destroy();
    };
  }, []);
  return <div ref={ref} {...props}></div>;
}


export default function Reference_Create_Cube() {
  return (
    <Container className="pt-4 pb-5">
      <title>create.spotLight | easy-three</title>
      <h1>create.spotLight</h1>
      <ReferenceContent
        name="create.spotLight"
        args="props : Object"
        returnObject="Light"
        argsInfo={
          <div>
            <span>props</span> - 設定オブジェクト。
            <ul>
              <li>color (Hex) : ライトの色 (デフォルト : 0xffffff)。</li>
              <li>intensity (Number) : 光の強さ (デフォルト : 1)。</li>
              <li>distance (Number) : ライトの距離 (デフォルト : 0)。</li>
              <li>angle (Number) : 光の角度 (デフォルト : Math.PI/4)。</li>
              <li>penumbra (Number) : 光の周辺減衰 (デフォルト : 0.1)。</li>
              <li>decay (Number) : 光の減衰率 (デフォルト : 2)。</li>
              <li>position (Array) : 位置 (デフォルト : [6, 6, 6])。</li>
              <li>
                castShadow (Boolean) : 影を投影するかどうか (デフォルト :
                true)。
              </li>
              <li>
                shadow (Object) : シャドウの設定 (デフォルト :{" "}
                {`{width: 1024, height: 1024}`})。
              </li>
              <li>helper (Number) : ヘルパーのサイズ (デフォルト : 0)。</li>
              <li>
                helperColor (Hex) : ヘルパーの色 (デフォルト : 0xffffff)。
              </li>
            </ul>
          </div>
        }
      >
        <p>
          スポットライトを作成してシーンに追加します。
        </p>
        <Alert variant="danger">
          <Alert.Heading className="mt-0">注意</Alert.Heading>
          VRMモデルにスポットライトを当てるとエラーになります。<br />
          VRMモデルを利用する場合は、スポットライトを使用しないでください。<br />
          スポットライトを使用する場合は、VRMモデルを削除してください。
        </Alert>
      </ReferenceContent>

      <h2>コードの例</h2>
      <h4>スポットライト</h4>
      <Ex1
        className="border"
        style={{
          width: "240px",
          height: "240px",
        }}
      />
      <CodeBlock>
        {`const { camera, create, controls, animate } = init()
controls.connect();
camera.position.set(0, 1, 1.5);

create.spotLight({
  position: [-1, 1, 1],
});

create.cube({
  size: 0.5,
  position: [0, 0.25, 0],
})

create.plane({
  position: [0, 0, 0],
  rotation: [-Math.PI / 2, 0, 0],
  size: [10, 10],
  option: {
    color: "#ffffff",
  },
});

animate();
`}
      </CodeBlock>
      <h4 className="mt-5">スポットライトのターゲット変更</h4>
      <p>
        ターゲットは動的に変更できます。
        <br />
        3D Objectをターゲットとして指定することもできます。
      </p>
      <Ex2
        className="border"
        style={{
          width: "240px",
          height: "240px",
        }}
      />
      <CodeBlock>
        {`const { camera, create, animate } = init()
controls.connect();
camera.position.set(0, 1, 1.5);

const red = create.spotLight({
  position: [-1, 1, 1],
  angle: Math.PI / 6,
  color: 0xff6666,
});

const green = create.spotLight({
  position: [1, 1, 1],
  angle: Math.PI / 6,
  color: 0x66ff66,
});

const blue = create.spotLight({
  position: [0, 1, 1],
  angle: Math.PI / 6,
  color: 0x6666ff,
});

create.cube({
  size: 0.5,
  position: [0, 0.25, 0],
});

create.plane({
  position: [0, 0, 0],
  rotation: [-Math.PI / 2, 0, 0],
  size: [10, 10],
  option: {
    color: "#ffffff",
  },
});

animate(({ time }) => {
  red.target.position.set(Math.sin(time), 0, 0);
  green.target.position.set(Math.sin(-time), 0, 0);
  blue.target.position.set(0, 0, Math.sin(time));
});
`}
      </CodeBlock>

      <h4 className="mt-5">ヘルパーの利用</h4>
      <p>
        ヘルパーを利用することで、ライトの位置を視覚的に確認することができます。
        <br />
        helper に 0 より大きい値を指定すると、ヘルパーが表示されます。
        <br />
        ヘルパーの色は helperColor で指定できます。
      </p>
      <Ex3
        className="border"
        style={{
          width: "240px",
          height: "240px",
        }}
      />
      <CodeBlock>
        {`const { camera, create, controls, animate } = init()
controls.connect();
camera.position.set(0, 2, 3);

create.spotLight({
  position: [-1, 1, 1],
  helper: 1,
  helperColor: 0xff0000,
});

create.cube({
  size: 0.5,
  position: [0, 0.25, 0],
})

create.plane({
  position: [0, 0, 0],
  rotation: [-Math.PI / 2, 0, 0],
  size: [10, 10],
  option: {
    color: "#ffffff",
  },
});

animate();
`}
      </CodeBlock>
    </Container>
  );
}
