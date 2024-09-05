import React, {useEffect, useState} from 'react';
import logo from '../common/header/logo.png'
import icon_prof from '../ClaimManage/icon_prof.png'
import notify from '../ClaimManage/notify.png'
import '../../App.css'
import '../ClaimManage/ClaimForm.css'
import SideNav from '../common/SideNav/sideNav.jsx'
import search from '../common/search/Search.jsx'
import '../PnD/Diagnosis.css'
import '../ClaimOverview/overView.css'
import Topbar from '../common/topbar/Topbar.jsx'


import { Link } from 'react-router-dom';
import axios from "axios";

function CodeModify({ searchQuery }) {

    const [members, setMembers] = useState([]);

    useEffect(() => {
        // Fetch data from backend when component mounts
        axios.get('http://api.innobot.dulanga.com/api/innobothealth/code/getAll')
            .then(response => {
                setMembers(response.data);
            })
            .catch(error => {
                console.error('Error fetching members:', error);
            });
    }, []);

    const handleDelete = (id) => {
        // Delete claim by id
        axios.delete(`http://api.innobot.dulanga.com/api/innobothealth/code/delete?id=${id}`)
            .then(response => {
                console.log(response.data);
                // Update state to remove the deleted claim
                setMembers(members.filter(member => member.id !== id));
            })
            .catch(error => {
                console.error('Error deleting code:', error);
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
        <body>
            <div>
                  <Topbar />
            </div>
            <div className="mid">
                <div>
                    <SideNav />
                </div>

                <div className="mid">
                    <div class="container mx-auto px-4">
                        <div class="flex justify-between items-center py-4">
                            <h1 class="text-2xl font-semibold">Procedure and Diagnosis codes</h1>
                            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                Add Code
                            </button>
                        </div>
                    <div class="flex justify-between mb-4">
                        <div class="flex gap-2 items-center">
                            <label>Show</label>
                            <select class="form-select block w-full mt-1 border-zinc-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md">
                                <option>10</option>
                                <option>20</option>
                                <option>50</option>
                            </select>
                            <label>entries</label>
                        </div>
                        <div>
                            <input type="text" placeholder="Search:" class="form-input block w-full mt-1 border-zinc-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md" />
                        </div>
                    </div>

                    <div class="overflow-x-auto bg-white rounded-lg shadow overflow-y-auto relative">
                        <table class="border-collapse table-auto w-full whitespace-no-wrap bg-white table-striped relative">
                            <thead>
                                <tr class="text-left">
                                    <th class="py-2 px-3 sticky top-0 border-b border-zinc-200 bg-zinc-100">Code</th>
                                    <th class="py-2 px-3 sticky top-0 border-b border-zinc-200 bg-zinc-100">Code Type</th>
                                    <th class="py-2 px-3 sticky top-0 border-b border-zinc-200 bg-zinc-100">Title</th>
                                    <th class="py-2 px-3 sticky top-0 border-b border-zinc-200 bg-zinc-100">Description</th>
                                    <th class="py-2 px-3 sticky top-0 border-b border-zinc-200 bg-zinc-100">Action</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white dark:text-white">
                            {filteredMembers.map(member => (
                                <tr key={member.id} className="text-zinc-700 dark:text-black">
                                    <td className="px-8 py-4 whitespace-no-wrap border-b border-text-black dark:border-zinc-200">
                                        {member.memberId}
                                    </td>
                                    <td className="px-8 py-4 whitespace-no-wrap border-b border-text-black dark:border-zinc-200">
                                        {member.codeType}
                                    </td>
                                    <td className="px-6 py-4 whitespace-no-wrap border-b border-text-black dark:border-zinc-200">
                                        {member.codeName}
                                    </td>
                                    <td className="px-6 py-4 whitespace-no-wrap border-b border-text-black dark:border-zinc-200">
                                        {member.codeTitle}
                                    </td>
                                    <td className="px-6 py-4 whitespace-no-wrap border-b border-text-black dark:border-zinc-200">
                                        {member.description}
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

                    <div class="flex justify-between items-center py-4">
                        <span>Showing 1 to 2 of 2 entries</span>
                        <div class="inline-flex">
                            <button class="text-sm bg-zinc-300 hover:bg-zinc-400 text-zinc-800 font-semibold py-2 px-4 rounded-l">
                                Previous
                            </button>
                            <button class="text-sm bg-zinc-300 hover:bg-zinc-400 text-zinc-800 font-semibold py-2 px-4 rounded-r">
                                Next
                            </button>
                        </div>
                    </div>
                    </div>

                </div>

            </div>
        </body>

    );
}

export default CodeModify;