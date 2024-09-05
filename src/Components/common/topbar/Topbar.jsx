import React from 'react';
import '../header/Header.css';
import logo from '../header/logo.png'
import { Navbar } from '../../common';
import Search from '../search/Search';


function Topbar() {
    return (
        <div className="top">
      
            <section className="header-top">
                {/* <div className="logo">
                     */}{/*<a href="/" className="header-logo">LOGO</a>*/}{/*
                        <img className="logo" src={logo} alt='logo'/>
                </div> */}
            <section className="header-top__navbar">
            
            <section className="header-top__navigation">
                <Navbar />
            </section>
            
            </section>
            </section>
        </div>
    );
}

export default Topbar
