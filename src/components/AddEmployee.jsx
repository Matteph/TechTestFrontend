import React, { useEffect, useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const customAxios = axios.create({
    baseURL: 'http://localhost:8080/api'
});

const AddEmployee = () => {
    const apiCharges = 'charge/getAllCharges';
    const apiContractTypes = 'contractType/getAllContractTypes';
    const createEmployeeApi = 'employee/createEmployee';
    const [name, setName] = useState('');
    const [charges, setCharges] = useState([]);
    const [selectedCharge, setSelectedCharge] = useState(-1);
    const [contractTypes, setContractTypes] = useState([]);
    const [selectedContractType, setSelectedContractType] = useState(-1);
    const [sucessPost, setSuccessPost] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        getApiData();
    }, []);

    const getApiData = async () => {
        const chargesRes = await customAxios.get(apiCharges);
        const contractTypesRes = await customAxios.get(apiContractTypes);
        setCharges(chargesRes.data);
        setContractTypes(contractTypesRes.data);
    }

    const handleChargeChange = (e) => {
        setSelectedCharge(parseInt(e.target.value, 10));
    };

    const handleContractTypeChange = (e) => {
        setSelectedContractType((parseInt(e.target.value, 10)));
    };

    const isFormValid = () => {
        if(name.length>3 && selectedCharge!== -1 && selectedContractType!== -1){
            return true;
        }
        return false;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const createdEmployee = {
            name: name,
            charge : {
                id: selectedCharge
            },
            contractType: {
                id: selectedContractType
            }
        }
        console.log(createdEmployee);
        try {
            const createEmployeePost = await customAxios.post(createEmployeeApi, createdEmployee);
            setName('');
            setSelectedCharge(-1);
            setSelectedContractType(-1);
            setSuccessPost(true);
            setTimeout(() => {
                setSuccessPost(false);
            }, 3000);
            console.log(createEmployeePost);
          } catch (error) {
            console.error("Error creating employee:", error);
          }
    };

    const goBack = () => {
        navigate(-1);
    };

    return (
        <div className='row'>
            <div className='col-12 mt-5'>
                <button className='btn btn-secondary' onClick={goBack}> {"<Previous"} </button>
            </div>
            <h1 className='text-info text-center mb-4'>Create a new Employee</h1>
            <div className='row d-flex justify-content-center mx-auto'>
                <div className="col-12 col-md-6 card p-5">
                    <form onSubmit={handleSubmit}>
                        <label className='mb-1'>New Employee</label>
                        <input
                            className="form-control mb-3"
                            placeholder="Enter the employee name"
                            type="text"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <label className='mb-1'>Charge</label>
                        <select className='form-select mb-3'
                            value={selectedCharge}
                            onChange={handleChargeChange}>
                            <option value={-1} key={-1} >-- Please select an option --</option>
                            {charges.map((charge) => (
                                <option value={charge.id} key={charge.id}> {charge.name} </option>
                            ))}
                        </select>
                        <label className='mb-1'>Contract Type</label>
                        <select className='form-select mb-3'
                            value={selectedContractType}
                            onChange={handleContractTypeChange}>
                            <option value={-1} key={-1} className='text-body-secondary'>-- Please select an option --</option>
                            {contractTypes.map((contractType) => (
                                <option value={contractType.id} key={contractType.id}> {contractType.name} </option>
                            ))}
                        </select>
                        {sucessPost && <div className="alert alert-success" role="alert">
                            Employee created Succesfully!
                        </div>}
                        <div className='col-12 d-flex justify-content-end'>
                            {isFormValid() ? (
                                <button className='btn btn-success' type="submit">
                                    Add Employee
                                </button>) :
                                (<button className='btn btn-success' type="button" disabled>
                                    Add Employee
                                </button>
                                )}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default AddEmployee;
