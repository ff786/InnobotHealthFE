import React, { useState, useEffect, useRef } from "react";
import logo2 from './logo2.png'
import { Helmet } from "react-helmet";
import './sideNav.css';
import ClaimOverview from '../../ClaimOverview/OverviewClaim.jsx';

const SideNav = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [isSidebarLocked, setIsSidebarLocked] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState('dashboard'); // Initialize with the value corresponding to the first dropdown
  const [userData, setUserData] = useState(null);
  const sidebarRef = useRef(null);

  const handleDropdownToggle = (dashboard) => {
    setActiveDropdown(activeDropdown === dashboard ? null : dashboard);
  };
  const handleDropdownToggle2 = (dashboard2) => {
    setActiveDropdown(activeDropdown === dashboard2 ? null : dashboard2);
  };

  const sideNavStyles = {
    width: isExpanded ? "300px" : "50px",
    height: "matchContent",
    backgroundColor: "#02072D",
    color: "#000000",
    position: "relative",
    top: isExpanded ? "-2px" : "0",
    left: isExpanded ? "10px" : "0",
    zIndex: "1000",
    boxShadow: isExpanded ? "0 0 10px rgba(0, 0, 0, 0.5)" : "none", // Adding shadow for overlay
    transition: "width 0.3s ease, height 0.3s ease",
  };;

  const toggleLock = () => {
    setIsSidebarLocked(!isSidebarLocked);
  };

  const hideSidebar = () => {
    if (!isSidebarLocked) {
      setIsExpanded(false);
    }
  };

  const showSidebar = () => {
    if (!isSidebarLocked) {
      setIsExpanded(true);
    }
  };

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };
  // Function to toggle active dropdown

  useEffect(() => {
    // Adding event listeners to handle mouse enter and leave events
    const sidebar = sidebarRef.current;
    if (sidebar) {
      sidebar.addEventListener("mouseleave", hideSidebar);
      sidebar.addEventListener("mouseenter", showSidebar);

      // Cleanup function to remove event listeners
      return () => {
        sidebar.removeEventListener("mouseleave", hideSidebar);
        sidebar.removeEventListener("mouseenter", showSidebar);
      };
    }
  }, [isSidebarLocked]); // Re-run effect when isSidebarLocked changes

  useEffect(() => {
    // Update CSS variables based on dark mode
    if (isDarkMode) {
      document.documentElement.style.setProperty("--bg-color", "#333");
      document.documentElement.style.setProperty("--text-color", "#fff");
    } else {
      // Reset to default values if dark mode is off
      document.documentElement.style.setProperty("--bg-color", "");
      document.documentElement.style.setProperty("--text-color", "");
    }
  }, [isDarkMode]);

  useEffect(() => {
      // Fetch data from the API when the component mounts
      fetch("http://api.innobot.dulanga.com/api/innobothealth/admin/getAll")
        .then(response => response.json())
        .then(data => {
          // Assuming the API response is an array of user objects
          // You may need to adjust this according to your actual API response structure
          if (Array.isArray(data) && data.length > 0) {
            // Set the user data to the first user object from the response
            setUserData(data[0]);
          }
        })
        .catch(error => console.error("Error fetching user data:", error));
    }, []);

  return (
   <>
    <Helmet>
      <link flex href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css" rel="stylesheet" />
    </Helmet>
    <div className={`smp ${isExpanded ? 'expand' : 'close'}`}>
    <nav ref={sidebarRef} className={`sidebar ${isSidebarLocked ? 'locked' : ''} ${isExpanded ? 'expand' : 'close'}`}>
      <div style={sideNavStyles}  className="bdy">
        <div className="logo_items flex">
          <span className="nav_image">
            <img src={logo2} alt="logo" width='100%' />
          </span>
          <span className="logo_name">Innobot
            <p className="moto">Innovating Healthcare Through Automation</p>
          </span>
          <i className={`bx ${isSidebarLocked ? 'bx-lock-alt' : 'bx-lock-open-alt'}`} id="lock-icon" title="Unlock Sidebar" onClick={toggleLock}></i>
          <i className="bx bx-x" id="sidebar-close" onClick={toggleSidebar}></i>
        </div>
          <div className="menu_container">
            <div className="menu_items">
              <ul className="menu_item">
                <div className="menu_title flex" onClick={() => handleDropdownToggle('dashboard')}>
                  <span className="title">Menu</span>
                  <span className="line"></span>
                  <i className={`bx ${activeDropdown === 'dashboard' ? 'bx-chevron-up' : 'bx-chevron-down'}`}></i>
                </div>
                {activeDropdown === 'dashboard' && (
                  <ul className="dropdown-menu">
                      <a href="#" className="link flex">
                        <i className="bx bx-home-alt"></i>
                        <span>Home</span>
                      </a>
                      <a href="#" className="link flex">
                        <i className="bx bx-user"></i>
                        <span>Users</span>
                      </a>
                      <a href="Inventory" className="link flex">
                        <i className="bx bx-archive"></i>
                        <span>Inventory</span>
                      </a>
                      <a href="Appointments" className="link flex">
                        <i className="bx bx-calendar"></i>
                        <span>Appointments</span>
                      </a>
                      <a href="ClaimOverview" className="link flex">
                        <i className="bx bx-file"></i>
                        <span>Claims</span>
                      </a>
                      {/* <a href="#" className="link flex">
                        <i className="bx bx-user-circle"></i>
                        <span>Patients</span>
                      </a> */}
                      <a href="NotifyView" className="link flex">
                        <i className="bx bx-bell"></i>
                        <span>Notifications</span>
                      </a>
                      <a href="ViewPND" className="link flex">
                        <i className="bx bx-receipt"></i>
                        <span>Procedure & Diagnosis</span>
                      </a>
                      <a href="#" className="link flex">
                        <i className="bx bx-shield"></i>
                        <span>Insurance</span>
                      </a>
                  </ul>
                )}
              </ul>
              <ul className="menu_item">
                <div className="menu_title flex" onClick={() => handleDropdownToggle('dashboard2')}>
                  <span className="title">Services</span>
                  <span className="line"></span>
                  <i className={`bx ${activeDropdown === 'dashboard2' ? 'bx-chevron-up' : 'bx-chevron-down'}`}></i>
                </div>
                {activeDropdown === 'dashboard2' && (
                  <ul className="dropdown-menu">
                      <a href="#" className="link flex">
                        <i className="bx bx-cog"></i>
                        <span>Settings</span>
                      </a>
                      <a href="https://innobothealth.com/innobot-privacy-policy/" className="link flex">
                        <i className="bx bx-shield-alt"></i>
                        <span>Privacy Policy</span>
                      </a>
                      <a href="https://innobothealth.com/about-us/" className="link flex">
                        <i className="bx bx-help-circle"></i>
                        <span>About Us</span>
                      </a>
                  </ul>
                )}
               <section className="dwn">
                 {userData && (
                   <div className="sidebar_profile flex">
                     <span className="nav_image">
                       <img src={logo2} alt="logo_img" />
                     </span>
                     <div className="swm">
                     <div className={`swm ${isExpanded ? '' : 'close'}`}>
                       <span className="name">{userData.firstName}</span><br/>
                       <span className="email">{userData.email}</span>
                     </div>
                     </div>
                   </div>
                 )}
               </section>
            </ul>
           </div>
          </div>
        </div>
      </nav>
      </div>
    </>
  );
};

export default SideNav;
