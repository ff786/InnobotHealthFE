import React from 'react';
import Topbar from "../common/topbar/Topbar";
import './DisplayAppointment.css';
import RowTable from './RowTable';
import Searchbar from "./Searchbar";
import Table from './Table';
function DisplayAppointment() {
  return (
    <div>
    <Topbar/>   
<Searchbar/>
        <RowTable/>
      <Table/>
      
    </div>
  );
}

export default DisplayAppointment;

