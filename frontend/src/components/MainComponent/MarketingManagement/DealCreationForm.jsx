import React from "react";
import SuccessMessage from "../../AlertMessage/SuccessMessage";
import ErrorMessage from "../../AlertMessage/ErrorMessage";

const DealCreationForm = ({
  setIsAssignModalOpen,
  userDataWithRole,
  leadData,
  setLeadData,
  addLeadFormErrors,
  addLeadFlashMessage,
  addLeadFlashMsgType,
  setDealCreationOpenForm
}) => {
  return (
    <>
      <div className="fixed top-5 right-5 z-50">
        {addLeadFlashMessage && addLeadFlashMsgType === "success" && (
          <SuccessMessage message={addLeadFlashMessage} />
        )}
        {addLeadFlashMessage && addLeadFlashMsgType === "error" && (
          <ErrorMessage message={addLeadFlashMessage} />
        )}
      </div>
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-white w-[900px] pt-0 pb-4 rounded-[6px] flex flex-col">
          <h2 className="text-white text-[20px] font-poopins mb-2 px-0 py-2 text-center bg-bgDataNew rounded-t-[5px]">
            Add Deal
          </h2>
          <div className="mt-5 md:mt-6 px-4 grid grid-cols-1 md:grid-cols-3 gap-4 overflow-y-auto h-fit">
            <div>
              <label className="font-poppins font-medium text-textdata text-bgData">
                Date:
              </label>
              <input
                type="date"
                placeholder="Select Date"
                className="block w-full mb-2 text-gray-500 rounded-[5px] border border-solid border-[#473b33] focus:border-[#473b33] dark:focus:border-[#473b33] px-3 py-2"
              />
            </div>
            <div>
              <label className="font-poppins font-medium text-textdata text-bgData">
                Product Name:
              </label>
              <input
                type="text"
                placeholder="product name"
                className="block w-full mb-2 rounded-[5px] border border-solid border-[#473b33] focus:border-[#473b33] dark:focus:border-[#473b33] px-3 py-2"
              />
            </div>
            <div>
              <label className="font-poppins font-medium text-textdata text-bgData">
              Area - Sq mtr:
              </label>
              <input
                type="number"
                placeholder="sq mtr"
                className="block w-full mb-2 rounded-[5px] border border-solid border-[#473b33] focus:border-[#473b33] dark:focus:border-[#473b33] px-3 py-2"
              />
            </div>
            <div>
              <label className="font-poppins font-medium text-textdata text-bgData">
              Area - Cub mtr:
              </label>
              <input
                type="number"
                placeholder="cub mtr"
                className="block w-full mb-2 rounded-[5px] border border-solid border-[#473b33] focus:border-[#473b33] dark:focus:border-[#473b33] px-3 py-2"
              />
            </div>
            <div>
              <label className="font-poppins font-medium text-textdata text-bgData">
              Qunatity:
              </label>
              <input
                type="number"
                placeholder="quantity"
                className="block w-full mb-2 rounded-[5px] border border-solid border-[#473b33] focus:border-[#473b33] dark:focus:border-[#473b33] px-3 py-2"
              />
            </div>
            <div>
              <label className="font-poppins font-medium text-textdata text-bgData">
              Rate:
              </label>
              <input
                type="number"
                placeholder="rate"
                className="block w-full mb-2 rounded-[5px] border border-solid border-[#473b33] focus:border-[#473b33] dark:focus:border-[#473b33] px-3 py-2"
              />
            </div>
            <div>
              <label className="font-poppins font-medium text-textdata text-bgData">
              Amount:
              </label>
              <input
                type="number"
                placeholder="amount"
                className="block w-full mb-2 rounded-[5px] border border-solid border-[#473b33] focus:border-[#473b33] dark:focus:border-[#473b33] px-3 py-2"
              />
            </div>
            <div>
              <label className="font-poppins font-medium text-textdata text-bgData">
              Advance Amount:
              </label>
              <input
                type="number"
                placeholder="advance amount"
                className="block w-full mb-2 rounded-[5px] border border-solid border-[#473b33] focus:border-[#473b33] dark:focus:border-[#473b33] px-3 py-2"
              />
            </div>
            <div>
              <label className="font-poppins font-medium text-textdata text-bgData">
              Deal Amount:
              </label>
              <input
                type="number"
                placeholder="deal amount"
                className="block w-full mb-2 rounded-[5px] border border-solid border-[#473b33] focus:border-[#473b33] dark:focus:border-[#473b33] px-3 py-2"
              />
            </div>
           
          </div>
          
          <div className="flex items-end justify-end gap-2 px-4">
            <button
              className="bg-bgDataNew text-white px-3 py-2 rounded mt-2 hover:bg-[#cb6f2ad9]"
            >
              Add Deal
            </button>
            <button
              className="mt-4 bg-gray-500 text-white px-3 py-2 rounded hover:bg-gray-600"
              onClick={() => setDealCreationOpenForm(false)}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default DealCreationForm;
