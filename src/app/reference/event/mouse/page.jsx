"use client";
import Container from "react-bootstrap/Container";
import CodeBlock from "@/components/CodeBlock";
import { useEffect, useRef } from "react";
import { init } from "@dist/easy-three.js";
import { noto } from "@/app/layout";
import ReferenceContent from "@/components/ReferenceContent";
import { Note, Link } from "@/components/BaseKit";

function Ex1(props) {
  const ref = useRef();
  useEffect(() => {
    const { camera, create, event, helper, animate, destroy } = init(
      ref.current
    );
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
    return () => {
      destroy();
    };
  }, []);
  return <div ref={ref} {...props}></div>;
}

export default function Page() {
  return (
    <Container className="pt-4 pb-5">
      <title>event.mouse | easy-three</title>
      <h1>event.mouse</h1>

      <ReferenceContent
        name="event.mouse.add"
        args="callback : Function, option: Object"
        returnObject="Function"
        argsInfo={
          <>
            <div>
              <span>callback(pos, e)</span>- コールバック関数。
              <ul>
                <li>
                  pos (THREE.Vector2) :
                  イベントが発生したオブジェクトに対する発生場所の相対座標。
                </li>
                <li>e (PointerEvents) : イベントオブジェクト。</li>
              </ul>
            </div>
            <div>
              <span>option</span> - 設定オブジェクト。
              <ul>
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
        <ol>
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

      <h2>コードの例</h2>
      <h4>マウスイベントの利用</h4>
      <p>キャンバスをクリックすると、立方体が拡大します。</p>
      <Ex1
        className="border"
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
    </Container>
  );
}
