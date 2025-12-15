// types/easy-three-load.d.ts

declare module "@masabando/easy-three" {
  import type * as THREE from "three";

  export interface EasyThreeLoadVrmProps {
    /** VRM の位置設定  
     * (デフォルト : [0, 0, 0])
     * ```js
     * position: [0, 1, 0] // x, y, z の順で指定
     * ```
     */
    position?: Array<number>;

    /** VRM の回転設定  
     * (デフォルト : [0, 0, 0])
     * ```js
     * rotation: [0, Math.PI, 0] // x, y, z の順で指定
     * ```
     */
    rotation?: Array<number>;

    /** VRM のスケール設定  
     * (デフォルト : [1, 1, 1])
     * ```js
     * scale: [2, 2, 2] // x, y, z の順で指定
     * ```
     */
    scale?: Array<number>;

    /** VRM が影を落とすかどうか
     * (デフォルト : true)
     */
    castShadow?: boolean;

    /** VRM を自動的にシーンに追加するかどうか  
     * (デフォルト : true)
     */
    autoAdd?: boolean;

    /** BVH ファイルのURL。  
     * (デフォルト : false)  
     * mocopi で作成したBVHファイルのみ対応。
     * ```js
     * bvh: "./path/to/motion.bvh" // BVHファイルのパスを指定
     * ```
     */
    bvh?: string | boolean;

    /** VRM の読み込み進捗コールバック */
    onProgress?: (event: ProgressEvent<EventTarget>) => void;

    /** VRM の読み込み完了コールバック */
    onLoad?: (vrm: VRM) => void;
  }

  export interface EasyThreeLoadBvhProps {
    /** BVHアニメーションの影響度 (デフォルト: 1) */
    effectiveWeight?: number;

    /** タイムスケール(デフォルト: 1000) */
    timeScale?: number;

    /** 読み込み進捗コールバック */
    onProgress?: (event: ProgressEvent<EventTarget>) => void;

    /** VRMボーン名のリスト */
    nameList?: Array<string>;
    
    /** BVHボーン名のリスト */
    idList?: Array<string>;
  }

  export interface EasyThreeLoadBvhResult {
    /** THREE.AnimationMixer オブジェクト */
    mixer: THREE.AnimationMixer;

    /** アニメーションの総時間(秒) */
    duration: number;
  }

  export interface EasyThreeLoadGltfProps {
    /** GLTF の位置設定  
     * (デフォルト : [0, 0, 0])
     * ```js
     * position: [0, 1, 0] // x, y, z の順で指定
     * ```
     */
    position?: Array<number>;

    /** GLTF の回転設定  
     * (デフォルト : [0, 0, 0])
     * ```js
     * rotation: [0, Math.PI, 0] // x, y, z の順で指定
     * ```
     */
    rotation?: Array<number>;

    /** GLTF のスケール設定  
     * (デフォルト : [1, 1, 1])
     * ```js
     * scale: [2, 2, 2] // x, y, z の順で指定
     * ```
     */
    scale?: Array<number>;

    /** GLTF が影を落とすかどうか
     * (デフォルト : true)
     */
    castShadow?: boolean;

    /**
     * GLTF が受け取る影の有無
     * (デフォルト : false)
     */
    receiveShadow?: boolean;

    /** GLTF を自動的にシーンに追加するかどうか  
     * (デフォルト : true)
     */
    autoAdd?: boolean;
  }

  export interface EasyThreeLoad {
    /**
     * VRM ファイルを読み込んでシーンに追加する。  
     * VRMオブジェクトを変数に格納するには、then() を使用する。  
     * 第2引数 props で position, rotation, scale, castShadow, autoAdd, bvh などを指定可能。
     * ```js
     * // 読み込んでシーンに追加するだけの場合
     * load.vrm("./path/to/model.vrm", {
     *   position: [0, 0, 0], // 位置設定
     *   rotation: [0, Math.PI, 0], // 回転設定
     * })
     * 
     * // BVH 形式のモーションデータを自動的に読み込む場合
     * load.vrm("./path/to/model.vrm", {
     *   bvh: "./path/to/motion.bvh"
     * })
     * 
     * // 変数に格納する場合
     * let model;
     * load.vrm("./path/to/model.vrm").then((vrm) => {
     *   model = vrm;
     * }
     * animate(({ time, delta }) => {
     *   // モデルが読み込まれたかどうかのチェックを忘れずに
     *   if (model) {
     *     // model に対する処理
     *     // .scene プロパティが THREE.Group オブジェクト
     *     model.scene.rotation.y += delta; // 毎フレーム回転させる
     *   }
     * })
     * ```
     */
    vrm(url: string, props?: EasyThreeLoadVrmProps): Promise<VRM>;

    /**
     * BVH形式のアニメーションファイルを読み込み、指定したVRMモデルに適用する。  
     * 通常は load.vrm() の bvh オプションで自動的に読み込むため、個別に呼び出す必要はない。  
     * animate内で mixer.update(delta) を呼び出してアニメーションを更新する必要がある。  
     * mocopi以外で作成したBVHファイルにも対応できる可能性がある。
     * ```js
     * let model, mixer, duration;
     * load.vrm("./path/to/model.vrm").then((vrm) => {
     *   model = vrm;
     *   load.bvh2("./path/to/motion.bvh", vrm).then(({ mixer, duration }) => {
     *     // mixer: THREE.AnimationMixer オブジェクト
     *     // duration: アニメーションの総時間(秒)
     *     mixer = mixer;
     *    duration = duration;
     *   });
     * });
     * animate(({ time, delta }) => {
     *   if (model && mixer) {
     *     mixer.update(delta);
     *     model.update(delta);
     *  }
     * });
     * 
     * // 詳細にオプションを指定する場合
     * load.bvh2("./path/to/motion.bvh", vrm, {
     *   effectiveWeight: 0.8, // BVHアニメーションの影響度 (デフォルト: 1)
     *   timeScale: 1000, // タイムスケール(デフォルト: 1000)
     *   onProgress: (event) => {}, // 読み込み進捗コールバック
     *   nameList: [...], // VRMボーン名のリスト
     *   idList: [...], // BVHボーン名のリスト
     * })
     * ```
     */
    bvh2(url: string, vrm: VRM, props?: EasyThreeLoadBvhProps): EasyThreeLoadBvhResult;

    /**
     * GLTF ファイルを読み込んでシーンに追加する。  
     * GLTFオブジェクトを変数に格納するには、then() を使用する。  
     * 第2引数 props で position, rotation, scale, castShadow, autoAdd などを指定可能。
     * ```js
     * // 読み込んでシーンに追加するだけの場合
     * load.gltf("./path/to/model.gltf", {
     *   position: [0, 0, 0], // 位置設定
     *   rotation: [0, Math.PI, 0], // 回転設定
     * })
     * 
     * // 変数に格納する場合
     * let model;
     * load.gltf("./path/to/model.gltf").then((gltf) => {
     *   model = gltf;
     * }
     * animate(({ time, delta }) => {
     *   // モデルが読み込まれたかどうかのチェックを忘れずに
     *   if (model) {
     *     // model に対する処理
     *     // .scene プロパティが THREE.Group オブジェクト
     *    model.scene.rotation.y += delta; // 毎フレーム回転させる
     *  }
     * })
     * ```
     */
    gltf(url: string, props?: EasyThreeLoadGltfProps): Promise<GLTF>;

    /**
     * 指定されたHDR形式の画像を読み込み、シーンの背景と環境マップに設定する。  
     * 第2引数 props で background、environment などを指定可能。
     * ```js
     * // 背景と環境マップの両方にHDR画像を設定する
     * load.background("./path/to/environment.hdr")
     * 
     * // 環境マップのみに設定する
     * load.background("./path/to/environment.hdr", {
     *   background: false
     * })
     * 
     * // 背景のみに設定する
     * load.background("./path/to/environment.hdr", {
     *   environment: false
     * })
     * ```
     */
    background(url: string, props?: {
      /** シーンの背景に設定するかどうか  
       * (デフォルト : true)
       */
      background?: boolean;
      /** シーンの環境マップに設定するかどうか  
       * (デフォルト : true)
       */
      environment?: boolean;
    }): THREE.DataTexture;

    /**
     * 画像ファイルを読み込み、THREE.Texture オブジェクトとして返す。  
     * 第2引数 props で wrapS, wrapT, repeat などを指定可能。
     * ```js
     * create.cube({
     *   option: {
     *     map: load.texture("./path/to/texture.jpg")
     *   }
     * })
     * ```
     */
    texture(url: string, props?: {
      /** テクスチャのラッピングモード。 */
      wrapS?: number;
      /** テクスチャのラッピングモード。 */
      wrapT?: number;
      /** テクスチャの繰り返し回数。  
       * (デフォルト : [1, 1])
       */
      repeat?: Array<number>;
    }): THREE.Texture;

    /**
     * 指定された6つの画像ファイルを読み込み、THREE.CubeTexture オブジェクトとして返す。  
     * JPG、PNGなどの画像を背景に使用する際に便利。  
     * 第2引数 props で path を指定可能。
     * ```js
     * scene.background = load.cubeTexture([
     *   "posx.jpg", "negx.jpg", "posy.jpg",
     *   "negy.jpg", "posz.jpg", "negz.jpg"
     * ], {
     *   path: "./path/to/" // 画像ファイルのベースパス
     * })
     * ```
     */
    cubeTexture(urls: Array<string>, props?: {
      /** テクスチャのパスのベース部分。  
       * (デフォルト : "./" )
       */
      path?: string;
    }): THREE.CubeTexture;

    /**
     * 動画ファイルを読み込み、THREE.VideoTexture オブジェクトとして返す。  
     * 第2引数 props で autoPlay, loop を指定可能。
     * ```js
     * create.plane({
     *   option: {
     *     map: load.videoTexture("./path/to/video.mp4", {
     *         autoPlay: true, // 自動再生
     *         loop: true // ループ再生
     *       })
     *   }
     * })
     * ```
     */
    videoTexture(url: string, props?: {
      /** 動画の自動再生設定  
       * (デフォルト : true)
       */
      autoPlay?: boolean;
      /** 動画のループ再生設定  
       * (デフォルト : true)
       */
      loop?: boolean;
    }): THREE.VideoTexture;
  }
}