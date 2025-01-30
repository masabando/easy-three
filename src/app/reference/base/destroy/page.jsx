"use client";
import Container from "react-bootstrap/Container";
import CodeBlock from "@/components/CodeBlock";
import ReferenceContent from "@/components/ReferenceContent";
import { Link } from "@/components/BaseKit";

export default function Page() {
  return (
    <Container className="pt-4 pb-5">
      <title>destroy | easy-three</title>
      <h1 className="mb-5">destroy</h1>
      <ReferenceContent
        name="destroy"
        args=""
        returnObject="undefined"
        argsInfo={
          <>
          </>
        }
      >
        <p>シーンにあるオブジェクト等を破棄し、レンダラを停止します。</p>
      </ReferenceContent>
      <p>
        この関数は、シーンにあるオブジェクトやレンダラを破棄し、アニメーションループを停止します。
        <br />
        React で easy-three を利用する場合に、アンマウント時の処理として利用することを想定しており、
        それ以外の用途で利用する必要はありません。
      </p>

      <h2>コードの例 (React)</h2>
      <CodeBlock>
        {`useEffect(() => {
  const { camera, create, animate, destroy } = init();

  // 画面描画処理

  return () => destroy();
}, []);
`}
      </CodeBlock>

    </Container>
  );
}
