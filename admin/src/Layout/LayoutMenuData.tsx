import {
  Activity,
  AlertTriangle,
  Archive,
  ArrowDown,
  CandlestickChart,
  ArrowUp,
  ShieldCheck,
  Users,
} from "lucide-react";

const menuData: any = [
  {
    label: "menu",
    isTitle: true,
  },
  {
    id: "Dashboard",
    label: "Dashboard",
    link: "/#",
    icon: <Activity />,
  },
  {
    label: "Users",
    isTitle: true,
  },
  {
    id: "accounts",
    label: "Users",
    link: "/users",
    icon: <Users />,
  },
  {
    id: "kyc",
    label: "KYC Requests",
    link: "/kycs",
    icon: <ShieldCheck />,
  },
  {
    id: "accounts-list",
    label: "Accounts",
    link: "/accounts",
    icon: <CandlestickChart />,
  },
  {
    label: "Trade",
    isTitle: true,
  },
  {
    id: "deposit",
    label: "Deposit",
    link: "/deposits",
    icon: <ArrowDown />,
  },
  {
    id: "withdrawal",
    label: "Withdrawal",
    icon: <ArrowUp />,
    link: "/withdrawals",
    parentId: 2,
  },
 
  {
    id: "referral",
    label: "Referral",
    icon: <Users />,
    link: "/referral",
    parentId: 2,
  },
  {
    id: "Transactions",
    label: "Admin Transactions",
    link: "/transactions",
    icon: <Archive />,
  },
  {
    label: "Support",
    isTitle: true,
  },
  {
    id: "supportTickets",
    label: "Support Tickets",
    link: "/support",
    icon: <AlertTriangle />,
  },
];

export { menuData };

