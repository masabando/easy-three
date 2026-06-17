import CodeBlock from "@/components/CodeBlock";
import ReferenceContent from "@/components/ReferenceContent";
import { Note } from "@/components/BaseKit";
import H1 from "@/components/H1";
import H2 from "@/components/H2";
import H3 from "@/components/H3";
import { Ex1 } from "./Codes";

export const metadata = {
  title: "load.cubeTexture",
};


export default function Page() {
  return (
    <div>
      <H1>load.cubeTexture</H1>

      <ReferenceContent
        name="load.cubeTexture"
        args="urls : Array<String>, props : Object"
        returnObject="CubeTexture"
        argsInfo={
          <>
            <div>
              <span>urls</span> - テクスチャのURLの配列 (サイズ : 6)。
            </div>
            <div>
              <span>props</span> - 設定オブジェクト。
              <ul className="list-disc list-inside ml-4">
                <li>
                  path (String) : テクスチャのパスのベース (デフォルト :
                  &quot;./&quot;)。
                </li>
              </ul>
            </div>
          </>
        }
      >
        <p>
          指定された6つの画像をロードし、キューブテクスチャを作成します。
          <br />
          キューブテクスチャは、シーンの背景や環境マップに使用できます。
        </p>
      </ReferenceContent>

      <H2 className="mt-14">コードの例</H2>
      <H3>キューブテクスチャによる背景</H3>
      <Ex1
        className="border"
        style={{
          width: "240px",
          height: "240px",
        }}
      />
      <CodeBlock>
        {`const { camera, create, load, scene, controls, animate } = init()
create.ambientLight({ intensity: 1 });
create.directionalLight({ intensity: 2 });
camera.position.set(0, 0, 2);
controls.connect();

scene.background = load.cubeTexture(
  [
    "red_brick_diff_1k.jpg",
    "red_brick_diff_1k.jpg",
    "red_brick_diff_1k.jpg",
    "red_brick_diff_1k.jpg",
    "red_brick_diff_1k.jpg",
    "red_brick_diff_1k.jpg",
  ],
  {
    path: "/easy-three/texture/img/",
  }
);

const cube = create.cube({
  rounded: true,
  segments: 16,
});

animate(({ delta }) => {
  cube.rotation.x += delta;
  cube.rotation.y += delta;
});
`}
      </CodeBlock>
    </div>
  );
}
