import React from "react";

const ViewCustomerModal = ({ setViewModalOpen, selectedCustomer }) => {
  console.log(selectedCustomer);
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white w-[550px] pt-0 pb-4 rounded-[6px] flex flex-col">
        <h2 className="text-white text-[20px] font-poppins mb-2 px-0 py-2 text-center bg-bgDataNew rounded-t-[5px]">
          Customer Details
        </h2>
        <div className="mt-5 md:mt-6 px-6 flex flex-col gap-2">
          <div className="flex items-center gap-3">
            <Detail
              label="Company Name"
              value={selectedCustomer.company_name}
            />
          </div>
          <div className="flex items-center gap-3">
            <Detail label="Company Name" value={selectedCustomer.client_name} />
          </div>
          <div className="flex items-center gap-3">
            <Detail label="Designation" value={selectedCustomer.designation} />
          </div>
          <div className="flex items-center gap-3">
            <Detail
              label="Primary Contact"
              value={selectedCustomer.primary_contact}
            />
          </div>
          <div className="flex items-center gap-3">
            <Detail label="Email Id" value={selectedCustomer.email_id} />
          </div>
          <div className="flex items-center gap-3">
            <Detail label="Address" value={selectedCustomer.address} />
          </div>
          <div className="flex items-center gap-3">
            <Detail label="Location" value={selectedCustomer.location} />
          </div>
          <div className="flex items-center gap-3">
            <Detail label="Pincode" value={selectedCustomer.pincode} />
          </div>
          <div className="flex items-center gap-3">
            <Detail label="Pan No." value={selectedCustomer.pan_no} />
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

const Detail = ({ label, value }) => (
  <div className="flex items-center gap-3">
    <label className="font-poppins font-semibold text-textdata text-bgData">
      {label}
    </label>
    <p className="font-poppins font-semibold text-textdata">:</p>
    <p>{value}</p>
  </div>
);

export default ViewCustomerModal;
