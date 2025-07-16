import { BVHLoader } from "three/addons/loaders/BVHLoader.js";

const bvh = ({ THREE }) => {
  return async (url, vrm, {
    effectiveWeight = 1,
    timeScale = 1000,
    onProgress = (p) => { },
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
      const bones = nameList.map((boneName) => vrm.bone(boneName));
      const tracks = [];

      for (let i = 0; i < idList.length; i++) {
        const keys = createKeys(idList[i], bvh.clip.tracks);
        if (!keys) continue;

        const bone = bones[i];
        if (!bone) continue;

        const times = keys.map(k => k.time / timeScale);
        const values = keys.flatMap(k => k.rot);

        const track = new THREE.QuaternionKeyframeTrack(
          `${bone.name}.quaternion`,
          times,
          values
        );

        tracks.push(track);

        if (keys[0].pos) {
          const posValues = keys.flatMap(k => k.pos ?? [0, 0, 0]);
          const posTrack = new THREE.VectorKeyframeTrack(
            `${bone.name}.position`,
            times,
            posValues
          );
          tracks.push(posTrack);
        }
      }

      return new THREE.AnimationClip('BVHClip', -1, tracks);
    }


    function createKeys(id, tracks) {
      const posTrack = findTrack(`${id}.position`, tracks);
      const rotTrack = findTrack(`${id}.quaternion`, tracks);

      const keys = [];
      const rate = 0.008;
      for (let i = 0; i < posTrack.times.length; i++) {
        const key = {};

        key["time"] = parseInt(posTrack.times[i] * timeScale);

        key["rot"] = [
          -rotTrack.values[i * 4],
          rotTrack.values[i * 4 + 1],
          -rotTrack.values[i * 4 + 2],
          rotTrack.values[i * 4 + 3],
        ];

        if (id == "root") {
          key["pos"] = [
            -posTrack.values[i * 3] * rate,
            posTrack.values[i * 3 + 1] * rate,
            -posTrack.values[i * 3 + 2] * rate
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

    const bvhObj = {};
    const loader = new BVHLoader();
    // loader.load(url, (bvh) => {
    //   const clip = createClip(vrm, bvh);
    //   bvhObj.duration = clip.duration;
    //   bvhObj.mixer = new THREE.AnimationMixer(vrm.scene);
    //   bvhObj.mixer.clipAction(clip).setEffectiveWeight(effectiveWeight).play();
    // }, onProgress);
    const bvh = await loader.loadAsync(url, onProgress)
    const clip = createClip(vrm, bvh);
    bvhObj.duration = clip.duration;
    bvhObj.mixer = new THREE.AnimationMixer(vrm.scene);
    bvhObj.mixer.clipAction(clip).setEffectiveWeight(effectiveWeight).play();
    return bvhObj;
  }
}

export default bvh