"use client";
import Container from "react-bootstrap/Container";
import CodeBlock from "@/components/CodeBlock";
import { useEffect, useRef } from "react";
import { init } from "@dist/easy-three.js";
import { noto } from "@/app/layout";
import ReferenceContent from "@/components/ReferenceContent";
import { Note, Link } from "@/components/BaseKit";

function Ex1(props) {
  const ref = useRef();
  useEffect(() => {
    const { camera, create, helper, controls, load, animate, destroy } = init(
      ref.current
    );
    create.ambientLight();
    create.directionalLight();
    camera.position.set(0, 1.5, -1.5);
    controls.target.set(0, 1, 0);

    controls.connect();
    helper.axes();
    helper.grid();

    let model;
    const bvhObj = {};
    load.vrm("/easy-three/model/sample.vrm", {
      position: [0, -0.55, 0],
    }).then((vrm) => {
      model = vrm;
      load.bvh("/easy-three/motion/sampleMotion.bvh", vrm, bvhObj, {
        onProgress: (p) => {
          console.log(p.loaded)
        }
      });
    });

    animate(({ delta }) => {
      if (model && bvhObj.mixer) {
        bvhObj.mixer.update(delta * 1000);
        model.update(delta * 1000);
      }
    });
    return () => {
      destroy();
    };
  }, []);
  return <div ref={ref} {...props}></div>;
}

function Ex2(props) {
  const ref = useRef();
  useEffect(() => {
    const { camera, create, helper, controls, load, animate, destroy } = init(
      ref.current
    );
    create.ambientLight();
    create.directionalLight();
    camera.position.set(0, 1.5, -1.5);
    controls.target.set(0, 1, 0);

    controls.connect();
    helper.axes();
    helper.grid();

    let model;
    load.vrm("/easy-three/model/sample.vrm", {
      position: [0, -0.55, 0],
    }).then((vrm) => {
      model = vrm;
    });

    animate(({ delta }) => {
      if (model) {
        model.scene.rotation.y += delta;
      }
    });
    return () => {
      destroy();
    };
  }, []);
  return <div ref={ref} {...props}></div>;
}

export default function Page() {
  return (
    <Container className="pt-4 pb-5">
      <title>load.bvh | easy-three</title>
      <h1>load.bvh</h1>

      <ReferenceContent
        name="load.bvh"
        args="url : String, vrm : VRM, bvhObj : Object, props : Object"
        returnObject="Null"
        argsInfo={
          <>
            <div>
              <span>url</span> - BVHファイルのURL。
            </div>
            <div>
              <span>vrm</span> - VRM。
            </div>
            <div>
              <span>bvhObj</span> - 空のオブジェクト。
            </div>
            <div>
              <span>props</span> - 設定オブジェクト。
              <ul>
                <li>effectiveWeight (Number) : ウェイト (デフォルト : 1)。</li>
                <li>
                  timeScale (Number) : タイムスケール (デフォルト : 1000)。
                </li>
                <li>nameList (Array) : VRMボーン名のリスト。</li>
                <li>idList (Array) : BVHボーン名のリスト。</li>
                <li>
                  onProgress (Function) : 読み込み進捗のコールバック関数。
                </li>
              </ul>
            </div>
          </>
        }
      >
        <p>
          BVH形式のアニメーションファイルを読み込み、指定したVRMモデルに適用します。
          <br />
          <Note>VRMモデルは、あらかじめ読み込んでおく必要があります。</Note>
          <br />
          bvhObjには、mixerとdurationが格納されます。
          <br />
          timeScale で指定した値だけ、アニメーションの時間が遅くなっています。
          そのため、<Note>delta にtimeScale相当の値を掛けてください</Note>。
          <br />
          mocopiで取得したBVHファイルを使用することを想定しています。
          <br />
          そうでない場合は、idListを変更する必要があるかもしれません。
        </p>
        <p>nameListとidListの初期値は以下の通りです。</p>
      </ReferenceContent>

      <CodeBlock>
        {`nameList = [
"head", "neck", "chest",
"spine", "hips",
"rightShoulder", "rightUpperArm",
"rightLowerArm", "rightHand",
"leftShoulder", "leftUpperArm",
"leftLowerArm", "leftHand",
"rightUpperLeg", "rightLowerLeg",
"rightFoot",
"leftUpperLeg", "leftLowerLeg",
"leftFoot"]

idList = [
"head", "neck_1", "torso_5",
"torso_3", "root",
"r_shoulder", "r_up_arm",
"r_low_arm", "r_hand",
"l_shoulder", "l_up_arm",
"l_low_arm", "l_hand",
"r_up_leg", "r_low_leg",
"r_foot",
"l_up_leg", "l_low_leg",
"l_foot"]`}
      </CodeBlock>

      <h2>コードの例</h2>
      <h4>BVHによるVRMモデルのアニメーション</h4>
      <Ex1
        className="border"
        style={{
          width: "240px",
          height: "240px",
        }}
      />
      <CodeBlock>
        {`const { camera, create, helper, load, controls, animate } = init()
create.ambientLight();
create.directionalLight();
camera.position.set(0, 1.5, -1.5);
controls.target.set(0, 1, 0);

controls.connect();

helper.axes();
helper.grid();

let model;
const bvhObj = {};

load.vrm("/easy-three/model/sample.vrm").then((vrm) => {
  model = vrm;
  load.bvh("/easy-three/motion/sampleMotion.bvh", vrm, bvhObj);
});

animate(({ delta }) => {
  if (model && bvhObj.mixer) {
    bvhObj.mixer.update(delta * 1000);
    model.update(delta * 1000);
  }
});

`}
      </CodeBlock>

    </Container>
  );
}
