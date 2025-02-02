import React from 'react';
import { Bar } from 'react-chartjs-2';

const BarChart = ({ data, title }) => {
  const chartData = {
    labels: data.map(d => d.Year),
    datasets: [{
      label: title,
      data: data.map(d => d[title]),
      backgroundColor: 'rgba(67, 235, 52, 0.5)',
      borderColor: 'rgba(67, 235, 52, 1)',
      borderWidth: 1
    }]
  };

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: `${title} Trends Over Years`
      }
    },
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };

  return <Bar data={chartData} options={options} />;
};

export default BarChart;