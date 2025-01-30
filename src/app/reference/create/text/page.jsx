"use client"
import Container from "react-bootstrap/Container";
import CodeBlock from "@/components/CodeBlock";
import { useEffect, useRef } from "react";
import { init } from "@dist/easy-three.js";
import { noto } from "@/app/layout"
import ReferenceContent from "@/components/ReferenceContent";
import { Note, Link } from "@/components/BaseKit";

function Ex1(props) {
  const ref = useRef();
  useEffect(() => {
    const { camera, create, animate, destroy } = init(ref.current);
    camera.position.set(0, 0, 3);

    const text = create.text("easy-three", {
      size: [3, 1],
      font: noto.style.fontFamily
    })
    animate(({ delta }) => {
      text.rotation.x += delta;
      text.rotation.y += delta;
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
    const { camera, create, animate, destroy } = init(ref.current);
    camera.position.set(0, 0, 3);

    const text = create.text("easy-three", {
      size: [3, 1],
      font: noto.style.fontFamily,
      guide: 4,
      background: "#66ff66"
    });
    animate(({ delta }) => {
      text.rotation.x += delta;
      text.rotation.y += delta;
    });
    return () => {
      destroy();
    };
  }, []);
  return <div ref={ref} {...props}></div>;
}


export default function Page() {
  return (
    <Container className="pt-4 pb-5">
      <title>create.text | easy-three</title>
      <h1>create.text</h1>

      <ReferenceContent
        name="create.text"
        args="text : String, props : Object"
        returnObject="Mesh"
        argsInfo={
          <>
            <div>
              <span>text</span> - 表示するテキスト。
            </div>
            <div>
              <span>props</span> - 設定オブジェクト。
              <ul>
                <li>
                  fontSize (Number) : テキストのサイズ (デフォルト : 48)。
                </li>
                <li>
                  fontWeight (Number | String) : フォントのウェイト (デフォルト
                  : &quot;&quot;)。
                </li>
                <li>
                  font (String) : フォント (デフォルト : &quot;'Noto Sans JP',
                  sans-serif&quot;)。
                </li>
                <li>
                  color (String) : テキストの色 (デフォルト :
                  &quot;#000000&quot;)。
                </li>
                <li>position (Array) : 位置 (デフォルト : [0, 0, 0])。</li>
                <li>rotation (Array) : 回転 (デフォルト : [0, 0, 0])。</li>
                <li>
                  size (Array | Number) ジオメトリのサイズ (デフォルト : [1,
                  1])。
                </li>
                <li>resolution (Number) : 解像度 (デフォルト : 1)。</li>
                <li>
                  textAlign (String) : テキストの水平方向の配置 (デフォルト :
                  &quot;center&quot;)。
                </li>
                <li>
                  textBaseline (String) : テキストの垂直方向の配置 (デフォルト :
                  &quot;middle&quot;)。
                </li>
                <li>
                  background (String | Boolean) : 背景色 (デフォルト : false)。
                </li>
                <li>
                  side (String) : テキストの表示面 (デフォルト :
                  &quot;DoubleSide&quot;)。
                </li>
                <li>guide (Number) : ガイドラインの幅 (デフォルト : 0)。</li>
                <li>
                  guideColor (String) : ガイドラインの色 (デフォルト :
                  &quot;#ff0000&quot;)。
                </li>
                <li>
                  autoAdd (Boolean) : 自動でシーンに追加 (デフォルト : true)。
                </li>
              </ul>
            </div>
          </>
        }
      >
        <p>
          テキストを作成してシーンに追加します。
          <br />
          日本語のテキストも利用できます。
        </p>
      </ReferenceContent>

      <p>
        通常の Three.js の TextGeometry とは異なり、
        透明の平面に対してテキストを描画したテクスチャを貼り付けることで実現しています。
        <br />
        そのため、
        <Note>
          テキストが平面のサイズ (size) を超える場合はテキストが見切れます
        </Note>
        。
      </p>
      <p>
        テキストを描画したテクスチャについては{" "}
        <Link href="/reference/create/textTexture">create.textTexture</Link> を用いて作成しています。
      </p>
      <p>
        平面のサイズについては、ガイドラインの幅 (guide)
        に0より大きな値を指定することや、 背景色 (background)
        を指定することで確認できます。
        <br />
      </p>

      <h2>コードの例</h2>
      <h4>テキストの作成</h4>
      <Ex1
        className="border"
        style={{
          width: "240px",
          height: "240px",
        }}
      />
      <CodeBlock>
        {`const { camera, create, animate } = init()
camera.position.set(0, 0, 3)

const text = create.text("easy-three", {
  size: [3, 1]
})

animate(({ delta }) => {
  text.rotation.x += delta
  text.rotation.y += delta
})
`}
      </CodeBlock>

      <h4 className="mt-5">ガイドと背景色の設定</h4>
      <Ex2
        className="border"
        style={{
          width: "240px",
          height: "240px",
        }}
      />
      <CodeBlock>
        {`const { camera, create, animate } = init()
camera.position.set(0, 0, 3)

const text = create.text("easy-three", {
  size: [3, 1],
  guide: 4,
  background: "#66ff66"
})

animate(({ delta }) => {
  text.rotation.x += delta
  text.rotation.y += delta
})
`}
      </CodeBlock>
    </Container>
  );
}
