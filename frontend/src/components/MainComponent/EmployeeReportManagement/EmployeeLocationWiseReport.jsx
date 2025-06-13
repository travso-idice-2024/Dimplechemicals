import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./EmpReportManageData.css";
import { useNavigate } from "react-router-dom";
import ContentTop from "../../ContentTop/ContentTop";
import { EmpReportLocationWise } from "../../../redux/userSlice";
import axios from "axios";
import { iconsImgs } from "../../../utils/images";
const API_URL = import.meta.env.VITE_API_URL;

const getAuthToken = () => localStorage.getItem("token");

const EmployeeLocationWiseReport = () => {
  const dispatch = useDispatch();

  const { emplocationData } = useSelector((state) => state.user);

  
  console.log("emplocationData", emplocationData);

  // Pagination & Search States
  const [searchTerm, setSearchTerm] = useState("");
  
  // const [currentPage, setCurrentPage] = useState(1);
  // const leadPerPage = 10;

  // Fetch departments whenever searchTerm or currentPage changes
  useEffect(() => {
    dispatch(
        EmpReportLocationWise({
        search:searchTerm
      })
    );
  }, [dispatch, searchTerm]);

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Handle page change
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const getAuthToken = () => localStorage.getItem("token");

  const handleExportData = async () => {
    try {
      // ✅ Get token
      const token = getAuthToken();

      // ✅ Correct API call with query parameters
      const response = await axios.get(
        `${API_URL}/auth/export-employee-location`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            search:searchTerm
          },
          responseType: "blob", // ✅ Important to keep it here
        }
      );

      // ✅ Create a URL for the blob
      const url = window.URL.createObjectURL(new Blob([response.data]));

      // ✅ Create a temporary <a> tag to download the file
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "Employee_Location_Wise_Report.xlsx"); // File name
      document.body.appendChild(link);
      link.click();

      // ✅ Cleanup after download
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error exporting data:", error);
    }
  };

  const navigate = useNavigate();
  return (
    <div className="main-content">
      <ContentTop />
      <div className="main-content-holder max-h-[600px] heightfixalldevice overflow-y-auto scrollbar-hide">
        <div className="flex flex-col gap-[20px]">
          <div className="flex items-start md:items-center flex-col md:flex-row md:justify-between gap-[8px] md:gap-[0px] ">
            <div>
              <h1 className="text-white text-[14px] font-semibold flex items-center cursor-pointer" onClick={() => navigate(-1)}>
                <svg
                  width="25"
                  height="25"
                  viewBox="0 0 36 36"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  onClick={() => navigate(-1)}
                  className="cursor-pointer"
                >
                  <path
                    d="M22.5 27L13.5 18L22.5 9"
                    stroke="white"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
                <span className="border border-gray-300 px-3 rounded-[5px]">Back</span> &nbsp;&nbsp;&nbsp;Employee Report By Location Wise
              </h1>
            </div>

            <div className="flex items-start md:items-center flex-col md:flex-row gap-[5px]">
               <div className="flex items-center flex-row gap-[8px] md:gap-[5px]">
              <div>
              <input
                  type="search"
                  className="relative m-0 block text-newtextdata whitespace-nowrap whitespace-nowrap w-full min-w-0 flex-auto rounded border border-solid border-[#473b33] bg-transparent bg-clip-padding px-3 py-[0.15rem] text-base font-normal leading-[1.6] text-white outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-[#473b33] focus:text-white focus:shadow-[#473b33] focus:outline-none dark:border-[#473b33] dark:text-white dark:placeholder:text-white dark:focus:border-[#473b33]"
                  placeholder="Search"
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
              </div>
              <div>
                <button
                  className="flex items-center text-newtextdata whitespace-nowrap whitespace-nowrap text-white bg-[#fe6c00] rounded-[3px] px-3 py-[0.23rem]"
                  onClick={handleExportData}
                >
                  <img
                    src={iconsImgs.plus}
                    alt="plus icon"
                    className="w-[18px] mr-1"
                  />{" "}
                  Export Data
                </button>
              </div>
              </div>
            </div>
          </div>
          <div className="main-content-holder max-h-[600px] heightfixalldevice overflow-y-auto scrollbar-hide">
          <div className="bg-bgData rounded-[8px] shadow-md shadow-black/5 text-white px-4 py-6 overflow-auto">
            {/* {/------- Table Data Start -------/} */}
            <div className="overflow-x-auto">
              <table className="table-auto w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#473b33] rounded-[8px]">
                    <th className="px-4 py-2 text-left text-bgDataNew text-newtextdata whitespace-nowrap">
                      Id
                    </th>
                    <th className="px-4 py-2 text-left text-bgDataNew text-newtextdata whitespace-nowrap">
                      Full Name
                    </th>
                   
                    <th className="px-4 py-2 text-left text-bgDataNew text-newtextdata whitespace-nowrap">
                      Email
                    </th>
                    <th className="px-4 py-2 text-left text-bgDataNew text-newtextdata whitespace-nowrap">
                      Phone
                    </th>
                    <th className="px-4 py-2 text-left text-bgDataNew text-newtextdata whitespace-nowrap">
                    Work Location
                    </th>
                    <th className="px-4 py-2 text-left text-bgDataNew text-newtextdata whitespace-nowrap">
                    Joining Date
                    </th>
                   
                  </tr>
                </thead>
                <tbody>
                  {emplocationData &&
                    emplocationData?.employees?.map((user, index) => (
                      <tr key={index + 1}>
                        <td className="px-4 py-2 text-newtextdata whitespace-nowrap">{index + 1}</td>
                        <td className="px-4 py-2 text-newtextdata whitespace-nowrap">
                          {user?.fullname}
                        </td>
                        <td className="px-4 py-2 text-newtextdata whitespace-nowrap">
                          {user?.email}
                        </td>  
                        <td className="px-4 py-2 text-newtextdata whitespace-nowrap">
                          {user?.phone}
                        </td> 
                        <td className="px-4 py-2 text-newtextdata whitespace-nowrap">
                        {user?.jobDetail?.work_location}
                        </td>
                        <td className="px-4 py-2 text-newtextdata whitespace-nowrap">
                        {new Date(
                            user?.jobDetail?.date_of_joining
                          )?.toLocaleDateString("en-GB", {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                          })}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
            {/* {/------- Table Data End -------/} */}
          </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeLocationWiseReport;
