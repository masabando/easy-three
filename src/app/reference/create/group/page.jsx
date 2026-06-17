import CodeBlock from "@/components/CodeBlock";
import ReferenceContent from "@/components/ReferenceContent";
import { Note } from "@/components/BaseKit";
import { Ex1, Ex2, Ex3 } from "./Codes";
import H1 from "@/components/H1";
import H2 from "@/components/H2";
import H3 from "@/components/H3";

export const metadata = {
  title: "create.group",
}

export default function Reference_Create_Group() {
  return (
    <div>
      <H1>create.group</H1>
      <ReferenceContent
        name="create.group"
        args="props : Object"
        returnObject="Group"
        argsInfo={
          <div>
            <span>props</span> - 設定オブジェクト。
            <ul className="list-disc list-inside ml-4">
              <li>position (Array) : 位置 (デフォルト : [0, 0, 0])。</li>
              <li>rotation (Array) : 回転 (デフォルト : [0, 0, 0])。</li>
              <li>
                children (Array&lt;Object3D&gt;) : 子要素の配列 (デフォルト :
                [])
              </li>
              <li>
                autoAdd (Boolean) : 自動でシーンに追加 (デフォルト : true)。
              </li>
            </ul>
          </div>
        }
      >
        <p>
          グループを作成してシーンに追加します。
          <br />
          引数で最初に追加する子要素を指定できます。
        </p>
      </ReferenceContent>

      <p className="mt-4">
        グループを使うことで、複数のオブジェクトをまとめて操作することができます。
        <br />
        特に、オブジェクト間の相対的な位置を保ったまま移動させる場合や、
        オブジェクトをその原点以外を中心に回転させる場合に便利です。
      </p>

      <p className="mt-4">
        オブジェクトをグループに追加する場合、
        そのオブジェクト自身はシーンに追加する必要がありません。
        <br />
        グループをシーンに追加した時点でそのグループに含まれる全てのオブジェクトがシーンに追加されます。
        <br />
        <Note>
          グループに含まれるオブジェクトは autoAdd オプションを false に設定
        </Note>
        してください (下の例を参照)。
      </p>

      <H2 className="mt-14">コードの例</H2>
      <H3>既存オブジェクトのグループへの追加</H3>
      <p>children に追加するオブジェクトを指定してグループを作成します。</p>
      <Ex1
        className="border my-4"
        style={{
          width: "240px",
          height: "240px",
        }}
      />
      <CodeBlock>
        {`const { camera, create, animate } = init()
camera.position.set(0, 2, 2);
create.ambientLight();
create.directionalLight();

const cube1 = create.cube({
  position: [-1, 0, 0],
  autoAdd: false,
});
const cube2 = create.cube({
  position: [1, 0, 0],
  autoAdd: false,
});

const group = create.group({
  children: [cube1, cube2],
})

animate(({ delta }) => {
  group.rotation.y += delta;
});
`}
      </CodeBlock>

      <H3 className="mt-10">グループに直接追加</H3>
      <p>
        グループ作成時に children
        部分で直接オブジェクトを作成しつつ追加することもできます。
      </p>
      <Ex2
        className="border my-4"
        style={{
          width: "240px",
          height: "240px",
        }}
      />
      <CodeBlock>
        {`const { camera, create, animate } = init()
camera.position.set(0, 2, 2);
create.ambientLight();
create.directionalLight();

const group = create.group({
  children: [
    create.cube({
      position: [-1, 0, 0],
      autoAdd: false,
    }),
    create.cube({
      position: [1, 0, 0],
      autoAdd: false,
    }),
  ],
});

animate(({ delta }) => {
  group.rotation.y += delta;
});
`}
      </CodeBlock>
      <H3 className="mt-10">既存のグループへの追加</H3>
      <p>
        グループを作成した後にオブジェクトを追加することもできます。
        <br />
        create.group の戻り値は Three.js の Group オブジェクトです。
      </p>
      <Ex3
        className="border my-4"
        style={{
          width: "240px",
          height: "240px",
        }}
      />
      <CodeBlock>
        {`const { camera, create, animate } = init()
camera.position.set(0, 2, 2);
create.ambientLight();
create.directionalLight();

const group = create.group();

const cube1 = create.cube({
  position: [-1, 0, 0],
  autoAdd: false,
});
const cube2 = create.cube({
  position: [1, 0, 0],
  autoAdd: false,
});

group.add(cube1, cube2);

animate(({ delta }) => {
  group.rotation.y += delta;
});
`}
      </CodeBlock>
    </div>
  );
}
