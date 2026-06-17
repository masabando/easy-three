import CodeBlock from "@/components/CodeBlock";
import ReferenceContent from "@/components/ReferenceContent";
import { Ex1, Ex2 } from "./Code";
import H1 from "@/components/H1";
import H2 from "@/components/H2";
import H3 from "@/components/H3";

export const metadata = {
  title: "postprocessing.pixel",
};

export default function Page() {
  return (
    <div>
      <H1>postprocessing.pixel</H1>
      <ReferenceContent
        name="postprocessing.pixel"
        args="props : Object"
        returnObject="Object"
        argsInfo={
          <>
            <div>
              <span>props</span> - 設定オブジェクト。
              <ul className="list-disc list-inside ml-4">
                <li>size (Number) : ピクセルサイズ (デフォルト : 6)。</li>
                <li>
                  normalEdge (Number) : 法線エッジの強さ (デフォルト : 0.3)。
                </li>
                <li>
                  depthEdge (Number) : 深度エッジの強さ (デフォルト : 0.4)。
                </li>
              </ul>
            </div>
          </>
        }
      >
        <p>
          Pixelエフェクトを追加します。
          <br />
          ピクセルサイズ、法線エッジの強さ、深度エッジの強さを設定できます。
          <br />
          戻り値は、pixel のみのオブジェクトです。
          <br />
          戻り値の pixel は、animate の中で呼び出すことでエフェクトを適用します。
          <br />
          animate の第2引数を false にしてください。
        </p>
      </ReferenceContent>

      <H2 className="mt-14">コードの例</H2>
      <H3>ピクセルエフェクト</H3>
      <Ex1
        className="border"
        style={{
          width: "240px",
          height: "240px",
        }}
      />
      <CodeBlock>
        {`const { camera, create, animate, postprocessing } = init()

camera.position.set(0, 0, 2)

create.ambientLight()
create.directionalLight()

const cube = create.cube()

const { pixel } = postprocessing.pixel()

animate(({ delta }) => {
  cube.rotation.x += delta
  cube.rotation.y += delta
  pixel()
}, false)
`}
      </CodeBlock>
      <H3 className="mt-14">時間とともにピクセルサイズを変更する</H3>
      <Ex2
        className="border"
        style={{
          width: "240px",
          height: "240px",
        }}
      />
      <CodeBlock>
        {`const { camera, create, animate, postprocessing } = init()

camera.position.set(0, 0, 2)

create.ambientLight()
create.directionalLight()

const cube = create.cube()

const { pixel } = postprocessing.pixel()

animate(({ delta, time }) => {
  cube.rotation.x += delta
  cube.rotation.y += delta
  pixel({
    size: ~~(6 + 5 * Math.sin(time))
  })
}, false)
`}
      </CodeBlock>
    </div>
  );
}
