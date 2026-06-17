import CodeBlock from "@/components/CodeBlock";
import ReferenceContent from "@/components/ReferenceContent";
import H1 from "@/components/H1";
import H2 from "@/components/H2";
import H3 from "@/components/H3";
import { Ex1, Ex2 } from "./Codes";

export const metadata = {
  title: "postprocessing.glitch",
};

export default function Page() {
  return (
    <div>
      <H1>postprocessing.glitch</H1>
      <ReferenceContent
        name="postprocessing.glitch"
        args="props : Object"
        returnObject="Object"
        argsInfo={
          <>
            <div>
              <span>props</span> - 設定オブジェクト。
              <ul className="list-disc list-inside ml-4">
                <li>wild (Boolean) : ワイルドモード (デフォルト : false)。</li>
              </ul>
            </div>
          </>
        }
      >
        Glitch エフェクトを追加します。
        <br />
        戻り値は、glitch のみのオブジェクトです。
        <br />
        戻り値の glitch は、animate の中で呼び出すことでエフェクトを適用します。
        <br />
        animate の第2引数を false にしてください。
      </ReferenceContent>

      <H2 className="mt-14">コードの例</H2>
      <H3>グリッチエフェクト</H3>
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

const torusKnot = create.torusKnot({ size: 0.5, tube: 0.16 })

const { glitch } = postprocessing.glitch()

animate(({ delta }) => {
  torusKnot.rotation.x += delta
  torusKnot.rotation.y += delta
  glitch()
}, false)
`}
      </CodeBlock>
      <H3 className="mt-10">激しいエフェクト</H3>
      <Ex2
        className="border"
        style={{
          width: "240px",
          height: "240px",
        }}
      />
      <CodeBlock>
        {`const { camera, create, animate, load, postprocessing } = init()

camera.position.set(0, 0, 2)

create.ambientLight()
create.directionalLight()

const torusKnot = create.torusKnot({ size: 0.5, tube: 0.16 })

const { glitch } = postprocessing.glitch({ wild: true })

animate(({ delta }) => {
  torusKnot.rotation.x += delta
  torusKnot.rotation.y += delta
  glitch()
}, false)
`}
      </CodeBlock>
    </div>
  );
}
