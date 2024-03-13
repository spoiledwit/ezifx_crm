import Dashboard from "pages/Dashboard/Analytics";
import Deposits from "pages/Deposits/Deposits";
import Withdrawals from "pages/Withdrawals/Withdrawals";
import BalanceTransferPage from "pages/BalanceTransfer";

import UserProfile from "pages/Authentication/UserProfile";
import Login from "pages/Authentication/Login";
import Logout from "pages/Authentication/LogOut";
import Register from "pages/Authentication/Register";

interface RouteObject {
  path: string;
  component: React.ComponentType<any>;
  exact?: boolean;
}

const authProtectedRoutes: Array<RouteObject> = [
  // Dashboard
  { path: "/", component: Dashboard },
  { path: "/dashboard", component: Dashboard },

  // Deposits
  { path: "/deposits", component: Deposits },

  // Withdrawals
  { path: "/withdrawals", component: Withdrawals },

  // Balance Transfer
  { path: "/balance-transfer", component: BalanceTransferPage },

  // profile
  { path: "/user-profile", component: UserProfile },
];

const publicRoutes = [
  // authentication
  { path: "/register", component: Register },
  { path: "/login", component: Login },
  { path: "/logout", component: Logout },
];

export { authProtectedRoutes, publicRoutes };