import BalanceTransferPage from "pages/BalanceTransfer";
import Dashboard from "pages/Dashboard/Analytics";
import Deposit from "pages/Deposits/Deposit";
import Deposits from "pages/Deposits/Deposits";
import Referral from "pages/Referrals";
import Support from "pages/Support/Support";
import Transactions from "pages/Transactions";
import UsersTable from "pages/Users/ListView";
import Withdrawal from "pages/Withdrawals/Withdrawal";
import Withdrawals from "pages/Withdrawals/Withdrawals";

import AccountList from "pages/Account/AccountList";
import AccountDetails from "pages/Accounts/AccountDetails";
import Login from "pages/Authentication/Login";
import Logout from "pages/Authentication/LogOut";
import SupportDetails from "pages/Support/SupportDetails";
import UserProfile from "pages/UserProfile";
import UserDetails from "pages/Users/UserDetails";

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
  
  { path: "/accounts", component: AccountList },
  { path: "/account/details/:id", component: AccountDetails },

  // get UserId
  { path: "/user-details/:id", component: UserDetails },

  // Support
  { path: "/support", component: Support },
  { path: "/support/:id", component: SupportDetails },
  
  // profile
  { path: "/user-profile", component: UserProfile },
];

const publicRoutes = [
  // authentication
  { path: "/login", component: Login },
  { path: "/logout", component: Logout },
];

export { authProtectedRoutes, publicRoutes };

