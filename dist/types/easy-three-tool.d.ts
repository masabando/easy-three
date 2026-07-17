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
  }
}
