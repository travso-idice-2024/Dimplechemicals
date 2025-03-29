import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";
import { iconsImgs } from "../../utils/images";
import "./Financial.css"

const Financial = () => {
  const colors = [
    "#e2dc1b",
    "#ed0b1e",
    "#e8dcdd",
    "#e29198",
    "#14a01e",
  ];

  const [chartData] = useState({
    series: [
      {
        data: [50, 20, 40, 5, 25],
      },
    ],
    options: {
      chart: {
        height: 350,
        type: "bar",
        events: {
          click: function (chart, w, e) {
            // console.log(chart, w, e)
          },
        },
      },
      colors: colors,
      plotOptions: {
        bar: {
          columnWidth: "50%",
          distributed: true,
        },
      },
      dataLabels: {
        enabled: false,
      },
      legend: {
        show: false,
      },
      xaxis: {
        categories: [
          ["Cold"],
          ["Hot"],
          ["Lost"],
          ["On Hold"],
          ["Warm"],
        ],
        labels: {
          style: {
            colors: "#fff", 
            fontSize: "14px",
          },
        },
      },
      yaxis: {
        min: 0,
        max: 50,
        tickAmount: 10,
        labels: {
          style: {
            colors: "#ffffff", // Makes Y-axis labels white
            fontSize: "12px",
          },
        },
      },
      tooltip: {
        theme: "dark", // This will make the tooltip background black
      },
    },
  });

  return (
    <div className="subgrid-two-item grid-common grid-c8 flex flex-col justify-between">
      <div className="grid-c-title">
        <h3 className="grid-c-title-text">Lead Analysis Graph</h3>
        <button className="grid-c-title-icon">
          <img src={iconsImgs.plus} alt="plus-icon" />
        </button>
      </div>
      <div className="grid-c8-content">
        <div id="chart">
          <ReactApexChart
            options={chartData.options}
            series={chartData.series}
            type="bar"
            height={350}
          />
        </div>
        <div id="html-dist"></div>
      </div>
    </div>
  );
};

export default Financial;