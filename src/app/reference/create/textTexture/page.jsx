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

    create.ambientLight();
    create.directionalLight();

    const texture = create.textTexture("easy-three", {
      size: [300, 300],
      font: noto.style.fontFamily,
      background: "#66ff66"
    })

    const cube = create.cube({
      size: 1,
      position: [-1, 0, 0],
      option: {
        map: texture
      }
    })
    const sphere = create.sphere({
      size: 0.7,
      position: [1, 0, 0],
      option: {
        map: texture
      }
    })
    animate(({ delta }) => {
      cube.rotation.x += delta;
      cube.rotation.y += delta;
      sphere.rotation.x += delta;
      sphere.rotation.y += delta * 0.7;
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
    const { camera, create, animate, THREE, destroy } = init(ref.current);
    camera.position.set(0, 0, 2);

    create.ambientLight();
    create.directionalLight();

    const texture = create.textTexture("easy-three", {
      size: [300, 300],
      font: noto.style.fontFamily,
      guide: 8,
    });

    const cube = create.cube({
      size: 1,
      option: {
        transparent: true,
        map: texture,
        side: THREE.DoubleSide
      },
    });
    animate(({ delta }) => {
      cube.rotation.x += delta;
      cube.rotation.y += delta;
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
      <title>create.textTexture | easy-three</title>
      <h1>create.textTexture</h1>

      <ReferenceContent
        name="create.textTexture"
        args="text : String, props : Object"
        returnObject="Texture"
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
                <li>
                  size (Array) テクスチャのサイズ (デフォルト : [500, 500])。
                </li>
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
                <li>guide (Number) : ガイドラインの幅 (デフォルト : 0)。</li>
                <li>
                  guideColor (String) : ガイドラインの色 (デフォルト :
                  &quot;#ff0000&quot;)。
                </li>
              </ul>
            </div>
          </>
        }
      >
        <p>テキストを元にテクスチャを作成します。</p>
      </ReferenceContent>

      <p>
        <Note>
          テキストが平面のサイズ (size) を超える場合はテキストが見切れます
        </Note>
        。
      </p>
      <p>平面以外のオブジェクトにテキストを表示する場合に使用します。<br />
        単にテキストを表示したい場合は{" "}
        <Link href="/reference/create/text">create.text</Link>{" "}
        を使用してください。
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

create.ambientLight()
create.directionalLight()

const texture = create.textTexture("easy-three", {
  size: [300, 300],
  background: "#66ff66"
})

const cube = create.cube({
  size: 1,
  position: [-1, 0, 0],
  option: {
    map: texture
  }
})

const sphere = create.sphere({
  size: 0.7,
  position: [1, 0, 0],
  option: {
    map: texture
  }
})

animate(({ delta }) => {
  cube.rotation.x += delta
  cube.rotation.y += delta
  sphere.rotation.x += delta
  sphere.rotation.y += delta * 0.7
})
`}
      </CodeBlock>

      <h4 className="mt-5">ガイド、透過、表示面の設定</h4>
      <Ex2
        className="border"
        style={{
          width: "240px",
          height: "240px",
        }}
      />
      <CodeBlock>
        {`const { camera, create, THREE, animate } = init()
camera.position.set(0, 0, 2)

create.ambientLight()
create.directionalLight()

const texture = create.textTexture("easy-three", {
  size: [300, 300],
  guide: 8
})

const cube = create.cube({
  size: 1,
  option: {
    transparent: true,
    map: texture,
    side: THREE.DoubleSide
  }
})

animate(({ delta }) => {
  cube.rotation.x += delta
  cube.rotation.y += delta
})
`}
      </CodeBlock>
    </Container>
  );
}
