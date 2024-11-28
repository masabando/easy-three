import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import T from "../components/Lang";
import { Demo } from "../components/home/Demo";
import CodeBlock from "../components/CodeBlock";

export default function Home() {
  return (
    <div className="pb-5">
      <div className="bg-body-tertiary">
        <Container className="py-3">
          <title>Home | easy-three</title>
          <h1 className="headTitle mt-5 mb-4">easy-three</h1>
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
      <div>
        <Container className="py-5 mw-100">
          <div className="d-flex justify-content-center justify-content-md-space-between flex-wrap flex-md-nowrap mw-100 mb-5">
            <Demo.Simple style={{
              width: "500px",
              maxWidth: "100%",
              aspectRatio: "4 / 3",
            }} />
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
                    短いコードで3Dを作成できます。<br />
                    アニメーションも簡単に設定できます。
                  </>
                </T>
              </p>
              <CodeBlock
                filename="index.js"
              >
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
          <div className="mb-5">
            <h4>
              <T>
                <>No Installation Required</>
                <>インストール不要</>
              </T>
            </h4>
            <p>
              <T>
                <>No special software or configuration is required.<br />You can start right away with just a browser.</>
                <>特別なソフトや設定は必要ありません。<br />ブラウザだけですぐに始められます。</>
              </T>
            </p>
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
                  You can create 3D objects with short code. <br />
                  Animations can also be set up easily.
                </>
                <>
                  短いコードで3Dを作成できます。<br />
                  アニメーションも簡単に設定できます。
                </>
              </T>
            </p>
            <CodeBlock
              filename="index.js"
            >
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
