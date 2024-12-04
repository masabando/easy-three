"use client";
import { EasyThreeBox, Note } from "@/components/BaseKit";
import CodeBlock from "@/components/CodeBlock";
import { init } from "@dist/easy-three";

export default function Page() {
  return (
    <div className="classroomPart">
      <h2>3. 球体・平面・角丸立方体などの表示</h2>
      <p>
        このセクションでは、球体、平面、そして角丸の立方体を表示する方法を学びます。
      </p>
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
      <h4>サイズ、位置、色の変更</h4>
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
      <p>
        球体を表示するには、<code>create.plane()</code> を使います。
      </p>
      <CodeBlock filename="index.html">
        {`const { camera, create, animate, controls, helper } = init();

controls.connect()
helper.grid()
helper.axes()
camera.position.set(-1, 1, 1)
create.ambientLight()
create.directionalLight()
create.plane()

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
          camera.position.set(-1, 1, 1);
          create.ambientLight();
          create.directionalLight();
          create.plane();
          animate();
          return () => {
            destroy();
          };
        }}
      />
      <p>
        立方体と同様に、デフォルトでは原点 (0, 0, 0) に表示されます。
        <br />
        向きは、<code>x-z</code> 平面になります。
      </p>
      <h4>サイズ、位置、色の変更</h4>
      <p>平面のサイズ、位置、色の変更も、立方体と同様にできます。</p>
      <CodeBlock filename="index.html">
        {`const { camera, create, animate, controls, helper } = init();

controls.connect()
helper.grid()
helper.axes()
camera.position.set(-1, 1, 1)
create.ambientLight()
create.directionalLight()
create.plane({
  size: 1.5,
  position: [1, 0, 0],
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
          camera.position.set(-1, 1, 1);
          create.ambientLight();
          create.directionalLight();
          create.plane({
            size: 1.5,
            position: [1, 0, 0],
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
      <h4>平面の回転</h4>
      <p>
        <code>rotation</code> を指定することで、平面を回転させることができます。
        <br />
        <code>rotation</code> は、<code>[x, y, z]</code> の配列で指定します。
        <br />
        回転角はラジアンで指定します (つまり、180度が <code>Math.PI</code>{" "}
        です)。
      </p>
      <p>
        例えば、x軸周りに <code>-90</code> 度回転させることで、
        <code>x-z</code> 平面上に平面を表示することができます。
      </p>
      <CodeBlock filename="index.html">
        {`const { camera, create, animate, controls, helper } = init();

controls.connect()
helper.grid()
helper.axes()
camera.position.set(-1, 1, 1)
create.ambientLight()
create.directionalLight()
create.plane({
  size: 1.5,
  rotation: [-Math.PI/2, 0, 0],
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
          camera.position.set(-1, 1, 1);
          create.ambientLight();
          create.directionalLight();
          create.plane({
            size: 1.5,
            rotation: [-Math.PI / 2, 0, 0],
          });
          animate();
          return () => {
            destroy();
          };
        }}
      />
      <Note>
        回転は、平面以外のオブジェクト(立方体、球など)にも適用できます。
      </Note>

      <h3>角丸の立方体の表示</h3>
      <p>
        立方体を作成するとき、<code>rounded: true</code>{" "}
        を指定することで、角丸の立方体を表示することができます。
        <br />
        <code>segments</code> で角丸の滑らかさを指定します。
        <br />
        <code>radius</code> で角丸の半径を指定します。
      </p>
      <CodeBlock filename="index.html">
        {`const { camera, create, animate, controls, helper } = init();

controls.connect()
helper.grid()
helper.axes()
camera.position.set(-1, 1, 1)
create.ambientLight()
create.directionalLight()
create.cube({
  rounded: true,
  segments: 7,
  radius: 0.1,
})

animate()
`}
      </CodeBlock>
      <EasyThreeBox
        toggleControls
        effect={(r, controlsFlag) => {
          const { camera, create, animate, controls, destroy } = init(r);
          if (controlsFlag) controls.connect();
          camera.position.set(-1, 1, 1);
          create.ambientLight();
          create.directionalLight();
          create.box({
            size: 1,
            rounded: true,
            segments: 7,
            radius: 0.1,
          });
          animate();
          return () => {
            destroy();
          };
        }}
      />

      <h3>トーラスの表示</h3>
      <p>
        トーラスを表示するには、<code>create.torus()</code> を使います。
        <br />
        トーラスは、ドーナツのような形状です。
      </p>
      <p>
        <code>tube</code> に数値を指定することで、トーラスの太さを調整できます。
      </p>
      <CodeBlock filename="index.html">
        {`const { camera, create, animate, controls, helper } = init();

controls.connect()
helper.grid()
helper.axes()
camera.position.set(-1, 1, 1)
create.ambientLight()
create.directionalLight()
create.torus({ tube: 0.3 })

animate()
`}
      </CodeBlock>
      <EasyThreeBox
        toggleControls
        effect={(r, controlsFlag) => {
          const { camera, create, animate, controls, destroy } = init(r);
          if (controlsFlag) controls.connect();
          camera.position.set(0, -2, 3);
          create.ambientLight();
          create.directionalLight();
          create.torus({ tube: 0.3 });
          animate();
          return () => {
            destroy();
          };
        }}
      />

      <h3>トーラス結び目の表示</h3>
      <p>
        トーラス結び目を表示するには、<code>create.torusKnot()</code>{" "}
        を使います。
        <br />
        トーラス結び目は、トーラスを結び目状にした形状です。
      </p>
      <p>
        <code>tube</code>{" "}
        に数値を指定することで、トーラス結び目の太さを調整できます。
      </p>
      <CodeBlock filename="index.html">
        {`const { camera, create, animate, controls, helper } = init();

controls.connect()
helper.grid()
helper.axes()
camera.position.set(-1, 1, 1)
create.ambientLight()
create.directionalLight()
create.torusKnot({ tube: 0.3 })

animate()
`}
      </CodeBlock>
      <EasyThreeBox
        toggleControls
        effect={(r, controlsFlag) => {
          const { camera, create, animate, controls, destroy } = init(r);
          if (controlsFlag) controls.connect();
          camera.position.set(0, -2, 3);
          create.ambientLight();
          create.directionalLight();
          create.torusKnot({ tube: 0.3 });
          animate();
          return () => {
            destroy();
          };
        }}
      />
    </div>
  );
}