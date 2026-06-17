import CodeBlock from "@/components/CodeBlock";
import ReferenceContent from "@/components/ReferenceContent";
import { Ex1, Ex2 } from "./Codes";
import H1 from "@/components/H1";
import H2 from "@/components/H2";
import H3 from "@/components/H3";

export const metadata = {
  title: "postprocessing.bokeh",
};

export default function Page() {
  return (
    <div>
      <H1>postprocessing.bokeh</H1>
      <ReferenceContent
        name="postprocessing.bokeh"
        args="delta : Number, props : Object"
        returnObject="Object"
        argsInfo={
          <>
            <div>
              <span>delta</span> - 経過時間。
            </div>
            <div>
              <span>props</span> - 設定オブジェクト。
              <ul className="list-disc list-inside ml-4">
                <li>focus (Number) : フォーカス距離 (デフォルト : 1)。</li>
                <li>aperture (Number) : 絞り値 (デフォルト : 0.01)。</li>
                <li>maxblur (Number) : 最大ブラー (デフォルト : 0.01)。</li>
              </ul>
            </div>
          </>
        }
      >
        ぼかしエフェクトを追加します。
        <br />
        戻り値は、bokeh のみのオブジェクトです。
        <br />
        戻り値の bokeh は、animate の中で呼び出すことでエフェクトを適用します。
        <br />
        animate の第2引数を false にしてください。
      </ReferenceContent>

      <H2 className="mt-14">コードの例</H2>
      <H3>ぼかしエフェクト</H3>
      <Ex1
        className="border"
        style={{
          width: "240px",
          height: "240px",
        }}
      />
      <CodeBlock>
        {`const { camera, create, scene, color, animate, postprocessing } = init()

camera.position.set(0, 2, 3);

create.ambientLight();
create.directionalLight();
scene.background = color(0xffffff);

const cubes = [];
for (let i = 0; i < 5; i++) {
  cubes.push(
    create.cube({
      size: 0.5,
      position: [i - 2, 0, 0.5 * (i - 2)],
    })
  );
}

const { bokeh } = postprocessing.bokeh({
  focus: camera.position.distanceTo(cubes[2].position),
  aperture: 0.04,
  maxblur: 0.03,
});

animate(({ delta }) => {
  bokeh(delta);
  cubes.forEach((cube) => {
    cube.rotation.x += delta;
    cube.rotation.y += delta;
  })
}, false);
`}
      </CodeBlock>
      <H3 className="mt-10">焦点の移動</H3>
      <Ex2
        className="border"
        style={{
          width: "240px",
          height: "240px",
        }}
      />
      <CodeBlock>
        {`const { camera, create, scene, color, animate, postprocessing, destroy } = init()

camera.position.set(0, 2, 3);

create.ambientLight();
create.directionalLight();
scene.background = color(0xffffff);

const cubes = [];
for (let i = 0; i < 5; i++) {
  cubes.push(
    create.cube({
      size: 0.5,
      position: [i - 2, 0, 0.5 * (i - 2)],
    })
  );
}

const { bokeh } = postprocessing.bokeh();

animate(({ delta, time }) => {
  bokeh(delta, {
    focus:
      camera.position.distanceTo(cubes[2].position) + 2 * Math.sin(time),
    aperture: 0.01,
    maxblur: 0.03,
  });
}, false);
`}
      </CodeBlock>
    </div>
  );
}
