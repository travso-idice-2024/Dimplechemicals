import React from "react";

const AddRoleModal = ({ setAddUserModalOpen }) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-white w-[850px] pt-0 pb-4 rounded-[6px] flex flex-col">
        <h2 className="text-white text-[20px] font-poopins mb-2 px-0 py-2 text-center bg-bgDataNew rounded-t-[5px]">
          Add New Customer
        </h2>
        <div className="mt-5 md:mt-9 px-4 grid grid-cols-1 md:grid-cols-2 gap-4 overflow-y-auto h-[450px]">
        <div>
            <label className="font-poppins font-medium text-[18px] text-bgData">
              Enter the Date :
            </label>
            <input
              type="date"
              placeholder="Date"
              className="block w-full mb-2 rounded-[5px] border border-solid border-[#473b33] focus:border-[#473b33] dark:focus:border-[#473b33] px-3 py-2"
            />
          </div>
          <div>
            <label className="font-poppins font-medium text-[18px] text-bgData">
              Enter the Company Name :
            </label>
            <input
              type="text"
              placeholder="Company Name"
              className="block w-full mb-2 rounded-[5px] border border-solid border-[#473b33] focus:border-[#473b33] dark:focus:border-[#473b33] px-3 py-2"
            />
          </div>
          <div>
            <label className="font-poppins font-medium text-[18px] text-bgData">
              Enter the Client Name :
            </label>
            <input
              type="text"
              placeholder="Client Name"
              className="block w-full mb-2 rounded-[5px] border border-solid border-[#473b33] focus:border-[#473b33] dark:focus:border-[#473b33] px-3 py-2"
            />
          </div>

          <div>
            <label className="font-poppins font-medium text-[18px] text-bgData">
              Enter the Name of Lead Owner :
            </label>
            <input
              type="text"
              placeholder="Client Name"
              className="block w-full mb-2 rounded-[5px] border border-solid border-[#473b33] focus:border-[#473b33] dark:focus:border-[#473b33] px-3 py-2"
            />
          </div>

          <div>
            <label className="font-poppins font-medium text-[18px] text-bgData">
              Select the Lead Source :
            </label>
            <select className="block w-full mb-2 rounded-[5px] border border-solid border-[#473b33] focus:border-[#473b33] dark:focus:border-[#473b33] px-3 py-[9px]">
              <option>Select the Source</option>
              <option value="">Marketing</option>
              <option value="">Sales</option>
              <option value="">Reference</option>
              <option value="">Direct</option>
            </select>
          </div>


          <div>
            <label className="font-poppins font-medium text-[18px] text-bgData">
              Select the Status :
            </label>
            <select className="block w-full mb-2 rounded-[5px] border border-solid border-[#473b33] focus:border-[#473b33] dark:focus:border-[#473b33] px-3 py-[9px]">
              <option>Select the Status</option>
              <option value="New">Hot</option>
              <option value="InProgress">Warm</option>
              <option value="Completed">Cold</option>
              <option value="">In Discussion</option>
              <option value="">On Hold</option>
              <option value="">Lost</option>
            </select>
          </div>

          <div>
            <label className="font-poppins font-medium text-[18px] text-bgData">
              Enter Designation :
            </label>
            <input
              type="text"
              placeholder="Designation"
              className="block w-full mb-2 rounded-[5px] border border-solid border-[#473b33] focus:border-[#473b33] dark:focus:border-[#473b33] px-3 py-2"
            />
          </div>

          <div>
            <label className="font-poppins font-medium text-[18px] text-bgData">
              Enter Primary Contact :
            </label>
            <input
              type="number"
              placeholder="Primary Contact"
              className="block w-full mb-2 rounded-[5px] border border-solid border-[#473b33] focus:border-[#473b33] dark:focus:border-[#473b33] px-3 py-2"
            />
          </div>

          <div>
            <label className="font-poppins font-medium text-[18px] text-bgData">
              Enter Secondary Contact :
            </label>
            <input
              type="number"
              placeholder="Secondary Contact"
              className="block w-full mb-2 rounded-[5px] border border-solid border-[#473b33] focus:border-[#473b33] dark:focus:border-[#473b33] px-3 py-2"
            />
          </div>

          <div>
            <label className="font-poppins font-medium text-[18px] text-bgData">
              Enter Email Id :
            </label>
            <input
              type="email"
              placeholder="Email Id"
              className="block w-full mb-2 rounded-[5px] border border-solid border-[#473b33] focus:border-[#473b33] dark:focus:border-[#473b33] px-3 py-2"
            />
          </div>

          <div>
            <label className="font-poppins font-medium text-[18px] text-bgData">
              Enter the Address :
            </label>
            <textarea
              type="text"
              placeholder="Address"
              className="block w-full mb-2 rounded-[5px] border border-solid border-[#473b33] focus:border-[#473b33] dark:focus:border-[#473b33] px-3 py-2"
            />
          </div>

          <div>
            <label className="font-poppins font-medium text-[18px] text-bgData">
              Enter the AadharNo :
            </label>
            <input
              type="number"
              placeholder="aadharNo"
              className="block w-full mb-2 rounded-[5px] border border-solid border-[#473b33] focus:border-[#473b33] dark:focus:border-[#473b33] px-3 py-2"
            />
          </div>

          <div>
            <label className="font-poppins font-medium text-[18px] text-bgData">
              Enter the PanNo :
            </label>
            <input
              type="text"
              placeholder="panNo"
              className="block w-full mb-2 rounded-[5px] border border-solid border-[#473b33] focus:border-[#473b33] dark:focus:border-[#473b33] px-3 py-2"
            />
          </div>
          <div>
            <label className="font-poppins font-medium text-[18px] text-bgData">
              Enter the PinCode :
            </label>
            <input
              type="number"
              placeholder="pincode"
              className="block w-full mb-2 rounded-[5px] border border-solid border-[#473b33] focus:border-[#473b33] dark:focus:border-[#473b33] px-3 py-2"
            />
          </div>
          <div>
            <label className="font-poppins font-medium text-[18px] text-bgData">
              Enter the Location:
            </label>
            <input
              type="text"
              placeholder="Enter Location"
              className="block w-full mb-2 rounded-[5px] border border-solid border-[#473b33] focus:border-[#473b33] dark:focus:border-[#473b33] px-3 py-2"
            />
          </div>

        </div>
        <div className="flex items-end justify-end gap-2 px-4">
          <button className="bg-bgDataNew text-white px-3 py-2 rounded mt-2 hover:bg-[#cb6f2ad9]">
            Add Customer
          </button>
          <button
            className="mt-4 bg-gray-500 text-white px-3 py-2 rounded hover:bg-gray-600"
            onClick={() => setAddUserModalOpen(false)}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddRoleModal;
