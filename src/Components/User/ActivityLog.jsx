import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ActivityLog.css'; // Importing my CSS stylesheet
import Topbar from '../common/topbar/Topbar';
import Navbar from './UserNavbar';

function ActivityLog() {
  const [selectedUser, setSelectedUser] = useState(null);
  const [userActivities, setUserActivities] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://api.innobot.dulanga.com/api/innobothealth/admin/getAll');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  useEffect(() => {
    if (selectedUser) {
      fetchUserActivities();
    }
  }, [selectedUser]);

  const fetchUserActivities = async () => {
    try {
      const response = await axios.get(`http://api.innobot.dulanga.com/api/innobothealth/activity-log/${selectedUser}`);
      setUserActivities(response.data);
    } catch (error) {
      console.error('Error fetching user activities:', error);
    }
  };

  const handleUserSelect = (userId) => {
    setSelectedUser(userId);
  };

  return (
    <div className="activity-log-container-Unique">
      <Topbar />
      <Navbar />
      <div className="activity-log-Unique">
        <h1>Activity Log</h1>
        <div className="filter-container-Unique">
          {/* User select dropdown */}
          <select className="user-select-Unique" onChange={(e) => handleUserSelect(e.target.value)}>
            <option value="">Select User</option>
            {/* Render options from fetched users */}
            {users.map(user => (
              <option key={user._id} value={user._id}>{`${user.firstName} ${user.lastName}`}</option>
            ))}
          </select>
        </div>
        {/* Render activity list */}
        <ul className="activity-list-Unique">
          {userActivities.map(activity => (
            <li key={activity._id} className="activity-item-Unique">
              <div>
                <strong>User ID:</strong> {activity.userId}
              </div>
              <div>
                <strong>Timestamp:</strong> {activity.timestamp}
              </div>
              <div>
                <strong>Event:</strong> {activity.event}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ActivityLog;
