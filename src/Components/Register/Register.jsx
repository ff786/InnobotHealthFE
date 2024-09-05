import React from 'react'
import './Register.css' 
import '../../App.css'
import video from '../../LoginAssets/video.mp4'
import logo from '../../LoginAssets/logo.png'
import { FaUserShield } from 'react-icons/fa';
import { BsFillShieldLockFill } from 'react-icons/bs';
import { AiOutlineSwapRight } from 'react-icons/ai'; 
import { MdEmail } from "react-icons/md";

import { Link } from 'react-router-dom'; 



const Register = () => {
  return (
    <div className='registerPage flex'>
      <div className="container flex">
        
        <div className="videoDiv">
          <video autoPlay muted src={video} ></video>

          <div className="textDiv">
          </div>
          <div className='footerDiv flex'>
            <span className='text'>Have an account?</span>
            <Link to={'/'}>
              <button className='btn'>Login</button>
            </Link>
          </div>
        </div>
  
        <div className="formDiv flex">
          <div className="headerDiv">
            <img src={logo} alt='logo' className='mx-auto' />
            <h3>Let Us Know You</h3>
          </div>

          <form action="" className='form grid'>
           {/* <span className='showMessage'>Login Status will go here</span>*/} 
           <div className="inputDiv">
              <label htmlFor="email">Email Adress</label>
              <div className="input flex">
                <MdEmail className='icon'></MdEmail>
                <input type="text" id='username' placeholder='Enter your Email' />
              </div>
            </div>
            <div className="inputDiv">
              <label htmlFor="username">Username</label>
              <div className="input flex">
                <FaUserShield className='icon'></FaUserShield>
                <input type="text" id='username' placeholder='Enter username' />
              </div>
            </div>
            <div className="inputDiv">
              <label htmlFor="password">Password</label>
              <div className="input flex">
                <BsFillShieldLockFill className='icon' />
                <input type='password' id='Password' placeholder='Enter Password' />
              </div>
            </div>
            <button type='submit' className='btn flex'>
              <span>Register</span>
              <AiOutlineSwapRight className='icon' />
            </button>

           

          </form>
        </div>

      </div>
    </div>
  )
}

export default  Register