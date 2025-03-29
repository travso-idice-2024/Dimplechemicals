import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./SalesProgressMange.css";
import { iconsImgs } from "../../../utils/images";
import DepartmentTable from "./DepartmentTable";
import Pagination from "./Pagination";
import AddRoleModal from "./AddRoleModal";
import ViewUserModal from "./ViewUserModal";
import EditUserModal from "./EditUserModal";
import ContentTop from "../../ContentTop/ContentTop";
import UserContentTop from "../../ContentTop/UserContentTop";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faDollarSign,
  faPhone,
  faHandshake,
} from "@fortawesome/free-solid-svg-icons";

import { fetchCurrentUser } from "../../../redux/authSlice";
import { todaysAssignedLeadsCount, todaysLead } from "../../../redux/leadSlice";

const SalesProgressMange = () => {
  const dispatch = useDispatch();
  const { user: userDeatail } = useSelector((state) => state.auth);
  const { allLeadsCount, salesPersonleads, totalPages } = useSelector(
    (state) => state.lead
  );

  //console.log("salesPersonleads", salesPersonleads?.data);
  // Pagination & Search States
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const leadPerPage = 10;

  useEffect(() => {
    dispatch(fetchCurrentUser());
    dispatch(todaysAssignedLeadsCount());
    dispatch(
      todaysLead({ page: currentPage, limit: leadPerPage, search: searchTerm })
    );
    // eslint-disable-next-line
  }, [dispatch, currentPage, searchTerm]);

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page when searching
  };

  // Handle page change
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  //const [searchTerm, setSearchTerm] = useState("");
  const [leadDataShowNew, setLeadDataShowNew] = useState(false);
  // Load initial users from localStorage or use default list
  // const [users, setUsers] = useState(() => {
  //   const storedUsers = localStorage.getItem("salesManagementleads");
  //   return storedUsers
  //     ? JSON.parse(storedUsers)
  //     : [
  //         {
  //           date: "22/03/2025",
  //           leadowner: "Nikhil",
  //           companyname: "Dimple Chemicals",
  //           clientname: "Dimple Gupta",
  //           leadsource: "Marketing",
  //           leadstatus: "Warm",
  //         },
  //         {
  //           date: "22/03/2025",
  //           leadowner: "Prashant",
  //           companyname: "Idice System",
  //           clientname: "Komal Gupta",
  //           leadsource: "Sales",
  //           leadstatus: "Hot",
  //         },
  //       ];
  // });

  const [isViewModalOpen, setViewModalOpen] = useState(false);
  const [isEditUserModalOpen, setEditUserModalOpen] = useState(false);
  // const usersPerPage = 8;
  // const totalPages = Math.ceil(users.length / usersPerPage);

  // Load currentPage from sessionStorage or default to page 1
  // const [currentPage, setCurrentPage] = useState(() => {
  //   return parseInt(sessionStorage.getItem("currentPage")) || 1;
  // });

  // Save currentPage to sessionStorage when it changes
  // useEffect(() => {
  //   sessionStorage.setItem("currentPage", currentPage);
  // }, [currentPage]);

  // // Save users to localStorage whenever users state updates
  // useEffect(() => {
  //   localStorage.setItem("salesManagementleads", JSON.stringify(users));
  // }, [users]);

  // Handle page change
  // const handlePageChange = (newPage) => {
  //   setCurrentPage(newPage);
  // };

  // Filtered user list based on search
  // const filteredUsers = users
  //   .sort((a, b) => b.companyname.localeCompare(a.companyname))
  //   .filter(
  //     (user) =>
  //       user.companyname.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //       user.leadtype.toLowerCase().includes(searchTerm.toLowerCase())
  //   );

  // Paginate user data
  // const indexOfLastUser = currentPage * usersPerPage;
  // const indexOfFirstUser = indexOfLastUser - usersPerPage;
  // const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  return (
    <div className="main-content">
      <UserContentTop />

      {!leadDataShowNew && (
        <div className="main-content-holder max-h-[615px] overflow-y-auto scrollbar-hide">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div
              className="bg-bgData flex flex-col items-center justify-center rounded-[8px] shadow-md shadow-black/5 text-white px-4 py-6 cursor-pointer"
              onClick={() => {
                setLeadDataShowNew(true);
              }}
            >
              <div className="relative">
                <FontAwesomeIcon
                  icon={faUser}
                  className="text-4xl text-bgDataNew mb-2"
                />
                <span className="absolute -top-2 -right-3 bg-red-500 text-white text-sm font-bold w-6 h-6 flex items-center justify-center rounded-full">
                  {allLeadsCount?.assignedLeadsCount}
                </span>
              </div>
              <h2 className="text-textdata font-semibold">Assigned Lead</h2>
              <p className="text-[12px]">{userDeatail?.fullname}</p>
            </div>
            <div className="bg-bgData flex flex-col items-center justify-center rounded-[8px] shadow-md shadow-black/5 text-white px-4 py-6 cursor-pointer">
              <FontAwesomeIcon
                icon={faDollarSign}
                className="text-4xl text-bgDataNew mb-2"
              />
              <h2 className="text-textdata font-semibold">Total Sales</h2>
              <p className="text-[12px]">₹1,25,000</p>
            </div>
            <div className="bg-bgData flex flex-col items-center justify-center rounded-[8px] shadow-md shadow-black/5 text-white px-4 py-6 cursor-pointer">
              <FontAwesomeIcon
                icon={faPhone}
                className="text-4xl text-bgDataNew mb-2"
              />
              <h2 className="text-textdata font-semibold">
                Pending Follow-Ups
              </h2>
              <p className="text-[12px]">5 Clients</p>
            </div>
            <div className="bg-bgData flex flex-col items-center justify-center rounded-[8px] shadow-md shadow-black/5 text-white px-4 py-6 cursor-pointer">
              <FontAwesomeIcon
                icon={faHandshake}
                className="text-4xl text-bgDataNew mb-2"
              />
              <h2 className="text-textdata font-semibold">Closed Deals</h2>
              <p className="text-[12px]">3 Successful Sales</p>
            </div>
          </div>
        </div>
      )}
      {leadDataShowNew && (
        <div className="main-content-holder max-h-[615px] overflow-y-auto scrollbar-hide">
          <div className="flex flex-col gap-[20px]">
            <div className="flex items-center justify-between">
              <div>
                <h1 class="text-white text-[15.5px] font-semibold flex items-center cursor-pointer" onClick={() => setLeadDataShowNew(false)}>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 36 36"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    class="cursor-pointer"
                  >
                    <path
                      d="M22.5 27L13.5 18L22.5 9"
                      stroke="white"
                      stroke-width="3"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>
                  </svg>
                  Assign TaskLead
                </h1>
              </div>
              <div className="flex items-center gap-[5px]">
                <div>
                  <input
                    type="search"
                    className="relative m-0 block w-full min-w-0 flex-auto rounded border border-solid border-[#473b33] bg-transparent bg-clip-padding px-3 py-[0.15rem] text-base font-normal leading-[1.6] text-white outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-[#473b33] focus:text-white focus:shadow-[#473b33] focus:outline-none dark:border-[#473b33] dark:text-white dark:placeholder:text-white dark:focus:border-[#473b33]"
                    placeholder="Search"
                    value={searchTerm}
                    onChange={handleSearchChange}
                  />
                </div>
              </div>
            </div>
            <div className="bg-bgData rounded-[8px] shadow-md shadow-black/5 text-white px-4 py-6">
              {/*------- Table Data Start -------*/}
              <DepartmentTable
                setEditUserModalOpen={setEditUserModalOpen}
                SalesPersonleads={salesPersonleads?.data}
                setViewModalOpen={setViewModalOpen}
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

          {/* Edit User Modal */}
          {isEditUserModalOpen && (
            <EditUserModal setEditUserModalOpen={setEditUserModalOpen} />
          )}

          {/* View User Modal */}
          {isViewModalOpen && (
            <ViewUserModal setViewModalOpen={setViewModalOpen} />
          )}
        </div>
      )}
    </div>
  );
};

export default SalesProgressMange;
