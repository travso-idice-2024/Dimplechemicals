import React from "react";

const ViewUserModalCR = ({ setViewModalOpen, selectedUser }) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-white md:w-[750px] pt-0 pb-4 rounded-[6px] flex flex-col">
        <h2 className="text-white text-textdata font-poopins font-semibold mb-2 px-0 py-2 text-center bg-bgDataNew rounded-t-[5px]">
          View Requirement Details
        </h2>
        <div className="mt-5 md:mt-6 px-6 flex flex-col gap-2">
          <div className="flex items-center justify gap-3">
            <label className="font-poppins font-semibold text-textdata text-bgData">
              Name
            </label>
            <p className="font-poppins font-semibold text-textdata">:</p>
            <p>{selectedUser?.name}</p>
          </div>
          <div className="flex items-center gap-3">
            <label className="font-poppins font-semibold text-textdata text-bgData">
              Email
            </label>
            <p className="font-poppins font-semibold text-textdata">:</p>
            <p>{selectedUser?.email}</p>
          </div>
          <div className="flex items-center gap-3">
            <label className="font-poppins font-semibold text-textdata text-bgData">
              Title
            </label>
            <p className="font-poppins font-semibold text-textdata">:</p>
            <p>{selectedUser?.title}</p>
          </div>
          <div className="flex items-start gap-3">
            <label className="font-poppins font-semibold text-textdata text-bgData">
              Requirement
            </label>
            <p className="font-poppins font-semibold text-textdata">:</p>
            <p>{selectedUser?.requirement}</p>
          </div>
          <div className="flex items-center gap-3">
            <label className="font-poppins font-semibold text-textdata text-bgData">
              Contact
            </label>
            <p className="font-poppins font-semibold text-textdata">:</p>
            <p>{selectedUser?.contact}</p>
          </div>
          <div className="flex items-center gap-3">
            <label className="font-poppins font-semibold text-textdata text-bgData">
              Status
            </label>
            <p className="font-poppins font-semibold text-textdata">:</p>
            <p>{selectedUser?.status}</p>
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

export default ViewUserModalCR;
