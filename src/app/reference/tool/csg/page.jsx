import CodeBlock from "@/components/CodeBlock";
import ReferenceContent from "@/components/ReferenceContent";
import { Ex1, Ex2 } from "./Codes";
import H1 from "@/components/H1";
import H2 from "@/components/H2";
import H3 from "@/components/H3";

export const metadata = {
  title: "tool.csg",
};

export default function Page() {
  return (
    <div>
      <H1>tool.csg</H1>

      <ReferenceContent
        name="tool.csg"
        args="mesh1: Mesh, mesh2: Mesh, props?"
        returnObject="Mesh"
        argsInfo={
          <div>
            <span>mesh1</span> - 最初のメッシュ。<br />
            <span>mesh2</span> - 2番目のメッシュ。<br />
            <span>props</span> - その他のプロパティ (オプション)。
            <ul className="list list-disc list-inside ml-4">
              <li>
                <span>mode</span> - CSG のモード。(デフォルト: "subtract")<br />
                <ul className="list list-disc list-inside ml-4">
                  <li><code>"add"</code> - 加算 (ADDITION)</li>
                  <li><code>"subtract"</code> - 減算 (SUBTRACTION)</li>
                  <li><code>"reverseSubtract"</code> - 逆減算 (REVERSE_SUBTRACTION)</li>
                  <li><code>"difference"</code> - 差分 (DIFFERENCE)</li>
                  <li><code>"intersect"</code> - 交差 (INTERSECTION)</li>
                </ul>
              </li>
              <li><span>dispose</span> - 元のメッシュのジオメトリとマテリアルを破棄するかどうか。デフォルトは true。</li>
              <li><span>remove</span> - 元のメッシュをシーンから削除するかどうか。デフォルトは true。</li>
            </ul>
          </div>
        }
      >
        メッシュ同士のブーリアン演算を行い、新しいメッシュを生成します。<br />
        元のメッシュは、props の設定に応じて破棄またはシーンから削除されます。<br />
        新しいメッシュの位置、回転、マテリアルなどの情報は、最初のメッシュ (mesh1) の情報を引き継ぎます。
      </ReferenceContent>

      <H2 className="mt-14">使用例</H2>
      <p className="mt-4">
        2つのメッシュを引数にして <code>tool.csg()</code> を呼び出すことで、ブーリアン演算が行われます。<br />
        基本は減算 (subtract) ですが、props の mode を変更することで、加算や交差などの演算も可能です。
      </p>
      <CodeBlock language="javascript">
        {`tool.csg(mesh1, mesh2);`}
      </CodeBlock>

      <p className="mt-4">加算の場合は次のようになります。</p>
      <CodeBlock language="javascript">
        {`tool.csg(mesh1, mesh2, { mode: "add" });`}
      </CodeBlock>


      <H2 className="mt-14">サンプルコード</H2>
      <H3>立方体から球を減算</H3>
      <p>
        長さ1の立方体と、半径0.7の球を用意し、立方体から球を減算する例です。<br />
        立方体と球は、CSG 演算後にシーンから削除されます。
      </p>
      <Ex1
        className="border mt-4"
        style={{
          width: "240px",
          height: "240px",
          position: "relative",
        }}
      />
      <CodeBlock language="javascript">
        {`const { camera, create, animate, controls, tool } = init();
camera.position.set(0, 1.6, 2)
controls.connect()

create.ambientLight();
create.directionalLight();
create.sky()

const cube = create.cube();

const sphere = create.sphere({
  size: 0.7,
});

tool.csg(cube, sphere)

animate();`}
      </CodeBlock>

      <H3>立方体から球を減算</H3>
      <p>
        長さ1の立方体と、半径0.7の球を用意し、立方体から球を減算する例です。<br />
        こちらの例では、立方体と球は、CSG 演算後も削除されません。<br />
        立方体は autoAdd: false に設定されているため、シーンには追加されず、演算後のメッシュと球のみがシーンに残ります。
      </p>
      <Ex2
        className="border mt-4"
        style={{
          width: "240px",
          height: "240px",
          position: "relative",
        }}
      />
      <CodeBlock language="javascript">
        {`const { camera, create, animate, controls, tool } = init();
camera.position.set(0, 1.6, 2)
controls.connect()

create.ambientLight();
create.directionalLight();
create.sky()

const cube = create.cube({
  autoAdd: false
});

const sphere = create.sphere({
  size: 0.7,
  option: {
    color: 0xffcccc,
    transmission: 0.9,
    roughness: 0,
    thickness: 0.5,
  }
});

tool.csg(cube, sphere, {
  dispose: false,
  remove: false,
})

animate();`}
      </CodeBlock>

    </div>
  );
}
