import CodeBlock from "@/components/CodeBlock";
import ReferenceContent from "@/components/ReferenceContent";
import { Note } from "@/components/BaseKit";
import H1 from "@/components/H1";
import H2 from "@/components/H2";
import H3 from "@/components/H3";
import { Ex1, Ex2, Ex3 } from "./Codes";
import MeshBaseProps from "@/app/reference/create/MeshBaseProps";

export const metadata = {
  title: "create.plane",
};


export default function Reference_Create_Plane() {
  return (
    <div>
      <H1>create.plane</H1>
      <ReferenceContent
        name="create.plane"
        args="props : Object"
        returnObject="Mesh"
        //href="/reference/create/plane/"
        argsInfo={
          <div>
            <span>props</span> - 設定オブジェクト。
            <ul className="list-disc list-inside ml-4">
              <li>size (Array | Number) : サイズ (デフォルト : 1)。</li>
              <MeshBaseProps />
            </ul>
          </div>
        }
      >
        <p>平面を作成してシーンに追加します。</p>
      </ReferenceContent>
      <p className="mt-4">
        size については、通常2つの値を持つ配列で指定します。
        <br />
        配列でなく1つの数値を指定した場合、その値を2つ持つ配列として扱います。
        <br />
        (例 : size: 2 は [2, 2] と同じ)
      </p>
      <p className="mt-4">
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

      <p className="mt-4">
        <Note>平面には表裏があり、裏面はデフォルトで描画されません。</Note>
        <br />
        裏面も描画する場合は、option に side: THREE.DoubleSide を指定します
        (init メソッドから THREE を取得できます)。
        <br />
        具体例は下記の「アニメーション」のコードを参照してください。
      </p>

      <H2 className="mt-14">コードの例</H2>
      <H3>平面の作成</H3>
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

      <H3 className="mt-10">アニメーション</H3>
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

      <H3 className="mt-10">オプションの変更</H3>
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
    </div>
  );
}
