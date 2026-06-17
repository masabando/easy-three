import CodeBlock from "@/components/CodeBlock";
import ReferenceContent from "@/components/ReferenceContent";
import { Ex1 } from "./Codes";
import H1 from "@/components/H1";
import H2 from "@/components/H2";
import H3 from "@/components/H3";

export const metadata = {
  title: "event.mouse",
};

export default function Page() {
  return (
    <div>
      <H1>event.mouse</H1>

      <ReferenceContent
        name="event.mouse.add"
        args="callback : Function, option: Object"
        returnObject="Function"
        argsInfo={
          <>
            <div>
              <span>callback(pos, e)</span>- コールバック関数。
              <ul className="list-disc list-inside ml-4">
                <li>
                  pos (THREE.Vector2) :
                  イベントが発生したオブジェクトに対する発生場所の相対座標。
                </li>
                <li>e (PointerEvents) : イベントオブジェクト。</li>
              </ul>
            </div>
            <div>
              <span>option</span> - 設定オブジェクト。
              <ul className="list-disc list-inside ml-4">
                <li>
                  type (String) : イベントのリスナータイプ (デフォルト :
                  &quot;once&quot;)。
                </li>
              </ul>
            </div>
          </>
        }
      >
        <p>
          マウスイベント追加関数。
          <br />
          マウスのクリックイベントに反応する関数を登録します。
          <br />
          マウスのクリックが
        </p>
        <ol className="list-decimal list-inside ml-4 my-4">
          <li>押された時</li>
          <li>離された時</li>
          <li>押して離された時</li>
          <li>動かされた時</li>
          <li>上記のすべての時</li>
        </ol>
        <p>
          の動作を指定できます。
          <br />
          イベントの登録解除用関数を返します。
        </p>
      </ReferenceContent>

      <H2 className="mt-14">コードの例</H2>
      <H3>マウスイベントの利用</H3>
      <p>キャンバスをクリックすると、立方体が拡大します。</p>
      <Ex1
        className="border my-4"
        style={{
          width: "240px",
          height: "240px",
        }}
      />
      <CodeBlock>
        {`const { camera, create, event, helper, animate } = init()
create.ambientLight();
create.directionalLight();
camera.position.set(-2, 2, 2);

const cube = create.cube();

helper.grid();
helper.axes();

let scale = 1;
event.mouse.add((pos, e) => {
  scale += 0.2;
  cube.scale.set(scale, scale, scale);
});

animate();
`}
      </CodeBlock>
    </div>
  );
}
