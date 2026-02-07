import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

export default function Charts({ data }) {
  if (!data || !data.type_distribution) return null;

  const chartData = {
    labels: Object.keys(data.type_distribution),
    datasets: [
      {
        label: "Equipment Count",
        data: Object.values(data.type_distribution),
      },
    ],
  };

  return (
    <div className="card">
      <h3>Equipment Type Distribution</h3>
      <Bar data={chartData} />
    </div>
  );
}
