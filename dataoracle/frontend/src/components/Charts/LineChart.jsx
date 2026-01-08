import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, PointElement, LinearScale, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(LineElement, PointElement, LinearScale, Title, Tooltip, Legend);

export default function LineChart({ data, target }) {
  const chartData = {
    labels: data.map((_, i) => `Point ${i + 1}`),
    datasets: [{
      label: target,
      data: data.map(row => row[target]),
      borderColor: 'rgb(99, 102, 241)',
      tension: 0.3
    }]
  };

  return <Line data={chartData} />;
}