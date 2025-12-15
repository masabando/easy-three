// types/easy-three-create.d.ts


declare module "@masabando/easy-three" {
  import * as THREE from "three";

  export interface createPropBase {
    /** 位置。 x, y, z の配列。  
     * (デフォルト : [0, 0, 0])
     * ```js
     * position: [x, y, z]
     * ```
     */
    position?: Array<number>;
    /**
     * 回転。 x, y, z の配列。  
     * (デフォルト : [0, 0, 0])
     * ```js
     * rotation: [x, y, z]
     * ```
     */
    rotation?: Array<number>;
    /**
     * マテリアルタイプ。  
     * (デフォルト : Default.material)
     * ```js
     * material: 'standard' // MeshStandardMaterial を使う
     * ```
     */
    material?: string;
    /**
     * 自分が作り出す影を他の物体に落とすかどうか。
     * (デフォルト : true)
     * ```js
     * castShadow: true, // 影を落とす
     * ```
     */
    castShadow?: boolean;

    /** 自分が他の物体からの影を受け取るかどうか。  
     * (デフォルト : true)
     * ```js
     * receiveShadow: true, // 影を受け取る
     * ```
     */
    receiveShadow?: boolean;

    /** メッシュの材質オプション。  
     * three.js の各種マテリアルのプロパティを全て指定可能。
     * ```js
     * option: {
     *   wireframe: true // ワイヤーフレーム表示
     *   color: 0x00ff00 // 緑色
     * }
     * ```
     */
    option?: {
      /** 材質の色。
       * (デフォルト: Default.color)
       * ```js
       * color: 0xff0000 // 赤色
       * ```
       */
      color?: number;
      /** ワイヤーフレーム表示にするかどうか。  
       * (デフォルト: false)
       * ```js
       * wireframe: true // ワイヤーフレーム表示にする
       * ```
       */
      wireframe?: boolean;
    };
    /** シーンに自動追加するかどうか（デフォルト: true） */
    autoAdd?: boolean;
  }

  export interface EasyThreeCubeProps extends createPropBase {
    /** サイズ。幅、高さ、奥行きの配列。  
     * (デフォルト : [1, 1, 1])
     * ```js
     * size: [1, 1, 1]
     * ```
     * 数値を1つだけ指定すると、その値が各辺の長さになる。
     * ```js
     * size: 2 // [2, 2, 2] と指定したのと同じ
     * ```
     */
    size?: Array<number> | number;
    /**
     * 角丸にするかどうか。  
     * (デフォルト : false)
     * ```js
     * rounded: true // 角丸にする
     * ```
     */
    rounded?: boolean;
    /**
     * 角丸の半径。  
     * rounded が true の場合に有効。
     * (デフォルト : 0.1)
     * ```js
     * radius: 0.2 // 角丸の半径を0.2にする
     * ```
     */
    radius?: number;
    /**
     * 角丸部分の分割数。  
     * (デフォルト : 1)
     */
    segments?: Array<number> | number;
  }

  export interface EasyThreeSphereProps extends createPropBase {
    /**
     * 半径。
     * (デフォルト : 1)
     * ```js
     * radius: 1
     * ```
     */
    radius?: number;
    /**
     * 方位方向と高度方向の分割数。  
     * (デフォルト : [64, 64])  
     * 数値を1つだけ指定すると、幅と高さの両方に同じ分割数が適用される。  
     * 分割数が多いほど滑らかな球体になるが、処理負荷も高くなる。
     * ```js
     * segments: 32
     * ```
     */
    segments?: Array<number> | number;
  }

  export interface EasyThreePlaneProps extends createPropBase {
    /** サイズ。幅と高さの配列。  
     * (デフォルト : [1, 1])
     * ```js
     * size: [width, height]
     * ```
     * 数値を1つだけ指定すると、その値が幅と高さになる。
     * ```js
     * size: 2 // [2, 2] と指定したのと同じ
     * ```
     */
    size?: Array<number> | number;
  }

  export interface EasyThreeConeProps extends createPropBase {
    /** サイズ。  
     * コーンの底面の半径と、高さの配列。  
     * (デフォルト : [1, 2])
     * ```js
     * size: [1, 2]
     * ```
     */
    size?: Array<number> | number;
    /**
     * コーン底面と高さ方向の分割数。  
     * (デフォルト : [32, 1])
     * ```js
     * segments: [32, 1]
     * ```
     */
    segments?: Array<number> | number;
  }

  export interface EasyThreeOctahedronProps extends createPropBase {
    /**
     * サイズ。  
     * (デフォルト : 1)
     * ```js
     * size: 1
     * ```
     */
    size?: number;
    /** ディテール。  
     * ディテールを増やすことで、さらに多くの面を持つ立体になる。
     * (デフォルト : 0)
     * ```js
     * detail: 2
     * ```
     */
    detail?: number;
  }

  export interface EasyThreeShapeProps extends createPropBase {
    /**
     * シェイプの配列。  
     * 直線を用いる場合、shapes には position として2要素(x, y)の配列を持つオブジェクトの配列を指定する。
     * ```js
     * shapes: [
     *   { position: [x1, y1] },
     *   { position: [x2, y2] },
     *   ...
     * ]
     * ```
     * ベジエ曲線を用いる場合、shapes には position として6要素(cp1X, cp1Y, cp2X, cp2Y, x, y)の配列を持つオブジェクトの配列を指定し、types に "curve" を指定する。  
     * ここで、cp1X, cp1Y は第1制御点、cp2X, cp2Y は第2制御点、x, y は終点の座標を表す。
     * ```js
     * shapes: [
     *   { position: [cp1X, cp1Y, cp2X, cp2Y, x, y], types: "curve" },
     *   ...
     * ]
     * ```
     */
    shapes?: Array<any>;
  }

  export interface EasyThreeTorusProps extends createPropBase {
    /** トーラスの半径。    
     * (デフォルト : 1)
     * ```js
     * size: 1
     * ```
     */
    size?: Array<number> | number;
    /** 管の半径。  
     * (デフォルト : 0.4)
     * ```js
     * tube: 0.2
     * ```
     */
    tube?: number;
    /** トーラス半径と管の分割数。  
     * (デフォルト : 64)
     * ```js
     * segments: 64
     * ```
     */
    segments?: Array<number> | number;
  }


  export interface EasyThreeCapsuleProps extends createPropBase {
    /** サイズ。  
     * カプセルの半径と長さの配列。  
     * 数値を1つだけ指定すると、その値が半径と長さの両方になる。  
     * (デフォルト : [1, 1])
     * ```js
     * size: [1, 1]
     * ```
     */
    size?: Array<number> | number;
    /** カプセル半径と長さの分割数。  
     * (デフォルト : [10, 20])
     * ```js
     * segments: [10, 20]
     * ```
     */
    segments?: Array<number> | number;
  }

  export interface EasyThreeCylinderProps extends createPropBase {
    /** サイズ。  
     * 円柱の上面半径、底面半径、高さの配列。  
     * (デフォルト : [1, 1, 2])
     * ```js
     * size: [1, 1, 2]
     * ```
     */
    size?: Array<number> | number;
    /** 分割数。  
     * 円柱の上下面と高さ方向の分割数。  
     * (デフォルト : [32, 1])
     * ```js
     * segments: [32, 1]
     * ```
     */
    segments?: Array<number> | number;
    /**
     * 両端を開けるかどうか。  
     * (デフォルト : false)
     */
    openEnded?: boolean;
    /**
     * 開始角度。  
     * (デフォルト : 0)
     */
    thetaStart?: number;

    /**
     * 角度の長さ。  
     * (デフォルト : Math.PI * 2)
     */
    thetaLength?: number;
  }

  export interface EasyThreeCircleProps extends createPropBase {
    /** 円の半径。  
     * (デフォルト : 1)
     * ```js
     * size: 1
     * ```
     */
    size?: number;
    /** 分割数。  
     * (デフォルト : 32)
     * ```js
     * segments: 32
     * ```
     */
    segments?: number;
  }

  export interface EasyThreeRingProps extends createPropBase {
    /** リングの内径と外径の配列。  
     * (デフォルト : [0.5, 1])
     * ```js
     * size: [0.5, 1]
     * ```
     */
    size?: Array<number> | number;
    /** 動径方向と角度方向の分割数。
     * (デフォルト : [32, 1])
     * ```js
     * segments: [32, 1]
     * ```
     */
    segments?: Array<number> | number;

    /**
     * 描画する角度の始点と終点。  
     * (デフォルト : [0, Math.PI * 2])
     * ```js
     * angle: [0, Math.PI] // 半円を描く
     * ```
     */
    angle?: Array<number> | number;
  }





  export interface EasyThreeCreate {
    /**
     * 立方体メッシュを作成してシーンに追加する。
     * optionの中は Material (材質) の設定、例えば color や wireframe などが指定可能。
     * optionの外は position や size などのジオメトリ設定。
     * ```js
     * const box = create.cube({
     *   size: [width, height, depth], // サイズ
     *   position: [x, y, z], // 位置
     *   option: {
     *     color: 0xff0000, // 色
     *   }
     * })
     * ```
     */
    cube(prop?: EasyThreeCubeProps): THREE.Mesh;
    /**
     * 立方体メッシュを作成してシーンに追加する。
     * create.cube と同様の機能。
     */
    box(prop?: EasyThreeCubeProps): THREE.Mesh;

    /**
     * 球体メッシュを作成してシーンに追加する。
     * ```js
     * const sphere = create.sphere({
     *   radius: 1, // 半径
     *   position: [x, y, z], // 位置
     * })
     * ```
     */
    sphere(prop?: EasyThreeSphereProps): THREE.Mesh;

    /**
     * 平面メッシュを作成してシーンに追加する。
     *
     * ```js
     * const plane = create.plane({
     *   size: [width, height], // サイズ
     *   position: [x, y, z], // 位置
     *   rotation: [x, y, z], // 回転
     * })
     * ```
     */
    plane(prop?: EasyThreePlaneProps): THREE.Mesh;

    /**
     * 円錐メッシュを作成してシーンに追加する。
     *
     * ```js
     * const cone = create.cone({
     *   size: [radius, height], // サイズ
     *   position: [x, y, z], // 位置
     *   rotation: [x, y, z], // 回転
     * })
     * ```
     */
    cone(prop?: EasyThreeConeProps): THREE.Mesh;

    /**
     * 八面体メッシュを作成してシーンに追加する。
     *
     * ```js
     * const octahedron = create.octahedron({
     *   size: 1, // サイズ
     *   position: [x, y, z], // 位置
     * })
     * ```
     */
    octahedron(prop?: EasyThreeOctahedronProps): THREE.Mesh;

    /**
     * シェイプメッシュを作成してシーンに追加する。
     * ```js
     * const shape = create.shape({
     *   shapes: [ // シェイプの配列
     *     { position: [x1, y1] }, // 直線の場合
     *     { position: [cp1X, cp1Y, cp2X, cp2Y, x2, y2], types: "curve" }, // ベジエ曲線の場合
     *     ...
     *   ],
     *   position: [x, y, z], // 位置
     * })
     * ```
     */
    shape(prop?: EasyThreeShapeProps): THREE.Mesh;

    /**
     * トーラスメッシュを作成してシーンに追加する。
     * ```js
     * const torus = create.torus({
     *   size: 1, // サイズ
     *   tube: 0.4, // 管の半径
     *   position: [x, y, z], // 位置
     * })
     * ```
     */
    torus(prop?: EasyThreeTorusProps): THREE.Mesh;

    /**
     * トーラスノットメッシュを作成してシーンに追加する。
     * ```js
     * const torusKnot = create.torusKnot({
     *   size: 1, // サイズ
     *   tube: 0.4, // 管の半径
     *   position: [x, y, z], // 位置
     * })
     * ```
     */
    torusKnot(prop?: EasyThreeTorusProps): THREE.Mesh;

    /**
     * カプセルメッシュを作成してシーンに追加する。
     * ```js
     * const capsule = create.capsule({
     *   size: [radius, length], // サイズ
     *   position: [x, y, z], // 位置
     * })
     * ```
     */
    capsule(prop?: EasyThreeCapsuleProps): THREE.Mesh;

    /**
     * 円柱メッシュを作成してシーンに追加する。
     * ```js
     * const cylinder = create.cylinder({
     *   size: [topRadius, bottomRadius, height], // サイズ
     *   position: [x, y, z], // 位置
     * })
     * ```
     */
    cylinder(prop?: EasyThreeCylinderProps): THREE.Mesh;

    /**
     * 円メッシュを作成してシーンに追加する。
     * ```js
     * const circle = create.circle({
     *   size: 1, // サイズ
     *   position: [x, y, z], // 位置
     * })
     * ```
     */
    circle(prop?: EasyThreeCircleProps): THREE.Mesh;

    /**
     * リングメッシュを作成してシーンに追加する。
     * ```js
     * const ring = create.ring({
     *   size: [innerRadius, outerRadius], // サイズ
     *   position: [x, y, z], // 位置
     * })
     * ```
     */
    ring(prop?: EasyThreeRingProps): THREE.Mesh;

    /**
     * 環境光を作成してシーンに追加する。
     * 環境光は全方向から均等に照らす光源で、影を作らない。
     * ```js
     * create.ambientLight({
     *   color: 0xffffff, // 光の色
     *   intensity: 0.5 // 光の強さ
     * })
     * ```
     */
    ambientLight(props?: {
      /**
       * 光の色。
       * (デフォルト: 0xffffff)
       * ```js
       * color: 0xff0000 // 赤色
       * ```
       */
      color?: THREE.Color | number | string;
      /** 光の強さ。
       * (デフォルト: 0.5)
       * ```js
       * intensity: 1 // 強さを1にする
       * ```
       */
      intensity?: number;
    }): THREE.AmbientLight;

    /**
     * 平行光源を作成してシーンに追加する。
     * 太陽光のように、特定の方向から均一に照らす光源で、影を作ることができる。
     * GLTFモデルの表面に波紋状の縞模様が現れる場合は、shadow.bias に小さい値(例えば -0.0001や0.0001) を指定すると良い。
     * ```js
     * create.directionalLight({
     *   color: 0xffffff, // 光の色
     *   intensity: 1, // 光の強さ
     *   position: [10, 10, 10], // 位置
     * })
     * ```
     */
    directionalLight(props?: {
      /**
       * 光の色。
       * (デフォルト: 0xffffff)
       * ```js
       * color: 0xff0000 // 赤色
       * ```
       */
      color?: THREE.Color | number | string;
      /** 光の強さ。
       * (デフォルト: 1)
       * ```js
       * intensity: 1 // 強さを1にする
       * ```
       */
      intensity?: number;
      /** 影を有効にするかどうか。
       * (デフォルト: true)
       * ```js
       * castShadow: false // 影を無効にする
       * ```
       */
      castShadow?: boolean;

      /** 位置。 x, y, z の配列。
       * (デフォルト : [10, 10, 10])
       * ```js
       * position: [x, y, z]
       * ```
       */
      position?: Array<number>;

      /** ヘルパーを表示するかどうか。
       * (デフォルト: 0)
       * ```js
       * helper: 5 // ヘルパーのサイズを5にして表示する
       * ```
       */
      helper?: number;
      /** ヘルパーの色。
       * (デフォルト: 0xffffff)
       * ```js
       * helperColor: 0xff0000 // ヘルパーの色を赤色にする
       * ```
       */
      helperColor?: THREE.Color | number | string;
      /**
       * 影の設定オブジェクト。
       */
      shadow: {
        /** 影マップのサイズ。
         * (デフォルト: { width: 1024, height: 1024 })
         * ```js
         * mapSize: { width: 1024, height: 1024 }
         * ```
         */
        mapSize?: {
          /** 影マップの幅 */
          width: number;
          /** 影マップの高さ */
          height: number;
        };
        /** 影カメラの設定。
         * (デフォルト: { left: -10, right: 10, top: 10, bottom: -10, near: 0.5, far: 500 })
         */
        camera?: {
          left?: number;
          right?: number;
          top?: number;
          bottom?: number;
          near?: number;
          far?: number;
        };
        /** シャドウバイアス
         * (デフォルト: 0)
         */
        bias?: number;
      };
    }): THREE.DirectionalLight;

    /**
     * 点光源を作成してシーンに追加する。
     * 全方向に光を放射する光源で、影を作ることができる。
     * ```js
     * create.pointLight({
     *   color: 0xffffff, // 光の色
     *   intensity: 1, // 光の強さ
     *   distance: 50, // 距離減衰
     *   position: [10, 10, 10], // 位置
     * })
     * ```
     */
    pointLight(props?: {
      /**
       * 光の色。
       * (デフォルト: 0xffffff)
       * ```js
       * color: 0xff0000 // 赤色
       * ```
       */
      color?: THREE.Color | number | string;
      /** 光の強さ。
       * (デフォルト: 1)
       * ```js
       * intensity: 1 // 強さを1にする
       * ```
       */
      intensity?: number;
      /** 距離減衰。
       * (デフォルト: 0)
       * ```js
       * distance: 50 // 距離減衰を50にする
       * ```
       */
      distance?: number;

      /** 位置。 x, y, z の配列。
       * (デフォルト : [0, 0, 0])
       * ```js
       * position: [x, y, z]
       * ```
       */
      position?: Array<number>;

      /**
       * 減衰率。
       * (デフォルト: 2)
       * ```js
       * decay: 2 // 減衰率を2にする
       * ```
       */
      decay?: number;
      /** 影を有効にするかどうか。
       * (デフォルト: true)
       * ```js
       * castShadow: false // 影を無効にする
       * ```
       */
      castShadow?: boolean;
      /** ヘルパーを表示するかどうか。
       * (デフォルト: 0)
       * ```js
       * helper: 5 // ヘルパーのサイズを5にして表示する
       * ```
       */
      helper?: number;
      /** ヘルパーの色。
       * (デフォルト: 0xffffff)
       * ```js
       * helperColor: 0xff0000 // ヘルパーの色を赤色にする
       * ```
       */
      helperColor?: THREE.Color | number | string;
    }): THREE.PointLight;

    /**
     * スポットライトを作成してシーンに追加する。
     * 円錐形に光を放射する光源で、影を作ることができる。
     * VRMモデルにスポットライトを当てるとエラーになる。
     * ```js
     * create.spotLight({
     *   color: 0xffffff, // 光の色
     *   intensity: 1, // 光の強さ
     *   distance: 100, // 距離減衰
     *   angle: Math.PI / 4, // 光の広がり角度
     *   penumbra: 0.1, // 光の周辺減衰率
     *   decay: 2, // 減衰率
     *   position: [10, 10, 10], // 位置
     * })
     * ```
     */
    spotLight(props?: {
      /**
       * 光の色。
       * (デフォルト: 0xffffff)
       * ```js
       * color: 0xff0000 // 赤色
       * ```
       */
      color?: THREE.Color | number | string;
      /**
       * 光の強さ。
       * (デフォルト: 1)
       * ```js
       * intensity: 1 // 強さを1にする
       * ```
       */
      intensity?: number;
      /**
       * 距離減衰。
       * (デフォルト: 0)
       * ```js
       * distance: 100 // 距離減衰を100にする
       * ```
       */
      distance?: number;
      /**
       * 光の広がり角度（ラジアン）。
       * (デフォルト: Math.PI / 4)
       * ```js
       * angle: Math.PI // 90度に設定
       * ```
       */
      angle?: number;
      /**
       * 光の周辺減衰率。
       * (デフォルト: 0.1)
       * ```js
       * penumbra: 0.2 // 減衰率を0.2にする
       * ```
       */
      penumbra?: number;
      /**
       * 減衰率。
       * (デフォルト: 2)
       * ```js
       * decay: 2 // 減衰率を2にする
       * ```
       */
      decay?: number;
      /**
       * 位置。 x, y, z の配列。
       * (デフォルト : [6, 6, 6])
       * ```js
       * position: [x, y, z]
       * ```
       */
      position?: Array<number>;
      /**
       * 影を有効にするかどうか。
       * (デフォルト: true)
       * ```js
       * castShadow: false // 影を無効にする
       * ```
       */
      castShadow?: boolean;
      /** ヘルパーを表示するかどうか。
       * (デフォルト: 0)
       * ```js
       * helper: 5 // ヘルパーのサイズを5にして表示する
       * ```
       */
      helper?: number;
      /** ヘルパーの色。
       * (デフォルト: 0xffffff)
       * ```js
       * helperColor: 0xff0000 // ヘルパーの色を赤色にする
       * ```
       */
      helperColor?: THREE.Color | number | string;
    }): THREE.SpotLight;

    /**
     * 半球光源を作成してシーンに追加する。
     * 上空からの光と地面からの反射光をシミュレートする光源。
     * ```js
     * create.hemisphereLight({
     *   skyColor: 0xeeddff, // 上部からのライトの色
     *   groundColor: 0x887777, // 下部からのライトの色
     *   intensity: 0.5 // 光の強さ
     * })
     * ```
     */
    hemisphereLight(props?: {
      /**
       * 上部からのライトの色。
       * (デフォルト: 0xeeddff)
       * ```js
       * color: 0xff0000 // 赤色
       * ```
       */
      skyColor?: THREE.Color | number | string;
      /** 下部からのライトの色。
       * (デフォルト: 0x887777)
       * ```js
       * groundColor: 0x00ff00 // 緑色
       * ```
       */
      groundColor?: THREE.Color | number | string;
      /**
       * 光の強さ。
       * (デフォルト: 0.5)
       * ```js
       * intensity: 1 // 強さを1にする
       * ```
       */
      intensity?: number;
    }): THREE.HemisphereLight;

    /**
     * 面光源を作成してシーンに追加する。
     * 四角形の面から均一に光を放射する光源で、影を作成しない。
     * ```js
     * create.rectAreaLight({
     *   color: 0xffffff, // 光の色
     *   intensity: 1, // 光の強さ
     *   size: [width, height], // サイズ
     *   position: [x, y, z], // 位置
     *   rotation: [x, y, z], // 回転
     *   helper: true // ヘルパーを表示するかどうか
     * })
     * ```
     */
    rectAreaLight(props?: {
      /**
       * 光の色。
       * (デフォルト: 0xffffff)
       * ```js
       * color: 0xff0000 // 赤色
       * ```
       */
      color?: THREE.Color | number | string;
      /**
       * 光の強さ。
       * (デフォルト: 1)
       * ```js
       * intensity: 1 // 強さを1にする
       * ```
       */
      intensity?: number;
      /**
       * サイズ。幅と高さの配列。
       * (デフォルト : [1, 1])
       * ```js
       * size: [width, height]
       * ```
       */
      size?: Array<number>;
      /** 位置。 x, y, z の配列。
       * (デフォルト : [0, 0, 0])
       * ```js
       * position: [x, y, z]
       * ```
       */
      position?: Array<number>;
      /** 回転。 x, y, z の配列。
       * (デフォルト : [0, 0, 0])
       * ```js
       * rotation: [x, y, z]
       * ```
       */
      rotation?: Array<number>;
      /** ヘルパーを表示するかどうか。
       * (デフォルト: false)
       * ```js
       * helper: true // ヘルパーを表示する
       * ```
       */
      helper?: boolean;
    }): THREE.RectAreaLight;

    /**
     * グループオブジェクトを作成してシーンに追加する。
     * ```js
     * const group = create.group({
     *   position: [x, y, z], // 位置
     *   rotation: [x, y, z], // 回転
     *   children: [ mesh1, mesh2, ... ], // 子要素の配列
     * })
     * ```
     */
    group(prop?: {
      /**
       * 位置。 x, y, z の配列。
       * ```js
       * position: [x, y, z]
       * ```
       */
      position?: Array<number>;
      /**
       * 回転。 x, y, z の配列。
       * ```js
       * rotation: [x, y, z]
       * ```
       */
      rotation?: Array<number>;
      /**
       * 子要素の配列。
       * ```js
       * children: [ mesh1, mesh2, ... ]
       * ```
       * create.cube() などで生成したオブジェクトを渡す。
       * グループはシーンに追加されるため、子要素のオブジェクトの autoAdd を false にしておくこと。
       * ```js
       * const box = create.cube({
       *   position: [1, 0, 0],
       *   autoAdd: false
       * })
       * const sphere = create.sphere({
       *   position: [-1, 0, 0],
       *   autoAdd: false
       * })
       * const group = create.group({
       *   children: [ box, sphere ]
       * })
       * ```
       * 後から add で追加することも可能。
       * ```js
       * const group = create.group()
       * const box = create.cube({ autoAdd: false })
       * group.add(box)
       * ```
       */
      children?: Array<THREE.Object3D>;
      /** シーンに自動追加するかどうか（デフォルト: true） */
      autoAdd?: boolean;
    }): THREE.Group;

    /**
     * テキストメッシュを作成してシーンに追加する。
     * ```js
     * const textMesh = create.text("Hello, World!", {
     *   fontSize: 48, // フォントサイズ
     *   color: "#ff0000", // テキストの色
     *   position: [x, y, z], // 位置
     * })
     * ```
     */
    text(
      /**
       * 表示するテキスト文字列。
       */
      text: string,
      props?: {
        /** テキストのサイズ。
         * (デフォルト : 48)
         * ```js
         * fontSize: 48
         * ```
         */
        fontSize?: number;
        /** フォントのウェイト。
         * (デフォルト : "")
         * ```js
         * fontWeight: "bold"
         * ```
         */
        fontWeight?: number | string;
        /** フォント。
         * (デフォルト : "'Noto Sans JP', sans-serif")
         * ```js
         * font: "Arial"
         * ```
         */
        font?: string;
        /** テキストの色。
         * (デフォルト : "#000000")
         * ```js
         * color: "#ff0000" // 赤色
         * ```
         */
        color?: string;
        /** 位置。 x, y, z の配列。
         * (デフォルト : [0, 0, 0])
         * ```js
         * position: [x, y, z]
         * ```
         */
        position?: Array<number>;
        /** 回転。 x, y, z の配列。
         * (デフォルト : [0, 0, 0])
         * ```js
         * rotation: [x, y, z]
         * ```
         */
        rotation?: Array<number>;
        /** ジオメトリのサイズ。幅と高さの配列。
         * (デフォルト : [1, 1])
         * ```js
         * size: [width, height]
         * ```
         * 数値を1つだけ指定すると、その値が幅と高さになる。
         * ```js
         * size: 2 // [2, 2] と指定したのと同じ
         * ```
         */
        size?: Array<number> | number;
        /** 解像度。
         * (デフォルト : 1)
         * ```js
         * resolution: 2 // 解像度を2にする
         * ```
         */
        resolution?: number;
        /** テキストの水平方向の配置。
         * (デフォルト : "center")
         * ```js
         * textAlign: "left" // 左揃え
         * ```
         */
        textAlign?: string;
        /** テキストの垂直方向の配置。
         * (デフォルト : "middle")
         * ```js
         * textBaseline: "top" // 上揃え
         * ```
         */
        textBaseline?: string;
        /** 背景色。
         * (デフォルト : false)
         * ```js
         * background: "#ffffff" // 白色の背景
         * ```
         */
        background?: string | boolean;
        /** マテリアルの種類。
         * (デフォルト : "Basic")
         * ```js
         * material: "Standard"
         * ```
         */
        material?: string;
        /** テキストの表示面。
         * (デフォルト : "DoubleSide")
         * ```js
         * side: "FrontSide"
         * ```
         */
        side?: string;
        /** ガイドラインの幅。
         * (デフォルト : 0)
         * ```js
         * guide: 0.01 // ガイドラインの幅を0.01にする
         * ```
         */
        guide?: number;
        /** ガイドラインの色。
         * (デフォルト : "#ff0000")
         * ```js
         * guideColor: "#00ff00" // 緑色のガイドライン
         * ```
         */
        guideColor?: string;
        /** 自動でシーンに追加するかどうか。
         * (デフォルト : true)
         * ```js
         * autoAdd: false // シーンに自動追加しない
         * ```
         */
        autoAdd?: boolean;
      }
    ): THREE.Mesh;

    /**
     * テキストのテクスチャを作成する。
     * ```js
     * const texture = create.textTexture("Hello, World!", {
     *   fontSize: 48, // フォントサイズ
     *   color: "#ff0000", // テキストの色
     * })
     * ```
     */
    textTexture(
      /**
       * 表示するテキスト文字列。
       */
      text: string,
      props?: {
        /** テキストのサイズ。
         * (デフォルト : 48)
         * ```js
         * fontSize: 48
         * ```
         */
        fontSize?: number;
        /** フォントのウェイト。
         * (デフォルト : "")
         * ```js
         * fontWeight: "bold"
         * ```
         */
        fontWeight?: number | string;
        /** フォント。
         * (デフォルト : "'Noto Sans JP', sans-serif")
         * ```js
         * font: "Arial"
         * ```
         */
        font?: string;
        /** テキストの色。
         * (デフォルト : "#000000")
         * ```js
         * color: "#ff0000" // 赤色
         * ```
         */
        color?: string;
        /**
         * テクスチャのサイズ。幅と高さの配列。
         * (デフォルト : [500, 500])
         * ```js
         * size: [width, height]
         * ```
         */
        size?: Array<number>;
        /** テキストの水平方向の配置。
         * (デフォルト : "center")
         * ```js
         * textAlign: "left" // 左揃え
         * ```
         */
        textAlign?: string;
        /** テキストの垂直方向の配置。
         * (デフォルト : "middle")
         * ```js
         * textBaseline: "top" // 上揃え
         * ```
         */
        textBaseline?: string;
        /** 背景色。
         * (デフォルト : false)
         * ```js
         * background: "#ffffff" // 白色の背景
         * ```
         */
        background?: string | boolean;
        /** ガイドラインの幅。
         * (デフォルト : 0)
         * ```js
         * guide: 0.01 // ガイドラインの幅を0.01にする
         * ```
         */
        guide?: number;
        /** ガイドラインの色。
         * (デフォルト : "#ff0000")
         * ```js
         * guideColor: "#00ff00" // 緑色のガイドライン
         * ```
         */
        guideColor?: string;
      }
    ): THREE.Texture;

    /**
     * フォグを作成する。  
     * ```js
     * create.fog({
     *   color: 0xffffff, // フォグの色
     *   near: 1, // フォグの開始距離
     *   far: 1000, // フォグの終了距離
     * })
     * ```
     */
    fog(props?: {
      /**
       * 色。
       * (デフォルト : 0xffffff)
       * ```js
       * color: 0xff0000 // 赤色
       * ``
       */
      color?: THREE.Color | number | string;
      /**
       * フォグの開始距離。
       * (デフォルト : 1)
       * ```js
       * near: 1
       * ```
       */
      near?: number;
      /** フォグの終了距離。
       * (デフォルト : 1000)
       * ```js
       * far: 1000
       * ```
       */
      far?: number;
    }): THREE.Fog;

    /**
     * 空メッシュを作成してシーンに追加する。  
     * ```js
     * const sky = create.sky({
     *   size: 10000, // サイズ
     *   phi: 0, // 太陽の方位角
     *   theta: Math.PI * 0.47, // 太陽の高度角
     * })
     * ```
     */
    sky(props?: {
      /**
       * サイズ。  
       * (デフォルト : 10000)
       */
      size?: number | Array<number>;
      /**
       * 太陽の方位角（ラジアン）。  
       * (デフォルト : 0)
       */
      phi?: number;
      /** 太陽の高度角（ラジアン）。  
       * (デフォルト : Math.PI * 0.47)
       */
      theta?: number;
      /** シーンに自動追加するかどうか。  
       * (デフォルト : true)
       */
      autoAdd?: boolean;
    }): THREE.Mesh;

    /**
     * 海メッシュを作成してシーンに追加する。  
     * ```js
     * const ocean = create.ocean("texture.jpg")
     * // animate 内で update を呼び出す
     * animate(({ delta }) => {
     *  ocean.update(delta)
     * })
     * ```
     */
    ocean(
      /**
       * 海面のノーマルマップテクスチャのURL。
       */
      texture: string,
      props?: {
        /**
         * PlaneGeometryのサイズ。  
         * (デフォルト : 100)  
         * geometry が null の場合に使用される。
         */
        size?: Array<number> | number;
        /**
         * ジオメトリ。  
         * (デフォルト : null)  
         * null の場合は、size に基づいて PlaneGeometry が自動生成される。
         */
        geometry?: THREE.Geometry;
        /** 太陽の方向ベクトル。  
         * (デフォルト : new THREE.Vector3(1, 1, 1))
         */
        sunDirection?: THREE.Vector3;
        /** 太陽の色。  
         * (デフォルト : 0xffffff)
         */
        sunColor?: THREE.Color | number | string;
        /** 水の色。  
         * (デフォルト : 0x001e0f)
         */
        waterColor?: THREE.Color | number | string;
        /** 歪みのスケール。  
         * (デフォルト : 3.7)
         */
        distortionScale?: number;
        /** テクスチャのサイズ。  
         * (デフォルト : 512)
         */
        textureSize?: number | Array<number>;
        /** フォグの有無。  
         * (デフォルト : false)
         */
        fog?: boolean;
        /** 位置。  
         * (デフォルト : [0, 0, 0])
         */
        position?: Array<number>;
        /** 回転。  
         * (デフォルト : [-Math.PI / 2, 0, 0])
         */
        rotation?: Array<number>;
        /** シーンに自動追加するかどうか。  
         * (デフォルト : true)
         */
        autoAdd?: boolean;
      }): {
      mesh: THREE.Mesh;
      update: (time: number) => void;
    };

    /**
     * 水を作成してシーンに追加する。
     * ```js
     * create.water("normalMap0.jpg", "normalMap1.jpg")
     * ```
     * ```js
     * // サイズ等の変更
     * create.water("normalMap0.jpg", "normalMap1.jpg", {
     *   size: 10,
     *   color: 0x001e0f,
     *   position: [0, 0, 0],
     *   rotation: [-Math.PI / 2, 0, 0],
     * })
     * ```
     */
    water(
      /**
       * 海面のノーマルマップテクスチャのURL1。
       */
      normalMap0: string,
      /**
       * 海面のノーマルマップテクスチャのURL2。
       */
      normalMap1: string,
      props?: {
        /**
         * PlaneGeometryのサイズ。  
         * (デフォルト : 1)  
         * geometry が null の場合に使用される。
         */
        size?: Array<number> | number;
        /**
         * ジオメトリ。  
         * (デフォルト : null)  
         * null の場合は、size に基づいて PlaneGeometry が自動生成される。
         */
        geometry?: THREE.Geometry;
        /** 水の色。  
         * (デフォルト : 0xffffff)
         */
        color?: THREE.Color | number | string;
        /**
         * スケール。  
         * (デフォルト : 4)
         */
        scale?: number;
        /** 流れる速度。  
         * (デフォルト : [1, 1])
         */
        flow?: Array<number>;
        /** テクスチャのサイズ。  
         * (デフォルト : 512)
         */
        textureSize?: number | Array<number>;
        /** 位置。  
         * (デフォルト : [0, 0, 0])
         */
        position?: Array<number>;
        /** 回転。  
         * (デフォルト : [-Math.PI / 2, 0, 0])
         */
        rotation?: Array<number>;
        /** シーンに自動追加するかどうか。  
         * (デフォルト : true)
         */
        autoAdd?: boolean;
      }): {
      mesh: THREE.Mesh;
    };

    /**
     * ポジショナルオーディオを作成してシーンに追加する。  
     * 作成したポジショナルオーディオは、オブジェクトにアタッチして使用する。
     * ```js
     * const audio = create.positionalAudio("sound.mp3", camera, {
     *   refDistance: 1,
     *   maxDistance: 100,
     *   loop: true,
     *   volume: 1,
     * })
     * const cube = create.cube()
     * cube.add( audio )
     * ```
     * ユーザアクションがないと再生されないため、ユーザアクションイベント内で再生を開始する必要がある。
     * ```js
     * const button = document.createElement("button");
     * button.addEventListener("click", () => {
     *   audio.play()
     * })
     * document.body.appendChild(button);
     * ```
     */
    positionalAudio(
      /**
       * 音声ファイルのURL。
       */
      soundFile: string,
      /**
       * 音源のターゲットオブジェクト。
       */
      target: THREE.Object3D,
      props?: {
        /**
         * 参照距離。  
         * (デフォルト: 1)
         * ```js
         * refDistance: 5
         * ```
         */
        refDistance?: number;
        /** 最大距離。  
         * (デフォルト: 100)
         * ```js
         * maxDistance: 500
         * ```
         */
        maxDistance?: number;
        /** 音声をループ再生するかどうか。  
         * (デフォルト: true)
         * ```js
         * loop: false
         * ```
         */
        loop?: boolean;
        /** 音量。  
         * (デフォルト: 1)
         * ```js
         * volume: 0.5
         * ```
         */
        volume?: number;
        /**
         * 距離モデル。  
         * (デフォルト: "exponential")
         */
        distanceModel?: string;
        /** 減衰係数。  
         * (デフォルト: 1)
         * ```js
         * rolloffFactor: 2
         * ```
         */
        rolloffFactor?: number;
        /** 指向性コーンの内角度（度）。  
         * この角度内では最大音量で再生される。  
         * この角度外では outerAngle に向かって音量が減衰する。
         * (デフォルト: 360)
         * ```js
         * innerAngle: Math.PI / 8
         * ```
         */
        innerAngle?: number;
        /** 指向性コーンの外角度（度）。  
         * この角度外では outerGain の音量で再生される。  
         * (デフォルト: 360)
         * ```js
         * outerAngle: Math.PI / 2
         * ```
         */
        outerAngle?: number;
        /** 指向性コーンの外側の音量。  
         * (デフォルト: 0)
         * ```js
         * outerGain: 0.1
         * ```
         */
        outerGain?: number;
        /** ヘルパーを表示するかどうか。  
         * (デフォルト: false)
         * ```js
         * helper: true
         * ```
         */
        helper?: boolean;
      }): THREE.PositionalAudio;
  }
}