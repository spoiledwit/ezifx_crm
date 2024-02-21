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
      sections: [],
      icon: <MdSpaceDashboard />,
    },
    {
      title: "IB Requests",
      slug: "/ib-requests",
      sections: [],
      icon: <FaUserFriends />,
    },
    {
      title: "Copy Trade",
      slug: "/copy-trade",
      sections: [],
      icon: <RxDashboard />,
    },
    {
      title: "Copy Request",
      slug: "/copy-request",
      sections: [],
      icon: <BiDetail size={20} />,
    },
    {
      title: "Unsub Copy Request",
      sections: [],
      slug: "/unsub-copy-request",
      icon: <BiDetail size={20} />,
    },
    {
      title: "Commission Levels",
      sections: [],
      slug: "/commission-levels",
      icon: <BiDetail size={20} />,
    },
    {
      title: "Plans",
      sections: [],
      slug: "/plans",
      icon: <BiDetail size={20} />,
    },
    {
      title: "Manage Pins",
      sections: [],
      slug: "/manage-pins",
      icon: <BiPin size={20} />,
    },
    {
      title: "Manage Users",
      slug: "",
      sections: [
        {
          title: "Active Users",
          slug: "/active-users",

        },
        {
          title: "Banned Users",
          slug: "/banned-users",

        },
        {
          title: "Email Unverified",
          slug: "/email-unverified",

        },
        {
          title: "Mobile Unverified",
          slug: "/mobile-unverified",

        },
        {
          title: "KYC Unverified",
          slug: "/kyc-unverified",

        },
        {
          title: "KYC Pending",
          slug: "/kyc-pending",

        },
        {
          title: "With Balance",
          slug: "/with-balance",

        },
        {
          title: "Paid Users",
          slug: "/paid-users",

        },
        {
          title: "All Users",
          slug: "/all-users",

        },
        // {
        //   title: "Notification to All",
        //   slug: "/notification-to-all",

        // },
      ],
      icon: <RxDashboard />,
    },
    {
      title: "Payment Gateways",
      slug: "/payment-gateways",
      sections: [],
      icon: <RxDashboard />,
    },
    {
      title: "Deposits",
      sections: [
        {
          title: "Pending Deposits",
          slug: "/pending-deposits",

        },
        {
          title: "Approved Deposits",
          slug: "/approved-deposits",

        },
        {
          title: "Successful Deposits",
          slug: "/successful-deposits",

        },
        {
          title: "Rejected Deposits",
          slug: "/rejected-deposits",

        },
        {
          title: "Initiated Deposits",
          slug: "/initiated-deposits",

        },
        {
          title: "All Deposits",
          slug: "/all-deposits",

        },

      ],
      slug: "",
      icon: <RxDashboard />,
    },
    {
      title: "Withdrawals",
      sections: [
        {
          title: "Pending Withdrawals",
          slug: "/pending-withdrawals",

        },
        {
          title: "Approved Withdrawals",
          slug: "/approved-withdrawals",

        },
        {
          title: "Rejected Withdrawals",
          slug: "/rejected-withdrawals",

        },
        {
          title: "Withdrawal Methods",
          slug: "/withdrawal-methods",

        },
        {
          title: "All Withdrawals",
          slug: "/all-withdrawals",

        },

      ],
      slug: "",
      icon: <RxDashboard />,
    },
    {
      title: "Support Ticket",
      sections: [
        {
          title: "Pending Tickets",
          slug: "/pending-tickets",

        },
        {
          title: "Answered Tickets",
          slug: "/answered-tickets",

        },
        {
          title: "Closed Tickets",
          slug: "/closed-tickets",

        },
        {
          title: "All Tickets",
          slug: "/all-tickets",

        },

      ],
      slug: "",
      icon: <RxDashboard />,
    },
    {
      title: "Report",
      sections: [],
      slug: "/report",
      icon: <RxDashboard />,
    },
    {
      title: "Subscribers",
      slug: "/subscribers",
      sections: [],
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
