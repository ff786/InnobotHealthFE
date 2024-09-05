import React, { useState, useEffect } from 'react'
import {useNavigate} from "react-router-dom"
import axios from 'axios';
import {toast} from "react-toastify"
import Table from 'react-bootstrap/Table';
import './ApprovalClaim.css'

import { Link } from 'react-router-dom'

const ApprovedClaim = ({ isOpen, onClose }) => {

  const [approvedClaims, setApprovedClaims] = useState([]);

    useEffect(() => {
      const fetchApprovedClaims = async () => {
        try {
          const response = await axios.get('http://api.innobot.dulanga.com/api/innobothealth/claim/getAll');
          // Filter out the claims where approved is false
          const filteredClaims = response.data.filter(claim => claim.approved);
          setApprovedClaims(filteredClaims);
        } catch (error) {
          console.error('Error fetching approved claims:', error);
          toast.error('Error fetching approved claims');
        }
      };

      fetchApprovedClaims();
    }, []);

  const handleCancel = () => {
    onClose();
  }

  return (
    <div className={`modal-overlay ${isOpen ? "open" : ''}`}>
       <div className="modal-content">
         <button className="text-zinc-600 hover:text-red-900" onClick={handleCancel}>
            <svg
             xmlns="http://www.w3.org/2000/svg"
             className="h-6 w-6"
             fill="none"
             viewBox="0 0 24 24"
             stroke="currentColor">
            <path
             strokeLinecap="round"
             strokeLinejoin="round"
             strokeWidth="4"
             d="M6 18L18 6M6 6l12 12"
             />
           </svg>
         </button>
         <div className="container mx-auto p-6 bg-white dark:bg-zinc-500">
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
                        Email
                      </th>
                      <th className="text-left px-6 text-xs font-medium text-zinc-600 dark:text-white uppercase tracking-wider">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:text-white">
                   {approvedClaims.map(claim => (
                    <tr key={claim.id} className="text-zinc-700 dark:text-black">
                      <td className="px-8 py-4 whitespace-no-wrap border-b border-text-black dark:border-zinc-200">
                        {claim.memberId}
                      </td>
                      <td className="px-6 py-4 whitespace-no-wrap border-b border-text-black dark:border-zinc-200">
                        {claim.claimType}
                      </td>
                      <td className="px-6 py-4 whitespace-no-wrap border-b border-text-black dark:border-zinc-200">
                        {claim.lastName}, {claim.firstName}
                      </td>
                      <td className="px-6 py-4 whitespace-no-wrap border-b border-text-black dark:border-zinc-200">
                        {claim.email}
                      </td>
                      <td className="px-6 py-4 whitespace-no-wrap border-b border-text-black dark:border-zinc-200">
                        {claim.approved ? 'Approved' : 'Pending'}
                      </td>
                    </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
           </div>
         </div>
  );
}

export default ApprovedClaim;
