import React, { useState, useEffect, useRef } from 'react'
import './ClaimForm.css'
import Topbar from '../common/topbar/Topbar.jsx'
import {useNavigate} from "react-router-dom"
import axios from 'axios';
import {toast} from "react-toastify"
import ConfirmModal from "../ClaimOverview/ConfirmModal.jsx"
import Popup from "reactjs-popup";

import { Link } from 'react-router-dom'

const FORM = () => {

  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  const [memberId, setMemberId] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [gender, setGender] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [isClaimCoveredByAnotherInsurance, setIsClaimCoveredByAnotherInsurance] = useState(false);
  const [isClaimRelatedToAnAccident, setIsClaimRelatedToAnAccident] = useState(false);
  const [amountLKR, setAmountLKR] = useState('');
  const [dateOfClaim, setDateOfClaim] = useState('');
  const [diagnosis, setDiagnosis] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const formRef = useRef(null);

  const isValidPhoneNumber = (phoneNumber) => {
    return /^\d{10}$/.test(phoneNumber);
  };
  const isValidAmount = (amount) => {
    return parseFloat(amount) > 0;
  };
  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async (event) => {
      event.preventDefault();

      if (!memberId || !firstName || !lastName || !dateOfBirth || !phoneNumber || !phoneNumber || !amountLKR ) {
        alert('Please fill in all the fields');
        return;
      }
      // Validate email
      if (!isValidEmail(email)) {
        alert('Please enter a valid email address');
        return;
      }
      // Validate phone number
      if (!isValidPhoneNumber(phoneNumber)) {
         alert('Please enter a valid phone number');
        return;
      }
      // Validate amount
      if (!isValidAmount(amountLKR)) {
        alert('Please enter a valid amount');
        return;
      }
      // Validate checkbox
      if (!isChecked) {
      alert("Please agree to the terms and conditions");
      return;
      }
      if (new Date(dateOfClaim) < new Date(dateOfBirth)) {
        alert('Error: Claim date cannot be before date of Birth.');
        return;
      }

      const form = document.getElementById('claimForm');
      event.preventDefault();
      const formData = new FormData(form);
          // Send the form data as a POST request using fetch
      try {
        const response = await fetch('http://api.innobot.dulanga.com/api/innobothealth/claim/create', {
          method: 'POST',
          header: {
            'Accept': 'application/json'
          },
          body: formData,
        });
          if (response.ok) {
              setIsConfirmModalOpen(true);
              formRef.current.reset();
          } else {
            console.error('Failed to submit form');
          }

      }
      catch (error) {
          console.error('Error uploading image:', error);
          alert('Failed to Submit Form, Please try again later!');
      }
  }

  return (

    <body>
     <div>
      <form name="claimForm" id="claimForm" ref={formRef} onSubmit={handleSubmit}>
        <div className="claim-form-container">
          <div className="claim-form">

            <div className="form-row" >
             <div className="devb">
              <label>
                Member ID:</label>
                <div>
                <input type="text" name="memberId" value={memberId} onChange={(event) => setMemberId(event.target.value)} placeholder="Member ID"/>
                </div>
             </div>

             <div style={{width: '800px', marginLeft: '50px'}}>
             <input type="checkbox" checked={isChecked} onChange={() => setIsChecked(!isChecked)} />
                <label>I, the undersigned hereby declare that the information on below is true and complete and that reimbursement requested is for expenses made on me for the treatment of my medical condition.
                </label>
             </div>
            <div style={{gap: '10px', marginRight: '15px', padding: "10px"}}>
              <button type="cancel">Clear</button>
              <button type="submit" onSubmit={handleSubmit} >Submit</button>
            </div>
            </div>
            </div>
            <div className="form-side">
             <div className="form-section">
              <div className="devb">
                <label>
                Claim Type:</label>
                <select name="claimType">
                    <option value="">Select</option>
                    <option value="Cashless">Cashless</option>
                    <option value="reimbursement">Reimbursement</option>
                    </select>
              </div>
            <div style={{display: 'flex', flexDirection: 'row'}}>
                <div className="devb">
                <label>
                  First Name:</label>
                  <div>
                      <input type="text" name="firstName" value={firstName} onChange={(event) => setFirstName(event.target.value)} placeholder="First Name" />
                  </div>
                </div>
                <div className="devb" style={{marginLeft: 'auto', marginRight: 'auto'}}>
                <label>
                  Last Name:</label>
                <div>
                    <input type="text" name="lastName" value={lastName} onChange={(event) => setLastName(event.target.value)} placeholder="Last Name" />
                </div>
                </div>
            </div>


              <div className="devb">
                <label>
                  Date of Birth:</label>
                  <input type="date" name="dob" value={dateOfBirth} onChange={(event) => setDateOfBirth(event.target.value)} />

              </div>
              <div className="devb">
                <label>
                  Gender:</label>
                  <select name="gender" value={gender} onChange={(event) => setGender(event.target.value)}>
                    <option value="" >Select</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>

              </div>
              <div className="devb">
                <label>
                  Phone Number:</label>
                  <input type="tel" name="phoneNumber" value={phoneNumber} onChange={(event) => setPhoneNumber(event.target.value)} placeholder="+94 (0)## ### ####"/>

              </div>
              <div className="devb">
                <label>
                  Email:</label>
                  <input type="email" name="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Enter your Email"/>

              </div>
             </div>

              <div className="form-section-2">
              <div className="devb">
                <label>
                  Is the Claim covered by another Insurance:</label>
                  <select value={isClaimCoveredByAnotherInsurance} onChange={(event) => setIsClaimCoveredByAnotherInsurance(event.target.value === 'true')}>
                    <option value={true}>Yes</option>
                    <option value={false}>No</option>
                  </select>

              </div>
              <div className="devb">
                <label>
                  Is the Claim (partially) related to an accident:</label>
                  <select value={isClaimRelatedToAnAccident} onChange={(event) => setIsClaimRelatedToAnAccident(event.target.value === 'true')}>
                    <option value={true}>Yes</option>
                    <option value={false}>No</option>
                    <option value={true}>Work Related</option>
                  </select>

              </div>
              <div className="devb">
                <label>
                  Amount LKR:</label>
                  <input type="number" name="amount" value={amountLKR} onChange={(event) => setAmountLKR(event.target.value)}  placeholder="Amount"/>

              </div>
              <div className="devb">
                <label>
                  Diagnosis:</label>
                  <select name="diagnosisId" value={diagnosis} onChange={(event) => setDiagnosis(event.target.value)}>
                    <option value="">Select</option>
                    <option value="Broken Bone">Broken Bone</option>
                    <option value="Flu">Flu</option>
                    <option value="Fracture">Fracture</option>
                    <option value="Sprain">Sprain</option>
                  </select>

              </div>
              <div className="devb">
                <label>
                  Date:</label>
                  <input type="date" name="treatmentDate" value={dateOfClaim} onChange={(event) => setDateOfClaim(event.target.value)} />

              </div>
              <div className="devb">
                <label>Upload Receipt:</label>
                  <input type="file" name="receipt" onChange={(event) => setImageUrl(event.target.value)} />
              </div>
              </div>
              </div>
           </div>
           {isConfirmModalOpen && <ConfirmModal isOpen={isConfirmModalOpen} onClose={() => setIsConfirmModalOpen(false)} />}
        </form>
       </div>
      </body>

  );

 }

export default FORM;