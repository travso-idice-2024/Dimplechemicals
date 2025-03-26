import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listCustomers, removeCustomer } from "../../../redux/customerSlice";
import SuccessMessage from "../../AlertMessage/SuccessMessage";
import ErrorMessage from "../../AlertMessage/ErrorMessage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faEye } from "@fortawesome/free-solid-svg-icons";



const CustomerTable = ({
  customers,
  setEditCustomerModalOpen,
  setViewModalOpen,
  selectedCustomer,
  setSelectedCustomer,
  setIsAssignModalOpen,
  deleteFlashMessage,
  deleteFlashMsgType,
  handleDeleteFlashMessage,
  handleDelete
}) => {

  const dispatch = useDispatch();

  // const [flashMessage, setFlashMessage] = useState("");
  // const [flashMsgType, setFlashMsgType] = useState("");


  // // Function to show flash messages
  // const handleFlashMessage = (message, type) => {
  //   setFlashMessage(message);
  //   setFlashMsgType(type);
  //   setTimeout(() => {
  //     setFlashMessage("");
  //     setFlashMsgType("");
  //   }, 3000); // Hide the message after 3 seconds
  // };

  // const handleDelete = async (id) => {
    
  //     try {
  //       await dispatch(removeCustomer(id)).unwrap();
  //       handleFlashMessage("Customer deleted successfully!", "success");
  //       dispatch(listCustomers()); // Refresh customer list
  //     } catch (error) {
  //       handleFlashMessage(error?.message || "Failed to delete customer", "error");
  //     }
    
  // };


  return (
    <>
    <div className="fixed top-5 right-5 z-50">
    {deleteFlashMessage && deleteFlashMsgType  === "success" && <SuccessMessage message={deleteFlashMessage} />}
    {deleteFlashMessage && deleteFlashMsgType  === "error" && <ErrorMessage message={deleteFlashMessage} />}
  </div>
    <div className="overflow-x-auto">
    <table className="min-w-full table-auto">
      <thead>
        <tr className="bg-[#473b33] rounded-[8px]">
          <th className="px-4 py-2 text-left text-bgDataNew text-textdata"></th>
          <th className="px-4 py-2 text-left text-bgDataNew text-textdata">Id</th>
          <th className="px-4 py-2 text-left text-bgDataNew text-textdata">Company Name</th>
          <th className="px-4 py-2 text-left text-bgDataNew text-textdata">Client Name </th>
          <th className="px-4 py-2 text-left text-bgDataNew text-textdata">Email</th>
          <th className="px-4 py-2 text-left text-bgDataNew text-textdata">location</th>
          <th className="px-4 py-2 text-left text-bgDataNew text-textdata">
            Phone Number
          </th>
          <th className="px-4 py-2 text-left text-bgDataNew text-textdata">
            Action
          </th>
          
        </tr>
      </thead>
      <tbody>
        {customers?.map((user, index) => (
          <tr key={index}>
            <td className="px-4 py-2 text-textdata"><input type="checkbox" className="w-4 h-4 accent-orange-500" /></td>
            <td className="px-4 py-2 text-textdata">{index + 1}</td>
            <td className="px-4 py-2 text-textdata">{user.company_name}</td>
            <td className="px-4 py-2 text-textdata">{user.client_name}</td>
            <td className="px-4 py-2 text-textdata">{user.email_id}</td>
            <td className="px-4 py-2 text-textdata">{user.location}</td>
            <td className="px-4 py-2 text-textdata">{user.primary_contact}</td>
            <td className="px-4 py-2 text-textdata space-x-2 text-center">
            {/* <button
                className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-700 mb-2"
                onClick={() => {
                setSelectedCustomer(user);
                setIsAssignModalOpen(true)
              }}
              >
                Assign Lead
       </button> */}
              <button
                className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                onClick={() => {
                  setSelectedCustomer(user);
                  setViewModalOpen(true);
                }}
              >
                <FontAwesomeIcon icon={faEye} />

              </button>
              <button
                className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                onClick={() => {
                  setSelectedCustomer(user);
                  setEditCustomerModalOpen(true);
                }}
              >
               <FontAwesomeIcon icon={faPenToSquare} />

              </button>
              <button
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                onClick={() => {
                  if (window.confirm("Are you sure you want to delete this customer?")) {
                    handleDelete(user.id);
                  }
                }}
              >
                 <FontAwesomeIcon icon={faTrash} />

              </button>
            </td> 
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  </>
  );
};

export default CustomerTable;
