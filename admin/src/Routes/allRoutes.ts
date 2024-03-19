import Dashboard from "pages/Dashboard/Analytics";
import Deposits from "pages/Deposits/Deposits";
import Withdrawals from "pages/Withdrawals/Withdrawals";
import BalanceTransferPage from "pages/BalanceTransfer";
import Referral from "pages/Referrals";
import Transactions from "pages/Transactions";
import UsersTable from "pages/Users/ListView";
import Support from "pages/Support/Support";
import Deposit from "pages/Deposits/Deposit";
import Withdrawal from "pages/Withdrawals/Withdrawal";

import UserProfile from "pages/UserProfile";
import Login from "pages/Authentication/Login";
import Logout from "pages/Authentication/LogOut";

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

  // Withdrawal
  { path: "/withdrawals/:id", component: Withdrawal },

  // Referral
  { path: "/referral", component: Referral },

  // Transactions
  { path: "/transactions", component: Transactions },

  // Accounts
  { path: "/users", component: UsersTable },

  // Support
  { path: "/support", component: Support },
  
  // profile
  { path: "/user-profile", component: UserProfile },
];

const publicRoutes = [
  // authentication
  { path: "/login", component: Login },
  { path: "/logout", component: Logout },
];

export { authProtectedRoutes, publicRoutes };