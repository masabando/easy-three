import CodeBlock from "@/components/CodeBlock";
import H1 from "@/components/H1";
import H2 from "@/components/H2";
import H3 from "@/components/H3";
import { Ex1 } from "./Codes";

export const metadata = {
  title: "raycaster",
};

export default function Page() {
  return (
    <div>
      <H1>raycaster</H1>

      <p>オブジェクトなどをマウスなどで選択できる仕組みを提供します。</p>
      <p>
        初期状態では無効化されています。
        <br />
        connect() を呼び出すことで有効化されます。
      </p>
      <CodeBlock>{`raycaster.connect()`}</CodeBlock>
      <p>connect の引数で、各種の設定を行うことができます。</p>
      <ul className="list-disc list-inside ml-4 mt-4">
        <li>useMouse : マウスを利用するか (デフォルト: true)</li>
        <li>
          mouseEvent : どのマウスイベントを利用するか (デフォルト:
          "pointermove")
        </li>
      </ul>
      <p className="mt-4">無効化する場合は、disconnect() を呼び出します。</p>
      <CodeBlock>{`raycaster.disconnect()`}</CodeBlock>

      <H2 className="mt-14">使用方法</H2>
      <p>まず、init() の戻り値から raycaster を取得します。</p>
      <CodeBlock>{`const { create, camera, controls, animate, raycaster } = init();`}</CodeBlock>
      <p className="mt-4">その後、connect() を呼び出すことで有効化されます。</p>
      <CodeBlock>{`raycaster.connect()`}</CodeBlock>
      <p className="mt-4">
        animate() 内で raycaster.getIntersections(対象)
        を呼び出すことで、マウスが指しているオブジェクトを取得することができます。
      </p>
      <CodeBlock>{`const intersections = raycaster.getIntersections([cube1, cube2])`}</CodeBlock>
      <p className="mt-4">
        intersections
        は配列で返され、マウスが指しているオブジェクトが複数ある場合は、近い順に並んでいます。
      </p>
      <p className="mt-4">
        なお、子オブジェクトを無視したい の場合は、オプション引数で recursive を
        false にすることで、子オブジェクトを無視することができます。
      </p>
      <CodeBlock>{`const intersections = raycaster.getIntersections([cube1, cube2], { recursive: false })`}</CodeBlock>

      <p className="mt-4">
        intersections の各要素は、
        <a
          href="https://threejs.org/docs/#Raycaster.~Intersection"
          target="_blank"
          rel="noopener noreferrer"
        >
          THREE.Intersection 型
        </a>
        のオブジェクトです。<br />
        そのため、intersections[0].object で、交差しているオブジェクトを取得することができます。
      </p>
      <CodeBlock>{`const hit = intersections[0];
hit.object.position.set(0, 1, 0);
hit.object.material.color.set(0xff0000);`}</CodeBlock>

      <H2 className="mt-14">サンプルコード</H2>

      <Ex1
        className="border mt-4"
        style={{
          width: "240px",
          height: "240px",
        }}
      />

      <CodeBlock>
        {`const { camera, create, animate, controls, raycaster } = init();

camera.position.set(0, 0, 3);

controls.connect();
create.ambientLight();
create.directionalLight();

// レイキャスターを有効化
raycaster.connect();

const cube1 = create.cube({
  position: [1, 0, 0],
});

const cube2 = create.cube({
  position: [-1, 0, 0],
});

animate(({ delta }) => {
  cube1.rotation.y += delta;
  cube2.rotation.y += delta;

  // レイキャスターで交差判定を行い、その結果を配列で取得
  const intersections = raycaster.getIntersections([cube1, cube2])

  // 結果を元に、交差しているオブジェクトの色を赤に変更
  cube1.material.color.set(0xffffff);
  cube2.material.color.set(0xffffff);
  if (intersections.length > 0) {
    intersections[0].object.material.color.set(0xff0000);
  }
});
`}
      </CodeBlock>
    </div>
  );
}
