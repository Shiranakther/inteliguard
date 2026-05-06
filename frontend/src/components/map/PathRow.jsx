import { CARD, CARD2, WHITE, MUTED, BLUE } from "../../constants/colors";
import { MapIcon } from "../common/Icons";

export default function PathRow({ label, time, dist, dur }) {
  return (
    <div style={{
      background: CARD, borderRadius: 12, padding: "12px 14px",
      display: "flex", alignItems: "center", gap: 12, marginBottom: 10
    }}>
      <div style={{ width: 40, height: 40, background: CARD2, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <MapIcon />
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ color: WHITE, fontWeight: 600, fontSize: 14 }}>{label}</div>
        <div style={{ display: "flex", gap: 8, marginTop: 3 }}>
          <span style={{ color: MUTED, fontSize: 11 }}>{time}</span>
          <span style={{ color: MUTED, fontSize: 11 }}>{dist}</span>
          <span style={{ color: BLUE, fontSize: 11 }}>{dur}</span>
        </div>
      </div>
      <div style={{ width: 28, height: 28, borderRadius: "50%", background: CARD2, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={WHITE} strokeWidth="2.5"><polygon points="5,3 19,12 5,21" /></svg>
      </div>
    </div>
  );
}
