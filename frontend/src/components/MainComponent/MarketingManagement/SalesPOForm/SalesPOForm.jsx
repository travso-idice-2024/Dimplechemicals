import React, { useState, useEffect } from "react";
import "../MarketingManageData.css";
import "../../../../layout/MainCssFile.css";
import { iconsImgs } from "../../../../utils/images";
import DepartmentTable from "./DepartmentTable";
import Pagination from "./Pagination";
import AddRoleModal from "./AddRoleModal";
// import ViewUserModal from "./ViewUserModal";
// import EditUserModal from "./EditUserModal";
import ContentTop from "../../../ContentTop/ContentTop";

const SalePOForm = () => {
  const [searchTerm, setSearchTerm] = useState("");
  // Load initial users from localStorage or use default list
  const [users, setUsers] = useState(() => {
    const storedUsers = localStorage.getItem("po-form");
    return storedUsers
      ? JSON.parse(storedUsers)
      : [
        {
          ponumber: 34567,
          podate: "24-01-2025",
          companyname: "Dimple Sharma",
          departmentname: "Sales",
          suppliername: "Idice System",
          supplieraddress: "XYZ Street, Delhi, India",
          suppliercontact: 8524564223,
          supplierEmail: "supplier@gmail.com",
          productname: "Steel",
          category: "Raw Material",
          quantity: 2,
          amount: 2000,
          productcode: 4567
        },
        {
          ponumber: 67890,
          podate: "10-02-2025",
          companyname: "Rahul Enterprises",
          departmentname: "IT",
          suppliername: "Tech Solutions",
          supplieraddress: "45, MG Road, Mumbai, India",
          suppliercontact: 9876543210,
          supplierEmail: "techsupplier@gmail.com",
          productname: "Aluminium Sheet",
          category: "Metal",
          quantity: 5,
          amount: 7500,
          productcode: 7890
        }
        ];
  });

  const [isAddUserModalOpen, setAddUserModalOpen] = useState(false);
  const [isViewModalOpen, setViewModalOpen] = useState(false);
  const [isEditUserModalOpen, setEditUserModalOpen] = useState(false);
  const usersPerPage = 8;
  const totalPages = Math.ceil(users.length / usersPerPage);

  // Load currentPage from sessionStorage or default to page 1
  const [currentPage, setCurrentPage] = useState(() => {
    return parseInt(sessionStorage.getItem("currentPage")) || 1;
  });

  // Save currentPage to sessionStorage when it changes
  useEffect(() => {
    sessionStorage.setItem("currentPage", currentPage);
  }, [currentPage]);

  // Save users to localStorage whenever users state updates
  useEffect(() => {
    localStorage.setItem("po-form", JSON.stringify(users));
  }, [users]);

  // Handle page change
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  // Filtered user list based on search
  const filteredUsers = users
    .sort((a, b) => b.companyname.localeCompare(a.companyname))
    .filter(
      (user) =>
        user.companyname.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.departmentname.toLowerCase().includes(searchTerm.toLowerCase())
    );

  // Paginate user data
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  return (
    <div className="main-content">
      <ContentTop />
      <div className="main-content-holder max-h-[615px] overflow-y-auto scrollbar-hide">
        <div className="flex flex-col gap-[20px]">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-white text-textdata font-semibold">
                SalesPO Form
              </h1>
            </div>
            <div className="flex items-center gap-[5px]">
              <div>
                <input
                  type="search"
                  className="relative m-0 block w-full min-w-0 flex-auto rounded border border-solid border-[#473b33] bg-transparent bg-clip-padding px-3 py-[0.15rem] text-base font-normal leading-[1.6] text-white outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-[#473b33] focus:text-white focus:shadow-[#473b33] focus:outline-none dark:border-[#473b33] dark:text-white dark:placeholder:text-white dark:focus:border-[#473b33]"
                  placeholder="Search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div>
                <button
                  className="flex items-center text-textdata text-white bg-[#fe6c00] rounded-[3px] px-3 py-[0.28rem]"
                  onClick={() => setAddUserModalOpen(true)}
                >
                  <img
                    src={iconsImgs.plus}
                    alt="plus icon"
                    className="w-[18px] mr-1"
                  />{" "}
                  Add PO Form
                </button>
              </div>
            </div>
          </div>
          <div className="bg-bgData rounded-[8px] shadow-md shadow-black/5 text-white px-4 py-6">
            {/*------- Table Data Start -------*/}
            <DepartmentTable
              setEditUserModalOpen={setEditUserModalOpen}
              currentUsers={currentUsers}
              setViewModalOpen={setViewModalOpen}
              currentPage={currentPage}
              usersPerPage={usersPerPage}
            />
            {/*------- Table Data End -------*/}
          </div>
          {/* Pagination Controls with Number */}
          <Pagination
            currentPage={currentPage}
            handlePageChange={handlePageChange}
            totalPages={totalPages}
          />
        </div>

        {/* Add User Modal */}
        {isAddUserModalOpen && (
          <AddRoleModal setAddUserModalOpen={setAddUserModalOpen} />
        )}

        {/* Edit User Modal */}
        {/* {isEditUserModalOpen && (
          <EditUserModal setEditUserModalOpen={setEditUserModalOpen} />
        )} */}

        {/* View User Modal */}
        {/* {isViewModalOpen && (
          <ViewUserModal setViewModalOpen={setViewModalOpen} />
        )} */}
      </div>
    </div>
  );
};

export default SalePOForm;
