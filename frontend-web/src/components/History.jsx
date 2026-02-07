import { useEffect, useState } from "react";
import { getHistory } from "../api/api.js";

export default function History({ auth }) {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    try {
      setLoading(true);
      const res = await getHistory(auth);
      setHistory(res.data || []);
    } catch (err) {
      console.error("Failed to load history", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p style={styles.loading}>Loading history...</p>;

  if (history.length === 0) {
    return <p style={styles.empty}>No upload history yet</p>;
  }

  return (
    <div style={styles.container}>
      <h3 style={styles.title}>Upload History (Last 5)</h3>
      <ul style={styles.list}>
        {history.map((item, idx) => (
          <li key={idx} style={styles.item}>
            <div style={styles.itemHeader}>
              <span style={styles.itemNumber}>#{history.length - idx}</span>
              <span style={styles.itemDate}>
                {new Date(item.uploaded_at).toLocaleDateString()} {new Date(item.uploaded_at).toLocaleTimeString()}
              </span>
            </div>
            <div style={styles.itemStats}>
              <span>Equipment: {item.total_count}</span>
              <span>Avg Flowrate: {item.avg_flowrate}</span>
              <span>Avg Pressure: {item.avg_pressure}</span>
              <span>Avg Temp: {item.avg_temperature}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

const styles = {
  container: {
    background: "#ffffff",
    padding: 20,
    borderRadius: 14,
    boxShadow: "0 12px 32px rgba(0,0,0,0.1), 0 2px 8px rgba(102,126,234,0.1)",
    border: "1px solid #f0f2f5",
    background: "linear-gradient(135deg,#ffffff 0%,#f8f9ff 100%)",
  },
  title: {
    margin: "0 0 16px 0",
    fontSize: 18,
    fontWeight: 700,
    color: "#2d3748",
    letterSpacing: "-0.3px",
  },
  list: {
    listStyle: "none",
    padding: 0,
    margin: 0,
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },
  item: {
    padding: 12,
    borderRadius: 10,
    background: "linear-gradient(90deg,#f7f8ff 0%,#ffffff 100%)",
    border: "1px solid #e2e8f0",
    boxShadow: "0 4px 12px rgba(102,126,234,0.08)",
  },
  itemHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  itemNumber: {
    fontSize: 13,
    fontWeight: 700,
    color: "#667eea",
    background: "rgba(102,126,234,0.1)",
    padding: "4px 8px",
    borderRadius: 4,
  },
  itemDate: {
    fontSize: 12,
    color: "#718096",
  },
  itemStats: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(120px,1fr))",
    gap: 8,
    fontSize: 12,
    color: "#2d3748",
  },
  loading: {
    fontSize: 14,
    color: "#667eea",
    textAlign: "center",
    padding: 20,
  },
  empty: {
    fontSize: 14,
    color: "#718096",
    textAlign: "center",
    padding: 20,
  },
};
