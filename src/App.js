import './index.css';
import EmployeesList from './components/EmployeesList';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import AddEmployee from './components/AddEmployee';
import AddContractType from './components/AddContractType'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<EmployeesList></EmployeesList>}></Route>
        <Route path='/AddEmployee' element={<AddEmployee></AddEmployee>}></Route>
        <Route path='/AddContractType' element={<AddContractType></AddContractType>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
