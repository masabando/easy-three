"use client";
import { EasyThreeBox, Note } from "@/components/BaseKit";
import CodeBlock from "@/components/CodeBlock";
import { init } from "@dist/easy-three";

export default function Page() {
  return (
    <div className="classroomPart">
      <h2>3. GLTFモデルの利用</h2>
      <p>
        このセクションでは、GLTF形式の3Dモデルを読み込んで表示する方法を学びます。
      </p>
      <h3>GLTFモデルの用意</h3>
      <p>
        GLTF形式の3Dモデルを無料で入手するには、テクスチャ画像と同じく、
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
        GLTFモデルは、Poly Haven では Models として配布されています。
      </p>
      <p>
        ここでは、Poly Haven の
        <a
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
      <p>
        ダウンロードしたZipファイルを解答するとフォルダが出てきます。
        <br />
        中にはモデルファイル以外にも、テクスチャ画像などが入っています(モデルによっては入っていない場合もあります)。
        <br />
        これらのファイルは同じ場所になければならないので、
        今回は、モデルファイルが入っている「フォルダ」をプログラムのファイルと同じ場所に配置してください。
        <br />
        フォルダ名は「didelta_spinosa」としましょう。
      </p>

      <h3>GLTFモデルの表示</h3>
      <p>
        GLTFモデルを読み込むには、
        <code>load.gltf(モデルファイルのパス)</code> を使います。
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
      <EasyThreeBox
        toggleControls
        effect={(r) => {
          const { camera, create, animate, controls, load, destroy } = init(r);
          camera.position.set(0, 1, 2);
          controls.autoRotate = true;
          create.ambientLight();
          create.directionalLight();
          // load.background(
          //   "/easy-three/texture/hdr/kloofendal_48d_partly_cloudy_puresky_1k.hdr"
          // );
          load.gltf(
            "/easy-three/model/didelta_spinosa/didelta_spinosa_1k.gltf"
          );
          animate();
          return {
            destroy: () => {
              destroy();
            },
            controls: (f) => {
              if (f) controls.connect();
              else controls.disconnect();
            },
          };
        }}
      />
      <p>
        他のオブジェクトを作るときと同じように、
        サイズや位置を調整することができます。
      </p>
      <p>
        これまでに学んだ「背景」「環境マップ」「テクスチャ」などと併用すると、
        よりリアルな3Dシーンを作成することができます。
        <br />
        基本的にGLTFなどの3Dモデルは表示が重いため、
        シーンに表示するオブジェクト数には注意が必要です。
      </p>
      <EasyThreeBox
        toggleControls
        effect={(r) => {
          const { camera, create, animate, controls, load, destroy } = init(r);
          camera.position.set(0, 1, 2);
          controls.autoRotate = true;
          create.ambientLight();
          create.directionalLight();
          load.background(
            "/easy-three/texture/hdr/kloofendal_48d_partly_cloudy_puresky_1k.hdr"
          );
          load.gltf(
            "/easy-three/model/didelta_spinosa/didelta_spinosa_1k.gltf"
          );

          create.plane({
            size: 10,
            rotation: [-Math.PI / 2, 0, 0],
            option: {
              map: load.texture(
                "/easy-three/texture/img/coast_sand_rocks_02/coast_sand_rocks_02_diff_1k.jpg",
                { repeat: [10, 10] }
              ),
              normalMap: load.texture(
                "/easy-three/texture/img/coast_sand_rocks_02/coast_sand_rocks_02_nor_gl_1k.jpg",
                { repeat: [10, 10] }
              ),
            },
          });
          animate();
          return {
            destroy: () => {
              destroy();
            },
            controls: (f) => {
              if (f) controls.connect();
              else controls.disconnect();
            },
          };
        }}
      />
    </div>
  );
}
