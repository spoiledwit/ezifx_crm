import Accounts from "pages/Accounts";
import BalanceTransferPage from "pages/BalanceTransfer";
import Dashboard from "pages/Dashboard/Analytics";
import Deposit from "pages/Deposits/Deposit";
import Deposits from "pages/Deposits/Deposits";
import Referral from "pages/Referrals";
import Support from "pages/Support/Support";
import Transactions from "pages/Transactions";
import Withdrawals from "pages/Withdrawals/Withdrawals";

import AccountDetails from "pages/Accounts/AccountDetails";
import ForgotPassword from "pages/Authentication/ForgotPassword";
import Login from "pages/Authentication/Login";
import Logout from "pages/Authentication/LogOut";
import Register from "pages/Authentication/Register";
import ResetPassword from "pages/Authentication/ResetPassword";
import SupportDetails from "pages/Support/SupportDetails";
import UserProfile from "pages/UserProfile";
import WithdrawalDetails from "pages/Withdrawals/WithdrawalDetails";

interface RouteObject {
  path: string;
  component: React.ComponentType<any>;
  exact?: boolean;
}

let authProtectedRoutes: Array<RouteObject> = [

  // Dashboard
  { path: "/", component: Dashboard },

  { path: "/dashboard", component: Dashboard },

  // Deposits
  { path: "/deposits", component: Deposits },

  // Deposit
  { path: "/deposits/:id", component: Deposit },

  // Withdrawals
  { path: "/withdrawals", component: Withdrawals },
  { path: "/withdrawal-details/:id", component: WithdrawalDetails },

  // Balance Transfer
  { path: "/balance-transfer", component: BalanceTransferPage },

  // Referral
  { path: "/referral", component: Referral },

  // Transactions
  { path: "/transactions", component: Transactions },

  // Accounts
  { path: "/accounts", component: Accounts },
  { path: "/account/:id", component: AccountDetails },

  // Support
  { path: "/support", component: Support },
  { path: "/support/:id", component: SupportDetails },
  
  // profile
  { path: "/user-profile", component: UserProfile },
];

const publicRoutes = [
  // authentication
  { path: "/register", component: Register },
  { path: "/login", component: Login },
  { path: "/logout", component: Logout },
  { path: "/forgotPassword", component: ForgotPassword },
  { path: "/reset-password/:id/:token", component: ResetPassword },
];

export { authProtectedRoutes, publicRoutes };

