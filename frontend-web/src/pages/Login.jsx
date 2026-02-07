import React, { useState } from "react";

export default function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username && password) {
      onLogin(username, password); // Pass credentials to App.js
    } else {
      alert("Please enter username and password");
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <div style={styles.headerRow}>
          <div style={styles.brandText}>ChemEquip</div>
          <div style={styles.brandSub}>Equipment monitoring portal</div>
        </div>

        <form onSubmit={handleSubmit} style={styles.form}>
          <label style={styles.label} htmlFor="username">
            Username
          </label>
          <input
            id="username"
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={styles.input}
            aria-label="username"
          />

          <label style={styles.label} htmlFor="password">
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
            aria-label="password"
          />

          <button type="submit" style={styles.button}>
            Sign In
          </button>
        </form>

        <div style={styles.footerNote}>Use any sample credentials to continue.</div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "linear-gradient(135deg,#667eea 0%,#764ba2 100%)",
    fontFamily: "'Segoe UI', 'Trebuchet MS', sans-serif",
    padding: 24,
  },
  card: {
    width: "100%",
    maxWidth: 360,
    background: "#ffffff",
    borderRadius: 16,
    boxShadow: "0 20px 60px rgba(0,0,0,0.3), 0 0 40px rgba(102,126,234,0.2)",
    padding: 28,
    display: "flex",
    flexDirection: "column",
    gap: 14,
  },
  headerRow: { display: "flex", flexDirection: "column", gap: 4 },
  brandText: { fontSize: 22, fontWeight: 800, color: "#2d3748", letterSpacing: "-0.5px" },
  brandSub: { fontSize: 13, color: "#718096" },
  form: { display: "flex", flexDirection: "column", gap: 12, marginTop: 8 },
  label: { fontSize: 13, color: "#2d3748", fontWeight: 600, marginBottom: 6 },
  input: {
    padding: "14px 16px",
    fontSize: 14,
    borderRadius: 10,
    border: "2px solid #e2e8f0",
    outline: "none",
    boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
    transition: "all 0.2s ease",
    width: "100%",
    boxSizing: "border-box",
  },
  button: {
    marginTop: 12,
    padding: "14px 16px",
    fontSize: 15,
    borderRadius: 10,
    border: "none",
    background: "linear-gradient(135deg,#667eea 0%,#764ba2 100%)",
    color: "white",
    cursor: "pointer",
    fontWeight: 700,
    boxShadow: "0 8px 20px rgba(102,126,234,0.4)",
    transition: "all 0.2s ease",
  },
  footerNote: { fontSize: 12, color: "#a0aec0", marginTop: 8, textAlign: "center" },
};
