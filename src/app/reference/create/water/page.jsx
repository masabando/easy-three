import CodeBlock from "@/components/CodeBlock";
import ReferenceContent from "@/components/ReferenceContent";
import { Link } from "@/components/BaseKit";
import H1 from "@/components/H1";
import H2 from "@/components/H2";
import H3 from "@/components/H3";
import { Ex1, Ex2 } from "./Codes";

export const metadata = {
  title: "create.water",
};

export default function Reference_Create_Water() {
  return (
    <div>
      <H1>create.water</H1>
      <ReferenceContent
        name="create.water"
        args="normalMap0 : String, normalMap1 : String, props : Object"
        returnObject="Mesh"
        argsInfo={
          <div>
            <div>
              <span>normalMap0</span> - テクスチャのURL。
            </div>
            <div>
              <span>normalMap1</span> - テクスチャのURL。
            </div>
            <span>props</span> - 設定オブジェクト。
            <ul className="list-disc list-inside ml-4">
              <li>size (Array | Number) : サイズ (デフォルト : 1)。</li>
              <li>
                geometry (Geometry) : ジオメトリ (デフォルト : null)。
              </li>
              <li>
                color (Hex | String) : 色 (デフォルト : 0xffffff)。
              </li>
              <li>
                scale (Number) : スケール (デフォルト : 4)。
              </li>
              <li>
                flow (Array) : 流れ (デフォルト : [1, 1])。
              </li>
              <li>
                textureSize (Array | Number) : テクスチャのサイズ (デフォルト : 512)。
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
          水のようなオブジェクトを作成します。<br />
          海面を表現するには、<Link className="text-blue-500 underline" href="/reference/create/ocean">create.ocean</Link> を使用してください。
        </p>
        <p className="mt-4">
          環境マップを利用したほうが、よりリアルな水面を表現できます。<br />
          <Link className="text-blue-500 underline" href="/reference/load/background">load.background</Link> で環境マップを読み込んでおくことをお勧めします。
        </p>
        <p className="mt-4">
          通常、ジオメトリは PlaneGeometryを使用します。<br />
          sizeはこのジオメトリのサイズを指定します。<br />
          他のジオメトリを使用する場合は、geometryで指定してください。
        </p>
        <p className="mt-4">
          水面を表現するノーマルマップは2つ必要です。<br />
          水面を表すノーマルマップの作成については、
          <Link className="text-blue-500 underline" href="/reference/create/ocean">create.ocean</Link>を参照してください。
        </p>
        <p className="mt-4">
          easy-three では、サンプルの水面テクスチャを2つ用意しています。<br />
          どちらもeasy-threeのオリジナル制作物であり、CC-0ライセンスで再配布を含め自由にお使いいただけます。
        </p>
        <ul className="list-disc list-inside ml-4 my-4">
          <li><a className="text-blue-500 underline" href="/easy-three/texture/water/NormalMap-1.jpg">NormalMap-1.jpg</a></li>
          <li><a className="text-blue-500 underline" href="/easy-three/texture/water/NormalMap-2.jpg">NormalMap-2.jpg</a></li>
        </ul>

      </ReferenceContent>
      <H2 className="mt-14">コードの例</H2>
      <H3>水の作成</H3>
      <Ex1
        className="border"
        style={{
          width: "240px",
          height: "240px",
        }}
      />
      <CodeBlock>
        {`const { camera, controls, create, load, animate } = init()
controls.connect();
camera.position.set(0, 4, -4);
create.ambientLight({ intensity: 1 });
create.directionalLight({ intensity: 1 });

create.sky();

create.plane({
  size: 8,
  rotation: [-Math.PI / 2, 0, 0],
  option: {
    map: load.texture("/easy-three/texture/img/brick_diff_1k.jpg"),
  }
})

create.water(
  "/easy-three/texture/water/NormalMap-1.jpg",
  "/easy-three/texture/water/NormalMap-2.jpg",
  {
    size: 5,
    position: [0, 1, 0],
    scale: 0.4,
  }
);

animate();`
      }
      </CodeBlock>

      <H3 className="mt-10">ジオメトリの変更</H3>
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
create.directionalLight({ intensity: 1 });

create.sky();

create.plane({
  size: 14,
  rotation: [-Math.PI / 2, 0, 0],
  option: {
    map: load.texture("/easy-three/texture/img/brick_diff_1k.jpg"),
  }
})

create.water(
  "/easy-three/texture/water/NormalMap-1.jpg",
  "/easy-three/texture/water/NormalMap-2.jpg",
  {
    scale: 0.4,
    position: [0, 2.2, 0],
    geometry: new THREE.SphereGeometry(2, 32, 32),
  }
);

animate();`}
      </CodeBlock>

    </div>
  );
}
