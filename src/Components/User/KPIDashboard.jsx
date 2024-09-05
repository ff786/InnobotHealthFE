import React from 'react';
import { Link } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import './UserMenu.css';
import './KPIDashboard.css';

const KPIDashboard = () => {
  // Sample data for the line chart
  const data = [
    { name: 'Jan', value: 400 },
    { name: 'Feb', value: 300 },
    { name: 'Mar', value: 200 },
    { name: 'Apr', value: 278 },
    { name: 'May', value: 189 },
    { name: 'Jun', value: 239 },
    { name: 'Jul', value: 349 },
    { name: 'Aug', value: 200 },
    { name: 'Sep', value: 250 },
    { name: 'Oct', value: 300 },
    { name: 'Nov', value: 400 },
    { name: 'Dec', value: 500 },
  ];

  return (
    <div className="kpi-dashboard">
      <h2>KPI Dashboard</h2>
      <div className="chart-container">
        <LineChart width={800} height={400} data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="value" stroke="#8884d8" />
        </LineChart>
      </div>
      <div className="tables-container">
        <div className="table">
          <h3>Top Performing Staff</h3>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Tasks Completed</th>
                <th>Efficiency</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>John Doe</td>
                <td>50</td>
                <td>95%</td>
              </tr>
              <tr>
                <td>Jane Smith</td>
                <td>45</td>
                <td>90%</td>
              </tr>
              {/* Add more rows as needed */}
            </tbody>
          </table>
        </div>
        <div className="table">
          <h3>Recent Activities</h3>
          <ul>
            <li>User John Doe added a new patient</li>
            <li>User Jane Smith completed a task</li>
            <li>User Bob Johnson updated a profile</li>
            {/* Add more list items as needed */}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default KPIDashboard;
