import CodeBlock from "@/components/CodeBlock";
import ReferenceContent from "@/components/ReferenceContent";
import { Note } from "@/components/BaseKit";
import H1 from "@/components/H1";
import H2 from "@/components/H2";
import H3 from "@/components/H3";
import { Ex1, Ex2 } from "./Codes";
import MeshBaseProps from "@/app/reference/create/MeshBaseProps";

export const metadata = {
  title: "create.material",
};

export default function Reference_Create_Material() {
  return (
    <div>
      <H1>create.material</H1>
      <ReferenceContent
        name="create.material"
        args="props : Object"
        returnObject="Material"
        argsInfo={
          <div>
            <span>props</span> - 設定オブジェクト。
            <ul className="list-disc list-inside ml-4">
              <li>
                material (String) :
                マテリアルタイプ、またはマテリアルオブジェクト、またはマテリアルオブジェクトの配列
                (デフォルト :{`Default.material`}
                )。
              </li>
              <li>
                doubleSide (Boolean) : 両面表示にするか？ (デフォルト : false)。
              </li>
              <li>
                upsideDown (Boolean) : 裏面表示にするか？ (デフォルト : false)。
              </li>
            </ul>
          </div>
        }
      >
        <p>マテリアルを作成して返します。</p>
        <p className="mt-4">
          doubleSide と upsideDown は、マテリアルの side
          プロパティを設定するためのショートカットです。
        </p>
        <p className="mt-4">
          doubleSide が true の場合、side は THREE.DoubleSide に設定されます。
          <br />
          upsideDown が true の場合、side は THREE.BackSide に設定されます。
          <br />
          どちらも false の場合、side は THREE.FrontSide に設定されます。
        </p>
        <p className="mt-4">
          それ以外の props に指定できるものは、Three.js
          のマテリアルのプロパティと同じです。
          <br />
          例えば eas-three
          のデフォルトのマテリアルは、THREE.MeshStandardMaterial なので、
          以下のものが指定できます(他にもたくさんあります)。
        </p>
        <ul className="list-disc list-inside ml-4 mt-4">
          <li>color (Number) : 色 (デフォルト : Default.color)。</li>
          <li>map (Texture) : テクスチャ (デフォルト : null)。</li>
          <li>normalMap (Texture) : 法線マップ (デフォルト : null)。</li>
          <li>bumpMap (Texture) : バンプマップ (デフォルト : null)。</li>
          <li>transmission (Number) : 透過率 (デフォルト : 0)。</li>
          <li>roughness (Number) : 粗さ (デフォルト : 1)。</li>
          <li>metalness (Number) : 金属度 (デフォルト : 0)。</li>
        </ul>
        <p className="mt-4">
          詳細は
          <a
            className="link link-primary"
            href="https://threejs.org/docs/?q=physicalma#MeshPhysicalMaterial"
          >
            Three.js のドキュメント
          </a>
          を参照してください。
        </p>
      </ReferenceContent>

      <H2 className="mt-14">コードの例</H2>
      <H3>マテリアルの作成</H3>
      <Ex1
        className="border"
        style={{
          width: "240px",
          height: "240px",
        }}
      />
      <CodeBlock>
        {`const { camera, create, controls, animate } = init()
camera.position.set(1, 1, 2)
controls.connect()

create.ambientLight()
create.directionalLight()

const material = create.material({
  color: 0x00ff00,
})

create.cube({
  material: material,
})

animate()
`}
      </CodeBlock>

      <H3 className="mt-10">各面に違うマテリアルを設定する</H3>
      <Ex2
        className="border"
        style={{
          width: "240px",
          height: "240px",
        }}
      />
      <CodeBlock>
        {`const { camera, create, controls, animate } = init()
camera.position.set(1, 1, 2)
controls.connect()

create.ambientLight()
create.directionalLight()

const redMaterial = create.material({ color: 0xff0000 });
const greenMaterial = create.material({ color: 0x00ff00 });
const blueMaterial = create.material({ color: 0x0000ff });

create.cube({
  material: [
    redMaterial,
    greenMaterial,
    blueMaterial,
    redMaterial,
    greenMaterial,
    blueMaterial
  ],
});

animate()
`}
      </CodeBlock>
    </div>
  );
}
