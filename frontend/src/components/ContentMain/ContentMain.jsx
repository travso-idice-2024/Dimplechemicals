import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./ContentMain.css";
import Cards from "../Cards/Cards";
import Transactions from "../Transactions/Transactions";
import Report from "../Report/Report";
import Budget from "../Budget/Budget";
import Subscriptions from "../Subscriptions/Subscriptions";
import Savings from "../Savings/Savings";
import Loans from "../Loans/Loans";
import Financial from "../Financial/Financial";
import Employee from "../Employee/Employee";
import MeetingPage from "../Meeting/MeetingPage";
import { iconsImgs } from "../../utils/images";
import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;
const getAuthToken = () => localStorage.getItem("token");

const ContentMain = () => {
  const dispatch = useDispatch();
  const[totalLeadCount, setTotalLeadCount] = useState(0);

  const fetchTotalLeadCount = async () => {
    try {
      // ✅ Get token
      const token = getAuthToken();

      // ✅ Correct API call with query parameters
      const response = await axios.get(`${API_URL}/auth/total-lead-count`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTotalLeadCount(response.data.totalLeads);
      //console.log("total lead count", response.data.totalLeads);
    } catch (error) {
      console.error("Error in fetching data:", error);
    }
  };
  useEffect(() => {
    fetchTotalLeadCount();
  }, [dispatch]);

  return (
    <div className="main-content-holder max-h-[615px] overflow-y-auto scrollbar-hide">
      <div className="space-y-3">
        {/* Flex row for 4 divs */}
        <div className="flex flex-col md:flex-row gap-3">
          <div className="bg-bgData flex-1 flex flex-col items-center justify-center rounded-[8px] shadow-md shadow-black/5 text-white p-4 cursor-pointer">
            <div className="w-full flex items-center justify-between">
              <h3 className="grid-c-title-text">Total Lead Entries</h3>
              <button className="grid-c-title-icon">
                <img src={iconsImgs.plus} alt="plus-icon" />
              </button>
            </div>
            <div class=""></div>
          </div>
          <div className="bg-bgData flex-1 flex flex-col items-center justify-center rounded-[8px] shadow-md shadow-black/5 text-white px-4 py-6 cursor-pointer">
          <div className="w-full flex items-center justify-between">
              <h3 className="grid-c-title-text">Total Sales</h3>
              <button className="grid-c-title-icon">
                <img src={iconsImgs.plus} alt="plus-icon" />
              </button>
            </div>
            <div class=""></div>
          </div>
          <div className="bg-bgData flex-1 flex flex-col items-center justify-center rounded-[8px] shadow-md shadow-black/5 text-white px-4 py-6 cursor-pointer">
          <div className="w-full flex items-center justify-between">
              <h3 className="grid-c-title-text">Total Visits</h3>
              <button className="grid-c-title-icon">
                <img src={iconsImgs.plus} alt="plus-icon" />
              </button>
            </div>
            <div class=""></div>
          </div>
          <div className="bg-bgData flex-1 flex flex-col items-center justify-center rounded-[8px] shadow-md shadow-black/5 text-white px-4 py-6 cursor-pointer">
          <div className="w-full flex items-center justify-between">
              <h3 className="grid-c-title-text">Expenses</h3>
              <button className="grid-c-title-icon">
                <img src={iconsImgs.plus} alt="plus-icon" />
              </button>
            </div>
            <div class=""></div>
          </div>
        </div>

        {/* Grid for components (3 per row on medium screens) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <Cards />
          <Financial />
          <Budget />
          <Report />
          <Loans />
          <Transactions />
        </div>
      </div>

      <MeetingPage />
      <Employee />
    </div>
  );
};

export default ContentMain;
