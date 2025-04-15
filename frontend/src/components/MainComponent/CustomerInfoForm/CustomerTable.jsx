import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SuccessMessage from "../../AlertMessage/SuccessMessage";
import ErrorMessage from "../../AlertMessage/ErrorMessage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faEye } from "@fortawesome/free-solid-svg-icons";



const CustomerTable = ({
  customers,
  setViewModalOpen,
  selectedCustomer,
  setSelectedCustomer,
  fetchCustomerHistory
}) => {
  return (
    <>
    <div className="overflow-x-auto">
    <table className="min-w-full table-auto">
      <thead>
        <tr className="bg-[#473b33] rounded-[8px]">
          <th className="px-4 py-2 text-left text-bgDataNew text-textdata"></th>
          <th className="px-4 py-2 text-left text-bgDataNew text-textdata">Id</th>
          <th className="px-4 py-2 text-left text-bgDataNew text-textdata">Cust Id</th>
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
            <td className="px-4 py-2 text-textdata">{user.cust_id}</td>
            <td className="px-4 py-2 text-textdata">{user.company_name}</td>
            <td className="px-4 py-2 text-textdata">{user.client_name}</td>
            <td className="px-4 py-2 text-textdata">{user.email_id}</td>
            <td className="px-4 py-2 text-textdata">{user.location}</td>
            <td className="px-4 py-2 text-textdata">{user.primary_contact}</td>
            <td> <button
                            className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                            onClick={() => {
                              fetchCustomerHistory(user.id);
                              setViewModalOpen(true);
                            }}
                          >
                            View Info
            
                          </button></td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  </>
  );
};

export default CustomerTable;
