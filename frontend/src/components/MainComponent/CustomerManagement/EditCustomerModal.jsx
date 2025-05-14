import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateCustomer, listCustomers } from "../../../redux/customerSlice";
import SuccessMessage from "../../AlertMessage/SuccessMessage";
import ErrorMessage from "../../AlertMessage/ErrorMessage";

const EditUserModal = ({
  setEditCustomerModalOpen,
  selectedCustomer,
  setSelectedCustomer,
  editFormData,
  setEditFormData,
  editFormErrors,
  setEditFormErrors,
  editFlashMessage,
  setEditFlashMessage,
  editFlashMsgType,
  setEditFlashMsgType,
  handleEditChange,
  handleEditSubmit,
  bussinesasociatedata,
  handleUpdateAssociate }) => {
     
     const [associatePopup, setAssociatePopup] = useState(false);
      const [successMessage, setSuccessMessage] = useState(""); // ✅ New state for success message
    
      // const handleAddAssociate = () => {


      //   // Save associate_name to business_associate field (if needed)
      //   // setEditFormData((prev) => ({
      //   //   ...prev,
      //   //   associate_name: prev.associate_name, // Clear input field
      //   // }));
    
      //   // ✅ Show success message
      //   setSuccessMessage("Business Associate added successfully!");
    
      //   // ✅ Clear message after 3 seconds
      //   setTimeout(() => {setSuccessMessage("");
      //     handleAssociatePopup();
      //   }, 3000);
      // };
    
      const handleAssociatePopup = () => {
        setAssociatePopup(true);
      };
  
  return (
    <>
      <div className="fixed top-5 right-5 z-50">
        {editFlashMessage && editFlashMsgType === "success" && (
          <SuccessMessage message={editFlashMessage} />
        )}
        {editFlashMessage && editFlashMsgType === "error" && (
          <ErrorMessage message={editFlashMessage} />
        )}
      </div>
      <div className="fixed inset-0 p-2 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-white w-full w-full md:w-[1150px] pt-0 pb-4 rounded-[6px] flex flex-col">
          <h2 className="text-white text-[20px] font-poopins mb-2 px-0 py-2 text-center bg-bgDataNew rounded-t-[5px]">
            Edit Customer
          </h2>
          <div className="mt-5 md:mt-5 px-4 grid grid-cols-1 md:grid-cols-4 gap-4 overflow-y-auto h-[350px] md:h-fit">
            <div>
              <label className="font-poppins font-medium text-textdata whitespace-nowrap text-bgData">
                 Company Name :
              </label>
              <input
                type="text"
                name="company_name"
                placeholder="Company Name"
                value={editFormData.company_name}
                onChange={handleEditChange}
                className="block w-full mb-2 rounded-[5px] border border-solid border-[#473b33] focus:border-[#473b33] dark:focus:border-[#473b33] px-3 py-2"
              />
              {editFormErrors.company_name && (
                <p className="text-red-500 text-sm">
                  {editFormErrors.company_name}
                </p>
              )}
            </div>
            <div>
              <label className="font-poppins font-medium text-textdata whitespace-nowrap text-bgData">
              Contact person Name 1 :
              </label>
              <input
                type="text"
                name="contact_persion1"
                placeholder="Contact Persion 1"
                value={editFormData.contact_persion1}
                onChange={handleEditChange}
                className="block w-full mb-2 rounded-[5px] border border-solid border-[#473b33] focus:border-[#473b33] dark:focus:border-[#473b33] px-3 py-2"
              />
              {editFormErrors.contact_persion1 && (
                <p className="text-red-500 text-sm">{editFormErrors.contact_persion1}</p>
              )}
            </div>

            <div>
              <label className="font-poppins font-medium text-textdata whitespace-nowrap text-bgData">
              Contact person Name 2 :
              </label>
              <input
                type="text"
                name="contact_persion2"
                placeholder="Contact Persion 2"
                value={editFormData.contact_persion2}
                onChange={handleEditChange}
                className="block w-full mb-2 rounded-[5px] border border-solid border-[#473b33] focus:border-[#473b33] dark:focus:border-[#473b33] px-3 py-2"
              />
              {editFormErrors.contact_persion2 && (
                <p className="text-red-500 text-sm">{editFormErrors.contact_persion2}</p>
              )}
            </div>

            <div>
              <label className="font-poppins font-medium text-textdata whitespace-nowrap text-bgData">
              Contact person Name 3 :
              </label>
              <input
                type="text"
                name="contact_persion3"
                placeholder="Contact Persio n3"
                value={editFormData.contact_persion3}
                onChange={handleEditChange}
                className="block w-full mb-2 rounded-[5px] border border-solid border-[#473b33] focus:border-[#473b33] dark:focus:border-[#473b33] px-3 py-2"
              />
              {editFormErrors.contact_persion3 && (
                <p className="text-red-500 text-sm">{editFormErrors.contact_persion3}</p>
              )}
            </div>

            <div>
              <label className="font-poppins font-medium text-textdata whitespace-nowrap text-bgData">
                Business Associate Name :
              </label>
              <select
                name="business_associate"
                value={editFormData?.business_associate || " "}
                onChange={handleEditChange}
                className="block w-full mb-2 rounded-[5px] border border-solid border-[#473b33] focus:border-[#473b33] dark:focus:border-[#473b33] px-3 py-2"
              >
                <option value="">Select Business Associate</option>
                {bussinesasociatedata &&
                  bussinesasociatedata?.length > 0 &&
                  bussinesasociatedata?.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.associate_name}
                    </option>
                  ))}
              </select>

              {editFormErrors.business_associate && (
                <p className="text-red-500 text-sm">
                  {editFormErrors.business_associate}
                </p>
              )}
            </div>

            <div onClick={handleAssociatePopup}>
              <label className="font-poppins font-medium text-textdata whitespace-nowrap text-bgData "></label>
              <input
                type="text"
                value="Add Associate"
                className="block w-full mt-[22px] mb-2  text-center bg-green-500 cursor-pointer text-white rounded-[5px] border border-solid border-[#473b33] focus:border-[#473b33] dark:focus:border-[#473b33] px-3 py-2"
              />
            </div>
          

            <div>
              <label className="font-poppins font-medium text-textdata whitespace-nowrap text-bgData">
              Company GST no :
              </label>
              <input
                type="text"
                name="gst_number"
                placeholder="Company GST no"
                value={editFormData.gst_number}
                onChange={handleEditChange}
                className="block w-full mb-2 rounded-[5px] border border-solid border-[#473b33] focus:border-[#473b33] dark:focus:border-[#473b33] px-3 py-2"
              />
              {editFormErrors.gst_number && (
                <p className="text-red-500 text-sm">{editFormErrors.gst_number}</p>
              )}
            </div>



            <div>
              <label className="font-poppins font-medium text-textdata whitespace-nowrap text-bgData">
                Enter Designation :
              </label>
              <input
                type="text"
                name="designation"
                placeholder="Designation"
                value={editFormData.designation}
                onChange={handleEditChange}
                className="block w-full mb-2 rounded-[5px] border border-solid border-[#473b33] focus:border-[#473b33] dark:focus:border-[#473b33] px-3 py-2"
              />
              {editFormErrors.designation && (
                <p className="text-red-500 text-sm">{editFormErrors.designation}</p>
              )}
            </div>

            <div>
              <label className="font-poppins font-medium text-textdata whitespace-nowrap text-bgData">
                Enter Primary Contact :
              </label>
              <input
                type="number"
                name="primary_contact"
                placeholder="Primary Contact"
                value={editFormData.primary_contact}
                onChange={handleEditChange}
                className="block w-full mb-2 rounded-[5px] border border-solid border-[#473b33] focus:border-[#473b33] dark:focus:border-[#473b33] px-3 py-2"
              />
              {editFormErrors.primary_contact && (
                <p className="text-red-500 text-sm">
                  {editFormErrors.primary_contact}
                </p>
              )}
            </div>

            <div>
              <label className="font-poppins font-medium text-textdata whitespace-nowrap text-bgData">
                Enter Secondary Contact :
              </label>
              <input
                type="number"
                name="secondary_contact"
                placeholder="Secondary Contact"
                value={editFormData.secondary_contact}
                onChange={handleEditChange}
                className="block w-full mb-2 rounded-[5px] border border-solid border-[#473b33] focus:border-[#473b33] dark:focus:border-[#473b33] px-3 py-2"
              />
              {editFormErrors.secondary_contact && (
                <p className="text-red-500 text-sm">
                  {editFormErrors.secondary_contact}
                </p>
              )}
            </div>

            <div>
              <label className="font-poppins font-medium text-textdata whitespace-nowrap text-bgData">
                Enter Email Id :
              </label>
              <input
                type="email"
                name="email_id"
                value={editFormData.email_id}
                onChange={handleEditChange}
                placeholder="Email Id"
                className="block w-full mb-2 rounded-[5px] border border-solid border-[#473b33] focus:border-[#473b33] dark:focus:border-[#473b33] px-3 py-2"
              />
              {editFormErrors.email_id && (
                <p className="text-red-500 text-sm">{editFormErrors.email_id}</p>
              )}
            </div>

            {/* <div>
            <label className="font-poppins font-medium text-textdata whitespace-nowrap text-bgData">
               AadharNo :
            </label>
            <input
              type="number"
              placeholder="aadharNo"
              value={editFormData.aadharNo}
              className="block w-full mb-2 rounded-[5px] border border-solid border-[#473b33] focus:border-[#473b33] dark:focus:border-[#473b33] px-3 py-2"
            />
            {editFormErrors.aadharNo && (
          <p className="text-red-500 text-sm">{editFormErrors.aadharNo}</p>
        )}
          </div> */}

            <div>
              <label className="font-poppins font-medium text-textdata whitespace-nowrap text-bgData">
                 PanNo :
              </label>
              <input
                type="text"
                name="pan_no"
                placeholder="panNo"
                value={editFormData.pan_no}
                onChange={handleEditChange}
                className="block w-full mb-2 rounded-[5px] border border-solid border-[#473b33] focus:border-[#473b33] dark:focus:border-[#473b33] px-3 py-2"
              />
              {editFormErrors.pan_no && (
                <p className="text-red-500 text-sm">{editFormErrors.pan_no}</p>
              )}
            </div>
            <div>
              <label className="font-poppins font-medium text-textdata whitespace-nowrap text-bgData">
                 PinCode :
              </label>
              <input
                type="number"
                name="pincode"
                placeholder="pincode"
                value={editFormData.pincode}
                onChange={handleEditChange}
                className="block w-full mb-2 rounded-[5px] border border-solid border-[#473b33] focus:border-[#473b33] dark:focus:border-[#473b33] px-3 py-2"
              />
              {editFormErrors.pincode && (
                <p className="text-red-500 text-sm">{editFormErrors.pincode}</p>
              )}
            </div>
            <div>
              <label className="font-poppins font-medium text-textdata whitespace-nowrap text-bgData">
                 City :
              </label>
              <input
                type="text"
                name="location"
                placeholder="Enter Location"
                value={editFormData.location}
                onChange={handleEditChange}
                className="block w-full mb-2 rounded-[5px] border border-solid border-[#473b33] focus:border-[#473b33] dark:focus:border-[#473b33] px-3 py-2"
              />
              {editFormErrors.location && (
                <p className="text-red-500 text-sm">{editFormErrors.location}</p>
              )}
            </div>
            <div>
              <label className="font-poppins font-medium text-textdata whitespace-nowrap text-bgData">
                 Address  :
              </label>
              <textarea
                type="text"
                name="address"
                placeholder="Address"
                value={editFormData.address}
                onChange={handleEditChange}
                className="block w-full mb-2 rounded-[5px] border border-solid border-[#473b33] focus:border-[#473b33] dark:focus:border-[#473b33] px-3 py-2"
              />
              {editFormErrors.address && (
                <p className="text-red-500 text-sm">{editFormErrors.address}</p>
              )}
            </div>
            <div>
              <label className="font-poppins font-medium text-textdata whitespace-nowrap text-bgData">
              Reg Office Add :
              </label>
              <textarea
                type="text"
                name="address_2"
                placeholder="Address"
                value={editFormData.address_2}
                onChange={handleEditChange}
                className="block w-full mb-2 rounded-[5px] border border-solid border-[#473b33] focus:border-[#473b33] dark:focus:border-[#473b33] px-3 py-2"
              />
              {editFormErrors.address_2 && (
                <p className="text-red-500 text-sm">{editFormErrors.address_2}</p>
              )}
            </div>
            <div>
              <label className="font-poppins font-medium text-textdata whitespace-nowrap text-bgData">
              Factory Add :
              </label>
              <textarea
                type="text"
                name="address_3"
                placeholder="Address"
                value={editFormData.address_3}
                onChange={handleEditChange}
                className="block w-full mb-2 rounded-[5px] border border-solid border-[#473b33] focus:border-[#473b33] dark:focus:border-[#473b33] px-3 py-2"
              />
              {editFormErrors.address_3 && (
                <p className="text-red-500 text-sm">{editFormErrors.address_3}</p>
              )}
            </div>
            <div>
              <label className="font-poppins font-medium text-textdata whitespace-nowrap text-bgData">
              Plant / Unit Add :
              </label>
              <textarea
                type="text"
                name="address_4"
                placeholder="Address"
                value={editFormData.address_4}
                onChange={handleEditChange}
                className="block w-full mb-2 rounded-[5px] border border-solid border-[#473b33] focus:border-[#473b33] dark:focus:border-[#473b33] px-3 py-2"
              />
              {editFormErrors.address_4 && (
                <p className="text-red-500 text-sm">{editFormErrors.address_4}</p>
              )}
            </div>
          </div>
          <div className="flex items-end justify-end gap-2 px-4">
            <button
              className="bg-bgDataNew text-textdata whitespace-nowrap text-white px-3 py-2 rounded mt-2 hover:bg-[#cb6f2ad9]"
              onClick={handleEditSubmit}
            >
              Update Customer
            </button>
            <button
              className="mt-4 bg-gray-500 text-textdata whitespace-nowrap text-white px-3 py-2 rounded hover:bg-gray-600"
              onClick={() => setEditCustomerModalOpen(false)}
            >
              Close
            </button>
          </div>
        </div>
      </div>

        {/* Associate Popup Design */}
        {associatePopup && (
              <div className="fixed inset-0 p-2 bg-black/50 flex items-center justify-center z-50">
                <div className="bg-white w-full md:w-[350px] pt-0 pb-4 rounded-[6px] flex flex-col">
                  <h2 className="text-white text-[20px] font-poopins mb-2 px-0 py-2 text-center bg-bgDataNew rounded-t-[5px]">
                    Add New Associate
                  </h2>
                  <div className="mt-5 md:mt-5 px-4 grid grid-cols-1 md:grid-cols-1 gap-4 overflow-y-auto md:h-fit">
                    <div>
                      <label className="font-poppins font-medium text-textdata whitespace-nowrap text-bgData">
                        Associate Name :
                      </label>
                      <input
                        type="text"
                        name="associate_name"
                        value={editFormData?.associate_name}
                        onChange={handleEditChange}
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
                      onClick={handleUpdateAssociate}
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
    </>
  );
};

export default EditUserModal;
