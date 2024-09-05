import React from 'react';
import './NotifyBtn.css';
import axios from "axios";
import Swal from "sweetalert2";
import {getAnalytics, logEvent, setUserProperties} from "firebase/analytics";

const NotifyBtn = ({ toggleNotifications, notificationCount, isOpen, notifications }) => {

    const analytics = getAnalytics();
    setUserProperties(analytics, {
        user: "Dulanga",
    });
    logEvent(analytics,'notification-send', { date : Date.now(), platform : "Innobot-FE-SLIIT"});

    function handleReply(id) {

        Swal.fire({
            title: "Submit your Reply Here!",
            input: "text",
            inputAttributes: {
                autocapitalize: "off",
                style: "display: flex; width: auto;"
            },
            showCancelButton: true,
            confirmButtonText: "Send",
            showLoaderOnConfirm: true,
            preConfirm: async (login) => {
                await axios.post(`http://api.innobot.dulanga.com/api/innobothealth/notification/reply/${id}`, {
                    "reply": login
                }, {
                    headers: {
                        'Authorization' : 'Bearer '.concat('eyJhbGciOiJIUzI1NiJ9.eyJ0eXAiOiJhY2Nlc3MtdG9rZW4iLCJhdXRob3JpdGllcyI6W3siYXV0aG9yaXR5IjoiQURNSU4ifV0sImlzRW1haWxWZXJpZmllZCI6ZmFsc2UsInN1YiI6ImR1bGFib3lAZHVsYW5nYS5jb20iLCJpYXQiOjE3MTM5ODc1MDcsImV4cCI6MTcxNjU3OTUwN30.CiCUQmJ6d6i3iUX9m9rGV0YcSLgApRBzfUnC2aqu17k')
                    }
                })
            },
            allowOutsideClick: () => !Swal.isLoading()
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: `Successfully Replied!`
                });
            }
        });

    }

    function handleAcknowledge(id) {
        axios.put(`http://api.innobot.dulanga.com/api/innobothealth/notification/acknowledge/${id}`, {}, {
            headers: {
                'Authorization' : 'Bearer '.concat('eyJhbGciOiJIUzI1NiJ9.eyJ0eXAiOiJhY2Nlc3MtdG9rZW4iLCJhdXRob3JpdGllcyI6W3siYXV0aG9yaXR5IjoiQURNSU4ifV0sImlzRW1haWxWZXJpZmllZCI6ZmFsc2UsInN1YiI6ImR1bGFib3lAZHVsYW5nYS5jb20iLCJpYXQiOjE3MTM5ODc1MDcsImV4cCI6MTcxNjU3OTUwN30.CiCUQmJ6d6i3iUX9m9rGV0YcSLgApRBzfUnC2aqu17k')
            }
        }).then(value => {
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Notification Acknowledged",
                showConfirmButton: false,
                timer: 1500
            });
        }).catch(reason => {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Something went wrong!",
                footer: '<a href="#">Why do I have this issue?</a>'
            });
        });
    }

    return (
    <div className="notification-container">
      <div className="notification-icon" onClick={toggleNotifications}>
        <i className="fas fa-bell"></i>
        {notificationCount > 0 && <span className="badge">{notificationCount}</span>}
      </div>
        {isOpen && (
            <div className="notification-dropdown">
                {notifications.map(item => (
                    <div key={item.id} className="notification-item">
                        <span className="text-black">{item.message}</span>
                        <button className="icon-button acknowledge-button" onClick={() => handleAcknowledge(item.id)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 64 64">
                                <image href="https://img.icons8.com/glyph-neue/64/puzzle.png" width="64" height="64" />
                            </svg>
                        </button>
                        <button className="icon-button reply-button" onClick={() => handleReply(item.id)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 50 50">
                                <image href="https://img.icons8.com/ios-filled/50/reply-arrow.png" width="50" height="50" />
                            </svg>
                        </button>
                    </div>
                ))}
            </div>
        )}
    </div>
  );
};

export default NotifyBtn;
