import { useState, useEffect } from "react";
import { DARK, WHITE, BLUE, GREEN, RED, MUTED, CARD, CARD2 } from "../constants/colors";
import { SyncIcon } from "../components/common/Icons";
import PathRow from "../components/map/PathRow";
import { useAuth } from "../context/AuthContext";
import { pathAPI } from "../api";

export default function CloudScreen() {
  const [paths, setPaths] = useState([]);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);
  const [lastSynced, setLastSynced] = useState("Just now");
  const { user } = useAuth();

  const fetchPaths = async () => {
    setSyncing(true);
    try {
      const data = await pathAPI.getAll(user.token);
      // Convert backend path structure to frontend props if needed
      const formattedPaths = data.map(p => ({
        label: p.name || p.label,
        time: p.date ? new Date(p.date).toLocaleString() : p.time,
        dist: p.distance || p.dist,
        dur: p.duration || p.dur
      }));
      setPaths(formattedPaths);
      setLastSynced("Just now");
    } catch (err) {
      console.error('Failed to sync cloud data:', err);
    } finally {
      setLoading(false);
      setSyncing(false);
    }
  };


  useEffect(() => {
    if (user) fetchPaths();
  }, [user]);

  return (
    <div style={{ flex: 1, overflowY: "auto", background: DARK, padding: "0 16px" }}>
      <h2 style={{ color: WHITE, fontSize: 22, fontWeight: 700, margin: "14px 0 12px", fontFamily: "'Orbitron', sans-serif" }}>Cloud &amp; History</h2>

      {/* Sync card */}
      <div style={{ background: CARD, borderRadius: 14, padding: "14px 16px", marginBottom: 18 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ 
              width: 38, height: 38, background: "#1a3a6a", borderRadius: "50%", 
              display: "flex", alignItems: "center", justifyContent: "center",
              animation: syncing ? "spin 2s linear infinite" : "none"
            }}>
              <SyncIcon />
            </div>
            <div>
              <div style={{ color: WHITE, fontWeight: 700, fontSize: 15 }}>Cloud Sync</div>
              <div style={{ color: MUTED, fontSize: 12 }}>Last synced: {lastSynced}</div>
            </div>
          </div>
          <button 
            onClick={fetchPaths}
            disabled={syncing}
            style={{ 
              background: syncing ? CARD2 : BLUE, 
              border: "none", borderRadius: 8, padding: "6px 14px", 
              color: WHITE, fontWeight: 700, fontSize: 13, cursor: "pointer" 
            }}>
            {syncing ? 'SYNCING...' : 'SYNC'}
          </button>
        </div>
        
        {syncing && (
          <div style={{ marginTop: 4 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
              <span style={{ color: MUTED, fontSize: 12 }}>Downloading from cloud...</span>
              <span style={{ color: MUTED, fontSize: 12 }}>In progress</span>
            </div>
            <div style={{ background: CARD2, borderRadius: 6, height: 8, overflow: 'hidden' }}>
              <div style={{ 
                width: "100%", height: 8, background: BLUE, borderRadius: 6,
                animation: "progressIndeterminate 1.5s infinite linear",
                transformOrigin: "0% 50%"
              }} />
            </div>
          </div>
        )}
      </div>

      <h3 style={{ color: WHITE, fontSize: 17, fontWeight: 700, marginBottom: 12 }}>Recorded Paths</h3>
      {loading ? (
        <div style={{ color: MUTED, textAlign: 'center', padding: 20 }}>Loading history...</div>
      ) : paths.length > 0 ? (
        paths.map((p, i) => <PathRow key={i} {...p} />)
      ) : (
        <div style={{ color: MUTED, textAlign: 'center', padding: 20 }}>No history found</div>
      )}

      <style>{`
        @keyframes spin { 100% { transform: rotate(360deg); } }
        @keyframes progressIndeterminate {
          0% { transform: translateX(-100%) scaleX(0.2); }
          50% { transform: translateX(0%) scaleX(0.5); }
          100% { transform: translateX(100%) scaleX(0.2); }
        }
      `}</style>
    </div>
  );
}

