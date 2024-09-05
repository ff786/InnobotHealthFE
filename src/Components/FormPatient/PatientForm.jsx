import React, {useRef, useState} from 'react';
import Topbar from '../common/topbar/Topbar.jsx';
/* import '../ClaimManage/ClaimForm.css';
import '../UpdateClaim/UpdateForm.css'; */
import './PatientForm.css';
import SideNav from '../common/SideNav/sideNav.jsx';



const PatientForm = () => {

  const [PatientName, setPatientName] = useState('');
  const [age, setAge] = useState();
  const [Gender, setGender] = useState('');
  const [dob, setDob] = useState('');
  const [Country, setCountry] = useState('');
  const [Address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const formRef = useRef(null);


  const handleSubmit = async (event)=> {
      event.preventDefault();

      const form = document.getElementById('PatientForm');
      const formData = new FormData(form);
      // Send the form data as a POST request using fetch
      try {
        const response = await fetch('http://api.innobot.dulanga.com/api/innobothealth/patient/create', {
          method: 'POST',
          header: {
            'Accept': 'application/json'
          },
          body: formData,
        });
        if (response.ok) {
          alert("submitted form");
          formRef.current.reset();
        } else {
          console.error('Failed to submit form');
        }
      }
      catch (error) {
        alert('Failed to Submit Form, Please try again later!');
      }
  }

  return (

      <>
      <div>
        <Topbar/>
      </div>
      <div className="main-dom">
        <div>
          <SideNav />
        </div>
        <div className="md">
          <div className="bg-black-100 dark:bg-white-500">
            <div className="max-w-4xl mx-auto p-6">
              <div className="bg-white dark:bg-black-700 shadow-xl rounded-lg p-10">
                <div className="flex justify-between items-center mb-8 gap-10">
                  <h1 className="text-3xl font-bold text-zinc-900 dark:text-black">Patient Add</h1>
                  <div>
                    <button type="submit"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">Generate
                      Report
                    </button>
                    <button type="submit"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Delete
                      Patient
                    </button>
                  </div>
                </div>
                <form name="PatientForm" id="PatientForm" ref={formRef} onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 gap-6">
                    <label className="block">
                      <span className="text-zince-700 dark:text-white-300">Patient name:</span>
                      <input type="text" id="patientName" name="patientName" value={PatientName} onChange={(event) => setPatientName(parseString(event.target.value))}
                             className="mt-1 block w-full rounded-md bg-zinc-100 border-transparent focus:border-zinc-500 focus:bg-white focus:ring-0"
                             placeholder="Patient Name"/>
                    </label>
                    <label className="block">
                      <span className="text-zinc-700 dark:text-white-300">Age</span>
                      <input type="number" id="age" name="age" value={age} onChange={(event) => setAge(parseInt(event.target.value))}
                             className="mt-1 block w-full rounded-md bg-zinc-100 border-transparent focus:border-zinc-500 focus:bg-white focus:ring-0"
                             placeholder="Age"/>
                    </label>
                    <label className="block">
                      <span className="text-zinc-700 dark:text-white-300">Gender</span>
                      <input type="text" id="gender" name="gender" value={Gender} onChange={(event) => setGender(parseString(event.target.value))}
                             className="mt-1 block w-full rounded-md bg-zinc-100 border-transparent focus:border-zinc-500 focus:bg-white focus:ring-0"
                             placeholder="Gender"/>
                    </label>
                    <label className="block">
                      <span className="text-zinc-700 dark:text-white-300">DOB</span>
                      <input type="date" id="dob" name="dob" value={dob} onChange={(event) => setDob(parseString(event.target.value))}
                             className="mt-1 block w-full rounded-md bg-zinc-100 border-transparent focus:border-zinc-500 focus:bg-white focus:ring-0"/>
                    </label>
                    <label className="block">
                      <span className="text-zinc-700 dark:text-white-300">Country</span>
                      <input type="text" id="country" name="country" value={Country} onChange={(event) => setCountry(parseString(event.target.value))}
                             className="mt-1 block w-full rounded-md bg-zinc-100 border-transparent focus:border-zinc-500 focus:bg-white focus:ring-0"
                             placeholder="Country"/>
                    </label>
                    <label className="block">
                      <span className="text-zinc-700 dark:text-white-300">Address</span>
                      <input type="text" id="address" name="address" value={Address} onChange={(event) => setAddress(parseString(event.target.value))}
                             className="mt-1 block w-full rounded-md bg-zinc-100 border-transparent focus:border-zinc-500 focus:bg-white focus:ring-0"
                             placeholder="Address"/>
                    </label>
                    <label className="block">
                      <span className="text-zinc-700 dark:text-white-300">Email</span>
                      <input type="email" id="email" name="email" value={email} onChange={(event) => setEmail(parseString(event.target.value))}
                             className="mt-1 block w-full rounded-md bg-zinc-100 border-transparent focus:border-zinc-500 focus:bg-white focus:ring-0"
                             placeholder="Email"/>
                    </label>
                  </div>
                  <div className="flex justify-end mt-6">
                    <button type="cancel"
                            className="bg-zinc-300 hover:bg-zinc-400 text-zinc-800 font-bold py-2 px-4 rounded">Reset
                    </button>
                    <button type="submit"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">Add
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      </>

  );
}

 export default PatientForm;
