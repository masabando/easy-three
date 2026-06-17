export default function H2({ className = "", children, ...rest }) {
  return (
    <h2 className={`text-2xl mb-4 ${className}`} {...rest}>{children}</h2>
  )
}