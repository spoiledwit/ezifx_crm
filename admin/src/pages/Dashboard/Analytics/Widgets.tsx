import React from "react";
import {
  Kanban,
  ArrowDown,
  ArrowUp,
  Users,
} from "lucide-react";
import axios from "axios";
import { useEffect, useState } from "react";
import CountUp from "react-countup";
import toast from "react-hot-toast";

const Widgets = () => {
  const [data, setData] = useState({
    totalUsers: 0,
    activeUsers: 0,
    emailUnverifiedUsers: 0,
    nonKYCUsers: 0,
    totalDeposit: 0,
    pendingDeposit: 0,
    rejectedDeposit: 0,
    depositedCharge: 0,
    totalWithdrawal: 0,
    pendingWithdrawal: 0,
    rejectedWithdrawal: 0,
    withdrawalCharge: 0,
  });

  useEffect(() => {
    handleGetStats();
  }, []);

  const handleGetStats = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URI}/stats/adminStats`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const {
        totalUsers,
        activeUsers,
        emailUnverifiedUsers,
        nonKYCUsers,
        totalDeposit,
        pendingDeposit,
        rejectedDeposit,
        depositedCharge,
        totalWithdrawal,
        pendingWithdrawal,
        rejectedWithdrawal,
        withdrawalCharge,
      } = response.data;
      setData({
        totalUsers,
        activeUsers,
        emailUnverifiedUsers,
        totalDeposit,
        pendingDeposit,
        rejectedDeposit,
        nonKYCUsers,
        depositedCharge,
        totalWithdrawal,
        pendingWithdrawal,
        rejectedWithdrawal,
        withdrawalCharge,
      });
    } catch (error: any) {
      if (!error.response) {
        return toast.error("Network error. Please try again.");
      }
      if (typeof error.response.data === "string") {
        return toast.error(error.response.data);
      }
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <React.Fragment>
      <div className="order-1 md:col-span-6 lg:col-span-3 col-span-12 2xl:order-1 bg-purple-100 dark:bg-purple-500/20 card 2xl:col-span-2 group-data-[skin=bordered]:border-purple-500/20 relative overflow-hidden">
        <div className="card-body">
          <Kanban className="absolute top-0 size-32 stroke-1 text-purple-200/50 dark:text-purple-500/20 ltr:-right-10 rtl:-left-10"></Kanban>
          <div className="flex items-center justify-center size-12 bg-purple-500 rounded-md text-15 text-purple-50">
            <Users />
          </div>
          <h5 className="mt-5 mb-2">
            <CountUp end={data.totalUsers} className="counter-value" />
          </h5>
          <p className="text-slate-500 dark:text-slate-200">Total Users</p>
        </div>
      </div>
      <div className="order-2 md:col-span-6 lg:col-span-3 col-span-12 2xl:order-1 bg-green-100 dark:bg-green-500/20 card 2xl:col-span-2 group-data-[skin=bordered]:border-purple-500/20 relative overflow-hidden">
        <div className="card-body">
          <Kanban className="absolute top-0 size-32 stroke-1 text-green-200/50 dark:text-green-500/20 ltr:-right-10 rtl:-left-10"></Kanban>
          <div className="flex items-center justify-center size-12 bg-green-500 rounded-md text-15 text-green-50">
            <Users />
          </div>
          <h5 className="mt-5 mb-2">
            <CountUp end={data.activeUsers} className="counter-value" />
          </h5>
          <p className="text-slate-500 dark:text-slate-200">Active Users</p>
        </div>
      </div>
      <div className="order-2 md:col-span-6 lg:col-span-3 col-span-12 2xl:order-1 bg-orange-100 dark:bg-orange-500/20 card 2xl:col-span-2 group-data-[skin=bordered]:border-purple-500/20 relative overflow-hidden">
        <div className="card-body">
          <Kanban className="absolute top-0 size-32 stroke-1 text-orange-200/50 dark:text-orange-500/20 ltr:-right-10 rtl:-left-10"></Kanban>
          <div className="flex items-center justify-center size-12 bg-orange-500 rounded-md text-15 text-orange-50">
            <Users />
          </div>
          <h5 className="mt-5 mb-2">
            <CountUp end={data.nonKYCUsers} className="counter-value" />
          </h5>
          <p className="text-slate-500 dark:text-slate-200">Non KYC Users</p>
        </div>
      </div>
      <div className="order-2 md:col-span-6 lg:col-span-3 col-span-12 2xl:order-1 bg-orange-100 dark:bg-orange-500/20 card 2xl:col-span-2 group-data-[skin=bordered]:border-purple-500/20 relative overflow-hidden">
        <div className="card-body">
          <Kanban className="absolute top-0 size-32 stroke-1 text-orange-200/50 dark:text-orange-500/20 ltr:-right-10 rtl:-left-10"></Kanban>
          <div className="flex items-center justify-center size-12 bg-orange-500 rounded-md text-15 text-orange-50">
            <Users />
          </div>
          <h5 className="mt-5 mb-2">
            <CountUp
              end={data.emailUnverifiedUsers}
              className="counter-value"
            />
          </h5>
          <p className="text-slate-500 dark:text-slate-200">
            Email Unverified Users
          </p>
        </div>
      </div>

      <div className="order-3 md:col-span-6 lg:col-span-3 col-span-12 2xl:order-1 bg-purple-100 dark:bg-purple-500/20 card 2xl:col-span-2 group-data-[skin=bordered]:border-purple-500/20 relative overflow-hidden">
        <div className="card-body">
          <Kanban className="absolute top-0 size-32 stroke-1 text-purple-200/50 dark:text-purple-500/20 ltr:-right-10 rtl:-left-10"></Kanban>
          <div className="flex items-center justify-center size-12 bg-purple-500 rounded-md text-15 text-purple-50">
            <ArrowDown />
          </div>
          <h5 className="mt-5 mb-2">
            <CountUp end={data.totalDeposit} className="counter-value" />$
          </h5>
          <p className="text-slate-500 dark:text-slate-200">Total Deposit</p>
        </div>
      </div>
      <div className="order-3 md:col-span-6 lg:col-span-3 col-span-12 2xl:order-1 bg-orange-100 dark:bg-orange-500/20 card 2xl:col-span-2 group-data-[skin=bordered]:border-orange-500/20 relative overflow-hidden">
        <div className="card-body">
          <Kanban className="absolute top-0 size-32 stroke-1 text-orange-200/50 dark:text-orange-500/20 ltr:-right-10 rtl:-left-10"></Kanban>
          <div className="flex items-center justify-center size-12 bg-orange-500 rounded-md text-15 text-orange-50">
            <ArrowDown />
          </div>
          <h5 className="mt-5 mb-2">
            <CountUp end={data.pendingDeposit} className="counter-value" />$
          </h5>
          <p className="text-slate-500 dark:text-slate-200">Pending Deposit</p>
        </div>
      </div>
      <div className="order-3 md:col-span-6 lg:col-span-3 col-span-12 2xl:order-1 bg-red-100 dark:bg-red-500/20 card 2xl:col-span-2 group-data-[skin=bordered]:border-red-500/20 relative overflow-hidden">
        <div className="card-body">
          <Kanban className="absolute top-0 size-32 stroke-1 text-red-200/50 dark:text-red-500/20 ltr:-right-10 rtl:-left-10"></Kanban>
          <div className="flex items-center justify-center size-12 bg-red-500 rounded-md text-15 text-red-50">
            <ArrowDown />
          </div>
          <h5 className="mt-5 mb-2">
            <CountUp end={data.rejectedDeposit} className="counter-value" />$
          </h5>
          <p className="text-slate-500 dark:text-slate-200">Rejected Deposit</p>
        </div>
      </div>
      <div className="order-3 md:col-span-6 lg:col-span-3 col-span-12 2xl:order-1 bg-neutral-100 dark:bg-neutral-500/20 card 2xl:col-span-2 group-data-[skin=bordered]:border-purple-500/20 relative overflow-hidden">
        <div className="card-body">
          <Kanban className="absolute top-0 size-32 stroke-1 text-neutral-200/50 dark:text-neutral-500/20 ltr:-right-10 rtl:-left-10"></Kanban>
          <div className="flex items-center justify-center size-12 bg-neutral-500 rounded-md text-15 text-neutral-50">
            <ArrowDown />
          </div>
          <h5 className="mt-5 mb-2">
            <CountUp end={data.depositedCharge} className="counter-value" />$
          </h5>
          <p className="text-slate-500 dark:text-slate-200">Deposited Charge</p>
        </div>
      </div>

      <div className="order-3 md:col-span-6 lg:col-span-3 col-span-12 2xl:order-1 bg-purple-100 dark:bg-purple-500/20 card 2xl:col-span-2 group-data-[skin=bordered]:border-purple-500/20 relative overflow-hidden">
        <div className="card-body">
          <Kanban className="absolute top-0 size-32 stroke-1 text-purple-200/50 dark:text-purple-500/20 ltr:-right-10 rtl:-left-10"></Kanban>
          <div className="flex items-center justify-center size-12 bg-purple-500 rounded-md text-15 text-purple-50">
            <ArrowUp />
          </div>
          <h5 className="mt-5 mb-2">
            <CountUp end={data.totalWithdrawal} className="counter-value" />$
          </h5>
          <p className="text-slate-500 dark:text-slate-200">Total Withdrawal</p>
        </div>
      </div>
      <div className="order-3 md:col-span-6 lg:col-span-3 col-span-12 2xl:order-1 bg-orange-100 dark:bg-orange-500/20 card 2xl:col-span-2 group-data-[skin=bordered]:border-orange-500/20 relative overflow-hidden">
        <div className="card-body">
          <Kanban className="absolute top-0 size-32 stroke-1 text-orange-200/50 dark:text-orange-500/20 ltr:-right-10 rtl:-left-10"></Kanban>
          <div className="flex items-center justify-center size-12 bg-orange-500 rounded-md text-15 text-orange-50">
            <ArrowUp />
          </div>
          <h5 className="mt-5 mb-2">
            <CountUp end={data.pendingWithdrawal} className="counter-value" />$
          </h5>
          <p className="text-slate-500 dark:text-slate-200">
            Pending Withdrawal
          </p>
        </div>
      </div>
      <div className="order-3 md:col-span-6 lg:col-span-3 col-span-12 2xl:order-1 bg-red-100 dark:bg-red-500/20 card 2xl:col-span-2 group-data-[skin=bordered]:border-red-500/20 relative overflow-hidden">
        <div className="card-body">
          <Kanban className="absolute top-0 size-32 stroke-1 text-red-200/50 dark:text-red-500/20 ltr:-right-10 rtl:-left-10"></Kanban>
          <div className="flex items-center justify-center size-12 bg-red-500 rounded-md text-15 text-red-50">
            <ArrowUp />
          </div>
          <h5 className="mt-5 mb-2">
            <CountUp end={data.rejectedWithdrawal} className="counter-value" />$
          </h5>
          <p className="text-slate-500 dark:text-slate-200">
            Rejected Withdrawal
          </p>
        </div>
      </div>
      <div className="order-3 md:col-span-6 lg:col-span-3 col-span-12 2xl:order-1 bg-neutral-100 dark:bg-neutral-500/20 card 2xl:col-span-2 group-data-[skin=bordered]:border-purple-500/20 relative overflow-hidden">
        <div className="card-body">
          <Kanban className="absolute top-0 size-32 stroke-1 text-neutral-200/50 dark:text-neutral-500/20 ltr:-right-10 rtl:-left-10"></Kanban>
          <div className="flex items-center justify-center size-12 bg-neutral-500 rounded-md text-15 text-neutral-50">
            <ArrowUp />
          </div>
          <h5 className="mt-5 mb-2">
            <CountUp end={data.withdrawalCharge} className="counter-value" />$
          </h5>
          <p className="text-slate-500 dark:text-slate-200">
            Withdrawal Charge
          </p>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Widgets;