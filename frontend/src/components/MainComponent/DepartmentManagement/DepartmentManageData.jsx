import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./DepartmentManageData.css";
import { iconsImgs } from "../../../utils/images";
import DepartmentTable from "./DepartmentTable";
import Pagination from "./Pagination";
import AddDepartmentModal from "./AddDepartmentModal";
import ViewDepartmentModal from "./ViewDepartmentModal";
import EditDepartmentModal from "./EditDepartmentModal";
import { listDepartments } from "../../../redux/departmentSlice";

const DepartmentManageData = () => {
  const dispatch = useDispatch();
  const { departments, totalPages, departmentloading, departmenterror } = useSelector(
    (state) => state.department
  );

  const [selectedDepartment, setSelectedDepartment] = useState({});
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [isViewModalOpen, setViewModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);

  // Pagination & Search States
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const departmentsPerPage = 10;

  // Fetch departments whenever searchTerm or currentPage changes
  useEffect(() => {
    dispatch(
      listDepartments({
        page: currentPage,
        limit: departmentsPerPage,
        search: searchTerm,
      })
    );
  }, [dispatch, currentPage, searchTerm, departments]);

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page when searching
  };

  // Handle page change
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  if (departmentloading) return <p>Loading...</p>;
  if (departmenterror) return <p>{departmenterror}</p>;

  return (
    <div className="main-content-holder max-h-[615px] overflow-y-auto scrollbar-hide">
      <div className="flex flex-col gap-[20px]">
        <div className="flex items-center justify-between">
          <h1 className="text-white text-[20px] font-semibold">
            Department Management
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
              onClick={() => setAddModalOpen(true)}
            >
              <img
                src={iconsImgs.plus}
                alt="plus icon"
                className="w-[18px] mr-1"
              />{" "}
              Add Department
            </button>
          </div>
        </div>
        <div className="bg-bgData rounded-[8px] text-white shadow-md px-4 py-6">
          <DepartmentTable
            Departments={departments?.data}
            setEditModalOpen={setEditModalOpen}
            setViewModalOpen={setViewModalOpen}
            selectedDepartment={selectedDepartment}
            setSelectedDepartment={setSelectedDepartment}
          />
        </div>
        <Pagination
          currentPage={currentPage}
          handlePageChange={handlePageChange}
          totalPages={totalPages}
        />
      </div>

      {/* Add Department Modal */}
      {isAddModalOpen && (
        <AddDepartmentModal setAddModalOpen={setAddModalOpen} />
      )}

      {/* Edit Department Modal */}
      {isEditModalOpen && (
        <EditDepartmentModal
          setEditModalOpen={setEditModalOpen}
          selectedDepartment={selectedDepartment}
          setSelectedDepartment={setSelectedDepartment}
        />
      )}

      {/* View Department Modal */}
      {isViewModalOpen && (
        <ViewDepartmentModal
          setViewModalOpen={setViewModalOpen}
          selectedDepartment={selectedDepartment}
        />
      )}
    </div>
  );
};

export default DepartmentManageData;
