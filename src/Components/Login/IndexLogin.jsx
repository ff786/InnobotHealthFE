import React, { useState, useEffect, useRef } from 'react';
import './Auth.css';
import '../../App.css';
import { FaUserShield } from 'react-icons/fa';
import { BsFillShieldLockFill } from 'react-icons/bs';
import { AiOutlineSwapRight } from 'react-icons/ai';
import logo from '../../LoginAssets/logo.png';
import worldwide_img from './worldwide_img.jpg';
import Login from './Login';
import FORM from '../ClaimManage/FORM.jsx';

import { Link, Navigate } from 'react-router-dom';

const Navbar = ({ scrolled, handleFormToggle }) => {
  const [logoHeight, setLogoHeight] = useState(true);
  const [logoWidth, setLogoWidth] = useState(true);
  const [navbarColor, setNavbarColor] = useState('transparent');


  const [isTryClaim, setIsTryClaim] = useState(true);

  useEffect(() => {
    if (scrolled) {
      setLogoHeight(70);
      setNavbarColor('#02072D');
    } else {
      setLogoHeight(85);
      setLogoWidth(100);
      setNavbarColor('transparent');
    }
  }, [scrolled]);

  return (
   <>
    <nav id="navbar" className={`fixed top-0 left-0 w-full bg-white shadow transition-all duration-300 z-50 p-sticky`} style={{ backgroundColor: navbarColor }}>
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 ">
        <div className="flex justify-space items-center py-4 md:justify-start md:space-x-20 w-full">
          <div className="flex justify-start lg:w-0 lg:flex-1 ">
            <a href="/">
              <img className="h-auto w-auto sm:h-10" src={logo} alt="Logo" style={{ height: logoHeight }} />
            </a>
          </div>
          <nav className="hidden md:flex space-x-10 p-10 ">
            <a href="https://innobothealth.com/" className="text-base font-bold text-white hover:text-purple-500">Home</a>
            <a href="https://innobothealth.com/about-us/" className="text-base font-bold text-white hover:text-purple-500">About Us</a>
            <a href="https://innobothealth.com/platform/" className="text-base font-bold text-white hover:text-purple-500">What We Do</a>
            <a href="https://innobothealth.com/blog/" className="text-base font-bold text-white hover:text-purple-500">Innobot Blog</a>
            <a href="https://innobothealth.com/contact-us/" className="text-base font-bold text-white hover:text-purple-500">Contact Us</a>
          </nav>

            <button onClick={() => {handleFormToggle(); scrollToForm();}} className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-950 hover:bg-purple-900">
              <span>{isTryClaim ? "Try Create Claim" : "Close"}</span>
            </button>
        </div>
      </div>
    </nav>
   </>
  );
};

const Main = ({ displayForm}) => {
    const formRef = useRef(null);
  return (
    <div ref={formRef}>
      <Login />
      {displayForm && <FORM />}
      {/* <div>
          <img className="h-auto w-auto" src={worldwide_img} alt="Logo" />
      </div> */}
    </div>
  );
};

const IndexLogin = () => {
  const [scrolled, setScrolled] = useState(false);
  const [displayForm, setDisplayForm] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 80 || document.documentElement.scrollTop > 80;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleFormToggle = () => {
    setDisplayForm(!displayForm);
  };

  const scrollToForm = () => {
    const formPosition = window.pageYOffset + formRef.current.getBoundingClientRect().top;
    window.scrollTo({ top: formPosition, behavior: 'smooth' });
  };

  return (
    <>
      <Navbar scrolled={scrolled} handleFormToggle={handleFormToggle}/>
      <Main displayForm={displayForm} />
    </>
  );
};

export default IndexLogin;
