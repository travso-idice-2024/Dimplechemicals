import React, { useState, useEffect, useRef } from "react";
import { iconsImgs } from "../../utils/images";
import "./ContentTop.css";
import { useContext } from "react";
import { SidebarContext } from "../../context/sidebarContext";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../redux/authSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp, faChevronDown } from "@fortawesome/free-solid-svg-icons";

const UserContentTop = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef(null);

  // const [isQuickOpen, setIsQuickOpen] = useState(false);
  // const QuickRef = useRef(null);

  const handleLogout = () => {
    dispatch(logout()); // Dispatch logout action
    navigate("/"); // Redirect to login page
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

  // ✅ Close dropdown when clicking outside
  // useEffect(() => {
  //   function handleQuickClickOutside(event) {
  //     if (QuickRef.current && !QuickRef.current.contains(event.target)) {
  //       setIsQuickOpen(false);
  //     }
      
  //   }

  //   document.addEventListener("mousedown", handleQuickClickOutside);
  //   return () => {
  //     document.removeEventListener("mousedown", handleQuickClickOutside);
  //   };
  // }, []);


  return (
    <div className="main-content-top">
      <div className="content-top-left bgdatacolornew">
        <button
          type="button"
          className="sidebar-toggler"
          onClick={() => toggleSidebar()}
        >
          <img src={iconsImgs.menu} alt="" />
        </button>
        <h3 className="content-top-title">Welcome Rishab Sharma</h3>
      </div>
      <div className="content-top-btns flex">
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
              <h2 className="font-bai text-[12px] text-white"></h2>
              </div>
              <div>
              <FontAwesomeIcon icon={faChevronDown} className="text-white text-[12px] mb-0"/>
              </div>
            </div>
          </button>

          {isQuickOpen && (
            <div className="absolute right-0 w-[155px] bg-white bordernewdata shadow-lg rounded-[5px] px-2 py-2 z-10">
              <div className="flex flex-col items-center gap-2 border-b pb-2">
                  <p className="text-[12px] font-semibold">Update Follow Up</p>
                  <p className="text-[12px] font-semibold">Meeting Sechedule</p>
                  <p className="text-[12px] font-semibold">Generate Report</p>
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
              <h2 className="font-bai text-[12px] text-white">Sneha Mishra</h2>
              <p className="font-bai text-[10px] text-white">Sneha@example...</p>
              </div>
              <div>
              <FontAwesomeIcon icon={faChevronDown} className="text-white text-[12px] mb-2"/>
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
                  <p className="text-[12px] font-semibold">Sneha Mishra</p>
                  <p className="text-[10px] text-gray-500">Sneha@example.com </p>
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
  );
};

export default UserContentTop;