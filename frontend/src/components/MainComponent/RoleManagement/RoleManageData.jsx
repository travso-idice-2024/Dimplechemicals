import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./RoleManageData.css";
import { iconsImgs } from "../../../utils/images";
import RoleTable from "./RoleTable";
import Pagination from "./Pagination";
import AddRoleModal from "./AddRoleModal";
import ViewUserModal from "./ViewUserModal";
import EditUserModal from "./EditUserModal";
import { listRoles } from "../../../redux/authSlice";

const RoleManageData = () => {
  const dispatch = useDispatch();
  const { roles, totalPages, loading, error } = useSelector(
    (state) => state.auth
  );

  const [selectedRole, setSelectedRole] = useState({});
  const [isAddUserModalOpen, setAddUserModalOpen] = useState(false);
  const [isViewModalOpen, setViewModalOpen] = useState(false);
  const [isEditroleModalOpen, setEditroleModalOpen] = useState(false);

  // Pagination & Search States
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;

  // Fetch roles whenever searchTerm or currentPage changes
  useEffect(() => {
    dispatch(
      listRoles({ page: currentPage, limit: usersPerPage, search: searchTerm })
    );
  }, [dispatch, currentPage, searchTerm, roles]);

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page when searching
  };

  // Handle page change
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="main-content-holder max-h-[615px] overflow-y-auto scrollbar-hide">
      <div className="flex flex-col gap-[20px]">
        <div className="flex items-center justify-between">
          <h1 className="text-white text-[20px] font-semibold">
            Role Management
          </h1>
          <div className="flex items-center gap-[5px]">
            <input
              type="search"
              className="border border-[#473b33] bg-transparent px-3 py-[0.25rem] text-white outline-none"
              placeholder="Search"
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <button
              className="flex items-center text-white bg-[#fe6c00] rounded-[3px] px-3 py-[0.28rem]"
              onClick={() => setAddUserModalOpen(true)}
            >
              <img
                src={iconsImgs.plus}
                alt="plus icon"
                className="w-[18px] mr-1"
              />{" "}
              Add Role
            </button>
          </div>
        </div>
        <div className="bg-bgData rounded-[8px] text-white shadow-md px-4 py-6">
          <RoleTable
            Roles={roles?.data}
            setEditroleModalOpen={setEditroleModalOpen}
            setViewModalOpen={setViewModalOpen}
            selectedRole={selectedRole}
            setSelectedRole={setSelectedRole}
          />
        </div>
        <Pagination
          currentPage={currentPage}
          handlePageChange={handlePageChange}
          totalPages={totalPages}
        />
      </div>
      {/* {isAddUserModalOpen && <AddRoleModal setAddUserModalOpen={setAddUserModalOpen} />}
      {isEditUserModalOpen && <EditUserModal setEditUserModalOpen={setEditUserModalOpen} />}
      {isViewModalOpen && <ViewUserModal setViewModalOpen={setViewModalOpen} />} */}
      {/* Add User Modal */}
      {isAddUserModalOpen && (
        <AddRoleModal setAddUserModalOpen={setAddUserModalOpen} />
      )}

      {/* Edit User Modal */}
      {isEditroleModalOpen && (
        <EditUserModal
          setEditroleModalOpen={setEditroleModalOpen}
          selectedRole={selectedRole}
          setSelectedRole={setSelectedRole}
        />
      )}

      {/* View User Modal */}
      {isViewModalOpen && (
        <ViewUserModal
          setViewModalOpen={setViewModalOpen}
          selectedRole={selectedRole}
        />
      )}
    </div>
  );
};

export default RoleManageData;
