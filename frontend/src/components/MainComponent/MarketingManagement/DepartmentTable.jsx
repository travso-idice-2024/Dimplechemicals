import React, { useEffect, useState, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  listDepartments,
  removeDepartment,
} from "../../../redux/departmentSlice";
import SuccessMessage from "../../AlertMessage/SuccessMessage";
import ErrorMessage from "../../AlertMessage/ErrorMessage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { SidebarContext } from "../../../context/sidebarContext";
import { addLeadCommunication } from "../../../redux/leadSlice";
import { useNavigate } from "react-router-dom";

const DepartmentTable = ({
  Leads,
  setEditUserModalOpen,
  setViewModalOpen,
  setIsAssignModalOpen,
  selectedLead,
  setSelectedLead,
  deleteFlashMessage,
  deleteFlashMsgType,
  handleDeleteFlashMessage,
  handleDelete,
  updateDealFinalize,
  isLeadAssignPopup,
  setIsLeadAssignPopup,
  setSelectedPOAId,
  selectedPOAId,
  fetchCustomerHistory,
  setViewCustomerHistoryCardModalOpen,
  dealCreationOpenForm,
  setDealCreationOpenForm,
  setDealData,
  isViewCustomerModalOpen,
  setViewCustomerModalOpen,
  selectedPOAIds,
  setSelectedPOAIds
}) => {

  //console.log("Leads", Leads);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isSidebarOpen } = useContext(SidebarContext);

  const [leadStatusProgress, setLeadStatusProgress] = useState(false);

  //add followup
  const [formData, setFormData] = useState({
    lead_id: "",
    customer_id: "",
    lead_owner_id: "",
    client_name: "",
    lead_text: "",
    lead_status: "",
    lead_date: "",
  });

  console.log("follow up formData", formData);

  const [formErrors, setFormErrors] = useState({});
  const [flashMessage, setFlashMessage] = useState("");
  const [flashMsgType, setFlashMsgType] = useState("");

  // Show flash message for success or error
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

  // Validate Inputs
  const validateInputs = () => {
    let errors = {};
    if (!formData.lead_text.trim()) errors.lead_text = "*Lead text is required";
    if (!formData.lead_status.trim())
      errors.lead_status = "*Lead status is required";
    if (!formData.lead_date.trim()) errors.lead_date = "*Lead date is required";
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle Form Submit
  const handleSubmitAddFollowUp = async () => {
    //e.preventDefault();

    if (validateInputs()) {
      try {
        //console.log("formData", formData);
        const response = await dispatch(
          addLeadCommunication(formData)
        ).unwrap();

        //console.log("response", response);
        if (response?.success) {
          handleFlashMessage(
            response?.message || "Lead Communication added successfully!",
            "success"
          );

          // dispatch(
          //   leadCommunicationById({
          //     leadId: leadId,
          //     page: currentPage,
          //     limit: leadCumPerPage,
          //     search: searchTerm,
          //   })
          // );

          // Reload lead list after adding lead
          // dispatch(
          //   listLeads({
          //     page: currentPage,
          //     limit: leadsPerPage,
          //     search: searchTerm,
          //   })
          // );

          // Close modal after successful submission
          setTimeout(() => {
            setLeadStatusProgress(false);
          }, 3000);
        } else {
          handleFlashMessage(
            response?.message || "Something went wrong",
            "error"
          );
        }
      } catch (error) {
        console.error("Error adding lead:", error);
        handleFlashMessage(error?.message || "An error occurred", "error");
      }
    }
  };
  //end add followup

  return (
    <>
      <div className="fixed top-5 right-5 z-50">
        {deleteFlashMessage && deleteFlashMsgType === "success" && (
          <SuccessMessage message={deleteFlashMessage} />
        )}
        {deleteFlashMessage && deleteFlashMsgType === "error" && (
          <ErrorMessage message={deleteFlashMessage} />
        )}
      </div>
      <div className="overflow-x-auto">
        <table className="table-auto w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#473b33] rounded-[8px] ">
              <th className="px-4 py-2 text-left text-bgDataNew text-newtextdata">
                {/* <input type="checkbox" className="w-4 h-4 accent-orange-500" disabled /> */}
              </th>
              <th className="px-4 py-2 text-left text-bgDataNew text-newtextdata">
                Id
              </th>
              <th className="px-4 py-2 text-left text-bgDataNew text-newtextdata whitespace-nowrap">
                Company Name
              </th>
              <th className="px-4 py-2 text-left text-bgDataNew text-newtextdata whitespace-nowrap">
                Contact Person Name
              </th>
              <th className="px-4 py-2 text-left text-bgDataNew text-newtextdata whitespace-nowrap">
                Salse Person Name
              </th>
              <th className="px-4 py-2 text-left text-bgDataNew text-newtextdata whitespace-nowrap">
                Meeting Date
              </th>
              <th className="px-4 py-2 text-left text-bgDataNew text-newtextdata whitespace-nowrap">
                Meeting Type
              </th>
              <th className="px-4 py-2 text-left text-bgDataNew text-newtextdata whitespace-nowrap">
                Meeting Summary
              </th>
              <th className="px-4 py-2 text-left text-bgDataNew text-newtextdata">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {Leads?.map((user, index) => (
              <tr key={index} className="">
                <td className="px-4 py-2 text-newtextdata">
                  <input
                    type="checkbox"
                    className="w-4 h-4 accent-orange-500"
                    //checked={selectedPOAId === user.id}
                    // onChange={() => {
                    //   setSelectedPOAId(user.id);
                    //   setSelectedLead(user);
                    //   //setIsLeadAssignPopup(true);
                    // }}
                    checked={selectedPOAIds.includes(user.id)}
                    onChange={() => {
                      if (selectedPOAIds.includes(user.id)) {
                        // remove if already selected
                        setSelectedPOAIds(selectedPOAIds.filter(id => id !== user.id));
                      } else {
                        // add if not selected
                        setSelectedPOAIds([...selectedPOAIds, user.id]);
                      }
                    }}
                  />
                </td>
                <td className="px-4 py-2 text-newtextdata">{index + 1}</td>
                <td
                  className="px-4 py-2 text-newtextdata cursor-pointer"
                  onClick={() => {
                    //fetchCustomerHistory(user?.customer?.id);
                    setSelectedLead(user);
                    setViewCustomerModalOpen(true);
                    //setViewCustomerHistoryCardModalOpen(true);
                  }}
                >
                  {user?.customer?.company_name}
                </td>
                <td className="px-4 py-2 text-newtextdata">
                  {user?.contact_person_name}
                </td>
                <td className="px-4 py-2 text-newtextdata">
                  {user?.assignedPerson?.fullname}
                </td>
                <td className="px-4 py-2 text-newtextdata">
                  {user?.assign_date?.split("T")[0]}
                </td>

                {/* <td className="px-4 py-2 text-newtextdata">
                  {user?.customer?.client_name}
                </td> */}
                <td className="px-4 py-2 text-newtextdata">
                  {user?.meeting_type}
                </td>
                <td className="px-4 py-2 text-newtextdata">
                  {user?.lead_summary}
                </td>
                <td className="px-4 py-2 text-newtextdata flex items-center space-x-2 text-center">
                  {/* <button
                className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-700 mb-2"
                onClick={() => {
                setIsAssignModalOpen(true)
              }}
              >
                Assign Lead
              </button> */}
                  <button
                    className="bg-bgDataNew text-white px-3 py-1 rounded hover:bg-green-600"
                    //onClick={() => updateDealFinalize(user?.id)}
                    onClick={() => {
                      // updateDealFinalize(user?.id)
                      setSelectedLead(user);
                      setFormData((prev) => ({
                        ...prev,
                        lead_id: user.id,
                        customer_id: user?.customer_id || "",
                        lead_owner_id: user?.lead_owner_id || "",
                        client_name: user?.contact_person_name || "",
                        lead_text: formData.lead_text, // Keep existing lead_text if already typed
                        lead_status: formData.lead_status, // Keep existing lead_status
                        lead_date: formData.lead_date, // Keep existing lead_date
                      }));
                      setLeadStatusProgress(true);
                    }}

                  >
                    Followup
                  </button>
                  <button
                    className="bg-bgDataNew text-white px-3 py-1 rounded hover:bg-green-600"
                    //onClick={() => updateDealFinalize(user?.id)}
                    onClick={() => {
                      // updateDealFinalize(user?.id)
                      setSelectedLead(user);
                      setDealData((prev) => ({
                        ...prev,
                        lead_id: user.id,
                      }));
                      setDealCreationOpenForm(true);
                    }}

                  >
                    Deal
                  </button>
                  <button
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                    onClick={() => {
                      setSelectedLead(user);
                      setViewModalOpen(true);
                    }}
                  >
                    <FontAwesomeIcon icon={faEye} />
                  </button>
                  <button
                    className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                    onClick={() => {
                      setSelectedLead(user);
                      setEditUserModalOpen(true);
                    }}
                  >
                    <FontAwesomeIcon icon={faPenToSquare} />
                  </button>
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    onClick={() => {
                      if (
                        window.confirm(
                          "Are you sure you want to delete this lead?"
                        )
                      ) {
                        handleDelete(user.id);
                      }
                    }}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {leadStatusProgress && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white w-[900px] pt-0 pb-4 rounded-[6px] flex flex-col">
              <h2 className="text-white text-textdata font-poppins mb-2 px-0 py-2 text-center bg-bgDataNew rounded-t-[5px]">
                Follow Up Form
              </h2>
              <div className="px-4 grid grid-cols-1 md:grid-cols-1 gap-4 overflow-y-auto h-fit">

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
                  <div>
                    <label className="font-poppins font-medium text-black text-[16px]">
                      Lead Status :
                    </label>
                    <select
                      name="lead_status"
                      value={formData.lead_status}
                      onChange={handleChange}
                      className="block w-full mb-2 rounded-[5px] text-black border border-solid border-[#473b33] focus:border-[#473b33] dark:focus:border-[#473b33] px-1 py-[9px]"
                    >
                      <option>Select the Status</option>
                      <option value="Meeting">Meeting Done</option>
                      <option value="Revisit">Revisit</option>
                      <option value="Queries">Queries</option>
                      <option value="ProposalSent">Proposal Sent</option>
                      <option value="Discussion">Discussion</option>
                      <option value="Lost">Lost</option>
                    </select>
                    {formErrors.lead_status && (
                      <p className="text-red-500 text-sm">
                        {formErrors.lead_status}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="font-poppins font-medium text-black text-[16px]">
                      Next Metting Date :
                    </label>
                    <input
                      type="date"
                      name="lead_date"
                      value={formData.lead_date}
                      onChange={handleChange}
                      placeholder="Date"
                      className="block w-full mb-2 h-[40px] rounded-[5px] text-black border border-solid border-[#473b33] focus:border-[#473b33] dark:focus:border-[#473b33] px-3 py-2"
                    />
                    {formErrors.lead_date && (
                      <p className="text-red-500 text-sm">
                        {formErrors.lead_date}
                      </p>
                    )}
                  </div>


                  <div>
                    <label className="font-poppins font-medium text-black text-[16px]">
                      Description :
                    </label>
                    <textarea
                      type="text"
                      name="lead_text"
                      value={formData.lead_text}
                      onChange={handleChange}
                      placeholder="Detail Note for Lead"
                      className="block w-full mb-2 text-black rounded-[5px] border border-solid border-[#473b33] focus:border-[#473b33] dark:focus:border-[#473b33] px-3 py-2"
                    />
                    {formErrors.lead_text && (
                      <p className="text-red-500 text-sm">
                        {formErrors.lead_text}
                      </p>
                    )}
                  </div>

                  <div>
                    <button
                      className="bg-bgDataNew text-white px-3 py-2 rounded hover:bg-[#cb6f2ad9]"
                      onClick={() => {
                        handleSubmitAddFollowUp();
                      }}
                    >
                      Submit
                    </button>
                    <button
                      className="mt-4 bg-gray-500 text-white px-3 py-2 rounded hover:bg-gray-600"
                      onClick={() => setLeadStatusProgress(false)}
                    >
                      Close
                    </button>

                    <button
                      className="mt-4 text-textdata bg-bgDataNew text-white px-3 py-2 rounded hover:bg-gray-600"
                      onClick={() => navigate(`/lead-followups/${formData?.lead_id}`)}
                    >
                      View Follow
                    </button>
                  </div>
                </div>

              </div>
            </div>
          </div>
        )}
      </div>



    </>
  );
};

export default DepartmentTable;
