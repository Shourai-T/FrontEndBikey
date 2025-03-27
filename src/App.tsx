import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import OTP from "./pages/OTP";
import HomePage from "./pages/HomePage";
import Deposit from "./pages/Deposit";
import HistoryEmpty from "./pages/HistoryEmpty";
import History from "./pages/History";
import InfoQR from "./pages/InfoQR";
import StationDetail from "./components/StationDetail";
import Guide from "./pages/Guide";
import Account from "./pages/Account";
import QRScannerPage from "./pages/ScanQR";
import EditUser from './pages/EditUser'
import DepositResult from "./pages/DepositResult";
import SearchStation from "./pages/SearchStation";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/history" element={<History />} />
        <Route path="/history-empty" element={<HistoryEmpty />} />
        <Route path="/deposit" element={<Deposit />} />
        <Route path="/deposit-result" element={<DepositResult />} />
        <Route path="/register/otp" element={<OTP />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/station" element={<StationDetail />} />
        <Route path="/station/:id" element={<StationDetail />} />
        <Route path="/scanqr" element={<QRScannerPage />} />
        <Route path="/info-qr/:qrCode" element={<InfoQR />} />
        <Route path="/guide" element={<Guide />} />
        <Route path="/account" element={<Account />} />
        <Route path="/edit-account" element={<EditUser/>} />
        <Route path="/search-station" element={<SearchStation />} />
      </Routes>
    </Router>
  );
}

export default App;
