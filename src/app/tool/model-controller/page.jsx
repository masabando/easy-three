"use client";
import { useEffect, useRef, useState } from "react";
import { init } from "@dist/easy-three";
import GUI from "lil-gui";
import styles from "./page.module.scss";

const emotionsList = [
  {
    category: "目",
    data: [
      {
        name: "右目を閉じる",
        label: "blinkRight",
      },
      {
        name: "左目を閉じる",
        label: "blinkLeft",
      },
      {
        name: "両目を閉じる",
        label: "blink",
      },
      {
        name: "下を見る",
        label: "lookDown",
      },
      {
        name: "上を見る",
        label: "lookUp",
      },
      {
        name: "右を見る",
        label: "lookRight",
      },
      {
        name: "左を見る",
        label: "lookLeft",
      },
    ],
  },
  {
    category: "口",
    data: [
      {
        name: "あ",
        label: "aa",
      },
      {
        name: "い",
        label: "ih",
      },
      {
        name: "う",
        label: "ou",
      },
      {
        name: "え",
        label: "ee",
      },
      {
        name: "お",
        label: "oh",
      },
    ],
  },
  {
    category: "その他",
    data: [
      {
        name: "喜び",
        label: "happy",
      },
      {
        name: "怒り",
        label: "angry",
      },
      {
        name: "悲しみ",
        label: "sad",
      },
      {
        name: "驚き",
        label: "surprised",
      },
      {
        name: "普通",
        label: "neutral",
      },
    ],
  },
];

const restrictions = [
  {
    category: "体全体",
    data: [
      {
        name: "体",
        data: {
          hips: { x: [-1.4, 1.4], y: [-1.4, 1.4], z: [-1.4, 1.4] },
        },
      },
      {
        name: "腰",
        data: {
          spine: { x: [-1.4, 1.4], y: [-1.4, 1.4], z: [-1.4, 1.4] },
        },
      },
    ],
  },
  {
    category: "頭部",
    data: [
      {
        name: "頭",
        data: {
          head: { x: [-1.4, 1.4] },
        },
      },
      {
        name: "首",
        data: {
          neck: { y: [-1.4, 1.4] },
        },
      },
    ],
  },
  {
    category: "腕",
    data: [
      {
        name: "左肩",
        data: {
          leftShoulder: { y: [-1.4, 1.4], z: [-1.4, 1.4] },
        },
      },
      {
        name: "右肩",
        data: {
          rightShoulder: { y: [-1.4, 1.4], z: [-1.4, 1.4] },
        },
      },
      {
        name: "左腕",
        data: {
          leftUpperArm: { x: [-1.4, 1.4], y: [-1.4, 1.4], z: [-1.4, 1.4] },
          leftLowerArm: { y: [-2.8, 0] },
        },
      },
      {
        name: "右腕",
        data: {
          rightUpperArm: { x: [-1.4, 1.4], y: [-1.4, 1.4], z: [-1.4, 1.4] },
          rightLowerArm: { y: [0, 2.8] },
        },
      },
    ],
  },
  {
    category: "脚",
    data: [
      {
        name: "左足",
        data: {
          leftUpperLeg: { x: [-1.4, 1.5] },
          leftLowerLeg: { x: [-2.5, 0] },
        },
      },
      {
        name: "右足",
        data: {
          rightUpperLeg: { x: [-1.4, 1.5] },
          rightLowerLeg: { x: [-2.5, 0] },
        },
      },
    ],
  },
];

export default function Page() {
  const [progress, setProgress] = useState("");
  const gui = useRef();
  const guiRef = useRef();
  const model = useRef();
  const ref = useRef();
  const note = useRef();
  const ddText = useRef();
  const progressText = useRef();
  const config = {
    lookAt: true,
  };
  const emotion = {
    blinkRight: 0,
    blinkLeft: 0,
    blink: 0,
    lookDown: 0,
    lookUp: 0,
    lookRight: 0,
    lookLeft: 0,
    aa: 0,
    ih: 0,
    ou: 0,
    ee: 0,
    oh: 0,
    happy: 0,
    angry: 0,
    sad: 0,
    surprised: 0,
    neutral: 0,
  };
  useEffect(() => {
    const { create, animate, camera, load, helper, controls, scene, destroy } =
      init(ref.current);
    function loadVRM(url) {
      note.current.style.visibility = "visible";
      ddText.current.style.visibility = "hidden";
      progressText.current.style.visibility = "visible";
      load.vrm(url, {
        onProgress: (p) => {
          setProgress(l => 
            `${~~(p.loaded/1000)} / ${~~(p.total/1000)} kB (${~~(p.loaded / p.total * 100)}%)`);
        }
      }).then((m) => {
        if (model.current) {
          model.current.dispose();
          gui.current.destroy();
        }
        note.current.style.visibility = "hidden";
        ddText.current.style.visibility = "hidden";
        progressText.current.style.visibility = "hidden";
        gui.current = new GUI({
          container: guiRef.current,
          closeFolders: true,
        }).title("モデルコントローラ");
        model.current = m;
        model.current.lookAt.target = camera;
        gui.current
          .add(config, "lookAt")
          .name("カメラ目線")
          .onChange((v) => {
            model.current.lookAt.autoUpdate = v;
          });

        restrictions.forEach((category) => {
          const folder = gui.current.addFolder(category.category);
          category.data.forEach((rest) => {
            const subFolder = folder.addFolder(rest.name);
            Object.keys(rest.data).forEach((boneName) => {
              const bone = model.current.bone(boneName);
              const r = rest.data[boneName];
              Object.keys(r).forEach((axis) => {
                subFolder
                  .add(bone.rotation, axis, ...rest.data[boneName][axis])
                  .name(`${boneName} [${axis}]`);
              });
            });
          });
        });
        Object.keys(emotion).forEach((key) => {
          emotion[key] = model.current.expressionManager.getValue(key);
        });

        const emotionFolder = gui.current.addFolder("表情");
        emotionsList.forEach((category) => {
          const folder = emotionFolder.addFolder(category.category);
          category.data.forEach((emt) => {
            if (typeof emotion[emt.label] === "number") {
              const c = folder
                .add(emotion, emt.label, 0, 1, 0.01)
                .name(emt.name);
              c.onChange((v) => {
                model.current.expressionManager.setValue(emt.label, v);
              });
            }
          });
        });
      });
    }

    controls.connect();
    helper.grid();
    helper.axes();
    camera.position.set(0, 1.3, -1.6);
    controls.target.set(0, 1, 0);
    create.ambientLight();
    create.directionalLight({ intensity: 2, position: [10, 10, -10] });
    loadVRM("/easy-three/model/sample.vrm", scene);
    animate(({ delta }) => {
      if (model.current) {
        model.current.update(delta);
      }
    });
    ref.current.addEventListener("dragover", (e) => {
      e.preventDefault()
      note.current.style.visibility = "visible";
      ddText.current.style.visibility = "visible";
      progressText.current.visibility = "hidden";
    });
    ref.current.addEventListener("dragleave", (e) => {
      e.preventDefault()
      note.current.style.visibility = "hidden";
      ddText.current.style.visibility = "hidden";
      progressText.current.visibility = "visible";
    });
    ref.current.addEventListener("drop", (e) => {
      e.preventDefault();
      const files = e.dataTransfer.files;
      if (files.length > 0) {
        const file = files[0];
        const blob = new Blob([file], { type: "application/octet-stream" });
        const url = URL.createObjectURL(blob);
        loadVRM(url);
      }
    });
    return () => {
      gui.current.destroy();
      destroy();
    };
  }, []);

  return (
    <div>
      <h1>モデルコントローラ</h1>
      <div>
        好きなVRMファイルをドラッグ＆ドロップすると、そのモデルが表示されます。
      </div>
      <div className={styles.MCContainer}>
        <div ref={ref} className={styles.MCMain}>
          <div ref={note} className={styles.MCNote}>
            <div>
              <div ref={ddText}>ドロップしてVRMファイルを変更</div>
              <div ref={progressText}>{progress}</div>
            </div>
          </div>
        </div>
        <div ref={guiRef} className={styles.MCGUI}></div>
      </div>
    </div>
  );
}
