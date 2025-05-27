import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";
import { iconsImgs } from "../../utils/images";
import "./Report.css";

const colors = ['#fff', '#fff', '#fff', '#fff', '#fff']; // Define your color combination 


const colordata = ['#fe6c00a3', '#e74c3c']
const Report = () => {
  const [chartData, setChartData] = useState({ 
    series: [
      { name: "MKTG", data: [10, 15, 18, 16, 8] },
      { name: "SALES", data: [7, 10, 8, 10, 5] },
    ],
    options: {
      chart: { type: "bar", height: 430, toolbar: {
      show: false,  // <-- Add this line to hide the 3 lines toolbar
    } },
      colors: [colordata[0], colordata[1]], // Red for Marketing, Green for Sales
      plotOptions: {
        bar: { horizontal: true, dataLabels: { position: "top" } },
      },
      dataLabels: {
        enabled: false,
        offsetX: -6,
        style: { fontSize: "12px", colors: ["#fff"] },
      },
      stroke: { show: true, width: 1, colors: ["#fff"] },
      tooltip: {
        theme: "dark",
        shared: true,
        intersect: false,
        y: {
          formatter: function (value, { seriesIndex, dataPointIndex, w }) {
            // Get values of both series at the given index
            const mktValue = w.globals.series[0][dataPointIndex] || 0;
            const salesValue = w.globals.series[1][dataPointIndex] || 0;
            const total = mktValue + salesValue;

            return `MKTG: ${mktValue} | SALES: ${salesValue} | Total: ${total}`;
          },
        },
      },
      xaxis: {
        categories: ["May", "April", "March", "Feb", "Jan"], // Reversed order
        labels: {
          style: {
            colors: [colors[2], colors[3], colors[4], colors[2], colors[3]], // Dynamic colors for months
            fontSize: "12px",
          },
        },
        tickAmount: 4, // Controls the number of ticks displayed
        min: 0, // Start from 0
        max: 20, // End at 20
      },
      yaxis: {
        categories: ["May", "April", "March", "Feb", "Jan"],
        labels: {
          style: {
            colors: [colors[1], colors[0], colors[3], colors[4], colors[2]], // Dynamic colors for Y-axis labels
            fontSize: "12px",
          },
        },
      },
      legend: {
        labels: {
          colors: [colors[0], colors[1]], // Use dynamic colors for the legend items
        },
      },
    },
  });

  return (
    <div className="grid-one-item grid-common grid-c1 flex flex-col justify-between">
      <div className="grid-c-title">
        <h3 className="grid-c-title-text">Leads Analysis</h3>
        <button className="grid-c-title-icon">
          <img src={iconsImgs.plus} alt="Add" />
        </button>
      </div>
      <div className="grid-c3-content">
        <ReactApexChart
          options={chartData.options}
          series={chartData.series}
          type="bar"
          height={220}
        />
      </div>
    </div>
  );
};

export default Report;