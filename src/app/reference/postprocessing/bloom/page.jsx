import CodeBlock from "@/components/CodeBlock";
import ReferenceContent from "@/components/ReferenceContent";
import { Link } from "@/components/BaseKit";
import { Ex1, Ex2 } from "./Codes";
import H1 from "@/components/H1";
import H2 from "@/components/H2";
import H3 from "@/components/H3";

export const metadata = {
  title: "postprocessing.bloom",
};

export default function Page() {
  return (
    <div>
      <H1>postprocessing.bloom</H1>
      <ReferenceContent
        name="postprocessing.bloom"
        args="props : Object"
        returnObject="Object"
        argsInfo={
          <>
            <div>
              <span>props</span> - 設定オブジェクト。
              <ul className="list-disc list-inside ml-4">
                <li>exposure (Number) : 曝光度 (デフォルト : 1)。</li>
                <li>background (Color) : 背景色 (デフォルト : 0x000000)。</li>
                <li>threshold (Number) : 閾値 (デフォルト : 0)。</li>
                <li>strength (Number) : ブルームの強さ (デフォルト : 1)。</li>
                <li>radius (Number) : ブラー半径 (デフォルト : 0.5)。</li>
              </ul>
            </div>
          </>
        }
      >
        <p>
          Bloomエフェクトを追加します。
          <br />
          曝光度、背景色、閾値、強さ、半径を設定できます。
          <br />
          戻り値は、bloom のみのオブジェクトです。
          <br />
          戻り値の bloom は、animate の中で呼び出すことでエフェクトを適用します。
          <br />
          animate の第2引数を false にしてください。
        </p>
      </ReferenceContent>

      <p className="mt-4">
        Bloomエフェクトは、画面の全ての明るい部分をぼかして輝かせるエフェクトです。
        <br />
        そのため、背景画像に対しても効果があります。
        <br />
        もし個別のオブジェクトにだけBloomエフェクトを適用したい場合は、
        <Link
          className="text-blue-500 underline"
          href="/reference/postprocessing/selectedBloom/">selectedBloom</Link>
        を使用してください。
      </p>


      <H2 className="mt-10">コードの例</H2>
      <H3>ブルームエフェクト</H3>
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

const { bloom } = postprocessing.bloom()

animate(({ delta }) => {
  cube.rotation.x += delta
  cube.rotation.y += delta
  bloom()
}, false)
`}
      </CodeBlock>
      <H3 className="mt-14">時間とともに輝度を変更する</H3>
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

const { bloom } = postprocessing.bloom()

animate(({ delta, time }) => {
  cube.rotation.x += delta
  cube.rotation.y += delta
  bloom({
    strength: 2 * Math.abs(Math.sin(time))
  })
}, false)
`}
      </CodeBlock>
    </div>
  );
}
