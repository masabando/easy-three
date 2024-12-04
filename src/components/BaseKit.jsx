"use client";
import NextLink from "next/link";
import { useRef, useEffect } from "react";

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

export function EasyThreeBox({ effect }) {
  const ref = useRef();
  useEffect(() => {
    return effect(ref.current)
  }, []);
  return (
    <div
      className="mx-auto mx-lg-0"
      ref={ref}
      style={{
        width: "500px",
        maxWidth: "90%",
        aspectRatio: "4 / 3",
        border: "1px solid #ccc",
      }}
    ></div>
  );
}
