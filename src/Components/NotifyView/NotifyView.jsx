import React, { useState, useEffect } from 'react';
import Topbar from '../common/topbar/Topbar.jsx'
import SideNav from '../common/SideNav/sideNav.jsx'
import axios from 'axios';
import '../NotifyForm/NotifyForm.css'
import { FaEdit, FaTrash } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'

function NotifyView() {

    const [data, setData] = useState([]);
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {

        if (!sessionStorage.getItem("access_token")) {
            navigate("/");
        }

        let timerInterval;
        Swal.fire({
            title: "Fetching Notifications",
            html: "I will close in <b></b> milliseconds.",
            timer: 2000,
            timerProgressBar: true,
            didOpen: () => {
                Swal.showLoading();
                const timer = Swal.getPopup().querySelector("b");
                timerInterval = setInterval(() => {
                    timer.textContent = `${Swal.getTimerLeft()}`;
                }, 100);
            },
            willClose: () => {
                clearInterval(timerInterval);
            }
        }).then((result) => {
            if (result.dismiss === Swal.DismissReason.timer) {
                console.log("I was closed by the timer");
            }
        });

        const fetchData = async () => {
            try {
                const response = await axios.get('http://api.innobot.dulanga.com/api/innobothealth/notification/getAll', {
                    headers : {
                        'Authorization' : 'Bearer '.concat(sessionStorage.getItem("access_token"))
                    }
                });
                setData(response.data);
            } catch (error) {
                console.error('Exception Occurred', error);
            }
        };
        fetchData();
    },[]);

    const handleSearch = (e) => {
        const value = e.target.value;
        setSearchQuery(value);
    };

    const filteredData = data.filter(item =>
        item.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.deliveredTime.toLowerCase().includes(searchQuery.toLowerCase())
    ).sort((a, b) => new Date(b.deliveredTime) - new Date(a.deliveredTime));

    function handleDelete(item) {

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {

                const updatedData = data.filter(item1 => item1.id !== item.id);
                setData(updatedData);
                axios.delete("http://api.innobot.dulanga.com/api/innobothealth/notification/delete/".concat(item.id), {
                    headers: {
                        'Authorization' : 'Bearer '.concat(sessionStorage.getItem("access_token"))
                    }
                }).catch(reason => {
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: "Something went wrong!",
                        footer: '<a href="#">Why do I have this issue?</a>'
                    });
                });

                Swal.fire({
                    title: "Deleted!",
                    text: "Your file has been deleted.",
                    icon: "success"
                });

            }
        });
    }

    const handleDownloadCSV = () => {
        const csvContent = "ID,Subject,DateTime,To,Message,Acknowledged Status\n"
            + data.map(item => `${item.id},${item.subject}, ${item.deliveredTime},${item.firstName + item.lastName}, ${item.message.replace(/\n/g, ' ')}, ${item.acknowledged}`).join("\n");

        const blob = new Blob([csvContent], { type: 'text/csv' });

        const a = document.createElement('a');

        a.href = window.URL.createObjectURL(blob);
        a.download = 'report.csv';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    };

    return (
        <div>
            <Topbar />
            <div>
                <div>
                    <SideNav />
                </div>
                <div style={{marginTop: '90px', display: 'flex', position: 'relative'}}>
                <div className="flex justify-items-center" style={{ width: '100%', position: 'relative', padding: '10px'}}  >
                    <div className="max-w-4xl mx-auto p-4" style={{width: '50%'}}>
                        <div className="flex justify-between items-center mb-4"
                             style={{maxHeight: '80vh', overflowY: 'auto'}}>
                            <h1 className="text-xl font-bold text-black-900 dark:text-black">Sent Notifications</h1>
                            <button type="submit"
                                    className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                                    onClick={() => navigate('/NotifyForm')}
                                    style={{fontFamily: 'arial', fontSize: '18px'}}
                            >Create New
                            </button>
                        </div>
                        <input
                            type="text"
                            placeholder="Search Here"
                            value={searchQuery}
                            onChange={handleSearch}
                        />
                        <button type="button"
                                className="bg-red-500 text-white px-4 py-2 rounded-lg"
                                onClick={handleDownloadCSV}
                                style={{fontFamily: 'arial', fontSize: '18px', marginLeft: '20px'}}
                        >Download Report
                        </button>
                        {filteredData.map(item => (
                            <div key={item.id} style={{width: '100%'}}
                                 className="bg-white dark:bg-white-700 shadow-xl rounded-lg p-4 mb-4">
                                <div className="flex justify-between items-center mb-3">
                                    <h1 className="text-lg font-semibold text-zinc-800 dark:text-black">{item.subject}</h1>
                                    <span
                                        className="text-sm text-black-600 dark:text-black-300">{item.deliveredTime.substring(0, item.deliveredTime.indexOf('T'))} | {item.deliveredTime.substring(item.deliveredTime.indexOf('T') + 1, item.deliveredTime.length)}</span>
                                </div>
                                <div>
                                    <h1 className="text-sm font-semibold text-zinc-800 dark:text-black">TO
                                        : {item.firstName} {item.lastName}</h1>
                                </div>
                                <p className="text-zinc-600 dark:text-black-200 mb-3">
                                    {item.message.substring(item.message.lastIndexOf('*') + 1, item.message.length).trim()}
                                </p>
                                <div className="flex items-center justify-between">
                                    <div className="flex space-x-2">
                                        <button
                                            className="text-blue-500 hover:text-blue-600 dark:hover:text-blue-400">View
                                            Replies
                                        </button>
                                        {
                                            item.acknowledged ? (
                                                <text className="text-green-500">Acknowledged</text>
                                            ) : (null)
                                        }
                                    </div>
                                    <div className="flex space-x-2">
                                        <button onClick={() => {
                                            navigate('/updateNotification', {state: {data: item}})
                                        }}
                                                className="p-2 text-black hover:text-green-700 dark:text-green-300 dark:hover:text-green">
                                            <FaEdit/>
                                        </button>
                                        <button
                                            className="p-2 text-black hover:text-red-700 dark:text-red-300 dark:hover:text-red"
                                            onClick={() => {
                                                handleDelete(item)
                                            }}>
                                            <FaTrash/>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}

                    </div>
                </div>
                </div>
            </div>
        </div>
    );
}

export default NotifyView;