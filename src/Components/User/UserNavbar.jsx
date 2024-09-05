import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './UserMenu.css';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
    return(
    <div>
    <nav className="navbar-Unique">
    <div className="navbar-brand-Unique" >
      <Link to="/UserMenu"><span className="navbar-brand-text-Unique"  >Menu</span></Link>
    </div>
    <button className="navbar-toggle-Unique" onClick={toggleMenu}>
      <i className={`fas ${isOpen ? 'fa-times-Unique' : 'fa-bars-Unique'}`}></i>
    </button>
    <div className={`navbar-menu-Unique ${isOpen ? 'active' : ''}`}>
      <ul className="navbar-list-Unique">
        <li>
          <Link to="/User">Staff Management</Link>
        </li>
    
        <li>
          <Link to="/staff">Staff Profile</Link>
        </li>
        <li>
          <Link to="/messages">Send Messages</Link>
        </li>
        <li>
          <Link to="/ActivityLog">Activity Logs</Link>
        </li>
      </ul>
    </div>
    </nav>
    </div>
    )
  };
  
  export default Navbar;

