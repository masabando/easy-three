const audio = ({ THREE, camera }) => {
  return (
    soundFile,
    {
      loop = true,
      volume = 0.5,
      target = camera,
      fftSize = 128,
      onLoad = () => { },
      onError = () => { },
      onProgress = () => { },
    } = {}) => {
    const config = {
      fftSize,
    }
    const listener = new THREE.AudioListener();
    target.add(listener);

    const audio = new THREE.Audio(listener);
    const audioLoader = new THREE.AudioLoader();

    const analyser = new THREE.AudioAnalyser(audio, config.fftSize);

    audioLoader.load(soundFile, function (buffer) {
      audio.setBuffer(buffer);
      audio.setLoop(loop);
      audio.setVolume(volume);
      onLoad({ audio, analyser });
    },
      onProgress,
      onError
    );

    audio.destroy = () => {
      audio.stop();
      audio.disconnect();
      audio.remove();
      target.remove(listener);
      audio.destroy = () => { };
    }

    return { audio, analyser };
  }
}

export default audio
