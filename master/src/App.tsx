import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Layout from "./Layout";
import useAuthStore from "./store/authStore";
import ForgotPass from "./pages/ForgotPass";
import { useEffect } from "react";
import ActiveUsers from "./pages/Users/ActiveUsers";
import BannedUsers from "./pages/Users/BannedUsers";
import WithBalance from "./pages/Users/WithBalance";
import AllUsers from "./pages/Users/AllUsers";
import PaidUsers from "./pages/Users/PaidUsers";
import KYCPending from "./pages/Users/KYCPending";
import KYCUnverified from "./pages/Users/KYCUnverified";
import EmailUnverified from "./pages/Users/EmailUnverified";
import MobileUnverified from "./pages/Users/MobileUnverified";
import AllDeposits from "./pages/Deposits/AllDeposits";
import ApprovedDeposits from "./pages/Deposits/ApprovedDeposits";
import InitiatedDeposits from "./pages/Deposits/InitiatedDeposits";
import SuccessfulDeposits from "./pages/Deposits/SuccessfulDeposits";
import PendingDeposits from "./pages/Deposits/PendingDeposits";
import RejectedDeposits from "./pages/Deposits/RejectedDeposits";
import AllWithdrawals from "./pages/Withdrawals/AllWithdrawals";
import ApprovedWithdrawals from "./pages/Withdrawals/ApprovedWithdrawals";
import WithdrawalMethods from "./pages/Withdrawals/WithdrawalMethods";
import PendingWithdrawals from "./pages/Withdrawals/PendingWithdrawals";
import RejectedWithdrawals from "./pages/Withdrawals/RejectedWithdrawals";
import AllTickets from "./pages/Support/AllTickets";
import ClosedTickets from "./pages/Support/ClosedTickets";
import PendingTickets from "./pages/Support/PendingTickets";
import AnsweredTickets from "./pages/Support/AnsweredTickets";
import DepositDetail from "./pages/Deposits/DepositDetail/DepositDetail";
import WithdrawDetail from "./pages/Withdrawals/WithdrawDetail/WithdrawDetail";
import UserDetails from "./components/UserDetails/UserDetails";
import IbRequests from "./pages/ibRequests";
import Plans from "./pages/plans";
import UnsubCopyRequest from "./pages/unsubCopyRequest";
import CopyRequest from "./pages/copyRequest";
import CopyTrade from "./pages/copyTrade";

const App = () => {
  const { user, theme } = useAuthStore();

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

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
        <Route path="user/:id" element={<UserDetails />} />
        {/* All deposit routes */}
        <Route path="all-deposits" element={<AllDeposits />} />
        <Route path="approved-deposits" element={<ApprovedDeposits />} />
        <Route path="initiated-deposits" element={<InitiatedDeposits />} />
        <Route path="successful-deposits" element={<SuccessfulDeposits />} />
        <Route path="pending-deposits" element={<PendingDeposits />} />
        <Route path="rejected-deposits" element={<RejectedDeposits />} />
        <Route path="deposit/:id" element={<DepositDetail />} />
        {/* All withdrawal routes */}
        <Route path="all-withdrawals" element={<AllWithdrawals />} />
        <Route path="approved-withdrawals" element={<ApprovedWithdrawals />} />
        <Route path="withdrawal-methods" element={<WithdrawalMethods />} />
        <Route path="pending-withdrawals" element={<PendingWithdrawals />} />
        <Route path="rejected-withdrawals" element={<RejectedWithdrawals />} />
        <Route path="withdrawal/:id" element={<WithdrawDetail />} />
        {/* All support routes */}
        <Route path="all-tickets" element={<AllTickets />} />
        <Route path="closed-tickets" element={<ClosedTickets />} />
        <Route path="pending-tickets" element={<PendingTickets />} />
        <Route path="answered-tickets" element={<AnsweredTickets />} />
        {/* ------------------ */}
        <Route path="ib-requests" element={<IbRequests />} />
        <Route path="copy-trade" element={<CopyTrade />} />
        <Route path="copy-request" element={<CopyRequest />} />
        <Route path="unsub-copy-request" element={<UnsubCopyRequest />} />
        <Route path="plans" element={<Plans />} />
      </Route>
    </Routes>
  );
};

export default App;