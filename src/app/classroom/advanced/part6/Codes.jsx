"use client";
import { EasyThreeBox } from "@/components/BaseKit";
import { init } from "@dist/easy-three";

export function Ex1() {
  return (
    <EasyThreeBox
      toggleControls
      effect={(r) => {
        const { camera, create, animate, controls, destroy } = init(r);
        camera.position.set(-6, 6, 6);
        create.ambientLight();
        create.directionalLight();
        const plane = create.plane({
          size: 10,
          segments: 30,
          option: {
            flatShading: true,
          },
        });
        const position = plane.geometry.attributes.position;
        animate(({ time }) => {
          for (let i = 0; i < position.count; i++) {
            const x = position.getX(i);
            position.setZ(i, Math.sin(x + time));
          }
          position.needsUpdate = true;
        });
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

export function Ex2() {
  return (
    <EasyThreeBox
      toggleControls
      effect={(r) => {
        const { camera, create, animate, controls, destroy } = init(r);
        camera.position.set(-6, 6, 6);
        create.ambientLight();
        create.directionalLight();
        const plane = create.plane({
          size: 10,
          segments: 30,
          option: {
            flatShading: true,
          },
        });
        const position = plane.geometry.attributes.position;
        animate(({ time }) => {
          for (let i = 0; i < position.count; i++) {
            const x = position.getX(i);
            const y = position.getY(i);
            position.setZ(i, Math.sin(x + time) * Math.cos(y + time));
          }
          position.needsUpdate = true;
        });
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

export function Ex3() {
  return (
    <EasyThreeBox
      toggleControls
      effect={(r) => {
        const { camera, create, animate, controls, load, destroy, THREE } = init(r);
        camera.position.set(-6, 6, 6);
        create.ambientLight();
        create.directionalLight();
        const plane = create.plane({
          size: 10,
          segments: 30,
          option: {
            metalness: 0.8,
            roughness: 0.1,
            side: THREE.DoubleSide,
          },
        });
        const position = plane.geometry.attributes.position;
        load.background(
          "/easy-three/texture/hdr/kloofendal_48d_partly_cloudy_puresky_1k.hdr"
        );
        animate(({ time }) => {
          for (let i = 0; i < position.count; i++) {
            const x = position.getX(i);
            const y = position.getY(i);
            position.setZ(i, Math.sin(x + time) * Math.cos(y + time));
          }
          position.needsUpdate = true;
          plane.geometry.computeVertexNormals();
        });
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

