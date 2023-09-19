import React, { useEffect, useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const customAxios = axios.create({
    baseURL: 'http://localhost:8080/api'
});

const AddContractType = () => {
    const createContractTypeApi = 'contractType/createContractType';
    const [contractTypeName, setcontractTypeName] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
    }, []);

    const isFormValid = () => {
        if(contractTypeName.length>4){
            return true;
        }
        return false;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const createdContractType = {
            name: contractTypeName
        }
        console.log(createdContractType);
        try {
            const createContractType = await customAxios.post(createContractTypeApi, createdContractType);
            setcontractTypeName('');
            console.log(createContractType);
          } catch (error) {
            console.error("Error creating contract Type:", error);
          }
    };

    const goBack = () => {
        navigate('/');
    };

    return (
        <div className='row'>
            <div className='col-12 mt-5'>
                <button className='btn btn-secondary' onClick={goBack}> {"<Previous"} </button>
            </div>
            <h1 className='text-info text-center mb-4'>Add Contract Type</h1>
            <div className='row'>
                <div className="col-6 card p-5 mx-auto">
                    <form onSubmit={handleSubmit}>
                        <label className='mb-1'>New Contract Type</label>
                        <input
                            className="form-control mb-3"
                            placeholder="Enter the contract Type"
                            type="text"
                            required
                            value={contractTypeName}
                            onChange={(e) => setcontractTypeName(e.target.value)}
                        />
                        <div className='col-12 d-flex justify-content-end'>
                            {isFormValid() ? (
                                <button className='btn btn-success' type="submit">
                                    Add Contract Type
                                </button>) :
                                (<button className='btn btn-success' type="button" disabled>
                                    Add Contract Type
                                </button>
                                )}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default AddContractType;
