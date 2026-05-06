import { DARK, WHITE } from "../../constants/colors";

export default function TopBar() {
  return (
    <div style={{
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "14px 20px 10px", background: DARK,
    }}>
      <span style={{ fontSize: 22, fontWeight: 700, color: WHITE, fontFamily: "'Orbitron', sans-serif", letterSpacing: 1 }}>IntelliGuard</span>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <span style={{ display: "flex", alignItems: "center", gap: 5, color: "#22c55e", fontSize: 13, fontWeight: 600 }}>
          <span style={{ width: 9, height: 9, borderRadius: "50%", background: "#22c55e", display: "inline-block" }} />
          Connected
        </span>
      </div>
    </div>
  );
}

