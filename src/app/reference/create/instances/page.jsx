import CodeBlock from "@/components/CodeBlock";
import ReferenceContent from "@/components/ReferenceContent";
import { Link } from "@/components/BaseKit";
import H1 from "@/components/H1";
import H2 from "@/components/H2";
import H3 from "@/components/H3";
import { Ex1, Ex2, Ex3, Ex4, Ex5 } from "./Codes";

export const metadata = {
  title: "create.instances",
};

export default function Reference_Create_Instances() {
  return (
    <div>
      <H1>create.instances</H1>
      <ReferenceContent
        name="create.instances"
        args="originalMesh : Mesh, count : number, props : Object"
        returnObject="Mesh"
        argsInfo={
          <div>
            <div>
              <span>originalMesh</span> - 元のメッシュ。
            </div>
            <div>
              <span>count</span> - インスタンスの数。
            </div>
            <span>props</span> - 設定オブジェクト。
            <ul className="list-disc list-inside ml-4">
              <li>
                position (Array | Number) : 位置 (デフォルト : [0, 0, 0])。
              </li>
              <li>
                rotation (Array | Number) : 回転 (デフォルト : [0, 0, 0])。
              </li>
              <li>
                removeOriginal (Boolean) : 元のメッシュを削除するかどうか
                (デフォルト : true)。
              </li>
              <li>
                offset (Array) : インスタンスの間隔 (デフォルト : [0, 0, 0])。
              </li>
              <li>
                layout (String) : レイアウトの種類 (デフォルト : "line")。
              </li>
              <li>radius (Number) : 円形レイアウトの半径 (デフォルト : 1)。</li>
              <li>
                castShadow (Boolean | null) : 影を落とすかどうか (デフォルト :
                null)。
              </li>
              <li>
                receiveShadow (Boolean | null) : 影を受けるかどうか (デフォルト
                : null)。
              </li>
              <li>
                autoAdd (Boolean) : 自動でシーンに追加 (デフォルト : true)。
              </li>
            </ul>
          </div>
        }
      >
        <p>
          1つのジオメトリを複数のインスタンスとして配置することができます。
          <br />
          インスタンスは、元のメッシュのジオメトリとマテリアルを共有するため、パフォーマンスが向上します。
          <br />
          インスタンスの位置や回転は、offsetやlayoutで指定できます。
        </p>
      </ReferenceContent>

      <CodeBlock>
        {`// 元となるメッシュ
const cube = create.cube()
// cubeを8個のインスタンスとして配置
const instances = create.instances(cube, 8)
`}
      </CodeBlock>

      <p className="mt-4">
        デフォルトでは、元となるメッシュは remove
        されます。元となるメッシュを残したい場合は、removeOriginal を false
        に設定してください。
      </p>
      <div className="mt-4">
        インスタンスの位置は、offset で指定できます。offset
        は、インスタンスの間隔を指定する配列です。
        <br />
        layout を指定することで、インスタンスの配置方法を変更できます。
        <br />
        layout には、"line"、"grid"、"circle"、"cube" の4種類があります。
        <br />
        <ul className="list-disc list-inside ml-4 my-4">
          <li>"line" は、1次元の直線上に配置されます。</li>
          <li>"grid" は、2次元のグリッド状に配置されます。</li>
          <li>"circle" は、円上に配置されます。</li>
          <li>"cube" は、3次元の立方体状に配置されます。</li>
        </ul>
        また、grid、circle、cube に "-xy"、"-xz"、"-yx"、"-yz"、"-zx"、"-zy"
        を付けることで、配置する軸を指定できます。
      </div>
      <p className="mt-4">
        <code>at</code>{" "}
        メソッドを使用して、インスタンスの特定のインデックスにアクセスできます。
        <br />
        各インデックスの位置や回転、スケール、色などを個別に変更することができます。
      </p>
      <CodeBlock>
        {`const cube = create.cube()
const instances = create.instances(cube, 8)

// インスタンスの2番目の位置を変更
instances.at(2).position.set(0, 2, 0)
// インスタンスの3番目のスケールを変更
instances.at(3).scale.set(3, 1, 0)
// インスタンスの色を変更
instances.at(4).color.set("#ff0000")
`}
      </CodeBlock>

      <p className="mt-4">
        また、各インデックスの位置や回転、スケール、色などを get で個別に取得することもできます。
      </p>
      <CodeBlock>
        {`const cube = create.cube()
const instances = create.instances(cube, 8)

// インスタンスの2番目の位置を取得
const position = instances.at(2).position.get()

// インスタンスの2番目の位置を変更 (yのみ1増加)
instances.at(2).position.set(position.x, position.y + 1, position.z)
`}
      </CodeBlock>

      <H2 className="mt-14">コードの例</H2>
      <H3>インスタンスの配置</H3>
      <p>
        以下の例では、create.cube()
        で作成した立方体を8個のインスタンスとして配置しています。
        <br />
        layout を指定しない場合は、デフォルトで "line"
        となり、1次元の直線上に配置されます。
      </p>
      <p className="mt-4">
        インスタンスの間隔は、offset で指定できます。上記の例では、offset を [1,
        0, -1] としているため、x 軸方向に 1、z 軸方向に -1
        の間隔で配置されます。
      </p>
      <Ex1
        className="border mt-4"
        style={{
          width: "240px",
          height: "240px",
        }}
      />
      <CodeBlock>
        {`const { camera, controls, create, animate } = init();
controls.connect();
camera.position.set(0, 4, 4);
create.ambientLight();
create.directionalLight();

// 元となるメッシュ
const cube = create.cube()

// cubeを8個のインスタンスとして配置
const instances = create.instances(cube, 8, {
  // インスタンスの間隔を指定 
  offset: [1, 0, -1],
})

animate();
`}
      </CodeBlock>

      <H3 className="mt-10">平面状に配置する</H3>
      <p>
        layout を "grid"
        に指定することで、2次元のグリッド状に配置することができます。
        <br />
        offset でインスタンスの間隔を指定できます。上記の例では、offset を [1.2,
        0, 1.2] としているため、x 軸方向に 1.2、z 軸方向に 1.2
        の間隔で配置されます。
        <br />
        "grid" は "grid-xz" と同じ意味なので、offset の y
        軸方向の値は無視されます。
      </p>
      <p className="mt-4">
        例えば、layout を "grid-xy" に指定すると、x 軸方向と y
        軸方向に配置できます。
      </p>
      <Ex2
        className="border mt-4"
        style={{
          width: "240px",
          height: "240px",
        }}
      />
      <CodeBlock>
        {`const { camera, controls, create, animate } = init();
controls.connect();
camera.position.set(0, 4, 4);
create.ambientLight();
create.directionalLight();

const cube = create.cube();
const instances = create.instances(cube, 8, {
  layout: "grid",
  offset: [1.2, 0, 1.2],
});

animate();`}
      </CodeBlock>

      <H3 className="mt-10">円状に配置する</H3>
      <p>
        layout を "circle" に指定することで、円状に配置することができます。
        <br />
        radius で円の半径を指定できます。上記の例では、radius を 2
        としているため、半径 2 の円状に配置されます。
      </p>
      <p className="mt-4">
        layout が "circle" の場合、offset
        は無視されます。円状に配置する場合は、radius で半径を指定してください。
      </p>
      <p className="mt-4">
        layout の "circle" は "circle-xz" と同じ意味なので、円の平面は xz
        平面になります。
        <br />
        "circle-xy" に指定すると、円の平面は xy 平面になります。
      </p>
      <Ex3
        className="border mt-4"
        style={{
          width: "240px",
          height: "240px",
        }}
      />
      <CodeBlock>
        {`const { camera, controls, create, animate } = init();
controls.connect();
camera.position.set(0, 4, 4);
create.ambientLight();
create.directionalLight();

const cube = create.cube();
const instances = create.instances(cube, 8, {
  layout: "circle",
  radius: 2,
});

animate();`}
      </CodeBlock>

      <H3 className="mt-10">立方体状に配置する</H3>
      <p>
        layout を "cube"
        に指定することで、3次元の立方体状に配置することができます。
        <br />
        offset でインスタンスの間隔を指定できます。上記の例では、offset を [1.2,
        1.2, 1.2] としているため、x 軸方向に 1.2、y 軸方向に 1.2、z 軸方向に 1.2
        の間隔で配置されます。
      </p>
      <p className="mt-4">
        layout の "cube" は "cube-xy"
        のように並べ始める軸を指定することができます。
      </p>
      <Ex4
        className="border mt-4"
        style={{
          width: "240px",
          height: "240px",
        }}
      />
      <CodeBlock>
        {`const { camera, controls, create, animate } = init();
controls.connect();
camera.position.set(0, 4, 4);
create.ambientLight();
create.directionalLight();

const cube = create.cube();
const instances = create.instances(cube, 8, {
  layout: "cube",
  offset: [1.2, 1.2, 1.2],
});

animate();`}
      </CodeBlock>

      <H3 className="mt-10">特定のインデックスの操作</H3>
      <p>
        インスタンスの特定のインデックスにアクセスするには、<code>at</code>{" "}
        メソッドを使用します。
        <br />
        各インデックスの位置や回転、スケール、色などを個別に変更することができます。
      </p>
      <p className="mt-4">
        例えば、<code>instances.at(0)</code>{" "}
        で最初のインスタンスにアクセスできます。
      </p>
      <p className="mt-4">
        色については元のメッシュの色との乗算になるため、元のメッシュの色を白にしておくと、インスタンスの色を自由に変更できます。
      </p>
      <Ex5
        className="border mt-4"
        style={{
          width: "240px",
          height: "240px",
        }}
      />
      <CodeBlock>
        {`const { camera, controls, create, animate } = init();
controls.connect();
camera.position.set(0, 4, 4);
create.ambientLight();
create.directionalLight();

const cube = create.cube({
  option: {
    color: "#ffffff",
  }
});
const instances = create.instances(cube, 8, {
  layout: "circle",
  radius: 3,
});

// 0番目のインスタンスの位置を (0, 0, 0) に設定する
instances.at(0).position.set(0, 0, 0);

// 1番目のインスタンスの色を赤に設定する
instances.at(1).color.set("#ff0000");

// 2番目のインスタンスを少し回転させる
instances.at(2).rotation.set(Math.PI / 4, Math.PI / 4, 0);

// 3番目のインスタンスを少し大きくする
instances.at(3).scale.set(1.5, 1.5, 1.5);

animate();`}
      </CodeBlock>
    </div>
  );
}

