"use client";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { Link } from "@/components/BaseKit";
import T from "@/components/Lang";
import { Demo } from "@/components/home/Demo";
import CodeBlock from "@/components/CodeBlock";
import { Progress, Switch, Tag } from "antd";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useState } from "react";

function Note({ children }) {
  return <span className="fw-bold">{children}</span>;
}

export default function Page() {
  const [worldControl, setWorldControl] = useState(false);
  return (
    <div>
      <div className="bg-body-tertiary pb-4">
        <Container className="py-3">
          <title>Home | easy-three</title>
          <h1 className="headTitle mt-5 mb-4">easy-three</h1>
          <div className="text-center mb-4">
            <div>
              <img alt="version" src="https://img.shields.io/github/v/tag/masabando/easy-three?style=flat&label=version" />
              {/* <Tag color="blue">v{currentVersion}</Tag> */}
            </div>
            <div className="mt-2">
              <img alt="npm" src="https://img.shields.io/npm/dm/%40masabando%2Feasy-three?style=flat&logo=npm" />
              <img className="ms-1" alt="jsDelivr monthly hits badge" src="https://img.shields.io/jsdelivr/gh/hm/masabando/easy-three?style=flat&logo=jsdelivr&logoColor=white" />
            </div>
            <div className="mt-2 d-flex flex-wrap justify-content-center gap-1">
                <img alt="github-stars" src="https://img.shields.io/github/stars/masabando/easy-three?style=flat&logo=github" />
                <img alt="last commit" src="https://img.shields.io/github/last-commit/masabando/easy-three?style=flat" />
                <img className="ms-1" alt="page build" src="https://img.shields.io/github/actions/workflow/status/masabando/easy-three/nextjs.yml?style=flat" />
            </div>
          </div>
          <div className="headMessage">
            <T>
              <>
                <span>Create stunning</span>
                <span className="impacted">3D</span>
                <span>with simple code.</span>
              </>
              <>
                <span>シンプルなコードで、魅力的な</span>
                <span className="impacted">3D</span>
                <span>を。</span>
              </>
            </T>
          </div>

          <div className="text-center mt-5 mb-3">
            <Button
              variant="primary"
              size="lg"
              as={Link}
              href="/getting-started"
            >
              <T>
                <>Get Started</>
                <>使ってみる</>
              </T>
            </Button>
            <Button
              variant="primary"
              size="lg"
              className="ms-3"
              as={Link}
              href="/reference"
            >
              <T>
                <>Reference</>
                <>ドキュメント</>
              </T>
            </Button>
          </div>
          <div className="text-center mb-5">
            <Button
              variant="primary"
              className="mt-1"
              as={Link}
              href="/classroom"
            >
              <T>
                <>Educational Use Cases</>
                <>教育機関向け活用例</>
              </T>
            </Button>
          </div>
        </Container>
      </div>

      <div className="py-0 mw-100 d-flex flex-column justify-content-center align-items-center">
        <div className="position-relative d-inline-block mw-100">
          <Switch
            style={{
              position: "absolute",
              top: "10px",
              right: "10px",
            }}
            defaultChecked={worldControl}
            onChange={setWorldControl}
            checkedChildren="タッチ操作ON"
            unCheckedChildren="タッチ操作OFF"
          />
          <Demo.World
            worldControl={worldControl}
            style={{
              width: "600px",
              aspectRatio: "6 / 4",
              maxWidth: "100%",
            }}
          />
        </div>
      </div>
      <div className="bg-body-tertiary pb-5 pt-4">
        <Container className="mw-100">
          <div className="my-4 d-flex justify-content-center">
            <CodeBlock language="zsh" className="mw-100">
              {`$ npm install @masabando/easy-three three @pixiv/three-vrm`}
            </CodeBlock>
          </div>
          <div className="mb-5">
            <h4>
              <T>
                <>Three.js made simple</>
                <>Three.js を簡単に</>
              </T>
            </h4>
            <p>
              <T>
                <>
                  Three.js&apos;s powerful features, simplified for beginners.
                  <br />
                  easy-three supports everything from creating objects to
                  animations and lighting setups.
                </>
                <>
                  Three.jsのパワフルな機能を、初心者でも簡単に。
                  <br />
                  easy-threeは、オブジェクトの作成からアニメーション、ライト設定までを一括でサポートします。
                </>
              </T>
            </p>
          </div>
          <div className="mb-5">
            <h4>
              <T>
                <>No Installation Required</>
                <>インストール不要</>
              </T>
            </h4>
            <p>
              <T>
                <>
                  No special software or configuration is required. You can
                  start right away with <Note>just a browser</Note>.<br />
                  It can also be used in environments where software
                  installation is restricted, such as schools.
                  <br />※ A server is required when loading resources such as
                  images (
                  <Link href="/getting-started#server">
                    details here
                  </Link>
                  ).{" "}
                </>
                <>
                  特別なソフトや設定は必要ありません。
                  <br />
                  <Note>Webブラウザだけ</Note>ですぐに始められます。
                  <br />
                  学校など、インストールできるソフトウェアが制限されている環境でも利用可能です。
                  <br />※ 画像などのリソースを読み込む場合は、サーバが必要です (
                  <Link
                    href="/getting-started#server"
                  >
                    詳細はこちら
                  </Link>
                  )。
                </>
              </T>
            </p>
          </div>
          <div className="d-flex justify-content-center justify-content-md-space-between flex-wrap flex-md-nowrap mw-100 mb-5">
            <Demo.Simple
              style={{
                width: "500px",
                maxWidth: "100%",
                aspectRatio: "4 / 3",
                overflow: "hidden",
              }}
            />
            <div className="w-100" style={{ maxWidth: "600px" }}>
              <h4>
                <T>
                  <>Simple Code</>
                  <>シンプルなコード</>
                </T>
              </h4>
              <p>
                <T>
                  <>
                    You can create 3D objects with short code. <br />
                    Animations can also be set up easily.
                  </>
                  <>
                    短いコードで3Dを作成できます。
                    <br />
                    アニメーションも簡単に設定できます。
                  </>
                </T>
              </p>
              <CodeBlock>
                {`const { camera, create, animate } = init()
camera.position.set(1, 1, 1)
create.ambientLight()
create.directionalLight()
const cube = create.cube({ rounded: true, segments: 7 })
animate(({ time }) => {
  cube.rotation.x = time
  cube.rotation.y = time
})
`}
              </CodeBlock>
            </div>
          </div>
          <div className="d-flex justify-content-center justify-content-md-space-between flex-wrap flex-md-nowrap mw-100 mb-5">
            <Demo.Model
              style={{
                width: "500px",
                maxWidth: "100%",
                aspectRatio: "4 / 3",
                overflow: "hidden",
              }}
            />
            <div className="w-100" style={{ maxWidth: "600px" }}>
              <h4>
                <T>
                  <>Quick and Easy Model Setup</>
                  <>簡単でスピーディーなモデルセットアップ</>
                </T>
              </h4>
              <p>
                <T>
                  <>
                    Displaying models like VRM is simple ( internally uses{" "}
                    <a href="https://github.com/pixiv/three-vrm">three-vrm</a>).
                    <br />
                    Mouse-based camera operation is also easy.
                  </>
                  <>
                    VRMモデルの表示なども簡単にできます (内部で{" "}
                    <a href="https://github.com/pixiv/three-vrm">three-vrm</a>{" "}
                    を使用しています)。
                    <br />
                    カメラの操作も簡単です。
                  </>
                </T>
              </p>
              <CodeBlock>
                {`const { camera, create, animate, controls, helper, load } = init();
controls.autoRotate = true
camera.position.set(0, 2, -2)
controls.target.set(0, 1, 0)
create.ambientLight()
create.directionalLight({ intensity: 2, position: [10, 10, -10] })
helper.axes()
helper.grid()

const cube = create.cube({
  size: 0.5,
  position: [1, 1, 0],
  rounded: true,
  segments: 7,
})

let model
load.vrm("./model/sample.vrm").then((m) => {
  model = m
})

animate(({ time, delta }) => {
  cube.rotation.y += delta
  cube.rotation.x += delta
  if (model) {
    model.bone("leftUpperArm").rotation.z =
      Math.sin(time) * Math.PI * 0.25
    model.update(delta)
  }
})
`}
              </CodeBlock>
            </div>
          </div>
          <div className="mb-5">
            <h4>
              <T>
                <>Can also be used with React</>
                <>Reactでも利用可能</>
              </T>
            </h4>
            <p>
              <T>
                <>
                  You can also use it directly with React. <br />
                  Perfect for adding a touch of 3D to your web page.
                </>
                <>
                  そのままReactで利用することも可能です。
                  <br />
                  Webページのちょっとしたアクセントに。
                </>
              </T>
            </p>
            <CodeBlock>
              {`const Simple = (props) => {
  const ref = useRef()
  useEffect(() => {
    const { camera, create, animate, destroy } = init(ref.current)
    camera.position.set(5, 5, 5);
    create.ambientLight()
    create.directionalLight()
    const cube = create.cube({ size: 3 })
    animate(({ time }) => {
      cube.rotation.x = time
      cube.rotation.y = time
    })
    return () => {
      destroy()
    }
  }, [])
  return (
    <div ref={ref} {...props}></div>
  )
}
`}
            </CodeBlock>
          </div>
        </Container>
      </div>

      <div className="pb-5">
        <Container>
          <h2>
            <T>
              <>Comparison with vanilla Three.js</>
              <>vanilla Three.js との比較</>
            </T>
          </h2>
          <div className="text-center text-md-start">
            <div className="d-inline-block text-center">
              <div className="mb-3">easy-three</div>
              <Progress
                type="dashboard"
                percent={~~((100 * 11) / 31)}
                strokeWidth={10}
              />
            </div>
            <div className="d-inline-block text-center ms-3">
              <div className="mb-3">vanilla Three.js</div>
              <Progress
                type="dashboard"
                percent={100}
                strokeWidth={10}
                percentPosition={{
                  align: "center",
                  type: "inner",
                }}
                strokeColor="red"
                status="normal"
              />
            </div>
            <div className="mt-3">
              <T>
                <>
                  Compared to vanilla Three.js, the code is simplified and
                  easier to understand.
                </>
                <>
                  通常の Three.js
                  と比較して、コードが簡略化され、理解しやすくなっています。
                </>
              </T>
            </div>
          </div>
          <Row xs={1} lg={2}>
            <Col>
              <CodeBlock showLineNumbers filename="easy-three">
                {`import { init } from "easy-three";
const { camera, create, controls, animate } = init()

// camera settings
camera.position.set(-2, 2, 2)

// use OrbitControls
controls.connect()

// add lights
create.ambientLight()
create.directionalLight()

// add cube
const cube = create.cube()

// animation
animate(({ delta }) => {
  cube.rotation.x += delta
  cube.rotation.y += delta
})`}
              </CodeBlock>
            </Col>
            <Col>
              <CodeBlock showLineNumbers filename="vanilla Three.js">
                {`import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
const scene = new THREE.Scene();
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)
renderer.shadowMap.enabled = true
renderer.setPixelRatio(window.devicePixelRatio)

// camera settings
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
camera.position.set(-2, 2, 2)

// use OrbitControls
const controls = new OrbitControls(camera, renderer.domElement)

// add lights
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
scene.add(ambientLight)
const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
directionalLight.position.set(5, 5, 5)
scene.add(directionalLight)

// add cube
const box = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshStandardMaterial({ color: 0x1155ff })
)
scene.add(box)

// animation
const clock = new THREE.Clock()
function animate() {
  controls.update()
  const delta = clock.getDelta()
  box.rotation.x += delta
  box.rotation.y += delta
  renderer.render(scene, camera)
}
renderer.setAnimationLoop(animate)`}
              </CodeBlock>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}
