"use client"
import { Note } from "@/components/BaseKit";
import CodeBlock from "@/components/CodeBlock";

export default function Page() {
  return (
    <div>
      <h2>環境を整える</h2>
      <p>
        easy-threeを使い始めるには、まず適切な環境を整える必要があります。このセクションでは、そのための手順を分かりやすく解説します。
      </p>

      <h3 className="mt-5">1. 必要なソフトをインストールする</h3>
      <p>easy-threeを使うためには、以下のソフトウェアが必要です。</p>
      <ul>
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
      <p>おすすめは以下のブラウザとエディタです。</p>
      <ul>
        <li>
          ブラウザ : <a href="https://www.google.com/chrome/">Google Chrome</a>
        </li>
        <li>
          エディタ : <a href="https://code.visualstudio.com/">VSCode</a>
        </li>
      </ul>

      <h3 className="mt-5">2. ローカルサーバの準備</h3>
      <p>
        easy-threeをより一層活用するには、
        <Note>簡単なローカルサーバを準備することをおすすめします</Note>。<br />
        ローカルサーバを使うことで、画像や3Dモデルなどを用いて、より本格的なコンテンツを作成できます。
      </p>
      <p>以下のいずれかの方法でローカルサーバを準備してください。</p>

      <h4 className="mt-5">VSCodeがある場合</h4>
      <p>
        VSCodeが使える場合、拡張機能「Live Server」を使って簡単にローカルサーバを立ち上げることができます。
      </p>
      <p>
        プログラミングから確認までをスムーズに行うことができるため、
        <Note>VSCodeを利用することが特にオススメ</Note>です。
      </p>
      <ol>
        <li>VSCodeの拡張機能「Live Server」をインストールします。</li>
        <li>プロジェクトのフォルダをVSCodeで開きます。</li>
        <li>
          右下の「Go Live」ボタンをクリックすると、ローカルサーバが起動します。
        </li>
      </ol>
      <p>
        サーバが起動すると、自動的にブラウザでプロジェクトが開きます。デフォルトでは、
        <code>http://127.0.0.1:5500</code> でプロジェクトを確認できます。
      </p>

      <h4 className="mt-5">Pythonが使える場合</h4>
      <p>
        PC自体にPythonがインストールされている場合(Google Colab は不可です)は、簡単にローカルサーバを立ち上げることができます。
      </p>
      <p>
        コマンドプロンプトやターミナルを開き、プロジェクトのディレクトリに移動し、
        以下のコマンドをターミナルで実行してください。
      </p>
      <pre>
        <CodeBlock language="zsh">python -m http.server</CodeBlock>
      </pre>
      <p>
        コマンドを実行すると、現在のディレクトリがローカルサーバとして提供されます。
        <br />
        ブラウザで <code>http://localhost:8000</code>{" "}
        を開き、プロジェクトを確認してください。
      </p>

      <h4 className="mt-5">どちらもない場合</h4>
      <p>VSCodeをインストールするのが最もオススメですが、Node.jsを使ってローカルサーバを立ち上げる方法もあります。</p>
      <ul>
        <li>
          <Note>Node.js</Note> をインストールしてください。
          <br />
          Node.jsは公式サイト（
          <a href="https://nodejs.org/">https://nodejs.org/</a>
          ）からダウンロードできます。
        </li>
        <li>
          簡単なローカルサーバを立ち上げるには、以下のコマンドを使用します。
          <pre>
            <CodeBlock language="zsh">npx serve</CodeBlock>
          </pre>
          このコマンドを実行すると、現在のディレクトリをローカルサーバとして提供できます。
        </li>
      </ul>
      <p>
        ローカルサーバを起動した後、ブラウザで{" "}
        <code>http://localhost:3000</code>{" "}
        を開き、プロジェクトを確認してください。
      </p>
    </div>
  );
}