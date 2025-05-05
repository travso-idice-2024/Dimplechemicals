import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../MarketingManageData.css";
import "../../../../layout/MainCssFile.css";
import { iconsImgs } from "../../../../utils/images";
import DepartmentTable from "./DepartmentTable";
import Pagination from "./Pagination";
import AddRoleModal from "./AddRoleModal";
import EmpSARReport from "./EmpSARReport";
// import ViewUserModal from "./ViewUserModal";
// import EditUserModal from "./EditUserModal";
import ContentTop from "../../../ContentTop/ContentTop";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";

import {
  finalizeDealsList,
} from "../../../../redux/leadSlice";

const SalePOForm = () => {
   const dispatch = useDispatch();
    const { finalizeDealsListData, totalPages, departmentloading, departmenterror } = useSelector(
      (state) => state.lead
    );
 
  //console.log("finalizeDealsListData", finalizeDealsListData);
  const [isAddUserModalOpen, setAddUserModalOpen] = useState(false);
  const [isViewModalOpen, setViewModalOpen] = useState(false);
  const [isEditUserModalOpen, setEditUserModalOpen] = useState(false);

  const [showFinlizeDealProduct, setShowFinlizeDealProduct] = useState(false);
  const [selectedLead, setSelectedLead] = useState({});

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const leadPerPage = 4;

   useEffect(() => {
      dispatch(
        finalizeDealsList({
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
    <div className="main-content">
      <ContentTop />
      <div className="flex flex-col gap-[20px]">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-white text-textdata font-semibold">
              Sales PO Form
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
        <div className="main-content-holder max-h-[615px] overflow-y-auto scrollbar-hide">
          <div className="bg-bgData rounded-[8px] shadow-md shadow-black/5 text-white px-4 py-6 overflow-auto">
            {/*------- Table Data Start -------*/}
            <DepartmentTable
              setEditUserModalOpen={setEditUserModalOpen}
              finalizeDealsListData={finalizeDealsListData?.data || []}
              setViewModalOpen={setViewModalOpen}
              setSelectedLead={setSelectedLead}
              setShowFinlizeDealProduct={setShowFinlizeDealProduct}
            />
            {/*------- Table Data End -------*/}
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

          {showFinlizeDealProduct && (
            <EmpSARReport
            setShowFinlizeDealProduct={setShowFinlizeDealProduct}
            selectedLead ={selectedLead}
            setSelectedLead = {setSelectedLead}
            />
          )}
        </div>
        {/* Pagination Controls with Number */}
        <Pagination
          currentPage={currentPage}
          handlePageChange={handlePageChange}
          totalPages={totalPages}
        />
      </div>
    </div>
  );
};

export default SalePOForm;
