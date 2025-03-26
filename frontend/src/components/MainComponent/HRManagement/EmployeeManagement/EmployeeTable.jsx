import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listUsers, removeUser } from "../../../../redux/userSlice";
import SuccessMessage from "../../../AlertMessage/SuccessMessage";
import ErrorMessage from "../../../AlertMessage/ErrorMessage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faEye } from "@fortawesome/free-solid-svg-icons";

const EmployeeTable = ({
  Employees,
  setEditUserModalOpen,
  setViewModalOpen,
  selectedEmployee,
  setSelectedEmployee,
  deleteFlashMessage, // ✅ Get delete message
  deleteFlashMsgType,
  handleDelete // ✅ Get delete type
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
  //   try {
  //     await dispatch(removeUser(id)).unwrap();
  //     handleFlashMessage("Employee deleted successfully!", "success");
  //     dispatch(listUsers()); // Refresh user list
  //   } catch (error) {
  //     handleFlashMessage(
  //       error?.message || "Failed to delete employee",
  //       "error"
  //     );
  //   }
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
            <th className="px-4 py-2 text-left text-bgDataNew text-textdata">Id</th>
            <th className="px-4 py-2 text-left text-bgDataNew text-textdata">Emp ID</th>
            <th className="px-4 py-2 text-left text-bgDataNew text-textdata">Name</th>
            <th className="px-4 py-2 text-left text-bgDataNew text-textdata">Department</th>
            <th className="px-4 py-2 text-left text-bgDataNew text-textdata">Reporting Manager</th>
            <th className="px-4 py-2 text-left text-bgDataNew text-textdata">Location</th>
            <th className="px-4 py-2 text-left text-bgDataNew text-textdata">Designation</th>
            <th className="px-4 py-2 text-left text-bgDataNew text-textdata">Status</th>
            {/* <th className="px-4 py-2 text-left text-bgDataNew text-textdata">Role</th> */}
            <th className="px-4 py-2 text-left text-bgDataNew text-textdata">Action</th>
          </tr>
        </thead>
        <tbody>
          {Employees?.map((user, index) => (
            <tr key={index}>
              <td className="px-4 py-2 text-textdata">{index + 1}</td>
              <td className="px-4 py-2 text-textdata">{user?.emp_id}</td>
              <td className="px-4 py-2 text-textdata">{user?.fullname}</td>
              <td className="px-4 py-2 text-textdata">{user?.jobDetail?.department?.department_name}</td>
              <td className="px-4 py-2 text-textdata">{user?.jobDetail?.reportingManager?.fullname}</td>
              <td className="px-4 py-2 text-textdata">{user?.jobDetail?.work_location}</td>
              <td className="px-4 py-2 text-textdata">{user?.jobDetail?.job_title}</td>
              <td className="px-4 py-2 text-textdata">{user.status}</td>
              {/* <td className="px-4 py-2 text-textdata">{user?.employeeRole?.role?.role_name}</td> */}
              
              <td className="px-4 py-2 text-textdata space-x-2">
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

export default EmployeeTable;
