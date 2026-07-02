import CodeBlock from "@/components/CodeBlock";
import ReferenceContent from "@/components/ReferenceContent";
import { Link } from "@/components/BaseKit";
import H1 from "@/components/H1";
import H2 from "@/components/H2";
import H3 from "@/components/H3";

export const metadata = {
  title: "animate",
};

export default function Page() {
  return (
    <div>
      <H1>animate</H1>
      <ReferenceContent
        name="animate"
        args="proc : Function, renderFlag : Boolean"
        returnObject="undefined"
        argsInfo={
          <>
            <div>
              <span>proc({`{ clock, delta, time, frameCount }`})</span> -
              各フレームごとに実行される関数 (デフォルト : {`() => { }`})。
              <ul className="list-disc list-inside ml-4">
                <li>
                  clock (THREE.Clock) : フレーム間の時間を管理するオブジェクト。
                </li>
                <li>
                  delta (Number) : 前回のフレームからの経過時間（秒単位）。
                </li>
                <li>
                  time (Number) : アニメーション開始からの経過時間（秒単位）。
                </li>
                <li>
                  frameCount (Number) : アニメーション開始からのフレーム数。
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

      <H2 className="mt-14">コードの例</H2>
      <H3>アニメーションしない</H3>
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
      <H3 className="mt-10">経過時間を利用する</H3>
      <p>
        proc
        関数の引数に経過時間を受け取り、アニメーションを行うことができます。
      </p>
      <p className="mt-4">
        delta は前回のフレームからの経過時間を秒単位で表したもので、
        とても小さな値 (60fpsの場合、約 0.017) であることに注意してください。
      </p>
      <CodeBlock>
        {`animate(({ delta, time }) => {
  // なんらかの処理
})
`}
      </CodeBlock>
      <H3 className="mt-10">独自のレンダリング</H3>
      <p>
        postprocessing
        の利用時など、独自のレンダリング処理を行う場合は、renderFlag を false
        に設定します。
        <br />
        この場合、レンダリングは明示的に行う必要があります。
      </p>
      <p className="mt-4">
        renderer および scene は <Link className="text-blue-500 underline" href="/reference/base/init">init()</Link>{" "}
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
    </div>
  );
}
