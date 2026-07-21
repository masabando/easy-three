// types/easy-three.d.ts

declare module "@masabando/easy-three" {
  import type * as THREE from "three";

  export interface EasyThreeInitOptions {
    /**
     * ピクセル比を設定する。  
     * (デフォルト : window.devicePixelRatio)
     *
     * ```js
     * init(document.body, { pixelRatio: 2 }) // ピクセル比を設定
     * ```
     */
    pixelRatio?: number;
  }

  export interface EasyThreeFpv {
    /**
     * 一人称視点カメラコントローラを有効化する。
     */
    connect(options?: {
      /** マウス操作を有効化するか (デフォルト: true) */
      mouse?: boolean;
      /** マウス押し込みで移動するか (デフォルト: false) */
      mouseDownMove?: boolean;
      /** 矢印キーで移動するか (デフォルト: true) */
      arrow?: boolean;
      /** WASDキーで移動するか (デフォルト: true) */
      wasd?: boolean;
      /** タッチ操作で視点移動するか (デフォルト: true) */
      touch?: boolean;
      /** カメラの高さ (デフォルト: 1.6) */
      height?: number;
      /** 移動速度 (デフォルト: 5) */
      speed?: number;
      /** 視点移動速度 (デフォルト: 0.4) */
      viewSpeed?: number;
      /** カメラの初期位置 (デフォルト: [0, 0]) */
      position?: [number, number];
    }): void;
    /**
     * 一人称視点カメラコントローラを無効化する。
     */
    disconnect(): void;
  }

  export interface EasyThreeRaycaster {
    /**
     * レイキャスターを有効化する。
     */
    connect(): void;
    /**
     * レイキャスターを無効化する。
     */
    disconnect(): void;
    /**
     * レイキャスターの交差判定を取得する。
     * @param objects 交差判定対象のオブジェクト配列
     * @returns 交差判定結果の配列
     */
    getIntersections(objects: THREE.Object3D[]): THREE.Intersection[];
  }

  export interface EasyThreeXR {
    /**
     * XR セッションをセットアップする。
     */
    setup(options?: {
      /** 左手のコントローラを有効化するか (デフォルト: true) */
      leftController?: boolean;
      /** 右手のコントローラを有効化するか (デフォルト: true) */
      rightController?: boolean;
      /** 左手のハンドトラッキングを有効化するか (デフォルト: true) */
      leftHand?: boolean;
      /** 右手のハンドトラッキングを有効化するか (デフォルト: true) */
      rightHand?: boolean;
      /** VRButton のボタンを追加する DOM 要素 (デフォルト: domElement) */
      buttonTarget?: HTMLElement;
      /** レイキャスターの交差判定対象オブジェクト配列 (デフォルト: []) */
      selectableObjects?: THREE.Object3D[];
    }): {
      leftController: THREE.Group | null;
      rightController: THREE.Group | null;
      leftHand: THREE.Group | null;
      rightHand: THREE.Group | null;
    };
  }

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
     * コールバックを渡すと、毎フレーム (time, delta, timer, frameCount) 付きで呼び出される。
     * アニメーションしない場合でも、一度は呼び出してレンダリングを開始する必要がある。  
     * 第2引数 renderFlag (デフォルト : true) を false にすると、コールバック内で明示的に renderer.render() を呼び出すまでレンダリングを行わない。
     * ```js
     * animate(({ time, delta, timer, frameCount }) => {
     *   // 毎フレーム実行される処理
     * })
     *
     * // アニメーションが不要な場合
     * animate()
     *
     * // postprocessing 等を使う場合など
     * animate(({ time, delta, timer, frameCount }) => {
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
        /** フレームカウント */
        frameCount: number;
        /** THREE.Timer インスタンス */
        clock: THREE.Timer;
        /** THREE.Timer インスタンス */
        timer: THREE.Timer;
      }) => void,
      renderFlag?: boolean
    ): void;

    /**
     * 一人称視点カメラコントローラ。
     */
    fpv: EasyThreeFpv;

    /**
     * レイキャスター。マウスやタッチの位置から、3D空間上のオブジェクトとの交差判定を行う。
     */
    raycaster: EasyThreeRaycaster;

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
     * easy-three-tool の機能群。
     */
    tool: EasyThreeTool;

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
  export function init(target?: string | HTMLElement, options?: EasyThreeInitOptions): EasyThreeContext;
}
