import CodeBlock from "@/components/CodeBlock";
import ReferenceContent from "@/components/ReferenceContent";
import { Note } from "@/components/BaseKit";
import H1 from "@/components/H1";
import H2 from "@/components/H2";
import H3 from "@/components/H3";
import { Ex1, Ex2 } from "./Codes";
import MeshBaseProps from "@/app/reference/create/MeshBaseProps";

export const metadata = {
  title: "create.html",
};

export default function Reference_Create_Html() {
  return (
    <div>
      <H1>create.html</H1>
      <ReferenceContent
        name="create.html"
        args="domElement: HTMLElement, props : Object"
        returnObject="Mesh"
        argsInfo={
          <div>
            <div>
              <span>domElement</span> - HTML要素。
            </div>
            <span>props</span> - 設定オブジェクト。
            <ul className="list-disc list-inside ml-4">
              <li>
                position (Array) : 位置 (デフォルト : [0, 0, 0])。
              </li>
              <li>
                rotation (Array) : 回転 (デフォルト : [0, 0, 0])。
              </li>
              <li>
                scale (Array) : スケール (デフォルト : [1, 1, 1])。
              </li>
              <li>
                autoAdd (Boolean) : シーンに自動追加するか？ (デフォルト : true)。
              </li>
            </ul>
          </div>
        }
      >
        <p>HTML要素を3D空間に配置します。</p>
        <p className="mt-4">
          HTML要素は、表示されるものでないと正しくレンダリングされません。<br />
          そのため、create.html()で配置するHTML要素は、display:noneやvisibility:hiddenなどで非表示にせず、<br />
          画面外に配置するなどして、表示される状態にしておく必要があります。
        </p>
        <p className="mt-4">
          単純に left: -10000px などで画面外に配置するだけでは、ページが横に伸びてスクロールバーが表示されてしまいます。<br />
          コンテナとなるdiv要素 (position: relative, overflow: hidden)などで囲い、
          その中に position: absolute で配置するのがオススメです。
        </p>
      </ReferenceContent>

      <H2 className="mt-14">コードの例</H2>
      <H3>HTML要素の配置</H3>
      <p>
        document.createElement()でHTML要素を作成し、create.html()で配置します。
      </p>
      <Ex1
        className="border mt-4"
        style={{
          width: "240px",
          height: "240px",
        }}
      />
      <CodeBlock>
        {`const { camera, create, controls, animate } = init()
camera.position.set(0, 0, 2);
controls.connect();

create.ambientLight();
create.directionalLight();

const div = document.createElement("div");
div.style.width = "100px";
div.style.height = "100px";
div.style.display = "flex";
div.style.flexDirection = "column";
div.style.justifyContent = "space-around";
div.style.alignItems = "center";
div.style.backgroundColor = "#aaa";
div.style.position = "absolute";
div.style.top = "0";
div.style.left = "10000px";
div.innerHTML = "HTML Mesh"
document.body.appendChild(div);

create.html(div, {
  scale: [15, 15, 15]
});

animate()
`}
      </CodeBlock>

      <H3 className="mt-10">HTML要素の配置</H3>
      <p>
        既存のHTML要素を配置する場合は、document.querySelector()などで取得します。
      </p>
      <div className="mt-4">
        <Ex2
          className="border"
          style={{
            width: "240px",
            height: "240px",
          }}
        />
      </div>
      <CodeBlock>
        {`const { camera, create, controls, animate } = init()
camera.position.set(1, 1, 2)
controls.connect()

create.ambientLight()
create.directionalLight()

create.html(document.querySelector("#html-mesh"), {
  scale: [15, 15, 15]
})

animate()
`}
      </CodeBlock>
    </div>
  );
}
