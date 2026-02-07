import { useState } from "react";
import { uploadCSV } from "../api/api";

export default function UploadForm({ onUpload }) {
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setError("Please select a CSV file");
      return;
    }

    setLoading(true);
    setError("");
    try {
      const result = await uploadCSV(file);
      setFile(null);
      onUpload();
    } catch (err) {
      setError(err.response?.data?.error || "Upload failed. Ensure CSV has columns: Type, Flowrate, Pressure, Temperature");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <label style={styles.fileLabel}>
        <input
          type="file"
          accept=".csv"
          onChange={(e) => setFile(e.target.files[0])}
          style={styles.fileInput}
        />
        <span style={styles.fileButtonText}>{file ? file.name : "Choose CSV file"}</span>
      </label>
      <button type="submit" disabled={loading} style={styles.button}>
        {loading ? "Uploading..." : "Upload CSV"}
      </button>
      {error && <p style={styles.error}>{error}</p>}
    </form>
  );
}

const styles = {
  form: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
    width: "100%",
  },
  fileLabel: {
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
  },
  fileInput: {
    display: "none",
  },
  fileButtonText: {
    padding: "10px 14px",
    background: "#f0f2f5",
    borderRadius: 8,
    fontSize: 14,
    color: "#667eea",
    fontWeight: 600,
    flex: 1,
    border: "1px solid #e2e8f0",
  },
  button: {
    padding: "10px 14px",
    fontSize: 14,
    borderRadius: 8,
    border: "none",
    background: "linear-gradient(135deg,#667eea 0%,#764ba2 100%)",
    color: "white",
    cursor: "pointer",
    fontWeight: 600,
    boxShadow: "0 4px 12px rgba(102,126,234,0.3)",
  },
  error: {
    fontSize: 12,
    color: "#dc2626",
    margin: 0,
  },
};

