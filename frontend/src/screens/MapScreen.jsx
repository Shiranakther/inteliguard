import { DARK, WHITE, BLUE, RED, GREEN, CARD2, MUTED } from "../constants/colors";
import { PlayIcon, StopIcon, TrashIcon, UploadIcon, NavIcon, SpeedoIcon } from "../components/common/Icons";
import PathGrid from "../components/map/PathGrid";
import StatCard from "../components/drive/StatCard";
import PathRow from "../components/map/PathRow";

export default function MapScreen() {
  return (
    <div style={{ flex: 1, overflowY: "auto", background: DARK, padding: "0 16px" }}>
      <h2 style={{ color: WHITE, fontSize: 22, fontWeight: 700, margin: "14px 0 12px", fontFamily: "'Orbitron', sans-serif" }}>Path Navigation</h2>

      {/* Grid map */}
      <div style={{ background: "#162c4a", borderRadius: 14, padding: 12, marginBottom: 14 }}>
        <PathGrid />
      </div>

      {/* Record buttons */}
      <div style={{ display: "flex", gap: 12, marginBottom: 12 }}>
        <button style={{
          flex: 1, height: 48, background: BLUE, border: "none", borderRadius: 12,
          color: WHITE, fontWeight: 700, fontSize: 14, cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "center", gap: 8
        }}>
          <PlayIcon color={BLUE} />
          Start Recording
        </button>
        <button style={{
          flex: 1, height: 48, background: "transparent", border: `1.5px solid ${RED}`, borderRadius: 12,
          color: RED, fontWeight: 700, fontSize: 14, cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "center", gap: 8
        }}>
          <StopIcon color={RED} />
          Stop Recording
        </button>
      </div>

      <div style={{ display: "flex", gap: 12, marginBottom: 18 }}>
        <button style={{
          flex: 1, height: 44, background: "transparent", border: `1px solid ${MUTED}`, borderRadius: 12,
          color: WHITE, fontWeight: 600, fontSize: 13, cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "center", gap: 7
        }}>
          <TrashIcon />
          Clear Path
        </button>
        <button style={{
          flex: 1, height: 44, background: CARD2, border: `1px solid ${CARD2}`, borderRadius: 12,
          color: BLUE, fontWeight: 600, fontSize: 13, cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "center", gap: 7
        }}>
          <UploadIcon />
          Upload To Cloud
        </button>
      </div>

      {/* Recent Path */}
      <h3 style={{ color: WHITE, fontSize: 17, fontWeight: 700, marginBottom: 12 }}>Recent Path</h3>
      <div style={{ display: "flex", gap: 10, marginBottom: 14 }}>
        <div style={{ background: GREEN, borderRadius: 12, padding: "12px 10px", textAlign: "center", width: 80 }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" style={{ marginBottom: 4 }}><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="3" fill="white" /></svg>
          <div style={{ color: WHITE, fontSize: 11, fontWeight: 700 }}>HOME POINT</div>
        </div>
        <StatCard icon={<NavIcon />} value="1.2 km" label="DISTANCE" />
        <StatCard icon={<SpeedoIcon />} value="45 cm/s" label="SPEED" />
      </div>

      <PathRow label="Location A to Location B" time="Today, 14:30" dist="12.05m" dur="1m 35s" />
    </div>
  );
}
