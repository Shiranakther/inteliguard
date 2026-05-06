import { CARD, BLUE, WHITE, MUTED } from "../../constants/colors";

export default function StatCard({ icon, value, label }) {
  return (
    <div style={{ flex: 1, background: CARD, borderRadius: 12, padding: "12px 10px", textAlign: "center" }}>
      <div style={{ color: BLUE, marginBottom: 4 }}>{icon}</div>
      <div style={{ color: WHITE, fontWeight: 700, fontSize: 15 }}>{value}</div>
      <div style={{ color: MUTED, fontSize: 10, fontWeight: 600, marginTop: 2 }}>{label}</div>
    </div>
  );
}
