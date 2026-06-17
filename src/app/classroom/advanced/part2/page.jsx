import { Code, Note } from "@/components/BaseKit";
import CodeBlock from "@/components/CodeBlock";
import H1 from "@/components/H1";
import H2 from "@/components/H2";
import { Ex1, Ex2, Ex3, Ex4, Ex5 } from "./Codes";

export const metadata = {
  title: "テクスチャの利用",
};

export default function Page() {
  return (
    <div>
      <H1>2. テクスチャの利用</H1>
      <p>
        このセクションでは、テクスチャを使った3Dオブジェクトの作成方法を学びます。
      </p>
      <H2 className="mt-14">テクスチャ画像の用意</H2>
      <p>
        テクスチャとは、3Dオブジェクトに貼り付ける画像のことです。
        <br />
        背景画像と同じく、無料で入手するには、
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
        テクスチャ画像は、Poly Haven では Textures として配布されています。
      </p>
      <p className="mt-4">
        ここでは、Poly Haven の
        <a
          className="text-blue-600 underline"
          href="https://polyhaven.com/a/coast_sand_rocks_02"
          target="_blank"
          rel="noopener noreferrer"
        >
          Coast Sand Rocks 02
        </a>
        を利用してみましょう。
        <br />
        ページ右上のところで、「1K」の解像度を選択し、
        その右の形式の選択では「ZIP」を選んでおきます。
        <br />
        ダウンロードボタンの右のメニューから
        「Diffuse」と「Normal(GL)」のJPG形式を選択してダウンロードします。
      </p>
      <p className="mt-4">
        ダウンロードした画像は、
        プログラムのファイルと同じ場所に配置してください。
      </p>
      <p className="mt-4">
        Diffuse は、色の情報を持つ画像で、 いわゆる通常の画像です。
        <br />
        Normal は、法線マップと呼ばれる情報を持つ画像で、
        3Dオブジェクトの凹凸を表現するのに使います。
      </p>

      <H2 className="mt-14">テクスチャの設定</H2>
      <p>
        テクスチャを読み込むには、
        <Note>
          <Code>load.texture</Code> を使います。
        </Note>
      </p>
      <CodeBlock>{`load.texture(画像のパス)`}</CodeBlock>
      <p>今の場合、次のようにするとキューブにテクスチャが設定されます。</p>
      <CodeBlock filename="index.html">
        {`const { camera, create, animate, controls } = init()

controls.connect()
camera.position.set(0, 1, 2)
controls.autoRotate = true
create.ambientLight()
create.directionalLight()

create.cube({
  option: {
    map: load.texture("./coast_sand_rocks_02_diff_1k.jpg"),
  }
})

animate()
`}
      </CodeBlock>
      <Ex1 />
      <p>
        実行すると、キューブにテクスチャが貼り付けられます。
        <br />
        ただ画像を貼り付けただけなので、表面のデコボコ感はありません。
      </p>
      <p className="mt-4">
        法線マップを使うことで、3Dオブジェクトの凹凸を表現することができます。
        <br />
        その場合は、次のようにします。
      </p>
      <CodeBlock filename="index.html">
        {`const { camera, create, animate, controls } = init()

controls.connect()
camera.position.set(0, 1, 2)
controls.autoRotate = true
create.ambientLight()
create.directionalLight()

create.cube({
  option: {
    map: load.texture("./coast_sand_rocks_02_diff_1k.jpg"),
    normalMap: load.texture("./coast_sand_rocks_02_nor_gl_1k.jpg"),
  }
})

animate()
`}
      </CodeBlock>
      <Ex2 />

      <p>
        法線マップがあるものとないものを並べてみると、 次のようになります。
        <br />
        左が法線マップなし、右が法線マップありです。
      </p>

      <Ex3 />

      <p className="mt-4">表面の質感のリアルさが全く違うことがわかります。</p>
      <p className="mt-4">
        このように、法線マップを使うことでよりリアルな3Dオブジェクトを作成することができますが、マップ画像の用意は場合によっては難しいことがあります。
        <br />
        そのような場合は、通常のテクスチャ画像をバンプマップとして使うことで、似たような効果を得ることができます。
      </p>
      <p className="mt-4">
        バンプマップとは、法線マップと同じように凹凸を表現する画像ですが、
        ピクセルの明るさを使って凹凸を表現します。
        <br />
        普通、白い部分が凸、黒い部分が凹となることが多いため、通常のテクスチャ画像を使うことができます。
      </p>
      <p className="mt-4">
        バンプマップを使う場合は、<Code>bumpMap</Code> を設定します。<br />
        また、凹凸の強さを設定するために、<Code>bumpScale</Code> を使います。
      </p>
      <p className="mt-4">
        同じ画像を2回読み込むのは効率が悪いので、
        <Code>load.texture</Code>{" "}
        で読み込んだテクスチャを変数に保存して使いましょう。
      </p>
      <CodeBlock filename="index.html">
        {`const { camera, create, animate, controls } = init()

controls.connect()
camera.position.set(0, 1, 2)
controls.autoRotate = true
create.ambientLight()
create.directionalLight()

const texture = load.texture("./coast_sand_rocks_02_diff_1k.jpg")
create.cube({
  option: {
    map: texture,
    bumpMap: texture,
    bumpScale: 3,
  }
})

animate()
`}
      </CodeBlock>
      <Ex4 />

      <p>
        法線マップの場合とバンプマップの場合を比較すると、
        次のようになります。<br />
        左が法線マップ、右がバンプマップです。
      </p>

      <Ex5 />


      <p>
        バンプマップは法線マップよりも簡単に使える反面、
        凹凸の表現が荒いことがあります。
        <br />
        また、凹凸の強さを調整するために、<Code>bumpScale</Code> を設定する必要があります。
      </p>

      <p className="mt-4">
        1つのオブジェクトに対して、1つのテクスチャを繰り返し貼ることもできます。
      </p>
      <CodeBlock>
        {`create.cube({
  option: {
    map: load.texture("./coast_sand_rocks_02_diff_1k.jpg", {
      repeat: [2, 3],
    }),
  }
})`}
      </CodeBlock>
      <p>
        このようにすると、テクスチャが横に2回、縦に3回繰り返し貼られます。
      </p>

      <p className="mt-4">
        テクスチャを使うことで、3Dオブジェクトの表面の質感をリアルに表現することができます。
        <br />
        基本的には法線マップを使うことが望ましいですが、
        難しい場合はバンプマップを使うと良いでしょう。
      </p>
    </div>
  );
}
