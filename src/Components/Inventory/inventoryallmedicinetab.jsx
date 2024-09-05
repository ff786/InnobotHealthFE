/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import Swal from "sweetalert2";

const InventoryAllMedicineTab = () => {
    const [data, setData] = useState([]);
    const [search, setSearch] = useState('');
    const [filteredData, setFilteredData] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();


    const columns = [
        {
            name: "MedicineName",
            selector: (row) => row.medicineName,
        },
        {
            name: "MedicineType",
            selector: (row) => row.medicineType,
        },
        {
            name: "ExpireDate",
            selector: (row) => row.expireDate,
        },
        {
            name: "Quantity",
            selector: (row) => row.quantity,
        },
        {
            name: "UnitPrice",
            selector: (row) => row.unitPrice,
        },
        {
            name: "Supplier",
            selector: (row) => row.supplier,
        },
        {
            name: "Action",
            cell: (row) => (
                <div>
                    <Link to={`/UpdateInventory/${row.medicineName}`}>
                        <button type="button" className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-yellow-500 hover:bg-yellow-100 hover:text-yellow-800 disabled:opacity-50 disabled:pointer-events-none dark:hover:bg-yellow-800/30 dark:hover:text-yellow-400">
                            Edit
                        </button>
                    </Link>
                    <button type="button" className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-red-500 hover:bg-red-100 hover:text-red-800 disabled:opacity-50 disabled:pointer-events-none dark:hover:bg-red-800/30 dark:hover:text-red-400" onClick={() => handleDelete(row.id)}>
                        Delete
                    </button>
                </div>
            )
        }
    ];

    useEffect(() => {
        const fetchData = async () => {
            try {
                // const response = await axios.get("https://dulanga.sliit.xyz/api/innobothealth/medicine/all");
                const response = await axios.get("http://api.innobot.dulanga.com/api/innobothealth/medicine/all");
                console.log(response.data);
                setData(response.data);
                setFilteredData(response.data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, [loading]);

    useEffect(() => {
        const result = data.filter((item) => {
            return (item.medicineName && item.medicineName.toLowerCase().includes(search.toLowerCase()));
        });
        setFilteredData(result);
    }, [search, data]);

    // const handleDelete = async (medicineName) => {
    //     const confirmDeleteAction = window.confirm("Are you sure you want to delete this item?");
    //     if (confirmDeleteAction) {
    //         try {
    //             await axios.delete(`http://api.innobot.dulanga.com/api/innobothealth/medicine/${medicineName}`);
    //             console.log("Item deleted successfully:", medicineName);
    //             const newData = data.filter((item) => item.medicineName !== medicineName);
    //             setData(newData);
    //             setLoading(true);
    //             setFilteredData(newData); // Update filtered data as well
    //         } catch (error) {
    //             console.log("Error deleting item:", error);
    //         }
    //     } else {
    //         console.log("Delete action canceled for item:", medicineName);
    //     }
    // };

    const handleDelete = async (medicineName) => {
        const confirmDeleteAction = await Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "No, cancel!",
            reverseButtons: true
        });


        if (confirmDeleteAction.isConfirmed) {
            try {
                await axios.delete(`http://localhost:8080/api/innobothealth/medicine/${medicineName}`);
                console.log("Item deleted successfully:", medicineName);
                const newData = data.filter((item) => item.medicineName !== medicineName);
                setData(newData);
                setLoading(true);
                setFilteredData(newData);
                setLoading(true);

                // Show success message
                Swal.fire({
                    title: "Deleted!",
                    text: "Your file has been deleted.",
                    icon: "success"
                });
            } catch (error) {
                console.log("Error deleting item:", error);
                // Show error message
                Swal.fire({
                    title: "Error",
                    text: "Failed to delete item. Please try again later.",
                    icon: "error"
                });
            }
        } else if (confirmDeleteAction.dismiss === Swal.DismissReason.cancel) {
            console.log("Delete action canceled for item:", medicineName);
            // Show cancellation message
            Swal.fire({
                title: "Cancelled",
                text: "Your deletion action has been cancelled.",
                icon: "info"
            });
        }
    };

    const handleDownloadPDF = async () => {
        try {
            const response = await axios.get("http://localhost:8080/api/innobothealth/medicine/generate-pdf/all", {
                responseType: 'blob', // Important for receiving binary data
            });

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'inventory.pdf');
            document.body.appendChild(link);
            link.click();
        } catch (error) {
            console.error('Error downloading PDF:', error);
        }
    };

    return (
        <div>
            {/* Inventory Content */}
            <div className="text-center">
                <h2 className="md:text-2xl text-xl font-bold md:leading-snug leading-snug mt-2">List of Medicines</h2>
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
                                <Link to="/addInventory">
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
                                <button type="button" className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800"onClick={handleDownloadPDF}>
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

export default InventoryAllMedicineTab;
