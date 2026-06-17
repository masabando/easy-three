"use client";
import { EasyThreeBox } from "@/components/BaseKit";
import { init } from "@dist/easy-three";

export function Ex1() {
  return (
    <EasyThreeBox
      toggleControls
      effect={(r) => {
        const { camera, create, animate, controls, load, destroy } = init(r);
        camera.position.set(0, -1, 2);
        controls.autoRotate = true;
        create.ambientLight();
        create.directionalLight();
        load.background(
          "/easy-three/texture/hdr/kloofendal_48d_partly_cloudy_puresky_1k.hdr"
        );
        create.cube({
          option: {
            color: 0x99ff99,
            roughness: 0.1,
            metalness: 0.7,
          },
        });
        animate();
        return {
          destroy: () => {
            destroy();
          },
          controls: (f) => {
            if (f) controls.connect();
            else controls.disconnect();
          },
        };
      }}
    />
  )
}
