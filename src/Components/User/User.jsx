import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Topbar from '../common/topbar/Topbar';
import Navbar from './UserNavbar';
import './User.css';
import Modal from 'react-modal';
import Sidebar from '../common/sidebar/Sidebar';
import SideNav from '../common/SideNav/sideNav';
import { saveAs } from 'file-saver';
import { FaDownload } from 'react-icons/fa';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import innobotLogo from './innobotlogo.png';
import backgroundImage from './background.jpg';

function User() {
  const [username, setUsername] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [notipref, setNotipref] = useState({ SMS: false, EMAIL: false, SYS: false });
  const [users, setUsers] = useState([]);
  const [editingUserIndex, setEditingUserIndex] = useState(-1);
  const [searchQuery, setSearchQuery] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [isEditMode, setIsEditMode] = useState(false); // State for switching between edit and add mode

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

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    if (editingUserIndex !== -1) {
      handleSaveEdit(); // Call handleSaveEdit if in edit mode
      return;
    }
  
    try {
      const response = await axios.post('http://api.innobot.dulanga.com/api/innobothealth/admin/register', {
        email,
        password,
        firstName: firstname,
        lastName: lastname,
        mobileNumber,
        role,
        notificationPreference: Object.keys(notipref).filter(key => notipref[key])
      });
  
      setUsers([...users, response.data]);
  
      setUsername('');
      setFirstname('');
      setLastname('');
      setMobileNumber('');
      setPassword('');
      setEmail('');
      setRole('');
      setNotipref({ SMS: false, EMAIL: false, SYS: false });
  
    } catch (error) {
      console.error('Error:', error);
      showCustomPopup('Failed to add user. Please try again later.');
    }
  };
  

  const showCustomPopup = (message) => {
    setModalMessage(message);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const clearForm = () => {
    setUsername('');
    setFirstname('');
    setLastname('');
    setMobileNumber('');
    setPassword('');
    setEmail('');
    setRole('');
    setNotipref({ SMS: false, EMAIL: false, SYS: false });
  };
  const handleDelete = async (index) => {
    try {
      // Get the ID of the user to delete
      const userIdToDelete = users[index].id;
  
      // Make the DELETE request to the API
      await axios.delete(`http://api.innobot.dulanga.com/api/innobothealth/admin/delete/${userIdToDelete}`);
  
      // Update the state to remove the deleted user
      setUsers(prevUsers => {
        const updatedUsers = [...prevUsers];
        updatedUsers.splice(index, 1);
        return updatedUsers;
      });
    } catch (error) {
      console.error('Error deleting user:', error);
      // Optionally, you can show a custom error message here
      showCustomPopup('Failed to delete user. Please try again later.');
    }
  };


  
  const handleEdit = (index) => {
    setEditingUserIndex(index);
    setUsername(users[index].username);
    setFirstname(users[index].firstName);
    setLastname(users[index].lastName);
    setMobileNumber(users[index].mobileNumber);
    setEmail(users[index].email);
    setRole(users[index].role);
    const preferences = users[index].notificationPreference.reduce((acc, cur) => {
      acc[cur] = true;
      return acc;
    }, { SMS: false, EMAIL: false, SYS: false });
    setNotipref(preferences);
    setIsEditMode(true); // Set isEditMode to true when editing a user
  };

  const handleSaveEdit = async () => {
    try {
      const response = await axios.put(`http://api.innobot.dulanga.com/api/innobothealth/admin/update/${users[editingUserIndex].id}`, {
        email,
        firstName: firstname,
        lastName: lastname,
        mobileNumber,
        role,
        notificationPreference: Object.keys(notipref).filter(key => notipref[key])
      });
  
      const updatedUser = {
        ...users[editingUserIndex],
        email,
        firstName: firstname,
        lastName: lastname,
        mobileNumber,
        role,
        notificationPreference: Object.keys(notipref).filter(key => notipref[key])
      };  
  
      const updatedUsers = [...users];
      updatedUsers[editingUserIndex] = updatedUser;
  
      setUsers(updatedUsers);
      setEditingUserIndex(-1);
      setUsername('');
      setEmail('');
      setRole('');
      setNotipref({ SMS: false, EMAIL: false, SYS: false });
      setFirstname('');
      setLastname('');
    } catch (error) {
      console.error('Error saving edit:', error);
      showCustomPopup('Failed to save changes. Please try again later.');
    }
  };
  

  const filteredUsers = users.filter(user =>
    user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.lastName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleMode = () => {
    setIsEditMode(!isEditMode);
    clearForm(); // Clear form fields when switching modes
    setEditingUserIndex(-1); // Reset editing index when switching modes
  };
  const downloadCSV = () => {
    const csvContent = "data:text/csv;charset=utf-8," 
      + filteredUsers.map(user => Object.values(user).join(",")).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "user_list.csv");
    document.body.appendChild(link);
    link.click();
  };


  const downloadPDF = async () => {
    try {
      // Create a new PDF document
      const pdfDoc = await PDFDocument.create();
      const page = pdfDoc.addPage([600, 800]); // Adjust page size as needed
  
      // Add company logo
      const imageBytes = await fetch(innobotLogo).then((res) => res.arrayBuffer());
      const image = await pdfDoc.embedPng(imageBytes);
      const logoDimensions = image.scale(0.5); // Adjust logo size as needed
      page.drawImage(image, {
        x: 50,
        y: 700,
        width: logoDimensions.width,
        height: logoDimensions.height,
      });
  
      // Define table properties
      const tableX = 50;
      let tableY = 600;
      const cellMargin = 5;
      const cellHeight = 20;
      const headerTextSize = 12;
      const rowTextSize = 10;
      const headerBackgroundColor = rgb(0.8, 0.8, 0.8);
      const rowBackgroundColor = rgb(0.9, 0.9, 0.9);
  
      // Add summary
      page.drawText('User Summary', {
        x: tableX,
        y: tableY,
        size: headerTextSize + 2,
        color: rgb(0, 0, 0),
      });
      tableY -= 30;
  
      const totalUsers = filteredUsers.length;
      const totalCoordinators = filteredUsers.filter(user => user.role === 'COORDINATOR').length;
      const totalAdmins = filteredUsers.filter(user => user.role === 'ADMIN').length;
      const totalStaff = filteredUsers.filter(user => user.role === 'STAFF').length;
  
      page.drawText(`Total Users: ${totalUsers}`, {
        x: tableX,
        y: tableY,
        size: rowTextSize,
        color: rgb(0, 0, 0),
      });
      tableY -= 20;
      page.drawText(`Total Coordinators: ${totalCoordinators}`, {
        x: tableX,
        y: tableY,
        size: rowTextSize,
        color: rgb(0, 0, 0),
      });
      tableY -= 20;
      page.drawText(`Total Admins: ${totalAdmins}`, {
        x: tableX,
        y: tableY,
        size: rowTextSize,
        color: rgb(0, 0, 0),
      });
      tableY -= 20;
      page.drawText(`Total Staff: ${totalStaff}`, {
        x: tableX,
        y: tableY,
        size: rowTextSize,
        color: rgb(0, 0, 0),
      });
      tableY -= 50;
  
      // Add table headers with borders
      const tableHeaders = ['Username', 'First Name', 'Last Name', 'Email', 'Role'];
      page.drawRectangle({
        x: tableX,
        y: tableY,
        width: 450,
        height: cellHeight,
        color: headerBackgroundColor,
      });
      let currentX = tableX + cellMargin;
      tableHeaders.forEach((header, index) => {
        page.drawText(header, {
          x: currentX,
          y: tableY + cellMargin,
          size: headerTextSize,
          color: rgb(0, 0, 0),
        });
        currentX += 90; // Adjust column width
        if (index < tableHeaders.length - 1) {
          page.drawLine({
            start: { x: currentX, y: tableY },
            end: { x: currentX, y: tableY + cellHeight },
            thickness: 1,
            color: rgb(0, 0, 0),
          });
        }
      });
  
      // Add table data with borders
      let currentY = tableY - cellHeight;
      for (let i = 0; i < filteredUsers.length; i++) {
        const user = filteredUsers[i];
        currentY -= cellHeight;
        currentX = tableX + cellMargin;
        page.drawRectangle({
          x: tableX,
          y: currentY,
          width: 450,
          height: cellHeight,
          color: rowBackgroundColor,
        });
        const rowData = [user.username, user.firstName, user.lastName, user.email, user.role];
        rowData.forEach((data, index) => {
          page.drawText(data, {
            x: currentX,
            y: currentY + cellMargin,
            size: rowTextSize,
            color: rgb(0, 0, 0),
          });
          currentX += 90; // Adjust column width
          if (index < rowData.length - 1) {
            page.drawLine({
              start: { x: currentX, y: currentY },
              end: { x: currentX, y: currentY + cellHeight },
              thickness: 1,
              color: rgb(0, 0, 0),
            });
          }
        });
      }
  
      // Add footer
      const date = new Date().toLocaleDateString();
      const footerText = `Generated on: ${date}`;
      const footerSize = 10;
      const footerOffset = 30;
      page.drawText(footerText, {
        x: 50,
        y: 50,
        size: footerSize,
        color: rgb(0, 0, 0),
      });
  
      // Add closing lines
      const closingLines = 'Thank you for choosing Innobot!';
      const closingSize = 12;
      const closingOffset = 50;
      page.drawText(closingLines, {
        x: 50,
        y: 20,
        size: closingSize,
        color: rgb(0, 0, 0),
      });
  
      // Save the PDF to a Uint8Array
      const pdfBytes = await pdfDoc.save();
  
      // Convert Uint8Array to Blob
      const pdfBlob = new Blob([pdfBytes], { type: 'application/pdf' });
  
      // Trigger download
      saveAs(pdfBlob, 'user_report.pdf');
    } catch (error) {
      console.error('Error generating PDF:', error);
      showCustomPopup('Failed to generate PDF report. Please try again later.');
    }
  };
  
  


  return (
    <div >
      
      <SideNav/>
      <Topbar />
      <Navbar />
      
   
    <div className="staff-container" style={{ backgroundImage: `url(${backgroundImage})` }}  >
    
      
      <div className="content-container"></div>
     
      <div className="add-staff-container-unique" style={{ backgroundImage: `url(${backgroundImage})` }}>
        <div className="add-staff-container">
        <h2 className="add-staff-heading-unique">{isEditMode ? 'Edit STAFF' : 'Add STAFF'}</h2>

          <form onSubmit={handleSubmit}>
            <div className="form-group-unique">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="form-group-unique">
              <label htmlFor="firstname">First Name</label>
              <input
                type="text"
                id="firstname"
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
                required
              />
            </div>
            <div className="form-group-unique">
              <label htmlFor="lastname">Last Name</label>
              <input
                type="text"
                id="lastname"
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
                required
              />
            </div>
            <div className="form-group-unique">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group-unique">
              <label htmlFor="mobileNumber">Mobile Number</label>
              <input
                type="text"
                id="mobileNumber"
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
                required
              />
            </div>
            <div className="form-group-unique">
              <label htmlFor="role">Role</label>
              <select
                value={role}
                onChange={(event) => setRole(event.target.value)}
                required
              >
                <option value="">Select Role</option>
                <option value="COORDINATOR">COORDINATOR</option>
                <option value="STAFF">STAFF</option>
                <option value="ADMIN">ADMIN</option>
              </select>
            </div>
            <div className="form-group-unique">
              <label>Notification Preferences</label>
              <div className="form-Para" style={{ marginBottom: '20px' }}>
                <input
                  type="checkbox"
                  id="SMS"
                  checked={notipref.SMS}
                  onChange={(e) => setNotipref({ ...notipref, SMS: e.target.checked })}
                />
                <label htmlFor="SMS">SMS</label>
                <input
                  type="checkbox"
                  id="EMAIL"
                  checked={notipref.EMAIL}
                  onChange={(e) => setNotipref({ ...notipref, EMAIL: e.target.checked })}
                />
                <label htmlFor="EMAIL">Email</label>
                <input
                  type="checkbox"
                  id="SYS"
                  checked={notipref.SYS}
                  onChange={(e) => setNotipref({ ...notipref, SYS: e.target.checked })}
                />
                <label htmlFor="SYS">System</label>
              </div>
            </div>
            <div className="form-group-unique">
              <button type="submit" className="unique-button">
                {isEditMode ? 'Save' : 'Add'}
              </button>
              <button type="button" onClick={clearForm} className="unique-button">
                Clear
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="user-list-container-unique" >
        <h2 className="user-list-heading-unique">Staff List</h2>
        <div className="table-container">
          <input
            type="text"
            className="unique-input"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <table className="unique-table">
            <thead className="unique-thead">
              <tr>
                <th>Username</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user, index) => (
                <tr key={user.id}>
                  <td>{user.username}</td>
                  <td>{user.firstName}</td>
                  <td>{user.lastName}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>
                    <button onClick={() => handleEdit(index)} className="unique-button">Edit</button>
                    <button onClick={() => handleDelete(index)} className="unique-button">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button onClick={toggleMode} className="unique-button">Switch to {isEditMode ? 'Add' : 'Edit'} Mode</button>
          <button onClick={downloadCSV} className="download-btn-unique">
            <FaDownload className="download-icon-unique" /> Download CSV
          </button>
          <button onClick={downloadPDF} className="download-btn-unique">
          <FaDownload className="download-icon-unique" />   Download PDF
          </button>
        </div>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className="modal-unique"
        overlayClassName="overlay-unique"
      >
        <h2>Error</h2>
        <p>{modalMessage}</p>
        <button onClick={closeModal} className="unique-button">Close</button>
      </Modal>
    </div>
    </div>
  );
}

export default User;

