import React from 'react';
import { TbGridDots } from "react-icons/tb";

function RowTable() {


  return (
    <div className="overflow-x-auto mt-1 mr-4 ml-4">
      <table className="border-collapse border border-gray-800 w-full mx-auto">
        <tbody>
          <tr className="bg-gray-200 whitespace-nowrap">
            <td className="border border-gray-300 p-1 shadow-md text-black"><TbGridDots /></td>
            <td className="border border-gray-300 py-1 px-2 shadow-md whitespace-no-wrap">
              Select Number of Rows
              <select className="ml-2 border border-gray-300 rounded-md shadow-md focus:outline-none focus:border-blue-300">
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="30">30</option>
              </select>
            </td>
            <td className="border border-gray-300 p-1 shadow-md whitespace-no-wrap flex items-center border-t-0 border-b-0">
              <span className="mr-2">Select Action</span>
              <select className="mr-2 border border-gray-300 rounded-md shadow-md focus:outline-none focus:border-blue-300">
                <option value="action1"> 1</option>
                <option value="action2"> 2</option>
                <option value="action3"> 3</option>
              </select>
              <button className="bg-grey hover:bg-grey text-white  py-1 px-2 rounded ml-5">Action</button>
              <TbGridDots className="ml-2" />
            </td>
            <td className="border border-gray-300 p-1 shadow-md whitespace-no-wrap">
              <button className="bg-grey hover:bg-grey text-white  py-1 px-2 rounded ml-5">Get Bulk SMS</button>
            </td>
            <td className="border border-gray-300 p-1 shadow-md whitespace-no-wrap">
              <button className="bg-grey hover:bg-grey text-white  py-1 px-2 rounded ml-5">Get a SMS</button>
            </td>
            <td className="border border-gray-300 p-1 shadow-md whitespace-no-wrap">
              <input type="checkbox" className="ml-4 mr-4 mt-2"/>A-Z Sorting</td>
              <button className="bg-grey hover:bg-grey text-white  py-1 px-2 rounded ml-4">Add</button>
            <td className="border border-gray-300 p-1 shadow-md whitespace-no-wrap">Column 7</td>
            <td className="border border-gray-300 p-1 shadow-md whitespace-no-wrap">Column 8</td>
            <td className="border border-gray-300 p-1 shadow-md whitespace-no-wrap">Column 9</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default RowTable;
