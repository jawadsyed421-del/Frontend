/* Sizes are quoted in design pixels; they render in rem so an avatar shrinks
   with the rest of the frame on narrower screens (see the html rule in tokens.css). */
const rem = (size) => (typeof size === 'number' ? `${size / 16}rem` : size)

export default function Avatar({ size = 38, empty = false }) {
  const box = rem(size)

  if (empty) {
    return (
      <span
        className="avatar avatar--empty"
        style={{ width: box, height: box }}
        aria-hidden="true"
      />
    )
  }
  return (
    <svg
      className="avatar"
      viewBox="0 0 80 80"
      style={{ width: box, height: box }}
      aria-hidden="true"
    >
      <circle cx="40" cy="40" r="40" fill="#e9ebee" />
      <circle cx="40" cy="31" r="13" fill="#c3c7cc" />
      <path d="M14 74c3-14 13-21 26-21s23 7 26 21z" fill="#c3c7cc" />
    </svg>
  )
}
