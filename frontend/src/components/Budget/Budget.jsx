import React, { useState } from "react";
import "./Budget.css";
import { iconsImgs } from "../../utils/images";
import { budget } from "../../data/data";
import ReactApexChart from "react-apexcharts";

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
          color: "#fe6c00", // Orange shadow
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
      colors: ["#fe6c00", "white"], // Orange and White
      dataLabels: {
        enabled: true,
        style: {
          colors: ["#fe6c00"], // Orange Labels
        },
      },
      stroke: {
        curve: "smooth",
      },
      title: {
        text: "Expected Sales & Archieved Sales",
        align: "left",
        style: {
          color: "#fe6c00", // Orange title
        },
      },
      grid: {
        borderColor: "#fe6c00", // Orange grid border
        row: {
          colors: ["#2e2e3c", "transparent"], // Alternating row colors
          opacity: 0.5,
        },
      },
      markers: {
        size: 5,
        colors: ["white"],
        strokeColors: "#fe6c00", // Orange marker border
      },
      xaxis: {
        categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
        title: {
          text: "Month",
          style: {
            color: "#fe6c00", // Orange x-axis title
          },
        },
        labels: {
          style: {
            colors: "#fe6c00", // Orange x-axis labels
          },
        },
      },
      yaxis: {
        title: {
          text: "Sales Analytics",
          style: {
            color: "#fe6c00", // Orange y-axis title
          },
        },
        labels: {
          style: {
            colors: "white", // Orange y-axis labels
            
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
          colors: ["white", "white"], // Orange legend text
        },
      },
      tooltip: {
        theme: "dark",
        style: {
          fontSize: "12px",
          colors: ["#fe6c00"], // Orange tooltip text
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
            height={350}
          />
        </div>
        <div id="html-dist"></div>
      </div>
    </div>
  );
};

export default Budget;