import {
  CalendarDays,
  FileText,
  Building,
  MonitorDot,
  BadgeDollarSign,
  UserRound,
  Car,
} from "lucide-react";


const menuData: any = [
  {
    label: "menu",
    isTitle: true,
  },
  {
    id: "dashboard",
    label: "Dashboard",
    link: "/#",
    icon: <MonitorDot />,
  },
  {
    label: "Drivers",
    isTitle: true,
  },
  {
    id: "cars",
    label: "Manage Drivers",
    link: "/#",
    icon: <Car />,
  },

  {
    label: "Financial",
    isTitle: true,
  },
  {
    id: "Sales",
    label: "Sales",
    icon: <BadgeDollarSign />,
    link: "#",
    parentId: 2,
  },
  {
    id: "expenses",
    label: "Expenses",
    icon: <BadgeDollarSign />,
    link: "#",
    parentId: 2,
  },
  {
    label: "Management",
    isTitle: true,
  },
  {
    id: "office-management",
    label: "Office Management",
    link: "/#",
    icon: <Building />,
    subItems: [
      {
        id: "expenses",
        label: "Expenses",
        link: "#",
        parentId: "office-management",
      },
      {
        id: "invoice",
        label: "Invoices",
        link: "#",
        parentId: "office-management",
      },
      {
        id: "profit-record",
        label: "Profit Record",
        link: "#",
        parentId: "office-management",
      },
    ],
  },

  {
    id: "renewals",
    label: "Renewals Management",
    icon: <FileText />,
    parentId: 2,
    subItems: [
      {
        id: "cars",
        label: "Cars",
        link: "#",
        parentId: "renewals",
      },
      {
        id: "drivers",
        label: "Drivers",
        link: "#",
        parentId: "renewals",
      },
      {
        id: "company-internals",
        label: "Company Internals",
        link: "#",
        parentId: "renewals",
      },
    ],
  },
  {
    id: "reports",
    label: "Report Management",
    icon: <FileText />,
    parentId: 2,
  },
  {
    label: "Users",
    isTitle: true,
  },
  {
    id: "users",
    label: "Users",
    icon: <UserRound />,
    parentId: 2,
  },
];

export { menuData };