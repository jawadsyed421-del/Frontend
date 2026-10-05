export default function Icon({ name, size, className = '', style, ...rest }) {
  return (
    <span
      className={`material-symbols-rounded ${className}`}
      style={size ? { fontSize: size, ...style } : style}
      aria-hidden="true"
      {...rest}
    >
      {name}
    </span>
  )
}
