import React from "react";

const ViewUserModal = ({ setViewModalOpen, selectedRole }) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-white w-[450px] pt-0 pb-4 rounded-[6px] flex flex-col">
        <h2 className="text-white text-[20px] font-poopins mb-2 px-0 py-2 text-center bg-bgDataNew rounded-t-[5px]">
          Role Details
        </h2>
        <div className="mt-5 md:mt-6 px-6 flex flex-col gap-2">
          <div className="flex items-center gap-3">
            <label className="font-poppins font-semibold text-[18px] text-bgData">
              Role
            </label>
            <p className="font-poppins font-semibold text-[18px]">:</p>
            <p>{selectedRole.role_name}</p>
          </div>
          <div className="flex items-center gap-3">
            <label className="font-poppins font-semibold text-[18px] text-bgData">
              Description
            </label>
            <p className="font-poppins font-semibold text-[18px]">:</p>
            <p>{selectedRole.role_description}</p>
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
