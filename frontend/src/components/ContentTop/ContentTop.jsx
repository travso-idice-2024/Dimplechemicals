import React, { useState, useEffect, useRef } from "react";
import { iconsImgs } from "../../utils/images";
import "./ContentTop.css";
import { useContext } from "react";
import { SidebarContext } from "../../context/sidebarContext";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout, fetchCurrentUser } from "../../redux/authSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import SuccessMessage from "../AlertMessage/SuccessMessage";
import ErrorMessage from "../AlertMessage/ErrorMessage";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const getAuthToken = () => localStorage.getItem("token");

const ContentTop = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user: userDeatail } = useSelector((state) => state.auth);
  console.log("userDeatail", userDeatail);
  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, [dispatch]);

  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef(null);

  // const [isQuickOpen, setIsQuickOpen] = useState(false);
  // const QuickRef = useRef(null);

  const handleLogout = () => {
    const isCheckedIn = JSON.parse(localStorage.getItem("isCheckedIn"));
    //alert(isCheckedIn);
    if (isCheckedIn) {
      //alert("check");
      const confirmCheckOut = window.confirm(
        "You are still checked in. Do you want to check out before logging out?"
      );

      if (confirmCheckOut) {
        handleCheckOut(); // Call check-out function
        localStorage.setItem("isCheckedIn", JSON.stringify(false)); // Update local storage
        dispatch(logout()); // Dispatch logout action
        //localStorage.removeItem("isCheckedIn"); // Clear check-in state
        navigate("/"); // Redirect to login page
      } else {
        return; // Stop logout if the user cancels
      }
    }
  };

  const { toggleSidebar } = useContext(SidebarContext);

  // ✅ Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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

  ///check in checkout button
  const [isCheckedIn, setIsCheckedIn] = useState(
    JSON.parse(localStorage.getItem("isCheckedIn")) || false
  );

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

  ///end check in check out button

  return (
    <>
      <div className="fixed top-5 right-5 z-50">
        {flashMessage && flashMsgType === "success" && (
          <SuccessMessage message={flashMessage} />
        )}
        {flashMessage && flashMsgType === "error" && (
          <ErrorMessage message={flashMessage} />
        )}
      </div>
      <div className="main-content-top">
        <div className="content-top-left bgdatacolornew">
          <button
            type="button"
            className="sidebar-toggler"
            onClick={() => toggleSidebar()}
          >
            <img src={iconsImgs.menu} alt="" />
          </button>
          <h3 className="content-top-title">
            Welcome {userDeatail?.fullname}{" "}
            {/* ✅ Show nothing if no check-in */}
            {!checkInTime && !checkOutTime && (
              <span className="text-bgDataNew">No check-in yet.</span>
            )}
            {/* ✅ Show check-in time if user has checked in */}
            {checkInTime && !checkOutTime && (
              <span className="text-bgDataNew text-[13px]">
               <b className="text-green-500">Check In :</b>  {checkInTime}
              </span>
            )}
            {/* ✅ Show check-in and check-out times after user checks out */}
            {!checkInTime && checkOutTime && (
              <span className="text-bgDataNew text-[13px]">
               <b className="text-green-500">Check Out : </b> {checkOutTime}
              </span>
            )}
          </h3>
        </div>
        <div className="content-top-btns flex">
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
          {/* <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded-md font-semibold 
                 hover:bg-red-700 transition duration-300 ease-in-out"
        >
          Logout
        </button> */}
          {/* <button
          type="button"
          className="search-btn content-top-btn bgdatacolornews"
        >
          <img
            src={iconsImgs.search}
            alt=""
            style={{ width: "20px", height: "20px" }}
          />
        </button> */}
          <button className="notification-btn content-top-btn bgdatacolornews">
            <img
              src={iconsImgs.bell}
              alt=""
              style={{ width: "22px", height: "20px" }}
            />
            <span className="notification-btn-dot"></span>
          </button>

          {/* Quick Action */}
          {/* <div className="relative inline-block" ref={QuickRef}>
          <button
            className="notification-btn content-top-btns bgdatacolornews bgdatacolornewsData flex items-center gap-2"
            onClick={() => setIsQuickOpen(!isQuickOpen)}
          >
            <div className="flex items-center gap-2">
              <div className="flex flex-col items-start">
              <h2 className="font-bai text-[12px] text-white">Quick Action</h2>
              </div>
              <div>
              <FontAwesomeIcon icon={faChevronDown} className="text-white text-[12px] mb-0"/>
              </div>
            </div>
          </button>

          {isQuickOpen && (
            <div className="absolute right-0 w-fit bg-white bordernewdata shadow-lg rounded-[5px] p-3 z-10">
              <div className="flex flex-col items-center gap-2 border-b pb-2">
                  <p className="text-[12px] font-semibold">Update Lead</p>
                  <p className="text-[12px] font-semibold"></p>
              </div>
            </div>
          )}
        </div> */}

          {/* Profile Action */}
          <div className="relative inline-block" ref={profileRef}>
            <button
              className="notification-btn content-top-btns bgdatacolornews bgdatacolornewsData flex items-center gap-2"
              onClick={() => setIsProfileOpen(!isProfileOpen)}
            >
              <div>
                <img
                  src="https://images.pexels.com/photos/1704488/pexels-photo-1704488.jpeg?cs=srgb&dl=pexels-sulimansallehi-1704488.jpg&fm=jpg"
                  alt="User"
                  className="w-[32px] h-[32px] rounded-full bordernewdata object-cover aspect-square"
                />
              </div>
              <div className="flex items-center gap-2">
                <div className="flex flex-col items-start">
                  <h2 className="font-bai text-[12px] text-white">
                    {userDeatail?.fullname}
                  </h2>
                  <p className="font-bai text-[10px] text-white">
                    {userDeatail?.email}
                  </p>
                </div>
                <div>
                  <FontAwesomeIcon
                    icon={faChevronDown}
                    className="text-white text-[12px] mb-2"
                  />
                </div>
              </div>

              {/* <span className="notification-btn-dot"></span> */}
            </button>

            {isProfileOpen && (
              <div className="absolute right-0 w-max bg-white bordernewdata shadow-lg rounded-[5px] p-3 mt-1 z-10">
                <div className="flex items-center gap-2 border-b pb-2">
                  <img
                    src="https://images.pexels.com/photos/1704488/pexels-photo-1704488.jpeg?cs=srgb&dl=pexels-sulimansallehi-1704488.jpg&fm=jpg"
                    alt="User"
                    className="w-9 h-9 rounded-full aspect-square object-cover"
                  />
                  <div>
                    <p className="text-[12px] font-semibold">
                      {userDeatail?.fullname}
                    </p>
                    <p className="text-[10px] text-gray-500">
                      {userDeatail?.email}
                    </p>
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="bg-bgDataNew float-end mt-2 text-right text-[12px] text-white hover:bg-orange-800 px-2 py-1 rounded"
                >
                  Logout
                </button>
                <button></button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ContentTop;
