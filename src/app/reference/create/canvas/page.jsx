import CodeBlock from "@/components/CodeBlock";
import ReferenceContent from "@/components/ReferenceContent";
import { Note, Link } from "@/components/BaseKit";
import H1 from "@/components/H1";
import H2 from "@/components/H2";
import H3 from "@/components/H3";
import { Ex1, Ex2, Ex3 } from "./Codes";

export const metadata = {
  title: "create.canvas",
};


export default function Page() {
  return (
    <div>
      <H1>create.canvas</H1>

      <ReferenceContent
        name="create.canvas"
        args="proc, props : Object"
        returnObject="Texture"
        argsInfo={
          <>
            <div>
              <span>proc</span> - テクスチャを描画するための関数。引数に2Dコンテキストとキャンバスが渡されます。
              (デフォルト : {`() => { }`})
            </div>
            <div>
              <span>props</span> - 設定オブジェクト。
              <ul className="list-disc list-inside ml-4">
                <li>
                  size (Number | Array) : 平面のサイズ (デフォルト : 1)。
                </li>
                <li>
                  resolution (Number) : 平面の解像度 (デフォルト : 100)。
                </li>
                <li>
                  transparent (Boolean) : 平面の透過設定 (デフォルト : true)。
                </li>
                <li>
                  material (String) : 平面のマテリアル (デフォルト : "Basic")。
                </li>
              </ul>
              <p>
                その他のプロパティは、<Link className="text-blue-500 underline" href="/reference/create/plane">create.plane</Link> の設定と同じです。
              </p>
            </div>
          </>
        }
      >
        <p>キャンバス要素を用いて作成したテクスチャを適用した平面を作成します。</p>
      </ReferenceContent>

      <p className="mt-4">
        平面のオブジェクトにテクスチャを表示する場合に使用します。
        <br />
        平面以外にキャンバステクスチャを適用したい場合は{" "}
        <Link className="text-blue-500 underline" href="/reference/create/canvasTexture">
          create.canvasTexture
        </Link>{" "}
        を使用してください。
      </p>

      <p className="mt-4">
        <code>create.canvas</code> は、
        <Link className="text-blue-500 underline" href="/reference/create/canvasTexture">
          create.canvasTexture
        </Link>{" "}
        で作成したテクスチャを、
        <Link className="text-blue-500 underline" href="/reference/create/plane">
          create.plane
        </Link>{" "}
        に適用して返す関数です。
      </p>

      <H2 className="mt-14">動的な変更</H2>
      <p className="mt-4">
        作成したテクスチャは、 <code>update</code> メソッドで動的に変更することができます。<br />
        update メソッドの引数に、テクスチャを変更するための関数(引数はコンテキストとキャンバス)を渡すと、テクスチャが更新されます。
      </p>
      <CodeBlock>
        {`const plane = create.canvas();

plane.update((ctx, canvas) => {
  ctx.fillStyle = "red";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
})
`}
      </CodeBlock>
      <p className="mt-4">
        作成したテクスチャの userData.context からコンテキストを取得して、直接描画することもできます。<br />
        ただし、直接描画した場合は、テクスチャの更新が反映されないため、<code>update()</code> を呼び出す必要があります。<br />
        また、userData.canvas からキャンバス要素を取得することもできます。
      </p>
      <CodeBlock>
        {`const plane = create.canvas();
const ctx = plane.userData.context;
const canvas = plane.userData.canvas;

ctx.fillStyle = "red";
ctx.fillRect(0, 0, canvas.width, canvas.height);
plane.update()

`}
      </CodeBlock>

      <H2 className="mt-14">コードの例</H2>
      <H3>キャンバステクスチャを適用した平面</H3>
      <p className="mt-4">
        描画していない部分を透過するかどうかは、<code>option</code> の <code>transparent</code> プロパティで設定できます。<br />
      </p>
      <Ex1
        className="border mt-4"
        style={{
          width: "240px",
          height: "240px",
        }}
      />
      <CodeBlock>
        {`const { camera, create, animate } = init()
camera.position.set(0, 0, 3);

create.ambientLight();
create.directionalLight();
create.sky()

const plane1 = create.canvas(
  (ctx) => {
    ctx.fillStyle = "red";
    ctx.fillRect(50, 50, 100, 100);
    ctx.fillStyle = "green";
    ctx.fillRect(100, 100, 100, 100);
    ctx.fillStyle = "blue";
    ctx.fillRect(150, 150, 100, 100);
  },
  {
    size: 1,
    resolution: 300,
    position: [-1, 0, 0],
  }
);

const plane2 = create.canvas(
  (ctx) => {
    ctx.fillStyle = "red";
    ctx.fillRect(50, 50, 100, 100);
    ctx.fillStyle = "green";
    ctx.fillRect(100, 100, 100, 100);
    ctx.fillStyle = "blue";
    ctx.fillRect(150, 150, 100, 100);
  },
  {
    size: 1,
    resolution: 300,
    transparent: false,
    position: [1, 0, 0],
  }
);

animate(({ delta }) => {
  plane1.rotation.x += delta;
  plane1.rotation.y += delta;
  plane2.rotation.x += delta;
  plane2.rotation.y += delta;
});
`}
      </CodeBlock>

      <H3 className="mt-10">描画内容の変更1</H3>
      <p className="mt-4">
        <code>update</code> メソッドで描画内容を変更することで、テクスチャの見た目を動的に変えることができます。
      </p>
      <Ex2
        className="border mt-4"
        style={{
          width: "240px",
          height: "240px",
        }}
      />
      <CodeBlock>
        {`const { camera, create, animate } = init()
camera.position.set(0, 0, 2);

create.ambientLight();
create.directionalLight();
create.sky();

const plane = create.canvas();

const draw = (ctx, canvas, frameCount) => {
  ctx.save();
  // clear
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  // translate to center
  ctx.translate(canvas.width / 2, canvas.height / 2);
  // draw rainbow circles
  const maxR = Math.ceil(Math.hypot(canvas.width, canvas.height) / 2);
  for (let r = maxR; r > 0; r -= 10) {
    ctx.beginPath();
    ctx.arc(0, 0, r, 0, Math.PI * 2);
    ctx.fillStyle = \`hsla(\${(r * 2 - frameCount * 5) % 360}, 100%, 50%, 0.1)\`;
    ctx.fill();
  }
  ctx.restore();
}


animate(({delta, frameCount}) => {
  plane.rotation.x += delta;
  plane.rotation.y += delta;
  plane.update((ctx, canvas) => draw(ctx, canvas, frameCount));
});
`}
      </CodeBlock>

      <H3 className="mt-10">描画内容の変更2</H3>
      <p className="mt-4">
        複数の描画用関数を用意し、<code>update</code> メソッドの引数に渡す関数を切り替えることで、描画内容を変更することができます。
      </p>
      <Ex3
        className="border mt-4"
        style={{
          width: "240px",
          height: "240px",
        }}
      />
      <CodeBlock>
        {`const { camera, create, animate } = init()
camera.position.set(0, 0, 2);

create.ambientLight();
create.directionalLight();
create.sky();

const plane = create.canvas();

const draw1 = (ctx, canvas) => {
  ctx.save();
  // red frame
  ctx.fillStyle = "red";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.clearRect(2, 2, canvas.width - 4, canvas.height - 4);
  // text
  ctx.fillStyle = "black";
  ctx.font = "18px Arial"
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("easy-three", canvas.width / 2, canvas.height / 2);
  ctx.restore();
}

const draw2 = (ctx, canvas) => {
  ctx.save();
  // clear
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  // translate to center
  ctx.translate(canvas.width / 2, canvas.height / 2);
  // draw rainbow circles
  const maxR = Math.ceil(Math.hypot(canvas.width, canvas.height) / 2);
  for (let r = maxR; r > 0; r -= 2) {
    ctx.beginPath();
    ctx.arc(0, 0, r, 0, Math.PI * 2);
    ctx.fillStyle = \`hsl(\${(r * 2) % 360}, 100%, 50%)\`;
    ctx.fill();
  }
    ctx.restore();
}

plane.update(draw1);

animate(({delta, frameCount}) => {
  plane.rotation.x += delta;
  plane.rotation.y += delta;

  switch (true) {
    case frameCount % 180 === 0:
      plane.update(draw1);
      break;
    case frameCount % 90 === 0:
      plane.update(draw2);
      break;
  }
});
`}
      </CodeBlock>
    </div>
  );
}
