import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./SalesProgressMange.css";
import { iconsImgs } from "../../../utils/images";
import DepartmentTable from "./DepartmentTable";
import Pagination from "./Pagination";
import AddRoleModal from "./AddRoleModal";
import ViewUserModal from "./ViewUserModal";
import EditUserModal from "./EditUserModal";
import ContentTop from "../../ContentTop/ContentTop";
import UserContentTop from "../../ContentTop/UserContentTop";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faDollarSign,
  faPhone,
  faHandshake,
  faClock 
} from "@fortawesome/free-solid-svg-icons";

import { fetchCurrentUser } from "../../../redux/authSlice";
import { todaysAssignedLeadsCount, todaysLead } from "../../../redux/leadSlice";
import SuccessMessage from "../../AlertMessage/SuccessMessage";
import ErrorMessage from "../../AlertMessage/ErrorMessage";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const getAuthToken = () => localStorage.getItem("token");

const SalesProgressMange = () => {
  const dispatch = useDispatch();
  const { user: userDeatail } = useSelector((state) => state.auth);
  const { allLeadsCount, salesPersonleads, totalPages } = useSelector(
    (state) => state.lead
  );

  console.log("allLeadsCount", allLeadsCount);
  // Pagination & Search States
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const leadPerPage = 10;

  useEffect(() => {
    dispatch(fetchCurrentUser());
    dispatch(todaysAssignedLeadsCount());
    dispatch(
      todaysLead({ page: currentPage, limit: leadPerPage, search: searchTerm })
    );
    // eslint-disable-next-line
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

  //const [searchTerm, setSearchTerm] = useState("");
  const [leadDataShowNew, setLeadDataShowNew] = useState(false);
  // Load initial users from localStorage or use default list
  // const [users, setUsers] = useState(() => {
  //   const storedUsers = localStorage.getItem("salesManagementleads");
  //   return storedUsers
  //     ? JSON.parse(storedUsers)
  //     : [
  //         {
  //           date: "22/03/2025",
  //           leadowner: "Nikhil",
  //           companyname: "Dimple Chemicals",
  //           clientname: "Dimple Gupta",
  //           leadsource: "Marketing",
  //           leadstatus: "Warm",
  //         },
  //         {
  //           date: "22/03/2025",
  //           leadowner: "Prashant",
  //           companyname: "Idice System",
  //           clientname: "Komal Gupta",
  //           leadsource: "Sales",
  //           leadstatus: "Hot",
  //         },
  //       ];
  // });

  const [isViewModalOpen, setViewModalOpen] = useState(false);
  const [isEditUserModalOpen, setEditUserModalOpen] = useState(false);
  // const usersPerPage = 8;
  // const totalPages = Math.ceil(users.length / usersPerPage);

  // Load currentPage from sessionStorage or default to page 1
  // const [currentPage, setCurrentPage] = useState(() => {
  //   return parseInt(sessionStorage.getItem("currentPage")) || 1;
  // });

  // Save currentPage to sessionStorage when it changes
  // useEffect(() => {
  //   sessionStorage.setItem("currentPage", currentPage);
  // }, [currentPage]);

  // // Save users to localStorage whenever users state updates
  // useEffect(() => {
  //   localStorage.setItem("salesManagementleads", JSON.stringify(users));
  // }, [users]);

  // Handle page change
  // const handlePageChange = (newPage) => {
  //   setCurrentPage(newPage);
  // };

  // Filtered user list based on search
  // const filteredUsers = users
  //   .sort((a, b) => b.companyname.localeCompare(a.companyname))
  //   .filter(
  //     (user) =>
  //       user.companyname.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //       user.leadtype.toLowerCase().includes(searchTerm.toLowerCase())
  //   );

  // Paginate user data
  // const indexOfLastUser = currentPage * usersPerPage;
  // const indexOfFirstUser = indexOfLastUser - usersPerPage;
  // const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  ///check in checkout button
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

  const [isCheckedIn, setIsCheckedIn] = useState(false);

  // useEffect(() => {
  //   // Retrieve stored value from localStorage
  //   const storedCheckIn = JSON.parse(localStorage.getItem("isCheckedIn"));
  
  //   // If no value exists, initialize it with `false`
  //   if (storedCheckIn === null) {
  //     localStorage.setItem("isCheckedIn", JSON.stringify(false));
  //   } else {
  //     setIsCheckedIn(storedCheckIn);
  //   }
  // }, []);
 

  const [checkInTime, setCheckInTime] = useState(null);
  const [checkOutTime, setCheckOutTime] = useState(null);

  // ✅ Load data from localStorage on mount
  useEffect(() => {
    const storedCheckIn = localStorage.getItem("checkInTime");
    const storedCheckOut = localStorage.getItem("checkOutTime");

    setCheckInTime(storedCheckIn ? storedCheckIn : null);
    setCheckOutTime(storedCheckOut ? storedCheckOut : null);
  }, []);

  const handleToggle = async () => {
    if (isCheckedIn) {
      await handleCheckOut();
    } else {
      await handleCheckIn();
    }
    setIsCheckedIn(!isCheckedIn);
  };

  const getLocationName = async (latitude, longitude) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json&addressdetails=1`
      );
      const data = await response.json();
      // Ensure you get a detailed address
      return data.address
        ? `${data.address.city}, ${data.address.state}, ${data.address.country}`
        : "Unknown Location";
    } catch (error) {
      console.error("Error fetching location name:", error);
      return "Unknown Location";
    }
  };

  const handleCheckIn = async () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        const locationName = await getLocationName(latitude, longitude);

        const checkInData = {
          emp_id: userDeatail?.id,
          //checkInTime: new Date().toISOString().replace("T", " ").split(".")[0],
          latitude,
          longitude,
          checkin_location: locationName,
          data: new Date().toISOString().split("T")[0],
        };

        //console.log("checkInData", checkInData);

        try {
          const token = getAuthToken();
          //console.log("token",token);
          const response = await axios.post(
            `${API_URL}/auth/checkin`,
            checkInData,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          const checkInTime = new Date(
            response?.data?.checkInRecord?.check_in_time
          );
          const formattedTime = checkInTime.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          });

          setCheckInTime(formattedTime);
          setCheckOutTime(null); // Reset checkout on new check-in
          localStorage.setItem("checkInTime", formattedTime);
          localStorage.removeItem("checkOutTime"); // Ensure fresh data


          setIsCheckedIn(true);
          // localStorage.setItem("isCheckedIn", JSON.stringify(true));

          handleFlashMessage(response?.data?.message, "success");
        } catch (error) {
          handleFlashMessage(error || "Failed to check in", "error");
          //console.log(error);
          //return console.log(error.response?.data || "Failed to check in");
        }
      });
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  const handleCheckOut = async () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        const locationName = await getLocationName(latitude, longitude);

        const checkOutData = {
          emp_id: userDeatail?.id,
          //checkInTime: new Date().toISOString().replace("T", " ").split(".")[0],
          latitude,
          longitude,
          checkout_location: locationName,
          data: new Date().toISOString().split("T")[0],
        };

        try {
          const token = getAuthToken();
          //console.log(token);
          const response = await axios.post(
            `${API_URL}/auth/checkout`,
            checkOutData,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          //localStorage.removeItem("checkInTime");
          const checkOutTime = new Date(
            response?.data?.checkOutRecord?.check_out_time
          );
          const formattedTime = checkOutTime.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          });
          setCheckOutTime(formattedTime);
          setCheckInTime(null);
          localStorage.setItem("checkOutTime", formattedTime);
          localStorage.removeItem("checkInTime");
          //localStorage.setItem("checkInTime", formattedTime);
          setIsCheckedIn(false);
          // localStorage.setItem("isCheckedIn", JSON.stringify(false));
          handleFlashMessage(response?.data?.message, "success");
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
    <div className="main-content">
      <UserContentTop isCheckedIn={isCheckedIn} setIsCheckedIn={setIsCheckedIn} handleCheckOut={handleCheckOut} />


      {!leadDataShowNew && (
        <div className="main-content-holder max-h-[615px] overflow-y-auto scrollbar-hide">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* chech in check out  */}
            <div className="bg-bgData flex flex-col items-center justify-center rounded-[8px] shadow-md shadow-black/5 text-white px-4 py-6 cursor-pointer">
              <FontAwesomeIcon
                icon={faClock}
                className="text-4xl text-bgDataNew mb-2"
              />
              <h2 className="text-textdata font-semibold">
                {" "}
                <button
                  onClick={handleToggle}
                  className={`float-end mt-2 text-right text-[12px] text-white px-2 py-1 rounded transition-all duration-300 ${
                    isCheckedIn
                      ? "bg-red-600 hover:bg-red-800"
                      : "bg-green-600 hover:bg-green-800"
                  }`}
                >
                  {isCheckedIn ? "Check Out" : "Check In"}
                </button>
              </h2>
              <p className="text-[12px]">
                {" "}
                {/* ✅ Show nothing if no check-in */}
                {!checkInTime && !checkOutTime && (
                  <span className="text-bgDataNew">No check-in yet.</span>
                )}
                {/* ✅ Show check-in time if user has checked in */}
                {checkInTime && !checkOutTime && (
                  <span className="text-bgDataNew text-[13px]">
                    <b className="text-green-500">Check In :</b> {checkInTime}
                  </span>
                )}
                {/* ✅ Show check-in and check-out times after user checks out */}
                {!checkInTime && checkOutTime && (
                  <span className="text-bgDataNew text-[13px]">
                    <b className="text-green-500">Check Out : </b>{" "}
                    {checkOutTime}
                  </span>
                )}
              </p>
            </div>
            <div
              className="bg-bgData flex flex-col items-center justify-center rounded-[8px] shadow-md shadow-black/5 text-white px-4 py-6 cursor-pointer"
              onClick={() => {
                setLeadDataShowNew(true);
              }}
            >
              <div className="relative">
                <FontAwesomeIcon
                  icon={faUser}
                  className="text-4xl text-bgDataNew mb-2"
                />
                <span className="absolute -top-2 -right-3 bg-red-500 text-white text-sm font-bold w-6 h-6 flex items-center justify-center rounded-full">
                  {allLeadsCount?.assignedLeadsCount}
                </span>
              </div>
              <h2 className="text-textdata font-semibold">Assigned Lead</h2>
              <p className="text-[12px]">{userDeatail?.fullname}</p>
            </div>
            <div className="bg-bgData flex flex-col items-center justify-center rounded-[8px] shadow-md shadow-black/5 text-white px-4 py-6 cursor-pointer">
              <FontAwesomeIcon
                icon={faDollarSign}
                className="text-4xl text-bgDataNew mb-2"
              />
              <h2 className="text-textdata font-semibold">Total Sales</h2>
              <p className="text-[12px]">₹1,25,000</p>
            </div>
            <div className="bg-bgData flex flex-col items-center justify-center rounded-[8px] shadow-md shadow-black/5 text-white px-4 py-6 cursor-pointer">
              <FontAwesomeIcon
                icon={faPhone}
                className="text-4xl text-bgDataNew mb-2"
              />
              <h2 className="text-textdata font-semibold">
                Pending Follow-Ups
              </h2>
              <p className="text-[12px]">5 Clients</p>
            </div>
            <div className="bg-bgData flex flex-col items-center justify-center rounded-[8px] shadow-md shadow-black/5 text-white px-4 py-6 cursor-pointer">
              <FontAwesomeIcon
                icon={faHandshake}
                className="text-4xl text-bgDataNew mb-2"
              />
              <h2 className="text-textdata font-semibold">Closed Deals</h2>
              <p className="text-[12px]">3 Successful Sales</p>
            </div>
          </div>
        </div>
      )}
      {leadDataShowNew && (
        <div className="main-content-holder max-h-[615px] overflow-y-auto scrollbar-hide">
          <div className="flex flex-col gap-[20px]">
            <div className="flex items-center justify-between">
              <div>
                <h1
                  class="text-white text-[15.5px] font-semibold flex items-center cursor-pointer"
                  onClick={() => setLeadDataShowNew(false)}
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 36 36"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    class="cursor-pointer"
                  >
                    <path
                      d="M22.5 27L13.5 18L22.5 9"
                      stroke="white"
                      stroke-width="3"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>
                  </svg>
                  Assign TaskLead
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
              </div>
            </div>
            <div className="bg-bgData rounded-[8px] shadow-md shadow-black/5 text-white px-4 py-6">
              {/*------- Table Data Start -------*/}
              <DepartmentTable
                setEditUserModalOpen={setEditUserModalOpen}
                SalesPersonleads={salesPersonleads?.data}
                setViewModalOpen={setViewModalOpen}
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

          {/* Edit User Modal */}
          {isEditUserModalOpen && (
            <EditUserModal setEditUserModalOpen={setEditUserModalOpen} />
          )}

          {/* View User Modal */}
          {isViewModalOpen && (
            <ViewUserModal setViewModalOpen={setViewModalOpen} />
          )}
        </div>
      )}
    </div>
  );
};

export default SalesProgressMange;
