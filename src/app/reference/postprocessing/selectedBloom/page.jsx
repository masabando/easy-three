import CodeBlock from "@/components/CodeBlock";
import ReferenceContent from "@/components/ReferenceContent";
import { Ex1, Ex2 } from "./Code";
import H1 from "@/components/H1";
import H2 from "@/components/H2";
import H3 from "@/components/H3";

export const metadata = {
  title: "postprocessing.selectedBloom",
};


export default function Page() {
  return (
    <div>
      <H1>postprocessing.selectedBloom</H1>
      <ReferenceContent
        name="postprocessing.selectedBloom"
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
          オブジェクトを限定したBloomエフェクトを追加します。
          <br />
          曝光度、背景色、閾値、強さ、半径を設定できます。
          <br />
          戻り値は、selectedBloom と addSelectedBloom のオブジェクトです。
          <br />
          戻り値の selectedBloom は、animate
          の中で呼び出すことでエフェクトを適用します。
          <br />
          animate の第2引数を false にしてください。
          <br />
          addSelectedBloom
          は、引数で選択したオブジェクトにエフェクトを適用します。
        </p>
      </ReferenceContent>

      <H2 className="mt-14">コードの例</H2>
      <H3>選択的ブルームエフェクト</H3>
      <Ex1
        className="border"
        style={{
          width: "240px",
          height: "240px",
        }}
      />
      <CodeBlock>
        {`const { camera, create, animate, postprocessing } = init();

camera.position.set(0, 0, 2)

create.ambientLight()
create.directionalLight()

const cube1 = create.cube({
  size: 0.5,
  position: [-0.7, 0, 0]
})
const cube2 = create.cube({
  size: 0.5,
  position: [0.7, 0, 0]
})
const sphere = create.sphere({
  size: 0.3,
  position: [0, 0.8, 0]
})

// use selectedBloom
const { selectedBloom, addSelectedBloom } = postprocessing.selectedBloom()
// add Object3D to selectedBloom
addSelectedBloom(cube1, sphere)

animate(({ delta }) => {
  cube1.rotation.x += delta
  cube1.rotation.y += delta
  cube2.rotation.x += delta
  cube2.rotation.y += delta

  // render
  selectedBloom()
}, false)
`}
      </CodeBlock>
      <H3 className="mt-10">時間とともに輝度を変更する</H3>
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

const cube1 = create.cube({
  size: 0.5,
  position: [-0.7, 0, 0]
})
const cube2 = create.cube({
  size: 0.5,
  position: [0.7, 0, 0]
})
const sphere = create.sphere({
  size: 0.3,
  position: [0, 0.8, 0]
})

const { selectedBloom, addSelectedBloom } = postprocessing.selectedBloom()
addSelectedBloom(cube1, sphere)

animate(({ delta, time }) => {
  cube1.rotation.x += delta
  cube1.rotation.y += delta
  cube2.rotation.x += delta
  cube2.rotation.y += delta
  selectedBloom({
    strength: 2 * Math.abs(Math.sin(time))
  })
}, false)
`}
      </CodeBlock>
    </div>
  );
}
