import React, { useState } from "react";
import "./Budget.css";
import { iconsImgs } from "../../utils/images";
import { budget } from "../../data/data";
import ReactApexChart from "react-apexcharts";

const colors = ['#ff6f61', '#4dd0e1', '#9575cd', '#81c784', '#fbc02d', '#e57373'];

const Budget = () => {
  const [state, setState] = useState({
    series: [
      {
        name: "Expected",
        data: [25, 35, 40, 45, 50],
      },
      {
        name: "Achieved",
        data: [10, 15, 18, 16, 8],
      },
    ],
    options: {
      chart: {
        height: 350,
        type: "line",
        dropShadow: {
          enabled: true,
          color: colors[0], // Dynamic shadow color
          top: 18,
          left: 7,
          blur: 10,
          opacity: 0.5,
        },
        zoom: {
          enabled: false,
        },
        toolbar: {
          show: false,
        },
      },
      colors: [colors[0], colors[1]], // Dynamic line colors
      dataLabels: {
        enabled: true,
        style: {
          colors: [colors[0]], // Dynamic data label color
        },
      },
      stroke: {
        curve: "smooth",
      },
      title: {
        align: "left",
        style: {
          color: colors[0], // Dynamic title color
        },
      },
      grid: {
        borderColor: colors[0], // Dynamic grid border color
        row: {
          colors: ["#2e2e3c", "transparent"],
          opacity: 0.5,
        },
      },
      markers: {
        size: 5,
        colors: [colors[1]],
        strokeColors: colors[0], // Dynamic marker border color
      },
      xaxis: {
        categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
        title: {
          text: "",
          style: {
            color: colors[0], // Dynamic x-axis title color
          },
        },
        labels: {
          style: {
            colors: colors[0], // Dynamic x-axis label color
          },
        },
      },
      yaxis: {
        title: {
          text: "Sales Analytics",
          style: {
            color: colors[0], // Dynamic y-axis title color
          },
        },
        labels: {
          style: {
            colors: "white", // Static white y-axis label color
          },
          offsety: 20,
        },
        min: 0,
        max: 60,
      },
      legend: {
        position: "top",
        horizontalAlign: "right",
        floating: true,
        offsetY: -25,
        offsetX: -5,
        labels: {
          colors: ["white", "white"], // Static legend text color
        },
      },
      tooltip: {
        theme: "dark",
        style: {
          fontSize: "12px",
          colors: [colors[0]], // Dynamic tooltip text color
        },
        y: {
          formatter: function (val) {
            return val;
          },
        },
      },
    },
  });

  return (
    <div className="grid-two-item grid-common grid-c4 flex flex-col gap-6">
      <div className="grid-c-title">
        <h3 className="grid-c-title-text">
          Sales Analytics (This Month)
        </h3>
        <button className="grid-c-title-icon">
          <img src={iconsImgs.plus} alt="Plus Icon" />
        </button>
      </div>
      <div className="grid-c-top text-silver-v1 w-full">
        <div id="chart" className="w-full">
          <ReactApexChart
            options={state.options}
            series={state.series}
            type="line"
            height={200}
          />
        </div>
        <div id="html-dist"></div>
      </div>
    </div>
  );
};

export default Budget;
