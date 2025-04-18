import React from "react";
import SuccessMessage from "../../../AlertMessage/SuccessMessage";
import ErrorMessage from "../../../AlertMessage/ErrorMessage";

const AddRoleModal = ({
  setAddUserModalOpen,
  poaData,
  handlePoaChange,
  handleSubmitPoa,
  poaFormErrors,
  poaFlashMessage,
  poaFlashMsgType,
  allCustomers,
  userDataWithRole,
  handlePoaCustomerChange,
  customerAddress
}) => {
  return (
    <>
      <div className="fixed top-5 right-5 z-50">
        {poaFlashMessage && poaFlashMsgType === "success" && (
          <SuccessMessage message={poaFlashMessage} />
        )}
        {poaFlashMessage && poaFlashMsgType === "error" && (
          <ErrorMessage message={poaFlashMessage} />
        )}
      </div>

      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-white w-[1100px] pt-0 pb-4 rounded-[6px] flex flex-col">
          <h2 className="text-white text-[20px] font-poopins mb-2 px-0 py-2 text-center bg-bgDataNew rounded-t-[5px]">
            Add New POA
          </h2>

          <form onSubmit={handleSubmitPoa}>
            <div className="mt-5 md:mt-9 px-4 grid grid-cols-1 md:grid-cols-4 gap-4 overflow-y-auto max-h-[65vh]">
              {/* Customer */}
              <div>
                <label className="font-poppins font-medium text-textdata text-bgData">
                  Select Customer:
                </label>
                <select
                  name="customer_id"
                  value={poaData?.customer_id}
                  onChange={handlePoaCustomerChange}
                  className="block w-full mb-2 rounded-[5px] border border-[#473b33] px-3 py-2"
                >
                  <option value="">Select the Customer</option>
                  {allCustomers?.data?.map((customer) => (
                    <option key={customer.id} value={customer.id}>
                      {customer.company_name}
                    </option>
                  ))}
                </select>
                {poaFormErrors?.customer_id && (
                  <p className="text-red-500">{poaFormErrors?.customer_id}</p>
                )}
              </div>
              {poaData?.customer_id &&(
            <div>
              <label className="font-poppins font-medium text-textdata text-bgData">
                Select Location:
              </label>
              <select
                name="location"
                value={poaData?.location || ""}
                onChange={handlePoaChange}
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
              {/* Contact Person Name */}
              <div>
                <label>Contact Person Name</label>
                <input
                  type="text"
                  name="contact_persion_name"
                  value={poaData.contact_persion_name}
                  onChange={handlePoaChange}
                  className="block w-full mb-2 rounded-[5px] border border-[#473b33] px-3 py-2"
                />
                {poaFormErrors?.contact_persion_name && (
                  <p className="text-red-500">
                    {poaFormErrors?.contact_persion_name}
                  </p>
                )}
              </div>

              {/* Sales Person */}
              <div>
                <label>Select Sales Person</label>
                <select
                  name="sales_persion_id"
                  value={poaData?.sales_persion_id}
                  onChange={handlePoaChange}
                  className="block w-full mb-2 rounded-[5px] border border-[#473b33] px-3 py-2"
                >
                  <option value="">Select the Person</option>
                  {userDataWithRole?.data?.map((user) => (
                    <option key={user.id} value={user.id}>
                      {user.fullname}
                    </option>
                  ))}
                </select>
                {poaFormErrors?.sales_persion_id && (
                  <p className="text-red-500">
                    {poaFormErrors?.sales_persion_id}
                  </p>
                )}
              </div>

              {/* Meeting Date */}
              <div>
                <label>Meeting Date</label>
                <input
                  type="date"
                  name="meeting_date"
                  value={poaData.meeting_date}
                  onChange={handlePoaChange}
                  className="block w-full mb-2 rounded-[5px] border border-[#473b33] px-3 py-2"
                />
                {poaFormErrors?.meeting_date && (
                  <p className="text-red-500">{poaFormErrors?.meeting_date}</p>
                )}
              </div>

              {/* Meeting Type */}
              <div>
                <label className="font-poppins font-medium text-textdata text-bgData">
                  Meeting Type
                </label>
                <select
                  name="meeting_type"
                  value={poaData.meeting_type}
                  onChange={handlePoaChange}
                  className="block w-full mb-2 rounded-[5px] border border-[#473b33] px-3 py-2"
                >
                  <option value="">Select the Meeting Type</option>
                  <option value="In-Person">In-Person</option>
                  <option value="Phone Call">Phone Call</option>
                  <option value="Video Call">Video Call</option>
                </select>
                {poaFormErrors?.meeting_type && (
                  <p className="text-red-500">{poaFormErrors?.meeting_type}</p>
                )}
              </div>

              {/* Meeting Summary */}
              <div>
                <label>Meeting Summary</label>
                <textarea
                  name="meeting_summary"
                  value={poaData.meeting_summary}
                  onChange={handlePoaChange}
                  className="block w-full mb-2 rounded-[5px] border border-[#473b33] px-3 py-2"
                />
                {poaFormErrors?.meeting_summary && (
                  <p className="text-red-500">
                    {poaFormErrors?.meeting_summary}
                  </p>
                )}
              </div>

              {/* Product Sale */}
              <div>
                <label>Product Sale</label>
                <input
                  type="text"
                  name="product_sale"
                  value={poaData.product_sale}
                  onChange={handlePoaChange}
                  className="block w-full mb-2 rounded-[5px] border border-[#473b33] px-3 py-2"
                />
                {poaFormErrors?.product_sale && (
                  <p className="text-red-500">{poaFormErrors?.product_sale}</p>
                )}
              </div>

              {/* Total Material Quantity */}
              <div>
                <label>Total Material Quantity (in Kg)</label>
                <input
                  type="number"
                  name="total_material_qty"
                  value={poaData.total_material_qty}
                  onChange={handlePoaChange}
                  className="block w-full mb-2 rounded-[5px] border border-[#473b33] px-3 py-2"
                />
                {poaFormErrors?.total_material_qty && (
                  <p className="text-red-500">
                    {poaFormErrors?.total_material_qty}
                  </p>
                )}
              </div>

              {/* Approx Business */}
              <div>
                <label>Approx Business (₹)</label>
                <input
                  type="number"
                  name="approx_business"
                  value={poaData.approx_business}
                  onChange={handlePoaChange}
                  className="block w-full mb-2 rounded-[5px] border border-[#473b33] px-3 py-2"
                />
                {poaFormErrors?.approx_business && (
                  <p className="text-red-500">
                    {poaFormErrors?.approx_business}
                  </p>
                )}
              </div>

              {/* Project Name */}
              <div>
                <label>Project Name</label>
                <input
                  type="text"
                  name="project_name"
                  value={poaData.project_name}
                  onChange={handlePoaChange}
                  className="block w-full mb-2 rounded-[5px] border border-[#473b33] px-3 py-2"
                />
                {poaFormErrors?.project_name && (
                  <p className="text-red-500">{poaFormErrors?.project_name}</p>
                )}
              </div>
            </div>

            {/* Buttons */}
            <div className="flex items-end justify-end gap-2 px-4">
              <button
                type="submit"
                className="bg-bgDataNew text-white px-3 py-2 rounded mt-4 hover:bg-[#cb6f2ad9]"
                onClick={handleSubmitPoa}
              >
                Add POA
              </button>
              <button
                type="button"
                className="mt-4 bg-gray-500 text-white px-3 py-2 rounded hover:bg-gray-600"
                onClick={() => setAddUserModalOpen(false)}
              >
                Close
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddRoleModal;
