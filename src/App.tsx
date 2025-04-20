import {
  BrowserRouter as Router,
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
import EditUser from "./pages/EditUser";
import DepositResult from "./pages/DepositResult";
import SearchStation from "./pages/SearchStation";
import RPFeedback from "./pages/RPFeedback";
import AdminLogin from "./pages/Admin/AdminLogin";
import AdminHome from "./pages/Admin/AdminHome";
import { useSelector } from "react-redux";
import ProtectedRoute from "./middleware/ProtectedRoute";
import Unauthorized from "./pages/Unauthorized";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/register" element={<Register />} />
        <Route path="/register/otp/:phoneNumber" element={<OTP />} />
        <Route path="/login" element={<Login />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Admin routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
          <Route path="/admin/home" element={<AdminHome />} />
        </Route>

        {/* User routes */}
        <Route element={<ProtectedRoute allowedRoles={["user", "admin"]} />}>
          <Route path="/home" element={<HomePage />} />
          <Route path="/history" element={<History />} />
          <Route path="/history-empty" element={<HistoryEmpty />} />
          <Route path="/deposit" element={<Deposit />} />
          <Route path="/deposit-result" element={<DepositResult />} />
          <Route path="/station" element={<StationDetail />} />
          <Route path="/station/:id" element={<StationDetail />} />
          <Route path="/scanqr" element={<QRScannerPage />} />
          <Route path="/info-qr/:qrCode" element={<InfoQR />} />
          <Route path="/guide" element={<Guide />} />
          <Route path="/account" element={<Account />} />
          <Route path="/edit-account" element={<EditUser />} />
          <Route path="/search-station" element={<SearchStation />} />
          <Route path="/report" element={<RPFeedback />} />
        </Route>

      </Routes>
    </Router>
  );
}

export default App;
