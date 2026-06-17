import CodeBlock from "@/components/CodeBlock";
import ReferenceContent from "@/components/ReferenceContent";
import { Note } from "@/components/BaseKit";
import H1 from "@/components/H1";
import H2 from "@/components/H2";
import H3 from "@/components/H3";
import { Ex1, Ex2 } from "./Codes";

export const metadata = {
  title: "create.rectAreaLight",
};

export default function Reference_Create_RectAreaLight() {
  return (
    <div>
      <H1>create.rectAreaLight</H1>
      <ReferenceContent
        name="create.rectAreaLight"
        args="props : Object"
        returnObject="Light"
        argsInfo={
          <div>
            <span>props</span> - 設定オブジェクト。
            <ul className="list-disc list-inside ml-4">
              <li>color (Hex) : ライトの色 (デフォルト : 0xffffff)。</li>
              <li>intensity (Number) : 光の強さ (デフォルト : 1)。</li>
              <li>size (Array) : ライトのサイズ (デフォルト : 1)。</li>
              <li>
                position (Array) : ライトの位置 (デフォルト : [0, 0, 0])。
              </li>
              <li>
                rotation (Array) : ライトの回転 (デフォルト : [0, 0, 0])。
              </li>
              <li>helper (Boolean) : ヘルパーの表示 (デフォルト : false)。</li>
            </ul>
          </div>
        }
      >
        <p>矩形の領域で光るライトを作成してシーンに追加します。</p>
      </ReferenceContent>

      <p className="mt-4">
        rectAreaLightは、指定した位置と回転で矩形の領域で光るライトを作成します。
        <br />
        明るい窓や蛍光灯などの表現に利用できます。
        <br />
        <Note>このライトは、影を作成しません。</Note>
        <br />
        <Note>
          このライトは他のライトと比べて計算コストが高いので、大量に設置するとパフォーマンスが低下します。
        </Note>
      </p>

      <H2 className="mt-14">コードの例</H2>
      <H3>矩形の光 (ヘルパーあり)</H3>
      <p>ヘルパーを使うことで、ライト部分を可視化できます。</p>
      <Ex2
        className="border my-4"
        style={{
          width: "240px",
          height: "240px",
        }}
      />
      <CodeBlock>
        {`const { camera, controls, create, animate } = init()

controls.connect();
camera.position.set(0, 2, 3);

create.cube({
  position: [0, 0.5, 0],
  rotation: [0, Math.PI / 4, 0],
  option: {
    color: 0xffffff,
  },
});

create.plane({
  size: 10,
  rotation: [-Math.PI / 2, 0, 0],
  option: {
    color: 0xffffff,
  },
});

create.rectAreaLight({
  intensity: 3,
  color: 0xff0000,
  size: [1, 2],
  position: [1.5, 1, -1],
  rotation: [0, (3 * Math.PI) / 4, 0],
  helper: true,
});

create.rectAreaLight({
  intensity: 3,
  color: 0x0000ff,
  size: [1, 2],
  position: [-1.5, 1, -1],
  rotation: [0, -(3 * Math.PI) / 4, 0],
  helper: true,
});

animate();
`}
      </CodeBlock>
      <H3 className="mt-10">矩形の光 (ヘルパーなし)</H3>
      <Ex1
        className="border my-4"
        style={{
          width: "240px",
          height: "240px",
        }}
      />
      <CodeBlock>
        {`const { camera, controls, create, animate } = init()

controls.connect();
camera.position.set(0, 2, 3);

create.cube({
  position: [0, 0.5, 0],
  rotation: [0, Math.PI / 4, 0],
  option: {
    color: 0xffffff,
  },
});

create.plane({
  size: 10,
  rotation: [-Math.PI / 2, 0, 0],
  option: {
    color: 0xffffff,
  },
});

create.rectAreaLight({
  intensity: 3,
  color: 0xff0000,
  size: [1, 2],
  position: [1.5, 1, -1],
  rotation: [0, (3 * Math.PI) / 4, 0],
});

create.rectAreaLight({
  intensity: 3,
  color: 0x0000ff,
  size: [1, 2],
  position: [-1.5, 1, -1],
  rotation: [0, -(3 * Math.PI) / 4, 0],
});

animate();
`}
      </CodeBlock>
    </div>
  );
}
