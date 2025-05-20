"use client"
import Container from "react-bootstrap/Container";
import CodeBlock from "@/components/CodeBlock";
import { useEffect, useRef } from "react";
import { init } from "@dist/easy-three.js";
import ReferenceContent from "@/components/ReferenceContent";
import { Note, Link } from "@/components/BaseKit";


function Ex1(props) {
  const ref = useRef();
  useEffect(() => {
    const { camera, controls, create, animate, destroy } = init(ref.current);
    controls.connect();
    camera.position.set(0, 4, -4);
    create.ambientLight({ intensity: 1 });
    create.directionalLight({ intensity: 3 });

    create.sky();

    const cube = create.cube({ position: [0, 2, 0] });

    const ocean = create.ocean("/easy-three/texture/water/NormalMap-1.jpg");
    
    animate(({ delta }) => {
      ocean.update(delta)
      cube.rotation.x += delta;
      cube.rotation.y += delta;
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
    const { camera, controls, create, animate, THREE, destroy } = init(ref.current);
    controls.connect();
    camera.position.set(0, 4, -4);
    create.ambientLight({ intensity: 1 });
    create.directionalLight({ intensity: 3 });

    create.sky();

    const ocean = create.ocean("/easy-three/texture/water/NormalMap-1.jpg", {
      geometry: new THREE.SphereGeometry(3, 32, 32),
    });

    animate(({ delta }) => {
      ocean.update(delta)
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
      <title>create.ocean | easy-three</title>
      <h1>create.ocean</h1>
      <ReferenceContent
        name="create.ocean"
        args="texture : String, props : Object"
        returnObject="{mesh : Mesh, update : Function}"
        argsInfo={
          <div>
            <div>
              <span>texture</span> - テクスチャのURL。
            </div>
            <span>props</span> - 設定オブジェクト。
            <ul>
              <li>size (Array | Number) : サイズ (デフォルト : 100)。</li>
              <li>
                geometry (Geometry) : ジオメトリ (デフォルト : null)。
              </li>
              <li>sunDirection (Vector3) : 太陽の方向 (デフォルト : new THREE.Vector3(1, 1, 1))。</li>
              <li>
                sunColor (Color) : 太陽の色 (デフォルト : 0xffffff)。
              </li>
              <li>
                waterColor (Color) : 水の色 (デフォルト : 0x001e0f)。
              </li>
              <li>
                distortionScale (Number) : 歪みのスケール (デフォルト : 3.7)。
              </li>
              <li>
                textureSize (Array | Number) : テクスチャのサイズ (デフォルト : 512)。
              </li>
              <li>
                fog (Boolean) : フォグ (デフォルト : false)。
              </li>
              <li>
                position (Array) : 位置 (デフォルト : [0, 0, 0])。
              </li>
              <li>
                rotation (Array) : 回転 (デフォルト : [-Math.PI / 2, 0, 0])。
              </li>
              <li>
                autoAdd (Boolean) : 自動でシーンに追加 (デフォルト : true)。
              </li>
            </ul>
          </div>
        }
      >
        <p>
          海のようなオブジェクトを作成します。<br />
          透明な水を表現する場合には、<Link href="/reference/create/water">create.water</Link>を使用してください。
        </p>
        <p>
          環境マップを利用したほうが、よりリアルな海面を表現できます。<br />
          <Link href="/reference/load/background">load.background</Link> で環境マップを読み込んでおくことをお勧めします。
        </p>
        <p>
          sizeには十分大きな値を指定してください。
        </p>
        <p>
          phi は太陽の方位角、theta は太陽の頂点からの角度を指定します。
        </p>
        <p>
          戻り値はメッシュと、update関数です。<br />
          update関数は、deltaを引数に取ります。<br />
          update関数をanimateの中で呼ぶことで、海の動きを更新します。
        </p>
        <p>
          通常、ジオメトリは PlaneGeometryを使用します。<br />
          sizeはこのジオメトリのサイズを指定します。<br />
          他のジオメトリを使用する場合は、geometryで指定してください。
        </p>
        <p>
          テクスチャは、水面を表すためのノーマルマップを指定してください。<br />
          自作する場合は、Processingのnoise()などでパーリンノイズのグレースケール画像を作成し、
          <a target="_blank" href="https://cpetry.github.io/NormalMap-Online/">
            NormalMap-Online
          </a>
          などのツールでノーマルマップに変換してください。<br />
          シームレスなノーマルマップにするには、GIMPのフィルターを使用すると便利です。
        </p>
        <p>
          easy-three では、サンプルの水面テクスチャを2つ用意しています。<br />
          どちらもeasy-threeのオリジナル制作物であり、CC-0ライセンスで再配布を含め自由にお使いいただけます。
        </p>
        <ul>
          <li><a href="/easy-three/texture/water/NormalMap-1.jpg">NormalMap-1.jpg</a></li>
          <li><a href="/easy-three/texture/water/NormalMap-2.jpg">NormalMap-2.jpg</a></li>
        </ul>

      </ReferenceContent>
      <h2>コードの例</h2>
      <h4>海の作成</h4>
      <Ex1
        className="border"
        style={{
          width: "240px",
          height: "240px",
        }}
      />
      <CodeBlock>
        {`const { camera, controls, create, animate } = init()
controls.connect();
camera.position.set(0, 4, -4);
create.ambientLight({ intensity: 1 });
create.directionalLight({ intensity: 3 });

create.sky();

const cube = create.cube({ position: [0, 2, 0] });

const ocean = create.ocean("/easy-three/texture/water/NormalMap-1.jpg");

animate(({ delta }) => {
  ocean.update(delta)
  cube.rotation.x += delta;
  cube.rotation.y += delta;
});`
      }
      </CodeBlock>

      <h4 className="mt-5">ジオメトリの変更</h4>
      <Ex2
        className="border"
        style={{
          width: "240px",
          height: "240px",
        }}
      />
      <CodeBlock>
        {`const { camera, controls, create, animate, THREE } = init()
controls.connect();
camera.position.set(0, 4, -4);
create.ambientLight({ intensity: 1 });
create.directionalLight({ intensity: 3 });

create.sky();

const ocean = create.ocean("/easy-three/texture/water/NormalMap-2.jpg", {
  geometry: new THREE.SphereGeometry(3, 32, 32),
});

animate(({ delta }) => {
  ocean.update(delta)
});`}
      </CodeBlock>

    </Container>
  );
}
