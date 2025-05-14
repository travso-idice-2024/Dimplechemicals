import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./MarketingManageData.css";
import { iconsImgs } from "../../../utils/images";
import DepartmentTable from "./DepartmentTable";
import Pagination from "./Pagination";
import AddRoleModal from "./AddRoleModal";
import ViewUserModal from "./ViewUserModal";
import ViewCustomerModal from "./ViewCustomerModal";
import EditUserModal from "./EditUserModal";
import AssignLeadModal from "./AssignLeadModal";
import ParticularLeadAssign from "./ParticularLeadAssign";
import DealCreationForm from "./DealCreationForm";
import ViewCustomerHistoryCardReport from "./ViewCustomerHistoryCardReport";
import {
  addLead,
  updateLead,
  GenratedlistLeads,
  listLeads,
  removeLead,
  updateSalesPersionAssignment,
  addDeal,
  getProductByLeadId,
  addProductToLead
} from "../../../redux/leadSlice";

import { fetchCurrentUser } from "../../../redux/authSlice";
import { fetchUserWithRole } from "../../../redux/userSlice";
import {
  fetchAllCustomers,
  getAllAddressByCustomerId,
} from "../../../redux/customerSlice";
import useGoogleCalendar from "../../../components/hooks/useGoogleCalendar";



import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;
const getAuthToken = () => localStorage.getItem("token");

const MarketingManageData = () => {

  const {
    isAuthenticated,
    createEvent,
  } = useGoogleCalendar();

  const dispatch = useDispatch();
  const { genleads, totalPages, departmentloading, departmenterror } = useSelector(
    (state) => state.lead
  );

  const { pductByleadId } = useSelector((state) => state.lead);

  //console.log("pductByleadId",pductByleadId);

  const { userDataWithRole } = useSelector((state) => state.user);

  const { user: userDeatail } = useSelector((state) => state.auth);

  const { allCustomers, customerAddress } = useSelector(
    (state) => state.customer
  );
  //console.log("userDeatail", userDeatail);
  //console.log("customerAddress", customerAddress);
  const [dealCreationOpenForm, setDealCreationOpenForm] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState({});
  const [selectedLead, setSelectedLead] = useState({});
  const [isAddUserModalOpen, setAddUserModalOpen] = useState(false);
  const [isViewModalOpen, setViewModalOpen] = useState(false);
  const [isViewCustomerModalOpen, setViewCustomerModalOpen] = useState(false);
  const [isEditUserModalOpen, setEditUserModalOpen] = useState(false);
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [showTextareaPS, setShowTextareaPS] = useState(false);
  const [showQuantityPS, setShowQuantityPS] = useState(false);
  const [showBudgetPS, setShowBudgetPS] = useState(false);
  const [
    isViewCustomerHistoryCardModalOpen,
    setViewCustomerHistoryCardModalOpen,
  ] = useState(false);

  const [selectedPOAId, setSelectedPOAId] = useState(null);
  const [isLeadAssignPopup, setIsLeadAssignPopup] = useState(false);
  const [selectedPOAIds, setSelectedPOAIds] = useState([]);

  // Pagination & Search States
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const leadPerPage = 4;

  // Fetch departments whenever searchTerm or currentPage changes
  //console.log("selectedLead?.id", selectedLead?.id);

   useEffect(() => {
      dispatch(getProductByLeadId({ lead_id: selectedLead?.id })); 
    }, [dispatch,selectedLead?.id]);


  useEffect(() => {
    dispatch(fetchCurrentUser());
    dispatch(fetchAllCustomers());
    dispatch(
      fetchUserWithRole({
        roleId: 3,
      })
    );
    dispatch(
      GenratedlistLeads({
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
    contact_person_name: "",
    assigned_person_id: "",
    lead_source: "",
    lead_status: "",
    assign_date: new Date().toISOString().split("T")[0],
    meeting_type: "",
    lead_summary: "",
    lead_address: "",
    reference_name:"",
    total_material_qty: "",
    approx_business: "",
    project_name: "",
    meeting_time:"",
    product_ids:[]
  });

    useEffect(() => {
      if (userDeatail?.id) {
        setLeadData(prev => ({
          ...prev,
          assigned_person_id: userDeatail.id
        }));
      }
    }, [userDeatail]);


  const [addLeadFormErrors, setaddLeadFormErrors] = useState({});
  const [addLeadFlashMessage, setAddLeadFlashMessage] = useState("");
  const [addLeadFlashMsgType, setAddLeadFlashMsgType] = useState("");
   const [attendeesEmails, setAttendeesEmails] = useState([]);

  const handleLeadChange = (e) => {
    const { name, value } = e.target;
    setLeadData((prevData) => ({
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
            GenratedlistLeads({
              page: currentPage,
              limit: leadPerPage,
              search: searchTerm,
            })
          );

          setLeadData({});

           //add google calender event 
           if (isAuthenticated) {
            handleAddEvent(leadData);
          }

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
            GenratedlistLeads({
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
        GenratedlistLeads({
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

  const updateDealFinalize = async (id) => {
    try {
      const token = getAuthToken();

      // ✅ Correct Axios PUT call
      const response = await axios.put(
        `${API_URL}/auth/deal-finalised/${id}`,
        {}, // No body data being sent
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // ✅ Handle success response
      handleDeleteFlashMessage(response?.data?.message, "success");

      // ✅ Refresh lead list
      dispatch(
        GenratedlistLeads({
          page: currentPage,
          limit: leadPerPage,
          search: searchTerm,
        })
      );
    } catch (error) {
      console.error("Error finalizing deal:", error);
    }
  };

  //assign lead to another sales person

  //assignPOAToUser

  const [poaUpdateData, setPoaUpdateData] = useState({
    new_assigned_person_id: "",
  });
  //lead_id, new_assigned_person_id
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
    if (!poaUpdateData.new_assigned_person_id)
      errors.new_assigned_person_id = "Sales Person is required.";

    setUpdateLeadFormErrors(errors);
    return Object.keys(errors).length === 0;
  };
  const handleAssignSalesPerson = async () => {
    if (!validatePoaUpdateForm()) return;
    try {
      const response = await dispatch(
        updateSalesPersionAssignment({
          //lead_id: selectedLead.id,
          lead_ids:selectedPOAIds,
          new_assigned_person_id: poaUpdateData.new_assigned_person_id,
        })
      ).unwrap();

      //console.log(response);
      if (response?.success) {
        handleUpdateLeadFlashMessage(response?.message, "success");

        setPoaUpdateData({
          new_assigned_person_id: "",
        });
        // Reset state
        setTimeout(() => {
          setIsLeadAssignPopup(false); // Make sure modal state name matches
        }, 3000);
        setSelectedPOAId(null);
        setSelectedLead("");

        // Refresh list
        dispatch(
          GenratedlistLeads({
            page: currentPage,
            limit: leadPerPage,
            search: searchTerm,
          })
        );
      } else {
        handleUpdateLeadFlashMessage("Failed to update", "error");
      }
    } catch (error) {
      //console.error("Update error:", error);
      handleUpdateLeadFlashMessage(
        error?.message || "Something went wrong",
        "error"
      );
    }
  };

  const fetchCustomerHistory = async (id) => {
    try {
      // ✅ Get token
      const token = getAuthToken();

      // ✅ Correct API call with query parameters
      const response = await axios.get(
        `${API_URL}/auth/customer-history/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSelectedCustomer(response.data.data);
      //console.log("response", response);
      //return response.data; // Return data if needed
    } catch (error) {
      console.error("Error in fetching data:", error);
    }
  };

  ////add deal
  // const [dealData, setDealData] = useState({
  //   date: "",
  //   product_id : "",
  //   area: "",
  //   quantity: "",
  //   rate: "",
  //   amount: "",
  //   advance_amount: "",
  //   deal_amount: "",
  //   lead_id:""
  // });
  const [dealData, setDealData] = useState({
    lead_id: selectedLead?.id || "",
    deals: [],
  });
  

  const [totalAdvanceAmount, setTotalAdvanceAmount] = useState(0);
  const [totalDealAmount, setTotalDealAmount] = useState(0);


  useEffect(() => {
    if (pductByleadId?.data?.length > 0) {
      const products = pductByleadId.data.map((prod) => ({
        product_id: prod.product_id ,
        product_name: prod.product_name,
        date: prod.date,
        area: prod.area,
        quantity:prod.quantity,
        rate: prod.rate,
        amount:prod.amount,
        advance_amount:prod.advance_amount
      }));
  
      setDealData((prevState) => ({
        ...prevState,
        deals:products, // note: spread both
      }));
    }
  }, [pductByleadId?.data]); 

  // const handleProductInputChange = (index, field, value) => {
  //   const updatedDeals = [...dealData.deals];
  //   updatedDeals[index][field] = value;

  //   setDealData({
  //     ...dealData,
  //     deals: updatedDeals,
  //   });
  // };
  const handleProductInputChange = (index, field, value) => {
    const updatedDeals = [...dealData.deals];
    updatedDeals[index][field] = value;
  
    if (field === "quantity" || field === "rate") {
      const quantity = parseFloat(updatedDeals[index].quantity) || 0;
      const rate = parseFloat(updatedDeals[index].rate) || 0;
      updatedDeals[index].amount = quantity * rate;
    }
  
    setDealData((prevState) => ({
      ...prevState,
      deals: updatedDeals,
    }));
  };
  
  
  
  
  useEffect(() => {
    const totalAdvance = dealData?.deals?.reduce(
      (sum, item) => sum + (parseFloat(item.advance_amount) || 0),
      0
    );
  
    const totalAmount = dealData?.deals?.reduce(
      (sum, item) => sum + (parseFloat(item.amount) || 0),
      0
    );
  
    setTotalAdvanceAmount(totalAdvance);
    setTotalDealAmount(totalAmount);
  }, [dealData?.deals]);
  
  
  

  const [dealFormErrors, setDealFormErrors] = useState({});
  const [addDealFlashMessage, setAddDealFlashMessage] = useState("");
  const [addDealFlashMsgType, setAddDealFlashMsgType] = useState("");

  const handleAddDealFlashMessage = (message, type) => {
    setAddDealFlashMessage(message);
    setAddDealFlashMsgType(type);
    setTimeout(() => {
      setAddDealFlashMessage("");
      setAddDealFlashMsgType("");
    }, 3000);
  };

  const validateDealForm = () => {
    const newErrors = {};

    if (!dealData.date) newErrors.date = "Date is required.";
    if (!dealData.product_id)
      newErrors.product_id  = "Product Name is required.";
    if (!dealData.area)
      newErrors.area = "Area Name is required.";
    
    if (!dealData.quantity) newErrors.quantity = "Quantity is required.";
    if (!dealData.rate) newErrors.rate = "Rate is required.";
    if (!dealData.amount) newErrors.amount = "Amount is required.";
    if (!dealData.advance_amount) newErrors.advance_amount = "Advance amount is required.";
    if (!dealData.deal_amount) newErrors.deal_amount = "Deal amount is required.";

    setDealFormErrors(newErrors); // Create a new state if not exists: 
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmitDeal = async (e) => {
    
    e.preventDefault();
    //if (validateDealForm()) {
      try {
        //console.log("dealData", dealData);
        const response = await dispatch(addDeal(dealData)).unwrap(); // <-- Replace with your actual action

        if (response?.success) {
          handleAddDealFlashMessage(response?.message, "success");

          dispatch(getProductByLeadId({ lead_id: selectedLead?.id }));

          dispatch(
            GenratedlistLeads({
              page: currentPage,
              limit: leadPerPage,
              search: searchTerm,
            })
          );

          setDealData({});

          setTimeout(() => {
            setDealCreationOpenForm(false);
          }, 3000);
        } else {
          handleAddDealFlashMessage(
            response?.message || "Something went wrong",
            "error"
          );
        }
      } catch (error) {
        console.error("Error adding deal:", error);
        handleAddDealFlashMessage(
          error?.message || "An error occurred",
          "error"
        );
      }
    //}
  };



  const [leadProductData, setLeadProductData] = useState({
    lead_id: null,
    product_ids: []
  });
  
  useEffect(() => {
    if (selectedLead?.id) {
      setLeadProductData((prev) => ({
        ...prev,
        lead_id: selectedLead.id
      }));
    }
  }, [selectedLead?.id]);
  
  //console.log("leadProductData", leadProductData);
   const handleSubmitAddProduct = async (e) => {
          e.preventDefault();
          try {
            const response = await dispatch(addProductToLead(leadProductData)).unwrap();
            //console.log(response);
            if (response?.success) {
              //handleAddLeadFlashMessage(response?.message, "success");
              //dispatch(listCustomers());
              dispatch(getProductByLeadId({ lead_id: selectedLead?.id }));
    
              setLeadProductData({});
            } else {
              console.log(
                response?.message || "Something went wrong",
                "error"
              );
            }
          } catch (error) {
            console.error("Error adding product:", error);
          }
    };

  //end dea
   //google calender (poa) event add 
   const handleAddEvent = (leadData) => {
    const event = {
       title: "Meeting Sheduled",
       location: leadData?.lead_address,
       description: leadData?.lead_summary,
       startDateTime: leadData?.assign_date,
       endDateTime: leadData?.assign_date,
       attendeesEmails: attendeesEmails,
    };
    console.log("event", event);
    createEvent(event);
  };

  //end google calender (poa) event add

  return (
    <div className="flex flex-col gap-[20px]">
      <div className="flex flex-col md:flex-row items-start md:items-center gap-5 md:justify-between">
        <div>
          <h1 className="text-white text-textdata whitespace-nowrap font-semibold">
            Lead Management
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
              className="flex items-center text-textdata whitespace-nowrap text-white bg-[#bf9c85] rounded-[3px] px-3 py-[0.28rem]"
              onClick={() => setIsLeadAssignPopup(true)}
            >
              <img
                src={iconsImgs.plus}
                alt="plus icon"
                className="w-[18px] mr-1"
              />{" "}
              Assign Lead To
            </button>
          </div>
          <div>
            <button
              className="flex items-center text-textdata whitespace-nowrap text-white bg-[#fe6c00] rounded-[3px] px-3 py-[0.28rem]"
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
      </div>
      <div className="main-content-holder max-h-[615px] overflow-y-auto scrollbar-hide">
        <div className="bg-bgData rounded-[8px] shadow-md shadow-black/5 text-white px-4 py-6 overflow-auto">
          {/*------- Table Data Start -------*/}
          <DepartmentTable
            setEditUserModalOpen={setEditUserModalOpen}
            Leads={genleads?.data}
            setViewModalOpen={setViewModalOpen}
            setIsAssignModalOpen={setIsAssignModalOpen}
            selectedLead={selectedLead}
            setSelectedLead={setSelectedLead}
            deleteFlashMessage={deleteFlashMessage}
            deleteFlashMsgType={deleteFlashMsgType}
            handleDeleteFlashMessage={handleDeleteFlashMessage}
            handleDelete={handleDelete}
            updateDealFinalize={updateDealFinalize}
            isLeadAssignPopup={isLeadAssignPopup}
            setIsLeadAssignPopup={setIsLeadAssignPopup}
            setSelectedPOAId={setSelectedPOAId}
            selectedPOAId={selectedPOAId}
            fetchCustomerHistory={fetchCustomerHistory}
            setViewCustomerHistoryCardModalOpen={
              setViewCustomerHistoryCardModalOpen
            }
            dealCreationOpenForm={dealCreationOpenForm}
            setDealCreationOpenForm={setDealCreationOpenForm}
            setDealData={setDealData}
            isViewCustomerModalOpen={isViewCustomerModalOpen}
            setViewCustomerModalOpen={setViewCustomerModalOpen}
            selectedPOAIds={selectedPOAIds} 
            setSelectedPOAIds={setSelectedPOAIds}
          />
          {/*------- Table Data End -------*/}
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

        {/** view customer model */}
        {isViewCustomerModalOpen && (
          <ViewCustomerModal
          setViewCustomerModalOpen={setViewCustomerModalOpen}
          selectedCustomer={selectedLead}
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

      {isLeadAssignPopup && (
        <ParticularLeadAssign
          setIsLeadAssignPopup={setIsLeadAssignPopup}
          selectedLead={selectedLead}
          setSelectedLead={setSelectedLead}
          userDataWithRole={userDataWithRole}
          handleAssignSalesPerson={handleAssignSalesPerson}
          poaUpdateData={poaUpdateData}
          setPoaUpdateData={setPoaUpdateData}
          handlePoaUpdateChange={handlePoaUpdateChange}
          validatePoaUpdateForm={validatePoaUpdateForm}
          updateLeadFormErrors={updateLeadFormErrors}
          setUpdateLeadFormErrors={setUpdateLeadFormErrors}
          updateLeadFlashMessage={updateLeadFlashMessage}
          setUpdateLeadFlashMessage={setUpdateLeadFlashMessage}
          updateLeadFlashMsgType={updateLeadFlashMsgType}
          setUpdateLeadFlashMsgType={setUpdateLeadFlashMsgType}
          handleUpdateLeadChange={handleUpdateLeadChange}
          handleUpdateLeadFlashMessage={handleUpdateLeadFlashMessage}
          selectedPOAIds={selectedPOAIds}
        />
      )}

      {/* View User Modal */}
      {isViewCustomerHistoryCardModalOpen && (
        <ViewCustomerHistoryCardReport
          setViewCustomerHistoryCardModalOpen={
            setViewCustomerHistoryCardModalOpen
          }
          selectedCustomer={selectedCustomer}
        />
      )}

      {dealCreationOpenForm && (
        <DealCreationForm
          dealCreationOpenForm={dealCreationOpenForm}
          setDealCreationOpenForm={setDealCreationOpenForm}
          selectedLead={selectedLead}
          dealData={dealData}
          setDealData={setDealData}
          //handleDealInputChange={handleDealInputChange}
          handleProductInputChange={handleProductInputChange}
          handleSubmitDeal={handleSubmitDeal}
          addDealFlashMessage={addDealFlashMessage}
          addDealFlashMsgType={addDealFlashMsgType}
          dealFormErrors={dealFormErrors}
          setDealFormErrors={setDealFormErrors}
          leadProductData = {leadProductData}
          setLeadProductData = {setLeadProductData}
          handleSubmitAddProduct = {handleSubmitAddProduct}
          totalAdvanceAmount={totalAdvanceAmount}
          totalDealAmount={totalDealAmount}
        />
      )}
        {isLeadAssignPopup && (
          <ParticularLeadAssign
            setIsLeadAssignPopup={setIsLeadAssignPopup}
            selectedLead={selectedLead}
            setSelectedLead={setSelectedLead}
            userDataWithRole={userDataWithRole}
            handleAssignSalesPerson={handleAssignSalesPerson}
            poaUpdateData={poaUpdateData}
            setPoaUpdateData={setPoaUpdateData}
            handlePoaUpdateChange={handlePoaUpdateChange}
            validatePoaUpdateForm={validatePoaUpdateForm}
            updateLeadFormErrors={updateLeadFormErrors}
            setUpdateLeadFormErrors={setUpdateLeadFormErrors}
            updateLeadFlashMessage={updateLeadFlashMessage}
            setUpdateLeadFlashMessage={setUpdateLeadFlashMessage}
            updateLeadFlashMsgType={updateLeadFlashMsgType}
            setUpdateLeadFlashMsgType={setUpdateLeadFlashMsgType}
            handleUpdateLeadChange={handleUpdateLeadChange}
            handleUpdateLeadFlashMessage={handleUpdateLeadFlashMessage}
          />
        )}

        {/* View User Modal */}
        {isViewCustomerHistoryCardModalOpen && (
          <ViewCustomerHistoryCardReport
            setViewCustomerHistoryCardModalOpen={
              setViewCustomerHistoryCardModalOpen
            }
            selectedCustomer={selectedCustomer}
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

export default MarketingManageData;
