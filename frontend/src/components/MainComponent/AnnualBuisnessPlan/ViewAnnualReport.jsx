import React, { useState, useEffect, useRef } from "react";
import Select from "react-select";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp, faChevronDown } from "@fortawesome/free-solid-svg-icons";

const ViewAnnualReport = ({ setIsAnnualListTable }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const profileRef = useRef(null);

  // ✅ Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const countryOptions = [
    { value: "india", label: "India" },
    { value: "usa", label: "USA" },
    { value: "canada", label: "Canada" },
  ];

  const stateOptions = [
    { value: "maharashtra", label: "Maharashtra" },
    { value: "gujarat", label: "Gujarat" },
    { value: "california", label: "California" },
    { value: "ontario", label: "Ontario" },
  ];

  const cityOptions = [
    { value: "mumbai", label: "Mumbai" },
    { value: "ahmedabad", label: "Ahmedabad" },
    { value: "los_angeles", label: "Los Angeles" },
    { value: "toronto", label: "Toronto" },
  ];

  const departmentOptions = [
    { value: "IT", label: "IT" },
    { value: "HR", label: "HR" },
    { value: "Sales", label: "Sales" },
    { value: "Marketing", label: "Marketing" },
  ];

  const technologyOptions = [
    { value: "HTML", label: "HTML" },
    { value: "CSS", label: "CSS" },
    { value: "ReactJS", label: "React" },
    { value: "NodeJS", label: "NodeJS" },
  ];

  return (
    <>
      {/* Modal Container */}
      <div className="fixed inset-0 p-2 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-white w-full md:w-[1200px]  rounded-[6px]">
          <h2 className="text-white text-[20px] font-poppins mb-2 px-0 py-2 text-center bg-bgDataNew rounded-t-[5px]">
            View Report
          </h2>

          <div className="p-4 mt-2 overflow-y-auto h-[540px]">
            <h3 className="mt-2 mb-2 text-bgDataNew font-poppins border border-gray-300 w-[300px] font-medium text-[20px] mb-0 text-center mx-auto">
              Annual Business Plan
            </h3>
            <h3 className="mt-2 mb-8 text-bgDataNew font-poppins border border-gray-300 w-[540px] font-medium text-[17px] mb-0 text-center mx-auto">
              Business Plan for the year 2024-2025 for Work Execution
            </h3>

            <div className="px-2 mt-10 w-100 flex items-start justify-between px-0">
              <div className="bg-[#e5e7eb38] rounded-[5px] w-[560px]">
                <table className="w-full border border-gray-300 text-sm table-fixed">
                  <tbody>
                    <tr className="border-b border-gray-200">
                      <td className="py-2 px-4 text-left font-bold text-gray-600 w-[40%]">
                        Name of Employee
                      </td>
                      <td className="py-2 text-center align-middle w-[5%]">
                        :
                      </td>
                      <td className="py-2 px-4 text-right text-gray-800 w-[55%]">
                        RAM KUMAR
                      </td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="py-2 px-4 text-left font-bold text-gray-600">
                        Employee code
                      </td>
                      <td className="py-2 text-center align-middle">:</td>
                      <td className="py-2 px-4 text-right text-gray-800">
                        GH123
                      </td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="py-2 px-4 text-left font-bold text-gray-600">
                        Business Associate code
                      </td>
                      <td className="py-2 text-center align-middle">:</td>
                      <td className="py-2 px-4 text-right text-gray-800">
                        HTLP2150
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className=" relative inline-block" ref={profileRef}>
                <button
                  className="notification-btn content-top-btns bg-gray-600 p-1 px-3 rounded-[5px] flex items-center gap-2 w-fit"
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                >
                  <div className="flex items-center gap-2">
                    <div className="flex flex-col items-start">
                      <h2 className="font-bai text-[12px] text-white datashowname">
                        <span className="full-name whitespace-nowrap">
                          3 month
                        </span>
                      </h2>
                    </div>
                    <div>
                      <FontAwesomeIcon
                        icon={faChevronDown}
                        className="text-white text-[12px] mb-[2px]"
                      />
                    </div>
                  </div>

                  {/* <span className="notification-btn-dot"></span> */}
                </button>

                {isProfileOpen && (
                  <div className="absolute right-0 w-fit bg-white bordernewdata shadow-lg rounded-[5px] p-2 mt-1 z-10">
                    <div className="border-b">
                      <h2 className="font-bai text-[12px] text-black">
                        <span className="full-name">3 month</span>
                      </h2>
                      <h2 className="font-bai text-[12px] text-black">
                        <span className="full-name">6 month</span>
                      </h2>
                      <h2 className="font-bai text-[12px] text-black">
                        <span className="full-name">9 month</span>
                      </h2>
                      <h2 className="font-bai text-[12px] text-black">
                        <span className="full-name">12 month</span>
                      </h2>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-4 px-1 overflow-auto">
              <h3 class="-mb-0 text-black font-poppins border bg-gray-400 py-1 rounded-t-[4px] font-medium text-[18px] text-bgData mb-0 text-center mx-auto capitalize">
                {" "}
                Customer Details
              </h3>
              <div class="px-[1px] overflow-x-auto">
                {/* First Table */}
                <table className="table-fixed w-full text-left border-collapse border border-gray-400">
                  {/* 8 columns, each 12.5% */}
                  <colgroup>
                    <col span="8" style={{ width: "12.5%" }} />
                  </colgroup>
                  <tbody>
                    <tr className="text-center">
                      {/* colspan values sum to 8 */}
                      <td
                        className="px-4 py-2 text-[#000000] font-poopins text-[15px] border border-gray-400 font-medium whitespace-nowrap overflow-hidden text-ellipsis"
                        colSpan={2}
                      >
                        Customer Name
                      </td>
                      <td
                        className="px-4 py-2 text-[#000000] font-poopins text-[15px] border border-gray-400 font-medium whitespace-nowrap overflow-hidden text-ellipsis"
                        colSpan={1}
                      >
                        State
                      </td>
                      <td
                        className="px-4 py-2 text-[#000000] font-poopins text-[15px] border border-gray-400 font-medium whitespace-nowrap overflow-hidden text-ellipsis"
                        colSpan={1}
                      >
                        City
                      </td>
                      <td
                        className="px-4 py-2 text-[#000000] font-poopins text-[15px] border border-gray-400 font-medium whitespace-nowrap overflow-hidden text-ellipsis"
                        colSpan={2}
                      >
                        Location
                      </td>
                      <td
                        className="px-4 py-2 text-[#000000] font-poopins text-[15px] border border-gray-400 font-medium whitespace-nowrap overflow-hidden text-ellipsis"
                        colSpan={2}
                      >
                        Country
                      </td>
                    </tr>
                    <tr className="text-center">
                      <td
                        className="px-4 py-2 text-[#72360a] font-poopins text-[15px] border border-gray-400 font-medium whitespace-nowrap overflow-hidden text-ellipsis"
                        colSpan={2}
                      >
                        Rohan Gupta
                      </td>
                      <td
                        className="px-4 py-2 text-[#72360a] font-poopins text-[15px] border border-gray-400 font-medium whitespace-nowrap overflow-hidden text-ellipsis"
                        colSpan={1}
                      >
                        Maharashtra
                      </td>
                      <td
                        className="px-4 py-2 text-[#72360a] font-poopins text-[15px] border border-gray-400 font-medium whitespace-nowrap overflow-hidden text-ellipsis"
                        colSpan={1}
                      >
                        Mumbai
                      </td>
                      <td
                        className="px-4 py-2 text-[#72360a] font-poopins text-[15px] border border-gray-400 font-medium whitespace-nowrap overflow-hidden text-ellipsis"
                        colSpan={2}
                      >
                        Kalyaan
                      </td>
                      <td
                        className="px-4 py-2 text-[#72360a] font-poopins text-[15px] border border-gray-400 font-medium whitespace-nowrap overflow-hidden text-ellipsis"
                        colSpan={2}
                      >
                        India
                      </td>
                    </tr>
                  </tbody>
                </table>

                {/* Second Table */}
                <table className="table-fixed w-full text-left border-collapse border border-gray-400 mt-2">
                  {/* Same colgroup: 8 columns of 12.5% each */}
                  <colgroup>
                    <col span="8" style={{ width: "12.5%" }} />
                  </colgroup>
                  <tbody>
                    <tr className="text-center">
                      <td
                        className="px-4 py-2 text-[#000000] font-poopins text-[15px] border border-gray-400 font-medium whitespace-nowrap overflow-hidden text-ellipsis"
                        colSpan={2}
                      >
                        Contact Person
                      </td>
                      <td
                        className="px-4 py-2 text-[#000000] font-poopins text-[15px] border border-gray-400 font-medium whitespace-nowrap overflow-hidden text-ellipsis"
                        colSpan={2}
                      >
                        Conatct no.
                      </td>
                      <td
                        className="px-4 py-2 text-[#000000] font-poopins text-[15px] border border-gray-400 font-medium whitespace-nowrap overflow-hidden text-ellipsis"
                        colSpan={1}
                      >
                        Department
                      </td>
                      <td
                        className="px-4 py-2 text-[#000000] font-poopins text-[15px] border border-gray-400 font-medium whitespace-nowrap overflow-hidden text-ellipsis"
                        colSpan={1}
                      >
                        Designation
                      </td>
                      <td
                        className="px-4 py-2 text-[#000000] font-poopins text-[15px] border border-gray-400 font-medium whitespace-nowrap overflow-hidden text-ellipsis"
                        colSpan={2}
                      >
                       Email Id
                      </td>
                    </tr>
                    <tr className="text-center">
                      <td
                        className="px-4 py-2 text-[#72360a] font-poopins text-[15px] border border-gray-400 font-medium whitespace-nowrap overflow-hidden text-ellipsis"
                        colSpan={2}
                      >
                        Ravi Kumar
                      </td>
                      <td
                        className="px-4 py-2 text-[#72360a] font-poopins text-[15px] border border-gray-400 font-medium whitespace-nowrap overflow-hidden text-ellipsis"
                        colSpan={2}
                      >
                        +91 9852456981
                      </td>
                      <td
                        className="px-4 py-2 text-[#72360a] font-poopins text-[15px] border border-gray-400 font-medium whitespace-nowrap overflow-hidden text-ellipsis"
                        colSpan={1}
                      >
                        IT
                      </td>
                      <td
                        className="px-4 py-2 text-[#72360a] font-poopins text-[15px] border border-gray-400 font-medium whitespace-nowrap overflow-hidden text-ellipsis"
                        colSpan={1}
                      >
                        Indore
                      </td>
                      <td
                        className="px-4 py-2 text-[#72360a] font-poopins text-[15px] border border-gray-400 font-medium whitespace-nowrap overflow-hidden text-ellipsis"
                        colSpan={2}
                      >
                        info@halideschemicals.com
                      </td>
                    </tr>
                  </tbody>
                </table>
                {/* Third Table */}
                 <table className="table-fixed w-full text-left border-collapse border border-gray-400 mt-2">
                  {/* Same colgroup: 8 columns of 12.5% each */}
                  <colgroup>
                    <col span="8" style={{ width: "12.5%" }} />
                  </colgroup>
                  <tbody>
                    <tr className="text-center">
                      <td
                        className="px-4 py-2 text-[#000000] font-poopins text-[15px] border border-gray-400 font-medium whitespace-nowrap overflow-hidden text-ellipsis"
                        colSpan={2}
                      >
                         Project Name
                      </td>
                      <td
                        className="px-4 py-2 text-[#000000] font-poopins text-[15px] border border-gray-400 font-medium whitespace-nowrap overflow-hidden text-ellipsis"
                        colSpan={2}
                      >
                        App Area in sq mtr
                      </td>
                      <td
                        className="px-4 py-2 text-[#000000] font-poopins text-[15px] border border-gray-400 font-medium whitespace-nowrap overflow-hidden text-ellipsis"
                        colSpan={2}
                      >
                        Buisness Potential
                      </td>
                      <td
                        className="px-4 py-2 text-[#000000] font-poopins text-[15px] border border-gray-400 font-medium whitespace-nowrap overflow-hidden text-ellipsis"
                        colSpan={2}
                      >
                        Technology
                      </td>
                      
                     
                    </tr>
                    <tr className="text-center">
                      <td
                        className="px-4 py-2 text-[#72360a] font-poopins text-[15px] border border-gray-400 font-medium whitespace-nowrap overflow-hidden text-ellipsis"
                        colSpan={2}
                      >
                        High CHemicals
                      </td>
                      <td
                        className="px-4 py-2 text-[#72360a] font-poopins text-[15px] border border-gray-400 font-medium whitespace-nowrap overflow-hidden text-ellipsis"
                        colSpan={2}
                      >
                        500
                      </td>
                      <td
                        className="px-4 py-2 text-[#72360a] font-poopins text-[15px] border border-gray-400 font-medium whitespace-nowrap overflow-hidden text-ellipsis"
                        colSpan={2}
                      >
                        High
                      </td>
                      <td
                        className="px-4 py-2 text-[#72360a] font-poopins text-[15px] border border-gray-400 font-medium whitespace-nowrap overflow-hidden text-ellipsis"
                        colSpan={2}
                      >
                        React and AI
                      </td>
                      
                    </tr>
                  </tbody>
                </table>
                {/* <table class="table-auto w-full text-left border-collapse border border-gray-400 mt-2">
                  <tbody>
                    <tr className="text-center">
                      <td
                        class="px-4 py-2 text-[#000000] font-poopins text-[15px] border border-gray-400 font-medium whitespace-nowrap"
                        colspan="2"
                      >
                        Business Potential
                      </td>
                      <td
                        class="px-4 py-2 text-[#000000] font-poopins text-[15px] border border-gray-400 font-medium whitespace-nowrap"
                        colspan="2"
                      >
                        Location
                      </td>
                      <td
                        class="px-4 py-2 text-[#000000] font-poopins text-[15px] border border-gray-400 font-medium whitespace-nowrap"
                        colspan="2"
                      >
                        Department
                      </td>
                      <td
                        class="px-4 py-2 text-[#000000] font-poopins text-[15px] border border-gray-400 font-medium whitespace-nowrap"
                        colspan="2"
                      >
                        Project Name / Application Area
                      </td>
                    </tr>
                    <tr className="text-center">
                      <td
                        class="px-4 py-2 text-[#72360a] font-poopins text-[15px] border border-gray-400 font-medium whitespace-nowrap"
                        colspan="2"
                      >
                        High
                      </td>
                      <td
                        class="px-4 py-2 text-[#72360a] font-poopins text-[15px] border border-gray-400 font-medium whitespace-nowrap"
                        colspan="2"
                      >
                        MIDC, Andheri
                      </td>
                      <td
                        class="px-4 py-2 text-[#72360a] font-poopins text-[15px] border border-gray-400 font-medium whitespace-nowrap"
                        colspan="2"
                      >
                        Purchase
                      </td>
                      <td
                        class="px-4 py-2 text-[#72360a] font-poopins text-[15px] border border-gray-400 font-medium whitespace-nowrap"
                        colspan="2"
                      >
                        New Chemical Plant
                      </td>
                    </tr>
                  </tbody>
                </table> */}
              </div>
            </div>

            <div className="mt-6 px-1 overflow-auto">
              <h3 class="-mb-0 text-black font-poppins border bg-gray-400 py-1 rounded-t-[4px] font-medium text-[18px] text-bgData mb-0 text-center mx-auto capitalize">
                {" "}
                Product Details
              </h3>
              <div class="px-[1px] overflow-x-auto">
                <table class="table-auto w-full text-left border-collapse border border-gray-400">
                  <tbody>
                    <tr class="text-center">
                      <td
                        class="px-4 py-2 text-[#000000] font-poopins text-[15px] border border-gray-400 font-medium whitespace-nowrap"
                        colspan="2"
                      >
                        Product Name
                      </td>
                      <td class="px-4 py-2 text-[#000000] font-poopins text-[15px] border border-gray-400 font-medium whitespace-nowrap">
                        Qty.
                      </td>
                      <td class="px-4 py-2 text-[#000000] font-poopins text-[15px] border border-gray-400 font-medium whitespace-nowrap">
                        Rate
                      </td>
                      <td
                        class="px-4 py-2 text-[#000000] font-poopins text-[15px] border border-gray-400 font-medium whitespace-nowrap"
                        colspan="2"
                      >
                        Value Rs.
                      </td>
                      <td
                        class="px-4 py-2 text-[#000000] font-poopins text-[15px] border border-gray-400 font-medium whitespace-nowrap"
                        colspan="2"
                      >
                        GST Amt
                      </td>
                      <td
                        class="px-4 py-2 text-[#000000] font-poopins text-[15px] border border-gray-400 font-medium whitespace-nowrap"
                        colspan="2"
                      >
                        Gross Sale (GST)
                      </td>
                      <td
                        class="px-4 py-2 text-[#000000] font-poopins text-[15px] border border-gray-400 font-medium whitespace-nowrap"
                        colspan="2"
                      >
                        Commission
                      </td>
                      <td
                        class="px-4 py-2 text-[#000000] font-poopins text-[15px] border border-gray-400 font-medium whitespace-nowrap"
                        colspan="2"
                      >
                        Net Sale (GST)
                      </td>
                    </tr>

                    <tr class="text-center">
                      <td
                        class="px-4 py-2 text-[#72360a] font-poopins text-[15px] border border-gray-400 font-medium whitespace-nowrap"
                        colspan="2"
                      >
                        Halides Chemicals
                      </td>
                      <td class="px-4 py-2 text-[#72360a] font-poopins text-[15px] border border-gray-400 font-medium whitespace-nowrap">
                        10
                      </td>
                      <td class="px-4 py-2 text-[#72360a] font-poopins text-[15px] border border-gray-400 font-medium whitespace-nowrap">
                        ₹500
                      </td>
                      <td
                        class="px-4 py-2 text-[#72360a] font-poopins text-[15px] border border-gray-400 font-medium whitespace-nowrap"
                        colspan="2"
                      >
                        ₹5,000
                      </td>
                      <td
                        class="px-4 py-2 text-[#72360a] font-poopins text-[15px] border border-gray-400 font-medium whitespace-nowrap"
                        colspan="2"
                      >
                        ₹900
                      </td>
                      <td
                        class="px-4 py-2 text-[#72360a] font-poopins text-[15px] border border-gray-400 font-medium whitespace-nowrap"
                        colspan="2"
                      >
                        ₹5,900
                      </td>
                      <td
                        class="px-4 py-2 text-[#72360a] font-poopins text-[15px] border border-gray-400 font-medium whitespace-nowrap"
                        colspan="2"
                      >
                        ₹590
                      </td>
                      <td
                        class="px-4 py-2 text-[#72360a] font-poopins text-[15px] border border-gray-400 font-medium whitespace-nowrap"
                        colspan="2"
                      >
                        ₹5,310
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="flex items-end justify-end gap-2 px-4 my-4">
            <button
              type="button"
              className="bg-gray-500 text-white px-3 py-2 rounded hover:bg-gray-600"
              onClick={() => setIsAnnualListTable(false)}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewAnnualReport;
