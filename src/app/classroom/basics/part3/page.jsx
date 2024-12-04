"use client";
import { EasyThreeBox, Note } from "@/components/BaseKit";
import CodeBlock from "@/components/CodeBlock";
import { init } from "@dist/easy-three";

export default function Page() {
  return (
    <div className="classroomPart">
      <h2>3. 球体・平面の表示</h2>
      <p>このセクションでは、球体と平面を表示する方法を学びます。</p>
      <h3>球体の表示</h3>
      <p>
        球体を表示するには、<code>create.sphere()</code> を使います。
      </p>
      <CodeBlock filename="index.html">
        {`const { camera, create, animate, controls, helper } = init();

controls.connect()
helper.grid()
helper.axes()
camera.position.set(-2, 2, 2)
create.ambientLight()
create.directionalLight()
create.sphere()

animate()
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
          create.sphere();
          animate();
          return () => {
            destroy();
          };
        }}
      />
      <p>立方体と同様に、デフォルトでは原点 (0, 0, 0) に表示されます。</p>
      <h3>サイズ、位置、色の変更</h3>
      <p>球体のサイズ、位置、色の変更も、立方体と同様にできます。</p>
      <CodeBlock filename="index.html">
        {`const { camera, create, animate, controls, helper } = init();

controls.connect()
helper.grid()
helper.axes()
camera.position.set(-2, 2, 2)
create.ambientLight()
create.directionalLight()
create.sphere({
  size: 0.5,
  position: [1, 1, 1],
  option: {
    color: 0xff0000,
  }
})

animate()
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
          create.sphere({
            size: 0.5,
            position: [1, 1, 1],
            option: {
              color: 0xff0000,
            },
          });
          animate();
          return () => {
            destroy();
          };
        }}
      />

      <h4>セグメント数の変更</h4>
      <p>
        球体のセグメント数を変更することもできます。
        <br />
        3Dの描画では、球体を表現するために多数の平面を使っています。
        <br />
        平面の数が多くなるほど、球体の表現が滑らかになります。
        <br />
        セグメント数とは、球体をどの程度平面に分割するかの数値です。
      </p>
      <CodeBlock>
        {`create.sphere({ segments: [横の分割数, 縦の分割数] })`}
      </CodeBlock>
      <p>もし横と縦の分割数が同じ場合は、次のように省略して記述できます。</p>
      <CodeBlock>{`create.sphere({ segments: 縦横の分割数 })`}</CodeBlock>
      <p>
        例えば、次のように記述すると、横4分割、縦2分割の球体が表示されます。
      </p>
      <CodeBlock filename="index.html">
        {`const { camera, create, animate, controls, helper } = init();

controls.connect()
helper.grid()
helper.axes()
camera.position.set(-2, 2, 2)
create.ambientLight()
create.directionalLight()
create.sphere({ segments: [4, 2] })

animate()
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
          create.sphere({ segments: [4, 2] });
          animate();
          return () => {
            destroy();
          };
        }}
      />
      <p>
        球がどのように分割されているかを確認するには、
        次のようにワイヤーフレーム表示にするとわかりやすいです。
      </p>
      <CodeBlock filename="index.html">
        {`const { camera, create, animate, controls, helper } = init();

controls.connect()
helper.grid()
helper.axes()
camera.position.set(-2, 2, 2)
create.ambientLight()
create.directionalLight()
create.sphere({
  segments: 10,
  option: {
    wireframe: true,
    color: 0x0000ff,
  },
})

animate()
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
          create.sphere({
            segments: 10,
            option: {
              wireframe: true,
              color: 0x0000ff,
            },
          });
          animate();
          return () => {
            destroy();
          };
        }}
      />

      <h3>平面の表示</h3>
      <EasyThreeBox
        toggleControls
        effect={(r, controlsFlag) => {
          const { camera, create, animate, controls, load, destroy, THREE, scene } =
            init(r);
          if (controlsFlag) controls.connect();
          camera.position.set(-1, 1, 1);
          create.ambientLight();
          create.directionalLight();
          create.box({
            rounded: true,
            segments: 7,
            radius: 0.1
          })
          animate()
          return () => {
            destroy();
          };
        }}
      />
    </div>
  );
}