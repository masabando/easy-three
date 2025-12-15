// types/easy-three-helper.d.ts

declare module "@masabando/easy-three" {

  export interface EasyThreeHelper {
    /**
     * グリッドヘルパーを作成してシーンに追加する。
     *
     * ```js
     * helper.grid() // グリッドヘルパーを追加
     * ```
     * 
     * size, divisions, colorCenterLine, colorGrid を指定可能。
     * 
     * ```js
     * helper.grid({
     *   size: 10, // グリッドのサイズ(縦横の長さ)
     *   divisions: 10, // 分割数
     *   colorCenterLine: 0x444444, // 中心線の色
     *   colorGrid: 0x888888 // グリッド線の色
     * })
     * ```
     */
    grid(props?: {
      /** グリッドのサイズ（デフォルト: 10） */
      size?: number;
      /** 分割数（デフォルト: 10） */
      divisions?: number;
      /** 中心線の色（デフォルト: 0x444444） */
      colorCenterLine?: number;
      /** グリッド線の色（デフォルト: 0x888888） */
      colorGrid?: number;
    }): THREE.GridHelper;

    /**
     * 軸ヘルパーを作成してシーンに追加する。
     * ```js
     * helper.axes() // 軸ヘルパーを追加
     * ```
     * 
     * size を指定可能。
     * 
     * ```js
     * helper.axes({
     *   size: 10 // 軸の長さ
     * })
     * ```
     */
    axes(props?: {
      /** 軸の長さ（デフォルト: 5） */
      size?: number;
    }): THREE.AxesHelper;
  }
}
