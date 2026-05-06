import { BLUE, CARD2, WHITE } from "../../constants/colors";

export default function Toggle({ on, onToggle }) {
  return (
    <div onClick={onToggle} style={{
      width: 48, height: 26, borderRadius: 13,
      background: on ? BLUE : CARD2,
      position: "relative", cursor: "pointer", transition: "background .2s"
    }}>
      <div style={{
        width: 20, height: 20, borderRadius: "50%", background: WHITE,
        position: "absolute", top: 3, left: on ? 25 : 3, transition: "left .2s"
      }} />
    </div>
  );
}
