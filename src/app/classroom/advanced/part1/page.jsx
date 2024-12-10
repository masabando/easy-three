"use client";
import { EasyThreeBox, Note } from "@/components/BaseKit";
import CodeBlock from "@/components/CodeBlock";
import { init } from "@dist/easy-three";

export default function Page() {
  return (
    <div className="classroomPart">
      <h2>1. 背景画像の利用と環境マップ</h2>
      <p>
        このセクションでは、背景画像を利用する方法と、環境マップを使ったリアルな質感表現を学びます。
      </p>
      <h3>背景画像の用意</h3>
      <p>
        3Dの背景画像は、空間全体を覆うように配置されます。
        <br />
        そのため、通常に撮影された写真ではなく、全天球画像という特殊な撮影をした写真(または任意の画像)を利用します。
      </p>
      <p>
        このような画像を無料で入手するには、
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
        Poly Haven
        では、商用利用も可能で著作権フリーな高品質な全天球画像を無料でダウンロードできます。
        <br />
        全天球画像は、Poly Haven では HDRIs として配布されています。
      </p>
      <p>
        背景画像に限ったことではありませんが、 もしあなたが作ったものを
        <Note>Web上に公開する場合は、 著作権に十分注意</Note>してください。
        <br />
        easy-three で作った3DはWebページとして公開することができますが、
        <Note>背景画像などの素材については、再配布していることになる</Note>
        ので注意が必要です。
      </p>
      <p>
        ここでは、Poly Haven の
        <a
          href="https://polyhaven.com/a/kloofendal_48d_partly_cloudy_puresky"
          target="_blank"
          rel="noopener noreferrer"
        >
          Kloofendal 48d Partly Cloudy (Pure Sky)
        </a>
        を利用してみましょう。
        <br />
        ページ右上のところで、「2K」や「4K」などの解像度を選択し、HDR形式でダウンロードします。
        <br />
        「2K」よりも「4K」の方が画質が良いですが、ファイルサイズも大きくなります。
      </p>
      <p>
        ダウンロードした画像は、
        プログラムのファイルと同じ場所に配置してください。
      </p>

      <h3>背景と環境マップの設定</h3>
      <p>
        easy-three では、背景の設定と環境マップの設定が同時にできます。<br />
        (環境マップについては、後述します。)
        <br />
        設定するには、以下のようにします。
      </p>
      <CodeBlock>{`load.background(画像のパス)`}</CodeBlock>
      <p>
        今の場合、次のようにすると背景画像と環境マップが設定されます。
      </p>
      <CodeBlock filename="index.html">
        {`const { camera, create, animate, controls } = init()

controls.connect()
camera.position.set(0, -1, 2)
controls.autoRotate = true
create.ambientLight()
create.directionalLight()

load.background("./kloofendal_48d_partly_cloudy_puresky_1k.hdr")
create.cube({
  option: {
    color: 0x99ff99,
    roughness: 0.1,
    metalness: 0.7,
  }
})

animate()
`}
      </CodeBlock>
      <EasyThreeBox
        toggleControls
        effect={(r) => {
          const { camera, create, animate, controls, load, destroy } = init(r);
          camera.position.set(0, -1, 2);
          controls.autoRotate = true;
          create.ambientLight();
          create.directionalLight();
          load.background(
            "/easy-three/texture/hdr/kloofendal_48d_partly_cloudy_puresky_1k.hdr"
          );
          create.cube({
            option: {
              color: 0x99ff99,
              roughness: 0.1,
              metalness: 0.7,
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
      <p>
        実行すると、背景画像が表示され、キューブの表面に背景画像が反映されていることがわかります。<br />
        これが環境マップの効果です。
      </p>
      <p>
        環境マップとは周囲の風景が反射されたような質感を表現するものなので、
        キューブの粗さが高かったり、金属感が低いと効果がわかりにくくなります。
      </p>

      <p>
        背景画像や環境マップは、
        3Dの世界をよりリアルに見せるために重要な要素です。<br />
        積極的に活用すると良いでしょう。
      </p>


    </div>
  );
}
