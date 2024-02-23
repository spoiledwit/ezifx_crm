import { MdSpaceDashboard } from "react-icons/md";
import { Link } from "react-router-dom";
import { FaUserFriends } from "react-icons/fa";
import { RxDashboard } from "react-icons/rx";
import { FaCss3 } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import { IoLogOut } from "react-icons/io5";
import { BiDetail } from "react-icons/bi";
import { logout } from "@/hooks/auth";
import './sidebar.css'
import { Button } from "../ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const SideBar = () => {
  const links = [
    {
      title: "Dashboard",
      slug: "/",
      sections: [
        {
          title: "Trade Accounts",
          slug: "/trade-accounts",

        },
        {
          title: "Demo Accounts",
          slug: "/demo-accounts",

        },
      ],
      icon: <MdSpaceDashboard />,
    },
    {
      title: "My Referrals",
      slug: "/my-referrals",
      sections: [],
      icon: <FaUserFriends />,
    },
    {
      title: "Deposit",
      slug: "/deposit",
      sections: [],
      icon: <RxDashboard />,
    },
    {
      title: "Withdraw",
      slug: "/Withdraw",
      sections: [],
      icon: <BiDetail size={20} />,
    },
    {
      title: "Balance Transfer",
      sections: [],
      slug: "/balance-transfer",
      icon: <BiDetail size={20} />,
    },
    {
      title: "Transactions",
      sections: [],
      slug: "/transactions",
      icon: <BiDetail size={20} />,
    },
    {
      title: "Support Tickets",
      sections: [],
      slug: "/support-tickets",
      icon: <BiDetail size={20} />,
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


  const pathname = useLocation().pathname;

  return (
    <div className="pb-20 h-screen w-full p-4 overflow-auto flex flex-col shadow-xl shadow-[#ffe5bb] bg-white dark:bg-[#1d1d1d] " id="sidebar">
      {links.map((link, index) => (
        <div
          key={index}
          className={`bg-[#e8a130] bg-opacity-0 rounded-lg md:p-4 p-2 cursor-pointer hover:bg-[#fff09e] dark:hover:bg-[#2d2d2d]  transition
          ${pathname === link.slug && "bg-gray-100"}
          `}
        >
          {/* <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>Is it accessible?</AccordionTrigger>
              <AccordionContent>
                Yes. It adheres to the WAI-ARIA design pattern.
              </AccordionContent>
            </AccordionItem>

          </Accordion> */}

          {
            link.sections?.length ?

              <Link to={link.slug} className="block w-full h-full">
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1" className="border-0">
                    <AccordionTrigger className="p-0">
                      <div className="flex items-center space-x-4">
                        <div className="text-white bg-[#F5AE39] p-2 text-xl rounded-xl font-semibold">
                          {link.icon}
                        </div>
                        <div className="text-black dark:text-white md:block hidden font-normal text-[16px]">{link.title}</div>
                      </div>
                    </AccordionTrigger>
                    {
                      link.sections?.map((section) => (
                        <Link to={section.slug} >
                          <AccordionContent className=" text-white pl-14  mt-2 text-[16px] hover:bg-dark rounded py-3 " >
                            {section.title}
                          </AccordionContent>
                        </Link>
                      ))
                    }
                  </AccordionItem>
                </Accordion>
              </Link>
              :
              <Link to={link.slug} className="block w-full h-full">
                <div className="flex items-center space-x-4">
                  <div className="text-white bg-[#F5AE39] p-2 text-xl rounded-xl font-semibold">
                    {link.icon}
                  </div>
                  <div className="text-black dark:text-white md:block hidden ">{link.title}</div>
                </div>
              </Link>
          }

        </div>
      ))
      }
      <p className="font-semibold p-4 text-black dark:text-white">Settings</p>
      {
        settings.map((link, index) => (
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
        ))
      }
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
    </div >
  );
};

export default SideBar;
