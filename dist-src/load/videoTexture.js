const videoTexture = ({ THREE }) => {
  return (url, {
    autoPlay = true,
    loop = true,
  } = {}) => {
    const video = document.createElement("video");
    video.crossOrigin = "anonymous";
    video.onloadeddata = () => {
      video.play();
    }
    //video.muted = true;
    video.loop = loop;
    video.setAttribute("playsinline", "")
    video.setAttribute("muted", "")
    if (autoPlay) video.setAttribute("autoplay", "");

    video.src = url;
    const texture = new THREE.VideoTexture(video);
    texture.colorSpace = THREE.SRGBColorSpace;
    return texture;
  }
}

export default videoTexture
