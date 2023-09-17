import axios from "axios";
import React, {useEffect, useState} from "react";

const customAxios = axios.create({
    baseURL: 'http://localhost:8080/api'
  });
  

const EmployeesList = () =>{
    const url = 'empleado/getAllEmpleados';
    const [empleados, setEmpleados] = useState([]);
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [position, setPosition] = useState('');
    const [contract, setContract] = useState('');

    useEffect ( ()=>{
        getEmpleados();
    }, []);

    const getEmpleados = async () =>{
        const res = await customAxios.get(url);
        setEmpleados(res.data);
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <h1 className="text-info mt-5 text-center">Assist Control App</h1>
                </div>
                <div className="col-12">
                    <div className="col-12 bg-white mt-4 p-2 d-flex justify-content-end">
                            <button className="btn btn-primary">Agregar</button>
                    </div>
                    <div className="col-12 bg-white p-2">
                        <div className="col-6 d-flex align-items-center">
                            <span>Filtrar empleados:</span>
                            <div className="col-4">
                                <input type="text" className="form-control ms-3" aria-label="Filter" aria-describedby="basic-addon1"></input>
                            </div>
                        </div>
                    </div>
                    <table className="table">   
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Nombre</th>
                                <th scope="col">Cargo</th>
                                <th scope="col">Tipo de contrato</th>
                            </tr>
                        </thead>
                        <tbody>
                            {empleados.map( (empleado , i)=>(
                                <tr key={empleado.id}>
                                    <th scope="row">{i+1}</th>
                                    <td>{empleado.nombre}</td>
                                    <td>{empleado.cargo.nombre}</td>
                                    <td>{empleado.tipoContrato.nombre}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default EmployeesList