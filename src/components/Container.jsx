export default function Container({ children }) {
  return (
    <div className="max-w-full mx-auto px-4 pt-12 pb-30">
      {children}
    </div>
  )
}