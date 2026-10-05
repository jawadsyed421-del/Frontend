export default function Avatar({ size = 38, empty = false }) {
  if (empty) {
    return (
      <span
        className="avatar avatar--empty"
        style={{ width: size, height: size }}
        aria-hidden="true"
      />
    )
  }
  return (
    <svg className="avatar" viewBox="0 0 80 80" width={size} height={size} aria-hidden="true">
      <circle cx="40" cy="40" r="40" fill="#e9ebee" />
      <circle cx="40" cy="31" r="13" fill="#c3c7cc" />
      <path d="M14 74c3-14 13-21 26-21s23 7 26 21z" fill="#c3c7cc" />
    </svg>
  )
}
