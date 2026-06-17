import CodeBlock from "@/components/CodeBlock";
import ReferenceContent from "@/components/ReferenceContent";
import { Ex1, Ex2 } from "./Codes";
import H1 from "@/components/H1";
import H2 from "@/components/H2";
import H3 from "@/components/H3";

export const metadata = {
  title: "postprocessing.mask",
};

export default function Page() {
  return (
    <div>
      <H1>postprocessing.mask</H1>
      <ReferenceContent
        name="postprocessing.mask"
        args="texture : Texture"
        returnObject="Object"
        argsInfo={
          <>
            <div>
              <span>texture</span> - マスクテクスチャ。
            </div>
          </>
        }
      >
        Maskエフェクトを追加します。
        <br />
        戻り値は、mask のみのオブジェクトです。
        <br />
        戻り値の mask は、animate の中で呼び出すことでエフェクトを適用します。
        <br />
        animate の第2引数を false にしてください。
      </ReferenceContent>
      <H2 className="mt-14">コードの例</H2>
      <H3>マスクエフェクト</H3>
      <Ex1
        className="border"
        style={{
          width: "240px",
          height: "240px",
        }}
      />
      <CodeBlock>
        {`const { camera, create, animate, load, postprocessing } = init()

camera.position.set(0, 0, 2)

const torusKnot = create.torusKnot({ size: 0.5, tube: 0.16 })

const texture = load.texture("path_to_texture_file.jpg")

const { mask } = postprocessing.mask(texture)

animate(({ delta, time }) => {
  torusKnot.rotation.x += delta
  torusKnot.rotation.y += delta
  mask(time)
}, false)
`}
      </CodeBlock>
      <H3 className="mt-10">HDR画像をテクスチャとして使う</H3>
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

const torusKnot = create.torusKnot({ size: 0.5, tube: 0.16 })

const texture = load.background("path_to_HDR_file.hdr", {
  background: false,
  environment: false
})

const { mask } = postprocessing.mask(texture)

animate(({ delta, time }) => {
  torusKnot.rotation.x += delta
  torusKnot.rotation.y += delta
  mask(time)
}, false)
`}
      </CodeBlock>
    </div>
  );
}
