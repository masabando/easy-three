import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import T from "../components/Lang";
import { Demo } from "../components/home/Demo";
import CodeBlock from "../components/CodeBlock";
import { Tag } from "antd";

function Note({ children }) {
  return (
    <span className="fw-bold">{children}</span>
  );
}

export default function Home() {
  return (
    <div className="pb-5">
      <div className="bg-body-tertiary pb-4">
        <Container className="py-3">
          <title>Home | easy-three</title>
          <h1 className="headTitle mt-5 mb-4">easy-three</h1>
          <div className="text-center mb-4">
            <Tag color="blue" size>
              v0.0.9
            </Tag>
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

          <div className="text-center my-5">
            <Button variant="primary" size="lg" as={Link} to="/getting-started">
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
              to="/reference"
            >
              <T>
                <>Reference</>
                <>ドキュメント</>
              </T>
            </Button>
          </div>
        </Container>
      </div>

      <div className="py-0 mw-100 d-flex justify-content-center">
        <Demo.World
          style={{
            width: "600px",
            aspectRatio: "6 / 4",
            maxWidth: "100%",
          }}
        />
      </div>
      <div>
        <Container className="py-5 mw-100">
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
                  Three.js&apos;s powerful features, simplified for beginners.<br />
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
                  No special software or configuration is required.
                  <br />
                  You can start right away with <Note>just a browser</Note>.
                  <br />
                  It can also be used in environments where software
                  installation is restricted, such as schools.
                </>
                <>
                  特別なソフトや設定は必要ありません。
                  <br />
                  <Note>Webブラウザだけ</Note>ですぐに始められます。
                  <br />
                  学校など、インストールできるソフトウェアが制限されている環境でも利用可能です。
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
              <CodeBlock filename="index.js">
                {`const { camera, create, animate } = init()
camera.position.set(5, 5, 5);
create.ambientLight()
create.directionalLight()
const cube = create.cube({ size: 6 })
animate(({ clock }) => {
  cube.rotation.x = clock.getElapsedTime()
  cube.rotation.y = clock.getElapsedTime()
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
                    You can easily display models such as VRM. <br />
                    Camera operation with a mouse is also available.
                  </>
                  <>
                    VRMモデルの表示なども簡単にできます。
                    <br />
                    カメラの操作も簡単です。
                  </>
                </T>
              </p>
              <CodeBlock filename="index.js">
                {`const { camera, create, animate, controls, helper, load } = init();

controls.connect()
controls.autoRotate = true
camera.position.set(0, 2, -2)
controls.target.set(0, 1, 0)
create.ambientLight()
create.directionalLight({ intensity: 2, position: [10, 10, -10] })
helper.axes();
helper.grid();
const cube = create.cube({ size: 0.5, position: [1, 1, 0] })
let model;
load.vrm("./model/sample.vrm").then(m => {
  model = m
})
animate(({ clock, delta }) => {
  cube.rotation.y += delta
  cube.rotation.x += delta
  if (model) {
    model.humanoid.getNormalizedBoneNode("leftUpperArm").rotation.z = Math.sin(clock.getElapsedTime()) * Math.PI * 0.25
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
            <CodeBlock filename="index.js">
              {`const Simple = (props) => {
  const ref = useRef()
  useEffect(() => {
    const { camera, create, animate } = init(ref.current)
    camera.position.set(5, 5, 5);
    create.ambientLight()
    create.directionalLight()
    const cube = create.cube({ size: 3 })
    animate(({ clock }) => {
      cube.rotation.x = clock.getElapsedTime()
      cube.rotation.y = clock.getElapsedTime()
    })
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
    </div>
  );
}
