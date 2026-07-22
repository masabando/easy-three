"use client";
import { useEffect, useRef } from "react";
import { init } from "@dist/easy-three.js";

export function Ex1(props) {
  const ref = useRef();
  useEffect(() => {
    const { camera, create, animate, xr, destroy, controls } = init(
      ref.current,
    );

    camera.position.set(0, 1.6, 0);
    controls.target.set(0, 1.6, -1);

    create.ambientLight({ intensity: 1 });
    create.directionalLight();
    create.sky();

    const options = {
      rounded: true,
      segments: 8,
      radius: 0.3,
    };

    const cube1 = create.cube({
      position: [-1.5, 1.6, -5],
      option: {
        roughness: 0.6,
        metalness: 0.01,
      },
      ...options,
    });
    const cube2 = create.cube({
      position: [0, 1.6, -4],
      option: {
        roughness: 0.01,
        metalness: 0.6,
      },
      ...options,
    });
    const cube3 = create.cube({
      position: [1.5, 1.6, -3],
      option: {
        transmission: 1,
        thickness: 5,
        roughness: 0.01,
        metalness: 0,
      },
      ...options,
    });

    const ocean = create.ocean("/easy-three/texture/water/NormalMap-1.jpg", {
      waterColor: 0x556e6f,
    });

    const targetObjects = [cube1, cube2, cube3];

    const { rightController } = xr.setup({
      selectableObjects: targetObjects,
    });

    animate(({ delta }) => {
      ocean.update(delta);
      targetObjects.forEach((obj) => {
        obj.rotation.x += delta;
        obj.rotation.y += delta;
        obj.material.color.set(0xaaaaff);
      });
      if (rightController.userData.selected?.[0]) {
        const t = rightController.userData.selected[0].object;
        t.material.color.set(0xff8888);
        const intersections = rightController.getIntersections()
        if (intersections.length > 0) {
          const p = intersections[0].point;
          t.position.x = p.x;
          t.position.y = p.y;
          // t.position.z = p.z
        }
      }
    });
    return () => {
      destroy();
    };
  }, []);
  return <div ref={ref} {...props}></div>;
}
