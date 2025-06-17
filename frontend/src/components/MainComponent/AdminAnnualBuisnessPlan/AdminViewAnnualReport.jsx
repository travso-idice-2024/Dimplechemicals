import React, { useState, useEffect, useRef } from "react";
import Select from "react-select";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp, faChevronDown } from "@fortawesome/free-solid-svg-icons";

const AdminViewAnnualReport = ({ setIsViewReportOpen }) => {
  //console.log("selectedABP", selectedABP);
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

  return (
    <>
      {/* Modal Container */}
      <div className="fixed inset-0 p-2 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-white w-full md:w-[1400px]  rounded-[6px]">
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
                        dsfdfdf
                      </td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="py-2 px-4 text-left font-bold text-gray-600">
                        Employee code
                      </td>
                      <td className="py-2 text-center align-middle">:</td>
                      <td className="py-2 px-4 text-right text-gray-800">
                        asdasdaf
                      </td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="py-2 px-4 text-left font-bold text-gray-600">
                        Business Associate code
                      </td>
                      <td className="py-2 text-center align-middle">:</td>
                      <td className="py-2 px-4 text-right text-gray-800">
                        addsafdf
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
                          4 month
                        </span>
                      </h2>
                    </div>
                  </div>

                  {/* <span className="notification-btn-dot"></span> */}
                </button>
              </div>
            </div>

            <div className="mt-4 px-1 overflow-auto">
              <h3 class="-mb-0 text-black font-poppins border bg-gray-400 py-1 rounded-t-[4px] font-medium text-[18px] text-bgData mb-0 text-center mx-auto capitalize">
                {" "}
                Customer Details
              </h3>
              <div class="px-[1px] overflow-x-auto">
                {/* First Table */}
                <table className="table-auto w-full text-left border-collapse border border-gray-400">
                  <tbody>
                    <tr className="">
                      <th className="px-4 py-2 text-[#000000] font-poopins text-[15px] border border-gray-400 font-medium whitespace-nowrap">
                        Country
                      </th>
                      <th className="px-4 py-2 text-[#000000] font-poopins text-[15px] border border-gray-400 font-medium whitespace-nowrap">
                        State
                      </th>
                      <th className="px-4 py-2 text-[#000000] font-poopins text-[15px] border border-gray-400 font-medium whitespace-nowrap">
                        City
                      </th>
                      <th className="px-4 py-2 text-[#000000] font-poopins text-[15px] border border-gray-400 font-medium whitespace-nowrap">
                        Custumer Name
                      </th>
                      <th className="px-4 py-2 text-[#000000] font-poopins text-[15px] border border-gray-400 font-medium whitespace-nowrap">
                        Location
                      </th>
                      <th className="px-4 py-2 text-[#000000] font-poopins text-[15px] border border-gray-400 font-medium whitespace-nowrap">
                        Department
                      </th>

                      <th className="px-4 py-2 text-[#000000] font-poopins text-[15px] border border-gray-400 font-medium whitespace-nowrap">
                        Project Name/Application Area
                      </th>
                      <th className="px-4 py-2 text-[#000000] font-poopins text-[15px] border border-gray-400 font-medium whitespace-nowrap">
                        Contact Person
                      </th>
                      <th className="px-4 py-2 text-[#000000] font-poopins text-[15px] border border-gray-400 font-medium whitespace-nowrap">
                       Designation
                      </th>
                      <th className="px-4 py-2 text-[#000000] font-poopins text-[15px] border border-gray-400 font-medium whitespace-nowrap">
                                Phone Number
                              </th>
                      <th className="px-4 py-2 text-[#000000] font-poopins text-[15px] border border-gray-400 font-medium whitespace-nowrap">
                        EmailID
                      </th>
                       <th className="px-4 py-2 text-[#000000] font-poopins text-[15px] border border-gray-400 font-medium whitespace-nowrap">
                        Technology
                      </th>

                       <th className="px-4 py-2 text-[#000000] font-poopins text-[15px] border border-gray-400 font-medium whitespace-nowrap">
                        Approx Area in sqM
                      </th>
                       <th className="px-4 py-2 text-[#000000] font-poopins text-[15px] border border-gray-400 font-medium whitespace-nowrap">
                        Buisness Potential
                      </th>
                      
                    </tr>
                  
                    <tr className="">
                      <td
                        class="px-4 py-2 text-[#72360a] font-poopins text-[15px] border border-gray-400 font-medium whitespace-nowrap"
          
                      >
                        fdfsd
                      </td>
                      <td
                        class="px-4 py-2 text-[#72360a] font-poopins text-[15px] border border-gray-400 font-medium whitespace-nowrap"
          
                      >
                        sfsdfsdfsd
                      </td>
                      <td class="px-4 py-2 text-[#72360a] font-poopins text-[15px] border border-gray-400 font-medium whitespace-nowrap">
                        dsfsdfsdf
                      </td>
                      <td class="px-4 py-2 text-[#72360a] font-poopins text-[15px] border border-gray-400 font-medium whitespace-nowrap">
                        dsdfdf
                      </td>
                      <td
                        class="px-4 py-2 text-[#72360a] font-poopins text-[15px] border border-gray-400 font-medium whitespace-nowrap"
          
                      >
                        sfdfsf
                      </td>
                      <td
                        class="px-4 py-2 text-[#72360a] font-poopins text-[15px] border border-gray-400 font-medium whitespace-nowrap"
          
                      >
                        fdsfdsf
                      </td>
                      <td
                        class="text-center px-4 py-2 text-[#72360a] font-poopins text-[15px] border border-gray-400 font-medium whitespace-nowrap"
          
                      >
                        fdfdsfdsd
                      </td>
                      <td
                        class="px-4 py-2 text-[#72360a] font-poopins text-[15px] border border-gray-400 font-medium whitespace-nowrap"
          
                      >
                        zfdfdfdf
                      </td>
                      <td
                        class="px-4 py-2 text-[#72360a] font-poopins text-[15px] border border-gray-400 font-medium whitespace-nowrap"
          
                      >
                        ddfddsf
                      </td>
                       <td
                        class="px-4 py-2 text-[#72360a] font-poopins text-[15px] border border-gray-400 font-medium whitespace-nowrap"
          
                      >
                        ddfddsf
                      </td>
                       <td
                        class="px-4 py-2 text-[#72360a] font-poopins text-[15px] border border-gray-400 font-medium whitespace-nowrap"
          
                      >
                        ddfddsf
                      </td>
                       <td
                        class="px-4 py-2 text-[#72360a] font-poopins text-[15px] border border-gray-400 font-medium whitespace-nowrap"
          
                      >
                        ddfddsf
                      </td>
                       <td
                        class="px-4 py-2 text-[#72360a] font-poopins text-[15px] border border-gray-400 font-medium whitespace-nowrap"
          
                      >
                        ddfddsf
                      </td>
                       <td
                        class="px-4 py-2 text-[#72360a] font-poopins text-[15px] border border-gray-400 font-medium whitespace-nowrap"
          
                      >
                        ddfddsf
                      </td>
                    </tr>
                  </tbody>
                </table>
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
                    <tr class="text-left">
                     
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

                    <tr class="text-left">
                      
                      <td
                        class="px-4 py-2 text-[#72360a] font-poopins text-[15px] border border-gray-400 font-medium whitespace-nowrap"
                        colspan="2"
                      >
                        sfsdfsdfsd
                      </td>
                      <td class="px-4 py-2 text-[#72360a] font-poopins text-[15px] border border-gray-400 font-medium whitespace-nowrap">
                        dsfsdfsdf
                      </td>
                      <td class="px-4 py-2 text-[#72360a] font-poopins text-[15px] border border-gray-400 font-medium whitespace-nowrap">
                        dsdfdf
                      </td>
                      <td
                        class="px-4 py-2 text-[#72360a] font-poopins text-[15px] border border-gray-400 font-medium whitespace-nowrap"
                        colspan="2"
                      >
                        sfdfsf
                      </td>
                      <td
                        class="px-4 py-2 text-[#72360a] font-poopins text-[15px] border border-gray-400 font-medium whitespace-nowrap"
                        colspan="2"
                      >
                        fdsfdsf
                      </td>
                      <td
                        class="px-4 py-2 text-[#72360a] font-poopins text-[15px] border border-gray-400 font-medium whitespace-nowrap"
                        colspan="2"
                      >
                        fdfdsfd
                      </td>
                      <td
                        class="px-4 py-2 text-[#72360a] font-poopins text-[15px] border border-gray-400 font-medium whitespace-nowrap"
                        colspan="2"
                      >
                        zfdfdfdf
                      </td>
                      <td
                        class="px-4 py-2 text-[#72360a] font-poopins text-[15px] border border-gray-400 font-medium whitespace-nowrap"
                        colspan="2"
                      >
                        ddfddsf
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
              onClick={() => {
                setIsViewReportOpen(false);
              }}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminViewAnnualReport;
