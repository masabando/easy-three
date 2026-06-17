import CodeBlock from "@/components/CodeBlock";
import ReferenceContent from "@/components/ReferenceContent";
import H1 from "@/components/H1";
import H2 from "@/components/H2";
import H3 from "@/components/H3";

export const metadata = {
  title: "init",
};

export default function Page() {
  return (
    <div>
      <H1>init</H1>
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
        <div className="flex flex-col gap-4">
          <p>初期化関数。</p>
          <p>
            指定されたターゲットに対して、シーン、カメラ、レンダラ、コントロールを初期化します。
            <br />
            ウィンドウサイズ変更時の自動リサイズに対応しています。
          </p>
          <p>戻り値は以下のプロパティを持つオブジェクトです。</p>
          <ul className="list-disc list-inside ml-4">
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
        </div>
      </ReferenceContent>
      <H2 className="mt-14">コードの例</H2>
      <H3>bodyに対して描画する</H3>
      引数に何も指定しない場合、document.bodyに対して描画します。
      <br />
      画面全体を描画対象にする場合に利用します。
      <CodeBlock>
        {`const { camera, create, animate } = init();
`}
      </CodeBlock>

      <H3 className="mt-10">特定のDOMに描画する</H3>
      <p>引数で描画対象のDOMセレクタ、もしくはDOM要素を指定することができます。</p>
      <p>
        文字列(DOMセレクタ)を指定した場合、内部で{" "}
        document.querySelector() を使用してDOM要素を取得します。
      </p>
      <CodeBlock>
        {`const { camera, create, animate } = init("#target");
`}
      </CodeBlock>
    </div>
  );
}
