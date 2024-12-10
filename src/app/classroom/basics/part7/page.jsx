"use client";
import { EasyThreeBox, Note } from "@/components/BaseKit";
import CodeBlock from "@/components/CodeBlock";
import { init } from "@dist/easy-three";

export default function Page() {
  return (
    <div className="classroomPart">
      <h2>7. 3Dオブジェクトのグループ化</h2>
      <p>このセクションでは、3Dオブジェクトをグループ化する方法を学びます。</p>

      <h3>グループ化する</h3>
      <p>
        3Dオブジェクトをグループ化するには、<code>create.group()</code>{" "}
        を使います。
      </p>
      <CodeBlock>{`const group = create.group()`}</CodeBlock>
      <p>
        このようにして作成したグループに、3Dオブジェクトを追加することで、グループ化することができます。
      </p>
      <CodeBlock>{`const group = create.group()
group.add(3Dオブジェクト1)
group.add(3Dオブジェクト2)
group.add(3Dオブジェクト3)
`}</CodeBlock>

      <p>
        例えば、4つの立方体をグループ化して、グループ全体を回転させるコードは次のようになります。
      </p>
      <CodeBlock filename="index.html">
        {`const { camera, create, animate, controls, helper } = init();

controls.connect()
helper.grid()
helper.axes()
create.ambientLight()
create.directionalLight()
camera.position.set(0, 3, 3)

const group = create.group()
const cube1 = create.cube({ position: [-2, 0, 0], autoAdd: false });
const cube2 = create.cube({ position: [2, 0, 0], autoAdd: false });
const cube3 = create.cube({ position: [0, 0, -2], autoAdd: false });
const cube4 = create.cube({ position: [0, 0, 2], autoAdd: false });
group.add(cube1);
group.add(cube2);
group.add(cube3);
group.add(cube4);
animate(({ delta }) => {
  group.rotation.x += delta;
  group.rotation.y += delta;
  cube1.rotation.x += delta * 3;
  cube1.rotation.y += delta * 4;
});
`}
      </CodeBlock>
      <EasyThreeBox
        toggleControls
        effect={(r) => {
          const { camera, create, animate, controls, helper, destroy } =
            init(r);
          helper.grid();
          helper.axes();
          create.ambientLight();
          create.directionalLight();
          camera.position.set(0, 3, 3);
          const group = create.group();
          const cube1 = create.cube({ position: [-2, 0, 0], autoAdd: false });
          const cube2 = create.cube({ position: [2, 0, 0], autoAdd: false });
          const cube3 = create.cube({ position: [0, 0, -2], autoAdd: false });
          const cube4 = create.cube({ position: [0, 0, 2], autoAdd: false });
          group.add(cube1);
          group.add(cube2);
          group.add(cube3);
          group.add(cube4);
          animate(({ delta }) => {
            group.rotation.x += delta;
            group.rotation.y += delta;
            cube1.rotation.x += delta * 3;
            cube1.rotation.y += delta * 4;
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
        グループ自体を回転させることで、グループ内のオブジェクトの位置関係を保ちつつ回転させることができます。
        <br />
        また、グループ内のオブジェクトにも個別に回転を加えることができます。
      </p>
      <p>
        ここで重要なことは、
        <Note>
          グループに追加するオブジェクトを作る際に{" "}
          <code>autoAdd: false</code> を指定すること
        </Note>です。
        <br />
        通常 <code>create</code> でオブジェクトを作った場合、自動的にシーン(3D空間)に追加されます。
        <br />
        グループを利用する場合は、オブジェクトはグループに追加し、そのグループをシーンに追加するため、
        オブジェクトが2重にシーン追加されることを防ぐために <code>autoAdd: false</code>{" "}
        を指定します。
      </p>
      <p>
        また、グループ作成時に直接オブジェクトを追加することもできます。
        <br />
        この場合、
      </p>
      <CodeBlock>{`group.children[番号]`}</CodeBlock>
      <p>
        で、追加したオブジェクトにアクセスすることができます。
        <br />
        番号は追加した順番に0から始まります。
      </p>
      <CodeBlock filename="index.html">
        {`const { camera, create, animate, controls, helper } = init();

controls.connect()
helper.grid()
helper.axes()
create.ambientLight()
create.directionalLight()
camera.position.set(0, 3, 3)

const group = create.group({
  children: [
    create.cube({ position: [-2, 0, 0], autoAdd: false }),
    create.cube({ position: [2, 0, 0], autoAdd: false }),
    create.cube({ position: [0, 0, -2], autoAdd: false }),
    create.cube({ position: [0, 0, 2], autoAdd: false }),
  ],
});
animate(({ delta }) => {
  group.rotation.x += delta;
  group.rotation.y += delta;
  group.children[0].rotation.x += delta * 3;
  group.children[0].rotation.y += delta * 4;
});
`}
      </CodeBlock>
      <EasyThreeBox
        toggleControls
        effect={(r) => {
          const { camera, create, animate, controls, helper, destroy } =
            init(r);
          helper.grid();
          helper.axes();
          create.ambientLight();
          create.directionalLight();
          camera.position.set(0, 3, 3);
          const group = create.group({
            children: [
              create.cube({ position: [-2, 0, 0], autoAdd: false }),
              create.cube({ position: [2, 0, 0], autoAdd: false }),
              create.cube({ position: [0, 0, -2], autoAdd: false }),
              create.cube({ position: [0, 0, 2], autoAdd: false }),
            ],
          });
          animate(({ delta }) => {
            group.rotation.x += delta;
            group.rotation.y += delta;
            group.children[0].rotation.x += delta * 3;
            group.children[0].rotation.y += delta * 4;
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
