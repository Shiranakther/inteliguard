import { CARD2, CARD, MUTED } from "../../constants/colors";

export default function CircleBtn({ active, label, children }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
      <div className="circle-btn" style={{
        width: 52, height: 52, borderRadius: "50%",
        background: active ? "#7a1a1a" : CARD2,
        display: "flex", alignItems: "center", justifyContent: "center",
        cursor: "pointer", border: `2px solid ${active ? "#a03030" : CARD}`
      }}>{children}</div>

      {label && <span style={{ color: MUTED, fontSize: 10, fontWeight: 600 }}>{label}</span>}
    </div>
  );
}
