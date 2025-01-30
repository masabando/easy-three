"use client";
import Container from "react-bootstrap/Container";
import CodeBlock from "@/components/CodeBlock";
import ReferenceContent from "@/components/ReferenceContent";

export default function Page() {
  return (
    <Container className="pt-4 pb-5">
      <title>init | easy-three</title>
      <h1 className="mb-5">init</h1>
      <ReferenceContent
        name="init"
        args="target : String | DOMElement"
        returnObject="Object"
        argsInfo={
          <div>
            <span>target</span>
            (optional) - 描画対象のDOMセレクタ、もしくはDOM要素 (デフォルト :
            document.body)。
          </div>
        }
      >
        <p>初期化関数。</p>
        <p>
          指定されたターゲットに対して、シーン、カメラ、レンダラ、コントロールを初期化します。
          <br />
          ウィンドウサイズ変更時の自動リサイズに対応しています。
        </p>
        <p>戻り値は以下のプロパティを持つオブジェクトです。</p>
        <ul>
          <li>Default</li>
          <li>scene</li>
          <li>camera</li>
          <li>renderer</li>
          <li>controls</li>
          <li>create</li>
          <li>load</li>
          <li>helper</li>
          <li>event</li>
          <li>animate</li>
          <li>THREE</li>
          <li>color</li>
          <li>postprocessing</li>
          <li>noToneMapping</li>
          <li>destroy</li>
        </ul>
      </ReferenceContent>
      <h2>コードの例</h2>
      <h4>bodyに対して描画する</h4>
      引数に何も指定しない場合、document.bodyに対して描画します。
      <br />
      画面全体を描画対象にする場合に利用します。
      <CodeBlock>
        {`const { camera, create, animate } = init();
`}
      </CodeBlock>

      <h4 className="mt-5">特定のDOMに描画する</h4>
      <p>引数で描画対象のDOMセレクタ、もしくはDOM要素を指定することができます。</p>
      <p>
        文字列(DOMセレクタ)を指定した場合、内部で{" "}
        document.querySelector() を使用してDOM要素を取得します。
      </p>
      <CodeBlock>
        {`const { camera, create, animate } = init("#target");
`}
      </CodeBlock>
    </Container>
  );
}
