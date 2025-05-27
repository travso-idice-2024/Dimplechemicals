import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";
import { iconsImgs } from "../../utils/images";
import "./Financial.css"

const Financial = () => {
  const colors = ['#fe6c00a3', '#fe6c00a3', '#fe6c00a3', '#fe6c00a3', '#fe6c00a3', '#fe6c00a3']


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
        toolbar: {
      show: false,  // <-- Add this line to hide the 3 lines toolbar
    },
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
        enabled: true,
        style: {
          colors: ['#fff'],
          fontSize: '14px',
          fontWeight: 'bold'
        },
        offsetY: 0,
        position: 'center'
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
            fontSize: "12px",
            fontWeight: "500"
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
         grid: {
          borderColor: "#434350", // Sets the grid line color behind the graph
        },
      },
      tooltip: {
        theme: "dark", // This will make the tooltip background black
      },
      // plotOptions: {
      //   bar: {
      //     columnWidth: "40%", // Graph bars ki thickness ko adjust karne ke liye
      //     distributed: true,
      //   },
      // },
      
    },
  });

  return (
    <div className="grid-one-item grid-common grid-c1 flex flex-col justify-between">
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
            height={220}
          />
        </div>
        <div id="html-dist"></div>
      </div>
    </div>
  );
};

export default Financial;