import CodeBlock from "@/components/CodeBlock";
import ReferenceContent from "@/components/ReferenceContent";
import H1 from "@/components/H1";
import H2 from "@/components/H2";
import H3 from "@/components/H3";
import { Ex1 } from "./Codes";

export const metadata = {
  title: "event.key",
};

export default function Page() {
  return (
    <div>
      <H1>event.key</H1>

      <ReferenceContent
        name="event.key.add"
        args="callback : Function, option: Object"
        returnObject="Function"
        argsInfo={
          <>
            <div>
              <span>callback(key, e)</span>- コールバック関数。
              <ul className="list-disc list-inside ml-4">
                <li>
                  key (String) : イベントが発生した原因となったキー文字列。
                </li>
                <li>e (KeyEvent) : イベントオブジェクト。</li>
              </ul>
            </div>
            <div>
              <span>option</span> - 設定オブジェクト。
              <ul className="list-disc list-inside ml-4">
                <li>
                  type (String) : イベントのリスナータイプ (デフォルト :
                  &quot;once&quot;)。
                </li>
                <li>
                  trigger (String | RegExp) : 追加のイベント発生条件 (デフォルト
                  : /[A-Za-z]/)。
                </li>
              </ul>
            </div>
          </>
        }
      >
        <p>
          キーボードイベント追加関数。
          <br />
          キーボードのイベントに反応する関数を登録します。
          <br />
          キーボードのキーが
        </p>
        <ol className="list-decimal list-inside ml-4">
          <li>押された時</li>
          <li>離された時</li>
          <li>押して離された時</li>
          <li>上記のすべての時</li>
        </ol>
        <p>
          の動作を指定できます。
          <br />
          イベントの登録解除用関数を返します。
        </p>
      </ReferenceContent>

      <p className="mt-4">
        div要素などをキャンバスのコンテナとして利用する場合は、
        その要素のtabIndex属性に0を設定しなければキーイベントを取得できません。
      </p>
      <p className="mt-4">
        また、スマートフォンなどのタッチデバイスにおいては
        ソフトウェアキーボードを表示するための処理が必要となります。<br />
        コンテナにcontentEditable属性を設定しつつコンテナに文字を入れない方法や、input要素をブリッジするなどの方法が考えられます。
      </p>

      <H2 className="mt-14">コードの例</H2>
      <H3>マウスイベントの利用</H3>
      <p>
        キャンバスをクリックしてからキー入力すると、その文字が表示されます。<br />
        スマートフォンなどのタッチデバイスには対応していません。
      </p>
      <Ex1
        className="border my-4"
        style={{
          width: "240px",
          height: "240px",
        }}
      />
      <CodeBlock>
        {`const { camera, create, event, controls, animate } = init()
create.ambientLight();
create.directionalLight();
camera.position.set(0, 0, 1);
controls.connect();

const text = create.text("Press Key", { fontSize: 20 })

event.key.add((key, e) => {
  text.material.map.dispose();
  text.material.map = create.textTexture(key, { fontSize: 140 })
  text.material.needsUpdate = true;
});

animate();
`}
      </CodeBlock>

    </div>
  );
}
