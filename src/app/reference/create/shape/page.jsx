import CodeBlock from "@/components/CodeBlock";
import ReferenceContent from "@/components/ReferenceContent";
import H1 from "@/components/H1";
import H2 from "@/components/H2";
import H3 from "@/components/H3";
import { Ex1, Ex2 } from "./Codes";

export const metadata = {
  title: "create.shape",
};

export default function Reference_Create_Shape() {
  return (
    <div>
      <H1>create.shape</H1>
      <ReferenceContent
        name="create.shape"
        args="props : Object"
        returnObject="Mesh"
        argsInfo={
          <div>
            <span>props</span> - 設定オブジェクト。
            <ul className="list-disc list-inside ml-4">
              <li>shapes (Array) : シェイプの配列 (デフォルト : [])。</li>
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
        }
      >
        <p>任意の形のシェイプを作成してシーンに追加します。</p>
      </ReferenceContent>
      <p className="mt-4">
        直線を用いる場合、shapes には position として 2要素 (x, y)
        の配列をもつオブジェクトの配列を指定します。
      </p>
      <CodeBlock>{`create.shape({
  shapes: [
    { position: [0, 0] },
    { position: [1, 0] },
    { position: [1, 1] },
    { position: [0, 1] }
  ]
})`}</CodeBlock>
      <p className="mt-4">
        ベジエ曲線を用いる場合、shapes には position として 6要素 (cp1X, cp1Y,
        cp2X, cp2Y, x, y) の配列をもつオブジェクトの配列を指定し、 type に
        "curve" を指定します。
        <br />
        この場合、cp1 は制御点1(始点側の制御点)、cp2 は制御点2(終点側の制御点)、x, y は終点を表します。
      </p>
      <CodeBlock>{`create.shape({
  shapes: [
    { position: [0, 0] },
    { position: [0.2, 0.3, 0.8, 0.3, 1, 0], type: "curve" },
    { position: [0.7, 0.2, 0.7, 0.8, 1, 1], type: "curve" },
    { position: [0.8, 0.7, 0.2, 0.7, 0, 1], type: "curve" },
    { position: [0.3, 0.8, 0.3, 0.2, 0, 0], type: "curve" }
  ]
})`}</CodeBlock>

      <H2 className="mt-14">コードの例</H2>
      <H3>直線によるシェイプ</H3>
      <Ex1
        className="border"
        style={{
          width: "240px",
          height: "240px",
        }}
      />
      <CodeBlock>
        {`const { camera, create, animate, THREE, Default } = init()
camera.position.set(0, 0, 2)
create.ambientLight()
create.directionalLight()

const shape = create.shape({
  shapes: [
    { position: [0, 0] },
    { position: [1, 0] },
    { position: [1, 1] },
    { position: [0, 1] }
  ],
  option: {
    color: Default.color,
    side: THREE.DoubleSide
  }
});

animate(({ delta }) => {
  shape.rotation.x += delta;
  shape.rotation.y += delta;
});
`}
      </CodeBlock>

      <H3 className="mt-10">ベジエ曲線を使ったシェイプ</H3>
      <Ex2
        className="border"
        style={{
          width: "240px",
          height: "240px",
        }}
      />
      <CodeBlock>
        {`const { camera, create, animate, THREE, Default } = init()
camera.position.set(0, 0, 2)
create.ambientLight()
create.directionalLight()

const shape = create.shape({
  shapes: [
    { position: [0, 0] },
    { position: [0.2, 0.3, 0.8, 0.3, 1, 0], type: "curve" },
    { position: [0.7, 0.2, 0.7, 0.8, 1, 1], type: "curve" },
    { position: [0.8, 0.7, 0.2, 0.7, 0, 1], type: "curve" },
    { position: [0.3, 0.8, 0.3, 0.2, 0, 0], type: "curve" }
  ],
  option: {
    color: Default.color,
    side: THREE.DoubleSide,
  },
});

animate(({ delta }) => {
  shape.rotation.x += delta;
  shape.rotation.y += delta;
})
`}
      </CodeBlock>
    </div>
  );
}
