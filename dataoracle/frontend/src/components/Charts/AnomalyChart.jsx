// src/components/Charts/AnomalyChart.jsx
import { Scatter } from 'react-chartjs-2';
import { Chart as ChartJS, PointElement, LinearScale, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(PointElement, LinearScale, Title, Tooltip, Legend);

export default function AnomalyChart({ data, anomalies }) {
  const normal = data.filter((_, i) => !anomalies.some(a => JSON.stringify(a) === JSON.stringify(data[i])));
  const anomalyPoints = anomalies.map(a => ({
    x: data.indexOf(a),
    y: a[Object.keys(a)[1]]
  }));
  const normalPoints = normal.map((row, i) => ({
    x: data.indexOf(row),
    y: row[Object.keys(row)[1]]
  }));

  const chartData = {
    datasets: [
      {
        label: 'Normal',
        data: normalPoints,
        backgroundColor: 'rgba(34, 197, 94, 0.6)',
      },
      {
        label: 'Anomaly',
        data: anomalyPoints,
        backgroundColor: 'rgba(239, 68, 68, 0.8)',
      },
    ],
  };

  return <Scatter data={chartData} options={{ responsive: true, maintainAspectRatio: false }} height={200} />;
}