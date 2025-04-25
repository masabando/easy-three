import { BVHLoader } from "three/addons/loaders/BVHLoader.js";

const bvh = ({ THREE }) => {
  return (url, vrm, bvhObj, {
    effectiveWeight = 1,
    timeScale = 1000,
    nameList = [
      "head",
      "neck",
      "chest",
      "spine",
      "hips",
      "rightShoulder",
      "rightUpperArm",
      "rightLowerArm",
      "rightHand",
      "leftShoulder",
      "leftUpperArm",
      "leftLowerArm",
      "leftHand",
      "rightUpperLeg",
      "rightLowerLeg",
      "rightFoot",
      "leftUpperLeg",
      "leftLowerLeg",
      "leftFoot",
    ],
    idList = [
      "head",
      "neck_1",
      "torso_5",
      "torso_3",
      "root",
      "r_shoulder",
      "r_up_arm",
      "r_low_arm",
      "r_hand",
      "l_shoulder",
      "l_up_arm",
      "l_low_arm",
      "l_hand",
      "r_up_leg",
      "r_low_leg",
      "r_foot",
      "l_up_leg",
      "l_low_leg",
      "l_foot"
    ]
  } = {}) => {

    function createClip(vrm, bvh) {
      const bones = nameList.map((boneName) => {
        return vrm.bone(boneName);
      });
      const hierarchy = [];
      for (let i = 0; i < idList.length; i++) {
        const keys = createKeys(idList[i], bvh.clip.tracks);
        if (keys != null) {
          hierarchy.push({ keys: keys });
        }
      }
      const clip = THREE.AnimationClip.parseAnimation(
        { hierarchy: hierarchy },
        bones
      );

      clip.tracks.some((track) => {
        track.name = track.name.replace(
          /^\.bones\[([^\]]+)\].(position|quaternion|scale)$/,
          "$1.$2"
        );
      });
      return clip;
    }

    function createKeys(id, tracks) {
      const posTrack = findTrack(`${id}.position`, tracks);
      const rotTrack = findTrack(`${id}.quaternion`, tracks);

      const keys = [];
      const rate = 0.008; // サイズの調整
      for (let i = 0; i < posTrack.times.length; i++) {
        const key = {};

        // 時間
        key["time"] = parseInt(posTrack.times[i] * timeScale);

        // 回転
        if (id == "rButtock" || id == "lButtock") {
          const id2 = id == "rButtock" ? "rThigh" : "lThigh";
          let q1 = values2quaternion(rotTrack.values, i);
          const rotTrack2 = findTrack(".bones[" + id2 + "].quaternion", tracks);
          q1.multiply(values2quaternion(rotTrack2.values, i));
          key["rot"] = [-q1.x, q1.y, -q1.z, q1.w];
        } else {
          key["rot"] = [
            -rotTrack.values[i * 4],
            rotTrack.values[i * 4 + 1],
            -rotTrack.values[i * 4 + 2],
            rotTrack.values[i * 4 + 3],
          ];
        }

        // 位置
        if (id == "hip") {
          key["pos"] = [
            -posTrack.values[i * 3] * rate,
            posTrack.values[i * 3 + 1] * rate,
            -posTrack.values[i * 3 + 2] * rate,
          ];
        }
        keys.push(key);
      }
      if (keys.length == 0) return null;
      return keys;
    }

    function findTrack(name, tracks) {
      for (let i = 0; i < tracks.length; i++) {
        if (tracks[i].name == name) return tracks[i];
      }
      return null;
    }

    // 配列をQuaternionに変換
    function values2quaternion(values, i) {
      return new THREE.Quaternion(
        values[i * 4],
        values[i * 4 + 1],
        values[i * 4 + 2],
        values[i * 4 + 3]
      );
    }

    const loader = new BVHLoader();
    loader.load(url, (bvh) => {
      const clip = createClip(vrm, bvh);
      bvhObj.mixer = new THREE.AnimationMixer(vrm.scene);
      bvhObj.mixer.clipAction(clip).setEffectiveWeight(effectiveWeight).play();
    });
  }
}

export default bvh