"use client"
import { useEffect, useRef } from "react";
import { init } from "@dist/easy-three.js";

export function Ex1(props) {
  const ref = useRef();
  useEffect(() => {
    const { camera, controls, create, animate, destroy } = init(ref.current);
    controls.connect();
    camera.position.set(0, 4, 4);
    create.ambientLight();
    create.directionalLight();

    const cube = create.cube()
    const instances = create.instances(cube, 8, {
      offset: [1, 0, -1],
    })

    animate();
    return () => {
      destroy();
    };
  }, []);
  return <div ref={ref} {...props}></div>;
}

export function Ex2(props) {
  const ref = useRef();
  useEffect(() => {
    const { camera, controls, create, animate, destroy } = init(ref.current);
    controls.connect();
    camera.position.set(0, 4, 4);
    create.ambientLight();
    create.directionalLight();

    const cube = create.cube();
    const instances = create.instances(cube, 8, {
      layout: "grid",
      offset: [1.2, 1.2, 1.2],
    });

    animate();
    return () => {
      destroy();
    };
  }, []);
  return <div ref={ref} {...props}></div>;
}

export function Ex3(props) {
  const ref = useRef();
  useEffect(() => {
    const { camera, controls, create, animate, destroy } = init(ref.current);
    controls.connect();
    camera.position.set(0, 4, 4);
    create.ambientLight();
    create.directionalLight();

    const cube = create.cube();
    const instances = create.instances(cube, 8, {
      layout: "circle",
      radius: 2,
    });

    animate();
    return () => {
      destroy();
    };
  }, []);
  return <div ref={ref} {...props}></div>;
}

export function Ex4(props) {
  const ref = useRef();
  useEffect(() => {
    const { camera, controls, create, animate, destroy } = init(ref.current);
    controls.connect();
    camera.position.set(0, 4, 4);
    create.ambientLight();
    create.directionalLight();

    const cube = create.cube();
    const instances = create.instances(cube, 8, {
      layout: "cube",
      offset: [1.2, 1.2, 1.2],
    });

    animate();
    return () => {
      destroy();
    };
  }, []);
  return <div ref={ref} {...props}></div>;
}

export function Ex5(props) {
  const ref = useRef();
  useEffect(() => {
    const { camera, controls, create, animate, destroy } = init(ref.current);
    controls.connect();
    camera.position.set(0, 4, 4);
    create.ambientLight();
    create.directionalLight();

    const cube = create.cube({
      option: {
        color: "#ffffff",
      }
    });
    const instances = create.instances(cube, 8, {
      layout: "circle",
      radius: 3,
    });

    // 0番目のインスタンスの位置を (0, 0, 0) に設定する
    instances.at(0).position.set(0, 0, 0);

    // 1番目のインスタンスの色を赤に設定する
    instances.at(1).color.set("#ff0000");

    // 2番目のインスタンスを少し回転させる
    instances.at(2).rotation.set(Math.PI / 4, Math.PI / 4, 0);

    // 3番目のインスタンスを少し大きくする
    instances.at(3).scale.set(1.5, 1.5, 1.5);

    animate();
    return () => {
      destroy();
    };
  }, []);
  return <div ref={ref} {...props}></div>;
}
