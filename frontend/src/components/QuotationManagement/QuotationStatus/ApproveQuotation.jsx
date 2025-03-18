import React, { useEffect } from "react";

const ApproveQuotation = ({ message, setAcceptQuotationPopup }) => {
  useEffect(() => {
    const timer = setTimeout(() => setAcceptQuotationPopup(false),9000);
    return () => clearTimeout(timer);
  }, [setAcceptQuotationPopup]);

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center"
      style={{ pointerEvents: "none" }}
    >
      <div className="bg-white md:w-[450px] pt-0 pb-4 rounded-[6px] flex flex-col">
        <h2 className="text-white text-[20px] font-poopins font-semibold mb-2 px-0 py-2 text-center bg-bgDataNew rounded-t-[5px]">
          Upload Document with Template
        </h2>

        <div className="mt-5 md:mt-5 mb-5 md:mb-5 px-4 flex flex-col justify-center gap-2">
          <p className="text-lg font-bold text-black">{message}</p>
        </div>
      </div>
    </div>
  );
};

export default ApproveQuotation;
