import { useState, useEffect } from "react";
import { DARK, WHITE, BLUE, GREEN, RED, MUTED, CARD, CARD2 } from "../constants/colors";
import { UserIcon, EditIcon, LogoutIcon, LightIcon } from "../components/common/Icons";
import SettingsSection from "../components/settings/SettingsSection";
import ToggleRow from "../components/settings/ToggleRow";
import { useAuth } from "../context/AuthContext";
import { settingsAPI } from "../api";

export default function SettingsScreen() {
  const [bluetooth, setBluetooth] = useState(true);
  const [wifi, setWifi] = useState(false);
  const [camera, setCamera] = useState(true);
  const [light, setLight] = useState(false);
  const [defSpeed, setDefSpeed] = useState(20);
  const [syncStatus, setSyncStatus] = useState('Synchronized');
  const { user, logout } = useAuth();

  // Fetch settings from backend
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const data = await settingsAPI.get(user.token);
        setBluetooth(data.bluetooth);
        setWifi(data.wifi);
        setCamera(data.camera);
        setLight(data.light);
        setDefSpeed(data.defaultSpeed);
      } catch (err) {
        console.error('Failed to fetch settings:', err);
        setSyncStatus('Sync Failed');
      }
    };

    if (user) fetchSettings();
  }, [user]);

  // Sync settings to backend
  const syncSettings = async (updates) => {
    setSyncStatus('Syncing...');
    try {
      await settingsAPI.update(updates, user.token);
      setSyncStatus('Synchronized');
    } catch (err) {
      setSyncStatus('Offline');
    }
  };


  const handleToggle = (key, value, setter) => {
    const newValue = !value;
    setter(newValue);
    syncSettings({ [key]: newValue });
  };

  const handleSpeedChange = (value) => {
    setDefSpeed(value);
    // Debounce speed sync or just sync on change
    syncSettings({ defaultSpeed: value });
  };

  return (
    <div style={{ flex: 1, overflowY: "auto", background: DARK, padding: "0 16px" }}>
      <h2 style={{ color: WHITE, fontSize: 22, fontWeight: 700, margin: "14px 0 14px", fontFamily: "'Orbitron', sans-serif" }}>Settings</h2>

      <SettingsSection title="USER">
        <div style={{ padding: "16px" }}>
          <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 10 }}>
            <span style={{ 
              background: user?.role === 'admin' ? "#1a3a6a" : "#1a3a3a", 
              color: user?.role === 'admin' ? BLUE : GREEN, 
              borderRadius: 8, padding: "3px 12px", fontSize: 12, fontWeight: 700,
              textTransform: 'uppercase'
            }}>
              {user?.role || 'Guest'}
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 14 }}>
            <div style={{
              width: 56, height: 56, borderRadius: "50%", background: CARD2,
              display: "flex", alignItems: "center", justifyContent: "center", border: `2px solid ${MUTED}`
            }}>
              <UserIcon />
            </div>
            <div>
              <div style={{ color: WHITE, fontSize: 17, fontWeight: 700 }}>Hi {user?.name.split(' ')[0] || 'User'} !</div>
            </div>
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <button style={{
              flex: 1, height: 40, background: GREEN, border: "none", borderRadius: 8,
              color: WHITE, fontWeight: 700, fontSize: 14, cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center", gap: 6
            }}>
              <EditIcon />
              Edit
            </button>
            <button 
              onClick={logout}
              style={{
                flex: 1, height: 40, background: RED, border: "none", borderRadius: 8,
                color: WHITE, fontWeight: 700, fontSize: 14, cursor: "pointer",
                display: "flex", alignItems: "center", justifyContent: "center", gap: 6
              }}>
              <LogoutIcon />
              Logout
            </button>
          </div>
        </div>
      </SettingsSection>

      <SettingsSection title="CLOUD SYNC">
        <div style={{ 
          display: 'flex', justifyContent: 'space-between', alignItems: 'center', 
          padding: '12px 16px', background: CARD, borderRadius: 10, marginBottom: 10 
        }}>
          <span style={{ color: MUTED, fontSize: 14, fontWeight: 600 }}>Sync Status</span>
          <span style={{ 
            color: syncStatus === 'Synchronized' ? GREEN : syncStatus === 'Syncing...' ? BLUE : RED, 
            fontSize: 13, fontWeight: 700 
          }}>
            {syncStatus.toUpperCase()}
          </span>
        </div>
      </SettingsSection>

      <SettingsSection title="CONNECTION">
        <ToggleRow label="Bluetooth" value={bluetooth} onToggle={() => handleToggle('bluetooth', bluetooth, setBluetooth)} />
        <ToggleRow label="WiFi" value={wifi} onToggle={() => handleToggle('wifi', wifi, setWifi)} />
      </SettingsSection>

      <SettingsSection title="SYSTEM">
        <ToggleRow label="Camera" value={camera} onToggle={() => handleToggle('camera', camera, setCamera)} />
        <ToggleRow label="Always On Light" value={light} onToggle={() => handleToggle('light', light, setLight)}
          icon={<LightIcon />}
        />
      </SettingsSection>

      <div style={{ background: CARD, borderRadius: 14, padding: "14px 16px", marginBottom: 24 }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
          <span style={{ color: WHITE, fontWeight: 600, fontSize: 15 }}>Default Speed</span>
          <span style={{ color: BLUE, fontWeight: 700, fontSize: 15 }}>{defSpeed} cm/s</span>
        </div>
        <input type="range" min={5} max={100} value={defSpeed}
          onChange={e => handleSpeedChange(Number(e.target.value))}
          style={{ width: "100%", accentColor: BLUE, cursor: "pointer" }} />
      </div>
    </div>
  );
}

