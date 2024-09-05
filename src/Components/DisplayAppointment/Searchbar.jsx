import React, { useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { FaList} from "react-icons/fa6";
import './DisplayAppointment.css';
const Searchbar = () => {
  const [activeSearch, setActiveSearch] = useState([]);

  const handleSearch = (e) => {
    const searchTerm = e.target.value;
    if (searchTerm === '') {
      setActiveSearch([]);
      return false;
    }
    setActiveSearch(words.filter((w) => w.includes(searchTerm)).slice(0, 8));
  };

  return (
    <form className="w-[200px] relative">
      <div className="relative flex items-center">
      <FaList  className="mr-5 ml-5 text-gray-600 text-4xl" /> {/* Insert icon here */}
      
        <input
          type="search"
          placeholder="Search Name"
          className="w-full mt-1 px-1 py-4 rounded bg-grey text-black placeholder-white"
          onChange={(e) => handleSearch(e)}
        />
        <button className="mt-1  absolute right-1 top-1/2 -translate-y-1/2 p-3 bg-slate-600 rounded-full">
          <AiOutlineSearch />
        </button>
        
      </div>
      <div className="het">
        <div className="addstyles_tobutton">
        <button className="bg-grey hover:bg-light-blue text-white  py-4 px-2 rounded">Click&nbsp;to&nbsp;Generate&nbsp;Appointment&nbsp;Report</button>
        </div>
      </div>
      {activeSearch.length > 0 && (
        <div className="absolute top-20  p-4 bg-slate-800 text-black w-full rounded-xl left-1/2 -translate-x-1/2 flex flex-col gap-2">
          {activeSearch.map((s) => (
            <span key={s}>{s}</span>
          ))}
        </div>
      )}
    </form>
  );
};

export default Searchbar;