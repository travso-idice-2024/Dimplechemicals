import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import SuccessMessage from "../AlertMessage/SuccessMessage";
import ErrorMessage from "../AlertMessage/ErrorMessage";
import axios from "axios";
import TodaysLeadReport from "./TodaysLeadReport";

const API_URL = import.meta.env.VITE_API_URL;

const getAuthToken = () => localStorage.getItem("token");

import { iconsImgs } from "../../utils/images";
import "./Loans.css";

const mettingsschedule = [
  {
    id: 1,
    name: "Rahul Sharma",
    todaymeeting: "rahul.sharma@example.com",
    archeieveday: "Active",
  },
  {
    id: 1,
    name: "Rahul Sharma",
    todaymeeting: "rahul.sharma@example.com",
    archeieveday: "Active",
  },
  {
    id: 1,
    name: "Rahul Sharma",
    todaymeeting: "rahul.sharma@example.com",
    archeieveday: "Active",
  },
];

const Loans = () => {
  const today = new Date(); 
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [viewLeadReportOpen, setViewLeadReportOpen] = useState(false);
  const [selectedLeadData,setSelectedLeadData] = useState(false);

  const [todayLeadCount, setTodayLeadCount] = useState([]);
  const fetchPlanOfActionReport = async () => {
    try {
      // ✅ Get token
      const token = getAuthToken();

      // ✅ Correct API call with query parameters
      const response = await axios.get(
        `${API_URL}/auth/todayleads-count`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        }
      );
      setTodayLeadCount(response.data.data);
      console.log("response", response.data.data);
      //return response.data; // Return data if needed
    } catch (error) {
      console.error("Error in fetching data:", error);
    }
  };
  useEffect(() => {
    fetchPlanOfActionReport();
  }, [dispatch]);


  const formattedDate = today.toLocaleDateString("en-GB");
  return (
    <div className="subgrid-two-item grid-common grid-c7">
      <div className="grid-c-title pb-8">
        <h3 className="grid-c-title-text">
        Check In/Out Data
        </h3>
        <button className="grid-c-title-icon">
          <img src={iconsImgs.plus} />
        </button>
      </div>
      <div className="grid-c7-content pt-2">
        
        <p className="text-[#fe6c00] text-start mb-2 text-[11px]">
          <b>Today's Date</b> : &nbsp;&nbsp;{formattedDate}
        </p>
       
        <div className="overflow-x-auto shadow-md">
          <table className="min-w-full rounded-[8px] border-none">
            <thead className="bg-[#1e1e2d78]">
              <tr className="">
                <th className="px-4 py-2 text-textdata">ID</th>
                <th className="px-4 py-2 text-textdata">Name</th>
                <th className="px-4 py-2 text-textdata">Today's Meetings</th>
                <th className="px-4 py-2 text-textdata">Achieved for the day</th>
              </tr>
            </thead>
            <tbody>
              {todayLeadCount?.map((metting,index) => (
                <tr
                  key={metting.id}
                  className="text-center hover:bg-[#1e1e2d78] cursor-pointer"
                >
                  <td className="px-4 py-2 text-textdata">{index + 1 }</td>
                  <td className="px-4 py-2 text-textdata" onClick={() => {
                      setSelectedLeadData(metting);
                      setViewLeadReportOpen(true);
                    }}>{metting.assignedPerson?.fullname}</td>
                  <td className="px-4 py-2 text-textdata">{metting.assignedPerson?.email}</td>
                  <td className="px-4 py-2 text-textdata">{metting.lead_count}</td>
                </tr>
              ))}
            </tbody>
          </table>
      </div>
      {/* View User Modal */}
            {viewLeadReportOpen && (
              <TodaysLeadReport
              setViewLeadReportOpen={setViewLeadReportOpen}
              selectedLeadData={selectedLeadData}
              />
            )}
      </div>
    </div>
  );
};

export default Loans;
