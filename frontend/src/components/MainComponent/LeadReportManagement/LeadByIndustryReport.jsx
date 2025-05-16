import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./ReportManageData.css";
import { useNavigate } from "react-router-dom";
import ContentTop from "../../ContentTop/ContentTop";
import { AllLeadsData } from "../../../redux/leadSlice";
import { fetchAllCustomers } from "../../../redux/customerSlice";
import axios from "axios";
import { iconsImgs } from "../../../utils/images";
const API_URL = import.meta.env.VITE_API_URL;

const getAuthToken = () => localStorage.getItem("token");

const LeadByIndustryReport = () => {
  const dispatch = useDispatch();

  const { allfilterleads } = useSelector((state) => state.lead);
  const { allCustomers } = useSelector((state) => state.customer);

  console.log("allfilterleads", allfilterleads);
  console.log("allCustomers", allCustomers);
  // Pagination & Search States
  const [searchTerm, setSearchTerm] = useState("");
  const [searchCustomer, setSearchCustomer] = useState("");
  // const [currentPage, setCurrentPage] = useState(1);
  // const leadPerPage = 10;

  // Fetch departments whenever searchTerm or currentPage changes
  useEffect(() => {
    dispatch(fetchAllCustomers()); // Fetch all users for dropdown menu
    dispatch(
      AllLeadsData({
        search: searchTerm,
        customer: searchCustomer,
      })
    );
  }, [dispatch, searchTerm, searchCustomer]);

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    //setCurrentPage(1); // Reset to first page when searching
  };

  const handleLeadCustomerChange = (e) => {
    setSearchCustomer(e.target.value);
    //setCurrentPage(1); // Reset to first page when searching
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
        `${API_URL}/auth/export-leads`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            search: searchTerm,
            customer: searchCustomer,
          },
          responseType: "blob", // ✅ Important to keep it here
        }
      );

      // ✅ Create a URL for the blob
      const url = window.URL.createObjectURL(new Blob([response.data]));

      // ✅ Create a temporary <a> tag to download the file
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "Leads_owner_Report.xlsx"); // File name
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
      <div className="main-content-holder max-h-[615px] heightfixalldevice overflow-y-auto scrollbar-hide">
        <div className="flex flex-col gap-[20px]">
          <div className="flex items-start md:items-center flex-col md:flex-row md:justify-between">
            <div>
              <h1 className="text-white text-[15.5px] font-semibold flex items-center">
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
                Leads by Owner
              </h1>
            </div>

            <div className="flex items-start md:items-center flex-col md:flex-row gap-[5px]">
              <div>
                <select
                  name="lead_status"
                  value={searchCustomer}
                  onChange={handleLeadCustomerChange}
                  className="relative m-0 block w-full min-w-0 flex-auto rounded border border-solid border-[#473b33] bg-[#1e1e2d] bg-clip-padding px-3 py-[0.40rem] text-base font-normal leading-[1.6] text-white outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-[#473b33] focus:bg-[#1e1e2d] focus:text-white focus:shadow-[#473b33] focus:outline-none dark:border-[#473b33] dark:text-white dark:placeholder:text-white dark:focus:border-[#473b33]"
                >
                  <option value="">Select the Industry</option>
                  {allCustomers?.data?.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.company_name}
                  </option>
                  ))}
                </select>
              </div>

              <div>
                <input
                  type="search"
                  className="relative m-0 block text-textdata whitespace-nowrap w-full min-w-0 flex-auto rounded border border-solid border-[#473b33] bg-transparent bg-clip-padding px-3 py-[0.15rem] text-base font-normal leading-[1.6] text-white outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-[#473b33] focus:text-white focus:shadow-[#473b33] focus:outline-none dark:border-[#473b33] dark:text-white dark:placeholder:text-white dark:focus:border-[#473b33]"
                  placeholder="Search"
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
              </div>
              <div>
                <button
                  className="flex items-center text-textdata whitespace-nowrap text-white bg-[#fe6c00] rounded-[3px] px-3 py-[0.28rem]"
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
          <div className="bg-bgData rounded-[8px] shadow-md shadow-black/5 text-white px-4 py-6 overflow-auto">
            {/* {/------- Table Data Start -------/} */}
            <div className="overflow-x-auto">
              <table className="table-auto w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#473b33] rounded-[8px]">
                    <th className="px-4 py-2 text-left text-bgDataNew text-textdata">
                      Id
                    </th>
                    <th className="px-4 py-2 text-left text-bgDataNew text-textdata">
                      Company
                    </th>

                    <th className="px-4 py-2 text-left text-bgDataNew text-textdata">
                      Lead Owner
                    </th>
                   
                    <th className="px-4 py-2 text-left text-bgDataNew text-textdata">
                      Email
                    </th>
                    <th className="px-4 py-2 text-left text-bgDataNew text-textdata">
                      Phone
                    </th>
                  
                   
                  
                    <th className="px-4 py-2 text-left text-bgDataNew text-textdata">
                      Created Time
                    </th>
                    <th className="px-4 py-2 text-left text-bgDataNew text-textdata">
                      Name
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {allfilterleads &&
                    allfilterleads?.data?.map((lead, index) => (
                      <tr key={index + 1}>
                        <td className="px-4 py-2 text-textdata">{index + 1}</td>
                        <td className="px-4 py-2 text-textdata">
                          {lead?.customer?.company_name}
                        </td>
                        <td className="px-4 py-2 text-textdata">
                          {lead?.leadOwner?.fullname}
                        </td>
                        <td className="px-4 py-2 text-textdata">
                          {lead?.customer?.email_id}
                        </td>  
                        <td className="px-4 py-2 text-textdata">
                          {lead?.customer?.primary_contact}
                        </td>                     
                      
                       
                        <td className="px-4 py-2 text-textdata">
                          {/* {lead?.assign_date?.split("T")[0]} */}
                          {new Date(lead?.assign_date)?.toLocaleDateString(
                              "en-GB",
                              {
                                day: "2-digit",
                                month: "2-digit",
                                year: "numeric",
                              }
                            )}
                        </td>
                        <td className="px-4 py-2 text-textdata">
                          {lead?.assignedPerson?.fullname}
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
  );
};

export default LeadByIndustryReport;
