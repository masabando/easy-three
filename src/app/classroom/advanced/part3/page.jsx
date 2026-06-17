import { Code } from "@/components/BaseKit";
import CodeBlock from "@/components/CodeBlock";
import H1 from "@/components/H1";
import H2 from "@/components/H2";
import { Ex1, Ex2 } from "./Codes";

export const metadata = {
  title: "GLTFモデルの利用",
};

export default function Page() {
  return (
    <div>
      <H1>3. GLTFモデルの利用</H1>
      <p>
        このセクションでは、GLTF形式の3Dモデルを読み込んで表示する方法を学びます。
      </p>
      <H2 className="mt-14">GLTFモデルの用意</H2>
      <p>
        GLTF形式の3Dモデルを無料で入手するには、テクスチャ画像と同じく、
        <a
          className="text-blue-600 underline"
          href="https://polyhaven.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          {" "}
          Poly Haven
        </a>{" "}
        のようなサイトを利用すると便利です。
        <br />
        GLTFモデルは、Poly Haven では Models として配布されています。
      </p>
      <p className="mt-4">
        ここでは、Poly Haven の
        <a
          className="text-blue-600 underline"
          href="https://polyhaven.com/a/didelta_spinosa"
          target="_blank"
          rel="noopener noreferrer"
        >
          Didelta Spinosa
        </a>
        を利用してみましょう。
        <br />
        ページ右上のところで、「1K」の解像度を選択し、
        その右の形式の選択では「GLTF」を選んでダウンロードします。
      </p>
      <p className="mt-4">
        ダウンロードしたZipファイルを解答するとフォルダが出てきます。
        <br />
        中にはモデルファイル以外にも、テクスチャ画像などが入っています(モデルによっては入っていない場合もあります)。
        <br />
        これらのファイルは同じ場所になければならないので、
        今回は、モデルファイルが入っている「フォルダ」をプログラムのファイルと同じ場所に配置してください。
        <br />
        フォルダ名は「didelta_spinosa」としましょう。
      </p>

      <H2 className="mt-14">GLTFモデルの表示</H2>
      <p>
        GLTFモデルを読み込むには、
        <Code>load.gltf(モデルファイルのパス)</Code> を使います。
      </p>
      <CodeBlock>{`load.gltf(GLTFモデルのパス)`}</CodeBlock>
      <p>今の場合、次のようにするとGLTFモデルが表示されます。</p>
      <CodeBlock filename="index.html">
        {`const { camera, create, animate, controls } = init()

controls.connect()
camera.position.set(0, 1, 2)
controls.autoRotate = true
create.ambientLight()
create.directionalLight()

load.gltf("./didelta_spinosa/didelta_spinosa_1k.gltf")

animate()
`}
      </CodeBlock>
      <Ex1 />

      <p>
        他のオブジェクトを作るときと同じように、
        サイズや位置を調整することができます。
      </p>
      <p className="mt-4">
        これまでに学んだ「背景」「環境マップ」「テクスチャ」などと併用すると、
        よりリアルな3Dシーンを作成することができます。
        <br />
        基本的にGLTFなどの3Dモデルは表示が重いため、
        シーンに表示するオブジェクト数には注意が必要です。
      </p>
      <Ex2 />

    </div>
  );
}
