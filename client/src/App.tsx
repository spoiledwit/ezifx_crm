import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Layout from "./Layout";
import useAuthStore from "./store/authStore";
import ForgotPass from "./pages/ForgotPass";
import { useEffect } from "react";
import ActiveUsers from "./components/Users/ActiveUsers";
import BannedUsers from "./components/Users/BannedUsers";
import WithBalance from "./components/Users/WithBalance";
import AllUsers from "./components/Users/AllUsers";
import PaidUsers from "./components/Users/PaidUsers";
import KYCPending from "./components/Users/KYCPending";
import KYCUnverified from "./components/Users/KYCUnverified";
import EmailUnverified from "./components/Users/EmailUnverified";
import MobileUnverified from "./components/Users/MobileUnverified";
import AllDeposits from "./components/Deposits/AllDeposits";
import ApprovedDeposits from "./components/Deposits/ApprovedDeposits";
import InitiatedDeposits from "./components/Deposits/InitiatedDeposits";
import SuccessfulDeposits from "./components/Deposits/SuccessfulDeposits";
import PendingDeposits from "./components/Deposits/PendingDeposits";
import RejectedDeposits from "./components/Deposits/RejectedDeposits";

const App = () => {

  const { user, theme } = useAuthStore();

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [theme])

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={user ? <Home /> : <Login />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="forgot-password" element={<ForgotPass />} />
        <Route path="*" element={<h1>Not Found</h1>} />
        {/* All user routes */}
        <Route path="active-users" element={<ActiveUsers />} />
        <Route path="mobile-unverified" element={<MobileUnverified />} />
        <Route path="email-unverified" element={<EmailUnverified />} />
        <Route path="kyc-unverified" element={<KYCUnverified />} />
        <Route path="kyc-pending" element={<KYCPending />} />
        <Route path="paid-users" element={<PaidUsers />} />
        <Route path="all-users" element={<AllUsers />} />
        <Route path="banned-users" element={<BannedUsers />} />
        <Route path="with-balance" element={<WithBalance />} />
        <Route path="notification-to-all" element={<BannedUsers />} />
        {/* All deposit routes */}
        <Route path="all-deposits" element={<AllDeposits />} />
        <Route path="approved-deposits" element={<ApprovedDeposits />} />
        <Route path="initiated-deposits" element={<InitiatedDeposits />} />
        <Route path="successful-deposits" element={<SuccessfulDeposits />} />
        <Route path="pending-deposits" element={<PendingDeposits />} />
        <Route path="rejected-deposits" element={<RejectedDeposits />} />
        {/* All deposit routes */}
        <Route path="all-withdrawals" element={<AllDeposits />} />
        <Route path="approved-withdrawals" element={<ApprovedDeposits />} />
        <Route path="withdrawal-methods" element={<SuccessfulDeposits />} />
        <Route path="pending-withdrawals" element={<PendingDeposits />} />
        <Route path="rejected-deposits" element={<RejectedDeposits />} />
      </Route>
    </Routes>
  );
};

export default App;
