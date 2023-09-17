import './App.css';
import EmployeesList from './components/EmployeesList';
import { Routes, Route, BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<EmployeesList></EmployeesList>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
