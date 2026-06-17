import { Link } from "@/components/BaseKit";
import T from "@/components/Lang";
import { DemoSimple, DemoModelAnimation } from "@/components/home/Demo";
import CodeBlock from "@/components/CodeBlock";
import TopAnimation from "@/components/TopAnimation";

function Note({ children }) {
  return <span className="font-bold">{children}</span>;
}

export default function Page() {
  return (
    <div className="py-20">
      <title>easy-three</title>
      <div>
        <h1 className="text-4xl text-center">easy-three</h1>
        <div className="flex flex-col items-center gap-2 mt-4">
          <div>
            <img alt="version" src="https://img.shields.io/github/v/tag/masabando/easy-three?style=flat&label=version" />
          </div>
          <div className="flex flex-wrap justify-center gap-1">
            <img alt="npm" src="https://img.shields.io/npm/dm/%40masabando%2Feasy-three?style=flat&logo=npm" />
            <img className="ms-1" alt="jsDelivr monthly hits badge" src="https://img.shields.io/jsdelivr/gh/hm/masabando/easy-three?style=flat&logo=jsdelivr&logoColor=white" />
          </div>
          <div className="flex flex-wrap justify-center gap-1">
            <img alt="github-stars" src="https://img.shields.io/github/stars/masabando/easy-three?style=flat&logo=github" />
            <img alt="last commit" src="https://img.shields.io/github/last-commit/masabando/easy-three?style=flat" />
            <img className="ms-1" alt="page build" src="https://img.shields.io/github/actions/workflow/status/masabando/easy-three/nextjs.yml?style=flat" />
          </div>
        </div>
        <div className="text-center mt-10 text-lg">
          <T>
            <>
              <span>Create stunning</span>
              <span className="text-xl font-medium px-1 text-shadow-[1px_1px_4px_rgba(0,130,255,0.7)]">3D</span>
              <span>with simple code.</span>
            </>
            <>
              <span>シンプルなコードで、魅力的な</span>
              <span className="text-xl font-medium px-1 text-shadow-[1px_1px_4px_rgba(0,130,255,0.7)]">3D</span>
              <span>を。</span>
            </>
          </T>
        </div>

        <div className="flex flex-col items-center gap-3 mt-6 mb-10 text-sm">
          <div className="flex justify-center mt-6 gap-3">
            <Link
              className="btn btn-primary btn-soft"
              href="/getting-started"
            >
              <T>
                <>Get Started</>
                <>使ってみる</>
              </T>
            </Link>
            <Link
              className="btn btn-primary btn-soft"
              href="/reference"
            >
              <T>
                <>Reference</>
                <>ドキュメント</>
              </T>
            </Link>
          </div>
          <div className="flex justify-center">
            <Link
              className="btn btn-primary btn-soft"
              href="/classroom"
            >
              <T>
                <>Educational Use Cases</>
                <>教育機関向け活用例</>
              </T>
            </Link>
          </div>
        </div>
      </div>

      <TopAnimation />


      <div className="px-3 max-w-full">
        <div className="max-w-full">
          <div className="my-10 flex justify-center">
            <CodeBlock language="zsh" className="max-w-full">
              {`$ npm install @masabando/easy-three`}
            </CodeBlock>
          </div>
          <div className="mb-5 mt-20">
            <h4 className="text-2xl mb-3">
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

          <div className="mb-5 mt-20">
            <h4 className="text-2xl mb-3">
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
                  <Link className="text-blue-500 underline" href="/getting-started#server">
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
                    className="text-blue-500 underline"
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
            <DemoSimple
              style={{
                width: "500px",
                maxWidth: "100%",
                aspectRatio: "4 / 3",
                overflow: "hidden",
              }}
            />
            <div className="max-w-full" style={{ maxWidth: "600px" }}>
              <h4 className="text-2xl mb-3">
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
            <DemoModelAnimation
              style={{
                width: "500px",
                maxWidth: "100%",
                aspectRatio: "4 / 3",
                overflow: "hidden",
              }}
            />
            <div className="mb-5 mt-20">
              <h4 className="text-2xl mb-3">
                <T>
                  <>Quick and Easy Model Setup</>
                  <>簡単でスピーディーなモデルセットアップ</>
                </T>
              </h4>
              <p>
                <T>
                  <>
                    Displaying models like VRM is simple ( internally uses{" "}
                    <a className="text-blue-500 underline" href="https://github.com/pixiv/three-vrm">three-vrm</a>).
                    <br />
                    Mouse-based camera operation is also easy.
                  </>
                  <>
                    VRMモデルの表示なども簡単にできます (内部で{" "}
                    <a className="text-blue-500 underline" href="https://github.com/pixiv/three-vrm">three-vrm</a>{" "}
                    を使用しています)。
                    <br />
                    mocopiでトラッキングしたモーションデータをVRMモデルに簡単に反映できます。<br />
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
load.vrm("./model/sample.vrm", {
  position: [0, -0.55, 0],
  bvh: "./motion/sampleMotion.bvh",
}).then((m) => {
  model = m
})

animate(({ delta }) => {
  cube.rotation.y += delta
  cube.rotation.x += delta
  if (model) {
    model.updateWithAnimation(delta);
  }
})
`}
              </CodeBlock>
            </div>
          </div>
          <div className="mb-5 mt-20">
            <h4 className="text-2xl mb-3">
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
        </div>
      </div>


      <div className="pb-5 px-3 max-w-full">
        <div>
          <h2 className="text-3xl mb-5">
            <T>
              <>Comparison with vanilla Three.js</>
              <>vanilla Three.js との比較</>
            </T>
          </h2>
          <div className="text-center">
            <div className="flex flex-wrap justify-center gap-10 mb-5">
              <div>
                <div className="mb-3">easy-three</div>
                <div
                  className="radial-progress text-success text-2xl font-bold"
                  style={{
                    "--value": ~~((100 * 11) / 31),
                    "--size": "9rem",
                    "--thickness": "0.8rem",
                  }}
                >
                  35%
                </div>
              </div>
              <div>
                <div className="mb-3">vanilla Three.js</div>
                <div
                  className="radial-progress text-error text-2xl font-bold"
                  style={{
                    "--value": 100,
                    "--size": "9rem",
                    "--thickness": "0.8rem",
                  }}
                >
                  100%
                </div>
              </div>
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
          <div className="flex flex-wrap justify-center mt-6 gap-3">
            <div className="w-120 max-w-full">
              <CodeBlock
                showLineNumbers
                filename="easy-three"
              >
                {`import { init } from "@masabando/easy-three";
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
            </div>
            <div className="w-120 max-w-full">
              <CodeBlock
                showLineNumbers
                filename="vanilla Three.js"
                style={{
                  maxWidth: "100%",
                }}
              >
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
