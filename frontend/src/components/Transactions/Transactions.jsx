import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";
import { iconsImgs } from "../../utils/images";
import "./Transactions.css";

const Transactions = () => {
  const series = [30, 10, 5, 65]; // Absolute values
  const colors = ["rgba(231,76,60,0.85)", "#3498db", "#1e1e2d", "#fe6c00"];// New colors

  const [chartData, setChartData] = useState({
    series: series,
    options: {
      chart: {
        type: "pie",
      },
      labels: ["Opened", "Bounced", "Unopened", "Unmailed Data"],
      colors: colors, // Set new colors here
      dataLabels: {
        enabled: true,
        style: {
          colors: ["#ffffff"], // Change chart labels color (inside pie chart)
          fontSize: "14px",
          fontWeight: "bold",
        },
        formatter: (value, { seriesIndex, w }) => {
          return `${w.config.series[seriesIndex]} %`; // Show value with % sign
        },
      },
      legend: {
        labels: {
          colors: ["#fff", "#fff", "#fff", "#fff"], // Custom legend label colors
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

      <div className="grid-content flex items-center justify-center">
        <div id="chart">
          <ReactApexChart
            options={chartData.options}
            series={chartData.series}
            type="pie"
            width={380}
          />
        </div>
      </div>
    </div>
  );
};

export default Transactions;
