import React from "react";

const ViewCustomerModal = ({ setViewCustomerModalOpen, selectedCustomer }) => {
  console.log("selectedCustomer", selectedCustomer);
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white w-[950px] pt-0 pb-4 rounded-[6px] flex flex-col">
        <h2 className="text-white text-[20px] font-poppins mb-2 px-0 py-2 text-center bg-bgDataNew rounded-t-[5px]">
          Customer Details
        </h2>
        <div className="overflow-y-auto h-fit">
          {/* Profile Section */}
          <div className="px-5 py-4">
            <div className="flex items-center justify-between bg-[#e5e7eb61] p-2 rounded-[10px]">
              <div className="flex items-center gap-2">
                {/* <img
                  src={
                    selectedEmployee.profile_image
                      ? `${API_URL.replace("api", "")}${
                          selectedEmployee.profile_image
                        }`
                      : "https://via.placeholder.com/80"
                  }
                  alt="Profile"
                  className="w-16 h-16 rounded-full border"
                /> */}
                <div>
                  <h3 className="text-[15px] font-semibold">
                    {selectedCustomer?.customer?.company_name}
                  </h3>
                  <p className="text-gray-600 text-[12px]">
                    {selectedCustomer?.customer?.email_id}
                  </p>
                </div>
              </div>

              {/* Right Section - Status Badge with Ribbon Effect */}
              <div className="relative inline-block">
                <div className="bg-green-500 text-white font-bold px-5 py-1 rounded-l-lg pr-8 relative text-[14px]">
                  Active
                  {/* <div className="absolute top-0 right-0 h-full w-5 bg-red-500 clip-ribbon"></div> */}
                </div>
              </div>
            </div>
          </div>

          {/* Details Grid */}
          <div className="py-3 px-7">
            <div className="grid grid-cols-2 gap-4 bg-[#e5e7eb38] rounded-[5px] px-4 py-2">
              <Detail
                label="Company Name"
                value={selectedCustomer?.customer?.company_name}
              />
              <Detail
                label="Contact person Name"
                value={selectedCustomer?.customer?.contact_persion1}
              />

              <Detail
                label="Designation"
                value={selectedCustomer?.customer?.designation}
              />
              <Detail
                label="Primary Contact"
                value={selectedCustomer?.customer?.primary_contact}
              />
              <Detail
                label="Email Id"
                value={selectedCustomer?.customer?.email_id}
              />

              <Detail
                label="City"
                value={selectedCustomer?.customer?.location}
              />
              <Detail
                label="Pincode"
                value={selectedCustomer?.customer?.pincode}
              />
              <Detail
                label="Pan No."
                value={selectedCustomer?.customer?.pan_no}
              />
               <Detail label="Address" value={selectedCustomer?.customer?.address} />
            </div>
          </div>
        </div>
        {/* Buttons */}
        <div className="flex justify-end gap-2 px-6">
          <button
            className="mt-4 bg-gray-500 text-texdata text-white px-3 py-2 rounded hover:bg-gray-600"
            onClick={() => setViewCustomerModalOpen(false)}
          >
            Close
          </button>
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
