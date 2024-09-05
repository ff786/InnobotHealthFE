import React, {useRef, useState} from 'react';
import logo from '../common/header/logo.png'
import icon_prof from '../ClaimManage/icon_prof.png'
import notify from '../ClaimManage/notify.png'
import Topbar from '../common/topbar/Topbar.jsx'
import '../../App.css'
import '../ClaimManage/ClaimForm.css'
import Sidebar from '../common/sidebar/Sidebar.jsx'
import search from '../common/search/Search.jsx'
import './Diagnosis.css'

import { Link } from 'react-router-dom';
import axios from "axios";
import Swal from "sweetalert2";
import ConfirmModal from "../ClaimOverview/ConfirmModal.jsx";

function CodeForm() {
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

    const [codeType, setCodeType] = useState('');
    const [codeName, setCodeName] = useState('');
    const [codeTitle, setCodeTitle] = useState('');
    const [description, setDescription] = useState('');
    const formRef = useRef(null);
    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!codeType || !codeName || !codeTitle || !description) {
            alert('Please fill in all the fields');
            return;
        }
        const form = document.getElementById('codeForm');
        event.preventDefault();
        const formData = new FormData(form);
        // Send the form data as a POST request using fetch
        try {
            const response = await fetch('http://api.innobot.dulanga.com/api/innobothealth/code/create', {
                method: 'POST',
                header: {
                    'Accept': 'application/json'
                },
                body: formData,
            });
            if (response.ok) {
                setIsConfirmModalOpen(true);
                formRef.current.reset();
            } else {
                console.error('Failed to submit form');
            }

        }
        catch (error) {
            console.error('Error uploading image:', error);
            alert('Failed to Submit Form, Please try again later!');
        }
    }


    return (

        <body>
            <div>
                  <Topbar />
            </div>
            <div style={{display: 'flex', flexDirection: 'row'}}>
            <div>
                <Sidebar />
            </div>
                <div className="main-form">
                    <div className="topbaree">
                        <h5 className="label-head">Add Codes</h5>
                        <button type="cancel" style={{height: '50px', marginRight: '10px'}}>Back</button>
                    </div>
                    <form name="codeForm" id="codeForm" ref={formRef}  onSubmit={handleSubmit}>
                        <div className="form-fill">
                            <div style={{display: 'flex', flexDirection: 'row', gap: '20px'}}>
                               <div className="devb">
                                    <label>CodeType:</label>
                                <div>
                                  <input type="text" value={codeType} onChange={(event) => setCodeType(event.target.value)} placeholder="CodeType" />
                                </div>
                                </div>
                               <div className="devb">
                                    <label>Code:</label>
                                <div>
                                    <input type="text" value={codeName} onChange={(event) => setCodeName(event.target.value)} placeholder="Code" />
                                </div>
                               </div>
                            </div>
                            <div style={{display: 'flex', flexDirection: 'row', gap: '20px'}}   >
                               <div className="devb">
                                    <label>Title:</label>
                                <div>
                                    <input type="text" value={codeTitle} onChange={(event) => setCodeTitle(event.target.value)} placeholder="Title" />
                                </div>
                               </div>
                               <div className="devb">
                                    <label>Description:</label>
                                <div>
                                    <input type="text" value={description} onChange={(event) => setDescription(event.target.value)} placeholder="Description" />
                                </div>
                               </div>
                            </div>
                            <div>
                                <button type="submit">Add Code</button>
                            </div>
                        </div>
                        {isConfirmModalOpen && <ConfirmModal isOpen={isConfirmModalOpen} onClose={() => setIsConfirmModalOpen(false)} />}
                    </form>
                </div>
            </div>


        </body>
    );

}

export default CodeForm;