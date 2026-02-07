import { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { getLatestSummary } from "../api/api.js";
import UploadForm from "../components/UploadForm";
import History from "../components/History";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Dashboard({ auth }) {
  const [summary, setSummary] = useState(null);

  const loadData = async () => {
    try {
      const res = await getLatestSummary(auth);
      setSummary(res.data);
    } catch (err) {
      console.error("Failed to load summary", err);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div style={styles.page}>
      <header style={styles.header}>
        <div style={styles.headerContent}>
          <h1 style={styles.title}>Chemical Equipment Dashboard</h1>
          <p style={styles.subtitle}>Real-time equipment monitoring and analytics</p>
        </div>
      </header>

      <main style={styles.container}>
        <section style={styles.uploadSection}>
          <div style={styles.uploadCard}>
            <h2 style={styles.uploadTitle}>Upload Equipment Data</h2>
            <UploadForm onUpload={loadData} />
          </div>
        </section>

        {summary ? (
          <>
            <section style={styles.statsSection}>
              <div style={styles.statCard}>
                <div style={styles.statCardLabel}>Total Equipment</div>
                <div style={styles.statCardValue}>{summary.total_count}</div>
              </div>

              <div style={styles.statCard}>
                <div style={styles.statCardLabel}>Avg Flowrate</div>
                <div style={styles.statCardValue}>{summary.avg_flowrate}</div>
              </div>

              <div style={styles.statCard}>
                <div style={styles.statCardLabel}>Avg Pressure</div>
                <div style={styles.statCardValue}>{summary.avg_pressure}</div>
              </div>

              <div style={styles.statCard}>
                <div style={styles.statCardLabel}>Avg Temperature</div>
                <div style={styles.statCardValue}>{summary.avg_temperature}</div>
              </div>
            </section>

            <section style={styles.distributionCard}>
              <h2 style={styles.cardTitle}>Equipment Type Distribution</h2>
              {summary.type_distribution && (
                <div style={styles.chartContainer}>
                  <Pie
                    data={{
                      labels: Object.keys(summary.type_distribution),
                      datasets: [
                        {
                          data: Object.values(summary.type_distribution),
                          backgroundColor: [
                            "#667eea",
                            "#764ba2",
                            "#f093fb",
                            "#4facfe",
                            "#00f2fe",
                            "#43e97b",
                            "#fa709a",
                            "#fee140",
                          ],
                          borderColor: "#ffffff",
                          borderWidth: 3,
                        },
                      ],
                    }}
                    options={{
                      responsive: true,
                      maintainAspectRatio: true,
                      plugins: {
                        legend: {
                          position: "bottom",
                          labels: {
                            font: { size: 13, weight: 600 },
                            color: "#2d3748",
                            padding: 15,
                          },
                        },
                        tooltip: {
                          callbacks: {
                            label: function (context) {
                              return context.label + ": " + context.parsed;
                            },
                          },
                        },
                      },
                    }}
                  />
                </div>
              )}
            </section>

            <History auth={auth} />
          </>
        ) : (
          <p style={styles.loading}>Loading...</p>
        )}
      </main>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(135deg,#f5f7fa 0%,#e9ecef 100%)",
    fontFamily: "'Segoe UI', 'Trebuchet MS', sans-serif",
    padding: 0,
  },
  header: {
    background: "linear-gradient(90deg,#667eea 0%,#764ba2 100%)",
    boxShadow: "0 8px 24px rgba(102,126,234,0.25)",
    padding: "28px 32px",
  },
  headerContent: { maxWidth: 1200, margin: "0 auto" },
  title: { margin: 0, fontSize: 26, fontWeight: 800, color: "#ffffff", letterSpacing: "-0.5px" },
  subtitle: { margin: "6px 0 0 0", fontSize: 14, color: "rgba(255,255,255,0.85)" },
  container: {
    maxWidth: 1200,
    margin: "0 auto",
    padding: "32px 32px",
    display: "flex",
    flexDirection: "column",
    gap: 24,
  },
  uploadSection: { display: "flex", justifyContent: "center", marginBottom: 16 },
  uploadCard: {
    background: "#ffffff",
    padding: 20,
    borderRadius: 14,
    boxShadow: "0 12px 32px rgba(0,0,0,0.1), 0 2px 8px rgba(102,126,234,0.1)",
    border: "1px solid #f0f2f5",
    background: "linear-gradient(135deg,#ffffff 0%,#f8f9ff 100%)",
    maxWidth: 400,
  },
  uploadTitle: { margin: "0 0 12px 0", fontSize: 14, fontWeight: 700, color: "#2d3748" },
  statsSection: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
    gap: 18,
  },
  statCard: {
    background: "#ffffff",
    padding: 20,
    borderRadius: 14,
    boxShadow: "0 12px 32px rgba(0,0,0,0.1), 0 2px 8px rgba(102,126,234,0.1)",
    border: "1px solid #f0f2f5",
    background: "linear-gradient(135deg,#ffffff 0%,#f8f9ff 100%)",
  },
  statCardLabel: { fontSize: 13, color: "#667eea", fontWeight: 600, marginBottom: 10, textTransform: "uppercase", letterSpacing: "0.3px" },
  statCardValue: { fontSize: 28, fontWeight: 800, background: "linear-gradient(135deg,#667eea 0%,#764ba2 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" },
  distributionCard: {
    background: "#ffffff",
    padding: 24,
    borderRadius: 14,
    boxShadow: "0 12px 32px rgba(0,0,0,0.1), 0 2px 8px rgba(102,126,234,0.1)",
    border: "1px solid #f0f2f5",
    background: "linear-gradient(135deg,#ffffff 0%,#f8f9ff 100%)",
  },
  cardTitle: { margin: "0 0 16px 0", fontSize: 18, fontWeight: 700, color: "#2d3748", letterSpacing: "-0.3px" },
  chartContainer: { width: "100%", maxWidth: 400, margin: "0 auto", height: 300 },
  distList: {
    listStyle: "none",
    padding: 0,
    margin: 0,
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },
  distItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "12px 14px",
    borderRadius: 10,
    background: "linear-gradient(90deg,#f7f8ff 0%,#ffffff 100%)",
    border: "1px solid #e2e8f0",
    boxShadow: "0 4px 12px rgba(102,126,234,0.08)",
  },
  typeName: { fontWeight: 700, color: "#2d3748" },
  typeCount: { fontSize: 14, color: "#667eea", fontWeight: 700, background: "rgba(102,126,234,0.1)", padding: "4px 10px", borderRadius: 6 },
  loading: { fontSize: 15, color: "#667eea", textAlign: "center", padding: "48px 0" },
};
