import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../MarketingManagement/MarketingManageData.css";
import "../../../layout/MainCssFile.css";
import { iconsImgs } from "../../../utils/images";
import DepartmentTable from "./DepartmentTable";
import Pagination from "./Pagination";
import PoaReportOfUser from "./PoaReportOfUser";
import EmpSARReport from "./EmpSARReport";
import AllEmpPlanOfActionReport from "./AllEmpPlanOfActionReport";
import ContentTop from "../../ContentTop/ContentTop";
import { fetchUserWithRole } from "../../../redux/userSlice";
import {
  fetchAllCustomers,
  getAllAddressByCustomerId,
} from "../../../redux/customerSlice";
import {
  listPOA,
  addPOA,
  updatePOA,
  fetchAllPoaReports,
} from "../../../redux/poaSlice";

const SalesPersonFollowUp = () => {
  //console.log("SalesPersonFollowUp component mounted");

  const dispatch = useDispatch();

  const { poaList, totalPages, poaLoading, poaError } = useSelector(
    (state) => state.poa
  );

  const { userDataWithRole } = useSelector((state) => state.user);

  const { allCustomers, customerAddress } = useSelector(
    (state) => state.customer
  );
  console.log("allCustomers", allCustomers);
  const [selectedPOA, setSelectedPOA] = useState({});

  const [allselectedPOA, allsetSelectedPOA] = useState([]);
  // Pagination & Search States
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const leadPerPage = 4;

  // Load initial users from localStorage or use default list

  const [isAddUserModalOpen, setAddUserModalOpen] = useState(false);
  const [isViewModalOpen, setViewModalOpen] = useState(false);
  const [isEditUserModalOpen, setEditUserModalOpen] = useState(false);
  const [selectedPOAId, setSelectedPOAId] = useState(null);
  const [isLeadAssignPopup, setIsLeadAssignPopup] = useState(false);
  const poaPerPage = 4;

  const [poaReportOpen, setpoaReportOpen] = useState(false);
  const [allEmpPlanOfActionReport, setAllEmpPlanOfActionReport] =
    useState(false);

  useEffect(() => {
    dispatch(fetchAllCustomers());
    dispatch(
      fetchUserWithRole({
        roleId: 3,
      })
    );
    dispatch(
      listPOA({
        page: currentPage,
        limit: poaPerPage,
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

  //add POA
  const [poaData, setPoaData] = useState({
    customer_id: "",
    location: "",
    contact_persion_name: "",
    sales_persion_id: "",
    meeting_date: "",
    meeting_type: "",
    meeting_summary: "",
    product_sale: "",
    total_material_qty: "",
    approx_business: "",
    project_name: "",
  });

  const [poaFormErrors, setPoaFormErrors] = useState({});
  const [poaFlashMessage, setPoaFlashMessage] = useState("");
  const [poaFlashMsgType, setPoaFlashMsgType] = useState("");

  // Input change handler
  const handlePoaChange = (e) => {
    const { name, value } = e.target;
    setPoaData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Customer change handler
  const handlePoaCustomerChange = (e) => {
    const { value } = e.target;
    dispatch(getAllAddressByCustomerId({ id: value }));

    setPoaData((prevData) => ({
      ...prevData,
      customer_id: value,
    }));
  };

  // Flash message handler
  const handlePoaFlashMessage = (message, type) => {
    setPoaFlashMessage(message);
    setPoaFlashMsgType(type);
    setTimeout(() => {
      setPoaFlashMessage("");
      setPoaFlashMsgType("");
    }, 3000);
  };

  // Validation
  const validatePoaForm = () => {
    let errors = {};
    if (!poaData.customer_id) errors.customer_id = "Customer is required.";
    if (!poaData.contact_persion_name)
      errors.contact_persion_name = "Contact Person Name is required.";
    if (!poaData.sales_persion_id)
      errors.sales_persion_id = "Sales Person is required.";
    if (!poaData.meeting_date)
      errors.meeting_date = "Meeting Date is required.";
    if (!poaData.meeting_type)
      errors.meeting_type = "Meeting Type is required.";
    if (!poaData.meeting_summary)
      errors.meeting_summary = "Meeting Summary is required.";
    if (!poaData.product_sale)
      errors.product_sale = "Product Sale is required.";
    if (!poaData.total_material_qty)
      errors.total_material_qty = "Total Material Qty is required.";
    if (!poaData.approx_business)
      errors.approx_business = "Approx Business is required.";
    if (!poaData.project_name)
      errors.project_name = "Project Name is required.";

    setPoaFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Submit handler
  const handleSubmitPoa = async (e) => {
    e.preventDefault();
    if (validatePoaForm()) {
      try {
        const response = await dispatch(addPOA(poaData)).unwrap(); // Make sure your action is named `addPoa`

        if (response?.success) {
          handlePoaFlashMessage(response?.message, "success");

          dispatch(
            listPOA({
              page: currentPage,
              limit: poaPerPage,
              search: searchTerm,
            })
          );

          setPoaData({
            customer_id: "",
            contact_persion_name: "",
            sales_persion_id: "",
            meeting_date: "",
            meeting_type: "",
            meeting_summary: "",
            product_sale: "",
            total_material_qty: "",
            approx_business: "",
            project_name: "",
          });

          setTimeout(() => {
            setAddUserModalOpen(false); // Make sure modal state name matches
          }, 3000);
        } else {
          handlePoaFlashMessage(
            response?.message || "Something went wrong",
            "error"
          );
        }
      } catch (error) {
        console.error("Error adding POA:", error);
        handlePoaFlashMessage(error?.message || "An error occurred", "error");
      }
    }
  };

  //END ADD POA

  //assignPOAToUser
  const [poaUpdateData, setPoaUpdateData] = useState({
    sales_persion_id: "",
  });

  // Input change handler
  const handlePoaUpdateChange = (e) => {
    const { name, value } = e.target;
    setPoaUpdateData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validatePoaUpdateForm = () => {
    let errors = {};
    if (!poaUpdateData.sales_persion_id)
      errors.sales_persion_id = "Sales Person is required.";

    setPoaFormErrors(errors);
    return Object.keys(errors).length === 0;
  };
  const handleAssignSalesPerson = async () => {
    if (!validatePoaUpdateForm()) return;
    try {
      const response = await dispatch(
        updatePOA({
          id: selectedPOA.id,
          sales_persion_id: poaUpdateData.sales_persion_id,
        })
      ).unwrap();

      console.log(response);
      if (response?.success) {
        handlePoaFlashMessage(response?.message, "success");

        setPoaUpdateData({
          sales_persion_id: "",
        });
        // Reset state
        setTimeout(() => {
          setIsLeadAssignPopup(false); // Make sure modal state name matches
        }, 3000);
        setSelectedPOAId(null);
        setSelectedPOA("");

        // Refresh list
        dispatch(
          listPOA({
            page: currentPage,
            limit: poaPerPage,
            search: searchTerm,
          })
        );
      } else {
        handlePoaFlashMessage("Failed to update", "error");
      }
    } catch (error) {
      console.error("Update error:", error);
      handlePoaFlashMessage(error?.message || "Something went wrong", "error");
    }
  };

  //
  return (
    <div className="main-content">
      <ContentTop />
      <div className="flex flex-col gap-[20px]">
        <div className="flex items-start md:items-center flex-col md:flex-row md:justify-between">
          <div>
            <h1 className="text-white text-[14px] font-semibold">
              All Employee POA Report
            </h1>
          </div>
          <div className="flex items-start md:items-center flex-col md:flex-row gap-[5px]">
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
                className="flex items-center text-textdata whitespace-nowrap text-white bg-[#fe6c00] rounded-[3px] px-3 py-[0.28rem]"
                onClick={() => {
                  allsetSelectedPOA(poaList?.data);
                  setAllEmpPlanOfActionReport(true);
                }}
              >
                All Employee POA
              </button>
            </div>
          </div>
        </div>
        <div className="main-content-holder max-h-[615px] overflow-y-auto scrollbar-hide">
          <div className="bg-bgData rounded-[8px] shadow-md shadow-black/5 text-white px-4 py-6 overflow-auto">
            {/*------- Table Data Start -------*/}
            <DepartmentTable
              setEditUserModalOpen={setEditUserModalOpen}
              poaList={poaList?.data || []}
              setViewModalOpen={setViewModalOpen}
              selectedPOA={selectedPOA}
              setSelectedPOA={setSelectedPOA}
              isLeadAssignPopup={isLeadAssignPopup}
              setIsLeadAssignPopup={setIsLeadAssignPopup}
              setSelectedPOAId={setSelectedPOAId}
              selectedPOAId={selectedPOAId}
              poaReportOpen={poaReportOpen}
              setpoaReportOpen={setpoaReportOpen}
            />
          </div>

          {/* Edit User Modal */}
          {/* {isEditUserModalOpen && (
          <EditUserModal setEditUserModalOpen={setEditUserModalOpen} />
        )} */}

          {/* View User Modal */}
          {isViewModalOpen && (
            <ViewUserModal
              setpoaReportOpen={setpoaReportOpen}
              selectedUser={selectedUser}
            />
          )}

          {/* {poaReportOpen && (
            <PoaReportOfUser
              setpoaReportOpen={setpoaReportOpen}
              selectedPOA={selectedPOA}
            />
          )} */}

          {poaReportOpen && (
            <EmpSARReport
              setpoaReportOpen={setpoaReportOpen}
              selectedPOA={selectedPOA}
            />
          )}

          {allEmpPlanOfActionReport && (
            <AllEmpPlanOfActionReport
              setAllEmpPlanOfActionReport={setAllEmpPlanOfActionReport}
              allselectedPOA={allselectedPOA}
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

export default SalesPersonFollowUp;
