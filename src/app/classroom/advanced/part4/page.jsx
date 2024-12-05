"use client";
import { EasyThreeBox, Note, GeometryBox } from "@/components/BaseKit";
import CodeBlock from "@/components/CodeBlock";
import { init } from "@dist/easy-three";
import GUI from "lil-gui"

export default function Page() {
  return (
    <div className="classroomPart">
      <h2>VRMモデルを用いたアバターの表示</h2>
      <p>
        このセクションでは、VRMモデルを用いてアバターを表示する方法を学びます。
      </p>

      <h3>VRMモデルの表示</h3>

      <GeometryBox />


      <EasyThreeBox
        toggleControls
        effect={(r, controlsFlag) => {
          const { camera, create, animate, controls, helper, load, destroy } =
            init(r);
          if (controlsFlag) controls.connect();
          helper.grid();
          helper.axes();
          create.ambientLight();
          create.directionalLight({ intensity: 2, position: [-10, 10, -10] });
          camera.position.set(0, 1.3, -2);
          controls.target.set(0, 1, 0);
          create.plane({
            size: 10,
            position: [0, 0, 0],
            rotation: [-Math.PI / 2, 0, 0],
            option: {
              color: 0x808080,
            },
          });
          let model;
          load.vrm("/easy-three/model/sample.vrm").then((vrm) => {
            model = vrm;
          });
          animate(({ time, delta }) => {
            if (model) {
              model.update(delta);
            }
          });
          return () => {
            destroy();
          };
        }}
      />


      <h3>VRMモデルのボーン</h3>
      <p>
        VRMモデルには、人間の骨格に対応したボーンがあります。
        <br />
        これを利用することで、アバターの動きを制御することができます。
      </p>
      <h4>上半身</h4>
      <ul>
        <li><Note>head : 頭</Note></li>
        <li>rightEye : 右目</li>
        <li>leftEye : 左目</li>
        <li>jaw : 顎</li>
        <li>
          <Note>neck : 首</Note>
        </li>
        <li>upperChest : 上胸部</li>
        <li>chest : 胸</li>
        <li><Note>spine : 腰(背骨)</Note></li>
        <li>rightShoulder : 右肩</li>
        <li>leftShoulder : 左肩</li>
        <li>
          <Note>rightUpperArm : 右肩</Note>
        </li>
        <li>
          <Note>leftUpperArm : 左肩</Note>
        </li>
        <li>
          <Note>rightLowerArm : 右ひじ</Note>
        </li>
        <li>
          <Note>leftLowerArm : 左ひじ</Note>
        </li>
        <li>rightHand : 右手</li>
        <li>leftHand : 左手</li>
      </ul>
      <h4>下半身</h4>
      <ul>
        <li><Note>hips : 腰(体全体の中央)</Note></li>
        <li>
          <Note>rightUpperLeg : 右足の付け根</Note>
        </li>
        <li>
          <Note>leftUpperLeg : 左足の付け根</Note>
        </li>
        <li>
          <Note>rightLowerLeg : 右ひざ</Note>
        </li>
        <li>
          <Note>leftLowerLeg : 左ひざ</Note>
        </li>
        <li>rightFoot : 右足</li>
        <li>leftFoot : 左足</li>
        <li>rightToes : 右つま先</li>
        <li>leftToes : 左つま先</li>
      </ul>
      <h4>手の指</h4>
      <ul>
        <li>
          親指
          <ul>
            <li>rightThumbProximal : 右親指基部</li>
            <li>rightThumbMetacarpal : 右親指中手骨</li>
            <li>rightThumbDistal : 右親指先端</li>
            <li>leftThumbProximal : 左親指基部</li>
            <li>leftThumbMetacarpal : 左親指中手骨</li>
            <li>leftThumbDistal : 左親指先端</li>
          </ul>
        </li>
        <li>
          人指し指
          <ul>
            <li>rightIndexProximal : 右人差し指基部</li>
            <li>rightIndexIntermediate : 右人差し指中間</li>
            <li>rightIndexDistal : 右人差し指先端</li>
            <li>leftIndexProximal : 左人差し指基部</li>
            <li>leftIndexIntermediate : 左人差し指中間</li>
            <li>leftIndexDistal : 左人差し指先端</li>
          </ul>
        </li>
        <li>
          中指
          <ul>
            <li>rightMiddleProximal : 右中指基部</li>
            <li>rightMiddleIntermediate : 右中指中間</li>
            <li>rightMiddleDistal : 右中指先端</li>
            <li>leftMiddleProximal : 左中指基部</li>
            <li>leftMiddleIntermediate : 左中指中間</li>
            <li>leftMiddleDistal : 左中指先端</li>
          </ul>
        </li>
        <li>
          薬指
          <ul>
            <li>rightRingProximal : 右薬指基部</li>
            <li>rightRingIntermediate : 右薬指中間</li>
            <li>rightRingDistal : 右薬指先端</li>
            <li>leftRingProximal : 左薬指基部</li>
            <li>leftRingIntermediate : 左薬指中間</li>
            <li>leftRingDistal : 左薬指先端</li>
          </ul>
        </li>
        <li>
          小指
          <ul>
            <li>rightLittleProximal : 右小指基部</li>
            <li>rightLittleIntermediate : 右小指中間</li>
            <li>rightLittleDistal : 右小指先端</li>
            <li>leftLittleProximal : 左小指基部</li>
            <li>leftLittleIntermediate : 左小指中間</li>
            <li>leftLittleDistal : 左小指先端</li>
          </ul>
        </li>
      </ul>
    </div>
  );
}