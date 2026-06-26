import { PositionalAudioHelper } from "three/addons/helpers/PositionalAudioHelper.js";

const positionalAudio = ({ scene, THREE }) => {
  return (audioFile, target, {
    refDistance = 1,
    maxDistance = 100,
    loop = true,
    volume = 0.5,
    distanceModel = 'exponential',
    rolloffFactor = 1,
    innerAngle = 360,
    outerAngle = 360,
    outerGain = 0,
    helper = false,
  } = {}) => {
    const listener = new THREE.AudioListener();
    target.add(listener);

    const sound = new THREE.PositionalAudio(listener);
    
    const audioLoader = new THREE.AudioLoader();
    audioLoader.load(audioFile, function (buffer) {
      sound.setBuffer(buffer);
      sound.setRefDistance(refDistance);
      sound.setLoop(loop);
      sound.setVolume(volume);
      sound.setRolloffFactor(rolloffFactor);
      sound.setMaxDistance(maxDistance);
      sound.setDistanceModel(distanceModel);
      sound.setDirectionalCone(innerAngle, outerAngle, outerGain);
    });
    if (helper) {
      const helper = new PositionalAudioHelper(sound);
      sound.add(helper);
    }
    sound.destroy = () => {
      sound.stop();
      sound.disconnect();
      // sound.dispose();
      target.remove(listener);
    }
    return sound;
  }
}

export default positionalAudio;
