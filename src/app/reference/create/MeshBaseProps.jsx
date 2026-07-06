export default function MeshBaseProps() {
  return (
    <>
      <li>position (Array) : 位置 (デフォルト : [0, 0, 0])。</li>
      <li>rotation (Array) : 回転 (デフォルト : [0, 0, 0])。</li>
      <li>
        option (Object) : オプション (デフォルト : {`{color: Default.color }`}
        )。
      </li>
      <li>
        material (String | Material | Material[]) : マテリアルタイプ、またはマテリアルオブジェクト、またはマテリアルオブジェクトの配列 (デフォルト :{`Default.material`}
        )。
      </li>
      <li>
        castShadow (Boolean) : 別のオブジェクトに影を落とすかどうか (デフォルト
        : true)。
      </li>
      <li>
        receiveShadow (Boolean) : 別のオブジェクトからの影を受けるかどうか
        (デフォルト : true)。
      </li>
      <li>
        doubleSide (Boolean) : 両面表示にするか？ (デフォルト : false)。
      </li>
      <li>
        upsideDown (Boolean) : 裏面表示にするか？ (デフォルト : false)。
      </li>
      <li>autoAdd (Boolean) : 自動でシーンに追加 (デフォルト : true)。</li>
    </>
  );
}