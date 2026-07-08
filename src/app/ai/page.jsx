import Container from "@/components/Container";
import H1 from "@/components/H1";
import H2 from "@/components/H2";
import T from "@/components/Lang";
import CodeBlock from "@/components/CodeBlock";

export const metadata = {
  title: "for AI use",
  description: "easy-threeのAIでの利用について紹介します。",
};

function DownloadLink() {
  return (
    <a href="/easy-three/llms.txt" className="link link-primary">
      llms.txt
    </a>
  );
}

export default function AI() {
  return (
    <Container>
      <H1>
        <T>
          <>AI for use</>
          <>AIでの利用</>
        </T>
      </H1>

      <H2 className="mt-10">VSCode and Copilot LLM</H2>
      <T>
        <>
          <DownloadLink /> is a list of LLMs that can be used with easy-three.
          You can use these LLMs to generate code for easy-three in VSCode with
          Copilot.
        </>
        <>
          <DownloadLink /> ファイルを使うことで、AIがプロンプトに基づいて正確な
          easy-three コードを生成できます。
          <br />
          VSCode で easy-three llms.txt を使用する方法は次の通りです。
        </>
      </T>
      <ol className="list-decimal pl-7 mt-4 space-y-2">
        <li>
          <T>
            <>
              download <DownloadLink /> and rename it to{" "}
              <code>easy-three.instructions.md</code>.
            </>
            <>
              <DownloadLink /> をダウンロードし、
              <code>easy-three.instructions.md</code> にリネームします。
            </>
          </T>
        </li>
        <li>
          <T>
            <>
              save <code>easy-three.instructions.md</code> in the{" "}
              <code>.github/instructions</code> folder.
            </>
            <>
              <code>easy-three.instructions.md</code> を{" "}
              <code>.github/instructions</code> フォルダに 保存します。
            </>
          </T>
        </li>
      </ol>
      <p className="mt-4">
        <T>
          <>
            You can automatically set up the above download using the following
            command.
          </>
          <>
            以下のコマンドを使用して上記のダウンロードから設置を自動的に行えます。
          </>
        </T>
      </p>
      <CodeBlock className="mt-4" language="bash" filename="Terminal">
        {`curl -L https://masabando.github.io/easy-three/llms.txt --create-dirs -o .github/instructions/easy-three.instructions.md`}
      </CodeBlock>

      <H2 className="mt-10">Codex</H2>
      <T>
        <>
          You can download <DownloadLink /> and save it as AGENTS.md in the
          project root. If you already have an AGENTS.md, append the contents of
          llms.txt to it. Alternatively, you can also pass the contents of
          llms.txt interactively to Codex.
        </>
        <>
          <DownloadLink /> をダウンロードして、プロジェクトルートに AGENTS.md
          として保存してください。
          <br />
          既存の AGENTS.md がある場合は、そこに llms.txt
          の内容を追記してください。
          <br />
          あるいは、llms.txt の内容を対話的に Codex に渡すこともできます。
        </>
      </T>

      <H2 className="mt-10">Claude Code</H2>
      <T>
        <>
          You can download <DownloadLink /> and save it as CLAUDE.md in the
          project root. If you already have a CLAUDE.md, append the contents of
          llms.txt to it. Alternatively, you can also pass the contents of
          llms.txt interactively to Claude.
        </>
        <>
          <DownloadLink /> をダウンロードして、プロジェクトルートに CLAUDE.md
          として保存してください。
          <br />
          既存の CLAUDE.md がある場合は、そこに llms.txt
          の内容を追記してください。
          <br />
          あるいは、llms.txt の内容を対話的に Claude に渡すこともできます。
        </>
      </T>

      <H2 className="mt-10">ChatGPT / Gemini / Claude</H2>
      <T>
        <>
          When using AI such as ChatGPT, download llms.txt and provide it to the
          AI.
        </>
        <>
          ChatGPTなどのAIを使う場合は、
          <DownloadLink /> をダウンロードして、AIに渡してください。
        </>
      </T>
    </Container>
  );
}
