import React, { useEffect, useState, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listUsers, removeUser } from "../../../../redux/userSlice";
import SuccessMessage from "../../../AlertMessage/SuccessMessage";
import ErrorMessage from "../../../AlertMessage/ErrorMessage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { SidebarContext } from "../../../../context/sidebarContext";

const EmployeeTable = ({
  Employees,
  setEditUserModalOpen,
  setViewModalOpen,
  selectedEmployee,
  setSelectedEmployee,
  deleteFlashMessage, // ✅ Get delete message
  deleteFlashMsgType,
  handleDelete, // ✅ Get delete type
}) => {
  const dispatch = useDispatch();
  const { isSidebarOpen } = useContext(SidebarContext);

  return (
    <>
      <style>
        {`
    .custom-scrollbar::-webkit-scrollbar {
      height: 10px;
      cursor: pointer;
    }
    .custom-scrollbar::-webkit-scrollbar-thumb {
      background-color: gray; /* Tailwind orange-500 */
      border-radius: 8px;
      cursor: pointer;
    }
    .custom-scrollbar::-webkit-scrollbar-track {
      background: transparent;
      cursor: pointer;
    }

    /* For Firefox */
    .custom-scrollbar {
      scrollbar-width: thin;
      // scrollbar-color: gray transparent;
      cursor: pointer;
    }
  `}
      </style>

      <div className="fixed top-5 right-5 z-50">
        {deleteFlashMessage && deleteFlashMsgType === "success" && (
          <SuccessMessage message={deleteFlashMessage} />
        )}
        {deleteFlashMessage && deleteFlashMsgType === "error" && (
          <ErrorMessage message={deleteFlashMessage} />
        )}
      </div>
      <div className={`overflow-x-auto custom-scrollbar`}>
        <table className="table-auto w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#473b33] rounded-[8px] text-center">
              {/* <th className="px-4 py-2 text-left text-bgDataNew text-newtextdata whitespace-nowrap ">
                Id
              </th> */}
              <th className="px-4 py-2 text-left text-bgDataNew text-newtextdata whitespace-nowrap ">
                Emp ID
              </th>
              <th className="px-4 py-2 text-left text-bgDataNew text-newtextdata whitespace-nowrap ">
                Name
              </th>
              <th className="px-4 py-2 text-left text-bgDataNew text-newtextdata whitespace-nowrap ">
                email
              </th>
              <th className="px-4 py-2 text-left text-bgDataNew text-newtextdata whitespace-nowrap ">
                Reporting Manager
              </th>

              <th className="px-4 py-2 text-left text-bgDataNew text-newtextdata whitespace-nowrap ">
                Phone
              </th>
              <th className="px-4 py-2 text-left text-bgDataNew text-newtextdata whitespace-nowrap ">
                Status
              </th>
              <th className="px-4 py-2 text-left text-bgDataNew text-newtextdata whitespace-nowrap ">
                Leaves
              </th>

              {/* <th className="px-4 py-2 text-left text-bgDataNew text-newtextdata whitespace-nowrap ">Role</th> */}
              <th className="px-4 py-2 text-left text-bgDataNew text-newtextdata whitespace-nowrap ">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {Employees?.map((user, index) => (
              <tr key={index} className="">
                {/* <td className="px-4 py-2 text-newtextdata whitespace-nowrap ">{index + 1}</td> */}
                <td className="px-4 py-2 text-newtextdata whitespace-nowrap ">
                  {user?.emp_id}
                </td>
                <td
                  className="px-4 py-2 text-newtextdata whitespace-nowrap  cursor-pointer"
                  onClick={() => {
                    setSelectedEmployee(user);
                    setViewModalOpen(true);
                  }}
                >
                  {user?.fullname}
                </td>
                <td className="px-4 py-2 text-newtextdata whitespace-nowrap ">
                  {user?.email}
                </td>
                <td className="px-4 py-2 text-newtextdata whitespace-nowrap ">
                  {user?.jobDetail?.reportingManager?.fullname}
                </td>

                <td className="px-4 py-2 text-newtextdata whitespace-nowrap ">
                  {user?.phone}
                </td>
                <td className="px-4 py-2 text-newtextdata whitespace-nowrap ">
                  {user?.status}
                </td>
                <td className="px-4 py-2 text-newtextdata whitespace-nowrap ">
                  5
                </td>

                {/* <td className="px-4 py-2 text-newtextdata whitespace-nowrap ">{user?.employeeRole?.role?.role_name}</td> */}

                <td className="px-4 py-2 text-newtextdata whitespace-nowrap  flex items-center space-x-2">
                  <button
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                    onClick={() => {
                      setSelectedEmployee(user);
                      setViewModalOpen(true);
                    }}
                  >
                    <FontAwesomeIcon icon={faEye} />
                  </button>
                  <button
                    className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                    onClick={() => {
                      setSelectedEmployee(user);
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
                          "Are you sure you want to delete this employee?"
                        )
                      ) {
                        handleDelete(user?.id);
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

export default EmployeeTable;
