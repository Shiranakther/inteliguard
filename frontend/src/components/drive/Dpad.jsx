import { CARD2, WHITE, MUTED } from "../../constants/colors";

export default function Dpad({ onMove }) {
  const ArrowBtn = ({ dir }) => {
    const rotMap = { up: 0, right: 90, down: 180, left: 270 };
    return (
      <div 
        className="dpad-btn" 
        onClick={() => onMove && onMove(dir)}
        style={{
          width: 48, height: 48, background: CARD2, borderRadius: 10,
          display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer",
          transform: `rotate(${rotMap[dir]}deg)`
        }}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={WHITE} strokeWidth="2.5" strokeLinecap="round">
          <line x1="12" y1="19" x2="12" y2="5" /><polyline points="5,12 12,5 19,12" />
        </svg>
      </div>
    );
  };

  return (
    <div style={{ display: "grid", gridTemplateColumns: "48px 48px 48px", gridTemplateRows: "48px 48px 48px", gap: 4 }}>
      <div /><ArrowBtn dir="up" /><div />
      <ArrowBtn dir="left" />
      <div style={{ background: CARD2, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ width: 8, height: 8, borderRadius: "50%", background: MUTED }} />
      </div>
      <ArrowBtn dir="right" />
      <div /><ArrowBtn dir="down" /><div />
    </div>
  );
}
