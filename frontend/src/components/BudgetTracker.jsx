import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import Chart from "chart.js/auto";
import Papa from "papaparse"; // CSV Parsing Library
import "../App.css";

const BudgetTracker = () => {
  const [budgetData, setBudgetData] = useState([]);

  // Function to Fetch & Parse CSV
  useEffect(() => {
    const fetchCSV = async () => {
      const response = await fetch("/budget_expenditure.csv"); // Fetch from public folder
      const csvText = await response.text();

      Papa.parse(csvText, {
        header: true, // Treat first row as column names
        skipEmptyLines: true,
        complete: (result) => {
          setBudgetData(result.data); // Save parsed CSV data
        },
      });
    };

    fetchCSV();
  }, []);

  return (
    <div className="budget-container">
      <h1 className="text-center font-semibold text-3xl py-5">Government Budget Tracker</h1>
      <div className="card-container">
        {budgetData.map((data, index) => {
          // Convert text values to numbers for chart
          const budgetEstimate = Number(data["Budget Estimate"]);
          const actuals = Number(data["Actuals (upto December)"]);

          // Pie chart data
          const pieChartData = {
            labels: ["Budget Estimate", "Actuals"],
            datasets: [
              {
                data: [budgetEstimate, actuals],
                backgroundColor: ["rgba(249, 127, 81,0.8)", "rgba(19, 136, 8, 0.6)"], // Saffron & Green (lighter)
                borderColor: ["rgba(255, 102, 0, 1)", "rgba(0, 102, 0, 1)"], // Darker Saffron & Green
                borderWidth: 1,

              },
            ],
          };

          return (
            <div key={index} className="card">
              <div className="card-header">
                <h3>{data.Category}</h3>
              </div>
              <div className="card-body">
                <div className="pie-chart-container">
                  <Pie data={pieChartData} options={{ responsive: true }} />
                </div>
                <div className="card-details">
                  <p><strong>Budget Estimate:</strong> Rs. {budgetEstimate.toLocaleString()}</p>
                  <p><strong>Actual Expenditure:</strong> Rs. {actuals.toLocaleString()}</p>
                  <p><strong>Actual % of Budget:</strong> {data["Actuals Percentage"]}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BudgetTracker;
