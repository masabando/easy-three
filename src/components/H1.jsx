export default function H1({ className = "", children, ...rest }) {
  return (
    <h1 className={`text-3xl my-4 ${className}`} {...rest}>{children}</h1>
  )
}