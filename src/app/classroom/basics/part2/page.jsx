"use client";
import { EasyThreeBox, Note } from "@/components/BaseKit";
import CodeBlock from "@/components/CodeBlock";
import { init } from "@dist/easy-three";

export default function Page() {
  return (
    <div className="classroomPart">
      <h2>2. カメラコントロールとガイド</h2>
      <p>
        このセクションでは、カメラの簡単な操作方法と、
        座標をわかりやすくするためのガイドの表示方法を学びます。
      </p>
      <h3>カメラコントロール</h3>
      <p>
        <code>controls</code>{" "}
        を使うことで、ユーザのマウス操作やタッチ操作によってカメラを操作することができます。
      </p>
      <p>
        <code>controls</code> を利用するには、
        <Note>
          1行目の使うものリストに <code>controls</code> を追加し、
          <code>controls.connect()</code> を記述するだけ
        </Note>
        です。
      </p>
      <CodeBlock filename="index.html">
        {`const { camera, create, animate, controls } = init();

controls.connect()
camera.position.set(-2, 2, 2)
create.ambientLight()
create.directionalLight()
create.cube()

animate()
`}
      </CodeBlock>
      <EasyThreeBox
        effect={(r) => {
          const { camera, create, animate, controls, destroy } = init(r);
          controls.connect();
          camera.position.set(-2, 2, 2);
          create.ambientLight();
          create.directionalLight();
          create.cube();
          animate();
          return () => {
            destroy();
          };
        }}
      />
      <p>
        これだけで、マウスやタッチ操作によってカメラを操作することができます。
        <br />
        実際に試してみましょう。
      </p>
      <p>
        また、マウスホイール (スマホならピンチイン・アウト)
        でズームイン・アウトができます。
        <br />
        さらに、マウス右ドラッグ (スマホなら2本指でスワイプ)
        でカメラ位置を並行に移動できます。
      </p>

      <h4>カメラの自動回転</h4>
      <p>カメラを自動で回転させることもできます。</p>
      <CodeBlock>{`controls.autoRotate = true
controls.autoRotateSpeed = 10
`}</CodeBlock>
      <p>カメラはy軸を中心に自動で回転します。<br />
      カメラの手動操作をONにするかどうかに関わらず利用できます。</p>
      <CodeBlock filename="index.html">
        {`const { camera, create, animate, controls } = init();

controls.autoRotate = true
controls.autoRotateSpeed = 10
camera.position.set(-2, 2, 2)
create.ambientLight()
create.directionalLight()
create.cube()

animate()
`}
      </CodeBlock>
      <EasyThreeBox
        effect={(r) => {
          const { camera, create, animate, controls, destroy } = init(r);
          controls.autoRotate = true;
          controls.autoRotateSpeed = 10;
          camera.position.set(-2, 2, 2);
          create.ambientLight();
          create.directionalLight();
          create.cube();
          animate();
          return () => {
            destroy();
          };
        }}
      />

      <h3>ガイドの表示</h3>
      <p>
        3D
        空間上で座標をわかりやすくするために、ガイドを表示することができます。
        <br />
        ガイドの表示には、<code>helper</code> を使います。
      </p>
      <CodeBlock>{`helper.grid()`}</CodeBlock>
      <p>
        で、<code>y = 0</code> の<code>x-z</code>{" "}
        面にグリッドを表示することができます。
      </p>
      <CodeBlock>{`helper.axes()`}</CodeBlock>
      <p>軸を表示することができます。</p>
      <CodeBlock filename="index.html">
        {`const { camera, create, animate, controls, helper } = init();

controls.autoRotate = true
helper.grid()
helper.axes()
camera.position.set(-2, 2, 2)
create.ambientLight()
create.directionalLight()
create.cube()

animate()
`}
      </CodeBlock>
      <EasyThreeBox
        effect={(r) => {
          const { camera, create, animate, controls, helper, destroy } =
            init(r);
          controls.autoRotate = true;
          helper.grid();
          helper.axes();
          camera.position.set(-2, 2, 2);
          create.ambientLight();
          create.directionalLight();
          create.cube();
          animate();
          return () => {
            destroy();
          };
        }}
      />
    </div>
  );
}