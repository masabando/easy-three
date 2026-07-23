// types/easy-three-tool.d.ts

declare module "@masabando/easy-three" {
  import type * as THREE from "three";

  export interface EasyThreeTool {
    /**
     * ピクセル比を設定する。
     *
     * ```js
     * tool.setPixelRatio(2) // ピクセル比を設定
     * ```
     */
    setPixelRatio(ratio: number): void;

    /**
     * 2つのオブジェクト間の距離を測定する。
     *
     * ```js
     * const dist = tool.distance(mesh1, mesh2)
     * const distFromCamera = tool.distance(mesh, camera)
     * ```
     */
    distance(mesh1: THREE.Object3D, mesh2: THREE.Object3D, usePixelRatio?: boolean): number;

    /**
     * CSG 演算を行う。
     * @param mesh1 CSG 演算対象のメッシュ1
     * @param mesh2 CSG 演算対象のメッシュ2
     * @param options CSG 演算オプション
     * @returns CSG 演算後のメッシュ
     * 
     * ```js
     * const cube = create.cube({ size: 1 })
     * const sphere = create.sphere({ size: 0.7 })
     *
     * tool.csg(cube, sphere, {
     *   remove: true, // 元のオブジェクトをシーンから削除するかどうか (デフォルト: true)
     *   dispose: true, // 元のオブジェクトのマテリアルを破棄するかどうか (デフォルト: true)
     * })
     * ```
     */
    csg(mesh1: THREE.Mesh, mesh2: THREE.Mesh, options?: {
      /**
       * CSG 演算後に、元のオブジェクトをシーンから削除するかどうか。
       * デフォルトは true で、削除されます。
       */
      remove?: boolean;
      /**
       * CSG 演算後に、元のオブジェクトのマテリアルを破棄するかどうか。
       * デフォルトは true で、破棄されます。
       */
      dispose?: boolean;
    }): void;
  }
}
