import CodeBlock from "@/components/CodeBlock";
import ReferenceContent from "@/components/ReferenceContent";
import H1 from "@/components/H1";
import H2 from "@/components/H2";
import H3 from "@/components/H3";
import { Ex1, Ex2, Ex3 } from "./Codes";

export const metadata = {
  title: "create.pointLight",
};

export default function Reference_Create_PointLight() {
  return (
    <div>
      <H1>create.pointLight</H1>
      <ReferenceContent
        name="create.pointLight"
        args="props : Object"
        returnObject="Light"
        argsInfo={
          <div>
            <span>props</span> - 設定オブジェクト。
            <ul className="list-disc list-inside ml-4">
              <li>color (Hex) : ライトの色 (デフォルト : 0xffffff)。</li>
              <li>intensity (Number) : 光の強さ (デフォルト : 1)。</li>
              <li>distance (Number) : ライトの距離 (デフォルト : 0)。</li>
              <li>decay (Number) : 光の減衰率 (デフォルト : 2)。</li>
              <li>position (Array) : 位置 (デフォルト : [6, 6, 6])。</li>
              <li>
                castShadow (Boolean) : 影を投影するかどうか (デフォルト :
                true)。
              </li>
              <li>
                shadow (Object) : シャドウの設定 (デフォルト :{" "}
                {`{width: 1024, height: 1024}`})。
              </li>
              <li>helper (Number) : ヘルパーのサイズ (デフォルト : 0)。</li>
              <li>
                helperColor (Hex) : ヘルパーの色 (デフォルト : 0xffffff)。
              </li>
            </ul>
          </div>
        }
      >
        点光源を作成してシーンに追加します。
      </ReferenceContent>

      <H2 className="mt-14">コードの例</H2>
      <H3>点光源</H3>
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
create.pointLight({
  position: [0, 0, 2],
});

const cube = create.cube()

animate(({ delta }) => {
  cube.rotation.x += delta;
  cube.rotation.y += delta;
});
`}
      </CodeBlock>
      <H3 className="mt-10">光量を変化させる</H3>
      <p>intensity で光量を変化させることができます。</p>
      <Ex2
        className="border my-4"
        style={{
          width: "240px",
          height: "240px",
        }}
      />
      <CodeBlock>
        {`const { camera, create, animate } = init()
camera.position.set(0, 0, 2)
const pointLight = create.pointLight({
  position: [0, 0, 2],
});

const cube = create.cube()

animate(({ delta, time }) => {
  cube.rotation.x += delta;
  cube.rotation.y += delta;
  pointLight.intensity = Math.sin(time) * 1 + 1;
});
`}
      </CodeBlock>

      <H3 className="mt-10">ヘルパーの利用</H3>
      <p>ヘルパーを利用することで、ライトの位置を視覚的に確認することができます。<br />
      ヘルパーのサイズは helper で指定できます。<br />
      ヘルパーの色は helperColor で指定できます。</p>
      <Ex3
        className="border my-4"
        style={{
          width: "240px",
          height: "240px",
        }}
      />
      <CodeBlock>
        {`const { camera, create, animate } = init()
camera.position.set(0, 0, 2);

const pointLight = create.pointLight({
  position: [0, 0, 1],
  helper: 0.1,
  helperColor: 0xff0000,
});

const cube = create.cube();

animate(({ delta, time }) => {
  cube.rotation.x += delta;
  cube.rotation.y += delta;
  pointLight.position.set(
    Math.sin(time),
    0,
    Math.cos(time)
  )
});
`}
      </CodeBlock>
    </div>
  );
}
