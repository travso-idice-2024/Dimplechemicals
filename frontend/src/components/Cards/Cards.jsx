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
  const lead = [20, 30, 45, 50,65, 95];
  const conversion = ["30%", "50%", "60%", "50%", "10%", "30%"];
  const colors = ['#ff6f61', '#4dd0e1', '#9575cd', '#81c784', '#fbc02d', '#e57373']


  const barData = {
    labels: months,
    datasets: [
      {
        label: "Monthly Leads & Conversion rate",
        data: lead,
        backgroundColor: colors,
      },
    ],
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false, // ✅ Graph ka height adjust karne ke liye
    plugins: {
      tooltip: {
        enabled: true,
        backgroundColor: "#000",
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
        color: "#ffffff", // Lead ka number white hoga
        font: {
          weight: "bold",
          size: 14,
        },
        formatter: (value) => value, // Sirf lead dikhayega
        anchor: "center",
      },
    },
    scales: {
      x: {
        ticks: {
          color: "#ffffff", // X-axis labels white
          grid: { color: "rgba(255,255,255,0.1)" },
        },
        grid: {
          color: "rgba(255,255,255,0.1)", // Optional: X-axis grid lines ko halka white
        },
      },
      y: {
        min: 0, // Y-axis minimum value
        max: 100, // Y-axis maximum value
        ticks: {
          stepSize: 5, // Har tick 5 ke gap me aayega (0, 5, 10, 15, ..., 80)
          color: "#ffffff",
        },
        grid: {
          color: "rgba(255,255,255,0.1)", // Optional: Y-axis grid lines ko halka white
        },
      },
    },    
    animation: {
      onComplete: function () {
        const chartInstance = this;
        const ctx = chartInstance.ctx;
        ctx.font = "bold 10px Arial";
        ctx.fillStyle = "#fbc02d"; // Conversion ka color yellow hoga
        ctx.textAlign = "center";

        chartInstance.data.datasets[0].data.forEach((value, index) => {
          const meta = chartInstance.getDatasetMeta(0).data[index];
          const x = meta.x;
          const y = meta.y - 5; // 20px upar taaki top per aaye
          ctx.fillText(conversion[index], x, y);
        });
      },
    },
    barThickness: 30, // Fixing bar width
    maxBarThickness: 30, // Maximum width allowed
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
        <Bar data={barData} options={barOptions} height={200} />
      </div>
    </div>
  );
};

export default Cards;