import CodeBlock from "@/components/CodeBlock";
import ReferenceContent from "@/components/ReferenceContent";
import { Note } from "@/components/BaseKit";
import H1 from "@/components/H1";
import H2 from "@/components/H2";
import H3 from "@/components/H3";
import { Ex1 } from "./Codes";

export const metadata = {
  title: "load.background",
};

export default function Page() {
  return (
    <div>
      <H1>load.background</H1>

      <ReferenceContent
        name="load.background"
        args="url : String, props : Object"
        returnObject="Texture"
        argsInfo={
          <>
            <div>
              <span>url</span> - 背景テクスチャのURL。
            </div>
            <div>
              <span>props</span> - 設定オブジェクト。
              <ul className="list-disc list-inside ml-4">
                <li>
                  background (Boolean) : 背景に設定するか (デフォルト : true)。
                </li>
                <li>
                  environment (Boolean) : 環境マップに設定するか (デフォルト :
                  true)。
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
          指定されたHDR形式の画像をロードし、シーンの背景と環境マップに設定します。
        </p>
      </ReferenceContent>

      <H2 className="mt-14">コードの例</H2>
      <H3>背景と環境マップの設定</H3>
      <Ex1
        className="border"
        style={{
          width: "240px",
          height: "240px",
        }}
      />
      <CodeBlock>
        {`const { camera, create, helper, load, controls, animate } = init()
create.ambientLight();
create.directionalLight();
camera.position.set(0, 0, 2);
controls.connect();

load.background(
  "/easy-three/texture/hdr/kloofendal_48d_partly_cloudy_puresky_1k.hdr"
);

const cube = create.cube({
  rounded: true,
  segments: 16,
  option: {
    color: 0xffffff,
    metalness: 0.9,
    roughness: 0.1,
  }
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
