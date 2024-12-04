"use client";
import { Switch } from "antd";
import NextLink from "next/link";
import { useRef, useEffect, useState } from "react";

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
  useEffect(() => {
    return effect(ref.current, mouseControl);
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
            top: "10px",
            right: "10px",
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
