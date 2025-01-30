"use client"
import Container from "react-bootstrap/Container";
import CodeBlock from "@/components/CodeBlock";
import { useEffect, useRef } from "react";
import { init } from "@dist/easy-three.js";
import ReferenceContent from "@/components/ReferenceContent";
import { Note } from "@/components/BaseKit";


function Ex1(props) {
  const ref = useRef();
  useEffect(() => {
    const { camera, create, animate, destroy } = init(ref.current);
    camera.position.set(0, 2, 2);
    create.ambientLight();
    create.directionalLight();

    const cube1 = create.cube({
      position: [-1, 0, 0],
      autoAdd: false,
    });
    const cube2 = create.cube({
      position: [1, 0, 0],
      autoAdd: false,
    });

    const group = create.group({
      children: [cube1, cube2],
    })

    animate(({ delta }) => {
      group.rotation.y += delta;
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
    camera.position.set(0, 2, 2);
    create.ambientLight();
    create.directionalLight();

    const group = create.group({
      children: [
        create.cube({
          position: [-1, 0, 0],
          autoAdd: false,
        }),
        create.cube({
          position: [1, 0, 0],
          autoAdd: false,
        }),
      ],
    });

    animate(({ delta }) => {
      group.rotation.y += delta;
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
    camera.position.set(0, 2, 2);
    create.ambientLight();
    create.directionalLight();

    const group = create.group();

    const cube1 = create.cube({
      position: [-1, 0, 0],
      autoAdd: false,
    });
    const cube2 = create.cube({
      position: [1, 0, 0],
      autoAdd: false,
    });

    group.add(cube1, cube2);

    animate(({ delta }) => {
      group.rotation.y += delta;
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
      <title>create.group | easy-three</title>
      <h1>create.group</h1>
      <ReferenceContent
        name="create.group"
        args="props : Object"
        returnObject="Group"
        argsInfo={
          <div>
            <span>props</span> - 設定オブジェクト。
            <ul>
              <li>position (Array) : 位置 (デフォルト : [0, 0, 0])。</li>
              <li>rotation (Array) : 回転 (デフォルト : [0, 0, 0])。</li>
              <li>
                children (Array&lt;Object3D&gt;) : 子要素の配列 (デフォルト :
                [])
              </li>
              <li>
                autoAdd (Boolean) : 自動でシーンに追加 (デフォルト : true)。
              </li>
            </ul>
          </div>
        }
      >
        <p>
          グループを作成してシーンに追加します。
          <br />
          引数で最初に追加する子要素を指定できます。
        </p>
      </ReferenceContent>

      <p>
        グループを使うことで、複数のオブジェクトをまとめて操作することができます。
        <br />
        特に、オブジェクト間の相対的な位置を保ったまま移動させる場合や、
        オブジェクトをその原点以外を中心に回転させる場合に便利です。
      </p>

      <p>
        オブジェクトをグループに追加する場合、
        そのオブジェクト自身はシーンに追加する必要がありません。
        <br />
        グループをシーンに追加した時点でそのグループに含まれる全てのオブジェクトがシーンに追加されます。
        <br />
        <Note>
          グループに含まれるオブジェクトは autoAdd オプションを false に設定
        </Note>
        してください (下の例を参照)。
      </p>

      <h2>コードの例</h2>
      <h4>既存オブジェクトのグループへの追加</h4>
      <p>children に追加するオブジェクトを指定してグループを作成します。</p>
      <Ex1
        className="border"
        style={{
          width: "240px",
          height: "240px",
        }}
      />
      <CodeBlock>
        {`const { camera, create, animate } = init()
camera.position.set(0, 2, 2);
create.ambientLight();
create.directionalLight();

const cube1 = create.cube({
  position: [-1, 0, 0],
  autoAdd: false,
});
const cube2 = create.cube({
  position: [1, 0, 0],
  autoAdd: false,
});

const group = create.group({
  children: [cube1, cube2],
})

animate(({ delta }) => {
  group.rotation.y += delta;
});
`}
      </CodeBlock>

      <h4 className="mt-5">グループに直接追加</h4>
      <p>
        グループ作成時に children
        部分で直接オブジェクトを作成しつつ追加することもできます。
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
camera.position.set(0, 2, 2);
create.ambientLight();
create.directionalLight();

const group = create.group({
  children: [
    create.cube({
      position: [-1, 0, 0],
      autoAdd: false,
    }),
    create.cube({
      position: [1, 0, 0],
      autoAdd: false,
    }),
  ],
});

animate(({ delta }) => {
  group.rotation.y += delta;
});
`}
      </CodeBlock>
      <h4 className="mt-5">既存のグループへの追加</h4>
      <p>
        グループを作成した後にオブジェクトを追加することもできます。
        <br />
        create.group の戻り値は Three.js の Group オブジェクトです。
      </p>
      <Ex3
        className="border"
        style={{
          width: "240px",
          height: "240px",
        }}
      />
      <CodeBlock>
        {`const { camera, create, animate } = init()
camera.position.set(0, 2, 2);
create.ambientLight();
create.directionalLight();

const group = create.group();

const cube1 = create.cube({
  position: [-1, 0, 0],
  autoAdd: false,
});
const cube2 = create.cube({
  position: [1, 0, 0],
  autoAdd: false,
});

group.add(cube1, cube2);

animate(({ delta }) => {
  group.rotation.y += delta;
});
`}
      </CodeBlock>
    </Container>
  );
}
