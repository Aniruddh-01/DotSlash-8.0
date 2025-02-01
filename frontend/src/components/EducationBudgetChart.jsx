import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import Chart from "chart.js/auto";
import ChartDataLabels from "chartjs-plugin-datalabels";
Chart.register(ChartDataLabels);

const EducationBudgetChart = () => {
  const [chartData, setChartData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('/budget_expenditure.csv')
      .then(response => response.text())
      .then(data => {
        const rows = data.split('\n').slice(1); // Skip header
        const parsedData = rows.map(row => {
          const [category, budget, actuals] = row.split(',');
          return {
            category,
            budget: parseFloat(budget.replace(/,/g, '')),
            actuals: parseFloat(actuals.replace(/,/g, ''))
          };
        });

        setChartData({
          labels: parsedData.slice(0, 5).map(item => item.category),
          datasets: [
            {
              label: 'Budget Estimate',
              data: parsedData.slice(0, 5).map(item => item.budget),
              backgroundColor: [
                '#FF6384',
                '#36A2EB',
                '#FFCE56',
                '#4BC0C0',
                '#9966FF'
              ]
            }
          ]
        });
        setIsLoading(false);
      });
  }, []);

  const options = {
    plugins: {
      datalabels: {
        color: '#fff',
        formatter: (value) => {
          return `₹${(value/1000).toFixed(1)}K Cr`;
        }
      },
      legend: {
        position: 'right',
        labels: {
          boxWidth: 20
        }
      },
      title: {
        display: true,
        text: 'Budget Allocation 2024',
        font: { size: 16 }
      }
    },
    responsive: true,
    maintainAspectRatio: false
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="chart-container" style={{ height: '600px', padding: '20px' }}>
      <h2 className="text-center mb-4">Budget Distribution</h2>
      {chartData && (
        <Pie 
          data={chartData} 
          options={options}
        />
      )}
    </div>
  );
};

export default EducationBudgetChart;
