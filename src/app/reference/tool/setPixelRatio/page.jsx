// import CodeBlock from "@/components/CodeBlock";
import ReferenceContent from "@/components/ReferenceContent";
// import { Ex1 } from "./Codes";
import H1 from "@/components/H1";
import H2 from "@/components/H2";
import H3 from "@/components/H3";

export const metadata = {
  title: "tool.setPixelRatio",
};

export default function Page() {
  return (
    <div>
      <H1>tool.setPixelRatio</H1>

      <ReferenceContent
        name="tool.setPixelRatio"
        args="pixelRatio : Number"
        returnObject="void"
        argsInfo={
          <div>
            <span>pixelRatio</span> - 設定するピクセル比。 (デフォルト : window.devicePixelRatio)
          </div>
        }
      >
        ピクセル比を設定します。
      </ReferenceContent>

    </div>
  );
}
