import { iconsImgs } from "../../utils/images";
import "./ContentTop.css";
import { useContext } from "react";
import { SidebarContext } from "../../context/sidebarContext";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../redux/authSlice";

const ContentTop = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout()); // Dispatch logout action
    navigate("/"); // Redirect to login page
  };
  const { toggleSidebar } = useContext(SidebarContext);
  return (
    <div className="main-content-top">
      <div
        className="content-top-left bgdatacolornew"
      >
        <button
          type="button"
          className="sidebar-toggler"
          onClick={() => toggleSidebar()}
        >
          <img src={iconsImgs.menu} alt="" />
        </button>
        <h3 className="content-top-title">Home</h3>
      </div>
      <div className="content-top-btns">
      <button
      onClick={handleLogout}
      className="bg-red-500 text-white px-4 py-2 rounded-md font-semibold 
                 hover:bg-red-700 transition duration-300 ease-in-out"
    >
      Logout
    </button>
        <button
          type="button"
          className="search-btn content-top-btn bgdatacolornews"
        >
          <img src={iconsImgs.search} alt="" style={{width:"20px", height:"20px"}}/>
        </button>
        <button
          className="notification-btn content-top-btn bgdatacolornews"
        >
          <img src={iconsImgs.bell} alt="" style={{width:"20px", height:"20px"}}/>
          <span className="notification-btn-dot"></span>
        </button>
      </div>
    </div>
  );
};

export default ContentTop;
