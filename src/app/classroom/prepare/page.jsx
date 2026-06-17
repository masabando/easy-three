import { Note, Code } from "@/components/BaseKit";
import CodeBlock from "@/components/CodeBlock";
import H1 from "@/components/H1";
import H2 from "@/components/H2";
import H3 from "@/components/H3";

export const metadata = {
  title: "環境を整える",
};

export default function Page() {
  return (
    <div>
      <H1>環境を整える</H1>
      <p>
        easy-threeを使い始めるには、まず適切な環境を整える必要があります。このセクションでは、そのための手順を分かりやすく解説します。
      </p>

      <H2 className="mt-14">1. 必要なソフトをインストールする</H2>
      <p>easy-threeを使うためには、以下のソフトウェアが必要です。</p>
      <ul className="list-disc list-inside ml-4 my-4">
        <li>
          <Note>ブラウザ</Note> (Google Chrome、Firefox、Safariなど)
        </li>
        <li>
          <Note>テキストエディタ</Note> (VSCode、Sublime Text、Atomなど)
        </li>
      </ul>
      <p>
        おそらく、すでにこれらのソフトウェアをインストールしていることでしょう。
        <br />
        もし未インストールの場合は、公式サイトからダウンロードしてインストールしてください。
      </p>
      <p className="mt-4">おすすめは以下のブラウザとエディタです。</p>
      <ul className="list-disc list-inside ml-4 my-4">
        <li>
          ブラウザ : <a className="text-blue-500 underline" href="https://www.google.com/chrome/">Google Chrome</a>
        </li>
        <li>
          エディタ : <a className="text-blue-500 underline" href="https://code.visualstudio.com/">VSCode</a>
        </li>
      </ul>

      <H2 className="mt-14">2. ローカルサーバの準備</H2>
      <p>
        easy-threeをより一層活用するには、
        <Note>簡単なローカルサーバを準備することをおすすめします</Note>。<br />
        ローカルサーバを使うことで、画像や3Dモデルなどを用いて、より本格的なコンテンツを作成できます。
      </p>
      <p className="mt-4">以下のいずれかの方法でローカルサーバを準備してください。</p>

      <H3 className="mt-10">VSCodeがある場合</H3>
      <p>
        VSCodeが使える場合、拡張機能「Live Server」を使って簡単にローカルサーバを立ち上げることができます。
      </p>
      <p className="mt-4">
        プログラミングから確認までをスムーズに行うことができるため、
        <Note>VSCodeを利用することが特にオススメ</Note>です。
      </p>
      <ol className="list-decimal list-inside ml-4 my-4">
        <li>VSCodeの拡張機能「Live Server」をインストールします。</li>
        <li>プロジェクトのフォルダをVSCodeで開きます。</li>
        <li>
          右下の「Go Live」ボタンをクリックすると、ローカルサーバが起動します。
        </li>
      </ol>
      <p>
        サーバが起動すると、自動的にブラウザでプロジェクトが開きます。デフォルトでは、
        <Code>http://127.0.0.1:5500</Code> でプロジェクトを確認できます。
      </p>

      <H3 className="mt-10">Pythonが使える場合</H3>
      <p>
        PC自体にPythonがインストールされている場合(Google Colab は不可です)は、簡単にローカルサーバを立ち上げることができます。
      </p>
      <p className="mt-4">
        コマンドプロンプトやターミナルを開き、プロジェクトのディレクトリに移動し、
        以下のコマンドをターミナルで実行してください。
      </p>
      <pre>
        <CodeBlock language="zsh">python -m http.server</CodeBlock>
      </pre>
      <p>
        コマンドを実行すると、現在のディレクトリがローカルサーバとして提供されます。
        <br />
        ブラウザで <Code>http://localhost:8000</Code>{" "}
        を開き、プロジェクトを確認してください。
      </p>

      <H3 className="mt-10">どちらもない場合</H3>
      <p>VSCodeをインストールするのが最もオススメですが、Node.jsを使ってローカルサーバを立ち上げる方法もあります。</p>
      <ul className="list-disc list-inside ml-4 my-4">
        <li>
          <Note>Node.js</Note> をインストールしてください。
          <br />
          Node.jsは公式サイト（
          <a className="text-blue-500 underline" href="https://nodejs.org/">https://nodejs.org/</a>
          ）からダウンロードできます。
        </li>
        <li className="mt-4">
          簡単なローカルサーバを立ち上げるには、以下のコマンドを使用します。
          <pre>
            <CodeBlock language="zsh">npx serve</CodeBlock>
          </pre>
          このコマンドを実行すると、現在のディレクトリをローカルサーバとして提供できます。
        </li>
      </ul>
      <p>
        ローカルサーバを起動した後、ブラウザで{" "}
        <Code>http://localhost:3000</Code>{" "}
        を開き、プロジェクトを確認してください。
      </p>
    </div>
  );
}