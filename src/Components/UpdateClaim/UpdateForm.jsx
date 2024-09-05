import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Topbar from '../common/topbar/Topbar.jsx';
import SideNav from '../common/SideNav/sideNav.jsx';
import video from '../../LoginAssets/video.mp4';
import './UpdateForm.css';
import { useParams } from 'react-router-dom';

import { Link } from 'react-router-dom'

const UpdateForm = () => {
  const [memberId, setMemberId] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [treatmentDate, setTreatmentDate] = useState('');
  const [amount, setAmount] = useState('');
  const [receipt, setReceipt] = useState('');
  const { id } = useParams();

  const [updateClaims, setUpdateClaims] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://api.innobot.dulanga.com/api/innobothealth/claim/getAll?id');
        const member = response.data[0];
          setMemberId(member.memberId);
          setFirstName(member.firstName);
          setLastName(member.lastName);
          setPhoneNumber(member.phoneNumber);
          setEmail(member.email);
          setTreatmentDate(member.treatmentDate);
          setAmount(member.amount);
          setReceipt(member.receipt);

      } catch (error) {
        console.error('Error fetching data:', error);
        }
    };
    fetchData();
  }, [id]);

    const handleUpdate = async (event) => {
      event.preventDefault();

      const formattedDate = new Date(treatmentDate).toISOString().split('T')[0];

      const update = document.getElementById('updateForm');
      event.preventDefault();
          try {
            const formData = new FormData();
            formData.append('memberId', memberId);
            formData.append('firstName', firstName);
            formData.append('lastName', lastName);
            formData.append('phoneNumber', phoneNumber);
            formData.append('email', email);
            formData.append('treatmentDate', formattedDate);
            formData.append('amount', amount);
            formData.append('receipt',receipt);

            await axios.put(`http://api.innobot.dulanga.com/api/innobothealth/claim/update/${id}`,

            formData,
            {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            }
            );
            alert('Claim updated successfully');
          } catch (error) {
            console.error('Error updating claim:', error);
            alert('Error updating claim');
          }

    };

  return (
    <body>
      <div>
        <Topbar />
      </div>

      <div className="main-body">
        <div>
          <SideNav />
        </div>
        <div className="video-anime">
          <div>
            <video autoPlay muted loop src={video}></video>
          </div>
        </div>
        <form name="updateForm" id="updateForm" onSubmit={handleUpdate}>
        <div>
          <div className="top-bar">
            <h5 className="h5">Patient Information</h5>
          </div>

          <div className="bar1">
            <div className="devb">
              <label>Member ID:</label>
              <div>
                <input
                  style={{background: '#DCDADA'}}
                  type="text"
                  value={memberId}
                  onChange={(event) => setMemberId(event.target.value)}
                  readOnly
                />
              </div>
            </div>
            <div className="devb">
              <label>First Name:</label>
              <div>
                <input
                  type="text"
                  value={firstName}
                  onChange={(event) => setFirstName(event.target.value)}
                />
              </div>
            </div>
            <div className="devb">
              <label>Last Name:</label>
              <div>
                <input
                  type="text"
                  value={lastName}
                  onChange={(event) => setLastName(event.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="bar2">
            <div className="devb">
              <label>Phone Number:</label>
              <input
                type="tel"
                value={phoneNumber}
                onChange={(event) => setPhoneNumber(event.target.value)}
              />
            </div>
          </div>
          <div className="bar2">
            <div className="devb">
              <label>Email:</label>
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>
          </div>
          <div className="bar2">
            <div className="devb">
              <label>Treatment Date:</label>
              <input
                type="date"
                value={treatmentDate}
                onChange={(event) => setTreatmentDate(event.target.value)}
              />
            </div>
          </div>
          <div className="bar2">
            <div className="devb">
              <label>Amount:</label>
              <input
                type="number"
                value={amount}
                onChange={(event) => setAmount(event.target.value)}
              />
            </div>
          </div>
          <div className="bar2">
            <div className="devb">
              <label>Upload Receipt:</label>
              <input
                type="file"
                onChange={(event) => setReceipt(event.target.files[0])} />
            </div>
          </div>

          <div className="button-up">
            <button type="cancel">Cancel</button>
            <button type="submit">Update Claim</button>
          </div>
        </div>
        </form>
      </div>
    </body>
  );
};

export default UpdateForm;
