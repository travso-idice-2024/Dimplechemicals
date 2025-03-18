import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listUsers, removeUser } from "../../../../redux/userSlice";
import SuccessMessage from "../../../AlertMessage/SuccessMessage";
import ErrorMessage from "../../../AlertMessage/ErrorMessage";

const EmployeeTable = ({
  Employees,
  setEditUserModalOpen,
  setViewModalOpen,
  selectedEmployee,
  setSelectedEmployee,
}) => {
  const dispatch = useDispatch();

  const [flashMessage, setFlashMessage] = useState("");
  const [flashMsgType, setFlashMsgType] = useState("");

  // Function to show flash messages
  const handleFlashMessage = (message, type) => {
    setFlashMessage(message);
    setFlashMsgType(type);
    setTimeout(() => {
      setFlashMessage("");
      setFlashMsgType("");
    }, 3000); // Hide the message after 3 seconds
  };

  const handleDelete = async (id) => {
    try {
      await dispatch(removeUser(id)).unwrap();
      handleFlashMessage("Employee deleted successfully!", "success");
      dispatch(listUsers()); // Refresh user list
    } catch (error) {
      handleFlashMessage(
        error?.message || "Failed to delete employee",
        "error"
      );
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full table-auto">
        <thead>
          <tr className="bg-[#473b33] rounded-[8px]">
            <th className="px-4 py-2 text-left text-bgDataNew">Id</th>
            <th className="px-4 py-2 text-left text-bgDataNew">Emp ID</th>
            <th className="px-4 py-2 text-left text-bgDataNew">Name</th>
            <th className="px-4 py-2 text-left text-bgDataNew">Department</th>
            <th className="px-4 py-2 text-left text-bgDataNew">Reporting Manager</th>
            <th className="px-4 py-2 text-left text-bgDataNew">Location</th>
            <th className="px-4 py-2 text-left text-bgDataNew">Designation</th>
            <th className="px-4 py-2 text-left text-bgDataNew">Status</th>
            {/* <th className="px-4 py-2 text-left text-bgDataNew">Role</th> */}
            <th className="px-4 py-2 text-left text-bgDataNew">Action</th>
          </tr>
        </thead>
        <tbody>
          {Employees?.map((user, index) => (
            <tr key={index}>
              <td className="px-4 py-2">{index + 1}</td>
              <td className="px-4 py-2">{user.emp_id}</td>
              <td className="px-4 py-2">{user.fullname}</td>
              <td className="px-4 py-2">{user?.jobDetail?.department?.department_name}</td>
              <td className="px-4 py-2">{user?.jobDetail?.reportingManager?.fullname}</td>
              <td className="px-4 py-2">{user?.jobDetail?.work_location}</td>
              <td className="px-4 py-2">{user?.jobDetail?.job_title}</td>
              <td className="px-4 py-2">{user.status}</td>
              {/* <td className="px-4 py-2">{user?.employeeRole?.role?.role_name}</td> */}
              
              <td className="px-4 py-2 space-x-2">
                <button
                  className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                  onClick={() => {
                    setSelectedEmployee(user);
                    setViewModalOpen(true);
                  }}
                >
                  View
                </button>
                <button
                  className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                  onClick={() => {
                    setSelectedEmployee(user);
                    setEditUserModalOpen(true);
                  }}
                >
                  Edit
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
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeTable;
