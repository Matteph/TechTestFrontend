import React, { useEffect, useState } from 'react';
import axios from "axios";
import { Modal} from 'react-bootstrap';

const customAxios = axios.create({
    baseURL: 'http://localhost:8080/api'
});

const AddContractType = ({showModal, handleClose}) => {
    const createContractTypeApi = 'contractType/createContractType';
    const [contractTypeName, setcontractTypeName] = useState('');
    const [sucessPost, setSuccessPost] = useState(false);
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
        try {
            const createContractType = await customAxios.post(createContractTypeApi, createdContractType);
            console.log(createContractType);
            setcontractTypeName('');
            setSuccessPost(true);
            setTimeout(() => {
                setSuccessPost(false);
            }, 3000);
          } catch (error) {
            console.error("Error creating contract Type:", error);
          }
    };

    return (
        <Modal show={showModal} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Create a new Contract Type</Modal.Title>
            </Modal.Header>
            <form onSubmit={handleSubmit}>
                <Modal.Body>
                    <div className='row'>
                        <div className="col-12 px-5 mx-auto">
                            <label className='mb-1'>New Contract Type</label>
                            <input
                                className="form-control mb-3"
                                placeholder="Enter the new contract type"
                                type="text"
                                required
                                value={contractTypeName}
                                onChange={(e) => setcontractTypeName(e.target.value)}
                            />
                        </div>
                    </div>
                    {sucessPost && <div className="alert alert-success" role="alert">
                        Contract Type created Succesfully!
                    </div>}
                </Modal.Body>
                <Modal.Footer>
                    <button className='btn btn-danger' type="button" onClick={handleClose}>
                        Close
                    </button>
                    {isFormValid() ? (
                        <button className='btn btn-success' type="submit">
                            Add Contract Type
                        </button>) :
                        (<button className='btn btn-success' type="button" disabled>
                            Add Contract Type
                        </button>
                        )}
                </Modal.Footer>
            </form>
        </Modal>
    );
}

export default AddContractType;
