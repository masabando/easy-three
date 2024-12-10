"use client";
import { EasyThreeBox, Note } from "@/components/BaseKit";
import CodeBlock from "@/components/CodeBlock";
import { init } from "@dist/easy-three";

export default function Page() {
  return (
    <div className="classroomPart">
      <h2>6. 面の変形</h2>
      <p>
        このセクションでは、面の変形を学びます。
        <br />
        面を変形させることで、波打つような表現などが可能になります。
      </p>

      <h3>面の変形</h3>
      <p>
        面の変形は、頂点の座標を変更することで行います。
        <br />
        3Dでの形は、たくさんの面が集まってできていますが、
        それぞれの面は頂点で構成されています。
        <br />
        そのため、頂点の座標を変更することで、面の形状を変えることができます。
      </p>

      <p>
        頂点の座標を扱うには、オブジェクトのgeometry属性のattributes.positionを使います。
      </p>
      <CodeBlock>{`const position = オブジェクト.geometry.attributes.position`}</CodeBlock>
      <p>
        こうして得られたpositionは、各頂点の座標を保持しています。
        <br />
        <code>i</code> 番目の頂点のx座標を取得するには、
      </p>
      <CodeBlock>{`const x = position.getX(i)`}</CodeBlock>
      <p>
        とします。
        <br />
        また、<code>i</code> 番目の頂点のx座標を変更するには、
      </p>
      <CodeBlock>{`position.setX(i, 値)`}</CodeBlock>
      <p>
        とします。
        <br />
        頂点の座標を変更したら、<code>position.needsUpdate = true</code>{" "}
        を記述することで変更を反映させます。
        <br />
        環境マップなどの反射を使う場合は、さらに <code>オブジェクト.geometry.computeVertexNormals()</code>{" "}
        で法線を再計算する必要があります。
      </p>
      <CodeBlock>{`position.needsUpdate = true
オブジェクト.geometry.computeVertexNormals()
`}</CodeBlock>
      <p>
        また、<code>position.count</code> で頂点の数を取得できます。
      </p>
      <p>
        これを使うと、例えばx座標の値に応じてz座標を変えることができます。
        <br />
        <code>segments</code> を指定することを忘れないようにしましょう。
        <code>plane</code>はデフォルトでは<code>segments: 1</code>
        になっているので、波打つことができません。
        <br />
        また、フラットシェーディングを有効にすることで、
        面の位置の変化をよりわかりやすくしています。
      </p>

      <CodeBlock filename="index.html">
        {`const { camera, create, animate, controls } = init()

controls.connect()
camera.position.set(-6, 6, 6)

create.ambientLight()
create.directionalLight()

const plane = create.plane({
  size: 10,
  segments: 30,
  option: {
    flatShading: true,
  },
})
const position = plane.geometry.attributes.position

animate(({ time }) => {
  for (let i = 0; i < position.count; i++) {
    const x = position.getX(i)
    position.setZ(i, Math.sin(x + time))
  }
  position.needsUpdate = true
})
`}
      </CodeBlock>
      <EasyThreeBox
        toggleControls
        effect={(r) => {
          const { camera, create, animate, controls, destroy } = init(r);
          camera.position.set(-6, 6, 6);
          create.ambientLight();
          create.directionalLight();
          const plane = create.plane({
            size: 10,
            segments: 30,
            option: {
              flatShading: true,
            },
          });
          const position = plane.geometry.attributes.position;
          animate(({ time }) => {
            for (let i = 0; i < position.count; i++) {
              const x = position.getX(i);
              position.setZ(i, Math.sin(x + time));
            }
            position.needsUpdate = true;
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

      <CodeBlock filename="index.html">
        {`const { camera, create, animate, controls } = init()

controls.connect()
camera.position.set(--6, 6, 6)

create.ambientLight()
create.directionalLight()

const plane = create.plane({
  size: 10,
  segments: 30,
  option: {
    flatShading: true,
  }
})
const position = plane.geometry.attributes.position

animate(({ time }) => {
  for (let i = 0; i < position.count; i++) {
    const x = position.getX(i)
    const y = position.getY(i)
    position.setZ(i, Math.sin(x + time) * Math.cos(y + time))
  }
  position.needsUpdate = true
})
`}
      </CodeBlock>
      <EasyThreeBox
        toggleControls
        effect={(r) => {
          const { camera, create, animate, controls, destroy } = init(r);
          camera.position.set(-6, 6, 6);
          create.ambientLight();
          create.directionalLight();
          const plane = create.plane({
            size: 10,
            segments: 30,
            option: {
              flatShading: true,
            },
          });
          const position = plane.geometry.attributes.position;
          animate(({ time }) => {
            for (let i = 0; i < position.count; i++) {
              const x = position.getX(i);
              const y = position.getY(i);
              position.setZ(i, Math.sin(x + time) * Math.cos(y + time));
            }
            position.needsUpdate = true;
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
        背景を入れると、よりリアルな感じになります。
      </p>

      <EasyThreeBox
        toggleControls
        effect={(r) => {
          const { camera, create, animate, controls, load, destroy, THREE } = init(r);
          camera.position.set(-6, 6, 6);
          create.ambientLight();
          create.directionalLight();
          const plane = create.plane({
            size: 10,
            segments: 30,
            option: {
              metalness: 0.8,
              roughness: 0.1,
              side: THREE.DoubleSide,
            },
          });
          const position = plane.geometry.attributes.position;
          load.background(
            "/easy-three/texture/hdr/kloofendal_48d_partly_cloudy_puresky_1k.hdr"
          );
          animate(({ time }) => {
            for (let i = 0; i < position.count; i++) {
              const x = position.getX(i);
              const y = position.getY(i);
              position.setZ(i, Math.sin(x + time) * Math.cos(y + time));
            }
            position.needsUpdate = true;
            plane.geometry.computeVertexNormals();
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
