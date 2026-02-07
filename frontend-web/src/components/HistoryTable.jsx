export default function HistoryTable({ data }) {
  if (!data || data.length === 0) {
    return <p>No upload history</p>;
  }

  return (
    <div className="card">
      <h3>Upload History</h3>

      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>Uploaded At</th>
            <th>Total Equipment</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.id}>
              <td>{new Date(row.uploaded_at).toLocaleString()}</td>
              <td>{row.total_count}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
