// types/easy-three-postprocessing.d.ts

declare module "@masabando/easy-three" {
  export interface EasyThreePostprocessing {
    /**
     * Bloomエフェクトを追加。  
     * exposure(曝光度), background(背景色), threshold(しきい値), strength(強さ), radius(ブラー半径)
     * を指定可能。  
     * 戻り値の bloom() を animate() 内で呼び出すことでエフェクトが適用される。  
     * animate の第2引数には false を指定して、自動レンダリングを無効化する必要がある。
     * ```js
     * const cube = create.cube()
     * const { bloom } = postprocessing.bloom({
     *  exposure: 1.5
     * })
     * animate(({ time, delta }) => {
     *   bloom()
     * }, false)
     * ```
     */
    bloom(props?: {
      /**
       * 曝光度 (デフォルト: 1)
       */
      exposure?: number;
      /**
       * 背景色 (デフォルト: 0x000000)
       */
      background?: THREE.ColorRepresentation;
      /**
       * しきい値 (デフォルト: 0)
       */
      threshold?: number;
      /**
       * 強さ (デフォルト: 1)
       */
      strength?: number;
      /**
       * ブラー半径 (デフォルト: 0.5)
       */
      radius?: number;
    }): {
      bloom: THREE.UnrealBloomPass;
    };

    /**
     * 選択オブジェクトにBloomエフェクトを追加。  
     * exposure(曝光度), background(背景色), threshold(しきい値), strength(強さ), radius(ブラー半径)
     * を指定可能。  
     * 戻り値の addSelectedBloom(対象1, 対象2, ...) でBloom対象を設定する。  
     * 戻り値の selectedBloom() を animate() 内で呼び出すことでエフェクトが適用される。  
     * animate の第2引数には false を指定して、自動レンダリングを無効化する必要がある。
     * ```js
     * const cube = create.cube()
     * const sphere = create.sphere({ position: [2, 0, 0] })
     * const { selectedBloom, addSelectedBloom } = postprocessing.selectedBloom({
     *  strength: 2
     * })
     * addSelectedBloom(cube, sphere) // Bloom 対象を追加
     * animate(({ time, delta }) => {
     *   selectedBloom() // Boom 適用
     * }, false)
     * ```
     */
    selectedBloom(props?: {
      /**
       * 曝光度 (デフォルト: 1)
       */
      exposure?: number;
      /**
       * 背景色 (デフォルト: 0x000000)
       */
      background?: THREE.ColorRepresentation;
      /**
       * しきい値 (デフォルト: 0)
       */
      threshold?: number;
      /**
       * 強さ (デフォルト: 1)
       */
      strength?: number;
      /**
       * ブラー半径 (デフォルト: 0.5)
       */
      radius?: number;
    }): {
      selectedBloom: (selectedObjects: THREE.Object3D[]) => void;
      addSelectedBloom: () => void;
    };

    /**
     * ピクセル化エフェクトを追加。    
     * size(ピクセルの大きさ), normalEdge(法線エッジの強さ), depthEdge(深度エッジの強さ)
     * を指定可能。  
     * 戻り値の pixel() を animate() 内で呼び出すことでエフェクトが適用される。  
     * animate の第2引数には false を指定して、自動レンダリングを無効化する必要がある。
     * ```js
     * const cube = create.cube()
     * const { pixel } = postprocessing.pixel()
     * animate(({ time, delta }) => {
     *  pixel()
     * }, false)
     * ```
     */
    pixel(props?: {
      /** ピクセルの大きさ (デフォルト : 6) */
      size?: number;
      /** 法線エッジの強さ (デフォルト : 0.3) */
      normalEdge?: number;
      /** 深度エッジの強さ (デフォルト : 0.3) */
      depthEdge?: number;
    }): {
      pixel: () => void;
    };

    /**
     * マスクエフェクトを追加。  
     * 戻り値の mask(time) を animate() 内で呼び出すことでエフェクトが適用される。  
     * animate の第2引数には false を指定して、自動レンダリングを無効化する必要がある。
     * ```js
     * const torusKnot = create.torusKnot()
     * const texture = load.texture("./path/to/texture.png")
     * const { mask } = postprocessing.mask(texture)
     * animate(({ time, delta }) => {
     *  mask(time)
     * }, false)
     * ```
     */
    mask(texture: THREE.Texture): {
      mask: (time) => void;
    };

    /**
     * Glitchエフェクトを追加。  
     * wild(ワイルドモード)を指定可能。  
     * 戻り値の glitch() を animate() 内で呼び出すことでエフェクトが適用される。  
     * animate の第2引数には false を指定して、自動レンダリングを無効化する必要がある。
     * ```js
     * const cube = create.cube()
     * const { glitch } = postprocessing.glitch({ wild: true })
     * animate(({ time, delta }) => {
     *  glitch()
     * }, false)
     * ```
     */
    glitch(props?: {
      /** ワイルドモード (デフォルト: false) */
      wild?: boolean;
    }): {
      glitch: () => void;
    };

    /**
     * Bokehエフェクトを追加。  
     * focus(フォーカス距離), aperture(絞り値), maxblur(最大ブラー)
     * を指定可能。  
     * 戻り値の bokeh(delta) を animate() 内で呼び出すことでエフェクトが適用される。  
     * animate の第2引数には false を指定して、自動レンダリングを無効化する必要がある。
     * ```js
     * const cube = create.cube()
     * const { bokeh } = postprocessing.bokeh({
     *  focus: 1,
     *  aperture: 0.025,
     *  maxblur: 0.01
     * })
     * animate(({ time, delta }) => {
     *  bokeh(delta)
     * }, false)
     * ```
     */
    bokeh(props?: {
      /** フォーカス距離 (デフォルト: 1) */
      focus?: number;
      /** 絞り値 (デフォルト: 0.01) */
      aperture?: number;
      /** 最大ブラー (デフォルト: 0.01) */
      maxblur?: number;
    }): {
      bokeh: (delta) => void;
    };
  }
}
