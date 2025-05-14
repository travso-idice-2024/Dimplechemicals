import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../MarketingManageData.css";
import "../../../../layout/MainCssFile.css";
import { iconsImgs } from "../../../../utils/images";
import DepartmentTable from "./DepartmentTable";
import Pagination from "./Pagination";
import AddRoleModal from "./AddRoleModal";
import PoaReportOfUser from "./PoaReportOfUser";
import EmpSARReport from "./EmpSARReport";
import AllEmpPlanOfActionReport from "./AllEmpPlanOfActionReport";
import ParticularLeadAssign from "./ParticularLeadAssign";
import ContentTop from "../../../ContentTop/ContentTop";
import { fetchUserWithRole } from "../../../../redux/userSlice";
import {
  fetchAllCustomers,
  getAllAddressByCustomerId,
} from "../../../../redux/customerSlice";
import {
  addPOA,
  updatePOA,
  fetchAllPoaReports,
} from "../../../../redux/poaSlice";

import {addLead , listLeads} from "../../../../redux/leadSlice";
import {fetchCurrentUser } from "../../../../redux/authSlice";
import useGoogleCalendar from "../../../../components/hooks/useGoogleCalendar";



const SalesPersonFollowUp = () => {
  //console.log("SalesPersonFollowUp component mounted");
  const {
    isAuthenticated,
    createEvent,
  } = useGoogleCalendar();

  const dispatch = useDispatch();

  const { user: userDeatail } = useSelector((state) => state.auth);

  // const { poaList, totalPages, poaLoading, poaError } = useSelector(
  //   (state) => state.poa
  // );
  const { leads, totalPages, departmentloading, departmenterror } = useSelector(
    (state) => state.lead
  );
  //console.log("userDeatail",userDeatail.email);

  const { userDataWithRole } = useSelector((state) => state.user);

  //console.log("userDataWithRole",userDataWithRole?.data);

  const { allCustomers, customerAddress } = useSelector(
    (state) => state.customer
  );
  //console.log("customerAddress", customerAddress);
  
  const [selectedPOA, setSelectedPOA] = useState({});

  //console.log("selectedPOA",selectedPOA);

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
    dispatch(fetchCurrentUser());
    dispatch(fetchAllCustomers());
    dispatch(
      fetchUserWithRole({
        roleId: 3,
      })
    );
    dispatch(
      listLeads({
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

  //console.log("userDeatail123", userDeatail?.id);
  //add POA
  const [poaData, setPoaData] = useState({
    customer_id: "",
    lead_address: "",
    contact_person_name: "",
    assigned_person_id:"",
    assign_date: new Date().toISOString().split("T")[0],
    meeting_type: "",
    lead_summary: "",
    //product_sale: "",
    total_material_qty: "",
    approx_business: "",
    project_name: "",
    meeting_time:"",
    product_ids:[]
  });

  useEffect(() => {
    if (userDeatail?.id) {
      setPoaData(prev => ({
        ...prev,
        assigned_person_id: userDeatail.id
      }));
    }
  }, [userDeatail]);

  const [poaFormErrors, setPoaFormErrors] = useState({});
  const [poaFlashMessage, setPoaFlashMessage] = useState("");
  const [poaFlashMsgType, setPoaFlashMsgType] = useState("");
  const [attendeesEmails, setAttendeesEmails] = useState([]);

  const handlePoaChange = (e) => {
    const { name, value } = e.target;
  
    setPoaData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  
    if (name === "assigned_person_id") {
      const selectedUser = userDataWithRole?.data.find(
        (item) => item.id === parseInt(value)
      );
  
      if (selectedUser) {
        setAttendeesEmails([selectedUser.email,userDeatail.email]); // If you want an array of one email
      } else {
        setAttendeesEmails([]); // Clear if no match found
      }
    }
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
    if (!poaData.contact_person_name)
      errors.contact_person_name = "Contact Person Name is required.";
    if (!poaData.assigned_person_id)
      errors.assigned_person_id = "Sales Person is required.";
    if (!poaData.assign_date)
      errors.assign_date = "Meeting Date is required.";
    if (!poaData.meeting_type)
      errors.meeting_type = "Meeting Type is required.";
    if (!poaData.lead_summary)
      errors.lead_summary = "Meeting Summary is required.";
    // if (!poaData.product_sale)
    //   errors.product_sale = "Product Sale is required.";
    // if (!poaData.total_material_qty)
    //   errors.total_material_qty = "Total Material Qty is required.";
    // if (!poaData.approx_business)
    //   errors.approx_business = "Approx Business is required.";
    // if (!poaData.project_name)
    //   errors.project_name = "Project Name is required.";

    setPoaFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Submit handler
  const handleSubmitPoa = async (e) => {
    e.preventDefault();
    if (validatePoaForm()) {
      try {
        const response = await dispatch(addLead(poaData)).unwrap();
        console.log("response",response);
        if (response?.success) {
          handlePoaFlashMessage(response?.message, "success");

          dispatch(
            listLeads({
              page: currentPage,
              limit: poaPerPage,
              search: searchTerm,
            })
          );

          setPoaData({});

          //add google calender event 
          if (isAuthenticated) {
            handleAddEvent(poaData);
          }
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
          listLeads({
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
  //google calender (poa) event add 
  const handleAddEvent = (poaData) => {
    const event = {
       title: "Meeting Sheduled",
       location: poaData?.lead_address,
       description: poaData?.lead_summary,
       startDateTime: poaData?.assign_date,
       endDateTime: poaData?.assign_date,
       attendeesEmails: attendeesEmails,
    };
    console.log("event", event);
    createEvent(event);
  };

  //end google calender (poa) event add


  return (
    <div className="main-content">
      <ContentTop />
      <div className="flex flex-col gap-[20px]">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-5 md:justify-between"> 
          <div>
            <h1 className="text-white text-textdata whitespace-nowrap font-semibold">
            Visit Plan (POA)
            </h1>
          </div>
          <div className="flex flex-col md:flex-row items-start md:items-center gap-[5px]">
            <div>
              <input
                type="search"
                className="relative m-0 block w-full min-w-0 flex-auto rounded border border-solid border-[#473b33] bg-transparent bg-clip-padding px-3 py-[0.15rem] text-base font-normal leading-[1.6] text-white outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-[#473b33] focus:text-white focus:shadow-[#473b33] focus:outline-none dark:border-[#473b33] dark:text-white dark:placeholder:text-white dark:focus:border-[#473b33]"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="mt-4 md:mt-0 flex items-start gap-5 md:gap-1">
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
            <div>
              <button
                className="flex items-center text-textdata whitespace-nowrap text-white bg-[#fe6c00] rounded-[3px] px-3 py-[0.28rem]"
                onClick={() => setAddUserModalOpen(true)}
              >
                <img
                  src={iconsImgs.plus}
                  alt="plus icon"
                  className="w-[18px] mr-1"
                />{" "}
                POA for Day
              </button>
            </div>
            </div>
          </div>
        </div>
        <div className="main-content-holder max-h-[615px] overflow-y-auto scrollbar-hide">
          <div className="bg-bgData rounded-[8px] shadow-md shadow-black/5 text-white px-4 py-6 overflow-auto">
            {/*------- Table Data Start -------*/}
            <DepartmentTable
              setEditUserModalOpen={setEditUserModalOpen}
              poaList={leads?.data || []}
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

          {/* Add User Modal */}
          {isAddUserModalOpen && (
            <AddRoleModal
              setAddUserModalOpen={setAddUserModalOpen}
              poaData={poaData}
              setPoaData={setPoaData}
              handlePoaChange={handlePoaChange}
              handleSubmitPoa={handleSubmitPoa}
              poaFormErrors={poaFormErrors}
              poaFlashMessage={poaFlashMessage}
              poaFlashMsgType={poaFlashMsgType}
              allCustomers={allCustomers}
              handlePoaCustomerChange={handlePoaCustomerChange}
              customerAddress={customerAddress}
              userDataWithRole={userDataWithRole}
              userDeatail={userDeatail}
            />
          )}

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

          {isLeadAssignPopup && (
            <ParticularLeadAssign
              setIsLeadAssignPopup={setIsLeadAssignPopup}
              setSelectedPOAId={setSelectedPOAId}
              selectedPOA={selectedPOA}
              userDataWithRole={userDataWithRole}
              handleAssignSalesPerson={handleAssignSalesPerson}
              poaUpdateData={poaUpdateData}
              setPoaUpdateData={setPoaUpdateData}
              handlePoaUpdateChange={handlePoaUpdateChange}
              validatePoaUpdateForm={validatePoaUpdateForm}
              poaFlashMessage={poaFlashMessage}
              poaFlashMsgType={poaFlashMsgType}
              poaFormErrors={poaFormErrors}
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
