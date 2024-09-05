/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';
import DataTable from 'react-data-table-component';

const inventorysuplier = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState('');
  const [filteredData, setFilteredData] = useState([]);

  const columns = [
    {
      name: "SupplierName",
      selector: (row) => row.SupplierName,
    },
    {
      name: "contact_person",
      selector: (row) => row.contact_person,
    },
    {
      name: "phone",
      selector: (row) => row.phone,
    },
   
    {
      name: "country",
      selector: (row) => row.country,
    },
    {
      name: "SriLanka_supplier_name",
      selector: (row) => row.SriLanka_supplier_name,
    },
    {
      name: "Action",
      cell: (row) => (
        <button type="button" className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-red-500 hover:bg-red-100 hover:text-red-800 disabled:opacity-50 disabled:pointer-events-none dark:hover:bg-red-800/30 dark:hover:text-red-400" onClick={() => handleDelete(row.Stockid)}>
          Delete
        </button>

      )
    }
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://dulanga.sliit.xyz/api/innobothealth/supplier/all");
        console.log(response.data);
        setData(response.data);
        setFilteredData(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const result = data.filter((item) => {
      return (item.supplierName && item.supplierName.toLowerCase().includes(search.toLowerCase()));
    });
    setFilteredData(result);
  }, [search, data]);

  const handleDelete = async (Stockid) => {
    const confirmDeleteAction = window.confirm("Are you sure you want to delete this item?");
    if (confirmDeleteAction) {
      console.log("Delete confirmed for item with Stock ID:", Stockid);
      await confirmDelete(Stockid);
    } else {
      console.log("Delete cancelled for item with Stock ID:", Stockid);
    }
  };

  const confirmDelete = async (Stockid) => {
    try {
      await axios.delete(`http://localhost:3000/medicine_details/${Stockid}`);
      const newData = data.filter((item) => item.Stockid !== Stockid);
      setData(newData);
      setFilteredData(newData);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {/* Inventory Content */}
      <div className="text-center">
        <h2 className="md:text-2xl text-xl font-bold md:leading-snug leading-snug mt-2">Expire of Medicines</h2>
      </div>
      <div className="table-container" style={{ overflowX: 'auto', width: '90vw', overflowY: 'hidden', margin: ' auto' }}>
        <React.Fragment>
          <DataTable
            columns={columns}
            data={filteredData}
            pagination
            fixedHeader
            selectableRowsHighlight
            highlightOnHover
            subHeader
            subHeaderComponent={
              <input
                type="text"
                className="w-25 form-control float-right"
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            }
            subHeaderAlign="left"
            style={{ width: '100%' }}
            actions={
              <div className="flex gap-4">
                <Link to="/addmedicines">
                  <button type="button" className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none">
                    Add to Medicine
                    <svg className="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="m5 11 4-7"></path>
                      <path d="m19 11-4-7"></path>
                      <path d="M2 11h20"></path>
                      <path d="m3.5 11 1.6 7.4a2 2 0 0 0 2 1.6h9.8c.9 0 1.8-.7 2-1.6l1.7-7.4"></path>
                      <path d="m9 11 1 9"></path>
                      <path d="M4.5 15.5h15"></path>
                      <path d="m15 11-1 9"></path>
                    </svg>
                  </button>
                </Link>
                <button type="button" className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800">
                  Download
                  <svg className="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14"></path>
                    <path d="m12 5 7 7-7 7"></path>
                  </svg>
                </button>
              </div>
            }
          />
        </React.Fragment>
      </div>
    </div>
  );
};

export default inventorysuplier;
