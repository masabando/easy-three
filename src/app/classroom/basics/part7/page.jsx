import { Code, Note } from "@/components/BaseKit";
import CodeBlock from "@/components/CodeBlock";
import H1 from "@/components/H1";
import H2 from "@/components/H2";
import { Ex1, Ex2 } from "./Codes";

export const metadata = {
  title: "3Dオブジェクトのグループ化",
};

export default function Page() {
  return (
    <div className="classroomPart">
      <H1>7. 3Dオブジェクトのグループ化</H1>
      <p>このセクションでは、3Dオブジェクトをグループ化する方法を学びます。</p>

      <H2 className="mt-14">グループ化する</H2>
      <p>
        3Dオブジェクトをグループ化するには、<Code>create.group()</Code>{" "}
        を使います。
      </p>
      <CodeBlock>{`const group = create.group()`}</CodeBlock>
      <p className="mt-4">
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
      <Ex1 />

      <p>
        グループ自体を回転させることで、グループ内のオブジェクトの位置関係を保ちつつ回転させることができます。
        <br />
        また、グループ内のオブジェクトにも個別に回転を加えることができます。
      </p>
      <p className="mt-4">
        ここで重要なことは、
        <Note>
          グループに追加するオブジェクトを作る際に{" "}
          <Code>autoAdd: false</Code> を指定すること
        </Note>です。
        <br />
        通常 <Code>create</Code> でオブジェクトを作った場合、自動的にシーン(3D空間)に追加されます。
        <br />
        グループを利用する場合は、オブジェクトはグループに追加し、そのグループをシーンに追加するため、
        オブジェクトが2重にシーン追加されることを防ぐために <Code>autoAdd: false</Code>{" "}
        を指定します。
      </p>
      <p className="mt-4">
        また、グループ作成時に直接オブジェクトを追加することもできます。
        <br />
        この場合、
      </p>
      <CodeBlock>{`group.children[番号]`}</CodeBlock>
      <p className="mt-4">
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
      <Ex2 />

    </div>
  );
}
