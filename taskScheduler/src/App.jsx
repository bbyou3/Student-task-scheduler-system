import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './Components/Login';
import Dashboard from './Components/Dashboard'; 
import Register from './Components/Register';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        
        <Route path='/login' element={<Login />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/register' element={<Register />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
