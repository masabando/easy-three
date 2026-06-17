import CodeBlock from "@/components/CodeBlock";
import ReferenceContent from "@/components/ReferenceContent";
import H1 from "@/components/H1";
import H2 from "@/components/H2";

export const metadata = {
  title: "destroy",
};

export default function Page() {
  return (
    <div>
      <H1>destroy</H1>
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

      <H2 className="mt-14">コードの例 (React)</H2>
      <CodeBlock>
        {`useEffect(() => {
  const { camera, create, animate, destroy } = init();

  // 画面描画処理

  return () => destroy();
}, []);
`}
      </CodeBlock>
    </div>
  );
}
