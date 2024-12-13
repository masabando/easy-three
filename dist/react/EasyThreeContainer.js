"use client";
import { useEffect, useRef, useState } from "react";
import { Switch } from "antd";

export default function EasyThreeContainer({
  code = () => { },
  toggleControls = false,
  switchStyle = {
    bottom: "10px",
    left: "10px",
  },
  style = {
    margin: "1rem auto 1rem auto",
    width: "500px",
    maxWidth: "90%",
    aspectRatio: "4 / 3",
    border: "1px solid #ccc",
  },
  ...props
}) {

  const ref = useRef();
  const controlsRef = useRef(null);
  const [mouseControl, setMouseControl] = useState(false);
  
  useEffect(() => {
    const { destroy, controls } = code(ref.current) ?? {
      destroy: () => { },
      controls: null,
    };
    controlsRef.current = controls;
    return destroy;
  }, []);

  useEffect(() => {
    if (controlsRef.current) {
      if (mouseControl) {
        controlsRef.current.connect();
      } else {
        controlsRef.current.disconnect();
      }
    }
  }, [mouseControl]);

  return (
    <div
      style={{
        position: "relative",
        margin: "1rem auto 1rem auto",
        width: "500px",
        maxWidth: "90%",
        aspectRatio: "4 / 3",
        border: "1px solid #ccc",
        ...style
      }}
      {...props}
    >
      {toggleControls && (
        <Switch
          style={{
            position: "absolute",
            ...switchStyle
          }}
          defaultChecked={mouseControl}
          checkedChildren="ON"
          unCheckedChildren="OFF"
          onChange={(v) => { setMouseControl(v) }}
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
  )
}
