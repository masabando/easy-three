// types/easy-three-default.d.ts

declare module "@masabando/easy-three" {
  import type * as THREE from "three";

  export interface EasyThreeDefault {
    /**
     * 使用するマテリアルの種類。
     * (デフォルト : "Physical")
     * "Physical", "Basic", "Normal" など、three.js のマテリアル名を指定できる。
     * @example
     * Default.material = "Basic";
     */
    material: string;

    /**
     * マテリアルの色指定のデフォルト値。  
     * (デフォルト : 0x1155ff)
     * @example
     * Default.color = 0xff0000;
     * Default.color = "#ff0000";
     */
    color: THREE.ColorRepresentation;

    /**
     * テクスチャ関連のデフォルト設定。
     */
    texture: {
      /**
       * テクスチャのラッピング方法。  
       * (デフォルト : "Repeat")
       */
      wrapping: string;
    };

    /**
     * イベント関連のデフォルト設定。
     */
    event: {
      /**
       * イベントリスナーのタイプ。  
       * (デフォルト : "once")
       */
      type: string;

      /**
       * キーイベントのトリガー。  
       * (デフォルト : /^[A-Za-z]$/ )
       */
      keyTrigger: RegExp;
    };

    /**
     * レイヤー関連の設定。
     */
    layer: {
      /**
       * postprocessing.selectedBloom がブルームエフェクトに使用するレイヤー番号。  
       * (デフォルト : 30)
       */
      bloom: number;
    };

    /**
     * シェーダー関連のデフォルト設定。
     */
    shader: {
      vertexShader: string;
      fragmentShader: string;
    };
  }
}
