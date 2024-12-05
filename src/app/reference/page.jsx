"use client";
import Container from "react-bootstrap/Container";
import styles from "./Reference.module.scss";
import { Link } from "@/components/BaseKit";

export default function Page() {
  return (
    <Container className="pt-4 pb-5">
      <title>Reference | easy-three</title>
      <h1>Reference</h1>

      <h2>Functions</h2>

      <div className={styles.reference}>
        <h3>
          init(target : String | DOMElement) : <span>Object</span>
        </h3>
        <div>
          <div>
            <div>
              <span>target</span>
              (optional) - 描画対象のDOMセレクター、もしくはDOM要素 (デフォルト
              : document.body)。
            </div>
          </div>
          初期化関数。
          <br />
          指定されたターゲットに対して、シーン、カメラ、レンダラー、コントロールを初期化します。
          <br />
          ウィンドウサイズ変更時の自動リサイズに対応。<br />
          戻り値は、Default, scene, camera, renderer, controls, create, animate, color, helper, load, THREE, destroy のオブジェクトです。
        </div>

        <h3>
          create.object(geometry : Geometry, props : Object) : <span>Mesh</span>
        </h3>
        <div>
          <div>
            <div>
              <span>geometry</span>
              - 作成するジオメトリのタイプ。
              <br />
              THREE.BoxGeometry, THREE.SphereGeometry, THREE.PlaneGeometry
              など。
            </div>
            <div>
              <span>props</span>- 設定オブジェクト。
              <ul>
                <li>
                  args (Array | Number) : ジオメトリの引数 (デフォルト : [1, 1,
                  1]、ジオメトリによって次元は異なる)。
                </li>
                <li>position (Array) : 位置 (デフォルト : [0, 0, 0])。</li>
                <li>rotation (Array) : 回転 (デフォルト : [0, 0, 0])。</li>
                <li>
                  option (Object) : オプション (デフォルト :{" "}
                  {`{color: 0xffffff }`})。
                </li>
                <li>
                  material (String) : マテリアルタイプ (デフォルト :
                  &quot;Physical&quot;)。
                </li>
                <li>
                  castShadow (Boolean) : 別のオブジェクトに影を落とすかどうか
                  (デフォルト : true)。
                </li>
                <li>
                  receiveShadow (Boolean) :
                  別のオブジェクトからの影を受けるかどうか (デフォルト : true)。
                </li>
                <li>
                  autoAdd (Boolean) : 自動でシーンに追加 (デフォルト : true)。
                </li>
              </ul>
            </div>
          </div>
          ジオメトリを作成し、メッシュを返します。
          <br />
        </div>
        <h3>
          <Link href="/reference/create/cube/">create.cube</Link>(props :
          Object) : <span>Mesh</span>
        </h3>
        <div>
          <div>
            <div>
              <span>props</span> - 設定オブジェクト。
              <ul>
                <li>
                  size (Array | Number) : サイズ (デフォルト : [1, 1, 1])。
                </li>
                <li>position (Array) : 位置 (デフォルト : [0, 0, 0])。</li>
                <li>rotation (Array) : 回転 (デフォルト : [0, 0, 0])。</li>
                <li>
                  rounded (Boolean) : 角丸にするか？ (デフォルト : false)。
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
                  castShadow (Boolean) : 別のオブジェクトに影を落とすかどうか
                  (デフォルト : true)。
                </li>
                <li>
                  receiveShadow (Boolean) :
                  別のオブジェクトからの影を受けるかどうか (デフォルト : true)。
                </li>
                <li>
                  autoAdd (Boolean) : 自動でシーンに追加 (デフォルト : true)。
                </li>
              </ul>
            </div>
          </div>
          キューブ (立方体) を作成してシーンに追加します。
        </div>

        <h3>
          <Link href="/reference/create/cube/">create.box</Link>(props : Object)
          : <span>Mesh</span>
        </h3>
        <div>create.cube と同じです。</div>

        <h3>
          <Link href="/reference/create/sphere/">create.sphere</Link>(props :
          Object) : <span>Mesh</span>
        </h3>
        <div>
          <div>
            <div>
              <span>props</span> - 設定オブジェクト。
              <ul>
                <li>size (Number) : 半径 (デフォルト : 1)。</li>
                <li>
                  segments (Array | Number) : セグメント (デフォルト : 64)。
                </li>
                <li>position (Array) : 位置 (デフォルト : [0, 0, 0])。</li>
                <li>rotation (Array) : 回転 (デフォルト : [0, 0, 0])。</li>
                <li>
                  option (Object) : オプション (デフォルト :{" "}
                  {`{color: 0x1155ff }`})。
                </li>
                <li>
                  material (String) : マテリアルタイプ (デフォルト :
                  &quot;Physical&quot;)。
                </li>
                <li>
                  castShadow (Boolean) : 別のオブジェクトに影を落とすかどうか
                  (デフォルト : true)。
                </li>
                <li>
                  receiveShadow (Boolean) :
                  別のオブジェクトからの影を受けるかどうか (デフォルト : true)。
                </li>
                <li>
                  autoAdd (Boolean) : 自動でシーンに追加 (デフォルト : true)。
                </li>
              </ul>
            </div>
          </div>
          球体を作成してシーンに追加します。
        </div>

        <h3>
          create.plane(props : Object) : <span>Mesh</span>
        </h3>
        <div>
          <div>
            <div>
              <span>props</span> - 設定オブジェクト。
              <ul>
                <li>size (Array | Number) : サイズ (デフォルト : [1, 1])。</li>
                <li>position (Array) : 位置 (デフォルト : [0, 0, 0])。</li>
                <li>rotation (Array) : 回転 (デフォルト : [0, 0, 0])。</li>
                <li>
                  option (Object) : オプション (デフォルト :{" "}
                  {`{color: 0x1155ff }`})。
                </li>
                <li>
                  material (String) : マテリアルタイプ (デフォルト :
                  &quot;Physical&quot;)。
                </li>
                <li>
                  castShadow (Boolean) : 別のオブジェクトに影を落とすかどうか
                  (デフォルト : true)。
                </li>
                <li>
                  receiveShadow (Boolean) :
                  別のオブジェクトからの影を受けるかどうか (デフォルト : true)。
                </li>
                <li>
                  autoAdd (Boolean) : 自動でシーンに追加 (デフォルト : true)。
                </li>
              </ul>
            </div>
          </div>
          平面を作成してシーンに追加します。
        </div>

        <h3>
          create.group(props : Object) : <span>Group</span>
        </h3>
        <div>
          <div>
            <div>
              <span>props</span> - 設定オブジェクト。
              <ul>
                <li>position (Array) : 位置 (デフォルト : [0, 0, 0])。</li>
                <li>rotation (Array) : 回転 (デフォルト : [0, 0, 0])。</li>
                <li>
                  children (Array&lt;Object3D&gt;) : 子要素の配列 (デフォルト :
                  [])
                </li>
                <li>
                  autoAdd (Boolean) : 自動でシーンに追加 (デフォルト : true)。
                </li>
              </ul>
            </div>
          </div>
          グループを作成してシーンに追加します。引数で最初に追加する子要素を指定できます。
        </div>

        <h3>
          create.ambientLight(props : Object) : <span>Light</span>
        </h3>
        <div>
          <div>
            <div>
              <span>props</span> - 設定オブジェクト。
              <ul>
                <li>color (Hex) : ライトの色 (デフォルト : 0xffffff)。</li>
                <li>intensity (Number) : 光の強さ (デフォルト : 0.5)。</li>
              </ul>
            </div>
          </div>
          環境光を作成してシーンに追加します。
        </div>

        <h3>
          create.pointLight(props : Object) : <span>Light</span>
        </h3>
        <div>
          <div>
            <div>
              <span>props</span> - 設定オブジェクト。
              <ul>
                <li>color (Hex) : ライトの色 (デフォルト : 0xffffff)。</li>
                <li>intensity (Number) : 光の強さ (デフォルト : 1)。</li>
                <li>distance (Number) : ライトの距離 (デフォルト : 0)。</li>
                <li>decay (Number) : 光の減衰率 (デフォルト : 2)。</li>
                <li>position (Array) : 位置 (デフォルト : [6, 6, 6])。</li>
                <li>
                  castShadow (Boolean) : 影を投影するかどうか (デフォルト :
                  true)。
                </li>
                <li>shadow (Object) : シャドウの設定。</li>
              </ul>
            </div>
          </div>
          点光源を作成してシーンに追加します。
        </div>

        <h3>
          create.directionalLight(props : Object) : <span>Light</span>
        </h3>
        <div>
          <div>
            <div>
              <span>props</span> - 設定オブジェクト。
              <ul>
                <li>intensity (Number) : 光の強さ (デフォルト : 1)。</li>
                <li>color (Hex) : ライトの色 (デフォルト : 0xffffff)。</li>
                <li>
                  position (Array) : ライトの位置 (デフォルト : [10, 10, 10])。
                </li>
                <li>
                  castShadow (Boolean) : 影を投影するかどうか (デフォルト :
                  true)。
                </li>
                <li>
                  shadow (Object) : シャドウの設定。
                  <ul>
                    <li>
                      mapSize (Object) : シャドウマップのサイズ (デフォルト :{" "}
                      {`{width: 1024, height: 1024 }`})。
                    </li>
                    <li>
                      camera (Object) : シャドウカメラの設定。
                      <ul>
                        <li>
                          left (Number) : カメラの左範囲 (デフォルト : -10)。
                        </li>
                        <li>
                          right (Number) : カメラの右範囲 (デフォルト : 10)。
                        </li>
                        <li>
                          top (Number) : カメラの上範囲 (デフォルト : 10)。
                        </li>
                        <li>
                          bottom (Number) : カメラの下範囲 (デフォルト : -10)。
                        </li>
                      </ul>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
          平行光源を作成してシーンに追加します。
        </div>
        <h3>
          helper.grid(props : Object) : <span>GridHelper</span>
        </h3>
        <div>
          <div>
            <div>
              <span>props</span> - 設定オブジェクト。
              <ul>
                <li>size (Number) : グリッドのサイズ (デフォルト : 10)。</li>
                <li>divisions (Number) : 分割数 (デフォルト : 10)。</li>
                <li>
                  colorCenterLine (Hex) : 中心線の色 (デフォルト : 0x444444)。
                </li>
                <li>
                  colorGrid (Hex) : グリッド線の色 (デフォルト : 0x888888)。
                </li>
              </ul>
            </div>
          </div>
          グリッドヘルパーを作成してシーンに追加します。
        </div>

        <h3>
          helper.axes(props : Object) : <span>AxesHelper</span>
        </h3>
        <div>
          <div>
            <div>
              <span>props</span> - 設定オブジェクト。
              <ul>
                <li>size (Number) : 軸ヘルパーのサイズ (デフォルト : 10)。</li>
              </ul>
            </div>
          </div>
          軸ヘルパーを作成してシーンに追加します。
        </div>
        <h3>
          load.vrm(url : String, props : Object) : <span>VRM</span>
        </h3>
        <div>
          <div>
            <div>
              <span>url</span> - VRMモデルのURL。
            </div>
            <div>
              <span>props</span> - 設定オブジェクト。
              <ul>
                <li>
                  position (Array) : モデルの位置 (デフォルト : [0, 0, 0])。
                </li>
                <li>
                  rotation (Array) : モデルの回転 (デフォルト : [0, 0, 0])。
                </li>
                <li>
                  scale (Array) : モデルのスケール (デフォルト : [1, 1, 1])。
                </li>
                <li>
                  autoAdd (Boolean) : 自動でシーンに追加するか (デフォルト :
                  true)。
                </li>
              </ul>
            </div>
          </div>
          VRMモデルを読み込み、オプションに基づいてシーンに追加します。
        </div>
        <h3>
          load.gltf(url : String, props : Object) : <span>GLTF</span>
        </h3>
        <div>
          <div>
            <div>
              <span>url</span> - GLTFモデルのURL。
            </div>
            <div>
              <span>props</span> - 設定オブジェクト。
              <ul>
                <li>
                  position (Array) : モデルの位置 (デフォルト : [0, 0, 0])。
                </li>
                <li>
                  rotation (Array) : モデルの回転 (デフォルト : [0, 0, 0])。
                </li>
                <li>
                  scale (Array) : モデルのスケール (デフォルト : [1, 1, 1])。
                </li>
                <li>
                  autoAdd (Boolean) : 自動でシーンに追加するか (デフォルト :
                  true)。
                </li>
              </ul>
            </div>
          </div>
          GLTFモデルを読み込み、オプションに基づいてシーンに追加します。
        </div>
        <h3>
          load.background(url : String) : <span>undefined</span>
        </h3>
        <div>
          <div>
            <div>
              <span>url</span> - 背景テクスチャのURL。
            </div>
          </div>
          指定されたHDR形式の画像をロードし、シーンの背景と環境マップに設定します。
        </div>
        <h3>
          load.texture(url : String, props : Object) : <span>Texture</span>
        </h3>
        <div>
          <div>
            <div>
              <span>url</span> - テクスチャのURL。
            </div>
            <div>
              <span>props</span> - 設定オブジェクト。
              <ul>
                <li>
                  wrapS (number) : テクスチャのラッピングモード (デフォルト :
                  &quot;Repeat&quot;)。
                </li>
                <li>
                  wrapT (number) : テクスチャのラッピングモード (デフォルト :
                  &quot;Repeat&quot;)。
                </li>
                <li>
                  repeat (Array) : テクスチャの繰り返し回数 (デフォルト : [1,
                  1])。
                </li>
              </ul>
            </div>
          </div>
          指定された画像をロードし、テクスチャを作成します。
          <br />
          テクスチャの繰り返しを有効にするには、wrapSおよびwrapTを
          &quot;Repeat&quot; または &quot;MirroredRepeat&quot;
          に設定する必要があります。
        </div>
        <h3>
          animate(proc : Function) : <span>undefined</span>
        </h3>
        <div>
          <div>
            <div>
              <span>proc({`{ clock, delta }`})</span> -
              各フレームごとに実行される関数。
              <ul>
                <li>
                  clock (THREE.Clock) : フレーム間の時間を管理するオブジェクト。
                </li>
                <li>
                  delta (Number) : 前回のフレームからの経過時間（秒単位）。
                </li>
                <li>
                  time (Number) : アニメーション開始からの経過時間（秒単位）。
                </li>
              </ul>
            </div>
          </div>
          アニメーションループを開始します。
          <br />
          指定した関数を各フレームごとに実行し、レンダリングを行います。
        </div>

        <h3>
          event.mouse.add(callback : Function, option: Object) : <span>Function</span>
        </h3>
        <div>
          <div>
            <div>
              <span>callback(pos, e)</span>
              - コールバック関数。
              <ul>
                <li>
                  pos (THREE.Vector2) : イベントが発生したオブジェクトに対する発生場所の相対座標。
                </li>
                <li>
                  e (PointerEvents) : イベントオブジェクト。
                </li>
              </ul>
            </div>
            <div>
            <span>option</span> - 設定オブジェクト。
              <ul>
                <li>type (String) : イベントのリスナータイプ (デフォルト : &quot;once&quot;)。</li>
              </ul>
            </div>
          </div>
          マウスイベント追加関数。<br />
          マウスのクリックイベントに反応する関数を登録します。<br />
          マウスのクリックが
          <ol>
            <li>押された時</li>
            <li>離された時</li>
            <li>押して離された時</li>
            <li>動かされた時</li>
            <li>上記のすべての時</li>
          </ol>
          の動作を指定できます。<br />
          イベントの登録解除用関数を返します。
        </div>

        <h3>
          event.key.add(callback : Function, option: Object) : <span>Function</span>
        </h3>
        <div>
          <div>
            <div>
              <span>callback(key, e)</span>
              - コールバック関数。
              <ul>
                <li>
                  key (String) : イベントが発生した原因となったキー文字列。
                </li>
                <li>
                  e (KeyEvent) : イベントオブジェクト。
                </li>
              </ul>
            </div>
            <div>
            <span>option</span> - 設定オブジェクト。
              <ul>
                <li>type (String) : イベントのリスナータイプ (デフォルト : &quot;once&quot;)。</li>
                <li>trigger (String | RegExp) : 追加のイベント発生条件 (デフォルト : /[A-Za-z]/)。</li>
              </ul>
            </div>
          </div>
          キーボードイベント追加関数。<br />
          キーボードのイベントに反応する関数を登録します。<br />
          キーボードのキーが
          <ol>
            <li>押された時</li>
            <li>離された時</li>
            <li>押して離された時</li>
            <li>上記のすべての時</li>
          </ol>
          の動作を指定できます。<br />
          イベントの登録解除用関数を返します。
        </div>
      </div>
    </Container>
  );
}
