"use client";
import { EasyThreeBox, Note } from "@/components/BaseKit";
import CodeBlock from "@/components/CodeBlock";
import { init } from "@dist/easy-three";

export default function Page() {
  return (
    <div className="classroomPart">
      <h2>5. 様々なマテリアル</h2>
      <p>
        このセクションでは、3Dで利用できる様々な材質 (マテリアル) を学びます。
      </p>

      <h3>マテリアルの変更方法</h3>
      <p>
        3Dオブジェクトの見た目を変更するには、マテリアルを変更します。
        <br />
        <Note>マテリアルは、オブジェクトに色や質感を与えるもの</Note>です。
        <br />
        マテリアルを変更するには、オブジェクトの作成時に <code>
          material
        </code>{" "}
        を指定します。
      </p>
      <CodeBlock>{`create.cube({ material: "マテリアル名" })`}</CodeBlock>
      <p>
        デフォルトでは、<code>"Physical"</code> が設定されています。
        <br />
        使用できる主なマテリアルは、次の通りです。
      </p>
      <ul>
        <li>
          <code>Basic</code> :
          光の影響を受けない、単色のマテリアル。とても軽い。
        </li>
        <li>
          <code>Phong</code> : 光沢感のあるマテリアル。軽い。
        </li>
        <li>
          <code>Lambert</code> : マットな質感のマテリアル。軽い。
        </li>
        <li>
          <code>Standard</code> : 物理ベースの(よりリアル感のある)マテリアル。
        </li>
        <li>
          <code>Physical</code> : Standard マテリアルを拡張したマテリアル。
        </li>
        <li>
          <code>Toon</code> : トゥーンシェーディング(3Dアニメ調)のマテリアル。
        </li>
        <li>
          <code>Normal</code> : 法線マップを使ったマテリアル。
        </li>
      </ul>
      <p>
        <Note>
          基本的にはデフォルトの <code>Physical</code> を使えば
          マットな質感から光沢感、ガラス表現など全て問題ありません。
        </Note>
        <br />
        ただし、<code>Physical</code>マテリアルは重いので、
        オブジェクトの数が大量になる場合は他のマテリアルを検討してください。
      </p>

      <h3>Basic マテリアル</h3>
      <p>
        <Note>Basicマテリアルは、 光の影響を受けない単色のマテリアル</Note>
        です。
        <br />
        とても軽いので、大量のオブジェクトにも適しています。
      </p>
      <p>
        下のコードは、左側に Physical マテリアル、右側に Basic
        マテリアルの立方体を表示するものですが、光を入れていません。
        <br />
        左の Physical マテリアルは光の影響を受けますが光がないため真っ暗です。
        <br />
        一方、右の Basic マテリアルは光の影響を受けず、単色で表示されます。
      </p>
      <CodeBlock filename="index.html">
        {`const { camera, create, animate, controls, helper } = init();

controls.connect()
helper.grid()
helper.axes()
camera.position.set(0, 2, 2)
const physicalCube = create.cube({ position: [-1, 0, 0] })
const basicCube = create.cube({ material: "Basic", position: [1, 0, 0] })

animate(({ delta }) => {
  physicalCube.rotation.x += delta
  physicalCube.rotation.y += delta
  basicCube.rotation.x += delta
  basicCube.rotation.y += delta
})
`}
      </CodeBlock>
      <EasyThreeBox
        toggleControls
        effect={(r) => {
          const { camera, create, animate, controls, helper, destroy } =
            init(r);
          helper.grid();
          helper.axes();
          camera.position.set(0, 2, 2);
          const physicalCube = create.cube({ position: [-1, 0, 0] });
          const basicCube = create.cube({
            material: "Basic",
            position: [1, 0, 0],
          });
          animate(({ delta }) => {
            physicalCube.rotation.x += delta;
            physicalCube.rotation.y += delta;
            basicCube.rotation.x += delta;
            basicCube.rotation.y += delta;
          });
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

      <p>ここで、光を入れてみましょう。</p>
      <CodeBlock filename="index.html">
        {`const { camera, create, animate, controls, helper } = init();

controls.connect()
helper.grid()
helper.axes()
camera.position.set(0, 2, 2)
create.ambientLight()
create.directionalLight()
const physicalCube = create.cube({ position: [-1, 0, 0] })
const basicCube = create.cube({ material: "Basic", position: [1, 0, 0] })

animate(({ delta }) => {
  physicalCube.rotation.x += delta
  physicalCube.rotation.y += delta
  basicCube.rotation.x += delta
  basicCube.rotation.y += delta
})
`}
      </CodeBlock>
      <EasyThreeBox
        toggleControls
        effect={(r) => {
          const { camera, create, animate, controls, helper, destroy } =
            init(r);
          helper.grid();
          helper.axes();
          camera.position.set(0, 2, 2);
          create.ambientLight();
          create.directionalLight();
          const physicalCube = create.cube({ position: [-1, 0, 0] });
          const basicCube = create.cube({
            material: "Basic",
            position: [1, 0, 0],
          });
          animate(({ delta }) => {
            physicalCube.rotation.x += delta;
            physicalCube.rotation.y += delta;
            basicCube.rotation.x += delta;
            basicCube.rotation.y += delta;
          });
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
        Physical マテリアルは光の影響を受けるため、光を入れると立体感が出ます。
        <br />
        一方、Basic
        マテリアルは光の影響を受けないため、立体感があまり感じられません。
      </p>

      <h3>Phong マテリアル</h3>
      <p>
        <Note>Phongマテリアルは、光沢感のあるマテリアル</Note>
        です。
        <br />
        Basic マテリアルよりも光の反射がリアルになりますが、 Physical
        マテリアルや Standard マテリアルよりもクオリティは低くなります。
      </p>
      <p>
        Phong マテリアルで光沢感を出すには、
        <code>option</code> の <code>shininess</code> を 指定します。
      </p>
      <p>
        下のコードは、左側に Physical マテリアル、右側に Phong
        マテリアルの立方体を表示するものです。
      </p>
      <CodeBlock filename="index.html">
        {`const { camera, create, animate, controls, helper } = init();

controls.connect()
helper.grid()
helper.axes()
camera.position.set(0, 3, 3)
create.ambientLight()
create.directionalLight()
create.sphere({
  position: [-2, 0, 0],
  option: {
    color: "blue",
    metalness: 0.6,
    roughness: 0.3,
  }
})
create.sphere({
  material: "Phong",
  position: [2, 0, 0],
  option: {
    color: "blue",
    shininess: 90,
  }
})

animate()
`}
      </CodeBlock>
      <EasyThreeBox
        toggleControls
        effect={(r) => {
          const { camera, create, animate, controls, helper, destroy } =
            init(r);
          helper.grid();
          helper.axes();
          camera.position.set(0, 3, 3);
          create.ambientLight();
          create.directionalLight({ intensity: 4 });
          create.sphere({
            position: [-2, 0, 0],
            option: {
              color: "blue",
              metalness: 0.6,
              roughness: 0.3,
            },
          });
          create.sphere({
            material: "Phong",
            position: [2, 0, 0],
            option: {
              color: "blue",
              shininess: 90,
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

      <h3>Lambert マテリアル</h3>
      <p>
        <Note>Lambertマテリアルは、マットな質感のマテリアル</Note>
        です。
        <br />
        Phong マテリアルよりも質感がマットで、光の反射が少ないです。
      </p>
      <p>
        下のコードは、左側に Physical マテリアル、右側に Lambert
        マテリアルの立方体を表示するものです。
      </p>
      <CodeBlock filename="index.html">
        {`const { camera, create, animate, controls, helper } = init();

controls.connect()
helper.grid()
helper.axes()
camera.position.set(0, 3, 3)
create.ambientLight()
create.directionalLight()
create.sphere({ position: [-2, 0, 0] })
create.sphere({ material: "Lambert", position: [2, 0, 0] })

animate()
`}
      </CodeBlock>
      <EasyThreeBox
        toggleControls
        effect={(r) => {
          const { camera, create, animate, controls, helper, destroy } =
            init(r);
          helper.grid();
          helper.axes();
          camera.position.set(0, 3, 3);
          create.ambientLight();
          create.directionalLight();
          create.sphere({ position: [-2, 0, 0] });
          create.sphere({
            material: "Lambert",
            position: [2, 0, 0],
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

      <h3>Standard マテリアル</h3>
      <p>
        <Note>Standardマテリアルは、物理ベースのマテリアル</Note>
        です。
        <br />
        Basic マテリアルや Phong マテリアル、Lambert
        マテリアルよりもリアル感があります。
        <br />
        利用方法はほぼ Physical マテリアルと同じなので割愛します。
      </p>

      <h3>Physical マテリアル</h3>
      <p>
        <Note>
          Physicalマテリアルは、Standardマテリアルを拡張したマテリアル
        </Note>
        です。
        <br />
        Standard
        マテリアルよりもリアル感があり、さらにガラス表現なども可能です。
        <br />
        ただし、重いのでオブジェクトの数が大量になる場合は他のマテリアルを検討してください。
      </p>
      <h4>金属感と粗さを調整する</h4>
      <p>
        Physical マテリアルでは、<code>option</code> の<code>metalness</code>{" "}
        で金属感を、
        <code>roughness</code> で粗さを調整できます。
      </p>
      <p>
        下のコードは、左側に金属感を強く、粗さを少なくした球体、中央に標準的な球体、
        右側に金属感を少なく、粗さを強くした球体を表示するものです。
      </p>
      <CodeBlock filename="index.html">
        {`const { camera, create, animate, controls, helper } = init();

controls.connect()
helper.grid()
helper.axes()
camera.position.set(0, 3, 3)
create.ambientLight()
create.directionalLight()
create.sphere({
  position: [-2.5, 0, 0],
  option: {
    color: "blue",
    metalness: 0.7,
    roughness: 0.2,
  }
});
create.sphere({
  option: {
    color: "blue",
    metalness: 0.5,
    roughness: 0.5,
  },
});
create.sphere({
  position: [2.5, 0, 0],
  option: {
    color: "blue",
    metalness: 0.2,
    roughness: 0.7,
  }
});

animate()
`}
      </CodeBlock>
      <EasyThreeBox
        toggleControls
        effect={(r) => {
          const { camera, create, animate, controls, helper, destroy } =
            init(r);
          helper.grid();
          helper.axes();
          camera.position.set(0, 3, 3);
          create.ambientLight();
          create.directionalLight();
          create.sphere({
            position: [-2.5, 0, 0],
            option: {
              color: "blue",
              metalness: 0.7,
              roughness: 0.2,
            },
          });
          create.sphere({
            option: {
              color: "blue",
              metalness: 0.5,
              roughness: 0.5,
            },
          });
          create.sphere({
            position: [2.5, 0, 0],
            option: {
              color: "blue",
              metalness: 0.2,
              roughness: 0.7,
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

      <h4>ガラスのような表現</h4>
      <p>
        Physical マテリアルでは、<code>option</code> の<code>transmission</code>{" "}
        で透明度を調整できます。
        <br />
        また、<code>thickness</code>{" "}
        を上げることで、屈折率を上げることができます。
      </p>
      <p>
        下のコードは、手前にガラスのような立方体、奥に標準的な立方体を表示するものです。
        <br />
        奥の立方体が屈折して見えるのがわかります。
      </p>
      <CodeBlock filename="index.html">
        {`const { camera, create, animate, controls, helper } = init();

controls.connect()
camera.position.set(0, 0, 2.5);
create.ambientLight();
create.directionalLight();
const cube = create.cube({
  option: {
    metalness: 0,
    roughness: 0.1,
    transmission: 0.9,
    thickness: 0.4,
  },
});
create.cube({ size: 3, position: [0, 0, -4] });
animate(({ delta, time }) => {
  cube.rotation.x += delta;
  cube.rotation.y += delta;
  cube.position.set(Math.sin(time) * 2, 0, 0);
});
`}
      </CodeBlock>
      <EasyThreeBox
        toggleControls
        effect={(r) => {
          const { camera, create, animate, controls, destroy } = init(r);
          camera.position.set(0, 0, 2.5);
          create.ambientLight();
          create.directionalLight();
          const cube = create.cube({
            option: {
              metalness: 0,
              roughness: 0.1,
              transmission: 0.9,
              thickness: 0.4,
            },
          });
          create.cube({ size: 3, position: [0, 0, -4] });
          animate(({ delta, time }) => {
            cube.rotation.x += delta;
            cube.rotation.y += delta;
            cube.position.set(Math.sin(time) * 2, 0, 0);
          });
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

      <h3>Toon マテリアル</h3>
      <p>
        <Note>Toonマテリアルは、3Dアニメ調のマテリアル</Note>
        です。
      </p>
      <p>
        下のコードは、左側に Physical マテリアル、右側に Toon
        マテリアルのトーラス結び目を表示するものです。
      </p>
      <CodeBlock filename="index.html">
        {`const { camera, create, animate, controls, helper } = init();

controls.connect()
camera.position.set(0, 0, 5);
create.ambientLight();
create.directionalLight();
const physicalTorusKnot = create.torusKnot({
  position: [-2, 0, 0],
  material: "Physical",
});
const toonTorusKnot = create.torusKnot({
  position: [2, 0, 0],
  material: "Toon",
});
animate(({ delta }) => {
  physicalTorusKnot.rotation.x += delta;
  physicalTorusKnot.rotation.y += delta;
  toonTorusKnot.rotation.x += delta;
  toonTorusKnot.rotation.y += delta;
});
`}
      </CodeBlock>
      <EasyThreeBox
        toggleControls
        effect={(r) => {
          const { camera, create, animate, controls, destroy } = init(r);
          camera.position.set(0, 0, 5);
          create.ambientLight();
          create.directionalLight();
          const physicalTorusKnot = create.torusKnot({
            position: [-2, 0, 0],
            material: "Physical",
          });
          const toonTorusKnot = create.torusKnot({
            position: [2, 0, 0],
            material: "Toon",
          });
          animate(({ delta }) => {
            physicalTorusKnot.rotation.x += delta;
            physicalTorusKnot.rotation.y += delta;
            toonTorusKnot.rotation.x += delta;
            toonTorusKnot.rotation.y += delta;
          });
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

      <h3>Normal マテリアル</h3>
      <p>
        <Note>Normalマテリアルは、法線マップを使ったマテリアル</Note>
        です。
        <br />
        法線マップは、オブジェクトの凹凸を表現するために使用されます。
        <br />
        Normal マテリアルを使うことで、面がどの方向を向いているかがわかりやすくなります。
        <br />
        x軸方向を向いている面は赤、y軸方向を向いている面は緑、z軸方向を向いている面は青で表示されます。
      </p>
      <p>
        下のコードは、左側に Physical マテリアル、右側に Normal
        マテリアルの立方体を表示するものです。
      </p>
      <CodeBlock filename="index.html">
        {`const { camera, create, animate, controls, helper } = init();

controls.connect()
camera.position.set(0, 0, 5);
create.ambientLight();
create.directionalLight();
const physicalTorusKnot = create.torusKnot({
  position: [-2, 0, 0],
  material: "Physical",
});
const toonTorusKnot = create.torusKnot({
  position: [2, 0, 0],
  material: "Toon",
});
animate(({ delta }) => {
  physicalTorusKnot.rotation.x += delta;
  physicalTorusKnot.rotation.y += delta;
  toonTorusKnot.rotation.x += delta;
  toonTorusKnot.rotation.y += delta;
});
`}
      </CodeBlock>
      <EasyThreeBox
        toggleControls
        effect={(r) => {
          const { camera, create, animate, controls, destroy } = init(r);
          camera.position.set(0, 0, 3);
          create.ambientLight();
          create.directionalLight();
          const physicalCube = create.cube({
            position: [-1, 0, 0],
            material: "Physical",
          });
          const normalCube = create.cube({
            position: [1, 0, 0],
            material: "Normal",
          });
          animate(({ delta }) => {
            physicalCube.rotation.x += delta;
            physicalCube.rotation.y += delta;
            normalCube.rotation.x += delta;
            normalCube.rotation.y += delta;
          });
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
