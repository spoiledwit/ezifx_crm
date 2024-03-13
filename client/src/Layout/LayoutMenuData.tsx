import {
  Users,
  Activity,
  AlertTriangle,
  Archive,
  ArrowDown,
  ArrowRight,
  ArrowUp,
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
    label: "Account",
    isTitle: true,
  },
  {
    id: "accounts",
    label: "Accounts",
    link: "/accounts",
    icon: <Users />,
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
    id: "balanceTransfer",
    label: "Balance Transfer",
    icon: <ArrowRight />,
    link: "/balance-transfer",
    parentId: 2,
  },
  {
    id: "refferral",
    label: "Refferral",
    icon: <Users />,
    link: "#",
    parentId: 2,
  },
  {
    id: "Transactions",
    label: "Transactions",
    link: "/#",
    icon: <Archive />,
  },
  {
    label: "Support",
    isTitle: true,
  },
  {
    id: "supportTickets",
    label: "Support Tickets",
    link: "/#",
    icon: <AlertTriangle />,
  },
];

export { menuData };
