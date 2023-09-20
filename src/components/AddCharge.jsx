import React, { useEffect, useState } from 'react';
import axios from "axios";
import { Modal} from 'react-bootstrap';

const customAxios = axios.create({
    baseURL: 'http://localhost:8080/api'
});

const AddCharge = ({showModal, handleClose}) => {
    const createChargeApi = 'charge/createCharge';
    const [chargeName, setChargeName] = useState('');
    const [sucessPost, setSuccessPost] = useState(false);
    useEffect(() => {
    }, []);

    const isFormValid = () => {
        if(chargeName.length>4){
            return true;
        }
        return false;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const createdCharge = {
            name: chargeName
        }
        console.log(createdCharge);
        try {
            const createCharge = await customAxios.post(createChargeApi, createdCharge);
            console.log(createCharge);
            setChargeName('');
            setSuccessPost(true);
            setTimeout(() => {
                setSuccessPost(false);
            }, 3000);
          } catch (error) {
            console.error("Error creating charge", error);
          }
    };

    return (
        <Modal show={showModal} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Create a new Charge</Modal.Title>
            </Modal.Header>
            <form onSubmit={handleSubmit}>
                <Modal.Body>
                    <div className='row'>
                        <div className="col-12 px-5 mx-auto">
                            <label className='mb-1'>New Charge</label>
                            <input
                                className="form-control mb-3"
                                placeholder="Enter the new charge"
                                type="text"
                                required
                                value={chargeName}
                                onChange={(e) => setChargeName(e.target.value)}
                            />
                        </div>
                    </div>
                    {sucessPost && <div className="alert alert-success" role="alert">
                        Charge created Succesfully!
                    </div>}
                </Modal.Body>
                <Modal.Footer>
                    <button className='btn btn-danger' type="button" onClick={handleClose}>
                        Close
                    </button>
                    {isFormValid() ? (
                        <button className='btn btn-success' type="submit">
                            Add Charge
                        </button>) :
                        (<button className='btn btn-success' type="button" disabled>
                            Add Charge
                        </button>
                        )}
                </Modal.Footer>
            </form>
        </Modal>
    );
}

export default AddCharge;
