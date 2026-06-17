import CodeBlock from "@/components/CodeBlock";
import ReferenceContent from "@/components/ReferenceContent";
import { Note } from "@/components/BaseKit";
import H1 from "@/components/H1";
import H2 from "@/components/H2";
import H3 from "@/components/H3";
import { Ex1 } from "./Codes";

export const metadata = {
  title: "load.texture",
};


export default function Page() {
  return (
    <div>
      <H1>load.texture</H1>

      <ReferenceContent
        name="load.texture"
        args="url : String, props : Object"
        returnObject="Texture"
        argsInfo={
          <>
            <div>
              <span>url</span> - テクスチャのURL。
            </div>
            <div>
              <span>props</span> - 設定オブジェクト。
              <ul className="list-disc list-inside ml-4">
                <li>
                  wrapS (number) : テクスチャのラッピングモード (デフォルト :
                  Default.texture.wrapping)。
                </li>
                <li>
                  wrapT (number) : テクスチャのラッピングモード (デフォルト :
                  Default.texture.wrapping)。
                </li>
                <li>
                  repeat (Array) : テクスチャの繰り返し回数 (デフォルト : [1,
                  1])。
                </li>
                <li>
                  manager (Object) :
                  ローダマネージャ用のコールバック関数をまとめたオブジェクト。
                  <ul className="list-disc list-inside ml-4 border rounded p-2">
                    <li>
                      onStart (Function) : ロード開始時のコールバック関数。
                    </li>
                    <li>
                      onLoad (Function) : ロード完了時のコールバック関数。
                    </li>
                    <li>
                      onProgress (Function) : ロード中のコールバック関数。
                    </li>
                    <li>
                      onError (Function) : ロードエラー時のコールバック関数。
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </>
        }
      >
        <p>
          指定された画像をロードし、テクスチャを作成します。
          <br />
          テクスチャの繰り返しを有効にするには、wrapSおよびwrapTを
          &quot;Repeat&quot; または &quot;MirroredRepeat&quot;
          に設定する必要があります。
        </p>
      </ReferenceContent>

      <H2 className="mt-14">コードの例</H2>
      <H3>テクスチャの適用</H3>
      <Ex1
        className="border"
        style={{
          width: "240px",
          height: "240px",
        }}
      />
      <CodeBlock>
        {`const { camera, create, helper, load, controls, animate } = init()
create.ambientLight({ intensity: 1 });
create.directionalLight({ intensity: 2 });
camera.position.set(0, 0, 2);
controls.connect();

const cube = create.cube({
  rounded: true,
  segments: 16,
  option: {
    map: load.texture("/easy-three/texture/img/red_brick_diff_1k.jpg"),
    normalMap: load.texture("/easy-three/texture/img/red_brick_nor_gl_1k.jpg"),
  },
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
