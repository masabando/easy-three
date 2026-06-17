"use client";
import { useEffect, useRef } from "react";
import { init } from "@dist/easy-three.js";

export function Ex1(props) {
  const ref = useRef();
  const soundRef = useRef();
  useEffect(() => {
    const { camera, controls, create, animate, destroy, THREE, Default } = init(ref.current);
    controls.connect();
    camera.position.set(0, 1, 0);

    create.ambientLight({ intensity: 0.2 });
    create.directionalLight({ intensity: 1, position: [5, 5, -7] });

    const cube = create.cube({ size: 0.2 });
    controls.target.set(0, 0, 1);

    soundRef.current = create.positionalAudio(
      "/easy-three/sound/chill_gravity.mp3",
      camera,
      {
        refDistance: 1,
        maxDistance: 100,
      }
    )
    cube.add(soundRef.current);

    animate(({ time }) => {
      cube.position.z = 10 * Math.abs(Math.sin(time));
    });
    return () => {
      soundRef.current.destroy();
      destroy();
    };
  }, []);
  return (
    <div>
      <div className="mb-2">
        <button
          className="btn btn-sm btn-primary"
          onClick={() => {
            if (soundRef.current.isPlaying) {
              soundRef.current.stop();
            } else {
              soundRef.current.play();
            }
          }}
        >
          再生
        </button>
      </div>
      <div ref={ref} {...props}></div>
    </div>
  );
}

export function Ex2(props) {
  const ref = useRef();
  const soundRef = useRef();
  useEffect(() => {
    const { camera, controls, create, animate, destroy, THREE, Default } = init(
      ref.current
    );
    controls.connect();
    camera.position.set(0, 1, 1);

    create.ambientLight({ intensity: 0.2 });
    create.directionalLight({ intensity: 1, position: [5, 5, -7] });

    const cube = create.cube({ size: 0.5 });

    soundRef.current = create.positionalAudio(
      "/easy-three/sound/chill_gravity.mp3",
      camera,
      {
        refDistance: 1,
        maxDistance: 100,
        innerAngle: 60,
        outerAngle: 180,
        outerGain: 0,
      }
    );
    cube.lookAt(0, 0, 0);
    cube.add(soundRef.current);

    animate(({ time }) => {
      cube.rotation.y += 0.01;
    });
    return () => {
      soundRef.current.destroy();
      destroy();
    };
  }, []);
  return (
    <div>
      <div className="mb-2">
        <button
          className="btn btn-sm btn-primary"
          onClick={() => {
            if (soundRef.current.isPlaying) {
              soundRef.current.stop();
            } else {
              soundRef.current.play();
            }
          }}
        >
          再生
        </button>
      </div>
      <div ref={ref} {...props}></div>
    </div>
  );
}

export function Ex3(props) {
  const ref = useRef();
  useEffect(() => {
    const { camera, create, animate, destroy, THREE, Default } = init(
      ref.current
    );
    camera.position.set(0, 0, 2);
    const pointLight = create.pointLight({
      position: [0, 0, 1],
      helper: 0.1,
      helperColor: 0xff0000,
    });

    const cube = create.cube();

    animate(({ delta, time }) => {
      cube.rotation.x += delta;
      cube.rotation.y += delta;
      pointLight.position.set(
        Math.sin(time),
        0,
        Math.cos(time)
      )
    });
    return () => {
      destroy();
    };
  }, []);
  return <div ref={ref} {...props}></div>;
}
