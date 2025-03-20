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
import SearchStation from './components/SearchStation';
import ScanQR from './pages/ScanQR';
import InfoQR from './pages/InfoQR';
import StationDetail from './components/StationDetail';
import Guide from './pages/Guide';
import User from './pages/User';
import EditUser from './pages/EditUser';
import ChangePassword from './pages/ChangePassword';

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
        <Route path="/" element={<Navigate to="/login" replace />}/>
        <Route path="/station" element={<StationDetail />}/>
        <Route path="/station/:id" element={<StationDetail />}/>
        <Route path="/scanqr" element={<ScanQR onScan={(code: string) => console.log(code)} />}/>
        <Route path="/info-qr" element={<InfoQR />} />
        <Route path="/guide" element={<Guide />} />
        <Route path="/user" element={<User />} />
        <Route path="/user/edit" element={<EditUser />} />
        <Route path="/user/change-password" element={<ChangePassword />} />
      </Routes>
    </Router>
  );
}

export default App;