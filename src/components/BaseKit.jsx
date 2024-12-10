"use client";
import { Switch } from "antd";
import NextLink from "next/link";
import { useRef, useEffect, useState } from "react";
import GUI from "lil-gui";
import { init } from "@dist/easy-three";

export function Link({
  href = "",
  locale = "/easy-three",
  children,
  ...props
}) {
  return (
    <NextLink {...props} href={href} locale={locale}>
      {children}
    </NextLink>
  );
}

export function Note({ children }) {
  return (
    <span
      style={{
        background: "linear-gradient(transparent 60%, #fff3cd 60%)",
        fontWeight: 500,
      }}
    >
      {children}
    </span>
  );
}

export function EasyThreeBox({ effect, toggleControls = false }) {
  const ref = useRef();
  const [mouseControl, setMouseControl] = useState(false);
  const controlsRef = useRef();
  useEffect(() => {
    const { destroy, controls } = effect(ref.current);
    controlsRef.current = controls;
    return destroy;
  }, []);
  useEffect(() => {
    if (controlsRef.current) {
      controlsRef.current(mouseControl);
    }
  }, [mouseControl]);
  return (
    <div
      className="mx-auto mx-lg-0 my-4 position-relative"
      style={{
        width: "500px",
        maxWidth: "90%",
        aspectRatio: "4 / 3",
        border: "1px solid #ccc",
      }}
    >
      {toggleControls && (
        <Switch
          style={{
            position: "absolute",
            bottom: "10px",
            left: "10px",
          }}
          defaultChecked={mouseControl}
          onChange={(v) => { setMouseControl(v) }}
          checkedChildren="カメラ操作ON"
          unCheckedChildren="カメラ操作OFF"
        />
      )}
      <div
        ref={ref}
        style={{
          width: "100%",
          height: "100%",
        }}
      ></div>
    </div>
  );
}


export function GeometryBox() {
  const guiRef = useRef();
  function draw(r) {
    const { camera, create, animate, controls, destroy, load, scene } =
      init(r);

    controls.connect();
    camera.position.set(0, 1.3, -2);
    controls.target.set(0, 1, 0);
    create.ambientLight();
    create.directionalLight();
    let model;
    load.vrm("/easy-three/model/sample.vrm").then((vrm) => {
      model = vrm;
      // bone
      guiRef.current = new GUI({ container: r }).title("(´・ω・`)");
      ["leftUpperArm", "rightUpperArm"].forEach((boneName) => {
        const bone = model.bone(boneName);
        guiRef.current.add(bone.rotation, "z", -Math.PI, Math.PI).name(boneName);
      })
    });


    animate(({ delta }) => {
      if (model) {
        model.update(delta);
      }
    });
    return () => {
      guiRef.current.destroy()
      destroy();
    };
  }
  return (
    <EasyThreeBox
      effect={draw}
    />
  )
}