import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Topbar from '../common/topbar/Topbar.jsx'
import SideNav from '../common/SideNav/sideNav.jsx'
import ClaimModify from './ClaimModify.jsx'
import ClaimFormModal from '../ClaimManage/FormClaim.jsx'
import PendingClaim from '../ApprovalClaim/PendingClaim.jsx'
import ApprovedClaim from '../ApprovalClaim/ApprovedClaim.jsx'
import './overView.css'

import { Link, useNavigate } from 'react-router-dom';

function OverviewClaim() {
    const [CreateClaim, setCreateClaim] = useState(false);
    const [ClaimStats, setClaimStats] = useState(false);
    const [PendingClaimVisible, setPendingClaimVisible] = useState(false);
    const [ApprovedClaimVisible, setApprovedClaimVisible] = useState(false);

    const [totalClaims, setTotalClaims] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [members, setMembers] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        // Fetch data from backend when component mounts
        axios.get('http://api.innobot.dulanga.com/api/innobothealth/claim/getAll')
            .then(response => {
                setMembers(response.data);
            })
            .catch(error => {
                console.error('Error fetching members:', error);
            });

    }, []);

    const toggleCreateClaim = () => {
        setCreateClaim(!CreateClaim);
    }
    const togglePendingClaim = () => {
        setPendingClaimVisible(!PendingClaimVisible);
    }
    const toggleApprovedClaim = () => {
        setApprovedClaimVisible(!ApprovedClaimVisible);
    }
    const handleSearchInputChange = (event) => {
        setSearchQuery(event.target.value);
    }
    const toggleAssignEmp = (event) => {
        navigate('/ClaimAssign');
    }

    const handleSearch = () => {
        console.log('Search Query:', searchQuery);
    }

    const handleDownloadCSV = () => {
        const csvContent = "Member ID,Claim Type,Full Name,Gender,Phone Number,Email, Status\n"
            + members.map(member => `${member.memberId},${member.claimType}, ${member.lastName + member.firstName}, ${member.gender}, ${member.phoneNumber}, ${member.email}, ${member.email}, ${member.approved ? 'Approved' : 'Pending'}`).join("\n");

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
            <div>
                <Topbar />
            </div>
            <div className="mid">
                <SideNav />
                <div className="main-view">
                    <div className="Maiin">
                        <button type="create" onClick={toggleCreateClaim}> Create Claim </button>
                        <button type="create" onClick={toggleAssignEmp}>Assign Staff</button>
                    </div>
                    <div className="mid-btn">
                        <button type="claim" onClick={togglePendingClaim}>Pending Claims</button>
                        <button type="claim" onClick={toggleApprovedClaim}>Approved Claims</button>
                        <button type="claim" onClick={handleDownloadCSV}>Download Claim Report</button>
                    </div>
                    <div className="mid-btn">
                        <input type="text" placeholder="Search here... " onChange={handleSearchInputChange} />
                        <button type="search" onClick={handleSearch}>Search</button>
                    </div>
                    <div className="formView">
                        <ClaimModify searchQuery={searchQuery} members={members} />
                        {CreateClaim && <ClaimFormModal isOpen={CreateClaim} onClose={toggleCreateClaim} />}
                        {PendingClaimVisible && <PendingClaim isOpen={PendingClaimVisible} onClose={togglePendingClaim} />}
                        {ApprovedClaimVisible && <ApprovedClaim isOpen={ApprovedClaimVisible} onClose={toggleApprovedClaim} />}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default OverviewClaim;
