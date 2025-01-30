"use client";
import Container from "react-bootstrap/Container";
import CodeBlock from "@/components/CodeBlock";
import { Link, Note } from "@/components/BaseKit";

export default function Page() {
  return (
    <Container className="pt-4 pb-5">
      <title>Default | easy-three</title>
      <h1 className="mb-5">Default</h1>
      <p>
        初期値を定義したオブジェクトです。
        <br />
        Default
        の各要素の値を変更することで、デフォルトの設定を変更することができます。
      </p>
      <p>Default オブジェクトは以下のプロパティを持ちます。</p>
      <ul>
        <li>
          material (String) : マテリアルタイプ (デフォルト : "Physical")。
        </li>
        <li>color (String | Hex) : 背景色 (デフォルト : 0x1155ff)。</li>
        <li>
          texture (Object) : テクスチャの設定
          <ul>
            <li>
              wrapping (String) : テクスチャのラッピング (デフォルト :
              "Repeat")。
            </li>
          </ul>
        </li>
        <li>
          event (Object) : イベントの設定
          <ul>
            <li>type (String) : イベントのタイプ (デフォルト : "once")。</li>
            <li>
              keyTrigger (RegExp) : キーイベントのトリガー (デフォルト :
              /^[A-Za-z]$/ )。
            </li>
          </ul>
        </li>
        <li>
          layer (Object) : レイヤーの設定
          <ul>
            <li>
              bloom (Number) :{" "}
              <Link href="/reference/postprocessing/selectedBloom">
                postprocessing.selectedBloom
              </Link>{" "}
              がブルームエフェクトに使用するレイヤー番号 (デフォルト : 999)。
            </li>
          </ul>
        </li>
        <li>
          shader (Object) : シェーダーの設定
          <ul>
            <li>
              vertexShader (String) : 頂点シェーダーのコード (デフォルト :
              下記参照)。
              <CodeBlock>
                {`\`varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}
\``}
              </CodeBlock>
            </li>
            <li>
              fragmentShader (String) : フラグメントシェーダーのコード
              (デフォルト : 下記参照)。
              <CodeBlock>
                {`\`uniform sampler2D baseTexture;
uniform sampler2D bloomTexture;
varying vec2 vUv;
void main() {
  gl_FragColor = ( texture2D( baseTexture, vUv ) + vec4( 1.0 ) * texture2D( bloomTexture, vUv ) );
}
\``}
              </CodeBlock>
            </li>
          </ul>
        </li>
      </ul>

      <h2>コードの例</h2>
      <h4>デフォルトのマテリアルを変更する</h4>
      <p>
        material には、マテリアルの種類を文字列で指定します。
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
      <CodeBlock>
        {`const { camera, create, animate, Default } = init()

Default.material = "Basic";

...
`}
      </CodeBlock>
    </Container>
  );
}
