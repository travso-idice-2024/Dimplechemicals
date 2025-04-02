import React from "react";

const ViewUserModal = ({ setViewModalOpen,selectedUser }) => {
    console.log("selectedUser",selectedUser);
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-white w-[450px] pt-0 pb-4 rounded-[6px] flex flex-col">
      <h2 className="text-white text-textdata font-poppins mb-2 px-0 py-2 text-center bg-bgDataNew rounded-t-[5px]">
          Lead Details
        </h2>
        <div className="mt-5 md:mt-6 px-6 flex flex-col gap-2">
          <div className="flex items-center gap-3">
            <label className="font-poppins font-semibold text-textdata text-bgData">
              Lead Name
            </label>
            <p className="font-poppins font-semibold text-textdata">:</p>
            <p>{selectedUser?.leadname}</p>
          </div>
          <div className="flex items-center gap-3">
            <label className="font-poppins font-semibold text-textdata text-bgData">
              SalesPerson Name
            </label>
            <p className="font-poppins font-semibold text-textdata">:</p>
            <p>{selectedUser?.salespersonname}</p>
          </div>
          <div className="flex items-center gap-3">
            <label className="font-poppins font-semibold text-textdata text-bgData">
              Meeting Date
            </label>
            <p className="font-poppins font-semibold text-textdata">:</p>
            <p>{selectedUser?.meetdate}</p>
          </div>
          <div className="flex items-center gap-3">
            <label className="font-poppins font-semibold text-textdata text-bgData">
              Meeting Type
            </label>
            <p className="font-poppins font-semibold text-textdata">:</p>
            <p>{selectedUser?.meettype}</p>
          </div>
          <div className="flex items-center gap-3">
            <label className="font-poppins font-semibold text-textdata text-bgData">
              Client Name
            </label>
            <p className="font-poppins font-semibold text-textdata">:</p>
            <p>{selectedUser?.clientname}</p>
          </div>
          <div className="flex items-center gap-3">
            <label className="font-poppins font-semibold text-textdata text-bgData">
              Company Name
            </label>
            <p className="font-poppins font-semibold text-textdata">:</p>
            <p>{selectedUser?.companyname}</p>
          </div>
          <div className="flex items-center gap-3">
            <label className="font-poppins font-semibold text-textdata text-bgData">
              Meeting Summary
            </label>
            <p className="font-poppins font-semibold text-textdata">:</p>
            <p>{selectedUser?.meetingSummary}</p>
          </div>
          
          <div className="flex items-end justify-end gap-2">
            <button
              className="mt-4 bg-gray-500 text-white px-3 py-2 rounded hover:bg-gray-600"
              onClick={() => setViewModalOpen(false)}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewUserModal;
