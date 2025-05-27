import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./CostWorkingManageData.css";
import { iconsImgs } from "../../../utils/images";
import CostWorkingTable from "./CostWorkingTable";
import ContentTop from "../../ContentTop/ContentTop";
import Pagination from "./Pagination";
import AddCostWorkingModal from "./AddCostWorkingModal";
import ViewCostWorkingModal from "./ViewCostWorkingModal";
import EditCostWorkingModal from "./EditCostWorkingModal";
import { addCostWorking ,listCostWorkings,updateCostWorking} from "../../../redux/costWorkingSlice";
import {updateLead, listLeads,removeLead} from "../../../redux/leadSlice";
import { fetchCurrentUser } from "../../../redux/authSlice";
import { fetchUserWithRole } from "../../../redux/userSlice";
import {
  fetchAllCustomers,
  getAllAddressByCustomerId,
} from "../../../redux/customerSlice";

const CostWorkingManageData = () => {
  const dispatch = useDispatch();
  const { costWorkings, totalPages, costWorkingLoading, costWorkingError } = useSelector(
    (state) => state.costWorking
  );

  //console.log("costWorkings",costWorkings);

  const { user: userDeatail } = useSelector((state) => state.auth);

  const { allCustomers, customerAddress } = useSelector(
    (state) => state.customer
  );
 
const [selectedCostWorking, setSelectedCostWorking] = useState({});
const [isViewCostWorkingModalOpen, setViewCostWorkingModalOpen] = useState(false);
const [isEditCostWorkingModalOpen, setEditCostWorkingModalOpen] = useState(false);
const [isCostWorkingModalOpen, setIsCostWorkingModalOpen] = useState(false);


// Pagination & Search States
const [searchTerm, setSearchTerm] = useState("");
const [currentPage, setCurrentPage] = useState(1);
const costWorkingPerPage = 8;


  // Fetch departments whenever searchTerm or currentPage changes
  useEffect(() => {
    dispatch(fetchAllCustomers());
    // dispatch(
    //   fetchUserWithRole({
    //     roleId: 4,
    //   })
    // );
    dispatch(
      listCostWorkings({
        page: currentPage,
        limit: costWorkingPerPage,
        search: searchTerm,
      })
    );
  }, [dispatch, currentPage, searchTerm,costWorkingPerPage]);

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
  const [costWorkingData, setCostWorkingData] = useState({
    company_name: "",
    location: "",
    nature_of_work: "",
    technology_used: "",
    //estimate_no: "",
    estimate_date: "",
    revision_date: "",
    area_to_be_coated: "",
    thickness_in_mm: "",
    labour_cost: "",
    cunsumable_cost: "",
    transport_cost: "",
    supervision_cost: "",
    contractor_profit: "",
    over_head_charges: "",
    total_application_labour_cost: "",
    total_project_cost: "",
    total_material_cost:"",
    products: [], // Array to store multiple products
  });
  

  const [costWorkingFormErrors, setCostWorkingErrors] = useState({});
  const [costWorkingFlashMessage, setCostWorkingFlashMessage] = useState("");
  const [costWorkingFlashMsgType, setCostWorkingFlashMsgType] = useState("");
  
  const handleCostWorkingChange = (e) => {
    const { name, value } = e.target;
  
    // Update field as-is (string) so input works correctly
    const updatedData = {
      ...costWorkingData,
      [name]: value,
    };
  
    // Recalculate total_application_labour_cost from parsed floats
    const sumFields = [
      "labour_cost",
      "cunsumable_cost",
      "transport_cost",
      "supervision_cost",
      "contractor_profit",
      "over_head_charges",
    ];
  
    const total = sumFields.reduce((acc, field) => {
      const fieldValue = parseFloat(updatedData[field]);
      return acc + (isNaN(fieldValue) ? 0 : fieldValue);
    }, 0);
  
    updatedData.total_application_labour_cost = total;
  
    setCostWorkingData(updatedData);
  };
  
  const handleCostWorkingCustomerChange = (e) => {
    const { value } = e.target;
    
    dispatch(getAllAddressByCustomerId({ id: value }));
    // Only store customer_id in leadData
    setCostWorkingData((prevData) => ({
      ...prevData,
      company_name: value, // Store only customer_id
    }));
  };

  // Function to show flash messages for delete actions
  const handleCostWorkingFlashMessage = (message, type) => {
    setCostWorkingFlashMessage(message);
    setCostWorkingFlashMsgType(type);
    setTimeout(() => {
      setCostWorkingFlashMessage("");
      setCostWorkingFlashMsgType("");
    }, 3000); // Hide the message after 3 seconds
  };
  

  const costWorkingValidateForm = () => {
    let errors = {};
  
    if (!costWorkingData.company_name) errors.company_name = "Company Name is required.";
    if (!costWorkingData.location) errors.location = "Location is required.";
    if (!costWorkingData.nature_of_work) errors.nature_of_work = "Nature of Work is required.";
    if (!costWorkingData.technology_used) errors.technology_used = "Technology Used is required.";
    //if (!costWorkingData.estimate_no) errors.estimate_no = "Estimate Number is required.";
    if (!costWorkingData.estimate_date) errors.estimate_date = "Estimate Date is required.";
    //if (!costWorkingData.revision_no) errors.revision_no = "Revision Number is required.";
    // if (!costWorkingData.revision_date) errors.revision_date = "Revision Date is required.";
    if (!costWorkingData.area_to_be_coated) errors.area_to_be_coated = "Area to be Coated is required.";
    if (!costWorkingData.thickness_in_mm) errors.thickness_in_mm = "Thickness in MM is required.";
    if (!costWorkingData.labour_cost) errors.labour_cost = "Labour Cost is required.";
    if (!costWorkingData.cunsumable_cost) errors.cunsumable_cost = "Consumable Cost is required.";
    if (!costWorkingData.transport_cost) errors.transport_cost = "Transport Cost is required.";
    if (!costWorkingData.supervision_cost) errors.supervision_cost = "Supervision Cost is required.";
    if (!costWorkingData.contractor_profit) errors.contractor_profit = "Contractor Profit is required.";
    if (!costWorkingData.over_head_charges) errors.over_head_charges = "Overhead Charges are required.";
    //if (!costWorkingData.total_application_labour_cost) errors.total_application_labour_cost = "Total Application Labour Cost is required.";
    if (!costWorkingData.total_project_cost) errors.total_project_cost = "Total Project Cost is required.";
  
    setCostWorkingErrors(errors);
    return Object.keys(errors).length === 0;
    
  };
  
 //console.log("costWorkingFormErrors",costWorkingFormErrors);
  const handleSubmitCostWorking = async (e) => {
     console.log("fromdata" , costWorkingData);
    if (costWorkingValidateForm()) {
      try {
        const response = await dispatch(addCostWorking(costWorkingData)).unwrap();
  
        if (response?.success) {
          handleCostWorkingFlashMessage(response?.message, "success");
  
          dispatch(
            listCostWorkings({
              page: currentPage,
              limit: costWorkingPerPage,
              search: searchTerm,
            })
          );
  
          setCostWorkingData((prevData) => ({
            company_name: "",
            location: "",
            nature_of_work: "",
            technology_used: "",
            //estimate_no: "",
            estimate_date: "",
            revision_date: "",
            area_to_be_coated: "",
            thickness_in_mm: "",
            labour_cost: "",
            cunsumable_cost: "",
            transport_cost: "",
            supervision_cost: "",
            contractor_profit: "",
            over_head_charges: "",
            total_application_labour_cost: "",
            total_project_cost: "",
            total_material_cost:"",
            products: []
          }));
  
          setTimeout(() => {
            setIsCostWorkingModalOpen(false);
          }, 3000);
        } else {
          handleCostWorkingFlashMessage(
            response?.message || "Something went wrong",
            "error"
          );
        }
      } catch (error) {
        console.error("Error adding cost working:", error);
        handleCostWorkingFlashMessage(
          error?.message || "An error occurred",
          "error"
        );
      }
    }
  };
  

  //end add lead================================================================================

  //update lead====================================================================================
  const [editCostWorkingData, setEditCostWorkingData] = useState({
    company_name: "",
    location: "",
    nature_of_work: "",
    technology_used: "",
    estimate_no: "",
   // estimate_date: "",
    revision_date: "",
    area_to_be_coated: "",
    thickness_in_mm: "",
    labour_cost: "",
    cunsumable_cost: "",
    transport_cost: "",
    supervision_cost: "",
    contractor_profit: "",
    over_head_charges: "",
    total_application_labour_cost: "",
    total_project_cost: "",
    total_material_cost: "",
    products: [], // Array to store multiple products
  });
  

  const [editCostWorkingFormErrors, setEditCostWorkingFormErrors] = useState({});
const [editCostWorkingFlashMessage, setEditCostWorkingFlashMessage] = useState("");
const [editCostWorkingFlashMsgType, setEditCostWorkingFlashMsgType] = useState("");


useEffect(() => {
  if (selectedCostWorking) {
    setEditCostWorkingData({
      company_name: selectedCostWorking.company_name || "",
      location: selectedCostWorking.location || "",
      nature_of_work: selectedCostWorking.nature_of_work || "",
      technology_used: selectedCostWorking.technology_used || "",
      //estimate_no: selectedCostWorking.estimate_no || "",
      estimate_date: selectedCostWorking?.estimate_date?.split("T")[0] || "",
      //revision_no: selectedCostWorking.revision_no || "",
      revision_date: selectedCostWorking.revision_date?.split("T")[0] || "",
      area_to_be_coated: selectedCostWorking.area_to_be_coated || "",
      thickness_in_mm: selectedCostWorking.thickness_in_mm || "",
      labour_cost: selectedCostWorking.labour_cost || "",
      cunsumable_cost: selectedCostWorking.cunsumable_cost || "",
      transport_cost: selectedCostWorking.transport_cost || "",
      supervision_cost: selectedCostWorking.supervision_cost || "",
      contractor_profit: selectedCostWorking.contractor_profit || "",
      over_head_charges: selectedCostWorking.over_head_charges || "",
      total_application_labour_cost:
        selectedCostWorking.total_application_labour_cost || "",
      total_project_cost: selectedCostWorking.total_project_cost || "",
      total_material_cost: selectedCostWorking.total_material_cost || "",
      products: selectedCostWorking.products || [],
    });
  }
}, [selectedCostWorking]);



  // Handle input changes for update form
  const handleEditCostWorkingChange = (e) => {
    const { name, value } = e.target;
  
    // Update field as-is (string) so input works correctly
    const updatedData = {
      ...editCostWorkingData,
      [name]: value,
    };
  
    // Recalculate total_application_labour_cost from parsed floats
    const sumFields = [
      "labour_cost",
      "cunsumable_cost",
      "transport_cost",
      "supervision_cost",
      "contractor_profit",
      "over_head_charges",
    ];
  
    const total = sumFields.reduce((acc, field) => {
      const fieldValue = parseFloat(updatedData[field]);
      return acc + (isNaN(fieldValue) ? 0 : fieldValue);
    }, 0);
  
    updatedData.total_application_labour_cost = total;
  
    setEditCostWorkingData(updatedData);
  };
  
  const handleEditCostWorkingCustomerChange = (e) => {
    const { value } = e.target;
  
    dispatch(getAllAddressByCustomerId({ id: value }));
    
    // Only store customer_id in editCostWorkingData
    setEditCostWorkingData((prevData) => ({
      ...prevData,
      company_name: value, // Store only customer_id
    }));
  };
  

  // Function to show flash messages for update actions
  const handleEditCostWorkingFlashMessage = (message, type) => {
    setEditCostWorkingFlashMessage(message);
    setEditCostWorkingFlashMsgType(type);
    setTimeout(() => {
      setEditCostWorkingFlashMessage("");
      setEditCostWorkingFlashMsgType("");
    }, 3000); // Hide the message after 3 seconds
  };
  

  // Validate the update form
  const editCostWorkingValidateForm = () => {
    let errors = {};
  
    if (!editCostWorkingData.company_name) errors.company_name = "Company Name is required.";
    if (!editCostWorkingData.location) errors.location = "Location is required.";
    if (!editCostWorkingData.nature_of_work) errors.nature_of_work = "Nature of Work is required.";
    if (!editCostWorkingData.technology_used) errors.technology_used = "Technology Used is required.";
    //if (!editCostWorkingData.estimate_no) errors.estimate_no = "Estimate Number is required.";
    if (!editCostWorkingData.estimate_date) errors.estimate_date = "Estimate Date is required.";
   // if (!editCostWorkingData.revision_no) errors.revision_no = "Revision Number is required.";
    // if (!editCostWorkingData.revision_date) errors.revision_date = "Revision Date is required.";
    if (!editCostWorkingData.area_to_be_coated) errors.area_to_be_coated = "Area to be Coated is required.";
    if (!editCostWorkingData.thickness_in_mm) errors.thickness_in_mm = "Thickness in MM is required.";
    if (!editCostWorkingData.labour_cost) errors.labour_cost = "Labour Cost is required.";
    if (!editCostWorkingData.cunsumable_cost) errors.cunsumable_cost = "Consumable Cost is required.";
    if (!editCostWorkingData.transport_cost) errors.transport_cost = "Transport Cost is required.";
    if (!editCostWorkingData.supervision_cost) errors.supervision_cost = "Supervision Cost is required.";
    if (!editCostWorkingData.contractor_profit) errors.contractor_profit = "Contractor Profit is required.";
    if (!editCostWorkingData.over_head_charges) errors.over_head_charges = "Overhead Charges are required.";
    // if (!editCostWorkingData.total_application_labour_cost) errors.total_application_labour_cost = "Total Application Labour Cost is required.";
    if (!editCostWorkingData.total_project_cost) errors.total_project_cost = "Total Project Cost is required.";
  
    setEditCostWorkingFormErrors (errors);
    return Object.keys(errors).length === 0;
  };
  

  // Handle form submission for updating lead
  const handleSubmitEditCostWorking = async (e) => {
    console.log("edit form data",selectedCostWorking.id, editCostWorkingData);
    
    if (editCostWorkingValidateForm()) {
      try {
        const response = await dispatch(updateCostWorking({id:selectedCostWorking.id, data:editCostWorkingData})).unwrap();
  
        if (response?.success) {
          handleEditCostWorkingFlashMessage(response?.message, "success");
  
          dispatch(
            listCostWorkings({
              page: currentPage,
              limit: costWorkingPerPage,
              search: searchTerm,
            })
          );
  
          // setEditCostWorkingData({
          //   company_name: "",
          //   location: "",
          //   nature_of_work: "",
          //   technology_used: "",
          //   estimate_no: "",
          //   estimate_date: "",
          //   revision_date: "",
          //   area_to_be_coated: "",
          //   thickness_in_mm: "",
          //   labour_cost: "",
          //   cunsumable_cost: "",
          //   transport_cost: "",
          //   supervision_cost: "",
          //   contractor_profit: "",
          //   over_head_charges: "",
          //   total_application_labour_cost: "",
          //   total_project_cost: "",
          //   total_material_cost: "",
          //   products: [],
          // });
  
          setTimeout(() => {
            setEditCostWorkingModalOpen(false);
          }, 1000);
        } else {
          handleEditCostWorkingFlashMessage(
            response?.message || "Something went wrong",
            "error"
          );
        }
      } catch (error) {
        console.error("Error updating cost working:", error);
        handleEditCostWorkingFlashMessage(
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
    <div className="main-content">
      <ContentTop />
      <div className="flex flex-col gap-[20px]">
        <div className="flex items-start md:items-center flex-col md:flex-row md:justify-between">
          <div className="md:mb-0 mb-2">
            <h1 className="text-white text-textdata whitespace-nowrap font-semibold">
              CostWorking Management
            </h1>
          </div>
          <div className="flex items-start md:items-center flex-col md:flex-row gap-[5px]">
            <div className="md:mb-0 mb-2">
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
                onClick={() => setIsCostWorkingModalOpen(true)}
              >
                <img
                  src={iconsImgs.plus}
                  alt="plus icon"
                  className="w-[18px] mr-1"
                />{" "}
                Add New Cost
              </button>
            </div>
          </div>
        </div>
        <div className="main-content-holder max-h-[615px] heightfixalldevice overflow-y-auto scrollbar-hide">
        <div className="bg-bgData rounded-[8px] shadow-md shadow-black/5 text-white px-4 py-6 overflow-auto">
          {/*------- Table Data Start -------*/}
          <CostWorkingTable
            setEditCostWorkingModalOpen={setEditCostWorkingModalOpen}
            CostWorkings={costWorkings}
            setViewCostWorkingModalOpen={setViewCostWorkingModalOpen}
            setSelectedCostWorking={setSelectedCostWorking}
            selectedCostWorking={selectedCostWorking}
            deleteFlashMessage={deleteFlashMessage}
            deleteFlashMsgType={deleteFlashMsgType}
            handleDeleteFlashMessage={handleDeleteFlashMessage}
            handleDelete={handleDelete}
          />
          {/*------- Table Data End -------*/}
        </div>
        </div>
       

      {/* Add User Modal */}
      {/* {isAddUserModalOpen && (
        <AddRoleModal setAddUserModalOpen={setAddUserModalOpen} />
      )} */}

      {/* Edit User Modal */}
      {isEditCostWorkingModalOpen && (
  <EditCostWorkingModal
  setEditCostWorkingModalOpen={setEditCostWorkingModalOpen}
    selectedCostWorking={selectedCostWorking}
    setSelectedCostWorking={setSelectedCostWorking}
    allCustomers={allCustomers}
    editCostWorkingData={editCostWorkingData}
    setEditCostWorkingData={setEditCostWorkingData}
    editCostWorkingFormErrors={editCostWorkingFormErrors}
    setEditCostWorkingFormErrors={setEditCostWorkingFormErrors}
    editCostWorkingFlashMessage={editCostWorkingFlashMessage}
    setEditCostWorkingFlashMessage={setEditCostWorkingFlashMessage}
    editCostWorkingFlashMsgType={editCostWorkingFlashMsgType}
    setEditCostWorkingFlashMsgType={setEditCostWorkingFlashMsgType}
    handleEditCostWorkingChange={handleEditCostWorkingChange}
    handleEditCostWorkingFlashMessage={handleEditCostWorkingFlashMessage}
    editCostWorkingValidateForm={editCostWorkingValidateForm}
    handleSubmitEditCostWorking={handleSubmitEditCostWorking}
    handleEditCostWorkingCustomerChange={handleEditCostWorkingCustomerChange}
    customerAddress={customerAddress}
  />
)}


      {/* View User Modal */}
      {isViewCostWorkingModalOpen && (
        <ViewCostWorkingModal
          setViewCostWorkingModalOpen={setViewCostWorkingModalOpen}
          selectedCostWorking={selectedCostWorking}
        />
      )}

      {/* Assign Customer Modal */}

      {isCostWorkingModalOpen && (
  <AddCostWorkingModal
    setIsCostWorkingModalOpen={setIsCostWorkingModalOpen}
    costWorkingData={costWorkingData}
    setCostWorkingData={setCostWorkingData}
    costWorkingFormErrors={costWorkingFormErrors}
    selectedCostWorking={selectedCostWorking}
    setSelectedCostWorking={setSelectedCostWorking}
    costWorkingFlashMessage={costWorkingFlashMessage}
    costWorkingFlashMsgType={costWorkingFlashMsgType}
    handleCostWorkingChange={handleCostWorkingChange}
    handleSubmitCostWorking={handleSubmitCostWorking}
    allCustomers={allCustomers}
    customerAddress={customerAddress}
    handleCostWorkingCustomerChange={handleCostWorkingCustomerChange}
  />
)}
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

export default CostWorkingManageData;
