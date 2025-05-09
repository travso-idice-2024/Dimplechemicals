import React, { useEffect, useState, useContext } from "react";
import { SidebarContext } from "../../../../context/sidebarContext";
import { useDispatch, useSelector } from "react-redux";
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
  setpoaReportOpen

}) => {

  const dispatch = useDispatch();
  const { isSidebarOpen } = useContext(SidebarContext);

  const [isCheckedIn, setIsCheckedIn] = useState(false);

  const [checkInTime, setCheckInTime] = useState(null);
  const [checkOutTime, setCheckOutTime] = useState(null);

  const [activeLeadId, setActiveLeadId] = useState(null);

  //console.log("selectedPOA",selectedPOA );

  // ✅ Load data from localStorage on mount
  useEffect(() => {
    const storedCheckIn = localStorage.getItem("checkInTime");
    const storedCheckOut = localStorage.getItem("checkOutTime");

    setCheckInTime(storedCheckIn ? storedCheckIn : null);
    setCheckOutTime(storedCheckOut ? storedCheckOut : null);
  }, []);


  const handleToggle = async (lead) => {
    if (activeLeadId === lead.id && isCheckedIn) {
      await handleCheckOut(lead);
      setIsCheckedIn(false);
      setActiveLeadId(null);
    } else {
      await handleCheckIn(lead);
      setIsCheckedIn(true);
      setActiveLeadId(lead.id);
    }
  };



  const getLocationName = async (latitude, longitude) => {
    //console.log("Lat/Lng sent to API: ", latitude, longitude);
    //latitude="22.7563797", longitude="75.5086203";
    //22.7563797,75.5086203
    // try {
    //   const response = await fetch(
    //     `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json&addressdetails=1`
    //   );
    //   const data = await response.json();
    //   // Ensure you get a detailed address
    //   return data.address
    //     ? `${data.address.city}, ${data.address.state}, ${data.address.country}`
    //     : "Unknown Location";
    // } catch (error) {
    //   console.error("Error fetching location name:", error);
    //   return "Unknown Location";
    // }
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

        //console.log("locationName",locationName);

        const checkInData = {
          start_location: locationName,
          customer_id: lead?.customer_id,
          lead_date: new Date().toISOString().split("T")[0],
          lead_id: lead?.id,
          start_meeting_time: currentTime,
          latitude:latitude,
          longitude:longitude,
          type:"checkin"
        };

        //console.log("checkInData", checkInData);

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
          //handleFlashMessage(error || "Failed to check in", "error");
          //console.log(error);
          //return console.log(error.response?.data || "Failed to check in");
        }
      });
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  const handleCheckOut = async (lead) => {
    //console.log("checkout function call.",lead);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        const locationName = await getLocationName(latitude, longitude);
        const now = new Date();
        const currentTime = now.toTimeString().split(":").slice(0, 2).join(":");
        //console.log("locationName checkout",locationName);
        const checkOutData = {
          end_location: locationName,
          customer_id: lead?.customer_id,
          lead_date: new Date().toISOString().split("T")[0],
          lead_id: lead?.id,
          end_meeting_time: currentTime,
          latitude:latitude,
          longitude:longitude,
          type:"checkout"
        };

        try {
          const token = getAuthToken();
          //console.log(token);
          const response = await axios.post(
            `${API_URL}/auth/end-meeting`,
            checkOutData,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );

          setIsCheckedIn(false);

          // handleFlashMessage(response?.data?.message, "success");
          //console.log(response);
          //return response.data;
        } catch (error) {
          handleFlashMessage(error || "Failed to check out", "error");
          //return console.log(error.response?.data || "Failed to check out");
        }
      });
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  return (
    <div
      className={`overflow-x-auto w-full`}
    >
      <table className="table-auto min-w-[1200px] w-full text-left border-collapse">
        <thead>
          <tr className="bg-[#473b33] rounded-[8px]">
            {/* <th className="px-4 py-2 text-left text-bgDataNew text-newtextdata">
              <input type="checkbox" disabled className="w-4 h-4 accent-orange-500" />
            </th> */}
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
            {/* <th className="px-4 py-2 text-left text-bgDataNew text-newtextdata whitespace-nowrap">
              Project Name / Application Area
            </th>
            <th className="px-4 py-2 text-left text-bgDataNew text-newtextdata whitespace-nowrap"> 
              Product Sale / Work Execution
            </th>
            <th className="px-4 py-2 text-left text-bgDataNew text-newtextdata whitespace-nowrap">
              Total Material Qty. / Total Area (in Sqm)
            </th>
            <th className="px-4 py-2 text-left text-bgDataNew text-newtextdata whitespace-nowrap">
              Approx Business Potential
            </th> */}
            <th className="px-4 py-2 text-left text-bgDataNew text-newtextdata whitespace-nowrap">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {poaList.map((user, index) => (
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
                className="px-4 py-2 text-newtextdata cursor-pointer"
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
              <td className="px-4 py-2 text-newtextdata w-[450px] ">
                {user?.lead_summary}
              </td>
              <td className="px-4 py-2 text-newtextdata w-[450px] ">
                <button
                  onClick={() => handleToggle(user)}
                  className={`float-end mt-2 text-right text-[12px] text-white px-2 py-1 rounded transition-all duration-300 ${isCheckedIn && activeLeadId === user.id
                      ? "bg-red-600 hover:bg-red-800"
                      : "bg-green-600 hover:bg-green-800"
                    }`}
                >
                  {isCheckedIn && activeLeadId === user.id ? "Meeting End" : "Meeting Start"}
                </button>


              </td>

            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DepartmentTable;
