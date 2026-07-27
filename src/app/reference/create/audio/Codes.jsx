"use client";
import { useEffect, useRef } from "react";
import { init } from "@dist/easy-three.js";

export function Ex1(props) {
  const ref = useRef();
  const audioRef = useRef();
  useEffect(() => {
    const { camera, create, animate, destroy } = init(ref.current);
    camera.position.set(0, 0, 3);

    create.ambientLight();
    create.directionalLight();
    create.sky();
    const box = create.box();

    const { audio } = create.audio("/easy-three/sound/neon_eternity.mp3");
    audioRef.current = audio;

    animate(({ delta }) => {
      if (audio.isPlaying) {
        box.rotation.x += delta;
        box.rotation.y += delta;
      }
    });
    return () => {
      audio.destroy();
      destroy();
    };
  }, []);
  return (
    <div className="mt-6">
      <button
        className="btn btn-primary"
        onClick={() => {
          if (audioRef.current.isPlaying) {
            audioRef.current.stop();
          } else {
            audioRef.current.play();
          }
        }}
      >
        play
      </button>
      <div ref={ref} {...props}></div>
    </div>
  );
}

export function Ex2(props) {
  const ref = useRef();
  const audioRef = useRef();
  useEffect(() => {
    const { camera, create, controls, animate, destroy } = init(ref.current);
    camera.position.set(0, 0, 3);
    controls.connect();

    create.ambientLight();
    create.directionalLight();
    create.sky();

    const fftSize = 128;

    const { audio, analyser } = create.audio("/easy-three/sound/neon_eternity.mp3", {
      fftSize: fftSize,
    });
    audioRef.current = audio;

    const cubeSize = 0.05;
    const soundCubes = create.instances(
      create.cube({ size: cubeSize }),
      fftSize / 2,
      {
        position: [-(cubeSize*1.4) * fftSize / 4, 0, 0],
        offset: [(cubeSize*1.4), 0, 0]
      }
    )

    animate(({ delta }) => {
      if (audio.isPlaying) {
        const frequencyData = analyser.getFrequencyData();
        for (let i = 0; i < soundCubes.count; i++) {
          const cube = soundCubes.at(i);
          const scale = frequencyData[i] / 10;
          cube.scale.set(1, Math.max(scale, 0.01), 1);
          const position = cube.position.get();
          cube.position.set(
            position.x,
            cubeSize * scale / 2 - cubeSize / 2,
            position.z
          );
        }
      }
    });
    return () => {
      audio.destroy();
      destroy();
    };
  }, []);
  return (
    <div className="mt-6">
      <button
        className="btn btn-primary"
        onClick={() => {
          if (audioRef.current.isPlaying) {
            audioRef.current.stop();
          } else {
            audioRef.current.play();
          }
        }}
      >
        play
      </button>
      <div ref={ref} {...props}></div>
    </div>
  );
}