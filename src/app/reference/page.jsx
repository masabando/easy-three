"use client";
import Container from "react-bootstrap/Container";
import styles from "./Reference.module.scss";
import { Link } from "@/components/BaseKit";
import Accordion from "react-bootstrap/Accordion";

function ReferenceContent({
  name,
  args,
  returnObject,
  argsInfo,
  href,
  children,
}) {
  return (
    <div className={styles.reference}>
      <h3>
        {href ? <Link href={href}>{name}</Link> : name}({args}) :{" "}
        <span>{returnObject}</span>
      </h3>
      <div>
        <div>{argsInfo}</div>
        {children}
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <Container className="pt-4 pb-5">
      <title>Reference | easy-three</title>
      <h1>Reference</h1>

      <h2>Functions</h2>

      <div>
        <Accordion>
          <Accordion.Item eventKey="0">
            <Accordion.Header>base</Accordion.Header>
            <Accordion.Body>
              <ReferenceContent
                name="init"
                args="target : String | DOMElement"
                returnObject="Object"
                argsInfo={
                  <div>
                    <span>target</span>
                    (optional) - 描画対象のDOMセレクター、もしくはDOM要素
                    (デフォルト : document.body)。
                  </div>
                }
              >
                初期化関数。
                <br />
                指定されたターゲットに対して、シーン、カメラ、レンダラー、コントロールを初期化します。
                <br />
                ウィンドウサイズ変更時の自動リサイズに対応。
                <br />
                戻り値は、Default, scene, camera, renderer, controls, create,
                animate, color, helper, load, THREE, destroy
                のオブジェクトです。
              </ReferenceContent>
              <ReferenceContent
                name="animate"
                args="proc : Function, renderFlag : Boolean"
                returnObject="undefined"
                argsInfo={
                  <>
                    <div>
                      <span>proc({`{ clock, delta }`})</span> -
                      各フレームごとに実行される関数。
                      <ul>
                        <li>
                          clock (THREE.Clock) :
                          フレーム間の時間を管理するオブジェクト。
                        </li>
                        <li>
                          delta (Number) :
                          前回のフレームからの経過時間（秒単位）。
                        </li>
                        <li>
                          time (Number) :
                          アニメーション開始からの経過時間（秒単位）。
                        </li>
                      </ul>
                    </div>
                    <div>
                      <span>renderFlag</span> - レンダリングするかどうか
                      (デフォルト : true)。
                    </div>
                  </>
                }
              >
                アニメーションループを開始します。
                <br />
                指定した関数を各フレームごとに実行し、レンダリングを行います。
              </ReferenceContent>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="1">
            <Accordion.Header>create</Accordion.Header>
            <Accordion.Body>
              <ReferenceContent
                name="create.object"
                args="geometry : Geometry, props : Object"
                returnObject="Mesh"
                argsInfo={
                  <>
                    <div>
                      <span>geometry</span>
                      - 作成するジオメトリのタイプ。
                      <br />
                      THREE.BoxGeometry, THREE.SphereGeometry,
                      THREE.PlaneGeometry など。
                    </div>
                    <div>
                      <span>props</span>- 設定オブジェクト。
                      <ul>
                        <li>
                          args (Array | Number) : ジオメトリの引数 (デフォルト :
                          [1, 1, 1]、ジオメトリによって次元は異なる)。
                        </li>
                        <li>
                          position (Array) : 位置 (デフォルト : [0, 0, 0])。
                        </li>
                        <li>
                          rotation (Array) : 回転 (デフォルト : [0, 0, 0])。
                        </li>
                        <li>
                          option (Object) : オプション (デフォルト :{" "}
                          {`{color: 0xffffff }`})。
                        </li>
                        <li>
                          material (String) : マテリアルタイプ (デフォルト :
                          &quot;Physical&quot;)。
                        </li>
                        <li>
                          castShadow (Boolean) :
                          別のオブジェクトに影を落とすかどうか (デフォルト :
                          true)。
                        </li>
                        <li>
                          receiveShadow (Boolean) :
                          別のオブジェクトからの影を受けるかどうか (デフォルト :
                          true)。
                        </li>
                        <li>
                          autoAdd (Boolean) : 自動でシーンに追加 (デフォルト :
                          true)。
                        </li>
                      </ul>
                    </div>
                  </>
                }
              >
                ジオメトリを作成し、メッシュを返します。
              </ReferenceContent>

              <ReferenceContent
                name="create.cube"
                args="props : Object"
                returnObject="Mesh"
                href="/reference/create/cube/"
                argsInfo={
                  <div>
                    <span>props</span> - 設定オブジェクト。
                    <ul>
                      <li>
                        size (Array | Number) : サイズ (デフォルト : [1, 1,
                        1])。
                      </li>
                      <li>
                        position (Array) : 位置 (デフォルト : [0, 0, 0])。
                      </li>
                      <li>
                        rotation (Array) : 回転 (デフォルト : [0, 0, 0])。
                      </li>
                      <li>
                        rounded (Boolean) : 角丸にするか？ (デフォルト :
                        false)。
                      </li>
                      <li>radius (Number) : 角丸の半径 (デフォルト : 0.1)。</li>
                      <li>
                        option (Object) : オプション (デフォルト :{" "}
                        {`{color: 0x1155ff }`})。
                      </li>
                      <li>
                        material (String) : マテリアルタイプ (デフォルト :
                        &quot;Physical&quot;)。
                      </li>
                      <li>
                        castShadow (Boolean) :
                        別のオブジェクトに影を落とすかどうか (デフォルト :
                        true)。
                      </li>
                      <li>
                        receiveShadow (Boolean) :
                        別のオブジェクトからの影を受けるかどうか (デフォルト :
                        true)。
                      </li>
                      <li>
                        autoAdd (Boolean) : 自動でシーンに追加 (デフォルト :
                        true)。
                      </li>
                    </ul>
                  </div>
                }
              >
                キューブ (立方体) を作成してシーンに追加します。
              </ReferenceContent>

              <ReferenceContent
                name="create.box"
                args="props : Object"
                returnObject="Mesh"
                href="/reference/create/cube/"
              >
                create.cube と同じです。
              </ReferenceContent>

              <ReferenceContent
                name="create.sphere"
                args="props : Object"
                returnObject="Mesh"
                href="/reference/create/sphere/"
                argsInfo={
                  <div>
                    <span>props</span> - 設定オブジェクト。
                    <ul>
                      <li>size (Number) : 半径 (デフォルト : 1)。</li>
                      <li>
                        segments (Array | Number) : セグメント (デフォルト :
                        64)。
                      </li>
                      <li>
                        position (Array) : 位置 (デフォルト : [0, 0, 0])。
                      </li>
                      <li>
                        rotation (Array) : 回転 (デフォルト : [0, 0, 0])。
                      </li>
                      <li>
                        option (Object) : オプション (デフォルト :{" "}
                        {`{color: 0x1155ff }`})。
                      </li>
                      <li>
                        material (String) : マテリアルタイプ (デフォルト :
                        &quot;Physical&quot;)。
                      </li>
                      <li>
                        castShadow (Boolean) :
                        別のオブジェクトに影を落とすかどうか (デフォルト :
                        true)。
                      </li>
                      <li>
                        receiveShadow (Boolean) :
                        別のオブジェクトからの影を受けるかどうか (デフォルト :
                        true)。
                      </li>
                      <li>
                        autoAdd (Boolean) : 自動でシーンに追加 (デフォルト :
                        true)。
                      </li>
                    </ul>
                  </div>
                }
              >
                球体を作成してシーンに追加します。
              </ReferenceContent>

              <ReferenceContent
                name="create.plane"
                args="props : Object"
                returnObject="Mesh"
                //href="/reference/create/plane/"
                argsInfo={
                  <div>
                    <span>props</span> - 設定オブジェクト。
                    <ul>
                      <li>
                        size (Array | Number) : サイズ (デフォルト : [1, 1])。
                      </li>
                      <li>
                        position (Array) : 位置 (デフォルト : [0, 0, 0])。
                      </li>
                      <li>
                        rotation (Array) : 回転 (デフォルト : [0, 0, 0])。
                      </li>
                      <li>
                        option (Object) : オプション (デフォルト :{" "}
                        {`{color: 0x1155ff }`})。
                      </li>
                      <li>
                        material (String) : マテリアルタイプ (デフォルト :
                        &quot;Physical&quot;)。
                      </li>
                      <li>
                        castShadow (Boolean) :
                        別のオブジェクトに影を落とすかどうか (デフォルト :
                        true)。
                      </li>
                      <li>
                        receiveShadow (Boolean) :
                        別のオブジェクトからの影を受けるかどうか (デフォルト :
                        true)。
                      </li>
                      <li>
                        autoAdd (Boolean) : 自動でシーンに追加 (デフォルト :
                        true)。
                      </li>
                    </ul>
                  </div>
                }
              >
                平面を作成してシーンに追加します。
              </ReferenceContent>

              <ReferenceContent
                name="create.group"
                args="props : Object"
                returnObject="Group"
                argsInfo={
                  <div>
                    <span>props</span> - 設定オブジェクト。
                    <ul>
                      <li>
                        position (Array) : 位置 (デフォルト : [0, 0, 0])。
                      </li>
                      <li>
                        rotation (Array) : 回転 (デフォルト : [0, 0, 0])。
                      </li>
                      <li>
                        children (Array&lt;Object3D&gt;) : 子要素の配列
                        (デフォルト : [])
                      </li>
                      <li>
                        autoAdd (Boolean) : 自動でシーンに追加 (デフォルト :
                        true)。
                      </li>
                    </ul>
                  </div>
                }
              >
                グループを作成してシーンに追加します。引数で最初に追加する子要素を指定できます。
              </ReferenceContent>

              <ReferenceContent
                name="create.ambientLight"
                args="props : Object"
                returnObject="Light"
                argsInfo={
                  <div>
                    <span>props</span> - 設定オブジェクト。
                    <ul>
                      <li>
                        color (Hex) : ライトの色 (デフォルト : 0xffffff)。
                      </li>
                      <li>
                        intensity (Number) : 光の強さ (デフォルト : 0.5)。
                      </li>
                    </ul>
                  </div>
                }
              >
                環境光を作成してシーンに追加します。
              </ReferenceContent>

              <ReferenceContent
                name="create.pointLight"
                args="props : Object"
                returnObject="Light"
                argsInfo={
                  <div>
                    <span>props</span> - 設定オブジェクト。
                    <ul>
                      <li>
                        color (Hex) : ライトの色 (デフォルト : 0xffffff)。
                      </li>
                      <li>intensity (Number) : 光の強さ (デフォルト : 1)。</li>
                      <li>
                        distance (Number) : ライトの距離 (デフォルト : 0)。
                      </li>
                      <li>decay (Number) : 光の減衰率 (デフォルト : 2)。</li>
                      <li>
                        position (Array) : 位置 (デフォルト : [6, 6, 6])。
                      </li>
                      <li>
                        castShadow (Boolean) : 影を投影するかどうか (デフォルト
                        : true)。
                      </li>
                      <li>shadow (Object) : シャドウの設定。</li>
                    </ul>
                  </div>
                }
              >
                点光源を作成してシーンに追加します。
              </ReferenceContent>

              <ReferenceContent
                name="create.directionalLight"
                args="props : Object"
                returnObject="Light"
                argsInfo={
                  <div>
                    <span>props</span> - 設定オブジェクト。
                    <ul>
                      <li>intensity (Number) : 光の強さ (デフォルト : 1)。</li>
                      <li>
                        color (Hex) : ライトの色 (デフォルト : 0xffffff)。
                      </li>
                      <li>
                        position (Array) : ライトの位置 (デフォルト : [10, 10,
                        10])。
                      </li>
                      <li>
                        castShadow (Boolean) : 影を投影するかどうか (デフォルト
                        : true)。
                      </li>
                      <li>
                        shadow (Object) : シャドウの設定。
                        <ul>
                          <li>
                            mapSize (Object) : シャドウマップのサイズ
                            (デフォルト : {`{width: 1024, height: 1024 }`})。
                          </li>
                          <li>
                            camera (Object) : シャドウカメラの設定。
                            <ul>
                              <li>
                                left (Number) : カメラの左範囲 (デフォルト :
                                -10)。
                              </li>
                              <li>
                                right (Number) : カメラの右範囲 (デフォルト :
                                10)。
                              </li>
                              <li>
                                top (Number) : カメラの上範囲 (デフォルト :
                                10)。
                              </li>
                              <li>
                                bottom (Number) : カメラの下範囲 (デフォルト :
                                -10)。
                              </li>
                            </ul>
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </div>
                }
              >
                平行光源を作成してシーンに追加します。
              </ReferenceContent>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="2">
            <Accordion.Header>helper</Accordion.Header>
            <Accordion.Body>
              <ReferenceContent
                name="helper.grid"
                args="props : Object"
                returnObject="GridHelper"
                argsInfo={
                  <div>
                    <span>props</span> - 設定オブジェクト。
                    <ul>
                      <li>
                        size (Number) : グリッドのサイズ (デフォルト : 10)。
                      </li>
                      <li>divisions (Number) : 分割数 (デフォルト : 10)。</li>
                      <li>
                        colorCenterLine (Hex) : 中心線の色 (デフォルト :
                        0x444444)。
                      </li>
                      <li>
                        colorGrid (Hex) : グリッド線の色 (デフォルト :
                        0x888888)。
                      </li>
                    </ul>
                  </div>
                }
              >
                グリッドヘルパーを作成してシーンに追加します。
              </ReferenceContent>

              <ReferenceContent
                name="helper.axes"
                args="props : Object"
                returnObject="AxesHelper"
                argsInfo={
                  <div>
                    <span>props</span> - 設定オブジェクト。
                    <ul>
                      <li>
                        size (Number) : 軸ヘルパーのサイズ (デフォルト : 10)。
                      </li>
                    </ul>
                  </div>
                }
              >
                軸ヘルパーを作成してシーンに追加します。
              </ReferenceContent>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="3">
            <Accordion.Header>load</Accordion.Header>
            <Accordion.Body>
              <ReferenceContent
                name="load.vrm"
                args="url : String, props : Object"
                returnObject="VRM"
                argsInfo={
                  <>
                    <div>
                      <span>url</span> - VRMモデルのURL。
                    </div>
                    <div>
                      <span>props</span> - 設定オブジェクト。
                      <ul>
                        <li>
                          position (Array) : モデルの位置 (デフォルト : [0, 0,
                          0])。
                        </li>
                        <li>
                          rotation (Array) : モデルの回転 (デフォルト : [0, 0,
                          0])。
                        </li>
                        <li>
                          scale (Array) : モデルのスケール (デフォルト : [1, 1,
                          1])。
                        </li>
                        <li>
                          autoAdd (Boolean) : 自動でシーンに追加するか
                          (デフォルト : true)。
                        </li>
                      </ul>
                    </div>
                  </>
                }
              >
                VRMモデルを読み込み、オプションに基づいてシーンに追加します。
              </ReferenceContent>

              <ReferenceContent
                name="load.gltf"
                args="url : String, props : Object"
                returnObject="GLTF"
                argsInfo={
                  <>
                    <div>
                      <span>url</span> - GLTFモデルのURL。
                    </div>
                    <div>
                      <span>props</span> - 設定オブジェクト。
                      <ul>
                        <li>
                          position (Array) : モデルの位置 (デフォルト : [0, 0,
                          0])。
                        </li>
                        <li>
                          rotation (Array) : モデルの回転 (デフォルト : [0, 0,
                          0])。
                        </li>
                        <li>
                          scale (Array) : モデルのスケール (デフォルト : [1, 1,
                          1])。
                        </li>
                        <li>
                          autoAdd (Boolean) : 自動でシーンに追加するか
                          (デフォルト : true)。
                        </li>
                      </ul>
                    </div>
                  </>
                }
              >
                GLTFモデルを読み込み、オプションに基づいてシーンに追加します。
              </ReferenceContent>

              <ReferenceContent
                name="load.background"
                args="url : String"
                returnObject="undefined"
                argsInfo={
                  <div>
                    <span>url</span> - 背景テクスチャのURL。
                  </div>
                }
              >
                指定されたHDR形式の画像をロードし、シーンの背景と環境マップに設定します。
              </ReferenceContent>

              <ReferenceContent
                name="load.texture"
                args="url : String, props : Object"
                returnObject="Texture"
                argsInfo={
                  <>
                    <div>
                      <span>url</span> - テクスチャのURL。
                    </div>
                    <div>
                      <span>props</span> - 設定オブジェクト。
                      <ul>
                        <li>
                          wrapS (number) : テクスチャのラッピングモード
                          (デフォルト : &quot;Repeat&quot;)。
                        </li>
                        <li>
                          wrapT (number) : テクスチャのラッピングモード
                          (デフォルト : &quot;Repeat&quot;)。
                        </li>
                        <li>
                          repeat (Array) : テクスチャの繰り返し回数 (デフォルト
                          : [1, 1])。
                        </li>
                      </ul>
                    </div>
                  </>
                }
              >
                指定された画像をロードし、テクスチャを作成します。
                <br />
                テクスチャの繰り返しを有効にするには、wrapSおよびwrapTを
                &quot;Repeat&quot; または &quot;MirroredRepeat&quot;
                に設定する必要があります。
              </ReferenceContent>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="4">
            <Accordion.Header>event</Accordion.Header>
            <Accordion.Body>
              <ReferenceContent
                name="event.mouse.add"
                args="callback : Function, option: Object"
                returnObject="Function"
                argsInfo={
                  <>
                    <div>
                      <span>callback(pos, e)</span>- コールバック関数。
                      <ul>
                        <li>
                          pos (THREE.Vector2) :
                          イベントが発生したオブジェクトに対する発生場所の相対座標。
                        </li>
                        <li>e (PointerEvents) : イベントオブジェクト。</li>
                      </ul>
                    </div>
                    <div>
                      <span>option</span> - 設定オブジェクト。
                      <ul>
                        <li>
                          type (String) : イベントのリスナータイプ (デフォルト :
                          &quot;once&quot;)。
                        </li>
                      </ul>
                    </div>
                  </>
                }
              >
                マウスイベント追加関数。
                <br />
                マウスのクリックイベントに反応する関数を登録します。
                <br />
                マウスのクリックが
                <ol>
                  <li>押された時</li>
                  <li>離された時</li>
                  <li>押して離された時</li>
                  <li>動かされた時</li>
                  <li>上記のすべての時</li>
                </ol>
                の動作を指定できます。
                <br />
                イベントの登録解除用関数を返します。
              </ReferenceContent>

              <ReferenceContent
                name="event.key.add"
                args="callback : Function, option: Object"
                returnObject="Function"
                argsInfo={
                  <>
                    <div>
                      <span>callback(key, e)</span>- コールバック関数。
                      <ul>
                        <li>
                          key (String) :
                          イベントが発生した原因となったキー文字列。
                        </li>
                        <li>e (KeyEvent) : イベントオブジェクト。</li>
                      </ul>
                    </div>
                    <div>
                      <span>option</span> - 設定オブジェクト。
                      <ul>
                        <li>
                          type (String) : イベントのリスナータイプ (デフォルト :
                          &quot;once&quot;)。
                        </li>
                        <li>
                          trigger (String | RegExp) : 追加のイベント発生条件
                          (デフォルト : /[A-Za-z]/)。
                        </li>
                      </ul>
                    </div>
                  </>
                }
              >
                キーボードイベント追加関数。
                <br />
                キーボードのイベントに反応する関数を登録します。
                <br />
                キーボードのキーが
                <ol>
                  <li>押された時</li>
                  <li>離された時</li>
                  <li>押して離された時</li>
                  <li>上記のすべての時</li>
                </ol>
                の動作を指定できます。
                <br />
                イベントの登録解除用関数を返します。
              </ReferenceContent>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="5">
            <Accordion.Header>postprocessing</Accordion.Header>
            <Accordion.Body>
              <ReferenceContent
                name="postprocessing.bloom"
                args="props : Object"
                returnObject="Object"
                href="/reference/postprocessing/bloom/"
                argsInfo={
                  <>
                    <div>
                      <span>props</span> - 設定オブジェクト。
                      <ul>
                        <li>exposure (Number) : 曝光度 (デフォルト : 1)。</li>
                        <li>
                          background (Color) : 背景色 (デフォルト : 0x000000)。
                        </li>
                        <li>threshold (Number) : 閾値 (デフォルト : 0)。</li>
                        <li>
                          strength (Number) : ブルームの強さ (デフォルト : 1)。
                        </li>
                        <li>
                          radius (Number) : ブラー半径 (デフォルト : 0.5)。
                        </li>
                      </ul>
                    </div>
                  </>
                }
              >
                Bloomエフェクトを追加します。
                <br />
                曝光度、背景色、閾値、強さ、半径を設定できます。
                <br />
                戻り値は、bloom のみのオブジェクトです。
                <br />
                戻り値の bloom は、animate
                の中で呼び出すことでエフェクトを適用します。
                <br />
                animate の第2引数を false にしてください。
              </ReferenceContent>
              <ReferenceContent
                name="postprocessing.selectedBloom"
                args="props : Object"
                returnObject="Object"
                href="/reference/postprocessing/selectedBloom/"
                argsInfo={
                  <>
                    <div>
                      <span>props</span> - 設定オブジェクト。
                      <ul>
                        <li>exposure (Number) : 曝光度 (デフォルト : 1)。</li>
                        <li>
                          background (Color) : 背景色 (デフォルト : 0x000000)。
                        </li>
                        <li>threshold (Number) : 閾値 (デフォルト : 0)。</li>
                        <li>
                          strength (Number) : ブルームの強さ (デフォルト : 1)。
                        </li>
                        <li>
                          radius (Number) : ブラー半径 (デフォルト : 0.5)。
                        </li>
                      </ul>
                    </div>
                  </>
                }
              >
                オブジェクトを限定したBloomエフェクトを追加します。
                <br />
                曝光度、背景色、閾値、強さ、半径を設定できます。
                <br />
                戻り値は、selectedBloom と addSelectedBloom のオブジェクトです。
                <br />
                戻り値の selectedBloom は、animate
                の中で呼び出すことでエフェクトを適用します。
                <br />
                animate の第2引数を false にしてください。
                <br />
                addSelectedBloom
                は、引数で選択したオブジェクトにエフェクトを適用します。
              </ReferenceContent>
              <ReferenceContent
                name="postprocessing.pixel"
                args="props : Object"
                returnObject="Object"
                href="/reference/postprocessing/pixel/"
                argsInfo={
                  <>
                    <div>
                      <span>props</span> - 設定オブジェクト。
                      <ul>
                        <li>
                          size (Number) : ピクセルサイズ (デフォルト : 6)。
                        </li>
                        <li>
                          normalEdge (Number) : 法線エッジの強さ (デフォルト :
                          0.3)。
                        </li>
                        <li>
                          depthEdge (Number) : 深度エッジの強さ (デフォルト :
                          0.4)。
                        </li>
                      </ul>
                    </div>
                  </>
                }
              >
                Pixelエフェクトを追加します。
                <br />
                ピクセルサイズ、法線エッジの強さ、深度エッジの強さを設定できます。
                <br />
                戻り値は、pixel のみのオブジェクトです。
                <br />
                戻り値の pixel は、animate
                の中で呼び出すことでエフェクトを適用します。
                <br />
                animate の第2引数を false にしてください。
              </ReferenceContent>
              <ReferenceContent
                name="postprocessing.mask"
                args="texture : Texture"
                returnObject="Object"
                href="/reference/postprocessing/mask/"
                argsInfo={
                  <>
                    <div>
                      <span>texture</span> - マスクテクスチャ。
                    </div>
                  </>
                }
              >
                Maskエフェクトを追加します。
                <br />
                戻り値は、mask のみのオブジェクトです。
                <br />
                戻り値の mask は、animate
                の中で呼び出すことでエフェクトを適用します。
                <br />
                animate の第2引数を false にしてください。
              </ReferenceContent>
              <ReferenceContent
                name="postprocessing.glitch"
                args="props : Object"
                returnObject="Object"
                href="/reference/postprocessing/glitch/"
                argsInfo={
                  <>
                    <div>
                      <span>props</span> - 設定オブジェクト。
                      <ul>
                        <li>
                          wild (Boolean) : ワイルドモード (デフォルト : false)。
                        </li>
                      </ul>
                    </div>
                  </>
                }
              >
                Glitch エフェクトを追加します。
                <br />
                戻り値は、glitch のみのオブジェクトです。
                <br />
                戻り値の glitch は、animate
                の中で呼び出すことでエフェクトを適用します。
                <br />
                animate の第2引数を false にしてください。
              </ReferenceContent>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </div>
    </Container>
  );
}
