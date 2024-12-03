"use client";
import Container from "react-bootstrap/Container";
import CodeBlock from "@/components/CodeBlock";
import Button from "react-bootstrap/Button";
import T from "@/components/Lang";
import { Link } from "@/components/BaseKit";
import { Tag } from "antd";

export default function Page() {
  const currentVersion = "0.0.12";
  return (
    <Container className="pt-4 pb-5">
      <title>Getting Started | easy-three</title>
      <h1>Getting Started</h1>

      <h2>
        <T>
          <>Using Template</>
          <>テンプレートを使う</>
        </T>
      </h2>
      <p>
        <T>
          <>
            You can use the template to create a new project.
            <br />
            The template includes the necessary settings for easy-three.
          </>
          <>
            テンプレートを使って新しいプロジェクトを作成することができます。
            <br />
            テンプレートには easy-three に必要な設定が含まれています。
          </>
        </T>
      </p>
      <p>
        <T>
          <>※ Be sure to extract the zip file before use.</>
          <>※ Zipファイルは必ず展開して使ってください。</>
        </T>
      </p>
      <div className="my-3">
        <Button href="../template/easy-three-template.zip">
          <T>
            <>Download Template</>
            <>テンプレートのダウンロード</>
          </T>
        </Button>
      </div>
      <p>
        <T>
          <>
            You can display it by dragging and dropping the index.html file into
            a web browser.
            <br />
            To edit the code, use an editor like{" "}
            <a href="https://code.visualstudio.com">VSCode</a>.
          </>
          <>
            index.html をWebブラウザにドラッグ＆ドロップすると表示できます。
            <br />
            コードを書き換えるには、
            <a href="https://code.visualstudio.com">VSCode</a>
            などのエディタを使ってください。
          </>
        </T>
      </p>
      <p>
        <T>
          <>
            For more information on how to use the template, see the{" "}
            <Link href="/reference">Reference</Link> .
          </>
          <>
            テンプレートの使い方については、{" "}
            <Link href="/reference">Reference</Link> を参照してください。
          </>
        </T>
      </p>

      <h2>
        <T>
          <>Using CDN</>
          <>CDNを使う</>
        </T>
      </h2>
      <T>
        <>
          You can use easy-three without downloading by using a CDN.
          <br />
          Importmap settings are also required.
        </>
        <>
          ダウンロードせずに、CDNを使って easy-three を使うことができます。
          <br />
          インポートマップの設定も必要です。
        </>
      </T>

      <CodeBlock filename="index.html" language="text">
        {`<script type="importmap">
  {
    "imports": {
      "three": "https://cdn.jsdelivr.net/npm/three@0.170.0/build/three.module.js",
      "three/addons/": "https://cdn.jsdelivr.net/npm/three@0.170.0/examples/jsm/",
      "@pixiv/three-vrm": "https://cdn.jsdelivr.net/npm/@pixiv/three-vrm@3/lib/three-vrm.module.min.js",
      "easy-three": "https://cdn.jsdelivr.net/gh/masabando/easy-three@${currentVersion}/dist/easy-three.js"
    }
  }
</script>`}
      </CodeBlock>
      <CodeBlock filename="JavaScript" language="javascript">
        {`import { init } from "easy-three";`}
      </CodeBlock>

      <T>
        <>
          The code below is a simple example of using easy-three with CDN.
          <br />
          This code creates a cube and displays it in the center of the screen.
        </>
        <>
          下記のコードは、CDNを使って easy-three を使う簡単な例です。
          <br />
          このコードは、立方体を作成し、画面の中央に表示します。
        </>
      </T>

      <CodeBlock filename="index.html" language="html">{`<!DOCTYPE html>
<html lang="ja">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>easy-three template</title>
  <script type="importmap">
    {
      "imports": {
        "three": "https://cdn.jsdelivr.net/npm/three@0.170.0/build/three.module.js",
        "three/addons/": "https://cdn.jsdelivr.net/npm/three@0.170.0/examples/jsm/"
      }
    }
  </script>
</head>

<body>
  <script type="module">
    import { init } from "https://cdn.jsdelivr.net/gh/masabando/easy-three@${currentVersion}/dist/easy-three.js";
    const { camera, create, animate, controls } = init();

    controls.connect()
    camera.position.set(-2, 2, 2)
    create.ambientLight()
    create.directionalLight()
    create.cube()

    animate()
  </script>
</body>

</html>`}</CodeBlock>

      <h2 id="server">
        <T>
          <>Using Resources Such as Images</>
          <>画像などのリソースを使う場合</>
        </T>
      </h2>
      <T>
        <>
          If you want to use resources such as images or VRM models, you need to
          start a local server.
          <br />
          Here, we introduce how to use VSCode&apos;s Live Server, Node.js, and
          Python.
        </>
        <>
          画像やVRMモデルなどのリソースを使いたい場合は、ローカルサーバを立ち上げる必要があります。
          <br />
          ここでは、VSCode の Live Server を使う方法、Node.js を使う方法、Python
          を使う方法を紹介します。
        </>
      </T>
      <h3 className="mt-4">
        VSCode Live Server
        <Tag color="blue" className="ms-2 align-middle">
          <T>
            <>Recommended</>
            <>おすすめ！</>
          </T>
        </Tag>
      </h3>
      <T>
        <>
          If you are using VSCode, you can use the Live Server extension.
          <br />
          Right-click on the HTML file and select &quot;Open with Live
          Server&quot;.
        </>
        <>
          VSCode を使っている場合は、Live Server 拡張機能を使うことができます。
          <br />
          VSCode内でHTMLファイルを右クリックして、「Live Server
          で開く」を選択します。
        </>
      </T>
      <h3 className="mt-4">Node.js</h3>
      <T>
        <>
          If you have Node.js installed, you can use the serve package.
          <br />
          Run the following command in the directory where the HTML file is
          located.
        </>
        <>
          Node.js をインストールしている場合は、serve
          パッケージを使うことができます。
          <br />
          HTMLファイルがあるディレクトリで、以下のコマンドを実行します。
        </>
      </T>
      <CodeBlock filename="Command" language="bash">
        {`npx serve`}
      </CodeBlock>

      <h3 className="mt-4">Python</h3>
      <T>
        <>
          If you have Python installed, you can use the http.server module.
          <br />
          Run the following command in the directory where the HTML file is
          located.
        </>
        <>
          Python をインストールしている場合は、http.server
          モジュールを使うことができます。
          <br />
          HTMLファイルがあるディレクトリで、以下のコマンドを実行します。
        </>
      </T>
      <CodeBlock filename="Command" language="bash">
        {`python3 -m http.server`}
      </CodeBlock>
    </Container>
  );
}
