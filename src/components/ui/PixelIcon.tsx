const MAPS = {
  heart: [
    "............",
    ".XXX....XXX.",
    "XXXXX..XXXXX",
    "XXXXXXXXXXXX",
    "XXXXXXXXXXXX",
    "XXXXXXXXXXXX",
    ".XXXXXXXXXX.",
    "..XXXXXXXX..",
    "...XXXXXX...",
    "....XXXX....",
    ".....XX.....",
    "............",
  ],
  coffee: [
    "............",
    "..X...X.....",
    "...X...X....",
    "..X...X.....",
    "............",
    ".XXXXXXXX...",
    ".XXXXXXXXXX.",
    ".XXXXXXXX.X.",
    ".XXXXXXXX.X.",
    ".XXXXXXXXXX.",
    "..XXXXXXXX..",
    "............",
  ],
  mail: [
    "............",
    "............",
    "XXXXXXXXXXXX",
    "X.X......X.X",
    "X..X....X..X",
    "X...X..X...X",
    "X....XX....X",
    "X..........X",
    "X..........X",
    "X..........X",
    "XXXXXXXXXXXX",
    "............",
  ],
  github: [
    "............",
    "..X......X..",
    ".XXX....XXX.",
    ".XXXXXXXXXX.",
    "XXXXXXXXXXXX",
    "XXX.XXXX.XXX",
    "XXX.XXXX.XXX",
    "XXXXXXXXXXXX",
    ".XXXX..XXXX.",
    ".XXXXXXXXXX.",
    "..XXXXXXXX..",
    "............",
  ],
  gitlab: [
    "............",
    "XX........XX",
    "XXX......XXX",
    "XXXX....XXXX",
    "XXXXXXXXXXXX",
    ".XXXXXXXXXX.",
    ".XXXXXXXXXX.",
    "..XXXXXXXX..",
    "..XXXXXXXX..",
    "...XXXXXX...",
    "....XXXX....",
    ".....XX.....",
  ],
};

export type PixelIconName = keyof typeof MAPS;

export default function PixelIcon({ name }: { name: PixelIconName }) {
  return (
    <svg className="pixel-icon" viewBox="0 0 12 12" shapeRendering="crispEdges" aria-hidden="true">
      {MAPS[name].flatMap((row, y) =>
        row.split("").map((c, x) => (c === "X" ? <rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" fill="currentColor" /> : null)),
      )}
    </svg>
  );
}
