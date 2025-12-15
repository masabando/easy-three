// types/easy-three.d.ts

declare module "@masabando/easy-three" {
  import type * as THREE from "three";

  export interface EasyThreeEvent {
    // mouse, key などのイベントラッパ
    // [key: string]: any;
  }

  /**
   * init() が返すコンテキスト。  
   * three.js の scene,  camera, renderer と、
   * easy-three 独自の各種ユーティリティをまとめたオブジェクト。
   */
  export interface EasyThreeContext {
    /**
     * メインカメラ。通常は PerspectiveCamera を想定。
     * ```js
     * camera.position.set(x, y, z) // 位置設定
     * ```
     */
    camera: THREE.PerspectiveCamera;

    /**
     * OrbitControls ベースのカメラコントローラ
     * ```jsx
     * controls.connect() // マウス・タッチ操作を有効化
     * controls.disconnect() //無効化
     * ```
     */
    controls: THREE.OrbitControls;

    /** メッシュやライトなどをまとめて生成するヘルパ群  
     * 
     */
    create: EasyThreeCreate;

    /** テクスチャ、VRM、GLTF などの各種読み込みヘルパ群  
     * vrm, bvh2, gltf, background, texture, cubeTexture, videoTexture を提供。
     */
    load: EasyThreeLoad;

    /**
     * helper 系ユーティリティ群。  
     * grid() や axes() などのヘルパを提供。
     * ```js
     * helper.grid() // グリッドヘルパーを追加
     * helper.axes() // 軸ヘルパーを追加
     * ```
     */
    helper: EasyThreeHelper;

    /**
     * メインループ開始関数。  
     * コールバックを渡すと、毎フレーム (time, delta) 付きで呼び出される。  
     * アニメーションしない場合でも、一度は呼び出してレンダリングを開始する必要がある。  
     * 第2引数 renderFlag (デフォルト : true) を false にすると、コールバック内で明示的に renderer.render() を呼び出すまでレンダリングを行わない。
     * ```js
     * animate(({ time, delta }) => {
     *   // 毎フレーム実行される処理
     * })
     *
     * // アニメーションが不要な場合
     * animate()
     *
     * // postprocessing 等を使う場合など
     * animate(({ time, delta }) => {
     *  // 毎フレーム実行される処理
     * }, false)
     * ```
     */
    animate(
      callback?: (params: {
        /** アプリケーション開始からの経過時間 (秒) */
        time: number;
        /** 前フレームからの経過時間 (秒) */
        delta: number;
      }) => void,
      renderFlag?: boolean
    ): void;

    /** three.js 本体をそのまま再エクスポートしたもの */
    THREE: THREE;

    /**
     * 色指定ユーティリティ。  
     * color(x) は new THREE.Color(x) と同等。
     * ```js
     * create.cube({
     *   option: {
     *     color: color(0xff0000) // 赤色
     *   }
     * })
     * ```
     */
    color: (color: THREE.ColorRepresentation) => THREE.Color;

    /** ポストプロセスに関する機能群  
     * bloom, selectedBloom, pixel, mask, glitch, bokeh を提供。
     */
    postprocessing: EasyThreePostprocessing;

    /**
     * React用の unmount 相当のクリーンアップ関数。
     * イベントリスナや resize ハンドラなどを解除し、
     * 担当していたリソースをクリーンアップする。
     *
     * @example
     * ```jsx
     * useEffect(() => {
     *   ...
     *   return () => destroy();
     * }, [])
     * ```
     */
    destroy(): void;

    /** シーン全体を保持する three.js の Scene インスタンス。ユーザは通常使用しない。 */
    scene: THREE.Scene;

    /** three.js の WebGLRenderer インスタンス。ユーザは通常使用しない。 */
    renderer: THREE.WebGLRenderer;

    /**
     * renderer.toneMapping を THREE.NoToneMapping にするユーティリティ。
     */
    noToneMapping(): void;

    /** マウス・キーボードなど各種イベントラッパ */
    event: EasyThreeEvent;

    /**
     * easy-three のデフォルト設定オブジェクト。  
     * この値を書き換えることで、easy-three 全体の挙動を変更できる。
     */
    Default: EasyThreeDefault;
  }

  /**
   * easy-three の初期化関数。
   *
   * target を省略した場合は document.body を描画対象とし、
   * 文字列の場合は CSS セレクタとして DOM を取得する。  
   * document.body のような HTMLElement を直接渡すこともできる。
   *
   * 戻り値として、camera, create, controls, animate などを
   * まとめたコンテキストオブジェクトを返す。
   *
   * @example
   * import { init } from "easy-three";
   * const { camera, create, controls, animate } = init();
   */
  export function init(target?: string | HTMLElement): EasyThreeContext;
}
