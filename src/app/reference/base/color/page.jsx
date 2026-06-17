import CodeBlock from "@/components/CodeBlock";
import H1 from "@/components/H1";
import H2 from "@/components/H2";
import H3 from "@/components/H3";
import { Ex1 } from "./Codes";

export const metadata = {
  title: "color",
};


export default function Page() {
  return (
    <div>
      <H1>color</H1>

      <p>
        色を指定するためのユーティリティ関数です。<br />
        主に create.cube() などのメソッドにおける
        option.color の設定に使用することを想定しています。
      </p>
      <p>引数は文字列または16進数を受け取ります。</p>
      <CodeBlock>{`color("#ff0000")`}</CodeBlock>
      <CodeBlock>{`color(0xff0000)`}</CodeBlock>
      <p>CSSと同様に色の名称を指定することもできます。</p>
      <CodeBlock>{`color("hotpink")`}</CodeBlock>

      <H2 className="mt-14">コードの例</H2>
      <H3>色の指定</H3>
      <Ex1
        className="border my-4"
        style={{
          width: "240px",
          height: "240px",
        }}
      />

      <CodeBlock>
        {`const { camera, create, animate, color } = init();

camera.position.set(-1, 1, 1);

create.ambientLight();
create.directionalLight();

create.cube({
  option: {
    color: color("hotpink")
  }
});

animate();
`}
      </CodeBlock>
    </div>
  );
}
