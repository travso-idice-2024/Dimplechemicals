import React, { useEffect, useState, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  listDepartments,
  removeDepartment,
} from "../../../redux/departmentSlice";
import SuccessMessage from "../../AlertMessage/SuccessMessage";
import ErrorMessage from "../../AlertMessage/ErrorMessage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { SidebarContext } from "../../../context/sidebarContext";

const DepartmentTable = ({
  Leads,
  setEditUserModalOpen,
  setViewModalOpen,
  setIsAssignModalOpen,
  selectedLead,
  setSelectedLead,
  deleteFlashMessage,
  deleteFlashMsgType,
  handleDeleteFlashMessage,
  handleDelete,
  updateDealFinalize,
  isLeadAssignPopup,
  setIsLeadAssignPopup,
  setSelectedPOAId,
  selectedPOAId,
  fetchCustomerHistory,
  setViewCustomerHistoryCardModalOpen
}) => {
  console.log("Leads",Leads);
  const dispatch = useDispatch();
  const { isSidebarOpen } = useContext(SidebarContext);

  return (
    <>
      <div className="fixed top-5 right-5 z-50">
        {deleteFlashMessage && deleteFlashMsgType === "success" && (
          <SuccessMessage message={deleteFlashMessage} />
        )}
        {deleteFlashMessage && deleteFlashMsgType === "error" && (
          <ErrorMessage message={deleteFlashMessage} />
        )}
      </div>
      <div
        className="overflow-x-auto"
      >
        <table className="table-auto w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#473b33] rounded-[8px] text-center">
              <th className="px-4 py-2 text-left text-bgDataNew text-newtextdata"></th>
              <th className="px-4 py-2 text-left text-bgDataNew text-newtextdata">
                Id
              </th>
              <th className="px-4 py-2 text-left text-bgDataNew text-newtextdata">
                Date
              </th>
              <th className="px-4 py-2 text-left text-bgDataNew text-newtextdata">
                Company Name{" "}
              </th>
             
              <th className="px-4 py-2 text-left text-bgDataNew text-newtextdata">
                Lead Owner
              </th>
              <th className="px-4 py-2 text-left text-bgDataNew text-newtextdata">
                Lead Source
              </th>
              <th className="px-4 py-2 text-left text-bgDataNew text-newtextdata">
                Lead status
              </th>
              <th className="px-4 py-2 text-left text-bgDataNew text-newtextdata">
                Enquiry For
              </th>
              <th className="px-4 py-2 text-left text-bgDataNew text-newtextdata">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {Leads?.map((user, index) => (
              <tr key={index} className="text-center">
                <td className="px-4 py-2 text-newtextdata">
                  <input
                    type="checkbox"
                    className="w-4 h-4 accent-orange-500"
                    checked={selectedPOAId === user.id}
                    onChange={() => {
                      setSelectedPOAId(user.id);
                      setSelectedLead(user);
                      setIsLeadAssignPopup(true);
                    }}
                  />
                </td>
                <td className="px-4 py-2 text-newtextdata">{index + 1}</td>
                <td className="px-4 py-2 text-newtextdata">
                  {user?.assign_date.split("T")[0]}
                </td>
                <td className="px-4 py-2 text-newtextdata cursor-pointer" onClick={() => {
                              fetchCustomerHistory(user?.customer?.id);
                              setViewCustomerHistoryCardModalOpen(true);
                            }}>
                  {user?.customer?.company_name}
                </td>
                {/* <td className="px-4 py-2 text-newtextdata">
                  {user?.customer?.client_name}
                </td> */}
                <td className="px-4 py-2 text-newtextdata">
                  {user?.leadOwner?.fullname}
                </td>
                <td className="px-4 py-2 text-newtextdata">
                  {user?.lead_source}
                </td>
                <td className="px-4 py-2 text-newtextdata">
                  {user?.lead_status}
                </td>
                <td className="px-4 py-2 text-newtextdata">
                  {user?.assignedPerson?.fullname}
                </td>
                <td className="px-4 py-2 text-newtextdata flex items-center space-x-2 text-center">
                  {/* <button
                className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-700 mb-2"
                onClick={() => {
                setIsAssignModalOpen(true)
              }}
              >
                Assign Lead
              </button> */}
                  <button
                    className="bg-bgDataNew text-white px-3 py-1 rounded hover:bg-green-600"
                    onClick={() => updateDealFinalize(user?.id)}
                  >
                    Deal
                  </button>
                  <button
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                    onClick={() => {
                      setSelectedLead(user);
                      setViewModalOpen(true);
                    }}
                  >
                    <FontAwesomeIcon icon={faEye} />
                  </button>
                  <button
                    className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                    onClick={() => {
                      setSelectedLead(user);
                      setEditUserModalOpen(true);
                    }}
                  >
                    <FontAwesomeIcon icon={faPenToSquare} />
                  </button>
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    onClick={() => {
                      if (
                        window.confirm(
                          "Are you sure you want to delete this lead?"
                        )
                      ) {
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

export default DepartmentTable;
