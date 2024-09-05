import React, { useEffect, useState } from 'react'
import Topbar from '../common/topbar/Topbar'
import Searchbar from '../DisplayAppointment/Searchbar'
import RowTable from '../DisplayAppointment/RowTable'
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import "./DisplayScheduled";
// import { useHistory } from 'react-router-dom';
function DisplayScheduled() {

    const navigate = useNavigate();

    const [appointments,setAppointments]=useState([]);

    // const handleClick = () => {
      
    //   history.push({
    //     pathname: '/child',
    //     state: { dataObject: dataObject }
    //   });
    // };

    useEffect(()=>{
        (async () => await Load())();
    
    },[]);
    async function Load()
    {
        const result = await axios.get(
            "http://api.innobot.dulanga.com/api/innobothealth/appointment/all-appointments");
            setAppointments(result.data);
            console.log(result.data);
        
    }
    // async function update(event){
    //     event.preventDefault();
    //     try{
    //         await axios.put("http://api.innobot.dulanga.com/api/innobothealth/appointment/update" + appointmentId,
    //         {
                
    //             firstname : firstname,
    //             lastname  : lastname,
    //             special_message : special_message,
    //             member_id : member_id,
    //             date  : date,
    //             doctors_specialization: doctors_specialization,
    //             doctor_id  : doctor_id,
    //             phone_number  : phone_number,
    //             mail  : mail
    //         }
    //     );
    //     alert("Appointment Updated");
    //     setAppointmentId("")
    //     setFirstname("");
	// 	setLastname("");
	// 	setSpecialMessage("");
	// 	setMemberId("");
	// 	setDate("");
	// 	setDoctorsSpecialization("");
	// 	setDoctorId("");
	// 	setPhoneNumber("");
	// 	setMail("");
    //     Load();
           
    //     }catch(err){
    //         alert("Appointment Updating failed");
    //     }
    // }
    // async function editAppointment(appointment)
    // {
    //     setFirstname(appointments.firstname);
	// 	setLastname(appointments.lastname);
	// 	setSpecialMessage(appointments.special_message);
	// 	setMemberId(appointments.member_id);
	// 	setDate(appointments.date);
	// 	setDoctorsSpecialization(appointments.doctors_specialization);
	// 	setDoctorId(appointments.doctor_id);
	// 	setPhoneNumber(appointments.phone_number);
	// 	setMail(appointments.mail);
    //     setAppointmentId(appointments._id);
    //     //set the correct id here
    // }
    async function DeleteAppointment(appointmentId) {
      try {
          await axios.delete("http://api.innobot.dulanga.com/api/innobothealth/appointment/delete/" + appointmentId);
          alert("Appointment Successfully Deleted");
          Load();
      } catch (error) {
          console.error("Error deleting appointment:", error);
          alert("Failed to delete appointment. Please try again later.");
      }
  }
  
  return (
    <div>
        <Topbar/>
        <Searchbar/>
        <RowTable/>


        <div className="overflow-x-auto">
        <table className="border-collapse border border-gray-800 mt-10 text-black table-auto w-full">
          <thead>
            <tr className="bg-blue-grey">
              <th className="border border-gray-300 p-4">Firstname</th>
              <th className="border border-gray-300 p-4">Lastname</th>
              <th className="border border-gray-300 p-4">Special Message</th>
              <th className="border border-gray-300 p-4">Member ID</th>
              <th className="border border-gray-300 p-4">Date</th>
              <th className="border border-gray-300 p-4">Doctor's Specialization</th>
              <th className="border border-gray-300 p-4">Doctor ID</th>
              <th className="border border-gray-300 p-4">Phone Number</th>
              <th className="border border-gray-300 p-4">Mail</th>
              <th className="border border-gray-300 p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map(appointment => (
              <tr key={appointment.id}>
                <td className="border border-gray-300 p-4">{appointment.firstname}</td>
                <td className="border border-gray-300 p-4">{appointment.lastname}</td>
                <td className="border border-gray-300 p-4">{appointment.special_message}</td>
                <td className="border border-gray-300 p-4">{appointment.member_id}</td>
                <td className="border border-gray-300 p-4">{appointment.date}</td>
                <td className="border border-gray-300 p-4">{appointment.doctors_specialization}</td>
                <td className="border border-gray-300 p-4">{appointment.doctor_id}</td>
                <td className="border border-gray-300 p-4">{appointment.phone_number}</td>
                <td className="border border-gray-300 p-4">{appointment.mail}</td>
                <td className="border border-gray-300 p-4">
                <button 
                          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-9"
                          type="button" 
                          onClick={event => navigate('/updateapp', { state: { data: appointment } })}
                > 
                Edit
                </button>
                <button 
                          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                          type="button" 
                          onClick={() => DeleteAppointment(appointment.appointmentId)}
                 >
                Delete
                </button>
                   

                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default DisplayScheduled
