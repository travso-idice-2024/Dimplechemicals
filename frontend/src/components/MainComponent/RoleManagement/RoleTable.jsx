import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listRoles, removeRole } from "../../../redux/authSlice";
import SuccessMessage from "../../AlertMessage/SuccessMessage";
import ErrorMessage from "../../AlertMessage/ErrorMessage";

const RoleTable = ({
  Roles,
  setEditroleModalOpen,
  setViewModalOpen,
  selectedRole,
  setSelectedRole
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
        await dispatch(removeRole(id)).unwrap();
        handleFlashMessage("Role deleted successfully!", "success");
        dispatch(listRoles()); // Refresh role list
      } catch (error) {
        handleFlashMessage(error?.message || "Failed to delete role", "error");
      }
    
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full table-auto">
        <thead>
          <tr className="bg-[#473b33] rounded-[8px]">
            <th className="px-4 py-2 text-left text-bgDataNew">Id</th>
            <th className="px-4 py-2 text-left text-bgDataNew">Role</th>
            <th className="px-4 py-2 text-left text-bgDataNew">Role Description</th>
            <th className="px-4 py-2 text-left text-bgDataNew">Action</th>
          </tr>
        </thead>
        <tbody>
          {Roles?.map((role, index) => (
            <tr key={index}>
              <td className="px-4 py-2">{index+1}</td>
              <td className="px-4 py-2">{role.role_name}</td>
              <td className="px-4 py-2">{role.role_description}</td>
              <td className="px-4 py-2 space-x-2">
                <button
                  className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                  onClick={() => {
                    setSelectedRole(role); 
                    setViewModalOpen(true);
                  }}
                >
                  View
                </button>
                <button
                  className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                  onClick={() => {
                    setSelectedRole(role); // Set the selected role
                    setEditroleModalOpen(true);
                  }}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  onClick={() => {
                    if (window.confirm("Are you sure you want to delete this role?")) {
                      handleDelete(role.id);
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

export default RoleTable;
