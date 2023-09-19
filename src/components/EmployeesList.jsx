import axios from "axios";
import React, {useEffect, useState} from "react";
import { useNavigate } from 'react-router-dom';

const customAxios = axios.create({
    baseURL: 'http://localhost:8080/api'
  });
  

const EmployeesList = () =>{
    const url = 'employee/getAllEmployees';
    const [employees, setEmployees] = useState([]);
    const [filterText, setFilterText] = useState('');
    const [showModal, setShowModal] = useState(false);
    
    // const [id, setId] = useState('');
    // const [name, setName] = useState('');
    // const [position, setPosition] = useState('');
    // const [contract, setContract] = useState('');
    const navigate = useNavigate();

    useEffect ( ()=>{
        getEmpleados();
    }, []);

    const getEmpleados = async () =>{
        const res = await customAxios.get(url);
        setEmployees(res.data);
    }

    const goToAddEmployee = () => {
        navigate('/AddEmployee');
    };

    const goToAddContractType = () => {
        navigate('/AddContractType');
    };

    const filterEmployees = (filterValue) => {
        return employees.filter(employee => {
          const chargeMatches = employee.charge.name.toLowerCase().includes(filterValue.toLowerCase());
          const contractTypeMatches = employee.contractType.name.toLowerCase().includes(filterValue.toLowerCase());
          
          return chargeMatches || contractTypeMatches;
        });
      };

    const handleFilterChange = (e) => {
        const text = e.target.value;
        setFilterText(text);
    };

    const filteredEmployees = filterEmployees(filterText);

    

    return (
        <div className="row">
            <div className="col-12">
                <h1 className="text-info mt-5 mb-4 text-center">Assist Control App</h1>
            </div>
            <div className="col-12 card">
                <div className="col-12 bg-white mt-2 p-2 d-flex justify-content-end">
                    <button className="btn btn-info me-4" onClick={goToAddContractType}>Add Contract Type</button>
                    <button className="btn btn-primary" onClick={goToAddEmployee}>Add Employee</button>
                </div>
                <div className="col-12 bg-white p-2">
                    <div className="col-12 d-flex align-items-center">
                        <span>Filter employees:</span>
                        <div className="col-2">
                            <input
                                type="text"
                                className="form-control ms-3"
                                aria-label="Filter"
                                aria-describedby="basic-addon1"
                                value={filterText}
                                onChange={handleFilterChange}
                            ></input>
                        </div>
                        <div className="col">
                            <button onClick={(e) => setFilterText("")} className="btn btn-warning ms-5"> Reset filter </button>
                        </div>
                    </div>
                </div>
                <table className="table table-hover table-striped">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">Charge</th>
                            <th scope="col">Contract Type</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredEmployees.map((employee, i) => (
                            <tr key={employee.id}>
                                <th scope="row">{i + 1}</th>
                                <td>{employee.name}</td>
                                <td>{employee.charge.name}</td>
                                <td>{employee.contractType.name}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default EmployeesList