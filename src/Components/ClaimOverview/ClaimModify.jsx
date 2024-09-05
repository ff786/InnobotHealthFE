import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import UpdateForm from '../UpdateClaim/UpdateForm.jsx'

import Table from 'react-bootstrap/Table';

function ClaimModify({ searchQuery }) {

    const [members, setMembers] = useState([]);
    const navigate = useNavigate();

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

    const handleDelete = (id) => {
      // Delete claim by id
      axios.delete(`http://api.innobot.dulanga.com/api/innobothealth/claim/delete?id=${id}`)
        .then(response => {
          console.log(response.data);
          // Update state to remove the deleted claim
          setMembers(members.filter(member => member.id !== id));
        })
        .catch(error => {
          console.error('Error deleting claim:', error);
        });
    };
    const filteredMembers = members.filter(member => {
        const search = searchQuery ? searchQuery.toLowerCase() : ''; // Null check on searchQuery
        return (
            (member.memberId && member.memberId.toLowerCase().includes(search)) ||
            ((member.lastName && member.firstName) && (member.lastName.toLowerCase() + ', ' + member.firstName.toLowerCase()).includes(search)) ||
            (member.phoneNumber && member.phoneNumber.includes(search)) ||
            (member.email && member.email.toLowerCase().includes(search)) ||
            (member.approved ? 'Approved' : 'Pending').toLowerCase().includes(search)
        );
    });


  return (
     <div className="container mx-fill p-4 bg-white dark:bg-zinc-500 w-auto">
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white dark:bg-zinc-800">
              <thead>
                <tr className="w-full h-16 border-text-white dark:border-zinc-200 border-b py-8">
                  <th className="text-left pl-8 pr-6 text-xs font-medium text-zinc-600 dark:text-white uppercase tracking-wider">
                    Member ID
                  </th>
                  <th className="text-left px-6 text-xs font-medium text-zinc-600 dark:text-white uppercase tracking-wider">
                    Claim Type
                  </th>
                  <th className="text-left px-6 text-xs font-medium text-zinc-600 dark:text-white uppercase tracking-wider">
                    LastName, FirstName
                  </th>
                  <th className="text-left px-6 text-xs font-medium text-zinc-600 dark:text-white uppercase tracking-wider">
                    Gender
                  </th>
                  <th className="text-left px-6 text-xs font-medium text-zinc-600 dark:text-white uppercase tracking-wider">
                    Phone Number
                  </th>
                  <th className="text-left px-6 text-xs font-medium text-zinc-600 dark:text-white uppercase tracking-wider">
                    Email
                  </th>
                  <th className="text-left px-6 text-xs font-medium text-zinc-600 dark:text-white uppercase tracking-wider">
                    Status
                  </th>
                  <th className="text-left px-6 text-xs font-medium text-zinc-600 dark:text-white uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:text-white">
                  {filteredMembers.map(member => (
                    <tr key={member.id} className="text-zinc-700 dark:text-black">
                      <td className="px-8 py-4 whitespace-no-wrap border-b border-text-black dark:border-zinc-200">
                        {member.memberId}
                      </td>
                      <td className="px-8 py-4 whitespace-no-wrap border-b border-text-black dark:border-zinc-200">
                        {member.claimType}
                      </td>
                      <td className="px-6 py-4 whitespace-no-wrap border-b border-text-black dark:border-zinc-200">
                        {member.lastName}, {member.firstName}
                      </td>
                      <td className="px-6 py-4 whitespace-no-wrap border-b border-text-black dark:border-zinc-200">
                        {member.gender}
                      </td>
                      <td className="px-6 py-4 whitespace-no-wrap border-b border-text-black dark:border-zinc-200">
                        {member.phoneNumber}
                      </td>
                      <td className="px-6 py-4 whitespace-no-wrap border-b border-text-black dark:border-zinc-200">
                        {member.email}
                      </td>
                      <td className="px-6 py-4 whitespace-no-wrap border-b border-text-black dark:border-zinc-200">
                        {member.approved ? 'Approved' : 'Pending'}
                      </td>
                  <td className="px-6 py-4 whitespace-no-wrap border-b border-text-black dark:border-zinc-200">
                    <div className="flex items-center">
                      <Link to={`/edit/${member.id}`} className="bg-zinc-600 hover:bg-white-600 text-white font-bold py-2 px-4 rounded">
                        Edit
                      </Link>
                      <button onClick={() => handleDelete(member.id)} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded ml-5">
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
  );
}

export default ClaimModify;
