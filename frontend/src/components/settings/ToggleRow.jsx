import { MUTED, WHITE, DARK } from "../../constants/colors";
import Toggle from "./Toggle";

export default function ToggleRow({ label, value, onToggle, icon }) {
  return (
    <div style={{
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "14px 16px", borderBottom: `1px solid ${DARK}`
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        {icon && <span style={{ color: MUTED }}>{icon}</span>}
        <span style={{ color: WHITE, fontSize: 15 }}>{label}</span>
      </div>
      <Toggle on={value} onToggle={onToggle} />
    </div>
  );
}
