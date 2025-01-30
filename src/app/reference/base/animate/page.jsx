"use client";
import Container from "react-bootstrap/Container";
import CodeBlock from "@/components/CodeBlock";
import ReferenceContent from "@/components/ReferenceContent";
import { Link } from "@/components/BaseKit";

export default function Page() {
  return (
    <Container className="pt-4 pb-5">
      <title>animate | easy-three</title>
      <h1 className="mb-5">animate</h1>
      <ReferenceContent
        name="animate"
        args="proc : Function, renderFlag : Boolean"
        returnObject="undefined"
        argsInfo={
          <>
            <div>
              <span>proc({`{ clock, delta, time }`})</span> -
              各フレームごとに実行される関数 (デフォルト : {`() => { }`})。
              <ul>
                <li>
                  clock (THREE.Clock) : フレーム間の時間を管理するオブジェクト。
                </li>
                <li>
                  delta (Number) : 前回のフレームからの経過時間（秒単位）。
                </li>
                <li>
                  time (Number) : アニメーション開始からの経過時間（秒単位）。
                </li>
              </ul>
            </div>
            <div>
              <span>renderFlag</span> - レンダリングするかどうか (デフォルト :
              true)。
            </div>
          </>
        }
      >
        アニメーションループを開始します。
        <br />
        指定した関数を各フレームごとに実行し、レンダリングを行います。
      </ReferenceContent>

      <h2>コードの例</h2>
      <h4>アニメーションしない</h4>
      <p>
        特にアニメーションするものがない場合、animate()
        のみでレンダリングを行います。
        <br />
        通常、animate() は3D描画の最後で呼び出します。
      </p>
      <CodeBlock>
        {`animate();
`}
      </CodeBlock>
      <h4 className="mt-5">経過時間を利用する</h4>
      <p>
        proc
        関数の引数に経過時間を受け取り、アニメーションを行うことができます。
      </p>
      <p>
        delta は前回のフレームからの経過時間を秒単位で表したもので、
        とても小さな値 (60fpsの場合、約 0.017) であることに注意してください。
      </p>
      <CodeBlock>
        {`animate(({ delta, time }) => {
  // なんらかの処理
})
`}
      </CodeBlock>
      <h4 className="mt-5">独自のレンダリング</h4>
      <p>
        postprocessing
        の利用時など、独自のレンダリング処理を行う場合は、renderFlag を false
        に設定します。
        <br />
        この場合、レンダリングは明示的に行う必要があります。
      </p>
      <p>
        renderer および scene は <Link href="/reference/base/init">init()</Link>{" "}
        の戻り値から取得できます。
        <br />
        以下のコードにおける animate
        は、上記のアニメーションしない例と同じ処理になります。
      </p>
      <CodeBlock>
        {`const { renderer, scene, camera, create, animate } = init();

...

animate(() => {
  renderer.render(scene, camera)
}, false)
`}
      </CodeBlock>
    </Container>
  );
}
