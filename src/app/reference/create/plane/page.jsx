"use client";
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
    camera.position.set(0, 1, 1);
    create.ambientLight();
    create.directionalLight();
    create.plane();
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
    const { camera, create, animate, destroy, THREE, Default } = init(
      ref.current
    );
    camera.position.set(0, 0, 2);
    create.ambientLight();
    create.directionalLight();
    const plane = create.plane({
      option: {
        side: THREE.DoubleSide,
        color: Default.color,
      },
    });
    animate(({ delta }) => {
      plane.rotation.x += delta;
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
    const { camera, create, animate, destroy, THREE, Default } = init(
      ref.current
    );
    camera.position.set(0, 0, 4);
    create.ambientLight();
    create.directionalLight();
    const plane1 = create.plane({
      size: 1,
      position: [-1, 0, 0],
      material: "Normal",
      option: {
        side: THREE.DoubleSide,
      },
    });
    const plane2 = create.plane({
      size: 1.5,
      position: [1, 0, 0],
      option: {
        // material settings
        color: 0x00ff00,
        metalness: 0.6,
        roughness: 0,
        transparent: true,
        opacity: 0.5,
        side: THREE.DoubleSide,
      },
    });
    const plane3 = create.plane({
      size: 3,
      position: [0, 0, -3],
      option: {
        side: THREE.DoubleSide,
        color: Default.color,
      },
    });
    animate(({ time, delta }) => {
      plane1.rotation.x += delta;
      plane2.rotation.y += delta;
      plane3.rotation.x += delta;
      plane3.rotation.z += delta;
      plane3.position.y = Math.sin(time) * 2;
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
      <title>create.plane | easy-three</title>
      <h1>create.plane</h1>
      <ReferenceContent
        name="create.plane"
        args="props : Object"
        returnObject="Mesh"
        //href="/reference/create/plane/"
        argsInfo={
          <div>
            <span>props</span> - 設定オブジェクト。
            <ul>
              <li>size (Array | Number) : サイズ (デフォルト : 1)。</li>
              <li>position (Array) : 位置 (デフォルト : [0, 0, 0])。</li>
              <li>rotation (Array) : 回転 (デフォルト : [0, 0, 0])。</li>
              <li>
                option (Object) : オプション (デフォルト :{" "}
                {`{color: Default.color }`})。
              </li>
              <li>
                material (String) : マテリアルタイプ (デフォルト :
                {`Default.material`})。
              </li>
              <li>
                castShadow (Boolean) : 別のオブジェクトに影を落とすかどうか
                (デフォルト : true)。
              </li>
              <li>
                receiveShadow (Boolean) :
                別のオブジェクトからの影を受けるかどうか (デフォルト : true)。
              </li>
              <li>
                autoAdd (Boolean) : 自動でシーンに追加 (デフォルト : true)。
              </li>
            </ul>
          </div>
        }
      >
        <p>平面を作成してシーンに追加します。</p>
      </ReferenceContent>
      <p>
        size については、通常2つの値を持つ配列で指定します。
        <br />
        配列でなく1つの数値を指定した場合、その値を2つ持つ配列として扱います。
        <br />
        (例 : size: 2 は [2, 2] と同じ)
      </p>
      <p>
        option.material には、マテリアルの種類を文字列で指定します。
        <br />
        マテリアルの種類については、
        <Note>
          Three.js で定義されているものから 「THREE.」と「Mesh」を除いたもの
        </Note>
        になります。
        <br />
        (例 : "Physical" は THREE.MeshPhysicalMaterial を意味します。)
        <br />
        例外として、THREE.NormalMaterial は "Normal" として指定します。
      </p>

      <p>
        <Note>平面には表裏があり、裏面はデフォルトで描画されません。</Note>
        <br />
        裏面も描画する場合は、option に side: THREE.DoubleSide を指定します
        (init メソッドから THREE を取得できます)。
        <br />
        具体例は下記の「アニメーション」のコードを参照してください。
      </p>

      <h2>コードの例</h2>
      <h4>平面の作成</h4>
      <Ex1
        className="border"
        style={{
          width: "240px",
          height: "240px",
        }}
      />
      <CodeBlock>
        {`const { camera, create, animate } = init()
camera.position.set(0, 1, 1)
create.ambientLight()
create.directionalLight()

create.plane()

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
        {`const { camera, create, animate, THREE, Default } = init()
camera.position.set(0, 0, 2)
create.ambientLight()
create.directionalLight()

const plane = create.plane({
  option: {
    side: THREE.DoubleSide,
    color: Default.color,
  }
})

animate(({ delta }) => {
  plane.rotation.x += delta
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
        {`const { camera, create, animate, THREE, Default } = init()
camera.position.set(0, 0, 4);
create.ambientLight();
create.directionalLight();

const plane1 = create.plane({
  size: 1,
  position: [-1, 0, 0],
  material: "Normal",
  option: {
    side: THREE.DoubleSide,
  },
});

const plane2 = create.plane({
  size: 1.5,
  position: [1, 0, 0],
  option: {
    // material settings
    color: 0x00ff00,
    metalness: 0.6,
    roughness: 0,
    transparent: true,
    opacity: 0.5,
    side: THREE.DoubleSide,
  },
});

const plane3 = create.plane({
  size: 3,
  position: [0, 0, -3],
  option: {
    side: THREE.DoubleSide,
    color: Default.color,
  },
});

animate(({ time, delta }) => {
  plane1.rotation.x += delta;
  plane2.rotation.y += delta;
  plane3.rotation.x += delta;
  plane3.rotation.z += delta;
  plane3.position.y = Math.sin(time) * 2;
});
`}
      </CodeBlock>
    </Container>
  );
}
