"use client";
import NextLink from "next/link"

export function Link({ href = "", locale="/easy-three", children, ...props }) {
  return (
    <NextLink
      {...props}
      href={href}
      locale={locale}
    >
      {children}
    </NextLink>
  )
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