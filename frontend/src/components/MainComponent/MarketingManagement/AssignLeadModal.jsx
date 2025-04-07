import React from "react";
import SuccessMessage from "../../AlertMessage/SuccessMessage";
import ErrorMessage from "../../AlertMessage/ErrorMessage";

const AssignLeadModal = ({
  setIsAssignModalOpen,
  userDataWithRole,
  leadData,
  setLeadData,
  addLeadFormErrors,
  addLeadFlashMessage,
  addLeadFlashMsgType,
  handleLeadChange,
  handleSubmitAddLead,
  allCustomers,
  handleLeadCustomerChange,
  customerAddress
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
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
        <div className="bg-white w-[850px] pt-0 pb-4 rounded-[6px] flex flex-col">
          <h2 className="text-white text-[20px] font-poopins mb-2 px-0 py-2 text-center bg-bgDataNew rounded-t-[5px]">
            Add New Lead
          </h2>
          <div className="mt-5 md:mt-6 px-4 grid grid-cols-1 md:grid-cols-2 gap-4 overflow-y-auto h-fit">
            <div>
              <label className="font-poppins font-medium text-textdata text-bgData">
                Select Customer:
              </label>
              <select
                name="customer_id"
                value={leadData?.customer_id || ""}
                onChange={handleLeadCustomerChange}
                className="block w-full text-textdata mb-2 rounded-[5px] border border-solid border-[#473b33] focus:border-[#473b33] dark:focus:border-[#473b33] px-3 py-2"
              >
                <option value="">Select the Customer</option>

                {/* Dynamic customer options */}
                {allCustomers?.data?.map((customer) => (
                  <option key={customer.id} value={customer.id}>
                    {customer.company_name}
                  </option>
                ))}
              </select>

              {addLeadFormErrors?.customer_id && (
                <p className="text-red-500">{addLeadFormErrors?.customer_id}</p>
              )}
            </div>
            {leadData?.customer_id &&(
            <div>
              <label className="font-poppins font-medium text-textdata text-bgData">
                Select address:
              </label>
              <select
                name="lead_address"
                value={leadData?.lead_address || ""}
                onChange={handleLeadChange}
                className="block w-full mb-2 rounded-[5px] border border-solid border-[#473b33] focus:border-[#473b33] dark:focus:border-[#473b33] px-3 py-2"
              >
                <option value="">Select the Address</option>

                {/* Dynamic customer options */}
                {customerAddress?.data?.addresses?.map((address,index) => (
                  <option key={index} value={address}>
                    {address}
                  </option>
                ))}
              </select>


            </div>
            )}

            <div>
              <label className="font-poppins font-medium text-textdata text-bgData">
                 Lead Source :
              </label>
              <select
                name="lead_source"
                value={leadData?.lead_source}
                onChange={handleLeadChange}
                className="block w-full mb-2 rounded-[5px] border border-solid border-[#473b33] focus:border-[#473b33] dark:focus:border-[#473b33] px-3 py-2"
              >
                <option>Select the lead source</option>
                <option value="Marketing">Marketing</option>
                  <option value="Sales">Sales</option>
                  <option value="Reference">Reference</option>
                  <option value="Direct">Direct</option>
              </select>
              {addLeadFormErrors?.lead_source && (
                <p className="text-red-500">{addLeadFormErrors?.lead_source}</p>
              )}
            </div>

            <div>
              <label className="font-poppins font-medium text-textdata text-bgData">
                 Lead Status :
              </label>
              <select
                name="lead_status"
                value={leadData?.lead_status}
                onChange={handleLeadChange}
                className="block w-full mb-2 rounded-[5px] border border-solid border-[#473b33] focus:border-[#473b33] dark:focus:border-[#473b33] px-3 py-2"
              >
                <option>Select the Lead Status</option>
                <option value="Hot">Hot</option>
                <option value="Warm">Warm</option>
                <option value="Cold">Cold</option>
                <option value="In Discussion">In Discussion</option>
                <option value="On Hold">On Hold</option>
                <option value="Lost">Lost</option>
              </select>
              {addLeadFormErrors?.lead_status && (
                <p className="text-red-500">{addLeadFormErrors?.lead_status}</p>
              )}
            </div>

            <div>
              <label className="font-poppins font-medium text-textdata text-bgData">
                Select Sales Person :
              </label>
              <select
                name="assigned_person_id"
                value={leadData?.assigned_person_id}
                onChange={handleLeadChange}
                className="block w-full mb-2 rounded-[5px] border border-solid border-[#473b33] focus:border-[#473b33] dark:focus:border-[#473b33] px-3 py-2"
              >
                <option value="">Select the Person</option>
                {userDataWithRole?.data?.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.fullname}
                  </option>
                ))}
              </select>
              {addLeadFormErrors?.assigned_person_id && (
                <p className="text-red-500">
                  {addLeadFormErrors?.assigned_person_id}
                </p>
              )}
            </div>

            <div>
              <label className="font-poppins font-medium text-textdata text-bgData">
                Select assign date :
              </label>
              <input
                type="date"
                name="assign_date"
                value={leadData?.assign_date}
                onChange={handleLeadChange}
                placeholder="Select Date"
                className="block w-full mb-2 rounded-[5px] border border-solid border-[#473b33] focus:border-[#473b33] dark:focus:border-[#473b33] px-3 py-2"
                min={new Date().toISOString().split("T")[0]}
              />
              {addLeadFormErrors?.assign_date && (
                <p className="text-red-500">{addLeadFormErrors?.assign_date}</p>
              )}
            </div>

            <div className="md:col-span-2">
              <label className="font-poppins font-medium text-textdata text-bgData">
                 Description :
              </label>
              <textarea
                type="text"
                name="lead_summary"
                value={leadData?.lead_summary}
                onChange={handleLeadChange}
                placeholder="description"
                className="block w-full mb-2 rounded-[5px] border border-solid border-[#473b33] focus:border-[#473b33] dark:focus:border-[#473b33] px-3 py-2"
              />
              {addLeadFormErrors?.lead_summary && (
                <p className="text-red-500">
                  {addLeadFormErrors?.lead_summary}
                </p>
              )}
            </div>
          </div>
          
          <div className="flex items-end justify-end gap-2 px-4">
            <button
              className="bg-bgDataNew text-white px-3 py-2 rounded mt-2 hover:bg-[#cb6f2ad9]"
              onClick={handleSubmitAddLead}
            >
              Add Lead
            </button>
            <button
              className="mt-4 bg-gray-500 text-white px-3 py-2 rounded hover:bg-gray-600"
              onClick={() => setIsAssignModalOpen(false)}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AssignLeadModal;
