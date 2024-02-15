import { MdSpaceDashboard } from "react-icons/md";
import { Link } from "react-router-dom";
import { FaUserFriends } from "react-icons/fa";
import { RxDashboard } from "react-icons/rx";
import { FaCss3 } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import { IoLogOut } from "react-icons/io5";
import { BiDetail, BiPin, BiBug } from "react-icons/bi";
import { logout } from "@/hooks/auth";
import './sidebar.css'
import { Button } from "../ui/button";

const SideBar = () => {
  const links = [
    {
      title: "Dashboard",
      slug: "/",
      icon: <MdSpaceDashboard />,
    },
    {
      title: "IB Requests",
      slug: "/ib-requests",
      icon: <FaUserFriends />,
    },
    {
      title: "Copy Trade",
      slug: "/copy-trade",
      icon: <RxDashboard />,
    },
    {
      title: "Copy Request",
      slug: "/copy-request",
      icon: <BiDetail size={20} />,
    },
    {
      title: "Unsub Copy Request",
      slug: "/unsub-copy-request",
      icon: <BiDetail size={20} />,
    },
    {
      title: "Commission Levels",
      slug: "/commission-levels",
      icon: <BiDetail size={20} />,
    },
    {
      title: "Plans",
      slug: "/plans",
      icon: <BiDetail size={20} />,
    },
    {
      title: "Manage Pins",
      slug: "/manage-pins",
      icon: <BiPin size={20} />,
    },
    {
      title: "Manage Users",
      slug: "/manage-users",
      icon: <RxDashboard />,
    },
    {
      title: "Payment Gateways",
      slug: "/payment-gateways",
      icon: <RxDashboard />,
    },
    {
      title: "Deposits",
      slug: "/deposits",
      icon: <RxDashboard />,
    },
    {
      title: "Withdrawals",
      slug: "/withdrawals",
      icon: <RxDashboard />,
    },
    {
      title: "Support Ticket",
      slug: "/support-ticket",
      icon: <RxDashboard />,
    },
    {
      title: "Report",
      slug: "/report",
      icon: <RxDashboard />,
    },
    {
      title: "Subscribers",
      slug: "/subscribers",
      icon: <RxDashboard />,
    },
  ];

  const settings = [
    {
      title: "General Setting",
      slug: "/general-setting",
      icon: <MdSpaceDashboard />,
    },
    {
      title: "System Configuration",
      slug: "/system-configuration",
      icon: <FaUserFriends />,
    },
    {
      title: "Cron Job Setting",
      slug: "/copy-trade",
      icon: <RxDashboard />,
    },
    {
      title: "Matching Bonus",
      slug: "/copy-request",
      icon: <RxDashboard />,
    },
    {
      title: "Logo & Favicon",
      slug: "/unsub-copy-request",
      icon: <RxDashboard />,
    },
    {
      title: "Extensions",
      slug: "/commission-levels",
      icon: <RxDashboard />,
    },
    {
      title: "Language",
      slug: "/plans",
      icon: <RxDashboard />,
    },
    {
      title: "SEO Manager",
      slug: "/manage-pins",
      icon: <RxDashboard />,
    },
    {
      title: "KYC Setting",
      slug: "/manage-users",
      icon: <RxDashboard />,
    },
    {
      title: "Notification Setting",
      slug: "/payment-gateways",
      icon: <RxDashboard />,
    },
  ];

  const frontendManager = [
    {
      title: "Manage Templates",
      slug: "/manage-tempaltes",
      icon: <MdSpaceDashboard />,
    },
    {
      title: "Manage Pages",
      slug: "/manage-pages",
      icon: <FaUserFriends />,
    },
    {
      title: "Manage Section",
      slug: "/manage-section",
      icon: <RxDashboard />,
    },
  ];

  const extra = [
    {
      title: "Maintenance Mode",
      slug: "/maintenance-mode",
      icon: <MdSpaceDashboard />,
    },
    {
      title: "GDPR Cookie",
      slug: "/gdpr-cookie",
      icon: <FaUserFriends />,
    },
    {
      title: "Sytem",
      slug: "/system",
      icon: <RxDashboard />,
    },
    {
      title: "Custom CSS",
      slug: "/custom-css",
      icon: <FaCss3 />,
    },
    {
      title: "Report & Request",
      slug: "/report-request",
      icon: <BiBug size={20} />,
    },
  ];
  const pathname = useLocation().pathname;

  return (
    <div className="pb-20 h-screen w-full p-4 overflow-auto flex flex-col shadow-xl shadow-[#ffe5bb] bg-white dark:bg-[#1d1d1d] " id="sidebar">
      {links.map((link, index) => (
        <div
          key={index}
          className={`bg-[#e8a130] bg-opacity-0 rounded-lg md:p-4 p-2 cursor-pointer hover:bg-[#e8a130] hover:bg-opacity-20 dark:hover:bg-[#2d2d2d]  transition
          ${pathname === link.slug && "bg-gray-100"}
          `}
        >
          <Link to={link.slug} className="block w-full h-full">
            <div className="flex items-center space-x-4">
              <div className="text-white bg-[#F5AE39] p-2 text-xl rounded-xl font-semibold">
                {link.icon}
              </div>
              <div className="text-black dark:text-white md:block hidden ">{link.title}</div>
            </div>
          </Link>
        </div>
      ))}
      <p className="font-semibold p-4 text-black dark:text-white">Settings</p>
      {settings.map((link, index) => (
        <div
          key={index}
          className={`bg-[#e8a130] bg-opacity-0 rounded-lg md:p-4 p-2 cursor-pointer hover:bg-[#fff09e]  dark:hover:bg-[#2d2d2d] transition
          ${pathname === link.slug && "bg-gray-100"}
          `}
        >
          <Link to={link.slug} className="block w-full h-full">
            <div className="flex items-center space-x-4">
              <div className="text-white bg-[#F5AE39] p-2 text-xl rounded-xl font-semibold">
                {link.icon}
              </div>
              <div className="text-black dark:text-white md:block hidden">{link.title}</div>
            </div>
          </Link>
        </div>
      ))}
      <p className="font-semibold p-4  text-black dark:text-white">Frontend Manager</p>
      {frontendManager.map((link, index) => (
        <div
          key={index}
          className={`bg-[#e8a130] bg-opacity-0 rounded-lg md:p-4 p-2 cursor-pointer hover:bg-[#fff09e] dark:hover:bg-[#2d2d2d] transition
          ${pathname === link.slug && "bg-gray-100"}
          `}
        >
          <Link to={link.slug} className="block w-full h-full">
            <div className="flex items-center space-x-4">
              <div className="text-white bg-[#F5AE39] p-2 text-xl rounded-xl font-semibold">
                {link.icon}
              </div>
              <div className="text-black dark:text-white md:block hidden">{link.title}</div>
            </div>
          </Link>
        </div>
      ))}
      <p className="font-semibold p-4 text-black dark:text-white">Extra</p>
      {extra.map((link, index) => (
        <div
          key={index}
          className={`bg-[#e8a130] bg-opacity-0 rounded-lg md:p-4 p-2 cursor-pointer hover:bg-[#fff09e] dark:hover:bg-[#2d2d2d] transition
          ${pathname === link.slug && "bg-gray-100"}
          `}
        >
          <Link to={link.slug} className="block w-full h-full">
            <div className="flex items-center space-x-4">
              <div className="text-white bg-[#F5AE39] p-2 text-xl rounded-xl font-semibold">
                {link.icon}
              </div>
              <div className="text-black dark:text-white md:block hidden">{link.title}</div>
            </div>
          </Link>
        </div>
      ))}
      <Button
        onClick={() => logout()}
        className="w-full bg-[#F5AE39] hover:bg-[#e8a130] dark:bg-[#f5ae39] dark:hover:bg-[#e8a130] h-10 mt-5 mb-6 flex md:gap-2 items-center justify-center">
        <p
          className="md:block hidden text-white font-semibold"
        >
          Logout
        </p>
        <IoLogOut className="text-white text-xl" />
      </Button>
    </div>
  );
};

export default SideBar;
