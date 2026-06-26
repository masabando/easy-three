import CodeBlock from "@/components/CodeBlock";
import ReferenceContent from "@/components/ReferenceContent";
import { Note } from "@/components/BaseKit";
import H1 from "@/components/H1";
import H2 from "@/components/H2";
import H3 from "@/components/H3";
import { Ex1, Ex2, Ex3, Ex4 } from "./Codes";
import MeshBaseProps from "@/app/reference/create/MeshBaseProps";

export const metadata = {
  title: "create.cube",
};

export default function Reference_Create_Cube() {
  return (
    <div>
      <H1>create.cube</H1>
      <ReferenceContent
        name="create.cube"
        args="props : Object"
        returnObject="Mesh"
        argsInfo={
          <div>
            <span>props</span> - 設定オブジェクト。
            <ul className="list-disc list-inside ml-4">
              <li>size (Array | Number) : サイズ (デフォルト : 1)。</li>
              <li>
                segments (Array | Number) : 角丸部分の分割数 (デフォルト : 1)。
              </li>
              <li>rounded (Boolean) : 角丸にするか？ (デフォルト : false)。</li>
              <li>radius (Number) : 角丸の半径 (デフォルト : 0.1)。</li>
              <MeshBaseProps />
            </ul>
          </div>
        }
      >
        <p>
          キューブ (立方体) を作成してシーンに追加します。
          <br />
          create.box は create.cube のエイリアスです。
        </p>
        <p className="mt-4">
          size と segments については、通常3つの値を持つ配列で指定します。
          <br />
          配列でなく1つの数値を指定した場合、その値を3つ持つ配列として扱います。
          <br />
          (例 : size: 2 は [2, 2, 2] と同じ)
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
          角丸にする場合、segments
          をある程度高く設定することで、より滑らかな角丸になります。
        </p>
      </ReferenceContent>

      <H2 className="mt-14">コードの例</H2>
      <H3>立方体の作成</H3>
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

      <H3 className="mt-10">角丸の立方体</H3>
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

      <H3 className="mt-10">アニメーション</H3>
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

      <H3 className="mt-10">オプションの変更</H3>
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
    </div>
  );
}
