export default function H3({ className = "", children, ...rest }) {
  return (
    <h3 className={`text-xl mb-2 font-bold ${className}`} {...rest}>{children}</h3>
  )
}