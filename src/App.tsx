import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import OTP from './pages/OTP';
import HomePage from './pages/HomePage';
import Deposit from './pages/Deposit';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/deposit" element={<Deposit />} />
        <Route path="/register/otp" element={<OTP />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<HomePage />} />
      </Routes>
    </Router>
  );
}

export default App;