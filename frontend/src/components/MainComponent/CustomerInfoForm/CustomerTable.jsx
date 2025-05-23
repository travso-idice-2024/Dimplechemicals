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
  fetchCustomerHistory,
}) => {
  return (
    <>
      <div className="overflow-x-auto">
        <table className="table-auto w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#473b33] rounded-[8px]">
              <th className="px-4 py-2 text-left text-bgDataNew text-newtextdata"></th>
              <th className="px-4 py-2 text-left text-bgDataNew text-newtextdata">
                Id
              </th>
              <th className="px-4 py-2 text-left text-bgDataNew text-newtextdata whitespace-nowrap">
                Cust Id
              </th>
              <th className="px-4 py-2 text-left text-bgDataNew text-newtextdata whitespace-nowrap">
                Company Name
              </th>
              <th className="px-4 py-2 text-left text-bgDataNew text-newtextdata whitespace-nowrap">
                Client Name{" "}
              </th>
              <th className="px-4 py-2 text-left text-bgDataNew text-newtextdata whitespace-nowrap">
                Email
              </th>
              <th className="px-4 py-2 text-left text-bgDataNew text-newtextdata whitespace-nowrap">
                location
              </th>
              <th className="px-4 py-2 text-left text-bgDataNew text-newtextdata whitespace-nowrap">
                Phone Number
              </th>
              <th className="px-4 py-2 text-left text-bgDataNew text-newtextdata whitespace-nowrap">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {customers?.map((user, index) => (
              <tr key={index}>
                <td className="px-4 py-2 text-newtextdata whitespace-nowrap">
                  <input
                    type="checkbox"
                    className="w-4 h-4 accent-orange-500"
                  />
                </td>
                <td className="px-4 py-2 text-newtextdata whitespace-nowrap">{index + 1}</td>
                <td className="px-4 py-2 text-newtextdata whitespace-nowrap">{user.cust_id}</td>
                <td className="px-4 py-2 text-newtextdata whitespace-nowrap">{user.company_name}</td>
                <td className="px-4 py-2 text-newtextdata whitespace-nowrap">{user.client_name}</td>
                <td className="px-4 py-2 text-newtextdata whitespace-nowrap">{user.email_id}</td>
                <td className="px-4 py-2 text-newtextdata whitespace-nowrap">{user.location}</td>
                <td className="px-4 py-2 text-newtextdata whitespace-nowrap">
                  {user.primary_contact}
                </td>
                <td>
                  {" "}
                  <button
                    className="bg-bgDataNew text-white px-3 py-1 rounded hover:bg-bgDataNew text-[14px] whitespace-nowrap"
                    onClick={() => {
                      fetchCustomerHistory(user.id);
                      setViewModalOpen(true);
                    }}
                  >
                    View Info
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
