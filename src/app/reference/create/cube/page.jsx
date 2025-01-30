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
    animate(({ time, delta }) => {
      cube1.rotation.x += delta;
      cube2.rotation.y += delta;
      cube3.rotation.x += delta;
      cube3.rotation.z += delta;
      cube3.position.y = Math.sin(time) * 2;
    });
    return () => {
      destroy();
    };
  }, []);
  return <div ref={ref} {...props}></div>;
}

function Ex4(props) {
  const ref = useRef();
  useEffect(() => {
    const { camera, create, animate, destroy } = init(ref.current);
    camera.position.set(0, 0, 2);
    create.ambientLight();
    create.directionalLight();
    create.cube({
      rounded: true,
      radius: 0.2,
      segments: 16,
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
      <title>create.cube | easy-three</title>
      <h1>create.cube</h1>
      <ReferenceContent
        name="create.cube"
        args="props : Object"
        returnObject="Mesh"
        argsInfo={
          <div>
            <span>props</span> - 設定オブジェクト。
            <ul>
              <li>size (Array | Number) : サイズ (デフォルト : 1)。</li>
              <li>
                segments (Array | Number) : 角丸部分の分割数 (デフォルト : 1)。
              </li>
              <li>position (Array) : 位置 (デフォルト : [0, 0, 0])。</li>
              <li>rotation (Array) : 回転 (デフォルト : [0, 0, 0])。</li>
              <li>rounded (Boolean) : 角丸にするか？ (デフォルト : false)。</li>
              <li>radius (Number) : 角丸の半径 (デフォルト : 0.1)。</li>
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
        <p>
          キューブ (立方体) を作成してシーンに追加します。
          <br />
          create.box は create.cube のエイリアスです。
        </p>
        <p>
          size と segments については、通常3つの値を持つ配列で指定します。
          <br />
          配列でなく1つの数値を指定した場合、その値を3つ持つ配列として扱います。
          <br />
          (例 : size: 2 は [2, 2, 2] と同じ)
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
          角丸にする場合、segments
          をある程度高く設定することで、より滑らかな角丸になります。
        </p>
      </ReferenceContent>
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

      <h4 className="mt-5">角丸の立方体</h4>
      <Ex4
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

create.cube({
  rounded: true,
  radius: 0.2,
  segments: 16,
});

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

animate(({ time, delta }) => {
  cube1.rotation.x += delta;
  cube2.rotation.y += delta;
  cube3.rotation.x += delta;
  cube3.rotation.z += delta;
  cube3.position.y = Math.sin(time) * 2;
});
`}
      </CodeBlock>
    </Container>
  );
}
