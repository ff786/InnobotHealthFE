import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SideNav from '../common/SideNav/sideNav.jsx';
import video from '../../LoginAssets/video.mp4';
import '../../App.css'
import '../ClaimManage/ClaimForm.css'
import Sidebar from '../common/sidebar/Sidebar.jsx'
import search from '../common/search/Search.jsx'
import './Diagnosis.css'
import { useParams } from 'react-router-dom';
import Topbar from "../common/topbar/Topbar.jsx";
import ConfirmModal from "../ClaimOverview/ConfirmModal.jsx";
import React from "react";

const UpdateCode = () => {
    const [memberId, setMemberId] = useState('');
    const [codeType, setCodeType] = useState('');
    const [codeName, setCodeName] = useState('');
    const [codeTitle, setCodeTitle] = useState('');
    const [description, setDescription] = useState('');
    const {id} = useParams();

    const [updateCodes, setUpdateCodes] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://api.innobot.dulanga.com/api/innobothealth/code/getAll?id');
                const member = response.data[0];
                setMemberId(member.memberId);
                setCodeType(member.codeType);
                setCodeName(member.codeName);
                setCodeTitle(member.codeTitle);
                setDescription(member.description);

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, [id]);

    const handleUpdate = async (event) => {
        event.preventDefault();

        const update = document.getElementById('updateCode');
        event.preventDefault();
        try {
            await axios.put(`http://api.innobot.dulanga.com/api/innobothealth/code/update`, {
                memberId: memberId,
                codeType: codeType,
                codeName: codeName,
                codeTitle: codeTitle,
                description: description,
            });
            toast.success('Code updated successfully');
        } catch (error) {
            console.error('Error updating code:', error);
            alert('Error updating code');
        }

    };

    return (

        <body>
        <div>
            <Topbar/>
        </div>
        <div style={{display: 'flex', flexDirection: 'row'}}>
            <div>
                <Sidebar/>
            </div>
            <div className="main-form">
                <div className="topbaree">
                    <h5 className="label-head">Add Codes</h5>
                    <button type="cancel" style={{height: '50px', marginRight: '10px'}}>Back</button>
                </div>
                <form name="updateCode" id="updateCode" onSubmit={handleUpdate}>
                    <div className="form-fill">
                        <div style={{display: 'flex', flexDirection: 'row', gap: '20px'}}>
                            <div className="devb">
                                <label>CodeType:</label>
                                <div>
                                    <input type="text" value={codeType}
                                           onChange={(event) => setCodeType(event.target.value)}
                                           placeholder="CodeType"/>
                                </div>
                            </div>
                            <div className="devb">
                                <label>Code:</label>
                                <div>
                                    <input type="text" value={codeName}
                                           onChange={(event) => setCodeName(event.target.value)} placeholder="Code"/>
                                </div>
                            </div>
                        </div>
                        <div style={{display: 'flex', flexDirection: 'row', gap: '20px'}}>
                            <div className="devb">
                                <label>Title:</label>
                                <div>
                                    <input type="text" value={codeTitle}
                                           onChange={(event) => setCodeTitle(event.target.value)} placeholder="Title"/>
                                </div>
                            </div>
                            <div className="devb">
                                <label>Description:</label>
                                <div>
                                    <input type="text" value={description}
                                           onChange={(event) => setDescription(event.target.value)}
                                           placeholder="Description"/>
                                </div>
                            </div>
                        </div>
                        <div>
                            <button type="submit">Add Code</button>
                        </div>
                    </div>
                    {isConfirmModalOpen &&
                        <ConfirmModal isOpen={isConfirmModalOpen} onClose={() => setIsConfirmModalOpen(false)}/>}
                </form>
            </div>
        </div>
        </body>
    );
};

export default UpdateCode;