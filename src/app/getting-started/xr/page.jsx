import Container from "@/components/Container";
import CodeBlock from "@/components/CodeBlock";
import T from "@/components/Lang";
import { Link } from "@/components/BaseKit";
import { currentVersion } from "@/components/CurrentVersion";
import H1 from "@/components/H1";
import H2 from "@/components/H2";
import H3 from "@/components/H3";

export const metadata = {
  title: "WebXR Support",
  description:
    "easy-threeのWebXR対応について説明します。",
};

export default function Page() {
  return (
    <Container>
      <H1>WebXR Support</H1>

      <H2 className="mt-12">
        <T>
          <>What You Can Do</>
          <>できること</>
        </T>
      </H2>
      <p>
        <T>
          <>
            easy-three provides a small wrapper for WebXR.
            <br />
            You can add a VR button, enable controller models, enable hand
            tracking models, and pick objects with a controller ray.
          </>
          <>
            easy-three では WebXR を扱うための小さな仕組みを用意しています。
            <br />
            VR ボタンの追加、コントローラーモデルの表示、ハンドトラッキングモデルの表示、
            コントローラーのレイによるオブジェクト選択ができます。
          </>
        </T>
      </p>
      <p className="mt-4">
        <T>
          <>
            WebXR works only in supported browsers and devices. For example, use
            Meta Quest Browser or a WebXR-compatible desktop browser connected to
            a VR headset.
          </>
          <>
            WebXR は対応しているブラウザとデバイスでのみ動作します。たとえば
            Meta Quest Browser や、VR ヘッドセットを接続した WebXR 対応の
            デスクトップブラウザで確認してください。
          </>
        </T>
      </p>

      <div className="alert alert-info alert-soft mt-6">
        <T>
          <>
            WebXR requires a secure context. Publish the page with HTTPS, or use
            localhost while developing.
          </>
          <>
            WebXR にはセキュアコンテキストが必要です。公開時は HTTPS、開発中は
            localhost で表示してください。
          </>
        </T>
      </div>

      <H2 className="mt-20">
        <T>
          <>Start From the Template</>
          <>テンプレートから始める</>
        </T>
      </H2>
      <p>
        <T>
          <>
            If you are new to easy-three, start from the template on the Getting
            Started page. The template already includes the importmap needed to
            load three.js and easy-three.
          </>
          <>
            はじめて easy-three を使う場合は、Getting Started ページのテンプレートから
            始めるのがおすすめです。テンプレートには three.js と easy-three を読み込むための
            importmap が入っています。
          </>
        </T>
      </p>
      <div className="my-3">
        <Link className="btn btn-primary" href="/getting-started/">
          <T>
            <>Open Getting Started</>
            <>Getting Started を開く</>
          </T>
        </Link>
      </div>
      <p>
        <T>
          <>
            When using CDN directly, use the same importmap style as below.
          </>
          <>CDN から直接使う場合は、下記のように importmap を設定します。</>
        </T>
      </p>
      <CodeBlock filename="index.html" language="javascript">
        {`<script type="importmap">
  {
    "imports": {
      "three": "https://cdn.jsdelivr.net/npm/three@0.185.1/build/three.module.js",
      "three/addons/": "https://cdn.jsdelivr.net/npm/three@0.185.1/examples/jsm/",
      "@pixiv/three-vrm": "https://cdn.jsdelivr.net/npm/@pixiv/three-vrm@3/lib/three-vrm.module.min.js",
      "@masabando/easy-three": "https://cdn.jsdelivr.net/gh/masabando/easy-three@${currentVersion}/dist/easy-three.js"
    }
  }
</script>`}
      </CodeBlock>

      <H2 className="mt-20">
        <T>
          <>Minimum VR Scene</>
          <>最小構成の VR シーン</>
        </T>
      </H2>
      <p>
        <T>
          <>
            Get <code>xr</code> from <code>init()</code>, then call{" "}
            <code>xr.setup()</code>. This adds the VR button to the page and
            enables WebXR rendering.
          </>
          <>
            <code>init()</code> の戻り値から <code>xr</code> を取得し、
            <code>xr.setup()</code> を呼び出します。これでページに VR ボタンが追加され、
            WebXR 用の描画が有効になります。
          </>
        </T>
      </p>
      <CodeBlock filename="main.js" language="javascript">
        {`import { init } from "@masabando/easy-three";

const { camera, create, animate, xr } = init();

camera.position.set(0, 1.6, 3);
create.ambientLight();
create.directionalLight();
create.cube({
  position: [0, 1.6, -2],
});

xr.setup();

animate();`}
      </CodeBlock>

      <div className="alert alert-warning alert-soft mt-6">
        <T>
          <div>
            Do not use camera-control helpers such as <code>controls</code> or{" "}
            <code>fpv</code> after entering XR. In XR mode, the headset controls
            the camera position and rotation.
          </div>
          <div>
            XR に入った後は、<code>controls</code> や <code>fpv</code> のような
            カメラ操作系の機能を使わないでください。XR モードでは、ヘッドセットが
            カメラの位置と向きを管理します。
          </div>
        </T>
      </div>

      <H2 className="mt-20">
        <T>
          <>Pick Objects With a Controller</>
          <>コントローラーでオブジェクトを選択する</>
        </T>
      </H2>
      <p>
        <T>
          <>
            Pass objects to <code>selectableObjects</code>. When a controller
            selects one of those objects, easy-three stores it in{" "}
            <code>controller.userData.selected</code>.
          </>
          <>
            <code>selectableObjects</code> に選択できるオブジェクトを渡します。
            コントローラーで選択されると、選択中のオブジェクトが{" "}
            <code>controller.userData.selected</code> に入ります。
          </>
        </T>
      </p>
      <CodeBlock filename="main.js" language="javascript">
        {`const { create, animate, xr } = init();

create.ambientLight();
create.directionalLight();

const cube1 = create.cube({
  position: [-0.7, 1.5, -2],
});
const cube2 = create.cube({
  position: [0.7, 1.5, -2],
});

const { rightController } = xr.setup({
  selectableObjects: [cube1, cube2],
});

animate(({ delta }) => {
  cube1.material.color.set(0x3366ff);
  cube2.material.color.set(0x3366ff);

  const selected = rightController.userData.selected;
  if (selected) {
    selected.rotation.y += delta;
    selected.material.color.set(0xff3333);
  }
});`}
      </CodeBlock>

      <H3 className="mt-12">
        <T>
          <>setup Options</>
          <>setup のオプション</>
        </T>
      </H3>
      <div className="overflow-x-auto my-4">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>Option</th>
              <th>Default</th>
              <th>
                <T>
                  <>Description</>
                  <>説明</>
                </T>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <code>leftController</code>
              </td>
              <td>
                <code>true</code>
              </td>
              <td>
                <T>
                  <>Shows the left controller model.</>
                  <>左コントローラーのモデルを表示します。</>
                </T>
              </td>
            </tr>
            <tr>
              <td>
                <code>rightController</code>
              </td>
              <td>
                <code>true</code>
              </td>
              <td>
                <T>
                  <>Shows the right controller model.</>
                  <>右コントローラーのモデルを表示します。</>
                </T>
              </td>
            </tr>
            <tr>
              <td>
                <code>leftHand</code>
              </td>
              <td>
                <code>true</code>
              </td>
              <td>
                <T>
                  <>Shows the left hand model when hand tracking is available.</>
                  <>ハンドトラッキングが使える場合に左手のモデルを表示します。</>
                </T>
              </td>
            </tr>
            <tr>
              <td>
                <code>rightHand</code>
              </td>
              <td>
                <code>true</code>
              </td>
              <td>
                <T>
                  <>
                    Shows the right hand model when hand tracking is available.
                  </>
                  <>ハンドトラッキングが使える場合に右手のモデルを表示します。</>
                </T>
              </td>
            </tr>
            <tr>
              <td>
                <code>buttonTarget</code>
              </td>
              <td>
                <code>domElement</code>
              </td>
              <td>
                <T>
                  <>Sets where the VR button is appended.</>
                  <>VR ボタンを追加する場所を指定します。</>
                </T>
              </td>
            </tr>
            <tr>
              <td>
                <code>selectableObjects</code>
              </td>
              <td>
                <code>[]</code>
              </td>
              <td>
                <T>
                  <>Sets the objects that can be selected by the controller ray.</>
                  <>コントローラーのレイで選択できるオブジェクトを指定します。</>
                </T>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <H2 className="mt-20">
        <T>
          <>Using With React</>
          <>React で使う</>
        </T>
      </H2>
      <p>
        <T>
          <>
            In React, call <code>init()</code> and <code>xr.setup()</code> inside{" "}
            <code>useEffect</code>. Return <code>destroy()</code> from the effect
            so the renderer is cleaned up when the component is removed.
          </>
          <>
            React では <code>useEffect</code> の中で <code>init()</code> と{" "}
            <code>xr.setup()</code> を呼び出します。コンポーネントが削除された時に
            renderer を片付けられるよう、effect の戻り値で <code>destroy()</code>
            を呼び出してください。
          </>
        </T>
      </p>
      <CodeBlock filename="MyXRScene.jsx" language="jsx">
        {`import { init } from "@masabando/easy-three";
import { useEffect, useRef } from "react";

export function MyXRScene() {
  const ref = useRef();

  useEffect(() => {
    const { camera, create, animate, xr, destroy } = init(ref.current);

    camera.position.set(0, 1.6, 3);
    create.ambientLight();
    create.directionalLight();
    create.cube({
      position: [0, 1.6, -2],
    });

    xr.setup();
    animate();

    return () => {
      destroy();
    };
  }, []);

  return <div ref={ref} style={{ width: "100%", height: "400px" }} />;
}`}
      </CodeBlock>

      <H2 className="mt-20">
        <T>
          <>More Details</>
          <>詳しい使い方</>
        </T>
      </H2>
      <p>
        <T>
          <>
            For a longer sample using sky, ocean, and controller selection, see
            the xr reference page.
          </>
          <>
            sky、ocean、コントローラー選択を含む長めのサンプルは、xr のリファレンスページを
            見てください。
          </>
        </T>
      </p>
      <div className="my-3">
        <Link className="btn btn-outline" href="/reference/base/xr/">
          <T>
            <>Open xr Reference</>
            <>xr リファレンスを開く</>
          </T>
        </Link>
      </div>
    </Container>
  );
}
