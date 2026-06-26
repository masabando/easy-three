// types/easy-three-tool.d.ts

declare module "@masabando/easy-three" {

  export interface EasyThreeTool {
    /**
     * ピクセル比を設定する。
     *
     * ```js
     * tool.setPixelRatio(2) // ピクセル比を設定
     * ```
     */
    setPixelRatio(ratio: number): void;
  }
}
