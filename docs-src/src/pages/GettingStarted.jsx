import Container from "react-bootstrap/Container";
import CodeBlock from "../components/CodeBlock";
import Button from "react-bootstrap/Button";
import T from "../components/Lang";
import { Link } from "react-router-dom";

export default function GettingStarted() {
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
        <Button href="./template/easy-three-template.zip">
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
            To edit the code, use an editor like VSCode.
          </>
          <>
            index.html をWebブラウザにドラッグ＆ドロップすると表示できます。
            <br />
            コードを書き換えるには、VSCodeなどのエディタを使ってください。
          </>
        </T>
      </p>
      <p>
        <T>
          <>
            For more information on how to use the template, see the{" "}
            <Link to="/reference">Reference</Link> .
          </>
          <>
            テンプレートの使い方については、{" "}
            <Link to="/reference">Reference</Link> を参照してください。
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
      "three/addons/": "https://cdn.jsdelivr.net/npm/three@0.170.0/examples/jsm/"
    }
  }
</script>`}
      </CodeBlock>
      <CodeBlock filename="JavaScript" language="javascript">
        {`import { init } from "https://cdn.jsdelivr.net/gh/masabando/easy-three@0.0.7/dist/easy-three.js";`}
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
    import { init } from "https://cdn.jsdelivr.net/gh/masabando/easy-three@0.0.7/dist/easy-three.js";
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
    </Container>
  );
}
