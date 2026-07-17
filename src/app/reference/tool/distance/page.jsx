import CodeBlock from "@/components/CodeBlock";
import ReferenceContent from "@/components/ReferenceContent";
// import { Ex1 } from "./Codes";
import H1 from "@/components/H1";
import H2 from "@/components/H2";
import H3 from "@/components/H3";

export const metadata = {
  title: "tool.distance",
};

export default function Page() {
  return (
    <div>
      <H1>tool.distance</H1>

      <ReferenceContent
        name="tool.distance"
        args="mesh1: Mesh, mesh2: Mesh, usePixelRatio: Boolean"
        returnObject="Number"
        argsInfo={
          <div>
            <span>mesh1</span> - 距離を測定する最初のメッシュ。<br />
            <span>mesh2</span> - 距離を測定する2番目のメッシュ。<br />
            <span>usePixelRatio</span> - ピクセル比を使用するかどうか。 (デフォルト : true)
          </div>
        }
      >
        メッシュ間の距離を測定します。

      </ReferenceContent>
      <CodeBlock language="javascript">
        {`const dist = tool.distance(mesh1, mesh2);
console.log(dist);`}
      </CodeBlock>

      <p className="mt-4">カメラとメッシュ間の距離を測定することもできます。</p>
      <CodeBlock language="javascript">
        {`const dist = tool.distance(mesh, camera);
console.log(dist);`}
      </CodeBlock>

    </div>
  );
}
