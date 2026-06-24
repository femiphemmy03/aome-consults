// Reusable leaf-and-circle mark echoing the Aome Consults logo.
// Pass a className to control size/color (uses currentColor for stroke).
export default function LeafIcon({ className = 'w-10 h-11' }) {
  return (
    <svg viewBox="0 0 200 220" className={`leaf-mark ${className}`} aria-hidden="true">
      <circle cx="100" cy="38" r="26" fill="none" stroke="currentColor" strokeWidth="6" />
      <path
        d="M97,76 C44,84 28,146 66,196 C86,160 97,118 97,76 Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="6"
      />
      <path
        d="M103,76 C156,84 172,146 134,196 C114,160 103,118 103,76 Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="6"
      />
    </svg>
  );
}
