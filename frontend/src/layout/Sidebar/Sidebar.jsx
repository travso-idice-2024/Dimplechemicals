import { useEffect, useState } from "react";
import { personsImgs } from "../../utils/images";
import { navigationLinks } from "../../data/data";
import "./Sidebar.css";
import { useContext } from "react";
import { SidebarContext } from "../../context/sidebarContext";
import { NavLink, useNavigate } from "react-router-dom";
import dimplechemical from "../../assets/images/Dimple-Logo.png";


const Sidebar = () => {
  const navigate = useNavigate();
  const [activeLinkIdx] = useState(1);
  const [sidebarClass, setSidebarClass] = useState("");
  const { isSidebarOpen } = useContext(SidebarContext);

   // Track open/close state for each submenu
   const [openSubmenus, setOpenSubmenus] = useState({});

  useEffect(() => {
    if (isSidebarOpen) {
      setSidebarClass("sidebar-change");
    } else {
      setSidebarClass("");
    }
  }, [isSidebarOpen]);

  // Toggle submenu open/close
  const toggleSubmenu = (id) => {
    setOpenSubmenus((prev) => ({ ...prev, [id]: !prev[id] }));
  };


  return (
    <div className={`sidebar ${sidebarClass}`}>
      {/* <div className="user-info">
        <div className="info-img img-fit-cover">
          <img src={personsImgs.person_four} alt="profile image" />
        </div>
        <span className="info-name">Priya Sharma</span>
      </div> */}

      <div className="user-info p-1" style={{ width: "100%" }}>
        {/* <div className="info-img img-fit-cover">
          <img src={personsImgs.person_four} alt="profile image" />
        </div> */}
        <img src={dimplechemical} alt="" style={{ width: "100%" }} className="cursor-pointer" onClick={()=>navigate("/dashboard")} />
        {/* <span className="info-name">Priya Sharma</span> */}
      </div>

      <nav className="navigation">
        <ul className="nav-list">
          {navigationLinks.map((navigationLink) => (
            <li className="nav-item" key={navigationLink.id}>
              <NavLink
                to={navigationLink.path}
                className={({ isActive }) =>
                  `nav-link ${isActive ? "active" : ""}`
                }
                onClick={(e) => {
                  if (navigationLink.submenu) {
                    e.preventDefault(); // Prevent navigation if submenu exists
                    toggleSubmenu(navigationLink.id);
                  }
                }}
              >
                <img
                  src={navigationLink.image}
                  className="nav-link-icon"
                  alt={navigationLink.title}
                />
                <span className="nav-link-text text-textdata">{navigationLink.title}</span>
                  {/* Show dropdown arrow if submenu exists */}
                  {navigationLink.submenu && (
                  <span
                    className="submenu-toggle text-textdata"
                    onClick={() =>  (navigationLink.id)}
                  >
                    {openSubmenus[navigationLink.id] ? "▲" : "▼"}
                  </span>
                )}

              </NavLink>
              {/* Submenu (Dropdown) */}
              {navigationLink.submenu && openSubmenus[navigationLink.id] && (
                <ul className="ml-8 mt-2 space-y-1">
                  {navigationLink.submenu.map((subItem) => (
                      <li key={subItem.id} className="nav-item">
                        <NavLink
                          to={subItem.path}
                          className={({ isActive }) =>
                            `text-sm nav-link ${isActive ? "active" : ""}`
                          }
                        >
                          <img
                            src={subItem.image}
                            className="nav-link-icon"
                            alt={subItem.title}
                          />
                          <span className="nav-link-text text-[13px]">{subItem.title}</span>
                        </NavLink>
                      </li>
                    ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
