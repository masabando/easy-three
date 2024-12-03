"use client";
import { init } from "https://cdn.jsdelivr.net/gh/masabando/easy-three@0.0.12/dist/easy-three.js";
import { useEffect, useRef } from "react";

export const Demo = {
  Simple: (props) => {
    const ref = useRef();
    useEffect(() => {
      const { camera, create, animate } = init(ref.current);
      camera.position.set(5, 5, 5);
      create.ambientLight();
      create.directionalLight();
      const cube = create.cube({ size: 3 });
      animate(({ clock }) => {
        cube.rotation.x = clock.getElapsedTime();
        cube.rotation.y = clock.getElapsedTime();
      });
    }, []);
    return <div ref={ref} {...props}></div>;
  },
  Model: (props) => {
    const ref = useRef();
    useEffect(() => {
      const { camera, create, animate, controls, helper, load } = init(
        ref.current
      );
      //controls.connect();
      controls.autoRotate = true;
      camera.position.set(0, 2, -2);
      controls.target.set(0, 1, 0);
      create.ambientLight();
      create.directionalLight({ intensity: 2, position: [10, 10, -10] });
      helper.axes();
      helper.grid();

      const cube = create.cube({ size: 0.5, position: [1, 1, 0] });

      let model;
      load.vrm("./model/sample.vrm").then((m) => {
        model = m;
      });

      animate(({ clock, delta }) => {
        cube.rotation.y += delta;
        cube.rotation.x += delta;
        if (model) {
          model.humanoid.getNormalizedBoneNode("leftUpperArm").rotation.z =
            Math.sin(clock.getElapsedTime()) * Math.PI * 0.25;
          model.update(delta);
        }
      });
    }, []);
    return <div ref={ref} {...props}></div>;
  },
  World: ({ worldControl, ...props }) => {
    const ref = useRef();
    const controlsRef = useRef();
    useEffect(() => {
      if (controlsRef.current) {
        if (worldControl) {
          controlsRef.current.connect();
        } else {
          controlsRef.current.disconnect();
        }
      }
    }, [worldControl]);

    useEffect(() => {
      const {
        camera,
        create,
        scene,
        renderer,
        controls,
        animate,
        load,
        THREE,
      } = init(ref.current);
      const textureLoader = new THREE.TextureLoader();
      renderer.outputEncoding = THREE.sRGBEncoding;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      controlsRef.current = controls;
      if (worldControl) {
        controls.connect();
      }
      camera.position.set(0, 2, 5);
      create.ambientLight({ intensity: 0.5 });
      create.directionalLight({ intensity: 1 });
      load.background("./texture/hdr/symmetrical_garden_02_1k.hdr");
      const texture = {
        cube: {
          map: textureLoader.load("./texture/img/red_brick_diff_1k.jpg"),
          normalMap: textureLoader.load(
            "./texture/img/red_brick_nor_gl_1k.jpg"
          ),
        },
        plane: {
          map: textureLoader.load(
            "./texture/img/monastery_stone_floor_diff_1k.jpg"
          ),
          normalMap: textureLoader.load(
            "./texture/img/monastery_stone_floor_nor_gl_1k.jpg"
          ),
          roughness: 1,
        },
      };
      texture.cube.map.colorSpace = THREE.SRGBColorSpace;
      texture.plane.map.colorSpace = THREE.SRGBColorSpace;

      texture.plane.map.wrapS = THREE.RepeatWrapping;
      texture.plane.map.wrapT = THREE.RepeatWrapping;
      texture.plane.normalMap.wrapS = THREE.RepeatWrapping;
      texture.plane.normalMap.wrapT = THREE.RepeatWrapping;
      texture.plane.map.repeat.set(4, 4);
      texture.plane.normalMap.repeat.set(4, 4);
      create.plane({
        size: 10,
        position: [0, -1, 0],
        rotation: [-Math.PI / 2, 0, 0],
        option: texture.plane,
      });
      create.cube({
        size: 3,
        position: [0, 0.5, 0],
        option: texture.cube,
      });
      const group = new THREE.Group();
      for (let i = 0; i < 4; i++) {
        group.add(
          create[i % 2 === 0 ? "cube" : "sphere"]({
            size: 1,
            position: [
              3 * Math.sin((i * Math.PI * 2) / 4),
              0.5,
              3 * Math.cos((i * Math.PI * 2) / 4),
            ],
            autoAdd: false,
            option: {
              metalness: 0.5,
              roughness: 0,
              color: 0xffffff,
            },
          })
        );
      }
      scene.add(group);
      create.cube({ position: [0, 2.5, 0] });
      animate();
    }, []);
    return <div ref={ref} {...props}></div>;
  },
};
