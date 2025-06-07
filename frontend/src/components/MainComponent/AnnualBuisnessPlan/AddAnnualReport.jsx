import React, { useState, useEffect, useRef } from "react";
import Select from "react-select";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp, faChevronDown } from "@fortawesome/free-solid-svg-icons";

const AddAnnualReport = ({ setIsAnnualModalOpen }) => {
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

  const customerOptions = [
    { value: "SunFarma", label: "India" },
    { value: "usa", label: "USA" },
    { value: "canada", label: "Canada" },
  ]

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
        <div className="bg-white w-full md:w-[1100px]  rounded-[6px]">
          <h2 className="text-white text-[20px] font-poppins mb-2 px-0 py-2 text-center bg-bgDataNew rounded-t-[5px]">
            Add New Report
          </h2>

          <div className="p-4 mt-2 overflow-y-auto h-[440px]">
            <h3 className="mt-2 mb-2 text-bgDataNew font-poppins border w-[300px] font-medium text-[20px] text-bgData mb-0 text-center mx-auto">
              Annual Business Plan
            </h3>
            <h3 className="mt-2 mb-8 text-bgDataNew font-poppins border w-[540px] font-medium text-[17px] text-bgData mb-0 text-center mx-auto">
              Business Plan for the year 2024-2025 for Work Execution
            </h3>

            <div className="w-100 flex items-start justify-between px-0 mt-12 ">
              <div className="bg-[#e5e7eb38] rounded-[5px] w-[450px]">
                <table className="w-full border border-gray-300 text-sm table-fixed">
                  <tbody>
                    <tr className="border-b border-gray-200">
                      <td className="py-2 px-4 text-left font-bold text-gray-600 w-[40%]">
                        Name of Employee
                      </td>
                      <td className="py-2 text-right align-middle w-[5%]">:</td>
                      <td className="py-2 px-4 text-right text-gray-800 w-[55%]">
                        RAM KUMAR
                      </td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="py-2 px-4 text-left font-bold text-gray-600">
                        Employee code
                      </td>
                      <td className="py-2 text-right align-middle">:</td>
                      <td className="py-2 px-4 text-right text-gray-800">
                        GH123
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
                          Select Duration
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

            <div className="mt-8 overflow-auto">
              <h3 class="-mb-0 text-black font-poppins border bg-gray-400 py-1 rounded-t-[4px] font-medium text-[18px] text-bgData mb-0 text-center mx-auto capitalize">
                {" "}
                Customer Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-x-4 gap-y-2 px-1 mt-2">

                <div>
                  <label className="font-poppins font-medium text-textdata whitespace-nowrap text-bgData">
                    Customer Name :
                  </label>
                  <Select
                    options={customerOptions}
                    placeholder="Select Customer"
                    className="block w-full mb-2 rounded-[5px] border border-solid border-[#473b33] focus:border-[#473b33] dark:focus:border-[#473b33] py-[0.8px]"
                  />
                </div>


                <div>
                  <label className="font-poppins font-medium text-textdata whitespace-nowrap text-bgData ">
                    Business Associate code
                  </label>
                  :{" "}
                  <input
                    type="number"
                    name="company_name"
                    placeholder="Business Associate code"
                    className="block w-full mb-2 rounded-[5px] border border-solid border-[#473b33] focus:border-[#473b33] dark:focus:border-[#473b33] px-3 py-2"
                  />
                </div>

                <div>
                  <label className="font-poppins font-medium text-textdata whitespace-nowrap text-bgData">
                    Country :
                  </label>
                  <Select
                    options={countryOptions}
                    placeholder="Select Country"
                    className="block w-full mb-2 rounded-[5px] border border-solid border-[#473b33] focus:border-[#473b33] dark:focus:border-[#473b33] py-[0.8px]"
                  />
                </div>

                <div>
                  <label className="font-poppins font-medium text-textdata whitespace-nowrap text-bgData">
                    State :
                  </label>
                  <Select
                    options={stateOptions}
                    placeholder="Select State"
                    className="block w-full mb-2 rounded-[5px] border border-solid border-[#473b33] focus:border-[#473b33] dark:focus:border-[#473b33] py-[0.8px]"
                  />
                </div>

                <div>
                  <label className="font-poppins font-medium text-textdata whitespace-nowrap text-bgData">
                    City :
                  </label>
                  <Select
                    options={cityOptions}
                    placeholder="Select City"
                    className="block w-full mb-2 rounded-[5px] border border-solid border-[#473b33] focus:border-[#473b33] dark:focus:border-[#473b33] py-[0.8px]"
                  />
                </div>

                

                <div>
                  <label className="font-poppins font-medium text-textdata whitespace-nowrap text-bgData">
                    Location :
                  </label>
                  <input
                    type="text"
                    name="company_name"
                    placeholder=""
                    className="block w-full mb-2 rounded-[5px] border border-solid border-[#473b33] focus:border-[#473b33] dark:focus:border-[#473b33] px-3 py-2"
                  />
                </div>

                <div>
                  <label className="font-poppins font-medium text-textdata whitespace-nowrap text-bgData">
                    Department :
                  </label>
                  <Select
                    options={departmentOptions}
                    placeholder="Select Department"
                    className="block w-full mb-2 rounded-[5px] border border-solid border-[#473b33] focus:border-[#473b33] dark:focus:border-[#473b33] py-[0.8px]"
                  />
                </div>

                <div>
                  <label className="font-poppins font-medium text-textdata whitespace-nowrap text-bgData">
                    Project Name / Application Area :
                  </label>
                  <input
                    type="text"
                    name="company_name"
                    placeholder=""
                    className="block w-full mb-2 rounded-[5px] border border-solid border-[#473b33] focus:border-[#473b33] dark:focus:border-[#473b33] px-3 py-2"
                  />
                </div>

                <div>
                  <label className="font-poppins font-medium text-textdata whitespace-nowrap text-bgData">
                    Contact Person :
                  </label>
                  <input
                    type="number"
                    name="company_name"
                    placeholder="number"
                    className="block w-full mb-2 rounded-[5px] border border-solid border-[#473b33] focus:border-[#473b33] dark:focus:border-[#473b33] px-3 py-2"
                  />
                </div>

                <div>
                  <label className="font-poppins font-medium text-textdata whitespace-nowrap text-bgData">
                    Designation :
                  </label>
                  <input
                    type="text"
                    name="company_name"
                    placeholder="number"
                    className="block w-full mb-2 rounded-[5px] border border-solid border-[#473b33] focus:border-[#473b33] dark:focus:border-[#473b33] px-3 py-2"
                  />
                </div>

                <div>
                  <label className="font-poppins font-medium text-textdata whitespace-nowrap text-bgData">
                    Phone No. :
                  </label>
                  <input
                    type="text"
                    name="company_name"
                    placeholder="number"
                    className="block w-full mb-2 rounded-[5px] border border-solid border-[#473b33] focus:border-[#473b33] dark:focus:border-[#473b33] px-3 py-2"
                  />
                </div>

                <div>
                  <label className="font-poppins font-medium text-textdata whitespace-nowrap text-bgData">
                    Email ID :
                  </label>
                  <input
                    type="text"
                    name="company_name"
                    placeholder="number"
                    className="block w-full mb-2 rounded-[5px] border border-solid border-[#473b33] focus:border-[#473b33] dark:focus:border-[#473b33] px-3 py-2"
                  />
                </div>

                <div>
                  <label className="font-poppins font-medium text-textdata whitespace-nowrap text-bgData">
                    Technology :
                  </label>
                  <Select
                    options={technologyOptions}
                    placeholder="Select Technology"
                    className="block w-full mb-2 rounded-[5px] border border-solid border-[#473b33] focus:border-[#473b33] dark:focus:border-[#473b33] py-[0.8px]"
                  />
                </div>

                <div>
                  <label className="font-poppins font-medium text-textdata whitespace-nowrap text-bgData">
                    Approx Area in SqM :
                  </label>
                  <input
                    type="number"
                    name="company_name"
                    placeholder="number"
                    className="block w-full mb-2 rounded-[5px] border border-solid border-[#473b33] focus:border-[#473b33] dark:focus:border-[#473b33] px-3 py-2"
                  />
                </div>

                <div>
                  <label className="font-poppins font-medium text-textdata whitespace-nowrap text-bgData">
                    Business Potential :
                  </label>
                  <input
                    type="text"
                    name="company_name"
                    placeholder="Business Potential"
                    className="block w-full mb-2 rounded-[5px] border border-solid border-[#473b33] focus:border-[#473b33] dark:focus:border-[#473b33] px-3 py-2"
                  />
                </div>
              </div>
            </div>

            <div className="mt-8 overflow-auto">
              <h3 class="-mb-0 text-black font-poppins border bg-gray-400 py-1 rounded-t-[4px] font-medium text-[18px] text-bgData mb-0 text-center mx-auto capitalize">
                {" "}
                Product Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-x-4 gap-y-2 px-1 mt-2">
                <div>
                  <label className="font-poppins font-medium text-textdata whitespace-nowrap text-bgData">
                    Product Name :
                  </label>
                  <input
                    type="text"
                    name="company_name"
                    placeholder="Product Name"
                    className="block w-full mb-2 rounded-[5px] border border-solid border-[#473b33] focus:border-[#473b33] dark:focus:border-[#473b33] px-3 py-2"
                  />
                </div>

                <div>
                  <label className="font-poppins font-medium text-textdata whitespace-nowrap text-bgData">
                    Qty. :
                  </label>
                  <input
                    type="number"
                    name="company_name"
                    placeholder="Qty."
                    className="block w-full mb-2 rounded-[5px] border border-solid border-[#473b33] focus:border-[#473b33] dark:focus:border-[#473b33] px-3 py-2"
                  />
                </div>

                <div>
                  <label className="font-poppins font-medium text-textdata whitespace-nowrap text-bgData">
                    Rate :
                  </label>
                  <input
                    type="number"
                    name="company_name"
                    placeholder="Rate"
                    className="block w-full mb-2 rounded-[5px] border border-solid border-[#473b33] focus:border-[#473b33] dark:focus:border-[#473b33] px-3 py-2"
                  />
                </div>

                <div>
                  <label className="font-poppins font-medium text-textdata whitespace-nowrap text-bgData">
                    Value in Rs. :
                  </label>
                  <input
                    type="number"
                    name="company_name"
                    placeholder="Value in Rs."
                    className="block w-full mb-2 rounded-[5px] border border-solid border-[#473b33] focus:border-[#473b33] dark:focus:border-[#473b33] px-3 py-2"
                  />
                </div>

                <div>
                  <label className="font-poppins font-medium text-textdata whitespace-nowrap text-bgData">
                    GST Amt :
                  </label>
                  <input
                    type="number"
                    name="company_name"
                    placeholder="GST Amt"
                    className="block w-full mb-2 rounded-[5px] border border-solid border-[#473b33] focus:border-[#473b33] dark:focus:border-[#473b33] px-3 py-2"
                  />
                </div>

                <div>
                  <label className="font-poppins font-medium text-textdata whitespace-nowrap text-bgData">
                    Gross Sale including GST :
                  </label>
                  <input
                    type="number"
                    name="company_name"
                    placeholder="Gross Sale including GST"
                    className="block w-full mb-2 rounded-[5px] border border-solid border-[#473b33] focus:border-[#473b33] dark:focus:border-[#473b33] px-3 py-2"
                  />
                </div>

                <div>
                  <label className="font-poppins font-medium text-textdata whitespace-nowrap text-bgData">
                    Commission :
                  </label>
                  <input
                    type="number"
                    name="company_name"
                    placeholder="Commission"
                    className="block w-full mb-2 rounded-[5px] border border-solid border-[#473b33] focus:border-[#473b33] dark:focus:border-[#473b33] px-3 py-2"
                  />
                </div>

                <div>
                  <label className="font-poppins font-medium text-textdata whitespace-nowrap text-bgData">
                    Net Sale including GST :
                  </label>
                  <input
                    type="number"
                    name="company_name"
                    placeholder="Net Sale including GST"
                    className="block w-full mb-2 rounded-[5px] border border-solid border-[#473b33] focus:border-[#473b33] dark:focus:border-[#473b33] px-3 py-2"
                  />
                </div>
              </div>
            </div>
            {/* Product List */}
            {/* <h3 className="mt-12 mb-2 text-bgDataNew font-poppins border w-[300px] font-medium text-[20px] text-bgData mb-0 text-center mx-auto">
              Products
            </h3>

            <div className="px-4">
             
            </div> */}
          </div>

          <div className="flex items-end justify-end gap-2 px-4 my-4">
            <button
              type="submit"
              className="bg-bgDataNew text-white px-3 py-2 rounded hover:bg-[#cb6f2ad9]"
            >
              Submit
            </button>
            <button
              type="button"
              className="bg-gray-500 text-white px-3 py-2 rounded hover:bg-gray-600"
              onClick={() => setIsAnnualModalOpen(false)}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddAnnualReport;
