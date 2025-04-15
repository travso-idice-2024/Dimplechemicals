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
  return (
    <>
    <div className="fixed top-5 right-5 z-50">
    {deleteFlashMessage && deleteFlashMsgType  === "success" && <SuccessMessage message={deleteFlashMessage} />}
    {deleteFlashMessage && deleteFlashMsgType  === "error" && <ErrorMessage message={deleteFlashMessage} />}
  </div>
  <div
        className="overflow-x-auto"
      >
        <table className="table-auto w-full text-left border-collapse">
      <thead>
        <tr className="bg-[#473b33] rounded-[8px]">
          <th className="px-4 py-2 text-left text-bgDataNew text-newtextdata"></th>
          <th className="px-4 py-2 text-left text-bgDataNew text-newtextdata">Id</th>
          <th className="px-4 py-2 text-left text-bgDataNew text-newtextdata">Cust Id</th>
          <th className="px-4 py-2 text-left text-bgDataNew text-newtextdata">Company Name</th>
          <th className="px-4 py-2 text-left text-bgDataNew text-newtextdata">Client Name </th>
          <th className="px-4 py-2 text-left text-bgDataNew text-newtextdata">Email</th>
          <th className="px-4 py-2 text-left text-bgDataNew text-newtextdata">location</th>
          <th className="px-4 py-2 text-left text-bgDataNew text-newtextdata">
            Phone Number
          </th>
          <th className="px-4 py-2 text-left text-bgDataNew text-newtextdata">
            Action
          </th>
          
        </tr>
      </thead>
      <tbody>
        {customers?.map((user, index) => (
          <tr key={index}>
            <td className="px-4 py-2 text-newtextdata"><input type="checkbox" className="w-4 h-4 accent-orange-500" /></td>
            <td className="px-4 py-2 text-newtextdata">{index + 1}</td>
            <td className="px-4 py-2 text-newtextdata">{user.cust_id}</td>
            <td className="px-4 py-2 text-newtextdata">{user.company_name}</td>
            <td className="px-4 py-2 text-newtextdata">{user.client_name}</td>
            <td className="px-4 py-2 text-newtextdata">{user.email_id}</td>
            <td className="px-4 py-2 text-newtextdata">{user.location}</td>
            <td className="px-4 py-2 text-newtextdata">{user.primary_contact}</td>
            <td className="px-4 py-2 text-newtextdata space-x-2 text-center">
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
