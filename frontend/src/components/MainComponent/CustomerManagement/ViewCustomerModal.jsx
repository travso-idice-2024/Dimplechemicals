import React from "react";

const ViewCustomerModal = ({ setViewModalOpen, selectedCustomer }) => {
  console.log(selectedCustomer);
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-white w-[550px] pt-0 pb-4 rounded-[6px] flex flex-col">
      <h2 className="text-white text-[20px] font-poppins mb-2 px-0 py-2 text-center bg-bgDataNew rounded-t-[5px]">
          Customer Details
        </h2>
        <div className="mt-5 md:mt-6 px-6 flex flex-col gap-2">
          <div className="flex items-center gap-3">
            <label className="font-poppins font-semibold text-textdata text-bgData">
              Company Name
            </label>
            <p className="font-poppins font-semibold text-textdata">:</p>
            <p className="text-textdata">{selectedCustomer.company_name}</p>
          </div>
          <div className="flex items-center gap-3">
            <label className="font-poppins font-semibold text-textdata text-bgData">
              Client Name
            </label>
            <p className="font-poppins font-semibold text-textdata">:</p>
            <p className="text-textdata">{selectedCustomer.client_name}</p>
          </div>
          <div className="flex items-center gap-3">
            <label className="font-poppins font-semibold text-textdata text-bgData">
            Designation
            </label>
            <p className="font-poppins font-semibold text-textdata">:</p>
            <p className="text-textdata">{selectedCustomer.designation}</p>
          </div>
          <div className="flex items-center gap-3">
            <label className="font-poppins font-semibold text-textdata text-bgData">
            Primary Contact 
            </label>
            <p className="font-poppins font-semibold text-textdata">:</p>
            <p className="text-textdata">{selectedCustomer.primary_contact}</p>
          </div>
          <div className="flex items-center gap-3">
            <label className="font-poppins font-semibold text-textdata text-bgData">
            Email ID 
            </label>
            <p className="font-poppins font-semibold text-textdata">:</p>
            <p className="text-textdata">{selectedCustomer.email_id}</p>
          </div>
          <div className="flex items-center gap-3">
            <label className="font-poppins font-semibold text-textdata text-bgData">
            Address 
            </label>
            <p className="font-poppins font-semibold text-textdata">:</p>
            <p className="text-textdata">{selectedCustomer.address}</p>
          </div>
          <div className="flex items-center gap-3">
            <label className="font-poppins font-semibold text-textdata text-bgData">
            Location 
            </label>
            <p className="font-poppins font-semibold text-textdata">:</p>
            <p className="text-textdata">{selectedCustomer.location}</p>
          </div>
          <div className="flex items-center gap-3">
            <label className="font-poppins font-semibold text-textdata text-bgData">
            Pincode 
            </label>
            <p className="font-poppins font-semibold text-textdata">:</p>
            <p className="text-textdata">{selectedCustomer.pincode}</p>
          </div>
          <div className="flex items-center gap-3">
            <label className="font-poppins font-semibold text-textdata text-bgData">
            Pan No 
            </label>
            <p className="font-poppins font-semibold text-textdata">:</p>
            <p className="text-textdata">{selectedCustomer.pan_no}</p>
          </div>
          <div className="flex items-end justify-end gap-2">
            <button
              className="mt-4 bg-gray-500 text-texdata text-white px-3 py-2 rounded hover:bg-gray-600"
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

export default ViewCustomerModal;
