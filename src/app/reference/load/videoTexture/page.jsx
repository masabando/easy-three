"use client";
import Container from "react-bootstrap/Container";
import CodeBlock from "@/components/CodeBlock";
import { useEffect, useRef } from "react";
import { init } from "@dist/easy-three.js";
import { noto } from "@/app/layout";
import ReferenceContent from "@/components/ReferenceContent";
import { Note, Link } from "@/components/BaseKit";

function Ex1(props) {
  const ref = useRef();
  useEffect(() => {
    const { camera, create, controls, load, animate, destroy } = init(
      ref.current
    );
    create.ambientLight({ intensity: 1 });
    create.directionalLight({ intensity: 2 });
    camera.position.set(-1, 1, 1);
    controls.connect();


    create.plane({
      size: [1.28 * 2, 0.72 * 2],
      option: {
        map: load.videoTexture("https://www.ktc.ac.jp/img/top/topmovie_720p.mp4"),
      }
    });

    animate();
    return () => {
      destroy();
    };
  }, []);
  return <div ref={ref} {...props}></div>;
}

export default function Page() {
  return (
    <Container className="pt-4 pb-5">
      <title>load.videoTexture | easy-three</title>
      <h1>load.videoTexture</h1>

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
              <ul>
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

      <h2>コードの例</h2>
      <h4>ビデオテクスチャの利用</h4>
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
    map: load.videoTexture("https://www.ktc.ac.jp/img/top/topmovie_720p.mp4"),
  }
});

animate();
`}
      </CodeBlock>
    </Container>
  );
}
