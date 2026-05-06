import { BLUE, CARD2 } from "../../constants/colors";

export default function PathGrid() {
  const cols = 16, rows = 10;
  const path = [[4,8],[4,7],[4,6],[4,5],[5,5],[6,5],[7,5],[8,5],[9,5],[10,5],[10,4],[10,3],[10,2]];
  const pathSet = new Set(path.map(([c, r]) => `${c},${r}`));
  return (
    <svg width="100%" viewBox={`0 0 ${cols * 24} ${rows * 24}`} style={{ display: "block" }}>
      {Array.from({ length: rows }, (_, r) =>
        Array.from({ length: cols }, (_, c) => {
          const key = `${c},${r}`;
          const onPath = pathSet.has(key);
          const isStart = c === 4 && r === 8;
          const isEnd = c === 10 && r === 2;
          if (isStart || isEnd) {
            return <circle key={key} cx={c * 24 + 12} cy={r * 24 + 12} r={7} fill={BLUE} />;
          }
          if (onPath) {
            return <circle key={key} cx={c * 24 + 12} cy={r * 24 + 12} r={2.5} fill="#22c55e" />;
          }
          return <circle key={key} cx={c * 24 + 12} cy={r * 24 + 12} r={2} fill={CARD2} />;
        })
      )}
      {/* path lines */}
      {path.slice(1).map(([c, r], i) => {
        const [pc, pr] = path[i];
        return <line key={i} x1={pc * 24 + 12} y1={pr * 24 + 12} x2={c * 24 + 12} y2={r * 24 + 12} stroke="#22c55e" strokeWidth="2.5" strokeDasharray="5,3" />;
      })}
    </svg>
  );
}
