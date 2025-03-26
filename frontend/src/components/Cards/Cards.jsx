import { iconsImgs } from "../../utils/images";
import "./Cards.css";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  ChartDataLabels
);

const Cards = () => {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
  const lead = [20, 30, 45, 60, 70, 80];
  const conversion = ["30%", "50%", "60%", "50%", "10%", "30%"];

  const barData = {
    labels: months,
    datasets: [
      {
        label: "Monthly Leads & Conversion rate",
        data: lead,
        backgroundColor: "#fe6c00",
      },
    ],
  };

  const barOptions = {
    responsive: true,
    plugins: {
      tooltip: {
        enabled: true,
        backgroundColor: "black",
        displayColors: false,
        paddingTop: 10,
        callbacks: {
          label: function (tooltipItem) {
            const index = tooltipItem.dataIndex;
            const leadValue = lead[index];
            const conversionValue = conversion[index];
            return `Leads: ${leadValue}, Conversion: ${conversionValue}`;
          },
        },
      },
      datalabels: {
        display: true,
        color: "white", // Lead ka number white hoga
        font: {
          weight: "bold",
          size: 14,
        },
        formatter: (value) => value, // Sirf lead dikhayega
        anchor: "center",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    animation: {
      onComplete: function () {
        const chartInstance = this;
        const ctx = chartInstance.ctx;
        ctx.font = "bold 10px Arial";
        ctx.fillStyle = "#fe6c00"; // Conversion ka color yellow hoga
        ctx.textAlign = "center";

        chartInstance.data.datasets[0].data.forEach((value, index) => {
          const meta = chartInstance.getDatasetMeta(0).data[index];
          const x = meta.x;
          const y = meta.y - 5; // 20px upar taaki top per aaye
          ctx.fillText(conversion[index], x, y);
        });
      },
    },
    barThickness: 50, // Fixing bar width
    maxBarThickness: 50, // Maximum width allowed
  };

  return (
    <div className="grid-one-item grid-common grid-c1 flex flex-col justify-between">
      <div className="grid-c-title">
        <h3 className="grid-c-title-text">Leads from Marketing</h3>
        <button className="grid-c-title-icon">
          <img src={iconsImgs.plus} alt="Add" />
        </button>
      </div>
      {/* <p className="text-[14px] text-bgDataNew mt-6 mb-2">Monthly Leads and Conversion Rate</p> */}
      <div className="">
        <Bar data={barData} options={barOptions} />
      </div>
    </div>
  );
};

export default Cards;