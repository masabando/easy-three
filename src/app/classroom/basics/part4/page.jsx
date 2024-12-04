"use client";
import { EasyThreeBox, Note } from "@/components/BaseKit";
import CodeBlock from "@/components/CodeBlock";
import { init } from "@dist/easy-three";

export default function Page() {
  return (
    <div className="classroomPart">
      <h2>4. 背景とアニメーションの基礎</h2>
      <p>
        このセクションでは、背景色の変更と、アニメーションの基本的な使い方を学びます。
      </p>
      <h3>背景色の変更</h3>
      <p>
        デフォルトでは、背景色は透明です。
        <br />
        Webページの基本色が白なので、これまでは背景が白く見えていました。
        <br />
        背景色を変更するには、次のように<code>scene.background</code>{" "}
        に色を指定します。
      </p>
      <CodeBlock>{`scene.background = color(色)`}</CodeBlock>
      <p>例えば背景を黒にするには、次のように記述します。</p>
      <CodeBlock filename="index.html">
        {`const { camera, create, animate, controls, helper, color, scene } = init();

scene.background = color("black")
controls.connect()
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
        toggleControls
        effect={(r, controlsFlag) => {
          const {
            camera,
            create,
            animate,
            controls,
            helper,
            scene,
            color,
            destroy,
          } = init(r);
          if (controlsFlag) controls.connect();
          helper.grid();
          helper.axes();
          camera.position.set(-2, 2, 2);
          create.ambientLight();
          create.directionalLight();
          create.cube();
          scene.background = color("black");
          animate();
          return () => {
            destroy();
          };
        }}
      />

      <h3>アニメーションの基礎</h3>
      <p>
        <code>animate</code>の引数で、アニメーションの処理を記述できます。
      </p>
      <h4>アニメーションしたいオブジェクトを変数に入れる</h4>
      <p>
        <Note>アニメーションしたいオブジェクトを変数に入れておく</Note>ことで、
        アニメーション処理の中でそのオブジェクトを操作できます。
      </p>
      <CodeBlock>{`const myCube = create.cube()`}</CodeBlock>
      <p>
        ここで、<code>myCube</code> は変数名であり、 自由に名前を付けられます
        (半角英字のみ)。
      </p>
      <h4>アニメーションする</h4>
      <p>
        <code>animate</code>の引数を次のようにします。
      </p>
      <CodeBlock>{`animate(({ delta, time }) => {
  // ここでアニメーション処理を記述
})`}</CodeBlock>
      <p>
        ここで、<Note>
          <code>delta</code> は前回のフレームからの経過時間(秒)、
          <code>time</code> はアニメーション開始からの経過時間(秒)
        </Note>です。<br />
        使用しない場合は省略できます。
      </p>
      <p>例えば、次のように記述すると立方体がx軸周りに回転します。</p>
      <CodeBlock filename="index.html">
        {`const { camera, create, animate, controls, helper } = init();

controls.connect()
helper.grid()
helper.axes()
camera.position.set(-2, 2, 2)
create.ambientLight()
create.directionalLight()
const cube = create.cube()
animate(({ delta }) => {
  cube.rotation.x += delta
})
`}
      </CodeBlock>
      <EasyThreeBox
        toggleControls
        effect={(r, controlsFlag) => {
          const { camera, create, animate, controls, helper, destroy } =
            init(r);
          if (controlsFlag) controls.connect();
          helper.grid();
          helper.axes();
          camera.position.set(-2, 2, 2);
          create.ambientLight();
          create.directionalLight();
          const cube = create.cube();
          animate(({ delta }) => {
            cube.rotation.x += delta;
          });
          return () => {
            destroy();
          };
        }}
      />

      <h4>オブジェクトの位置を変更する</h4>
      <p>
        オブジェクトの位置を変更するには、<code>position.set</code> を使います。<br />
        三角関数 (<code>Math.sin</code>, <code>Math.cos</code>) を使うと、
        オブジェクトを波打たせることができます。
      </p>
      <CodeBlock filename="index.html">
        {`const { camera, create, animate, controls, helper } = init();

controls.connect()
helper.grid()
helper.axes()
camera.position.set(-2, 2, 2)
create.ambientLight()
create.directionalLight()
const cube = create.cube()
animate(({ delta, time }) => {
  cube.rotation.x += delta
  cube.rotation.y += delta
  cube.position.set(0, 0, Math.sin(time) * 2)
})
`}
      </CodeBlock>
      <EasyThreeBox
        toggleControls
        effect={(r, controlsFlag) => {
          const { camera, create, animate, controls, helper, destroy } =
            init(r);
          if (controlsFlag) controls.connect();
          helper.grid();
          helper.axes();
          camera.position.set(-2, 2, 2);
          create.ambientLight();
          create.directionalLight();
          const cube = create.cube();
          animate(({ delta, time }) => {
            cube.rotation.x += delta;
            cube.rotation.y += delta;
            cube.position.set(0, 0, Math.sin(time) * 2);
          });
          return () => {
            destroy();
          };
        }}
      />
    </div>
  );
}