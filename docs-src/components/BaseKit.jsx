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