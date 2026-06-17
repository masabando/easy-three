import CodeBlock from "@/components/CodeBlock";
import ReferenceContent from "@/components/ReferenceContent";
import { Note } from "@/components/BaseKit";
import H1 from "@/components/H1";
import H2 from "@/components/H2";
import H3 from "@/components/H3";
import { Ex1 } from "./Codes";

export const metadata = {
  title: "load.videoTexture",
};


export default function Page() {
  return (
    <div>
      <H1>load.videoTexture</H1>

      <ReferenceContent
        name="load.videoTexture"
        args="url : String, props : Object"
        returnObject="VideoTexture"
        argsInfo={
          <>
            <div>
              <span>url</span> - テクスチャのURL。
            </div>
            <div>
              <span>props</span> - 設定オブジェクト。
              <ul className="list-disc list-inside ml-4">
                <li>
                  autoPlay (Boolean) : 自動再生するか (デフォルト : true)。
                </li>
                <li>loop (Boolean) : ループ再生するか (デフォルト : true)。</li>
              </ul>
            </div>
          </>
        }
      >
        <p>mp4などの動画ファイルを読み込み、テクスチャとして使用します。</p>
      </ReferenceContent>

      <H2 className="mt-14">コードの例</H2>
      <H3>ビデオテクスチャの利用</H3>
      <Ex1
        className="border"
        style={{
          width: "240px",
          height: "240px",
        }}
      />
      <CodeBlock>
        {`const { camera, create, load, controls, animate } = init()
create.ambientLight({ intensity: 1 });
create.directionalLight({ intensity: 2 });
camera.position.set(-1, 1, 1);
controls.connect();

create.plane({
  size: [1.28 * 2, 0.72 * 2],
  option: {
    map: load.videoTexture("https://www.ktc.ac.jp/img/top/movie/topmovie_new_480p.mp4"),
  }
});

animate();
`}
      </CodeBlock>
    </div>
  );
}
