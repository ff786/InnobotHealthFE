import React, { useState, useEffect, useRef } from 'react';
import { FaBell, FaSignOutAlt, FaHome } from 'react-icons/fa';
import { IoPersonOutline } from 'react-icons/io5';
import './Navbar.css';
import '../../ClaimManage/ClaimForm.css';
import '../../UpdateClaim/UpdateForm.css';
import NotifyBtn from '../../NotificationBtn/NotifyBtn.jsx';
import axios from 'axios';

function Navbar() {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showLogOptions, setShowLogOptions] = useState(false);
  const dropdownRef = useRef(null);
  const [notifications, setNotifications] = useState([])

  const toggleProfile = () => {
    setShowNotifications(!showNotifications);
  };
  const toggleNotifications = () => {
    setShowLogOptions(!showLogOptions);
  };

  useEffect(() => {

    axios.get('http://api.innobot.dulanga.com/api/innobothealth/notification/get/mynotification', {
      headers: {
        'Authorization' : 'Bearer '.concat(sessionStorage.getItem("access_token"))
      }
    }).then(value => {
      setNotifications(value.data);
    }).catch(reason => {
      console.log('Exception Occurred '.concat(reason));
    });

    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
      else {
        setShowNotifications(true);
      }
    };

    window.addEventListener('click', handleClickOutside);

    return () => {
      window.removeEventListener('click', handleClickOutside);
    };

  }, []);

  return (
    <section className="navbar">
      <a href="/dashboard" className="navbar-item">
        <FaHome className="fa-bell" />
      </a>
      <div ref={dropdownRef}>
        <a className="navbar-item" style={{ cursor: 'pointer' }}>
          <FaBell className="fa-bell" />
        </a>
      </div>
        <NotifyBtn
          toggleNotifications={toggleNotifications}
          notificationCount={notifications.length}
          isOpen={showNotifications}
          notifications={notifications.sort((a, b) => new Date(b.deliveredTime) - new Date(a.deliveredTime))}
        />


      <a href="/signout" className="navbar-item">
        <FaSignOutAlt className="fa-sign-out-alt" />
      </a>

      <a href="/signout" className="navbar-item">
        <div className="profile-icon-container">
          <IoPersonOutline className="fa-sign-out-alt" />
        </div>
      </a>
    </section>
  );
}

export default Navbar;
