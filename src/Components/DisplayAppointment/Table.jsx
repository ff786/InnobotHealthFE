import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Import axios

function Table() {
  const [doctors, setDoctors] = useState([]);
  // const [doctorAvailability,setAvailability]= useState([]);
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get("http://api.innobot.dulanga.com/api/innobothealth/doctor/list", {
          params: {
            date: "2024-04-19",
            specialization: "specialization"
          }
        });
        setDoctors(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData(); // Call the fetchData function
  }, []); // Empty dependency array to fetch data only once when the component mounts

  return (
    <div className="overflow-x-auto">
      <table className="border-collapse border border-gray-800 mt-10 text-black table-auto w-full">
        <thead>
          <tr className="bg-blue-grey">
            <th className="border border-gray-300 p-4">Doctor First Name</th>
            <th className="border border-gray-300 p-4">Doctor Last Name</th>
            <th className="border border-gray-300 p-4">Specialization</th>
            <th className="border border-gray-300 p-4">Availability from</th>
            <th className="border border-gray-300 p-4">Availability to</th>
            <th className="border border-gray-300 p-4">Select</th>
          </tr>
        </thead>
        <tbody>
          {doctors.map(doctor => (
            // <tr key={doctor.id}>
            //   <td className="border border-gray-300 p-4">{doctor.firstname}</td>
            //   <td className="border border-gray-300 p-4">{doctor.lastname}</td>
            //   <td className="border border-gray-300 p-4">{doctor.specialization}</td>
            //   <td className="border border-gray-300 p-4">{doctor.availability.from}</td>
            //   <td className="border border-gray-300 p-4">{doctor.availability.to}</td>
            //   <td className="border border-gray-300 p-4">Schedule Appointment</td>
            // </tr>
            
              <tr key={doctor.id}>
                <td className="border border-gray-300 p-4">{doctor.firstName}</td>
                <td className="border border-gray-300 p-4">{doctor.lastName}</td>
                <td className="border border-gray-300 p-4">{doctor.specialization}</td>
                <td className="border border-gray-300 p-4">{doctor ? doctor.availabilityFrom : ''}</td>
                <td className="border border-gray-300 p-4">{doctor? doctor.availabilityTo : ''}</td>
                <button className="bg-green-300 hover:bg-black text-white font-normal py-2 px-4 rounded-full focus:outline-none focus:shadow-outline-blue active:bg-blue-800 ml-20 mt-2">
                    Schedule Appointment
                </button>
              </tr>
            ))}
            
            
         
        </tbody>
      </table>
    </div>
  );
}

export default Table;
