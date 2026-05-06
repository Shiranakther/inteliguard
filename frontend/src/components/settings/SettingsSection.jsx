import { MUTED, CARD } from "../../constants/colors";

export default function SettingsSection({ title, children }) {
  return (
    <div style={{ marginBottom: 20 }}>
      <div style={{ color: MUTED, fontSize: 12, fontWeight: 700, letterSpacing: 1.5, marginBottom: 8 }}>{title}</div>
      <div style={{ background: CARD, borderRadius: 14, overflow: "hidden" }}>
        {children}
      </div>
    </div>
  );
}
