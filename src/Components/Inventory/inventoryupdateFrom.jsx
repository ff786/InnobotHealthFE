/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { Card, Typography } from '@material-tailwind/react';
import axios from 'axios';

const inventoryupdateFrom = () => {
  const { control, handleSubmit, reset, formState: { errors }, setValue, register } = useForm({
    defaultValues: {
      Stockid: '',
      medicineName: '',
      medicineType: '',
      supplierName: '',
      expireDate: '',
      quantity: '',
      unitPrice: '',
    },
  });
  const [isExpiryDateInvalid, setIsExpiryDateInvalid] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { id } = useParams();
  const [data, setData] = useState({});

  useEffect(() => {
    console.log('Component mounted or id changed:', id);
    axios
      .get(`http://api.innobot.dulanga.com/api/innobothealth/medicine/name/${id}`)
      .then((response) => {
        setData(response.data);
        console.log(response.data);
        // Set initial form values after fetching data
        setValue('Stockid', response.data.Stockid);
        setValue('medicineName', response.data.medicineName);
        setValue('medicineType', response.data.medicineType);
        setValue('supplierName', response.data.supplierName);
        setValue('expireDate', response.data.expireDate);
        setValue('quantity', response.data.quantity);
        setValue('unitPrice', response.data.unitPrice);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id, setValue]);

  const Submitprocess = async (data) => {
    console.log(data);
    if (isExpiryDateInvalid) {
      alert('Expiry date cannot be in the past');
      return;
    }

    try {
      const selectedSupplierName = data.supplierName;
      console.log('Selected Supplier Name:', selectedSupplierName);
      // Assign the selected supplier name to the supplierName field in the data object
      data.supplierName = selectedSupplierName;
      console.log('this pass object pass post :', data);
      // Send the POST request to the server
      const response = await axios.put('http://api.innobot.dulanga.com/api/innobothealth/medicine', data);
      console.log(response.data);
      setIsSuccess(true);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleExpiryDateChange = (e) => {
    const selectedDate = e.target.value;
    const currentDate = new Date();
    const selectedDateObj = new Date(selectedDate);

    if (selectedDateObj < currentDate) {
      alert('Expiry date cannot be in the past');
      setValue('expireDate', '');
      setIsExpiryDateInvalid(true);
      return;
    }

    setValue('expireDate', selectedDate);
    setIsExpiryDateInvalid(false);
  };

  const handleFormReset = () => {
    reset();
  };

  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(true);
  // Fetch suppliers data on component mount
  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const response = await axios.get('http://api.innobot.dulanga.com/api/innobothealth/supplier/all');
        console.log(response.data);
        setSuppliers(response.data); // Set the fetched suppliers data into state
      } catch (error) {
        console.error('Error fetching suppliers:', error);
      }
    };

    fetchSuppliers();
  }, []); // Fetch suppliers data on component mount


  return (
    <div className="h-screen grid place-items-center bg-gray-50">
      <Card color="transparent" shadow={true} className="p-7 bg-white">
        <Typography variant="h4" color="blue-gray">
          Update Medicine
        </Typography>
        <Typography color="gray" className="mt-1 font-normal">
          Enter your details for the medicine.
        </Typography>
        <br />

        <form className="mb-4 w-[500px] grid grid-cols-2 gap-6">

          <div>
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Medicine Name
            </Typography>
            <br />
            <Controller
              name="medicineName"
              rules={{ required: "Medicine Name is required", maxLength: { value: 20, message: "Medicine Name should not exceed 20 characters" }, minLength: { value: 3, message: "Medicine Name should not be less than 3 characters" }, pattern: { value: /^[A-Za-z]+$/i, message: "Medicine Name should contain only alphabets" } }}
              control={control}
              render={({ field }) => (
                <input
                  type="text"
                  {...field}
                  value={data.medicineName}
                  className="py-3 px-4 block w-full border-gray-200 shadow-sm rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Enter Medicine Name"
                />
              )}
            />
            {errors?.medicineName?.message && (<span className="text-red-500 text-sm">{errors?.medicineName?.message}</span>)}
          </div>

          <div>
            <Typography variant="h6" color="blue-gray" className="-mb-6">
              Medicine Type
            </Typography>
            <br />
            <select
              {...register('medicineType')}

              className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="">Select Medicine Type</option>
              <option value="Tablet">Tablet</option>
              <option value="Capsules">Capsules</option>
              <option value="Inhalers">Inhalers</option>
              <option value="Injections">Injections</option>
              <option value="Suppositories">Suppositories</option>
            </select>
            {errors?.medicineType?.message && (<span className="text-red-500 text-sm">{errors?.medicineType?.message}</span>)}
          </div>

          {/* <div>
            <Typography variant="h6" color="blue-gray" className="-mb-6">
              SupplierName
            </Typography>
            <br />
            <select
              {...register('supplierName')}
              value={data.supplierName}
              className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="">Select supplier</option>
              <option value="1">Type 1</option>
              <option value="2">Type 2</option>
              <option value="3">Type 3</option>
            </select>
            {errors?.supplierName?.message && (<span className="text-red-500 text-sm">{errors?.supplierName?.message}</span>)}
          </div> */}
          <div>
            <Typography variant="h6" color="blue-gray" className="-mb-6">
              Supplier Name
            </Typography>
            <br />
            <select
              {...register('supplier', { required: "Supplier Name is required" })}
              className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="">Select supplier</option>
              {/* Map through the suppliers data and populate options */}
              {suppliers.map(supplier => (
                <option key={supplier.Suplierid} value={supplier.supplier_name}>
                  {supplier.supplier_name}
                </option>
              ))}
            </select>
            {errors?.supplierName?.message && (<span className="text-red-500 text-sm">{errors?.supplierName?.message}</span>)}
          </div>
          <div>
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Expiry Date
            </Typography>
            <br />
            <input
              type="date"
              {...register('expireDate', { required: "Expiry Date is required" })}
              onChange={handleExpiryDateChange}
              className="py-3 px-4 block w-full border-gray-200 shadow-sm rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500"
            />
            {errors?.expireDate?.message && (<span className="text-red-500 text-sm">{errors?.expireDate?.message}</span>)}
          </div>

          <div>
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Quantity
            </Typography>
            <br />
            <input
              type="text"
              {...register('quantity', {
                required: "Quantity is required",
                min: { value: 1, message: "Quantity should not be less than 1" },
                max: { value: 1000, message: "Quantity should not exceed 1000" },
                pattern: { value: /^[0-9]+$/, message: "Quantity should contain only numbers" }
              })}
              className="py-3 px-4 block w-full border-gray-200 shadow-sm rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="Enter Quantity"
            />
            {errors?.quantity?.message && (
              <span className="text-red-500 text-sm">{errors?.quantity?.message}</span>
            )}

          </div>

          <div>
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Unit Price
            </Typography>
            <br />
            <input
              type="text"

              {...register('unitPrice', {
                required: "Unit Price is required",
                min: { value: 1, message: "Unit Price should not be less than 1" },
                max: { value: 1000, message: "Unit Price should not exceed 1000" },
                pattern: { value: /^[0-9]+(\.[0-9]{1,2})?$/, message: "Unit Price should contain only numbers with up to two decimal places" }
              })}
              className="py-3 px-4 block w-full border-gray-200 shadow-sm rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="Enter Unit Price"
            />
            {errors?.unitPrice?.message && (
              <span className="text-red-500 text-sm">{errors?.unitPrice?.message}</span>
            )}

          </div>

          <div className="col-span-2 grid grid-cols-2 gap-3 justify-center">
            {isSuccess ? (
              <Link to="/Inventory">
                <button
                  type="button"
                  className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 justify-center"
                >
                  Go to Medicine List
                </button>
              </Link>
            ) : (
              <button
                type="button"
                onClick={handleSubmit(Submitprocess)}
                disabled={isExpiryDateInvalid}
                className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 justify-center"
              >
                Update Medicine
              </button>
            )}
            <button
              type="button"
              onClick={handleFormReset}
              className="ml-2 py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 justify-center"
            >
              Reset
            </button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default inventoryupdateFrom;
