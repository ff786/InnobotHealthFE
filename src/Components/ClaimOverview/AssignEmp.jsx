import React, { useState, useEffect } from 'react';
import Topbar from '../common/topbar/Topbar.jsx'
import SideNav from '../common/SideNav/sideNav.jsx'
import axios from 'axios';

function AssignEmp() {

    const [members, setMembers] = useState([]);

    useEffect(() => {
        /* if (!sessionStorage.getItem("access_token")) {
          navigate("/");
        } */
        // Fetch data from backend when component mounts
        axios.get('http://api.innobot.dulanga.com/api/innobothealth/claim/getAll')
            .then(response => {
                setMembers(response.data);
            })
            .catch(error => {
                console.error('Error fetching members:', error);
            });
    }, []);

    return (
     <div>
      {members.map(member => (
        <div className="bg-white bg-opacity-20 shadow rounded-lg p-6 w-1/2">
            <div className="grid grid-cols-2 gap-6 mb-6">
                <div key={member.memberId}>
                    <div className="mb-4"><strong>Member ID:</strong>{member.memberId}</div>
                    <div className="mb-4"><strong>Full Name:</strong> {member.lastName}, {member.firstName}</div>
                    <div className="mb-4"><strong>Claim Type:</strong> {member.claimType}</div>
                    <div className="mb-4"><strong>Gender:</strong>{member.gender}</div>
                    <div className="mb-4"><strong>Phone Number:</strong>{member.phoneNumber}</div>
                    <div className="mb-4"><strong>Email:</strong>{member.email}</div>
                </div>
                <div>
                    <label htmlFor="employee" className="block mb-2">Assign Employee</label>
                    <select id="employee" className="block w-full mb-4 p-2 border border-zinc-300 rounded">
                        <option>Select Employee</option>
                    </select>
                    <button className="bg-blue-500 w-full text-white px-4 py-2 rounded">Assign Employee</button>
                </div>
            </div>
            <div className="border-t pt-4">
                <h3 className="mb-4 font-bold">Assigned Employees</h3>
                <div>Zaqwan Zulficar</div>
                <button className="bg-red-500 mt-4 text-white px-4 py-2 rounded">Revoke</button>
            </div>
        </div>
      ))}
     </div>
    )
}

export default AssignEmp;
