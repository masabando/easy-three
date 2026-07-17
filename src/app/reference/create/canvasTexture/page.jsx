import CodeBlock from "@/components/CodeBlock";
import ReferenceContent from "@/components/ReferenceContent";
import { Note, Link } from "@/components/BaseKit";
import H1 from "@/components/H1";
import H2 from "@/components/H2";
import H3 from "@/components/H3";
import { Ex1, Ex2, Ex3 } from "./Codes";

export const metadata = {
  title: "create.canvasTexture",
};


export default function Page() {
  return (
    <div>
      <H1>create.canvasTexture</H1>

      <ReferenceContent
        name="create.canvasTexture"
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
                  size (Number | Array) : テクスチャのサイズ (デフォルト : [500, 500])。
                </li>
              </ul>
            </div>
          </>
        }
      >
        <p>キャンバス要素を用いてテクスチャを作成します。</p>
      </ReferenceContent>

      <p className="mt-4">
        平面以外のオブジェクトにテクスチャを表示する場合に使用します。
        <br />
        平面に表示したい場合は{" "}
        <Link className="text-blue-500 underline" href="/reference/create/canvas">
          create.canvas
        </Link>{" "}
        を使用してください。
      </p>

      <H2 className="mt-14">動的な変更</H2>
      <p className="mt-4">
        作成したテクスチャは、 <code>update</code> メソッドで動的に変更することができます。<br />
        update メソッドの引数に、テクスチャを変更するための関数(引数はコンテキストとキャンバス)を渡すと、テクスチャが更新されます。
      </p>
      <CodeBlock>
        {`const texture = create.canvasTexture();

texture.update((ctx, canvas) => {
  ctx.fillStyle = "red";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
})
`}
      </CodeBlock>
      <p className="mt-4">
        作成したテクスチャの userData.context からコンテキストを取得して、直接描画することもできます。<br />
        ただし、直接描画した場合は、テクスチャの更新が反映されないため、<code>texture.update()</code> を呼び出す必要があります。<br />
        また、userData.canvas からキャンバス要素を取得することもできます。
      </p>
      <CodeBlock>
        {`const texture = create.canvasTexture();
const ctx = texture.userData.context;
const canvas = texture.userData.canvas;

ctx.fillStyle = "red";
ctx.fillRect(0, 0, canvas.width, canvas.height);
texture.update()

`}
      </CodeBlock>

      <H2 className="mt-14">コードの例</H2>
      <H3>キャンバステクスチャの作成</H3>
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
        {`const { camera, create, animate, THREE } = init()
camera.position.set(0, 0, 3);

create.ambientLight();
create.directionalLight();
create.sky()

const texture = create.canvasTexture(
  (ctx) => {
    ctx.fillStyle = "red";
    ctx.fillRect(50, 50, 100, 100);
    ctx.fillStyle = "green";
    ctx.fillRect(100, 100, 100, 100);
    ctx.fillStyle = "blue";
    ctx.fillRect(150, 150, 100, 100);
  },
  {
    size: 300,
  }
);

const cube = create.cube({
  size: 1,
  position: [-1, 0, 0],
  option: {
    map: texture,
    transparent: true,
    side: THREE.DoubleSide,
  },
});

const sphere = create.sphere({
  size: 0.7,
  position: [1, 0, 0],
  option: {
    map: texture,
  },
});

animate(({ delta }) => {
  cube.rotation.x += delta;
  cube.rotation.y += delta;
  sphere.rotation.x += delta;
  sphere.rotation.y += delta * 0.7;
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
        {`const { camera, create, THREE, animate } = init()
camera.position.set(0, 0, 2);

create.ambientLight();
create.directionalLight();
create.sky();

const texture = create.canvasTexture();

const cube = create.cube({
  size: 1,
  option: {
    transparent: true,
    map: texture,
    side: THREE.DoubleSide,
  },
});

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
  cube.rotation.x += delta;
  cube.rotation.y += delta;
  texture.update((ctx, canvas) => draw(ctx, canvas, frameCount));
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
        {`const { camera, create, THREE, animate } = init()
camera.position.set(0, 0, 2);

create.ambientLight();
create.directionalLight();
create.sky();

const texture = create.canvasTexture();

const cube = create.cube({
  size: 1,
  option: {
    transparent: true,
    map: texture,
    side: THREE.DoubleSide,
  },
});

const draw1 = (ctx, canvas) => {
  ctx.save();
  // red frame
  ctx.fillStyle = "red";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.clearRect(10, 10, canvas.width - 20, canvas.height - 20);
  // text
  ctx.fillStyle = "black";
  ctx.font = "90px Arial"
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
  for (let r = maxR; r > 0; r -= 10) {
    ctx.beginPath();
    ctx.arc(0, 0, r, 0, Math.PI * 2);
    ctx.fillStyle = \`hsl(\${(r * 2) % 360}, 100%, 50%)\`;
    ctx.fill();
  }
    ctx.restore();
}

texture.update(draw1);

animate(({delta, frameCount}) => {
  cube.rotation.x += delta;
  cube.rotation.y += delta;

  switch (true) {
    case frameCount % 180 === 0:
      texture.update(draw1);
      break;
    case frameCount % 90 === 0:
      texture.update(draw2);
      break;
  }
});
`}
      </CodeBlock>
    </div>
  );
}
