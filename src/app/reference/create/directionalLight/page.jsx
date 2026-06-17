import CodeBlock from "@/components/CodeBlock";
import ReferenceContent from "@/components/ReferenceContent";
import H1 from "@/components/H1";
import H2 from "@/components/H2";
import H3 from "@/components/H3";
import { Ex1, Ex2, Ex3 } from "./Codes";

export const metadata = {
  title: "create.directionalLight",
};

export default function Reference_Create_DirectionalLight() {
  return (
    <div>
      <H1>create.directionalLight</H1>

      <ReferenceContent
        name="create.directionalLight"
        args="props : Object"
        returnObject="Light"
        argsInfo={
          <div>
            <span>props</span> - 設定オブジェクト。
            <ul className="list-disc list-inside ml-4">
              <li>intensity (Number) : 光の強さ (デフォルト : 1)。</li>
              <li>color (Hex) : ライトの色 (デフォルト : 0xffffff)。</li>
              <li>
                position (Array) : ライトの位置 (デフォルト : [10, 10, 10])。
              </li>
              <li>
                castShadow (Boolean) : 影を投影するかどうか (デフォルト :
                true)。
              </li>
              <li>
                shadow (Object) : シャドウの設定。
                <ul className="list-disc list-inside ml-4 border rounded p-2">
                  <li>
                    mapSize (Object) : シャドウマップのサイズ (デフォルト :{" "}
                    {`{width: 1024, height: 1024 }`})。
                  </li>
                  <li>
                    camera (Object) : シャドウカメラの設定。
                    <ul className="list-disc list-inside ml-4 border rounded p-2">
                      <li>
                        left (Number) : カメラの左範囲 (デフォルト : -10)。
                      </li>
                      <li>
                        right (Number) : カメラの右範囲 (デフォルト : 10)。
                      </li>
                      <li>top (Number) : カメラの上範囲 (デフォルト : 10)。</li>
                      <li>
                        bottom (Number) : カメラの下範囲 (デフォルト : -10)。
                      </li>
                      <li>
                        near (Number) : カメラの近距離 (デフォルト : 0.5)。
                      </li>
                      <li>
                        far (Number) : カメラの遠距離 (デフォルト : 500)。
                      </li>
                    </ul>
                  </li>
                  <li>bias (Number) : シャドウバイアス (デフォルト : 0)。</li>
                </ul>
              </li>
              <li>helper (Number) : ヘルパーのサイズ (デフォルト : 0)。</li>
              <li>
                helperColor (Hex) : ヘルパーの色 (デフォルト : 0xffffff)。
              </li>
            </ul>
          </div>
        }
      >
        <p>平行光源を作成してシーンに追加します。</p>
      </ReferenceContent>

      <p className="mt-4">
        この光源は、シーン全体に均等に光を当てる環境光とは異なり、特定の方向からの光を当てることができます。
        <br />
        そのため、影を作成することができます。
      </p>
      <p className="mt-4">
        GLTFモデルの表面に波紋状の縞模様が表示される場合は、shadow.bias に小さい値(0.0001 や -0.0001) を設定してください。
      </p>

      <H2 className="mt-14">コードの例</H2>
      <H3>並行光源</H3>
      <Ex1
        className="border"
        style={{
          width: "240px",
          height: "240px",
        }}
      />
      <CodeBlock>
        {`const { camera, create, animate } = init()
camera.position.set(0, 0, 2)
create.directionalLight()

const cube = create.cube()

animate(({ delta }) => {
  cube.rotation.x += delta;
  cube.rotation.y += delta;
});
`}
      </CodeBlock>
      <H3 className="mt-10">光量を変化させる</H3>
      <Ex2
        className="border"
        style={{
          width: "240px",
          height: "240px",
        }}
      />
      <CodeBlock>
        {`const { camera, create, animate } = init()
camera.position.set(0, 0, 2)
const directionalLight = create.directionalLight()

const cube = create.cube()

animate(({ delta, time }) => {
  cube.rotation.x += delta;
  cube.rotation.y += delta;
  directionalLight.intensity = Math.sin(time) * 0.5 + 0.5;
});
`}
      </CodeBlock>
      <H3 className="mt-10">ヘルパーの利用</H3>
      <p>helperに0より大きい値を指定すると、ヘルパーが表示されます。</p>
      <Ex3
        className="border my-4"
        style={{
          width: "240px",
          height: "240px",
        }}
      />
      <CodeBlock>
        {`const { camera, create, animate } = init()
camera.position.set(0, 0, 3);
create.directionalLight({
  position: [0.6, 0.6, 1.6],
  helper: 0.1,
  helperColor: 0xff0000,
});

const cube = create.cube()

animate(({ delta }) => {
  cube.rotation.x += delta;
  cube.rotation.y += delta;
});
`}
      </CodeBlock>
    </div>
  );
}
