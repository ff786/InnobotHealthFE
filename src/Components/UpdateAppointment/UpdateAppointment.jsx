import React, { useEffect } from 'react';
import Topbar from '../common/topbar/Topbar';
import './UpdateAppointment.css';
import { useState } from 'react';
import axios from 'axios';
import Sidebar from '../common/sidebar/Sidebar';
import { useLocation } from 'react-router-dom';


function UpdateAppointment() {
  const location = useLocation();
  const receivedData = location.state?.data;
  const [appointmentId, setAppointmentId] = useState('');
//   const [formSubmitted, setFormSubmitted] = useState(false);


  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [special_message, setSpecialMessage] = useState('');
  const [member_id, setMemberId] = useState('');
  const [date, setDate] = useState('');
  const [doctors_specialization, setDoctorsSpecialization] = useState('');
  const [doctor_id, setDoctorId] = useState('');
  const [phone_number, setPhoneNumber] = useState('');
  const [mail, setMail] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [mailError, setMailError] = useState('');

  useEffect(() => {
    if (receivedData) {
	  setAppointmentId(receivedData.appointmentId || '');
      setFirstname(receivedData.firstname || '');
      setLastname(receivedData.lastname || '');
      setSpecialMessage(receivedData.special_message || '');
      setMemberId(receivedData.member_id || '');
      setDate(receivedData.date || '');
      setDoctorsSpecialization(receivedData.doctors_specialization || '');
      setDoctorId(receivedData.doctor_id || '');
      setPhoneNumber(receivedData.phone_number || '');
      setMail(receivedData.mail || '');
    }
  }, [receivedData]);

  const validatePhoneNumber = (phoneNumber) => {
	const phoneRegex = /^[0-9]{10}$/;
	if (!phoneRegex.test(phoneNumber)) {
	  setPhoneError('Phone number must be 10 digits.');
	  return false;
	}
	setPhoneError('');
	return true;
  };

  const validateEmail = (email) => {
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	if (!emailRegex.test(email)) {
	  setMailError('Invalid email address.');
	  return false;
	}
	setMailError('');
	return true;
  };

  const update = async (event) => {
	event.preventDefault();
    const isPhoneValid = validatePhoneNumber(phone_number);
    const isEmailValid = validateEmail(mail);
    
    if (!isPhoneValid || !isEmailValid) return;
  
    // if (!validateForm()) return;

    try {
      await axios.put(
        `http://api.innobot.dulanga.com/api/innobothealth/appointment/update/${appointmentId}`,
        {
          firstname: firstname,
          lastname: lastname,
          special_message: special_message,
          member_id: member_id,
          date: date,
          doctors_specialization: doctors_specialization,
          doctor_id: doctor_id,
          phone_number: phone_number,
          mail: mail,
        }

      );
      alert('Appointment Updated');
      setAppointmentId('');
      setFirstname('');
      setLastname('');
      setSpecialMessage('');
      setMemberId('');
      setDate('');
      setDoctorsSpecialization('');
      setDoctorId('');
      setPhoneNumber('');
      setMail('');
      Load();
	  
    } catch (err) {
      alert('Appointment Updating failed');
    }
  };

  return (
    <div>
      <Topbar />

      <div className="alignthedisplay">
        <div className="tofit_content" style={{ width: 'fit-content' }}>
          <Sidebar />
        </div>

        <div className="tofit_content">
          <div className="fix_the_position">
            <form className="w-full border border-gray-300 bg-dark-purple p-6 rounded">
              <div>
                <h3 className="text-white w-full  px-3 mb-6 md:mb-0 size-12 ">
                  Appointment Update Scheduling
                </h3>
              </div>

              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                  <label
                    className="block uppercase  tracking-wide text-white text-xs font-normal mb-2"
                    htmlFor="grid-first-name"
                  >
                    First Name
                  </label>
                  <input
                    className="appearance-none block w-full bg-light-white text-black border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                    id="firstname"
                    type="text"
                    placeholder="Enter Your First Name"
                    value={firstname}
                    onChange={(event) => {
                      setFirstname(event.target.value);
                    }}
                  />
                  {/* {error && <p className="text-red-500 text-xs italic">{error}</p>} */}
                </div>
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0 ">
                  <label
                    className="block uppercase tracking-wide text-white text-xs font-normal mb-2"
                    htmlFor="grid-last-name"
                  >
                    Last Name
                  </label>
                  <input
                    className="appearance-none block w-full bg-light-white text-black border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                    id="lastname"
                    type="text"
                    placeholder="Enter Your Last Name"
                    value={lastname}
                    onChange={(event) => {
                      setLastname(event.target.value);
                    }}
                  />
                </div>

                <div className="w-full  px-3">
                  <label
                    className="block uppercase  tracking-wide text-white text-xs font-normal mb-2"
                    htmlFor="grid-last-name"
                  >
                    Special Message
                  </label>
                  <input
                    className="appearance-none block w-full bg-light-white text-black border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                    id="special_message"
                    type="text"
                    placeholder="Any special messages for us to know"
                    value={special_message}
                    onChange={(event) => {
                      setSpecialMessage(event.target.value);
                    }}
                  />
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full md:w-1/2 px-3">
                  <label
                    className="block uppercase tracking-wide text-white text-xs font-normal mb-2"
                    htmlFor="grid-last-name"
                  >
                    Add a Member ID
                  </label>
                  <input
                    className="appearance-none block w-full bg-light-white text-black border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                    id="member_id"
                    type="text"
                    placeholder="member id"
                    value={member_id}
                    onChange={(event) => {
                      setMemberId(event.target.value);
                    }}
                  />
                </div>

                <div className="w-full md:w-1/2 px-3">
                  <label
                    className="block uppercase tracking-wide text-white text-xs font-normal mb-2"
                    htmlFor="grid-date"
                  >
                    Select Date
                  </label>
                  <input
                    className="appearance-none block w-full bg-light-white text-white  border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                    id="date"
                    type="date"
                    value={date}
                    onChange={(event) => {
                      setDate(event.target.value);
                    }}
                  />
                </div>
              </div>

              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full md:w-1/2 px-3">
                  <label
                    className="block uppercase tracking-wide text-white text-xs font-normal mb-2"
                    htmlFor="grid-state"
                  >
                    Doctors Specialization
                  </label>
                  <div className="relative">
                    <select
                      className="block appearance-none w-4/5 bg-light-white border border-gray-200 text-white py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="doctors_specialization"
                      value={doctors_specialization}
                      onChange={(event) => {
                        setDoctorsSpecialization(event.target.value);
                      }}
                    >
                      <option value="" disabled selected hidden>
                        Select a Healthcare Sector
                      </option>
                      <option className="text-black">Dieticians</option>
                      <option className="text-black">Neurologist</option>
                      <option className="text-black">Dermatologis</option>
                      <option className="text-black">Cardiologists</option>
                      <option className="text-black">Dentists</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full md:w-1/2 px-3">
                  <label
                    className="block uppercase tracking-wide text-white text-xs font-normal mb-2"
                    htmlFor="grid-last-name"
                  >
                    Add a Doctor id
                  </label>
                  <input
                    className="appearance-none block w-full  bg-light-white text-black border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="doctor_id"
                    type="text"
                    placeholder="abc123"
                    value={doctor_id}
                    onChange={(event) => {
                      setDoctorId(event.target.value);
                    }}
                  />
                </div>
              </div>

              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full md:w-1/2 px-3">
                  <label
                    className="block uppercase tracking-wide text-white text-xs font-normal mb-2"
                    htmlFor="grid-last-name"
                  >
                    Phone Number
                  </label>
                  <input
                    className="appearance-none block w-full  bg-light-white text-black border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="phone_number"
                    type="text"
                    placeholder="0**********"
                    value={phone_number}
                    onChange={(event) => {
                      setPhoneNumber(event.target.value);
                    }}
                  />
				  {phoneError && <p className="text-red-500 text-xs italic">{phoneError}</p>}
				  {/* {error && <p className="text-red-500 text-xs italic">{error}</p>} */}
				  {/* {formSubmitted && error && (
            <p className="text-red-500 text-xs italic">
                {error}
            </p>
        )} */}
                </div>
                <div className="w-full md:w-1/2 px-3">
                  <label
                    className="block uppercase tracking-wide text-white text-xs font-normal mb-2"
                    htmlFor="grid-last-name"
                  >
                    Email
                  </label>
                  <input
                    className="appearance-none block w-full  bg-light-white text-black border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="mail"
                    type="email"
                    placeholder="@gmail.com"
                    value={mail}
                    onChange={(event) => {
                      setMail(event.target.value);
                    }}
                  />
				  	{mailError && <p className="text-red-500 text-xs italic">{mailError}</p>}
				  {/* {formSubmitted && error && (
            <p className="text-red-500 text-xs italic">
                {error}
            </p>
        )} */}
                </div>
              </div>

              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full px-3 flex items-center justify-center">
                  <input
                    type="submit"
                    className="bg-light-white hover:bg-blue-violet text-white font-normal py-2 px-4 rounded-full focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
                    value="Update Appointment"
                    onClick={update}
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="button_placing_to-the_middle">
        <button className="bg-blue-violet hover:bg-black text-white font-normal py-2 px-4 rounded-full focus:outline-none focus:shadow-outline-blue active:bg-blue-800">
          Check Eligibility for Insurance
        </button>
      </div>
    </div>
  );
}

export default UpdateAppointment;
