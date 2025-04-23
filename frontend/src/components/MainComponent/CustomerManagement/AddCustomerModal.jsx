import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addCustomer, listCustomers } from "../../../redux/customerSlice";
import SuccessMessage from "../../AlertMessage/SuccessMessage";
import ErrorMessage from "../../AlertMessage/ErrorMessage";

const AddCustomerModal = ({
  setAddCustomerModalOpen,
  handleSubmitAddCustomer,
  formData,
  setFormData,
  handleChange,
  setFormErrors,
  formErrors,
  flashMessage,
  setFlashMessage,
  setFlashMsgType,
  flashMsgType,
  bussinesasociatedata,
}) => {
  const dispatch = useDispatch();
  const [associatePopup, setAssociatePopup] = useState(false);
  const [successMessage, setSuccessMessage] = useState(""); // ✅ New state for success message

  const handleAddAssociate = () => {
    // Save associate_name to business_associate field (if needed)
    setFormData((prev) => ({
      ...prev,
      associate_name: prev.associate_name, // Clear input field
    }));

    // ✅ Show success message
    // setSuccessMessage("Business Associate added successfully!");

    // // ✅ Clear message after 3 seconds
    // setTimeout(() => {
    //   setSuccessMessage("");
    //   handleAssociatePopup();
    // }, 3000);
  };

  const handleAssociatePopup = () => {
    setAssociatePopup(true);
  };

  return (
    <>
      {/* Flash Messages */}
      <div className="fixed top-5 right-5 z-50">
        {flashMessage && flashMsgType === "success" && (
          <SuccessMessage message={flashMessage} />
        )}
        {flashMessage && flashMsgType === "error" && (
          <ErrorMessage message={flashMessage} />
        )}
      </div>
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-white w-[1150px] pt-0 pb-4 rounded-[6px] flex flex-col">
          <h2 className="text-white text-[20px] font-poopins mb-2 px-0 py-2 text-center bg-bgDataNew rounded-t-[5px]">
            Add New Customer
          </h2>
          <div className="mt-5 md:mt-5 px-4 grid grid-cols-1 md:grid-cols-4 gap-4 overflow-y-auto h-[450px]">
            {/* <div>
            <label className="font-poppins font-medium text-textdata text-bgData">
               Date :
            </label>
            <input
              type="date"
              placeholder="Date"
              className="block w-full mb-2 rounded-[5px] border border-solid border-[#473b33] focus:border-[#473b33] dark:focus:border-[#473b33] px-3 py-2"
            />
          </div> */}
            <div>
              <label className="font-poppins font-medium text-textdata text-bgData">
                Company Name :
              </label>
              <input
                type="text"
                name="company_name"
                placeholder="Company Name"
                value={formData.company_name}
                onChange={handleChange}
                className="block w-full mb-2 rounded-[5px] border border-solid border-[#473b33] focus:border-[#473b33] dark:focus:border-[#473b33] px-3 py-2"
              />
              {formErrors.company_name && (
                <p className="text-red-500 text-sm">
                  {formErrors.company_name}
                </p>
              )}
            </div>
            <div>
              <label className="font-poppins font-medium text-textdata text-bgData">
                Contact person Name 1:
              </label>
              <input
                type="text"
                name="contact_persion1"
                placeholder="Contact Person 1"
                value={formData.contact_persion1}
                onChange={handleChange}
                className="block w-full mb-2 rounded-[5px] border border-solid border-[#473b33] focus:border-[#473b33] dark:focus:border-[#473b33] px-3 py-2"
              />
              {formErrors.contact_persion1 && (
                <p className="text-red-500 text-sm">{formErrors.contact_persion1}</p>
              )}
            </div>

            <div>
              <label className="font-poppins font-medium text-textdata text-bgData">
                Contact person Name 2 :
              </label>
              <input
                type="text"
                name="contact_persion2"
                placeholder="Contact Persion 2"
                value={formData.contact_persion2}
                onChange={handleChange}
                className="block w-full mb-2 rounded-[5px] border border-solid border-[#473b33] focus:border-[#473b33] dark:focus:border-[#473b33] px-3 py-2"
              />
              {formErrors.contact_persion2 && (
                <p className="text-red-500 text-sm">
                  {formErrors.contact_persion2}
                </p>
              )}
            </div>

            <div>
              <label className="font-poppins font-medium text-textdata text-bgData">
                Contact person Name 3:
              </label>
              <input
                type="text"
                name="contact_persion3"
                placeholder="Contact Persion 3"
                value={formData.contact_persion3}
                onChange={handleChange}
                className="block w-full mb-2 rounded-[5px] border border-solid border-[#473b33] focus:border-[#473b33] dark:focus:border-[#473b33] px-3 py-2"
              />
              {formErrors.contact_persion3 && (
                <p className="text-red-500 text-sm">
                  {formErrors.contact_persion3}
                </p>
              )}
            </div>

            <div>
              <label className="font-poppins font-medium text-textdata text-bgData">
                Business Associate Name :
              </label>
              <select
                name="business_associate"
                value={formData.business_associate}
                onChange={handleChange}
                className="block w-full mb-2 rounded-[5px] border border-solid border-[#473b33] focus:border-[#473b33] dark:focus:border-[#473b33] px-3 py-2"
              >
                <option value="">Select Business Associate</option>
                {bussinesasociatedata &&
                  bussinesasociatedata.length > 0 &&
                  bussinesasociatedata.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.associate_name}
                    </option>
                  ))}
              </select>

              {formErrors.business_associate && (
                <p className="text-red-500 text-sm">
                  {formErrors.business_associate}
                </p>
              )}
            </div>

            <div onClick={handleAssociatePopup}>
              <label className="font-poppins font-medium text-textdata text-bgData "></label>
              <input
                type="text"
                value="Add Associate"
                className="block w-full mt-[22px] mb-2  text-center bg-green-500 cursor-pointer text-white rounded-[5px] border border-solid border-[#473b33] focus:border-[#473b33] dark:focus:border-[#473b33] px-3 py-2"
              />
            </div>
            {/* Associate Popup Design */}
            {associatePopup && (
              <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                <div className="bg-white w-[350px] pt-0 pb-4 rounded-[6px] flex flex-col">
                  <h2 className="text-white text-[20px] font-poopins mb-2 px-0 py-2 text-center bg-bgDataNew rounded-t-[5px]">
                    Add New Associate
                  </h2>
                  <div className="mt-5 md:mt-5 px-4 grid grid-cols-1 md:grid-cols-1 gap-4 overflow-y-auto h-fit">
                    <div>
                      <label className="font-poppins font-medium text-textdata text-bgData">
                        Associate Name :
                      </label>
                      <input
                        type="text"
                        name="associate_name"
                        value={formData.associate_name}
                        onChange={handleChange}
                        placeholder="associate name"
                        className="block w-full mb-2 rounded-[5px] border border-solid border-[#473b33] focus:border-[#473b33] dark:focus:border-[#473b33] px-3 py-2"
                      />
                    </div>
                    {/* ✅ Success message */}
                    {successMessage && (
                      <div className="text-green-600 text-sm font-medium">
                        {successMessage}
                      </div>
                    )}
                  </div>
                  <div className="flex items-end justify-end gap-2 px-4">
                    <button
                      className="bg-bgDataNew text-white px-3 py-2 rounded mt-2 hover:bg-[#cb6f2ad9]"
                      onClick={handleAddAssociate}
                    >
                      Add
                    </button>
                    <button
                      className="mt-4 bg-gray-500 text-white px-3 py-2 rounded hover:bg-gray-600"
                      onClick={() => setAssociatePopup(false)}
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            )}

            <div>
              <label className="font-poppins font-medium text-textdata text-bgData">
                Company GST no :
              </label>
              <input
                type="text"
                name="gst_number"
                placeholder="Company GST no"
                value={formData.gst_number}
                onChange={handleChange}
                className="block w-full mb-2 rounded-[5px] border border-solid border-[#473b33] focus:border-[#473b33] dark:focus:border-[#473b33] px-3 py-2"
              />
              {formErrors.gst_number && (
                <p className="text-red-500 text-sm">{formErrors.gst_number}</p>
              )}
            </div>

            <div>
              <label className="font-poppins font-medium text-textdata text-bgData">
                Enter Designation :
              </label>
              <input
                type="text"
                name="designation"
                placeholder="Designation"
                value={formData.designation}
                onChange={handleChange}
                className="block w-full mb-2 rounded-[5px] border border-solid border-[#473b33] focus:border-[#473b33] dark:focus:border-[#473b33] px-3 py-2"
              />
              {formErrors.designation && (
                <p className="text-red-500 text-sm">{formErrors.designation}</p>
              )}
            </div>

            <div>
              <label className="font-poppins font-medium text-textdata text-bgData">
                Enter Primary Contact :
              </label>
              <input
                type="number"
                name="primary_contact"
                placeholder="Primary Contact"
                value={formData.primary_contact}
                onChange={handleChange}
                className="block w-full mb-2 rounded-[5px] border border-solid border-[#473b33] focus:border-[#473b33] dark:focus:border-[#473b33] px-3 py-2"
              />
              {formErrors.primary_contact && (
                <p className="text-red-500 text-sm">
                  {formErrors.primary_contact}
                </p>
              )}
            </div>

            <div>
              <label className="font-poppins font-medium text-textdata text-bgData">
                Enter Secondary Contact :
              </label>
              <input
                type="number"
                name="secondary_contact"
                placeholder="Secondary Contact"
                value={formData.secondary_contact}
                onChange={handleChange}
                className="block w-full mb-2 rounded-[5px] border border-solid border-[#473b33] focus:border-[#473b33] dark:focus:border-[#473b33] px-3 py-2"
              />
              {formErrors.secondary_contact && (
                <p className="text-red-500 text-sm">
                  {formErrors.secondary_contact}
                </p>
              )}
            </div>

            <div>
              <label className="font-poppins font-medium text-textdata text-bgData">
                Enter Email Id :
              </label>
              <input
                type="email"
                name="email_id"
                value={formData.email_id}
                onChange={handleChange}
                placeholder="Email Id"
                className="block w-full mb-2 rounded-[5px] border border-solid border-[#473b33] focus:border-[#473b33] dark:focus:border-[#473b33] px-3 py-2"
              />
              {formErrors.email_id && (
                <p className="text-red-500 text-sm">{formErrors.email_id}</p>
              )}
            </div>

            <div>
              <label className="font-poppins font-medium text-textdata text-bgData">
                PanNo :
              </label>
              <input
                type="text"
                name="pan_no"
                placeholder="panNo"
                value={formData.pan_no}
                onChange={handleChange}
                className="block w-full mb-2 rounded-[5px] border border-solid border-[#473b33] focus:border-[#473b33] dark:focus:border-[#473b33] px-3 py-2"
              />
              {formErrors.pan_no && (
                <p className="text-red-500 text-sm">{formErrors.pan_no}</p>
              )}
            </div>
            <div>
              <label className="font-poppins font-medium text-textdata text-bgData">
                PinCode :
              </label>
              <input
                type="number"
                name="pincode"
                placeholder="pincode"
                value={formData.pincode}
                onChange={handleChange}
                className="block w-full mb-2 rounded-[5px] border border-solid border-[#473b33] focus:border-[#473b33] dark:focus:border-[#473b33] px-3 py-2"
              />
              {formErrors.pincode && (
                <p className="text-red-500 text-sm">{formErrors.pincode}</p>
              )}
            </div>
            <div>
              <label className="font-poppins font-medium text-textdata text-bgData">
                City :
              </label>
              <input
                type="text"
                name="location"
                placeholder="Enter Location"
                value={formData.location}
                onChange={handleChange}
                className="block w-full mb-2 rounded-[5px] border border-solid border-[#473b33] focus:border-[#473b33] dark:focus:border-[#473b33] px-3 py-2"
              />
              {formErrors.location && (
                <p className="text-red-500 text-sm">{formErrors.location}</p>
              )}
            </div>
            <div>
              <label className="font-poppins font-medium text-textdata text-bgData">
                Address :
              </label>
              <textarea
                type="text"
                name="address"
                placeholder="Address"
                value={formData.address}
                onChange={handleChange}
                className="block w-full mb-2 rounded-[5px] border border-solid border-[#473b33] focus:border-[#473b33] dark:focus:border-[#473b33] px-3 py-2"
              />
              {formErrors.address && (
                <p className="text-red-500 text-sm">{formErrors.address}</p>
              )}
            </div>

            <div>
              <label className="font-poppins font-medium text-textdata text-bgData">
                Reg Office Add :
              </label>
              <textarea
                type="text"
                name="address_2"
                placeholder="Address 2"
                value={formData.address_2}
                onChange={handleChange}
                className="block w-full mb-2 rounded-[5px] border border-solid border-[#473b33] focus:border-[#473b33] dark:focus:border-[#473b33] px-3 py-2"
              />
              {formErrors.address_2 && (
                <p className="text-red-500 text-sm">{formErrors.address_2}</p>
              )}
            </div>

            <div>
              <label className="font-poppins font-medium text-textdata text-bgData">
                Factory Add :
              </label>
              <textarea
                type="text"
                name="address_3"
                placeholder="Address"
                value={formData.address_3}
                onChange={handleChange}
                className="block w-full mb-2 rounded-[5px] border border-solid border-[#473b33] focus:border-[#473b33] dark:focus:border-[#473b33] px-3 py-2"
              />
              {formErrors.address_3 && (
                <p className="text-red-500 text-sm">{formErrors.address_3}</p>
              )}
            </div>

            <div>
              <label className="font-poppins font-medium text-textdata text-bgData">
                Plant / Unit Add :
              </label>
              <textarea
                type="text"
                name="address_4"
                placeholder="Address"
                value={formData.address_4}
                onChange={handleChange}
                className="block w-full mb-2 rounded-[5px] border border-solid border-[#473b33] focus:border-[#473b33] dark:focus:border-[#473b33] px-3 py-2"
              />
              {formErrors.address_4 && (
                <p className="text-red-500 text-sm">{formErrors.address_4}</p>
              )}
            </div>
          </div>
          <div className="flex items-end justify-end gap-2 px-4">
            <button
              className="bg-bgDataNew text-white px-3 py-2 rounded mt-2 hover:bg-[#cb6f2ad9]"
              //onClick={handleSubmit}
              onClick={handleSubmitAddCustomer}
            >
              Add Customer
            </button>
            <button
              className="mt-4 bg-gray-500 text-white px-3 py-2 rounded hover:bg-gray-600"
              onClick={() => setAddCustomerModalOpen(false)}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddCustomerModal;
