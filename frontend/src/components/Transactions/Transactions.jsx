import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";
import { iconsImgs } from "../../utils/images";
import "./Transactions.css";

const Transactions = () => {
  const series = [30, 10, 5, 65]; // Absolute values
  const colors = ["#e74c3c", "#1abc9c", "#9b59b6", "#fe6c00a3"]; // New vibrant colors

  const [chartData, setChartData] = useState({
    series: series,
    options: {
      chart: {
        type: "pie",
      },
      labels: ["Opened", "Bounced", "Unopened", "Unmailed Data"],
      colors: colors, // Apply the vibrant color combination
      dataLabels: {
        enabled: true,
        style: {
          colors: ["#ffffff"], // White text for data labels
          fontSize: "14px",
          fontWeight: "bold",
        },
        formatter: (value, { seriesIndex, w }) => {
          return `${w.config.series[seriesIndex]} %`; // Show value with % sign
        },
      },
      legend: {
        labels: {
          colors: ["#fff", "#fff", "#fff", "#fff"], // White text for legend
          useSeriesColors: false, // Prevents using default colors
        },
        position: "right",
      },
      tooltip: {
        y: {
          formatter: (value, { seriesIndex, w }) => {
            return `${w.config.series[seriesIndex]} %`; // Show value with % in tooltip
          },
        },
      },
      plotOptions: {
        pie: {
          expandOnClick: false,
        },
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],
    },
  });

  return (
    <div className="grid-one-item grid-common grid-c2 flex flex-col justify-between">
      <div className="grid-c-title">
        <h3 className="grid-c-title-text">Email Analysis</h3>
        <button className="grid-c-title-icon">
          <img src={iconsImgs.plus} alt="plus icon" />
        </button>
      </div>

      <div className="grid-content flex items-center justify-center mb-4">
        <div id="chart">
          <ReactApexChart
            options={chartData.options}
            series={chartData.series}
            type="pie"
            width={350}
          />
        </div>
      </div>
    </div>
  );
};

export default Transactions;