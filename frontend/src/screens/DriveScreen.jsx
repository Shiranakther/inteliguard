import { useState } from "react";
import { DARK, RED, WHITE, GREEN, BLUE, CARD, CARD2, MUTED } from "../constants/colors";
import { VideoIcon, CameraIcon, PowerIcon, NavIcon, SpeedoIcon, HornIcon, LightIcon } from "../components/common/Icons";
import StatCard from "../components/drive/StatCard";
import CircleBtn from "../components/drive/CircleBtn";
import Dpad from "../components/drive/Dpad";
import { useAuth } from "../context/AuthContext";
import { carAPI } from "../api";

export default function DriveScreen() {
  const [speed, setSpeed] = useState(45);
  const [isHornActive, setIsHornActive] = useState(false);
  const [isLightActive, setIsLightActive] = useState(false);
  const [status, setStatus] = useState("IDLE");
  const { user } = useAuth();

  const handleMove = (direction) => {
    setStatus(direction.toUpperCase());
    carAPI.move(direction, user?.token);
  };

  const handleAction = (type) => {
    if (type === 'horn') {
      const newState = !isHornActive;
      setIsHornActive(newState);
      carAPI.toggleHorn(newState, user?.token);
    } else if (type === 'lights') {
      const newState = !isLightActive;
      setIsLightActive(newState);
      carAPI.toggleLights(newState, user?.token);
    } else if (type === 'start') {
      setStatus("READY");
      carAPI.move('start', user?.token);
    } else if (type === 'stop') {
      setStatus("IDLE");
      carAPI.move('stop', user?.token);
    }
  };

  const handleSpeedChange = (newSpeed) => {
    setSpeed(newSpeed);
    carAPI.setSpeed(newSpeed, user?.token);
  };


  return (
    <div style={{ flex: 1, overflowY: "auto", background: DARK }}>
      {/* Live camera */}
      <div style={{ margin: "12px 16px", borderRadius: 14, overflow: "hidden", position: "relative", background: "#1a2a1a" }}>
        <div style={{
          width: "100%", height: 200, background: "linear-gradient(160deg,#2a3a2a 0%,#3a4a3a 40%,#4a5a4a 100%)",
          display: "flex", alignItems: "center", justifyContent: "center", position: "relative"
        }}>
          {/* Simulated parking lot scene */}
          <svg width="100%" height="200" viewBox="0 0 400 200" style={{ position: "absolute", top: 0, left: 0 }}>
            <rect width="400" height="200" fill="#4a5040" />
            <rect x="0" y="120" width="400" height="80" fill="#5a5a50" />
            <rect x="150" y="80" width="100" height="8" fill="#888" opacity="0.5" />
            <rect x="60" y="60" width="80" height="60" fill="#2a2a2a" rx="4" />
            <rect x="280" y="50" width="90" height="70" fill="#2a2a2a" rx="4" />
            <rect x="160" y="30" width="80" height="50" rx="8" fill="#1a1a2a" />
            <ellipse cx="200" cy="78" rx="28" ry="8" fill="#111" opacity="0.6" />
          </svg>
          {/* Live badge */}
          <div style={{
            position: "absolute", top: 10, left: 10,
            display: "flex", alignItems: "center", gap: 5,
            background: "rgba(0,0,0,0.55)", borderRadius: 20, padding: "4px 10px"
          }}>
            <span style={{ width: 8, height: 8, background: RED, borderRadius: "50%", display: "inline-block" }} />
            <span style={{ color: WHITE, fontSize: 12, fontWeight: 700 }}>Live</span>
          </div>
          {/* Top-right icons */}
          <div style={{ position: "absolute", top: 10, right: 10, display: "flex", gap: 6 }}>
            {[<VideoIcon key="v" />, <CameraIcon key="c" />, <PowerIcon key="p" />].map((ico, i) => (
              <div key={i} style={{
                width: 28, height: 28, borderRadius: "50%", background: "#1a6eff",
                display: "flex", alignItems: "center", justifyContent: "center"
              }}>{ico}</div>
            ))}
          </div>
        </div>
      </div>

      {/* START / STOP */}
      <div style={{ display: "flex", gap: 12, padding: "4px 16px 12px" }}>
        <button 
          onClick={() => handleAction('start')}
          className="btn-start" style={{
          flex: 1, height: 52, background: GREEN, border: "none", borderRadius: 12,
          color: WHITE, fontWeight: 700, fontSize: 16, cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "center", gap: 8
        }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
            <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          START
        </button>
        <button 
          onClick={() => handleAction('stop')}
          className="btn-stop" style={{
          flex: 1, height: 52, background: RED, border: "none", borderRadius: 12,
          color: WHITE, fontWeight: 700, fontSize: 16, cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "center", gap: 8
        }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><rect x="3" y="3" width="18" height="18" rx="2" /></svg>
          STOP
        </button>
      </div>


      {/* Stats row */}
      <div style={{ display: "flex", gap: 10, padding: "0 16px 14px" }}>
        <StatCard icon={<NavIcon />} value="1.2 km" label="DISTANCE" />
        <StatCard icon={<SpeedoIcon />} value={`${speed} cm/s`} label="SPEED" />
        <div style={{
          flex: 2, background: CARD, borderRadius: 12, padding: "12px 14px",
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
            <span style={{ color: WHITE, fontSize: 13, fontWeight: 600 }}>SPEED</span>
            <span style={{ color: BLUE, fontSize: 13, fontWeight: 600 }}>{speed} cm/s</span>
          </div>
          <input type="range" min={5} max={100} value={speed}
            onChange={e => handleSpeedChange(Number(e.target.value))}
            style={{ width: "100%", accentColor: BLUE, cursor: "pointer" }} />
        </div>
      </div>

      {/* Light / Horn controls */}
      <div style={{ display: "flex", justifyContent: "center", gap: 14, padding: "4px 16px 16px" }}>
        <CircleBtn 
          active={isHornActive} 
          onClick={() => handleAction('horn')}
        >
          <HornIcon />
        </CircleBtn>
        <CircleBtn 
          active={isLightActive} 
          label={isLightActive ? "ON" : "OFF"} 
          onClick={() => handleAction('lights')}
        >
          <LightIcon />
        </CircleBtn>
      </div>

      {/* D-pad + joystick */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 24px 20px" }}>
        <Dpad onMove={handleMove} />
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
          <div style={{
            width: 64, height: 64, borderRadius: "50%",
            background: CARD2, border: `3px solid ${CARD}`,
            display: "flex", alignItems: "center", justifyContent: "center"
          }}>
            <div style={{ 
              width: 26, height: 26, borderRadius: "50%", 
              background: status === "IDLE" ? MUTED : BLUE,
              transition: 'all 0.2s'
            }} />
          </div>
          <div style={{
            border: `1.5px solid ${status === "IDLE" ? MUTED : BLUE}`, 
            borderRadius: 20,
            padding: "4px 14px", 
            color: status === "IDLE" ? MUTED : BLUE, 
            fontSize: 12, fontWeight: 600,
            transition: 'all 0.2s'
          }}>{status}</div>
        </div>
      </div>
    </div>
  );
}

