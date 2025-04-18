import React, { useEffect, useState } from "react";
import "./QuotationManageData.css";
import { useNavigate } from "react-router-dom";
import ShowQuotationDetailsData from "./ShowQuotationDetailsData";

const QuotationDetails = () => {
  const navigate = useNavigate();
  const [quotationData, setQuotationData] = useState([]);

  useEffect(() => {
    // Fetch data from localStorage
    const data = JSON.parse(localStorage.getItem("quotations")) || [];
    setQuotationData(data);
  }, []);

  return (
    <div className="main-content-holder max-h-[615px] overflow-y-auto scrollbar-hide">
      <div className="flex flex-col gap-[20px]">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-white text-textdata font-semibold flex items-center">
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
              BRD Quotation Data
            </h1>
          </div>
        </div>
        <div className="bg-bgData rounded-[8px] shadow-md shadow-black/5 text-white px-4 py-6 overflow-auto">
          {/*------- Quotation Data Start -------*/}
          <div className="grid grid-row-2 md:grid-cols-2 gap-4">
            {quotationData.map((quotation, index) => (
              <ShowQuotationDetailsData key={index} quotation={quotation} index={index} />
            ))}
          </div>
          {/*------- Quotation Data End -------*/}
        </div>

        {/* Pagination Controls with Number */}
        {/* <LeadPagination
          currentPage={currentPage}
          handlePageChange={handlePageChange}
          totalPages={totalPages}
        /> */}
      </div>
    </div>
  );
};

export default QuotationDetails;
