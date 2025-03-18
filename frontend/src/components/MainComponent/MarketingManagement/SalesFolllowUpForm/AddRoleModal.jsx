import React from "react";

const AddRoleModal = ({ setAddUserModalOpen }) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-white w-[450px] pt-0 pb-4 rounded-[6px] flex flex-col">
        <h2 className="text-white text-[20px] font-poopins mb-2 px-0 py-2 text-center bg-bgDataNew rounded-t-[5px]">
          Add New Form
        </h2>
        <div className="mt-5 md:mt-9 px-4 flex flex-col gap-2 overflow-y-auto h-[450px]">
          

          <div>
            <label className="font-poppins font-medium text-[18px] text-bgData">
              Select Lead Name :
            </label>
            <select className="block w-full mb-2 rounded-[5px] border border-solid border-[#473b33] focus:border-[#473b33] dark:focus:border-[#473b33] px-3 py-2">
              <option>Select the Lead Name</option>
              <option value="active">Rinshu Mishra</option>
              <option value="inactive">Uma Sharma</option>
              <option value="inactive">Rishav Chaurisya</option>
              <option value="inactive">Nikhil Patankar</option>
            </select>
          </div>

          <div>
            <label className="font-poppins font-medium text-[18px] text-bgData">
              Select SalesPerson Name :
            </label>
            <select className="block w-full mb-2 rounded-[5px] border border-solid border-[#473b33] focus:border-[#473b33] dark:focus:border-[#473b33] px-3 py-2">
              <option>Select the SalesPerson Name</option>
              <option value="active">Rinshu Mishra</option>
              <option value="inactive">Uma Sharma</option>
              <option value="inactive">Rishav Chaurisya</option>
              <option value="inactive">Nikhil Patankar</option>
            </select>
          </div>


          <div>
            <label className="font-poppins font-medium text-[18px] text-bgData">
              Select Meeting Date :
            </label>
            <input
              type="date"
              placeholder="Assigned Date"
              className="block w-full mb-2 rounded-[5px] border border-solid border-[#473b33] focus:border-[#473b33] dark:focus:border-[#473b33] px-3 py-2"
            />
          </div>

          <div>
            <label className="font-poppins font-medium text-[18px] text-bgData">
              Select Meeting Type :
            </label>
            <select className="block w-full mb-2 rounded-[5px] border border-solid border-[#473b33] focus:border-[#473b33] dark:focus:border-[#473b33] px-3 py-2">
              <option>Select the Meeting Type</option>
              <option value="active">In-Person</option>
              <option value="inactive">Phone Call</option>
              <option value="inactive">Video Call</option>
            </select>
          </div>

          <div>
            <label className="font-poppins font-medium text-[18px] text-bgData">
              Enter Client Name :
            </label>
            <input
              type="text"
              placeholder="Assigned Date"
              className="block w-full mb-2 rounded-[5px] border border-solid border-[#473b33] focus:border-[#473b33] dark:focus:border-[#473b33] px-3 py-2"
            />
          </div>

          <div>
            <label className="font-poppins font-medium text-[18px] text-bgData">
              Enter Company Name :
            </label>
            <input
              type="text"
              placeholder="Assigned Date"
              className="block w-full mb-2 rounded-[5px] border border-solid border-[#473b33] focus:border-[#473b33] dark:focus:border-[#473b33] px-3 py-2"
            />
          </div>

          <div>
            <label className="font-poppins font-medium text-[18px] text-bgData">
              Mention the Meeting Summary :
            </label>
            <textarea
              type="text"
              placeholder="Address"
              className="block w-full mb-2 rounded-[5px] border border-solid border-[#473b33] focus:border-[#473b33] dark:focus:border-[#473b33] px-3 py-2"
            />
          </div>

        </div>
        <div className="flex items-end justify-end gap-2 px-4">
          <button className="bg-bgDataNew text-white px-3 py-2 rounded mt-2 hover:bg-[#cb6f2ad9]">
            Add Assignment
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
