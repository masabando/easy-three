import CodeBlock from "@/components/CodeBlock";
import H1 from "@/components/H1";
import H2 from "@/components/H2";
import H3 from "@/components/H3";
import { Ex1 } from "./Codes";

export const metadata = {
  title: "xr",
};

export default function Page() {
  return (
    <div>
      <H1>xr</H1>

      <p>Web XR を利用するための仕組みを提供します。</p>

      <H2 className="mt-14">使用方法</H2>
      <p>
        まず、<code>init()</code> の戻り値から xr を取得します。
      </p>
      <CodeBlock>{`const { create, camera, animate, xr } = init();`}</CodeBlock>
      <p className="mt-4">
        その後、<code>setup()</code> を呼び出すことで有効化されます。
      </p>
      <p className="mt-4">
        <code>setup()</code>{" "}
        の引数で、コントローラーやハンドの有効化、ボタンの設置先などを指定することができます。
      </p>
      <ul className="list-disc list-inside pl-4 my-4 space-y-2">
        <li>
          <code>leftController</code>:
          左コントローラーを有効化するかどうかを指定します。デフォルトは{" "}
          <code>true</code> です。
        </li>
        <li>
          <code>rightController</code>:
          右コントローラーを有効化するかどうかを指定します。デフォルトは{" "}
          <code>true</code> です。
        </li>
        <li>
          <code>leftHand</code>:
          左ハンドを有効化するかどうかを指定します。デフォルトは{" "}
          <code>true</code> です。
        </li>
        <li>
          <code>rightHand</code>:
          右ハンドを有効化するかどうかを指定します。デフォルトは{" "}
          <code>true</code> です。
        </li>
        <li>
          <code>buttonTarget</code>: ボタンの設置先を指定します。デフォルトは{" "}
          <code>domElement</code> です。
        </li>
        <li>
          <code>selectableObjects</code>:
          コントローラーで選択可能なオブジェクトの配列を指定します。デフォルトは{" "}
          <code>[]</code> です。
        </li>
        <li>
          <code>getIntersections</code>:
          コントローラーのレイキャスターと交差するオブジェクトを取得する関数です。引数は、コントローラーのオブジェクト、交差判定するオブジェクトの配列、再帰的に判定するかどうかのフラグです。
          基本的にこの関数を直接呼び出す必要はありません。
        </li>
      </ul>
      <p className="mt-4">
        <code>setup()</code>{" "}
        の戻り値として、コントローラーやハンドのオブジェクトが返されます。
      </p>
      <ul className="list-disc list-inside pl-4 my-4 space-y-2">
        <li>
          <code>leftController</code>: 左コントローラーのオブジェクトです。
        </li>
        <li>
          <code>rightController</code>: 右コントローラーのオブジェクトです。
        </li>
        <li>
          <code>leftHand</code>: 左ハンドのオブジェクトです。
        </li>
        <li>
          <code>rightHand</code>: 右ハンドのオブジェクトです。
        </li>
        <li>
          <code>cameraGroup</code>:
          カメラとコントローラー、ハンドをまとめたグループです。XRモードでは、カメラの位置や向きはユーザーの頭の動きに合わせて自動的に更新されるため、カメラの位置や向きを直接変更するコードは無視されます。
          <br />
        </li>
      </ul>
      <CodeBlock>{`const {
  leftController,
  rightController,
  leftHand,
  rightHand,
  cameraGroup,
} = xr.setup({
  leftController: true,
  rightController: true,
  leftHand: true,
  rightHand: true,
  selectableObjects: [],
})`}</CodeBlock>
      <p className="mt-4">
        selectableObjects
        に指定したオブジェクトは、コントローラーで選択可能になります。選択されたオブジェクトの配列は、コントローラーの
        userData.selected に格納されます。
      </p>
      <CodeBlock>{`const selected = rightController.userData.selected;`}</CodeBlock>

      <p className="mt-4">
        コントローラには、あらかじめ以下のように selectstart と selectend
        のイベントリスナーが設定されており、コントローラーのトリガーを引くと、selectstart
        が発火し、トリガーを離すと selectend が発火します。
      </p>
      <CodeBlock>
        {`controller.addEventListener('selectstart', (event) => {
  const controller = event.target
  const intersections = getIntersections(controller, selectableObjects)
  if (intersections.length > 0) {
    const intersection = intersections
    controller.userData.selected = intersection
  }
})

controller.addEventListener('selectend', (event) => {
  const controller = event.target
  if (controller.userData.selected) {
    controller.userData.selected = undefined
  }
})
`}
      </CodeBlock>
      <p className="mt-4">
        コントローラには、getIntersections
        という関数が設定されており、コントローラーのレイキャスターと交差するオブジェクトを取得することができます。
        <br />
        引数は、交差判定するオブジェクトの配列(デフォルトは
        selectableObjects)、再帰的に判定するかどうかのフラグ(デフォルトは
        true)です。
        <br />
        コントローラに selectstart 以外のイベントリスナーを設定する場合に利用してください。
      </p>

      <div className="alert alert-warning mt-4 alert-soft">
        <p>
          fpv や controls などのカメラ操作系の機能は、XR
          モードでは使わないでください。
          <br />
          XR
          モードでは、カメラの位置や向きは、ユーザーの頭の動きに合わせて自動的に更新されます。
          <br />
          <code>camera.position</code>{" "}
          など、カメラの位置や向きを直接変更するコードは、XR
          モードでは無視されます。
        </p>
      </div>

      <H2 className="mt-14">サンプルコード</H2>
      <p className="mt-4">
        以下のサンプルコードでは、2つの立方体を作成し、右コントローラーで選択可能にしています。
        <br />
        選択された立方体は、赤色に変化し、回転します。
        <br />
        また、海面を作成し、アニメーションで波を表現しています。
      </p>
      <p className="mt-4">
        XRモードではカメラの位置などはユーザーの頭の動きに合わせて自動的に更新されるため、カメラの位置や向きを直接変更するコードは無視されます。
        <br />
        しかし、このサンプルコードのように、プレビュー画面で確認しやすいようにカメラの位置や向きを設定すると良いです。
      </p>
      <p className="mt-4">
        どうしてもカメラの初期位置を変更したい場合は、xr.setup() の戻り値の
        cameraGroup
        の位置を変更することで、カメラの初期位置を変更することができます。
        <br />
        例えば、cameraGroup.position.set(0, 0, 3)
        のように設定すると、カメラの初期位置が z=3 の位置になります。
      </p>

      <Ex1
        className="border mt-4"
        style={{
          width: "240px",
          height: "240px",
          position: "relative",
        }}
      />

      <CodeBlock>
        {`const { camera, create, animate, controls, xr } = init();

camera.position.set(0, 1.6, 0)
controls.target.set(0, 1.6, -1)

create.ambientLight();
create.directionalLight();
create.sky()

const cube1 = create.cube({
  position: [1, 1, -3],
});
const cube2 = create.cube({
  position: [-1, 1, -3],
});

const ocean = create.ocean("/easy-three/texture/water/NormalMap-1.jpg");

const { rightController } = xr.setup({
  selectableObjects: [cube1, cube2],
});

animate(({ delta }) => {
  ocean.update(delta);

  cube1.material.color.set(0x0000ff)
  cube2.material.color.set(0x0000ff)

  if (rightController.userData.selected) {
    const object = rightController.userData.selected[0].object;
    object.rotation.y += delta;
    object.material.color.set(0xff0000)
  }
});`}
      </CodeBlock>
    </div>
  );
}
