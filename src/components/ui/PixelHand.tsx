const MAP = [
  "......WWW....",
  "WWWWWWRRRWW..",
  "WRRRRRRRRRRW.",
  "WRRRRRRRRRRRW",
  "WRRRRRRRRRRW.",
  "WWWWWWRRRWW..",
  "......WWW....",
];

export default function PixelHand({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`pixel-hand ${className}`}
      viewBox="0 0 13 7"
      aria-hidden="true"
      shapeRendering="crispEdges"
    >
      {MAP.flatMap((row, y) =>
        row.split("").map((c, x) =>
          c === "." ? null : (
            <rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" fill={c === "W" ? "#fff" : "#ff2d3d"} />
          ),
        ),
      )}
    </svg>
  );
}
