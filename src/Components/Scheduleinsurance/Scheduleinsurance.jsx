import React from 'react'
import Topbar from '../common/topbar/Topbar';
import './Scheduleinsurance'
function Scheduleinsurance() {
    const handleSubmit = () => {
        // Add any form submission logic here
        // For example, you can send data to a server or perform validation
        console.log('Form submitted!');
      };
  return (
    
    <div>
       <Topbar />
       <div className="fix_the_position">
      <form className="w-full border border-gray-300 bg-dark-purple p-6 rounded" >
                <div>
            <h3 className="text-white w-full  px-3 mb-6 md:mb-0 size-12 ">Check Eligibility For Claims</h3>
            </div>

          <div className="flex flex-wrap -mx-3 mb-6">

            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">

              <label className="block uppercase  tracking-wide text-white text-xs font-normal mb-2" htmlFor="grid-first-name">
                First Name
              </label>
              <input className="appearance-none block w-full bg-light-white text-black border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="Enter Your First Name" />
             {/*<p className="text-red-500 text-xs italic">Please fill out this field.</p>*/}
            </div>
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0 ">
              <label className="block uppercase tracking-wide text-white text-xs font-normal mb-2" htmlFor="grid-last-name">
                Last Name
              </label>
              <input className="appearance-none block w-full bg-light-white text-black border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"  id="grid-last-name" type="text" placeholder="Enter Your Last Name" />
            </div>
          
          <div className="w-full  px-3">
              <label className="block uppercase  tracking-wide text-white text-xs font-normal mb-2" htmlFor="grid-last-name">
                Insurance 
              </label>
              <input className="appearance-none block w-full bg-light-white text-black border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"  id="grid-last-name" type="text" placeholder="Company Name" />
            </div>
            </div>
          

         {/*  <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label className="block uppercase tracking-wide text-white text-xs font-normal mb-2" htmlFor="grid-password">
                Password
              </label>
              <input className="appearance-none block w-full bg-light-white text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="password" placeholder="******************" />
              <p className="text-white text-xs font-normal">Make it as long </p>
            </div>
          </div>
          */}
          


            <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3">
              <label className="block uppercase tracking-wide text-white text-xs font-normal mb-2" htmlFor="grid-last-name">
               Add an Claim id
              </label>
              <input className="appearance-none block w-full  bg-light-white text-black border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text" placeholder="abc123" />
            </div>
            </div>



            <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3 flex items-center justify-center">
              <input
                type="submit"
                className="bg-light-white hover:bg-blue-violet text-white font-normal py-2 px-4 rounded-full focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
                value="Check Eligibility"
                onClick={handleSubmit}
              />
            </div>
          </div>


         
        </form>
      </div>
    </div>
  )
}

export default Scheduleinsurance
