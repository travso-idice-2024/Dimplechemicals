import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./MarketingManageData.css";
import { iconsImgs } from "../../../utils/images";
import DepartmentTable from "./DepartmentTable";
import Pagination from "./Pagination";
import AddRoleModal from "./AddRoleModal";
import ViewUserModal from "./ViewUserModal";
import EditUserModal from "./EditUserModal";
import AssignLeadModal from "./AssignLeadModal";
import {
  addLead,
  updateLead,
  listLeads,
  removeLead,
} from "../../../redux/leadSlice";
import { fetchCurrentUser } from "../../../redux/authSlice";
import { fetchUserWithRole } from "../../../redux/userSlice";
import {
  fetchAllCustomers,
  getAllAddressByCustomerId,
} from "../../../redux/customerSlice";

const MarketingManageData = () => {
  const dispatch = useDispatch();
  const { leads, totalPages, departmentloading, departmenterror } = useSelector(
    (state) => state.lead
  );

  const { userDataWithRole } = useSelector((state) => state.user);

  const { user: userDeatail } = useSelector((state) => state.auth);

  const { allCustomers, customerAddress } = useSelector(
    (state) => state.customer
  );
  console.log("allCustomers", allCustomers?.data);
  console.log("customerAddress", customerAddress);
  const [selectedLead, setSelectedLead] = useState({});
  const [isAddUserModalOpen, setAddUserModalOpen] = useState(false);
  const [isViewModalOpen, setViewModalOpen] = useState(false);
  const [isEditUserModalOpen, setEditUserModalOpen] = useState(false);
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [showTextareaPS, setShowTextareaPS] = useState(false);
  const [showQuantityPS, setShowQuantityPS] = useState(false);
  const [showBudgetPS, setShowBudgetPS] = useState(false);

  // Pagination & Search States
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const leadPerPage = 4;

  // Fetch departments whenever searchTerm or currentPage changes
  useEffect(() => {
    dispatch(fetchAllCustomers());
    dispatch(
      fetchUserWithRole({
        roleId: 4,
      })
    );
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

  //add lead====================================================================================
  const [leadData, setLeadData] = useState({
    customer_id: "",
    //lead_owner_id: "",
    assigned_person_id: "",
    lead_source: "",
    lead_status: "",
    assign_date: "",
    lead_summary: "",
    lead_address: "",
  });

  const [addLeadFormErrors, setaddLeadFormErrors] = useState({});
  const [addLeadFlashMessage, setAddLeadFlashMessage] = useState("");
  const [addLeadFlashMsgType, setAddLeadFlashMsgType] = useState("");

  const handleLeadChange = (e) => {
    const { name, value } = e.target;
    setLeadData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleLeadCustomerChange = (e) => {
    const { value } = e.target;
    //console.log("function calling",value);
    // Dispatch to get addresses based on selected customer ID
    dispatch(getAllAddressByCustomerId({ id: value }));

    // Only store customer_id in leadData
    setLeadData((prevData) => ({
      ...prevData,
      customer_id: value, // Store only customer_id
    }));
  };

  // Function to show flash messages for delete actions
  const handleAddLeadFlashMessage = (message, type) => {
    setAddLeadFlashMessage(message);
    setAddLeadFlashMsgType(type);
    setTimeout(() => {
      setAddLeadFlashMessage("");
      setAddLeadFlashMsgType("");
    }, 3000); // Hide the message after 3 seconds
  };

  const leadvalidateForm = () => {
    let newErrors = {};
    if (!leadData.assigned_person_id)
      newErrors.assigned_person_id = "Assigned Person is required.";
    if (!leadData.lead_source)
      newErrors.lead_source = "Lead Source is required.";
    if (!leadData.lead_status)
      newErrors.lead_status = "Lead Status is required.";
    if (!leadData.assign_date)
      newErrors.assign_date = "Assign Date is required.";
    if (!leadData.lead_summary)
      newErrors.lead_summary = "Lead Summary is required.";

    setaddLeadFormErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmitAddLead = async (e) => {
    e.preventDefault();
    if (leadvalidateForm()) {
      try {
        const response = await dispatch(addLead(leadData)).unwrap();
        //console.log(response);
        if (response?.success) {
          handleAddLeadFlashMessage(response?.message, "success");
          //dispatch(listCustomers());
          dispatch(
            listLeads({
              page: currentPage,
              limit: leadPerPage,
              search: searchTerm,
            })
          );

          setLeadData((prevData) => ({
            customer_id: "",
            assigned_person_id: "",
            lead_source: "",
            lead_status: "",
            assign_date: "",
            lead_summary: "",
          }));

          setTimeout(() => {
            setIsAssignModalOpen(false);
          }, 3000);
        } else {
          handleAddLeadFlashMessage(
            response?.message || "Something went wrong",
            "error"
          );
        }
      } catch (error) {
        console.error("Error adding lead:", error);
        handleAddLeadFlashMessage(
          error?.message || "An error occurred",
          "error"
        );
      }
    }
  };

  //end add lead================================================================================

  //update lead====================================================================================
  const [updateLeadData, setUpdateLeadData] = useState({
    customer_id: "",
    client_name: "",
    lead_owner_id: "",
    assigned_person_id: "",
    lead_source: "",
    lead_status: "",
    assign_date: "",
    lead_summary: "",
    last_contact: "",
    next_followup: "",
    product_service: "",
    product_detail: "",
    quantity: "",
    quantity_no: "",
    special_requirement: "",
    who_contact_before: "",
    last_communication: "",
    follow_up_record: "",
    budget: "",
    budget_status: "",
    lead_address: "",
    lead_custom_address: "",
  });

  const [updateLeadFormErrors, setUpdateLeadFormErrors] = useState({});
  const [updateLeadFlashMessage, setUpdateLeadFlashMessage] = useState("");
  const [updateLeadFlashMsgType, setUpdateLeadFlashMsgType] = useState("");

  useEffect(() => {
    if (selectedLead) {
      setUpdateLeadData({
        customer_id: selectedLead?.customer?.id || "",
        client_name: selectedLead?.customer?.client_name || "",
        lead_owner_id: selectedLead?.leadOwner?.fullname || "",
        assigned_person_id: selectedLead?.assignedPerson?.id || "",
        lead_source: selectedLead?.lead_source || "",
        lead_status: selectedLead.lead_status || "",
        assign_date: selectedLead?.assign_date?.split("T")[0] || "",
        lead_summary: selectedLead?.lead_summary || "",
        last_contact: selectedLead?.last_contact?.split("T")[0] || "",
        next_followup: selectedLead?.next_followup?.split("T")[0] || "",
        product_service: selectedLead.product_service || "",
        product_detail: selectedLead.product_detail || "",
        quantity: selectedLead.quantity || "",
        quantity_no: selectedLead.quantity_no || "",
        special_requirement: selectedLead.special_requirement || "",
        who_contact_before: selectedLead?.assignedPerson?.fullname || "",
        last_communication: selectedLead?.last_communication || "",
        follow_up_record: selectedLead.follow_up_record || "",
        budget: selectedLead.budget || "",
        lead_address: selectedLead?.lead_address || "",
        lead_custom_address: selectedLead?.lead_custom_address || "",
        budget_status: selectedLead?.budget_status || "",
      });
      dispatch(getAllAddressByCustomerId({ id: selectedLead?.customer?.id }));
    }
  }, [selectedLead]);

  // Handle input changes for update form
  const handleUpdateLeadChange = (e) => {
    const { name, value } = e.target;
    setUpdateLeadData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleLeadUpdateCustomerChange = (e) => {
    const { value } = e.target;
    console.log("function calling", value);
    // Dispatch to get addresses based on selected customer ID
    dispatch(getAllAddressByCustomerId({ id: value }));

    // Only store customer_id in leadData
    setUpdateLeadData((prevData) => ({
      ...prevData,
      customer_id: value, // Store only customer_id
    }));
  };

  // Function to show flash messages for update actions
  const handleUpdateLeadFlashMessage = (message, type) => {
    setUpdateLeadFlashMessage(message);
    setUpdateLeadFlashMsgType(type);
    setTimeout(() => {
      setUpdateLeadFlashMessage("");
      setUpdateLeadFlashMsgType("");
    }, 3000); // Hide the message after 3 seconds
  };

  // Validate the update form
  const updateLeadValidateForm = () => {
    let newErrors = {};
    if (!updateLeadData.assigned_person_id)
      newErrors.assigned_person_id = "Assigned Person is required.";
    if (!updateLeadData.lead_source)
      newErrors.lead_source = "Lead Source is required.";
    if (!updateLeadData.lead_status)
      newErrors.lead_status = "Lead Status is required.";
    if (!updateLeadData.assign_date)
      newErrors.assign_date = "Assign Date is required.";
    if (!updateLeadData.lead_summary)
      newErrors.lead_summary = "Lead Summary is required.";

    setUpdateLeadFormErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission for updating lead
  const handleSubmitUpdateLead = async (e) => {
    e.preventDefault();
    if (updateLeadValidateForm()) {
      try {
        console.log("updateLeadData", updateLeadData);
        const response = await dispatch(
          updateLead({
            id: selectedLead.id,
            updateLeadData: updateLeadData,
          })
        ).unwrap();

        if (response?.success) {
          handleUpdateLeadFlashMessage(response?.message, "success");

          dispatch(
            listLeads({
              page: currentPage,
              limit: leadPerPage,
              search: searchTerm,
            })
          );

          // Reset the form after a successful update
          // setUpdateLeadData({
          //   customer_id: "",
          //   assigned_person_id: "",
          //   lead_source: "",
          //   lead_status: "",
          //   assign_date: "",
          //   lead_summary: "",
          // });

          setTimeout(() => {
            setEditUserModalOpen(false);
          }, 3000);
        } else {
          handleUpdateLeadFlashMessage(
            response?.message || "Something went wrong",
            "error"
          );
        }
      } catch (error) {
        console.error("Error updating lead:", error);
        handleUpdateLeadFlashMessage(
          error?.message || "An error occurred",
          "error"
        );
      }
    }
  };

  //end update lead================================================================================
  //delete lead==========================================================
  const [deleteFlashMessage, setDeleteFlashMessage] = useState("");
  const [deleteFlashMsgType, setDeleteFlashMsgType] = useState("");
  // ✅ Function to show delete flash messages
  const handleDeleteFlashMessage = (message, type) => {
    setDeleteFlashMessage(message);
    setDeleteFlashMsgType(type);
    setTimeout(() => {
      setDeleteFlashMessage("");
      setDeleteFlashMsgType("");
    }, 3000); // Hide the message after 3 seconds
  };
  const handleDelete = async (id) => {
    try {
      await dispatch(removeLead(id)).unwrap();
      handleDeleteFlashMessage("Lead deleted successfully!", "success");
      dispatch(
        listLeads({
          page: currentPage,
          limit: leadPerPage,
          search: searchTerm,
        })
      );
    } catch (error) {
      handleDeleteFlashMessage(
        error?.message || "Failed to delete lead",
        "error"
      );
    }
  };
  //end delete lead======================================================
  return (
    <div className="main-content-holder max-h-[615px] overflow-y-auto scrollbar-hide">
      <div className="flex flex-col gap-[20px]">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-white text-textdata font-semibold">
              Lead Management
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
                onClick={() => setIsAssignModalOpen(true)}
              >
                <img
                  src={iconsImgs.plus}
                  alt="plus icon"
                  className="w-[18px] mr-1"
                />{" "}
                Add New Lead
              </button>
            </div>
          </div>
        </div>
        <div className="bg-bgData rounded-[8px] shadow-md shadow-black/5 text-white px-4 py-6">
          {/*------- Table Data Start -------*/}
          <DepartmentTable
            setEditUserModalOpen={setEditUserModalOpen}
            Leads={leads?.data}
            setViewModalOpen={setViewModalOpen}
            setIsAssignModalOpen={setIsAssignModalOpen}
            selectedLead={selectedLead}
            setSelectedLead={setSelectedLead}
            deleteFlashMessage={deleteFlashMessage}
            deleteFlashMsgType={deleteFlashMsgType}
            handleDeleteFlashMessage={handleDeleteFlashMessage}
            handleDelete={handleDelete}
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
      {/* {isAddUserModalOpen && (
        <AddRoleModal setAddUserModalOpen={setAddUserModalOpen} />
      )} */}

      {/* Edit User Modal */}
      {isEditUserModalOpen && (
        <EditUserModal
          setEditUserModalOpen={setEditUserModalOpen}
          showBudgetPS={showBudgetPS}
          setShowBudgetPS={setShowBudgetPS}
          showQuantityPS={showQuantityPS}
          setShowQuantityPS={setShowQuantityPS}
          showTextareaPS={showTextareaPS}
          setShowTextareaPS={setShowTextareaPS}
          selectedLead={selectedLead}
          setSelectedLead={setSelectedLead}
          allCustomers={allCustomers}
          updateLeadData={updateLeadData}
          setUpdateLeadData={setUpdateLeadData}
          updateLeadFormErrors={updateLeadFormErrors}
          setUpdateLeadFormErrors={setUpdateLeadFormErrors}
          updateLeadFlashMessage={updateLeadFlashMessage}
          setUpdateLeadFlashMessage={setUpdateLeadFlashMessage}
          updateLeadFlashMsgType={updateLeadFlashMsgType}
          setUpdateLeadFlashMsgType={setUpdateLeadFlashMsgType}
          handleUpdateLeadChange={handleUpdateLeadChange}
          handleUpdateLeadFlashMessage={handleUpdateLeadFlashMessage}
          updateLeadValidateForm={updateLeadValidateForm}
          handleSubmitUpdateLead={handleSubmitUpdateLead}
          userDataWithRole={userDataWithRole}
          handleLeadUpdateCustomerChange={handleLeadUpdateCustomerChange}
          customerAddress={customerAddress}
        />
      )}

      {/* View User Modal */}
      {isViewModalOpen && (
        <ViewUserModal
          setViewModalOpen={setViewModalOpen}
          selectedLead={selectedLead}
        />
      )}

      {/* Assign Customer Modal */}
      {isAssignModalOpen && (
        <AssignLeadModal setIsAssignModalOpen={setIsAssignModalOpen} />
      )}

      {isAssignModalOpen && (
        <AssignLeadModal
          setIsAssignModalOpen={setIsAssignModalOpen}
          userDataWithRole={userDataWithRole}
          leadData={leadData}
          setLeadData={setLeadData}
          addLeadFormErrors={addLeadFormErrors}
          setAddLeadFormErrors={setaddLeadFormErrors}
          addLeadFlashMessage={addLeadFlashMessage}
          addLeadFlashMsgType={addLeadFlashMsgType}
          handleLeadChange={handleLeadChange}
          handleSubmitAddLead={handleSubmitAddLead}
          allCustomers={allCustomers}
          handleLeadCustomerChange={handleLeadCustomerChange}
          customerAddress={customerAddress}
        />
      )}
    </div>
  );
};

export default MarketingManageData;
