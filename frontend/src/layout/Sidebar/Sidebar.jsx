import { useEffect, useState } from "react";
import { personsImgs } from "../../utils/images";
import { navigationLinks } from "../../data/data";
import "./Sidebar.css";
import { useContext } from "react";
import { SidebarContext } from "../../context/sidebarContext";
import { NavLink, useNavigate } from "react-router-dom";
import dimplechemical from "../../assets/images/Dimple-Logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp, faChevronDown } from "@fortawesome/free-solid-svg-icons";

const Sidebar = () => {
  const navigate = useNavigate();
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

  // Recursive function to render nested submenus
  const renderSubmenu = (submenu, level) => {
    const submenuClass =
      level === 1 ? "submenu-link" : level === 2 ? "nested-submenu-link" : "";

    return (
      <ul className="ml-4 mt-2 space-y-1">
        {submenu.map((subItem) => (
          <li key={subItem.id} className="nav-item">
            <NavLink
              to={subItem.path}
              className={({ isActive }) =>
                `${submenuClass} ${isActive ? "active" : ""}`
              }
              onClick={(e) => {
                if (subItem.submenu) {
                  e.preventDefault();
                  toggleSubmenu(subItem.id);
                }
              }}
            >
              <img
                src={subItem.image}
                className="nav-link-icon"
                alt={subItem.title}
              />
              <span className="nav-link-text">{subItem.title}</span>
              {subItem.submenu && (
                <span
                  className="submenu-toggle"
                  onClick={(e) => {
                    e.preventDefault();
                    toggleSubmenu(subItem.id);
                  }}
                >
                  {openSubmenus[subItem.id] ? <FontAwesomeIcon icon={faChevronUp} /> : <FontAwesomeIcon icon={faChevronDown}/>}
                </span>
              )}
            </NavLink>
            {subItem.submenu && openSubmenus[subItem.id] && (
              <div className="ml-4">
                {renderSubmenu(subItem.submenu, level + 1)}
              </div>
            )}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className={`sidebar ${sidebarClass}`}>
      <div className="user-info p-1" style={{ width: "100%" }}>
        <img
          src={dimplechemical}
          alt=""
          style={{ width: "100%" }}
          className="cursor-pointer"
          onClick={() => navigate("/dashboard")}
        />
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
                <span className="nav-link-text text-textdata">
                  {navigationLink.title}
                </span>
                {/* Show dropdown arrow if submenu exists */}
                {navigationLink.submenu && (
                  <span
                    className="submenu-toggle text-textdata"
                    onClick={(e) => {
                      e.preventDefault();
                      toggleSubmenu(navigationLink.id);
                    }}
                  >
                    {openSubmenus[navigationLink.id] ? <FontAwesomeIcon icon={faChevronUp} /> : <FontAwesomeIcon icon={faChevronDown}/>}
                  </span>
                )}
              </NavLink>
              {/* Render submenu if it exists and is open */}
              {navigationLink.submenu &&
                openSubmenus[navigationLink.id] &&
                renderSubmenu(navigationLink.submenu, 1)}
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
