const stars = [
  [6, 12], [18, 40], [33, 8], [47, 27], [61, 14], [74, 45], [88, 20], [94, 62],
  [12, 70], [27, 88], [52, 80], [68, 92], [82, 76], [40, 55], [4, 50], [58, 4],
];

export default function Doodles() {
  return (
    <div className="doodles" aria-hidden="true">
      {stars.map(([x, y], i) => (
        <span key={i} className="star" style={{ left: `${x}%`, top: `${y}%`, animationDelay: `${(i % 5) * 0.6}s` }} />
      ))}

      <svg className="doodle" style={{ left: "3%", top: "22%", width: 90 }} viewBox="0 0 90 50" fill="none" stroke="#fff" strokeWidth="2">
        <ellipse cx="45" cy="25" rx="40" ry="9" transform="rotate(-18 45 25)" />
        <circle cx="45" cy="25" r="14" />
      </svg>

      <svg className="doodle" style={{ right: "6%", top: "18%", width: 64 }} viewBox="0 0 64 64" fill="none" stroke="#fff" strokeWidth="2">
        <circle cx="32" cy="32" r="26" />
        <path d="M14 26c8-2 12 4 18 2s8-8 16-4M18 44c6 2 10-2 14 0s10 2 14-4" />
      </svg>

      <svg className="doodle" style={{ right: "4%", top: "55%", width: 70 }} viewBox="0 0 70 80" fill="none" stroke="#fff" strokeWidth="2">
        <path d="M20 50h30l-4 26H24zM35 50C35 30 20 24 14 8M35 50c0-20 12-26 22-38M35 50c0-14-2-30 0-44" />
      </svg>

      <svg className="doodle" style={{ left: "6%", top: "62%", width: 80 }} viewBox="0 0 80 80" fill="none" stroke="#fff" strokeWidth="2">
        <path d="M10 70 52 28" />
        <ellipse cx="62" cy="18" rx="14" ry="9" transform="rotate(-45 62 18)" />
      </svg>

      <svg className="doodle" style={{ left: "46%", top: "6%", width: 70 }} viewBox="0 0 70 70" fill="none" stroke="#fff" strokeWidth="2">
        <path d="M8 24h54M14 24v38M56 24v38M20 24V10h30v14" />
      </svg>
    </div>
  );
}
