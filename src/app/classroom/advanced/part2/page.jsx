"use client";
import { EasyThreeBox, Note } from "@/components/BaseKit";
import CodeBlock from "@/components/CodeBlock";
import { init } from "@dist/easy-three";

export default function Page() {
  return (
    <div className="classroomPart">
      <h2>2. テクスチャの利用</h2>
      <p>
        このセクションでは、テクスチャを使った3Dオブジェクトの作成方法を学びます。
      </p>
      <h3>テクスチャ画像の用意</h3>
      <p>
        テクスチャとは、3Dオブジェクトに貼り付ける画像のことです。
        <br />
        背景画像と同じく、無料で入手するには、
        <a
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
      <p>
        ここでは、Poly Haven の
        <a
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
      <p>
        ダウンロードした画像は、
        プログラムのファイルと同じ場所に配置してください。
      </p>
      <p>
        Diffuse は、色の情報を持つ画像で、 いわゆる通常の画像です。
        <br />
        Normal は、法線マップと呼ばれる情報を持つ画像で、
        3Dオブジェクトの凹凸を表現するのに使います。
      </p>

      <h3>テクスチャの設定</h3>
      <p>
        テクスチャを読み込むには、
        <Note>
          <code>load.texture</code> を使います。
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
      <EasyThreeBox
        toggleControls
        effect={(r, controlsFlag) => {
          const { camera, create, animate, controls, load, destroy } = init(r);
          if (controlsFlag) controls.connect();
          camera.position.set(0, 1, 2);
          controls.autoRotate = true;
          create.ambientLight();
          create.directionalLight();
          // load.background(
          //   "/easy-three/texture/hdr/kloofendal_48d_partly_cloudy_puresky_1k.hdr"
          // );
          create.cube({
            option: {
              map: load.texture(
                "/easy-three/texture/img/coast_sand_rocks_02/coast_sand_rocks_02_diff_1k.jpg"
              ),
            },
          });
          animate();
          return () => {
            destroy();
          };
        }}
      />
      <p>
        実行すると、キューブにテクスチャが貼り付けられます。
        <br />
        ただ画像を貼り付けただけなので、表面のデコボコ感はありません。
      </p>
      <p>
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
      <EasyThreeBox
        toggleControls
        effect={(r, controlsFlag) => {
          const { camera, create, animate, controls, load, destroy } = init(r);
          if (controlsFlag) controls.connect();
          camera.position.set(0, 1, 2);
          controls.autoRotate = true;
          create.ambientLight();
          create.directionalLight();
          // load.background(
          //   "/easy-three/texture/hdr/kloofendal_48d_partly_cloudy_puresky_1k.hdr"
          // );
          create.cube({
            option: {
              map: load.texture(
                "/easy-three/texture/img/coast_sand_rocks_02/coast_sand_rocks_02_diff_1k.jpg"
              ),
              normalMap: load.texture(
                "/easy-three/texture/img/coast_sand_rocks_02/coast_sand_rocks_02_nor_gl_1k.jpg"
              ),
            },
          });
          animate();
          return () => {
            destroy();
          };
        }}
      />
      <p>
        法線マップがあるものとないものを並べてみると、 次のようになります。
        <br />
        左が法線マップなし、右が法線マップありです。
      </p>
      <EasyThreeBox
        toggleControls
        effect={(r, controlsFlag) => {
          const { camera, create, animate, controls, load, destroy } = init(r);
          if (controlsFlag) controls.connect();
          camera.position.set(0, 1, 2);
          //controls.autoRotate = true;
          create.ambientLight();
          create.directionalLight();
          load.background(
            "/easy-three/texture/hdr/kloofendal_48d_partly_cloudy_puresky_1k.hdr"
          );
          const texture = load.texture(
            "/easy-three/texture/img/coast_sand_rocks_02/coast_sand_rocks_02_diff_1k.jpg"
          );
          const cube = create.cube({
            position: [-1, 0, 0],
            option: {
              map: texture,
            },
          });
          const normalCube = create.cube({
            position: [1, 0, 0],
            option: {
              map: texture,
              normalMap: load.texture(
                "/easy-three/texture/img/coast_sand_rocks_02/coast_sand_rocks_02_nor_gl_1k.jpg"
              ),
            },
          });
          animate(({ time }) => {
            cube.rotation.x = time;
            cube.rotation.y = time;
            normalCube.rotation.x = time;
            normalCube.rotation.y = time;
          });
          return () => {
            destroy();
          };
        }}
      />
      <p>表面の質感のリアルさが全く違うことがわかります。</p>
      <p>
        このように、法線マップを使うことでよりリアルな3Dオブジェクトを作成することができますが、マップ画像の用意は場合によっては難しいことがあります。
        <br />
        そのような場合は、通常のテクスチャ画像をバンプマップとして使うことで、似たような効果を得ることができます。
      </p>
      <p>
        バンプマップとは、法線マップと同じように凹凸を表現する画像ですが、
        ピクセルの明るさを使って凹凸を表現します。
        <br />
        普通、白い部分が凸、黒い部分が凹となることが多いため、通常のテクスチャ画像を使うことができます。
      </p>
      <p>
        バンプマップを使う場合は、<code>bumpMap</code> を設定します。<br />
        また、凹凸の強さを設定するために、<code>bumpScale</code> を使います。
      </p>
      <p>
        同じ画像を2回読み込むのは効率が悪いので、
        <code>load.texture</code>{" "}
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
      <EasyThreeBox
        toggleControls
        effect={(r, controlsFlag) => {
          const { camera, create, animate, controls, load, destroy } = init(r);
          if (controlsFlag) controls.connect();
          camera.position.set(0, 1, 2);
          controls.autoRotate = true;
          create.ambientLight();
          create.directionalLight();
          // load.background(
          //   "/easy-three/texture/hdr/kloofendal_48d_partly_cloudy_puresky_1k.hdr"
          // );
          const texture = load.texture(
            "/easy-three/texture/img/coast_sand_rocks_02/coast_sand_rocks_02_diff_1k.jpg"
          );
          create.cube({
            option: {
              map: texture,
              bumpMap: texture,
              bumpScale: 3,
            },
          });
          animate();
          return () => {
            destroy();
          };
        }}
      />
      <p>
        法線マップの場合とバンプマップの場合を比較すると、
        次のようになります。<br />
        左が法線マップ、右がバンプマップです。
      </p>

      <EasyThreeBox
        toggleControls
        effect={(r, controlsFlag) => {
          const { camera, create, animate, controls, load, destroy } = init(r);
          if (controlsFlag) controls.connect();
          camera.position.set(0, 1, 2);
          //controls.autoRotate = true;
          create.ambientLight();
          create.directionalLight();
          load.background(
            "/easy-three/texture/hdr/kloofendal_48d_partly_cloudy_puresky_1k.hdr"
          );
          const texture = load.texture(
            "/easy-three/texture/img/coast_sand_rocks_02/coast_sand_rocks_02_diff_1k.jpg"
          );
          const bumpCube = create.cube({
            position: [1, 0, 0],
            option: {
              map: texture,
              bumpMap: texture,
              bumpScale: 3,
            },
          });
          const normalCube = create.cube({
            position: [-1, 0, 0],
            option: {
              map: texture,
              normalMap: load.texture(
                "/easy-three/texture/img/coast_sand_rocks_02/coast_sand_rocks_02_nor_gl_1k.jpg"
              ),
            },
          });
          animate(({ time }) => {
            bumpCube.rotation.x = time;
            bumpCube.rotation.y = time;
            normalCube.rotation.x = time;
            normalCube.rotation.y = time;
          });
          return () => {
            destroy();
          };
        }}
      />

      <p>
        バンプマップは法線マップよりも簡単に使える反面、
        凹凸の表現が荒いことがあります。
        <br />
        また、凹凸の強さを調整するために、<code>bumpScale</code> を設定する必要があります。
      </p>

      <p>
        このように、テクスチャを使うことで、3Dオブジェクトの表面の質感をリアルに表現することができます。
        <br />
        基本的には法線マップを使うことが望ましいですが、
        難しい場合はバンプマップを使うと良いでしょう。
      </p>
    </div>
  );
}
