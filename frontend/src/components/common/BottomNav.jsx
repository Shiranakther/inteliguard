import { DARK, BLUE, MUTED, CARD2 } from "../../constants/colors";
import { DriveIcon, MapIcon, CloudIcon, SettingsIcon } from "./Icons";


export default function BottomNav({ active, setActive }) {
  const tabs = [
    { key: "drive", label: "Drive", icon: <DriveIcon /> },
    { key: "map", label: "Map", icon: <MapIcon /> },
    { key: "cloud", label: "Cloud", icon: <CloudIcon /> },
    { key: "settings", label: "Settings", icon: <SettingsIcon /> },
  ];
  return (
    <div style={{
      display: "flex", borderTop: `1px solid ${CARD2}`,
      background: DARK, padding: "10px 0 14px",
    }}>
      {tabs.map(t => (
        <button key={t.key} className="nav-tab" onClick={() => setActive(t.key)}
          style={{
            flex: 1, background: "none", border: "none", cursor: "pointer",
            display: "flex", flexDirection: "column", alignItems: "center", gap: 4,
            color: active === t.key ? BLUE : MUTED,
          }}>
          <span style={{ fontSize: 22 }}>{t.icon}</span>
          <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: 0.3 }}>{t.label}</span>
        </button>
      ))}
    </div>
  );
}

