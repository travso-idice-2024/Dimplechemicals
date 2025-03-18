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
  handleEditSubmit }) => {
  
  //const dispatch = useDispatch();

  // const [editFormData, seteditFormData] = useState({
  //   company_name: "",
  //   client_name: "",
  //   designation: "",
  //   primary_contact: "",
  //   secondary_contact: "",
  //   email_id: "",
  //   address: "",
  //   location: "",
  //   pincode: "",
  //   pan_no: "",
  // });
  // const [editFormErrors, seteditFormErrors] = useState({});
  // const [flashMessage, setFlashMessage] = useState("");
  // const [flashMsgType, setFlashMsgType] = useState("");

  // useEffect(() => {
  //   if (selectedCustomer) {
  //     seteditFormData({
  //       company_name: selectedCustomer.company_name || "",
  //       client_name: selectedCustomer.client_name || "",
  //       designation: selectedCustomer.designation || "",
  //       primary_contact: selectedCustomer.primary_contact || "",
  //       secondary_contact: selectedCustomer.secondary_contact || "",
  //       email_id: selectedCustomer.email_id || "",
  //       address: selectedCustomer.address || "",
  //       location: selectedCustomer.location || "",
  //       pincode: selectedCustomer.pincode || "",
  //       pan_no: selectedCustomer.pan_no || "",
  //     });
  //   }
  // }, [selectedCustomer]);

  // const handleFlashMessage = (message, type) => {
  //   setFlashMessage(message);
  //   setFlashMsgType(type);
  //   setTimeout(() => {
  //     setFlashMessage("");
  //     setFlashMsgType("");
  //   }, 3000);
  // };
  // const handleEditChange = (e) => {
  //   const { name, value } = e.target;
  //   seteditFormData((prevData) => ({ ...prevData, [name]: value }));
  //   seteditFormErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  // };

  // const validateInputs = () => {
  //   let errors = {};
  //   if (!editFormData.company_name.trim())
  //     errors.company_name = "*Company name is required";
  //   if (!editFormData.client_name.trim())
  //     errors.client_name = "*Client name is required";
  //   if (!editFormData.designation.trim())
  //     errors.designation = "*Designation is required";
  //   if (!editFormData.primary_contact.trim())
  //     errors.primary_contact = "*Primary contact is required";
  //   if (!editFormData.email_id.trim()) errors.email_id = "*Email is required";
  //   if (!editFormData.address.trim()) errors.address = "*Address is required";
  //   if (!editFormData.location.trim()) errors.location = "*Location is required";
  //   if (!editFormData.pincode.trim()) errors.pincode = "*Pincode is required";
  //   if (!editFormData.pan_no.trim()) errors.pan_no = "*PAN No is required";

  //   seteditFormErrors(errors);
  //   return Object.keys(errors).length === 0;
  // };

  // const handleEditSubmit = async (e) => {
  //   e.preventDefault();
  //   if (validateInputs()) {
  //     try {
  //       const response = await dispatch(
  //         updateCustomer({ id: selectedCustomer.id, customerData: editFormData })
  //       ).unwrap();

  //       if (response.success) {
  //         handleFlashMessage(response.message, "success");
  //         await dispatch(listCustomers());
  //         setTimeout(() => {
  //           setEditCustomerModalOpen(false);
  //         }, 3000);
  //       } else {
  //         handleFlashMessage(
  //           response?.message || "Something went wrong",
  //           "error"
  //         );
  //       }
  //     } catch (error) {
  //       handleFlashMessage(error.message || "An error occurred", "error");
  //     }
  //   }
  // };

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
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
        <div className="bg-white w-[850px] pt-0 pb-4 rounded-[6px] flex flex-col">
          <h2 className="text-white text-[20px] font-poopins mb-2 px-0 py-2 text-center bg-bgDataNew rounded-t-[5px]">
            Edit Customer
          </h2>
          <div className="mt-5 md:mt-9 px-4 grid grid-cols-1 md:grid-cols-2 gap-4 overflow-y-auto h-[450px]">
            {/* <div>
            <label className="font-poppins font-medium text-[18px] text-bgData">
              Enter the Date :
            </label>
            <input
              type="date"
              placeholder="Date"
              className="block w-full mb-2 rounded-[5px] border border-solid border-[#473b33] focus:border-[#473b33] dark:focus:border-[#473b33] px-3 py-2"
            />
          </div> */}
            <div>
              <label className="font-poppins font-medium text-[18px] text-bgData">
                Enter the Company Name :
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
              <label className="font-poppins font-medium text-[18px] text-bgData">
                Enter the Client Name :
              </label>
              <input
                type="text"
                name="client_name"
                placeholder="Client Name"
                value={editFormData.client_name}
                onChange={handleEditChange}
                className="block w-full mb-2 rounded-[5px] border border-solid border-[#473b33] focus:border-[#473b33] dark:focus:border-[#473b33] px-3 py-2"
              />
              {editFormErrors.client_name && (
                <p className="text-red-500 text-sm">{editFormErrors.client_name}</p>
              )}
            </div>

            {/* <div>
            <label className="font-poppins font-medium text-[18px] text-bgData">
              Enter the Name of Lead Owner :
            </label>
            <input
              type="text"
              placeholder="Client Name"
              className="block w-full mb-2 rounded-[5px] border border-solid border-[#473b33] focus:border-[#473b33] dark:focus:border-[#473b33] px-3 py-2"
            />
          </div> */}

            {/* <div>
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
          </div> */}

            <div>
              <label className="font-poppins font-medium text-[18px] text-bgData">
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
              <label className="font-poppins font-medium text-[18px] text-bgData">
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
              <label className="font-poppins font-medium text-[18px] text-bgData">
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
              <label className="font-poppins font-medium text-[18px] text-bgData">
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
            <label className="font-poppins font-medium text-[18px] text-bgData">
              Enter the AadharNo :
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
              <label className="font-poppins font-medium text-[18px] text-bgData">
                Enter the PanNo :
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
              <label className="font-poppins font-medium text-[18px] text-bgData">
                Enter the PinCode :
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
              <label className="font-poppins font-medium text-[18px] text-bgData">
                Enter the Location:
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
              <label className="font-poppins font-medium text-[18px] text-bgData">
                Enter the Address :
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
          </div>
          <div className="flex items-end justify-end gap-2 px-4">
            <button
              className="bg-bgDataNew text-white px-3 py-2 rounded mt-2 hover:bg-[#cb6f2ad9]"
              onClick={handleEditSubmit}
            >
              Update Customer
            </button>
            <button
              className="mt-4 bg-gray-500 text-white px-3 py-2 rounded hover:bg-gray-600"
              onClick={() => setEditCustomerModalOpen(false)}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditUserModal;
