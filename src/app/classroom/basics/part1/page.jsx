"use client";
import CodeBlock from "@/components/CodeBlock";
import { init } from "@dist/easy-three";
import { useEffect, useRef } from "react";

export default function Page() {
  return (
    <div>
      <h2>1. 立方体を表示する</h2>
      <p>
        このセクションでは、easy-threeライブラリを使用して、シンプルな立方体を表示する方法を学びます。
        <br />
        以下のサンプルコードを使って、基本的な3D描画の手法を理解しましょう。
      </p>

      <h3>サンプルコード</h3>
      <CodeBlock language="html">
        {`<!DOCTYPE html>
<html lang="ja">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>easy-three template</title>
  <script type="importmap">
    {
      "imports": {
        "three": "https://cdn.jsdelivr.net/npm/three@0.170.0/build/three.module.js",
        "three/addons/": "https://cdn.jsdelivr.net/npm/three@0.170.0/examples/jsm/",
        "@pixiv/three-vrm": "https://cdn.jsdelivr.net/npm/@pixiv/three-vrm@3/lib/three-vrm.module.min.js",
        "easy-three": "https://cdn.jsdelivr.net/gh/masabando/easy-three@0.0.14/dist/easy-three.js"
      }
    }
  </script>
</head>

<body>
  <script type="module">
    import { init } from "easy-three";
    const { camera, create, animate } = init();

    camera.position.set(-2, 2, 2)
    create.ambientLight()
    create.cube()

    animate()
  </script>
</body>

</html>
`}
      </CodeBlock>
      <p>
        このコードは、easy-threeライブラリを使って立方体を表示するための最小限のコードです。
        <br />
        このコードを実行すると、画面の中央に立方体が表示されます。
      </p>
      <Code1 />
    </div>
  );
}

function Code1(props) {
  const ref = useRef();
  useEffect(() => {
    const { camera, create, animate, destroy } = init(ref.current);
    camera.position.set(-2, 2, 2);
    create.ambientLight();
    create.cube();
    animate();
    return () => {
      destroy();
    };
  }, []);
  return (
    <div
      ref={ref} {...props}
      style={{
        width: "500px",
        maxWidth: "90%",
        aspectRatio: "4 / 3",
        border: "1px solid #ccc",
      }}
    >
    </div>
  );
}
