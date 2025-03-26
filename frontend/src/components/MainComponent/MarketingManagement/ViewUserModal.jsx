import React from "react";
import { useNavigate } from "react-router-dom";

const ViewUserModal = ({ setViewModalOpen, selectedLead }) => {
  const navigate = useNavigate();
  console.log("selectedLead",selectedLead);
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-white w-[450px] pt-0 pb-4 rounded-[6px] flex flex-col">
      <h2 className="text-white text-[20px] font-poppins mb-2 px-0 py-2 text-center bg-bgDataNew rounded-t-[5px]">
          Lead Details
        </h2>
        <div className="mt-5 md:mt-6 px-6 flex flex-col gap-2">
          <div className="flex items-center gap-3">
            <label className="font-poppins font-semibold text-[18px] text-bgData">
              Company Name
            </label>
            <p className="font-poppins font-semibold text-[18px]">:</p>
            <p>{selectedLead?.customer?.company_name}</p>
          </div>
          <div className="flex items-center gap-3">
            <label className="font-poppins font-semibold text-[18px] text-bgData">
              Client Name
            </label>
            <p className="font-poppins font-semibold text-[18px]">:</p>
            <p>{selectedLead?.customer?.client_name}</p>
          </div>
          <div className="flex items-center gap-3">
            <label className="font-poppins font-semibold text-[18px] text-bgData">
              Lead Owner
            </label>
            <p className="font-poppins font-semibold text-[18px]">:</p>
            <p>{selectedLead?.leadOwner?.fullname}</p>
          </div>
          <div className="flex items-center gap-3">
            <label className="font-poppins font-semibold text-[18px] text-bgData">
              Lead Source
            </label>
            <p className="font-poppins font-semibold text-[18px]">:</p>
            <p>{selectedLead?.lead_source}</p>
          </div>
          <div className="flex items-center gap-3">
            <label className="font-poppins font-semibold text-[18px] text-bgData">
              Lead Status
            </label>
            <p className="font-poppins font-semibold text-[18px]">:</p>
            <p>{selectedLead?.lead_status}</p>
          </div>
          <div className="flex items-center gap-3">
            <label className="font-poppins font-semibold text-[18px] text-bgData">
              Assigned Person
            </label>
            <p className="font-poppins font-semibold text-[18px]">:</p>
            <p>{selectedLead?.assignedPerson?.fullname}</p>
          </div>
          <div className="flex items-end justify-end gap-2">
          <button
              className="mt-4 bg-gray-500 text-white px-3 py-2 rounded hover:bg-gray-600"
              onClick={() => navigate(`/lead-followups/${selectedLead?.id}`)}
            >
              View Follow
            </button>
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
