"use client";
import Container from "react-bootstrap/Container";
import CodeBlock from "@/components/CodeBlock";
import ReferenceContent from "@/components/ReferenceContent";
import { Link, Note } from "@/components/BaseKit";

export default function Page() {
  return (
    <Container className="pt-4 pb-5">
      <title>create.object | easy-three</title>
      <h1 className="mb-5">create.object</h1>
      <ReferenceContent
        name="create.object"
        args="geometry : Geometry, props : Object"
        returnObject="Mesh"
        argsInfo={
          <>
            <div>
              <span>geometry</span>
              - 作成するジオメトリのタイプ。
              <br />
              THREE.BoxGeometry, THREE.SphereGeometry, THREE.PlaneGeometry
              など。
            </div>
            <div>
              <span>props</span>- 設定オブジェクト。
              <ul>
                <li>
                  args (Array | Number) : ジオメトリの引数 (デフォルト : [1, 1,
                  1]、ジオメトリによって次元は異なる)。
                </li>
                <li>position (Array) : 位置 (デフォルト : [0, 0, 0])。</li>
                <li>rotation (Array) : 回転 (デフォルト : [0, 0, 0])。</li>
                <li>
                  option (Object) : オプション (デフォルト :{" "}
                  {`{color: Default.color }`})。
                </li>
                <li>
                  material (String) : マテリアルタイプ (デフォルト :
                  {`Default.material`})。
                </li>
                <li>
                  castShadow (Boolean) : 別のオブジェクトに影を落とすかどうか
                  (デフォルト : true)。
                </li>
                <li>
                  receiveShadow (Boolean) :
                  別のオブジェクトからの影を受けるかどうか (デフォルト : true)。
                </li>
                <li>
                  autoAdd (Boolean) : 自動でシーンに追加 (デフォルト : true)。
                </li>
              </ul>
            </div>
          </>
        }
      >
        <p>指定したジオメトリを元にメッシュを作成します。</p>
        <p>
          <Note>create.object は基本的に使いません。</Note>
          <br />
          既存の create.cube、create.sphere
          などのメソッドで作成できないメッシュを作成する場合に利用してください。
        </p>
      </ReferenceContent>

      <h2>コードの例</h2>
      <h4>create.cube の代用</h4>
      <p>
        create.cube などのメッシュを作成するメソッドは、基本的に内部で
        create.object を使用しています。
      </p>
      <CodeBlock>
        {`const { camera, create, animate, THREE } = init();

camera.position.set(0, 0, 3)

create.object(new THREE.BoxGeometry, {
  args: [1, 1, 1],
});
`}
      </CodeBlock>
    </Container>
  );
}
