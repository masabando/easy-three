import Container from "@/components/Container";
import CodeBlock from "@/components/CodeBlock";
import T from "@/components/Lang";
import { Link, Note } from "@/components/BaseKit";
import { currentVersion } from "@/components/CurrentVersion";
import H1 from "@/components/H1";
import H2 from "@/components/H2";
import H3 from "@/components/H3";
import { Ex1 } from "./Codes";

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
            VR
            ボタンの追加、コントローラーモデルの表示、ハンドトラッキングモデルの表示、
            コントローラーのレイによるオブジェクト選択ができます。
          </>
        </T>
      </p>
      <p className="mt-4">
        <T>
          <>
            WebXR works only in supported browsers and devices. For example, use
            Meta Quest Browser or a WebXR-compatible desktop browser connected
            to a VR headset.
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
          <>WebXR requires a secure context. Make sure to use https.</>
          <>
            WebXR にはセキュアコンテキストが必要です。 https
            を使うようにしてください。
          </>
        </T>
      </div>

      <Ex1
        className="border mt-4"
        style={{
          width: "300px",
          height: "300px",
          position: "relative",
        }}
      />

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
            はじめて easy-three を使う場合は、Getting Started
            ページのテンプレートから 始めるのがおすすめです。テンプレートには
            three.js と easy-three を読み込むための importmap が入っています。
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
          <>When using CDN directly, use the same importmap style as below.</>
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
            <code>xr.setup()</code> を呼び出します。これでページに VR
            ボタンが追加され、 WebXR 用の描画が有効になります。
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
            カメラ操作系の機能を使わないでください。XR
            モードでは、ヘッドセットが カメラの位置と向きを管理します。
          </div>
        </T>
      </div>

      <H2 className="mt-20">
        <T>
          <>Play in VR</>
          <>VRで遊ぶ</>
        </T>
      </H2>
      <p>
        <T>
          <>
            To play in VR, click the VR button added to the page. Put on your VR
            headset and use the controllers to interact with the scene.
          </>
          <>
            VR で遊ぶには、ページに追加された VR
            ボタンをクリックしてください。VR
            ヘッドセットを装着し、コントローラーを使ってシーンとインタラクションします。
          </>
        </T>
      </p>
      <p className="mt-4">
        <T>
          <>
            <Note>WebXR requires HTTPS.</Note>
            <br />
            Recommended static hosting services include GitHub Pages, Vercel,
            and Netlify.
          </>
          <>
            <Note>WebXRを利用するには、https通信が必要</Note>です。<br />
            デプロイ先としては、GitHub Pages、Vercel、Netlifyなどの静的ホスティングサービスを使うのがおすすめです。
          </>
        </T>
      </p>
      <p className="mt-4">
        <T>
          <>
            When checking locally, <Note>it is recommended to use VSCode's Live Server extension in combination with port forwarding.</Note><br />
            The Live Server extension allows you to start a server with HTTP communication locally.<br />
            Then, open the terminal in VSCode from the menu "View" → "Terminal", and set the Live Server port (usually 5500) from "Port Forwarding" in the "Ports" tab to issue a URL.<br />
            By setting the display range to "Public", you can also access it from the browser of the VR headset.<br />
            After use, it is recommended to disable port forwarding.
          </>
          <>
            ローカルで確認する際には、<Note>VSCodeのLive Server拡張機能とポート転送を併用するのがおすすめ</Note>です。<br />
            Live Server拡張機能を使うと、ローカルで http 通信でサーバーを立ち上げることができます。<br />
            その後、VSCode のメニュー「表示」→「ターミナル」でターミナルを開き、
            「ポート」タブにある「ポートの転送」から Live Serverのポート (通常は 5500) を設定することで、
            URLが発行されます。<br />
            表示範囲を「公開」にすることで、VRヘッドセットのブラウザからもアクセスできるようになります。<br />
            なお、利用後は、ポート転送を解除することをおすすめします。
          </>
        </T>
      </p>

      <H2 className="mt-20">
        <T>
          <>When Not in Fullscreen</>
          <>全画面表示にしない場合</>
        </T>
      </H2>
      <p>
        <T>
          <>
            If the original (non-XR) rendering is not fullscreen, the container
            passed to <code>init()</code> must have{" "}
            <code>position: relative</code> for the VR button to display
            correctly.
          </>
          <>
            元の(XRモードではない)描画が全画面表示出ない場合、
            描画対象のコンテナ (initに渡す第1引数) が
            <code>position: relative</code>{" "}
            でないと、VRボタンが正しく表示されません。
          </>
        </T>
      </p>

      <H2 className="mt-20">
        <T>
          <>Initial Camera Position</>
          <>カメラの初期位置</>
        </T>
      </H2>
      <p>
        <T>
          <>
            The camera position set in <code>init()</code> is used only in
            non-XR mode. In XR mode, the camera position is controlled by the
            headset.
          </>
          <>
            <code>init()</code> で設定したカメラの位置は、XR
            モードではなく通常の描画時にのみ使われます。 XR
            モードでは、カメラの位置はヘッドセットが管理します。
          </>
        </T>
      </p>
      <p className="mt-4">
        <T>
          <>
            To change the initial camera position, put the <code>camera</code>{" "}
            returned from <code>init()</code> into a group, and change the
            position of that group. In XR mode, the position of the group is
            used as the initial camera position.
          </>
          <>
            カメラの初期位置を変更する場合は、
            <code>init()</code> の戻り値から取得した <code>camera</code> を
            グループに入れて、そのグループの位置を変更してください。 XR
            モードでは、グループの位置がカメラの初期位置として使われます。
            <br />
            ただし、ここで指定した初期位置はXRモードでの地面の高さになります。
            <br />
            つまり、XRモード中のユーザは、その目線の高さ分だけ高い位置で見ることになることに注意してください。
            たとえば、ユーザの目線の高さが 1.6m の場合、グループの位置が [0, 0,
            0] だと、実際のユーザの目線は [0, 1.6, 0] になります。
          </>
        </T>
      </p>
      <CodeBlock filename="main.js" language="javascript">
        {`// カメラを格納するグループを作成
const cameraGroup = create.group({
  position: [0, 0, 3],
})
// カメラをグループに追加
cameraGroup.add(camera);
`}
      </CodeBlock>

      <H2 className="mt-20">
        <T>
          <>Pick Objects With a Controller</>
          <>コントローラーでオブジェクトを選択する</>
        </T>
      </H2>
      <p>
        <T>
          <>
            Pass objects to <code>selectableObjects</code>. When an object is
            selected by the controller, the selection information is stored in{" "}
            <code>controller.userData.selected</code>. You can get the selected
            object with <code>controller.userData.selected[0].object</code>.
          </>
          <>
            <code>selectableObjects</code> に選択できるオブジェクトを渡します。
            コントローラーで選択されると、選択中の情報の配列が{" "}
            <code>controller.userData.selected</code> に入ります。
            <code>controller.userData.selected[0].object</code>{" "}
            で、選択中のオブジェクトを取得できます。
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

  const selected = rightController.userData.selected?.[0];
  if (selected) {
    selected.object.rotation.y += delta;
    selected.object.material.color.set(0xff3333);
  }
});`}
      </CodeBlock>

      <H2 className="mt-20">
        <T>
          <>Move Selected Objects</>
          <>選択したオブジェクトを移動する</>
        </T>
      </H2>
      <p>
        <T>
          <>
            The controller has no mousemove event. Instead, use the{" "}
            <code>getIntersections()</code> method of the controller to get
            information about objects that intersect with the controller ray.
          </>
          <>
            コントローラには、mousemove イベントを設定することができません。
            <br />
            代わりに、コントローラがもつ getIntersections()
            メソッドを使って、コントローラのレイと交差するオブジェクトの情報を取得してください。
          </>
        </T>
      </p>
      <CodeBlock>
        {`const cube = create.cube()

const { rightController } = xr.setup({
  selectableObjects: [cube],
});

animate(() => {
  if (rightController.userData.selected?.[0]) {
    const intersections = rightController.getIntersections()
    if (intersections.length > 0) {
      const p = intersections[0].point;
      const object = rightController.userData.selected[0].object;
      object.position.x = p.x;
      object.position.y = p.y;
    }
  }
})`}
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
                  <>
                    Shows the left hand model when hand tracking is available.
                  </>
                  <>
                    ハンドトラッキングが使える場合に左手のモデルを表示します。
                  </>
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
                  <>
                    ハンドトラッキングが使える場合に右手のモデルを表示します。
                  </>
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
                  <>
                    Sets the objects that can be selected by the controller ray.
                  </>
                  <>
                    コントローラーのレイで選択できるオブジェクトを指定します。
                  </>
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
            In React, call <code>init()</code> and <code>xr.setup()</code>{" "}
            inside <code>useEffect</code>. Return <code>destroy()</code> from
            the effect so the renderer is cleaned up when the component is
            removed.
          </>
          <>
            React では <code>useEffect</code> の中で <code>init()</code> と{" "}
            <code>xr.setup()</code>{" "}
            を呼び出します。コンポーネントが削除された時に renderer
            を片付けられるよう、effect の戻り値で <code>destroy()</code>
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

  return <div
           ref={ref}
           style={{
             width: "100%",
             height: "400px",
             position: "relative",
           }}
         />;
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
            sky、ocean、コントローラー選択を含む長めのサンプルは、xr
            のリファレンスページを 見てください。
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
