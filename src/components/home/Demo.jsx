"use client";
import { init } from "@dist/easy-three.js";
import { useEffect, useRef } from "react";

export const Demo = {
  Simple: (props) => {
    const ref = useRef();
    useEffect(() => {
      const { camera, create, animate, destroy } = init(ref.current);
      camera.position.set(1, 1, 1);
      create.ambientLight();
      create.directionalLight();
      const cube = create.cube({ rounded: true, segments: 7 });
      animate(({ time }) => {
        cube.rotation.x = time
        cube.rotation.y = time
      });
      return () => {
        destroy();
      };
    }, []);
    return <div ref={ref} {...props}></div>;
  },
  Model: (props) => {
    const ref = useRef();
    useEffect(() => {
      const { camera, create, animate, controls, helper, load, destroy } = init(
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

      const cube = create.cube({
        size: 0.5,
        position: [1, 1, 0],
        rounded: true,
        segments: 7,
      });

      let model;
      load.vrm("./model/sample.vrm").then((m) => {
        model = m;
      });

      animate(({ time, delta }) => {
        cube.rotation.y += delta;
        cube.rotation.x += delta;
        if (model) {
          model.bone("leftUpperArm").rotation.z =
            Math.sin(time) * Math.PI * 0.25;
          model.update(delta);
        }
      });
      return () => {
        destroy();
      }
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
        destroy,
      } = init(ref.current);
      const textureLoader = new THREE.TextureLoader();
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
        rounded: true,
        segments: 7,
        position: [0, 0.5, 0],
        option: texture.cube,
      });
      const group = new THREE.Group();
      let i = 0;
      const cube1 = create.cube({
        size: 1,
        segments: 7,
        rounded: true,
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
      i++;
      const ball = create.sphere({
        size: 0.8,
        position: [
          3 * Math.sin((i * Math.PI * 2) / 4),
          0.5,
          3 * Math.cos((i * Math.PI * 2) / 4),
        ],
      })
      i++;
      const cube2 = create.cube({
        size: 1,
        segments: 7,
        rounded: true,
        position: [
          3 * Math.sin((i * Math.PI * 2) / 4),
          0.5,
          3 * Math.cos((i * Math.PI * 2) / 4),
        ],
        autoAdd: false,
        option: {
          color: 0x333333,
        },
      })
      i++;
      const torus = create.torus({
        size: 0.7,
        tube: 0.2,
        position: [
          3 * Math.sin((i * Math.PI * 2) / 4),
          0.5,
          3 * Math.cos((i * Math.PI * 2) / 4),
        ],
        option: {
          metalness: 0.8,
          roughness: 0.2,
          color: 0x8888ff,
        }
      })
      group.add(cube1);
      group.add(ball)
      group.add(cube2);
      group.add(torus);
      scene.add(group);
      animate(({ time }) => {
        group.rotation.y = time
        cube1.rotation.x = time
        cube1.rotation.y = time
        cube2.rotation.x = time
        cube2.rotation.y = time
        torus.rotation.x = time * 2
        torus.rotation.y = time
      });
      return () => {
        destroy()
      }
    }, []);
    return <div ref={ref} {...props}></div>;
  },
};
