import React, { useEffect, useState, useContext } from "react";
import { SidebarContext } from "../../../../context/sidebarContext";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { addLeadCommunication } from "../../../../redux/leadSlice";
import { useNavigate } from "react-router-dom";
import { fetchCurrentUser } from "../../../../redux/authSlice";
import useGoogleCalendar from "../../../../components/hooks/useGoogleCalendar";

import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;
const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

const getAuthToken = () => localStorage.getItem("token");

const DepartmentTable = ({
  setEditUserModalOpen,
  poaList,
  setViewModalOpen,
  selectedPOA,
  setSelectedPOA,
  isLeadAssignPopup,
  setIsLeadAssignPopup,
  setSelectedPOAId,
  selectedPOAId,
  poaReportOpen,
  setpoaReportOpen,
}) => {
  const { poaType } = useParams();
  //console.log("poaList", poaList);
  const dispatch = useDispatch();
  const { isSidebarOpen } = useContext(SidebarContext);


  //const [isCheckedIn, setIsCheckedIn] = useState(false);

  const [isCheckedIn, setIsCheckedIn] = useState(() => {
    const stored = localStorage.getItem("isCheckedIn");
    return stored ? JSON.parse(stored) : false;
  });

  const [activeLeadId, setActiveLeadId] = useState(() => {
    const stored = localStorage.getItem("activeLeadId");
    return stored ? JSON.parse(stored) : null;
  });

  //console.log("isCheckedIn",isCheckedIn);

  const [checkInTime, setCheckInTime] = useState(null);
  const [checkOutTime, setCheckOutTime] = useState(null);

  //const [activeLeadId, setActiveLeadId] = useState(null);

  //console.log("selectedPOA",selectedPOA );

  // ✅ Load data from localStorage on mount
  useEffect(() => {
    const storedCheckIn = localStorage.getItem("checkInTime");
    const storedCheckOut = localStorage.getItem("checkOutTime");

    setCheckInTime(storedCheckIn ? storedCheckIn : null);
    setCheckOutTime(storedCheckOut ? storedCheckOut : null);
  }, []);

  useEffect(() => {
    localStorage.setItem("isCheckedIn", JSON.stringify(isCheckedIn));
    localStorage.setItem("activeLeadId", JSON.stringify(activeLeadId));
  }, [isCheckedIn, activeLeadId]);

  const handleToggle = async (lead) => {

    if (activeLeadId === lead.id && isCheckedIn) {
      setLeadStatusProgress(true);
      //await handleCheckOut(lead);
      //setIsCheckedIn(false);
      //setActiveLeadId(null);
    } else {
      await handleCheckIn(lead);
      setIsCheckedIn(true);
      setActiveLeadId(lead.id);
    }
  };

  const getLocationName = async (latitude, longitude) => {
    const apiKey = `${API_KEY}`;
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data.status === "OK") {
        return data.results[0].formatted_address;
      } else {
        throw new Error("Failed to fetch address");
      }
    } catch (error) {
      console.error("Error getting address: ", error);
      return "Address not available";
    }
  };

  const handleCheckIn = async (lead) => {
    console.log("checkin function call.", lead);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        //console.log("Accuracy: ", position.coords.accuracy);
        const { latitude, longitude } = position.coords;
        const locationName = await getLocationName(latitude, longitude);

        const now = new Date();
        const currentTime = now.toTimeString().split(":").slice(0, 2).join(":");

        const checkInData = {
          start_location: locationName,
          customer_id: lead?.customer_id,
          lead_date: new Date().toISOString().split("T")[0],
          lead_id: lead?.id,
          start_meeting_time: currentTime,
          latitude: latitude,
          longitude: longitude,
          type: "checkin",
        };

        try {
          const token = getAuthToken();
          //console.log("token",token);
          const response = await axios.post(
            `${API_URL}/auth/lead-communication`,
            checkInData,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          setIsCheckedIn(true);
          //handleFlashMessage(response?.data?.message, "success");
        } catch (error) {
          console.log(error);
        }
      });
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  // const handleCheckOut = async (lead) => {
   
  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition(async (position) => {
  //       const { latitude, longitude } = position.coords;
  //       const locationName = await getLocationName(latitude, longitude);
  //       const now = new Date();
  //       const currentTime = now.toTimeString().split(":").slice(0, 2).join(":");
        
  //       const checkOutData = {
  //         end_location: locationName,
  //         customer_id: lead?.customer_id,
  //         lead_date: new Date().toISOString().split("T")[0],
  //         lead_id: lead?.id,
  //         end_meeting_time: currentTime,
  //         latitude: latitude,
  //         longitude: longitude,
  //         type: "checkout",
  //       };

  //       try {
  //         const token = getAuthToken();
         
  //         const response = await axios.post(
  //           `${API_URL}/auth/end-meeting`,
  //           checkOutData,
  //           {
  //             headers: { Authorization: `Bearer ${token}` },
  //           }
  //         );

  //         setIsCheckedIn(false);
  //         setActiveLeadId(null);
  //         localStorage.removeItem("isCheckedIn");
  //         localStorage.removeItem("activeLeadId");

  //       } catch (error) {
  //         handleFlashMessage(error || "Failed to check out", "error");
  //       }
  //     });
  //   } else {
  //     console.error("Geolocation is not supported by this browser.");
  //   }
  // };


    //add follow up
    const { isAuthenticated, createEvent } = useGoogleCalendar();
  
    //console.log("selectedLead", selectedLead);
    const navigate = useNavigate();
    const { user: userDeatail } = useSelector((state) => state.auth);
  
    const [leadStatusProgress, setLeadStatusProgress] = useState(false);
  
    useEffect(() => {
      dispatch(fetchCurrentUser());
    }, []);
  
    //add followup
    const [formData, setFormData] = useState({
      end_location:"",
      end_meeting_time:"",
      lead_text: "",
      lead_status: "",
      lead_date: "",
    });
  
    const [formErrors, setFormErrors] = useState({});
    const [flashMessage, setFlashMessage] = useState("");
    const [flashMsgType, setFlashMsgType] = useState("");
    const [attendeesEmails, setAttendeesEmails] = useState([]);
  
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
      setAttendeesEmails([userDeatail.email]); // If you want an array of one email
      // Clear error when user types
      setFormErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
    };
  
    // Validate Inputs
    const validateInputs = () => {
      let errors = {};
      if (!formData.lead_text.trim()) errors.lead_text = "*Lead text is required";
      if (!formData.lead_status.trim())
        errors.lead_status = "*Lead status is required";
      //if (!formData.lead_date.trim()) errors.lead_date = "*Lead date is required";
      setFormErrors(errors);
      return Object.keys(errors).length === 0;
    };
  
    // Handle Form Submit
    const handleSubmitAddFollowUp = async () => {
      if (validateInputs()) {
        try {
          if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(async (position) => {
              const { latitude, longitude } = position.coords;
              const locationName = await getLocationName(latitude, longitude);
              const now = new Date();
              const currentTime = now.toTimeString().split(":").slice(0, 2).join(":");
              setFormData((prev) => ({
                ...prev,
                end_location: locationName,
                end_meeting_time: currentTime,
              }));
            });
          } else {
            console.error("Geolocation is not supported by this browser.");
          }

         

          //console.log("formData", formData);
          // const response = await dispatch(
          //   addLeadCommunication(formData)
          // ).unwrap();

          const token = getAuthToken();
         
          const response = await axios.post(
            `${API_URL}/auth/end-meeting`,
            formData,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );

          //console.log("response",response);
  
          if (response?.data?.success) {
            handleFlashMessage(
              response?.message || "Lead Communication added successfully!",
              "success"
            );

            setFormData({});

            setIsCheckedIn(false);
            setActiveLeadId(null);
            localStorage.removeItem("isCheckedIn");
            localStorage.removeItem("activeLeadId");
  
            //add google calender event
            if (isAuthenticated) {
              handleAddEvent(formData);
            }

            // Close modal after successful submission
            setTimeout(() => {
              setLeadStatusProgress(false);
            }, 1000);
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
  
    //google calender (poa) event add
    const handleAddEvent = (formData) => {
      const event = {
        title: "Meeting Sheduled",
        location: selectedLead?.lead_address,
        description: formData?.lead_text,
        startDateTime: formData?.lead_date,
        endDateTime: formData?.lead_date,
        attendeesEmails: attendeesEmails,
      };
      console.log("event", event);
      createEvent(event);
    };
    //end google calender (poa) event add
  //end add follow up



  return (
    <div className={`overflow-x-auto w-full`}>
      <table className="table-auto min-w-[1200px] w-full text-left border-collapse">
        <thead>
          <tr className="bg-[#473b33] rounded-[8px]">
            {/* <th className="px-4 py-2 text-left text-bgDataNew text-newtextdata">
              <input type="checkbox" disabled className="w-4 h-4 accent-orange-500" />
            </th> */}
            <th className="px-4 py-2 text-left text-bgDataNew text-newtextdata">
              Id
            </th>
            <th className="px-4 py-2 text-left text-bgDataNew text-newtextdata whitespace-nowrap ">
              Company Name
            </th>
            <th className="px-4 py-2 text-left text-bgDataNew text-newtextdata whitespace-nowrap ">
              Contact Person Name
            </th>
            <th className="px-4 py-2 text-left text-bgDataNew text-newtextdata whitespace-nowrap ">
              Salse Person Name
            </th>
            <th className="px-4 py-2 text-left text-bgDataNew text-newtextdata whitespace-nowrap ">
              Meeting Date
            </th>
            <th className="px-4 py-2 text-left text-bgDataNew text-newtextdata whitespace-nowrap ">
              Meeting Type
            </th>
            <th className="px-4 py-2 text-left text-bgDataNew text-newtextdata whitespace-nowrap ">
              Meeting Summary
            </th>
            {/* <th className="px-4 py-2 text-left text-bgDataNew text-newtextdata whitespace-nowrap ">
              Project Name / Application Area
            </th>
            <th className="px-4 py-2 text-left text-bgDataNew text-newtextdata whitespace-nowrap "> 
              Product Sale / Work Execution
            </th>
            <th className="px-4 py-2 text-left text-bgDataNew text-newtextdata whitespace-nowrap ">
              Total Material Qty. / Total Area (in Sqm)
            </th>
            <th className="px-4 py-2 text-left text-bgDataNew text-newtextdata whitespace-nowrap ">
              Approx Business Potential
            </th> */}
            <th className="px-4 py-2 text-left text-bgDataNew text-newtextdata whitespace-nowrap ">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {(poaType === "todayPOA"
            ? poaList.filter((user) => {
                const today = new Date().toISOString().slice(0, 10);
                return user.assign_date?.split("T")[0] === today;
              })
            : poaList
          ).map((user, index) => (
            <tr key={index}>
              {/* <td className="px-4 py-2 text-newtextdata">
                 
                   <input
        type="checkbox"
        className="w-4 h-4 accent-orange-500"
        checked={selectedPOAId === user.id}
        onChange={() => {
          setSelectedPOAId(user.id);
          setSelectedPOA(user);
          setIsLeadAssignPopup(true);
        }}
      /> 
                </td> */}
              <td className="px-4 py-2">{index + 1}</td>
              <td
                className="px-4 py-2 text-newtextdata whitespace-nowrap cursor-pointer"
                onClick={() => {
                  setSelectedPOA(user);
                  setpoaReportOpen(true);
                }}
              >
                {user.customer?.company_name || "N/A"}
              </td>
              <td className="px-4 py-2 text-newtextdata">
                {user.contact_person_name || "N/A"}
              </td>
              <td className="px-4 py-2 text-newtextdata">
                {user.assignedPerson?.fullname || "N/A"}
              </td>
              <td className="px-4 py-2 text-newtextdata">
                {user?.assign_date?.split("T")[0]}
              </td>
              <td className="px-4 py-2 text-newtextdata">
                {user?.meeting_time}
              </td>
              <td className="px-4 py-2 text-newtextdata whitespace-nowrap w-[480px] ">
                {user?.lead_summary}
              </td>
              <td className="px-4 py-2 text-newtextdata whitespace-nowrap ">
                <button
                  onClick={() => handleToggle(user)}
                  className={`float-end mt-2 text-right text-[12px] text-white px-2 py-1 rounded transition-all duration-300 ${
                    isCheckedIn && activeLeadId === user.id
                      ? "bg-red-600 hover:bg-red-800"
                      : "bg-green-600 hover:bg-green-800"
                  }`}
                >
                  {isCheckedIn && activeLeadId === user.id
                    ? "Meeting End"
                    : "Meeting Start"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {leadStatusProgress && (
          <div className="fixed inset-0 p-2 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white w-full md:w-[900px] pt-0 pb-4 rounded-[6px] flex flex-col">
              <h2 className="text-white text-[20px] font-poopins mb-2 px-0 py-2 text-center bg-bgDataNew rounded-t-[5px]">
                Follow Up Form
              </h2>
              <div className="mt-5 md:mt-6 px-4 grid grid-cols-1 md:grid-cols-3 gap-4 overflow-y-auto md:h-fit">
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
              </div>
              <div className="flex items-end justify-end gap-2 px-4 mt-3">
                <button
                  className="bg-bgDataNew text-white px-3 py-2 rounded hover:bg-[#cb6f2ad9]"
                  onClick={() => {
                    handleSubmitAddFollowUp();
                  }}
                >
                  Submit
                </button>
                

                <button
                  className="bg-blue-500 text-white px-3 py-2 rounded hover:bg-[#cb6f2ad9]"
                  onClick={() =>
                    navigate(`/lead-followups/${formData?.lead_id}`)
                  }
                >
                  View Follow
                </button>
                <button
                  className="bg-gray-500 text-white px-3 py-2 rounded hover:bg-gray-600"
                  onClick={() => setLeadStatusProgress(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
    </div>
  );
};

export default DepartmentTable;
