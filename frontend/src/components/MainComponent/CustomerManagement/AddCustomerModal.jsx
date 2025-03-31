import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addCustomer, listCustomers } from "../../../redux/customerSlice";
import SuccessMessage from "../../AlertMessage/SuccessMessage";
import ErrorMessage from "../../AlertMessage/ErrorMessage";

const AddCustomerModal = ({ setAddCustomerModalOpen ,handleSubmitAddCustomer,
  formData,
  setFormData,
        handleChange,
        setFormErrors,
        formErrors,
        flashMessage,
        setFlashMessage,
        setFlashMsgType,
        flashMsgType,
}) => {
 const dispatch = useDispatch();
  // const [formData, setFormData] = useState({
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

  // const [formErrors, setFormErrors] = useState({});
  // const [flashMessage, setFlashMessage] = useState("");
  // const [flashMsgType, setFlashMsgType] = useState("");

  // Handle Flash Messages
  // const handleFlashMessage = (message, type) => {
  //   setFlashMessage(message);
  //   setFlashMsgType(type);
  //   setTimeout(() => {
  //     setFlashMessage("");
  //     setFlashMsgType("");
  //   }, 3000);
  // };

  // // Handle Input Change
  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData((prevData) => ({ ...prevData, [name]: value }));

  //   // Clear error when user types
  //   setFormErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  // };

  // Validate Inputs
  // const validateInputs = () => {
  //   let errors = {};
  //   if (!formData.company_name.trim()) errors.company_name = "*Company name is required";
  //   if (!formData.client_name.trim()) errors.client_name = "*Client name is required";
  //   if (!formData.designation.trim()) errors.designation = "*Designation is required";
  //   if (!formData.primary_contact.trim()) errors.primary_contact = "*Primary contact is required";
  //   if (!formData.email_id.trim()) errors.email_id = "*Email is required";
  //   if (!formData.address.trim()) errors.address = "*Address is required";
  //   if (!formData.location.trim()) errors.location = "*Location is required";
  //   if (!formData.pincode.trim()) errors.pincode = "*Pincode is required";
  //   if (!formData.pan_no.trim()) errors.pan_no = "*PAN No is required";

  //   setFormErrors(errors);
  //   return Object.keys(errors).length === 0;
  // };

  // Handle Form Submit
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   if (validateInputs()) {
  //     try {
  //       const response = await dispatch(addCustomer(formData)).unwrap();
  //       //console.log(response);
  //       if (response?.success) {
  //         handleFlashMessage(response?.message, "success");
  //         dispatch(listCustomers());
  //         setTimeout(() => {
  //           setAddCustomerModalOpen(false);
  //         }, 3000);
  //       } else {
  //         handleFlashMessage(response?.message || "Something went wrong", "error");
  //       }
  //     } catch (error) {
  //       console.error("Error adding customer:", error);
  //       handleFlashMessage(error?.message || "An error occurred", "error");
  //     }
  //   }
  // };


  return (
    <>
     {/* Flash Messages */}
    <div className="fixed top-5 right-5 z-50">
     {flashMessage && flashMsgType === "success" && <SuccessMessage message={flashMessage} />}
     {flashMessage && flashMsgType === "error" && <ErrorMessage message={flashMessage} />}
   </div>
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-white w-[850px] pt-0 pb-4 rounded-[6px] flex flex-col">
        <h2 className="text-white text-[20px] font-poopins mb-2 px-0 py-2 text-center bg-bgDataNew rounded-t-[5px]">
          Add New Customer
        </h2>
        <div className="mt-5 md:mt-9 px-4 grid grid-cols-1 md:grid-cols-2 gap-4 overflow-y-auto h-[450px]">
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
          <p className="text-red-500 text-sm">{formErrors.company_name}</p>
        )}
          </div>
          <div>
            <label className="font-poppins font-medium text-textdata text-bgData">
               Client Name :
            </label>
            <input
              type="text"
              name="client_name"
              placeholder="Client Name"
              value={formData.client_name}
              onChange={handleChange}
              className="block w-full mb-2 rounded-[5px] border border-solid border-[#473b33] focus:border-[#473b33] dark:focus:border-[#473b33] px-3 py-2"
            />
             {formErrors.client_name && (
          <p className="text-red-500 text-sm">{formErrors.client_name}</p>
        )}
          </div>

          {/* <div>
            <label className="font-poppins font-medium text-textdata text-bgData">
               Name of Lead Owner :
            </label>
            <input
              type="text"
              placeholder="Client Name"
              className="block w-full mb-2 rounded-[5px] border border-solid border-[#473b33] focus:border-[#473b33] dark:focus:border-[#473b33] px-3 py-2"
            />
          </div> */}

          {/* <div>
            <label className="font-poppins font-medium text-textdata text-bgData">
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
            <label className="font-poppins font-medium text-textdata text-bgData">
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
          <p className="text-red-500 text-sm">{formErrors.primary_contact}</p>
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
          <p className="text-red-500 text-sm">{formErrors.secondary_contact}</p>
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

         
          {/* <div>
            <label className="font-poppins font-medium text-textdata text-bgData">
               AadharNo :
            </label>
            <input
              type="number"
              placeholder="aadharNo"
              value={formData.aadharNo}
              className="block w-full mb-2 rounded-[5px] border border-solid border-[#473b33] focus:border-[#473b33] dark:focus:border-[#473b33] px-3 py-2"
            />
            {formErrors.aadharNo && (
          <p className="text-red-500 text-sm">{formErrors.aadharNo}</p>
        )}
          </div> */}

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
               Location:
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
               Address 1 :
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
               Address 2 :
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
               Address 3 :
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
               Address 4 :
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
          <button className="bg-bgDataNew text-white px-3 py-2 rounded mt-2 hover:bg-[#cb6f2ad9]"
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
