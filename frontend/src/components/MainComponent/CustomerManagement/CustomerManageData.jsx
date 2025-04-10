import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./CustomerManageData.css";
import { iconsImgs } from "../../../utils/images";
import CustomerTable from "./CustomerTable";
import Pagination from "./Pagination";
import AddCustomerModal from "./AddCustomerModal";
import ViewCustomerModal from "./ViewCustomerModal";
import AssignLeadModal from "./AssignLeadModal";
import EditCustomerModal from "./EditCustomerModal";
import ContentTop from "../../ContentTop/ContentTop";
import {
  listCustomers,
  addCustomer,
  updateCustomer,
  removeCustomer,
} from "../../../redux/customerSlice";
import {fetchCurrentUser} from "../../../redux/authSlice";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const getAuthToken = () => localStorage.getItem("token");

const CustomerManageData = () => {
  const dispatch = useDispatch();
  const { customers, totalPages, customerLoading, customerError } = useSelector(
    (state) => state.customer
  );
 
  const {user:userDeatail}  = useSelector((state) => state.auth);

  //console.log("login user", userDataWithRole);

  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);

  const [selectedCustomer, setSelectedCustomer] = useState({});

  const [isAddCustomerModalOpen, setAddCustomerModalOpen] = useState(false);
  const [isViewModalOpen, setViewModalOpen] = useState(false);
  const [isEditCustomerModalOpen, setEditCustomerModalOpen] = useState(false);

  // Pagination & Search States
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const customersPerPage = 10;

  // Fetch customers whenever searchTerm or currentPage changes
  useEffect(() => {
    //dispatch(fetchCurrentUser());
   
    dispatch(
      listCustomers({
        page: currentPage,
        limit: customersPerPage,
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

  //add customer functinality===============================================================
  const [formData, setFormData] = useState({
    company_name: "",
    client_name: "",
    designation: "",
    primary_contact: "",
    secondary_contact: "",
    email_id: "",
    address: "",
    location: "",
    pincode: "",
    pan_no: "",
    address_2:"",
    address_3:"",
    address_4:""
  });

  const [formErrors, setFormErrors] = useState({});
  const [flashMessage, setFlashMessage] = useState("");
  const [flashMsgType, setFlashMsgType] = useState("");

  const handleFlashMessage = (message, type) => {
    setFlashMessage(message);
    setFlashMsgType(type);
    setTimeout(() => {
      setFlashMessage("");
      setFlashMsgType("");
    }, 3000);
  };

  // Handle Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));

    // Clear error when user types
    setFormErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  const validateInputs = () => {
    let errors = {};
    if (!formData.company_name.trim())
      errors.company_name = "*Company name is required";
    if (!formData.client_name.trim())
      errors.client_name = "*Client name is required";
    if (!formData.designation.trim())
      errors.designation = "*Designation is required";
    if (!formData.primary_contact.trim())
      errors.primary_contact = "*Primary contact is required";
    if (!formData.email_id.trim()) errors.email_id = "*Email is required";
    if (!formData.address.trim()) errors.address = "*Address is required";
    if (!formData.location.trim()) errors.location = "*Location is required";
    if (!formData.pincode.trim()) errors.pincode = "*Pincode is required";
    if (!formData.pan_no.trim()) errors.pan_no = "*PAN No is required";

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmitAddCustomer = async (e) => {
    e.preventDefault();
    if (validateInputs()) {
      try {
        const response = await dispatch(addCustomer(formData)).unwrap();
        //console.log(response);
        if (response?.success) {
          handleFlashMessage(response?.message, "success");
          //dispatch(listCustomers());
          dispatch(
            listCustomers({
              page: currentPage,
              limit: customersPerPage,
              search: searchTerm,
            })
          );
          setTimeout(() => {
            setAddCustomerModalOpen(false);
          }, 3000);
        } else {
          handleFlashMessage(
            response?.message || "Something went wrong",
            "error"
          );
        }
      } catch (error) {
        console.error("Error adding customer:", error);
        handleFlashMessage(error?.message || "An error occurred", "error");
      }
    }
  };

  //end add customer functinality==========================================================================

  //edit customer function=================================================================================

  const [editFormData, setEditFormData] = useState({
    company_name: "",
    client_name: "",
    designation: "",
    primary_contact: "",
    secondary_contact: "",
    email_id: "",
    address: "",
    location: "",
    pincode: "",
    pan_no: "",
    address_2:"",
    address_3:"",
    address_4:""
  });

  const [editFormErrors, setEditFormErrors] = useState({});
  const [editFlashMessage, setEditFlashMessage] = useState("");
  const [editFlashMsgType, setEditFlashMsgType] = useState("");

  // Update form data when a customer is selected for editing
  useEffect(() => {
    if (selectedCustomer) {
      setEditFormData({
        company_name: selectedCustomer.company_name || "",
        client_name: selectedCustomer.client_name || "",
        designation: selectedCustomer.designation || "",
        primary_contact: selectedCustomer.primary_contact || "",
        secondary_contact: selectedCustomer.secondary_contact || "",
        email_id: selectedCustomer.email_id || "",
        address: selectedCustomer.address || "",
        location: selectedCustomer.location || "",
        pincode: selectedCustomer.pincode || "",
        pan_no: selectedCustomer.pan_no || "",
        address_2:selectedCustomer.address_2 || "",
        address_3:selectedCustomer.address_3 || "",
        address_4:selectedCustomer.address_4 || ""
      });
    }
  }, [selectedCustomer]);

  const handleEditFlashMessage = (message, type) => {
    setEditFlashMessage(message);
    setEditFlashMsgType(type);
    setTimeout(() => {
      setEditFlashMessage("");
      setEditFlashMsgType("");
    }, 3000);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prevData) => ({ ...prevData, [name]: value }));
    setEditFormErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  const validateEditInputs = () => {
    let errors = {};
    if (!editFormData.company_name.trim())
      errors.company_name = "*Company name is required";
    if (!editFormData.client_name.trim())
      errors.client_name = "*Client name is required";
    if (!editFormData.designation.trim())
      errors.designation = "*Designation is required";
    if (!editFormData.primary_contact.trim())
      errors.primary_contact = "*Primary contact is required";
    if (!editFormData.email_id.trim()) errors.email_id = "*Email is required";
    if (!editFormData.address.trim()) errors.address = "*Address is required";
    if (!editFormData.location.trim())
      errors.location = "*Location is required";
    if (!editFormData.pincode.trim()) errors.pincode = "*Pincode is required";
    if (!editFormData.pan_no.trim()) errors.pan_no = "*PAN No is required";

    setEditFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    if (validateEditInputs()) {
      try {
        //console.log("editFormData",editFormData);
        const response = await dispatch(
          updateCustomer({
            id: selectedCustomer.id,
            customerData: editFormData,
          })
        ).unwrap();

        if (response.success) {
          handleEditFlashMessage(response.message, "success");
          dispatch(
            listCustomers({
              page: currentPage,
              limit: customersPerPage,
              search: searchTerm,
            })
          );
          setTimeout(() => {
            setEditCustomerModalOpen(false);
          }, 3000);
        } else {
          handleEditFlashMessage(
            response?.message || "Something went wrong",
            "error"
          );
        }
      } catch (error) {
        handleEditFlashMessage(error.message || "An error occurred", "error");
      }
    }
  };

  //end edit customer function==============================================================================

  // delete customer =======================================================================================
  const [deleteFlashMessage, setDeleteFlashMessage] = useState("");
  const [deleteFlashMsgType, setDeleteFlashMsgType] = useState("");

  // Function to show flash messages for delete actions
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
      await dispatch(removeCustomer(id)).unwrap();
      handleDeleteFlashMessage("Customer deleted successfully!", "success");
      dispatch(
        listCustomers({
          page: currentPage,
          limit: customersPerPage,
          search: searchTerm,
        })
      );
    } catch (error) {
      handleDeleteFlashMessage(
        error?.message || "Failed to delete customer",
        "error"
      );
    }
  };

  //end delete customer ========================================================================

  //export customer data in excel file
  const handleExportData = async () => {
    try {
      // ✅ Get token
      const token = getAuthToken();

      // ✅ Correct API call with query parameters
      const response = await axios.get(
        `${API_URL}/auth/export-customers`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            search:searchTerm
          },
          responseType: "blob", // ✅ Important to keep it here
        }
      );

      // ✅ Create a URL for the blob
      const url = window.URL.createObjectURL(new Blob([response.data]));

      // ✅ Create a temporary <a> tag to download the file
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "Customer_Report.xlsx"); // File name
      document.body.appendChild(link);
      link.click();

      // ✅ Cleanup after download
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error exporting data:", error);
    }
  };
//end export customer data in excel file

 

  //if (customerLoading) return <p>Loading...</p>;
  //if (customerError) return <p>{customerError}</p>;

  return (
    <div className="main-content">
      <ContentTop />
      <div className="main-content-holder max-h-[615px] overflow-y-auto scrollbar-hide">
        <div className="flex flex-col gap-[20px]">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-white text-textdata font-semibold">
                Customer Management
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
              <div>
                <button
                  className="flex items-center text-textdata text-white bg-[#fe6c00] rounded-[3px] px-3 py-[0.28rem]"
                  onClick={() => setAddCustomerModalOpen(true)}
                >
                  <img
                    src={iconsImgs.plus}
                    alt="plus icon"
                    className="w-[18px] mr-1"
                  />{" "}
                  Add Customer
                </button>
              </div>
              <div>
              <button
                className="flex items-center text-textdata text-white bg-[#fe6c00] rounded-[3px] px-3 py-[0.28rem]"
                onClick={handleExportData}
              >
                Export Data
              </button>
            </div>
            </div>
          </div>
          <div className="bg-bgData rounded-[8px] shadow-md shadow-black/5 text-white px-4 py-6">
            {/*------- Table Data Start -------*/}
            <CustomerTable
              customers={customers?.data}
              setEditCustomerModalOpen={setEditCustomerModalOpen}
              setViewModalOpen={setViewModalOpen}
              selectedCustomer={selectedCustomer}
              setSelectedCustomer={setSelectedCustomer}
              setIsAssignModalOpen={setIsAssignModalOpen}
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
        {isAddCustomerModalOpen && (
          <AddCustomerModal
            setAddCustomerModalOpen={setAddCustomerModalOpen}
            handleSubmitAddCustomer={handleSubmitAddCustomer}
            formData={formData}
            setFormData={setFormData}
            handleChange={handleChange}
            setFormErrors={setFormErrors}
            formErrors={formErrors}
            flashMessage={flashMessage}
            setFlashMessage={setFlashMessage}
            setFlashMsgType={setFlashMsgType}
            flashMsgType={flashMsgType}
          />
        )}

        {/* Edit User Modal */}
        {isEditCustomerModalOpen && (
          <EditCustomerModal
            setEditCustomerModalOpen={setEditCustomerModalOpen}
            selectedCustomer={selectedCustomer}
            setSelectedCustomer={setSelectedCustomer}
            editFormData={editFormData}
            setEditFormData={setEditFormData}
            editFormErrors={editFormErrors}
            setEditFormErrors={setEditFormErrors}
            editFlashMessage={editFlashMessage}
            setEditFlashMessage={setEditFlashMessage}
            editFlashMsgType={editFlashMsgType}
            setEditFlashMsgType={setEditFlashMsgType}
            handleEditChange={handleEditChange}
            handleEditSubmit={handleEditSubmit}
          />
        )}

        {/* View User Modal */}
        {isViewModalOpen && (
          <ViewCustomerModal
            setViewModalOpen={setViewModalOpen}
            selectedCustomer={selectedCustomer}
          />
        )}

        {/* Assign Customer Modal */}
       
      </div>
    </div>
  );
};

export default CustomerManageData;
