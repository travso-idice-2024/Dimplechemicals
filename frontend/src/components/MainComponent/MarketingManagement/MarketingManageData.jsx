import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./MarketingManageData.css";
import { iconsImgs } from "../../../utils/images";
import DepartmentTable from "./DepartmentTable";
import Pagination from "./Pagination";
import AddRoleModal from "./AddRoleModal";
import ViewUserModal from "./ViewUserModal";
import EditUserModal from "./EditUserModal";
import {listLeads} from "../../../redux/leadSlice";

const MarketingManageData = () => {
   const dispatch = useDispatch();
    const { leads, totalPages, departmentloading, departmenterror } = useSelector(
      (state) => state.lead
    );

  console.log("leads", leads?.data);
  
  const [isAddUserModalOpen, setAddUserModalOpen] = useState(false);
  const [isViewModalOpen, setViewModalOpen] = useState(false);
  const [isEditUserModalOpen, setEditUserModalOpen] = useState(false);

    // Pagination & Search States
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const leadPerPage = 10;

      // Fetch departments whenever searchTerm or currentPage changes
      useEffect(() => {
        dispatch(
          listLeads({
            page: currentPage,
            limit: leadPerPage,
            search: searchTerm,
          })
        );
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


  return (
    <div className="main-content-holder max-h-[615px] overflow-y-auto scrollbar-hide">
      <div className="flex flex-col gap-[20px]">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-white text-[20px] font-semibold">
              Lead Management
            </h1>
          </div>
          <div className="flex items-center gap-[5px]">
            <div>
              <input
                type="search"
                className="relative m-0 block w-full min-w-0 flex-auto rounded border border-solid border-[#473b33] bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-white outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-[#473b33] focus:text-white focus:shadow-[#473b33] focus:outline-none dark:border-[#473b33] dark:text-white dark:placeholder:text-white dark:focus:border-[#473b33]"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            {/* <div>
              <button
                className="flex items-center text-white bg-[#fe6c00] rounded-[3px] px-3 py-[0.28rem]"
                onClick={() => setAddUserModalOpen(true)}
              >
                <img
                  src={iconsImgs.plus}
                  alt="plus icon"
                  className="w-[18px] mr-1"
                />{" "}
                Add Leads
              </button>
            </div> */}
          </div>
        </div>
        <div className="bg-bgData rounded-[8px] shadow-md shadow-black/5 text-white px-4 py-6">
          {/*------- Table Data Start -------*/}
          <DepartmentTable
            setEditUserModalOpen={setEditUserModalOpen}
            Leads={leads?.data}
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

      {/* Add User Modal */}
      {isAddUserModalOpen && (
        <AddRoleModal setAddUserModalOpen={setAddUserModalOpen} />
      )}

      {/* Edit User Modal */}
      {isEditUserModalOpen && (
        <EditUserModal setEditUserModalOpen={setEditUserModalOpen} />
      )}

      {/* View User Modal */}
      {isViewModalOpen && <ViewUserModal setViewModalOpen={setViewModalOpen} />}
    </div>
  );
};

export default MarketingManageData;
