import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import OTP from './pages/OTP';
import HomePage from './pages/HomePage';
import Deposit from './pages/Deposit';
import DepositSuccess from './pages/DepositSuccess';
import DepositFailed from './pages/DepositFailed';
import HistoryEmpty from './pages/HistoryEmpty';
import History from './pages/History';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/history" element={<History />} />
        <Route path="/history-empty" element={<HistoryEmpty />} />
        <Route path="/deposit-failed" element={<DepositFailed />} />
        <Route path="/deposit-success" element={<DepositSuccess />} />
        <Route path="/deposit" element={<Deposit />} />
        <Route path="/register/otp" element={<OTP />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/" element={<Navigate to="/home" replace />} />
      </Routes>
    </Router>
  );
}

export default App;