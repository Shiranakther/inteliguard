import { useState } from "react";
import { DARK } from "./constants/colors";
import TopBar from "./components/common/TopBar";
import BottomNav from "./components/common/BottomNav";
import DriveScreen from "./screens/DriveScreen";
import MapScreen from "./screens/MapScreen";
import CloudScreen from "./screens/CloudScreen";
import SettingsScreen from "./screens/SettingsScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import { AuthProvider, useAuth } from "./context/AuthContext";
import "./styles/AppStyles.css";

function MainApp() {
  const [active, setActive] = useState("drive");
  const [authMode, setAuthMode] = useState("login"); // login or register
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div style={{ background: DARK, minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
        LOADING...
      </div>
    );
  }

  if (!user) {
    return authMode === "login" ? (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', background: '#0a0f1a' }}>
        <div style={{ width: 390, minHeight: 844, background: DARK, borderRadius: 36, overflow: "hidden", display: 'flex', border: "2px solid #1e3050" }}>
          <LoginScreen onToggleMode={() => setAuthMode("register")} />
        </div>
      </div>
    ) : (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', background: '#0a0f1a' }}>
        <div style={{ width: 390, minHeight: 844, background: DARK, borderRadius: 36, overflow: "hidden", display: 'flex', border: "2px solid #1e3050" }}>
          <RegisterScreen onToggleMode={() => setAuthMode("login")} />
        </div>
      </div>
    );
  }

  const screens = {
    drive: <DriveScreen />,
    map: <MapScreen />,
    cloud: <CloudScreen />,
    settings: <SettingsScreen />,
  };

  return (
    <div style={{
      display: "flex", justifyContent: "center", alignItems: "center",
      minHeight: "100vh", background: "#0a0f1a",
      fontFamily: "'Inter', 'Segoe UI', sans-serif",
    }}>
      <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@700&family=Inter:wght@400;600;700&display=swap" rel="stylesheet" />
      <div style={{
        width: 390, minHeight: 844, background: DARK,
        borderRadius: 36, overflow: "hidden", boxShadow: "0 0 60px rgba(26,110,255,0.25)",
        display: "flex", flexDirection: "column", border: "2px solid #1e3050"
      }}>
        <TopBar />
        <div style={{ flex: 1, display: "flex", flexDirection: "column", overflowY: "hidden" }}>
          {screens[active]}
        </div>
        <BottomNav active={active} setActive={setActive} />
      </div>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <MainApp />
    </AuthProvider>
  );
}

