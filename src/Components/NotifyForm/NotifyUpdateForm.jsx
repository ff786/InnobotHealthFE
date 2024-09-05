import React, {useEffect, useState} from 'react';
import Topbar from '../common/topbar/Topbar.jsx'
import SideNav from '../common/SideNav/sideNav.jsx'
import '../../App.css'
import '../UpdateClaim/UpdateForm.css'
import './NotifyForm.css'
import axios from "axios";
import Swal from 'sweetalert2'
import { useLocation } from 'react-router-dom';

const NotifyUpdateForm = () => {

    var location = useLocation();
    var data = location.state?.data;

    const [category, setCategory] = useState('');
    const [receivertype, setReceiverType] = useState('ADMIN');
    const [receiver, setReceiver] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const [priority, setPriority] = useState('');
    const [notificationType, setNotificationType] = useState('scheduled');
    const [isAnonymous, setAnnonymous] = useState(false);
    const [dateSchd, setDateSchd] = useState('');
    const [timeSchd, setTimeSchd] = useState('');


    useEffect(() => {
        setCategory(data.category);
        setReceiverType(data.receiverType);
        setReceiver(data.firstName.concat(" ").concat(data.lastName));
        setSubject(data.subject);
        setMessage(data.message.match(/(?<=Dear [^\n]+,\s*)[\s\S]+?(?=\n{2,})/)[0].trim());
        setAnnonymous(data.isAnonymous);
        setPriority(data.priority);
        setNotificationType(data.isScheduled ? 'scheduled' : 'instant');
        setDateSchd((data.deliveredTime.substring(0, data.deliveredTime.indexOf('T'))));
        setTimeSchd(data.deliveredTime.substring(data.deliveredTime.indexOf('T') + 1, data.deliveredTime.length - 2));
    }, []);

    const handleSubmit = (e) => {

        e.preventDefault();

        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: "btn btn-success",
                cancelButton: "btn btn-danger"
            },
            buttonsStyling: false
        });
        swalWithBootstrapButtons.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, send it!",
            cancelButtonText: "No, cancel!",
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {

                axios.post('http://api.innobot.dulanga.com/api/innobothealth/notification/send', {
                    "category" : category,
                    "receiverType" : receivertype,
                    "receiver" : receiver,
                    "subject": subject,
                    "message" :  message,
                    "isAnonymous" : isAnonymous,
                    "priority" : priority,
                    "isScheduled" : notificationType === 'scheduled',
                    "scheduledDateTime" : dateSchd.concat("T").concat(timeSchd).concat(":00")
                }, {
                    headers : {
                        'Authorization' : 'Bearer '.concat('eyJhbGciOiJIUzI1NiJ9.eyJ0eXAiOiJhY2Nlc3MtdG9rZW4iLCJhdXRob3JpdGllcyI6W3siYXV0aG9yaXR5IjoiQURNSU4ifV0sImlzRW1haWxWZXJpZmllZCI6ZmFsc2UsInN1YiI6ImR1bGFib3lAZHVsYW5nYS5jb20iLCJpYXQiOjE3MTM5ODc1MDcsImV4cCI6MTcxNjU3OTUwN30.CiCUQmJ6d6i3iUX9m9rGV0YcSLgApRBzfUnC2aqu17k')
                    }
                });

                swalWithBootstrapButtons.fire({
                    title: "Sent!",
                    text: "Your notification has been sent!",
                    icon: "success"
                }).then(value => {
                    navigate('/NotifyView');
                });

            } else if (
                result.dismiss === Swal.DismissReason.cancel
            ) {
                swalWithBootstrapButtons.fire({
                    title: "Cancelled",
                    text: "Your imaginary file is safe :)",
                    icon: "error"
                });
            }
        });
    }

    const handleNotificationTypeChange = (e) => {
        setNotificationType(e.target.value);
    };

    return (

        <body>

        <div>
            <Topbar />
        </div>
        <div className="main-dom">
            <div>
                <SideNav />
            </div>
            <div className="md" style={{display: 'flex', position: 'relative'}}>
                <div className="max-w-4xl mx-auto bg-white dark:bg-white-700 shadow-lg p-6 rounded-lg">
                    <h2 className="text-3xl dark:text-zinc-900 font-bold mb-10">Create New Notification</h2>
                    <form onSubmit={handleSubmit}>
                       <div className="grid grid-cols-2 gap-4 mt-5">
                           <div>
                               <label className="flex text-m font-medium text-zinc-700 dark:text-zinc-900 mb-0">Category</label>
                               <select disabled={true} onChange={event => setCategory(event.target.value)} name='category' className="mt-1 block w-full py-2 px-3 border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-black-500 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
                                   <option>Custom</option>
                                   <option>General</option>
                                   <option>Urgent</option>
                               </select>
                           </div>
                           <div>
                               <div>
                                   <label className="flex text-m font-medium mb-5 text-zinc-700 dark:text-zinc-900 ml-6">Priority</label>
                                   <div className="mt-1">
                                       <label className="inline-flex items-center ml-6">
                                           <input checked={priority === 'High'} type="radio" name="priority" value="High" className="text-indigo-600 form-radio" onClick={event => setPriority(event.target.value)}/>
                                           <span className="ml">High</span>
                                       </label>
                                       <label className="inline-flex items-center ml-6">
                                           <input checked={priority === 'Medium'} type="radio" name="priority" value="Medium" className="text-indigo-600 form-radio" onClick={event => setPriority(event.target.value)}/>
                                           <span className="ml">Medium</span>
                                       </label>
                                       <label className="inline-flex items-center ml-6">
                                           <input checked={priority === 'Low'} type="radio" name="priority" value="Low" className="text-indigo-600 form-radio" onClick={event => setPriority(event.target.value)}/>
                                           <span className="ml">Low</span>
                                       </label>
                                   </div>
                               </div>
                           </div>
                           <section className="mb-auto">
                           <div className="mb-auto">
                               <label className="flex text-m font-medium text-zinc-700 dark:text-zinc-900 mb-0">Receiver Type</label>
                               <select disabled={true} value={receivertype} name='receiverType' className="mt-1 block w-full py-2 px-3 border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-black-500 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
                                   <option>ADMIN</option>
                                   <option>STAFF</option>
                                   <option>DOCTOR</option>
                               </select>
                           </div>
                           <div className="mb-auto mt-2">
                               <label className="block text-m font-medium text-zinc-700 dark:text-zinc-900">Receiver</label>
                               {<input disabled={true} value={receiver} name='receiver' type="text" placeholder="Dr. Farsith Fawzer" className="mt-1 block w-full py-2 px-3 border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-black-500 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />}
                           </div>
                           </section>
                           <div className="mb-auto">
                               <div>

                                   <label
                                       className="flex text-m font-medium mb-5 text-zinc-700 dark:text-zinc-900 ml-6">Notification
                                       Type</label>
                                   <div className="mt-1">
                                       <label className="inline-flex items-center ml-6">
                                           <input type="radio" name="isScheduled" value="scheduled"
                                                  className="text-indigo-600 form-radio"
                                                  checked={notificationType === 'scheduled'}
                                                  onChange={handleNotificationTypeChange}/>
                                           <span className="ml">Scheduled</span>
                                       </label>
                                       <label className="inline-flex items-center ml-6">
                                           <input type="radio" name="isScheduled" value="instant"
                                                  className="text-indigo-600 form-radio"
                                                  checked={notificationType === 'instant'}
                                                  onChange={handleNotificationTypeChange}/>
                                           <span className="ml">Instant</span>
                                       </label>
                                   </div>

                                   <div className="ml-6 h-100">
                                       {notificationType === 'scheduled' && (
                                           <div className="scheduled-options">
                                               <label className="relative text-base font-medium">Date</label>
                                               <input
                                                   style={{display: 'flex'}}
                                                   type="date"
                                                   value={dateSchd}
                                                   onChange={(e) => setDateSchd(e.target.value)}
                                                   className="input-field"
                                               />
                                               <label className="relative text-base font-medium mt-4">Time</label>
                                               <input
                                                   style={{display: 'flex'}}
                                                   type="time"
                                                   value={timeSchd}
                                                   onChange={(e) => setTimeSchd(e.target.value)}
                                                   className="input-field"
                                               />
                                           </div>
                                       )}
                                   </div>
                                   <div className="mt-1">
                                       <label className="inline-flex items-center ml-6">
                                           <input type="checkbox" name="isScheduled" value="scheduled"
                                                  className="text-indigo-600 form-radio"
                                                  checked={isAnonymous}
                                                  onChange={() => setAnnonymous(!isAnonymous)}/>
                                           <span className="ml">Anonymous</span>
                                       </label>
                                   </div>
                               </div>
                           </div>

                       </div>
                        <div className="col-span-2">
                            <label className="block text-m font-medium text-zinc-700 dark:text-zinc-900">Subject</label>
                            <input value={subject} name='subject' type="text"
                                   className="mt-1 block w-full py-2 px-3 border border-black-900 dark:border-white-600 bg-white dark:bg-black-900 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                   onChange={event => setSubject(event.target.value)}/>
                        </div>
                            <div className="col-span-2">
                                <label className="block text-m font-medium text-zinc-700 dark:text-zinc-900">Message</label>
                                <textarea value={message} name='message' rows="4" className="mt-1 block w-full py-2 px-3 border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-black-500 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" onChange={event => setMessage(event.target.value)} ></textarea>
                            </div>
                        <div className="flex justify-end mt-4">
                            <button type="cancel" className="bg-red-500 text-white px-4 py-2 rounded-md mr-2">Clear</button>
                            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">Update</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        </body>


    );

}

export default NotifyUpdateForm;