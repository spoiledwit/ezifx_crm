import axios from "axios";
import { Dropdown } from "Common/Components/Dropdown";
import { AccountsStatsData } from "Common/data";
import filterDataBySearch from "Common/filterDataBySearch";
import TableContainer from "Common/TableContainer";
import {
  CheckCircle2,
  Eye,
  MoreHorizontal,
  Search,
  XCircle,
} from "lucide-react";
import React, { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const AccountsStatistics = ({
  data,
  setData,
  loading,
  setLoading,
  handleFetchAccounts,
}: {
  data: any;
  setData: any;
  loading: any;
  setLoading: any;
  handleFetchAccounts: any;
}) => {
  // Search Data
  const filterSearchData = (e: any) => {
    const search = e.target.value;
    const keysToSearch = ["accountId", "type"];
    // filterDataBySearch(AccountsStatsData, search, keysToSearch, setData);
  };

  const columns = useMemo(
    () => [
      {
        header: () => (
          <div className="flex items-center h-full">
            <input
              id="productsCheck1"
              className="size-4 cursor-pointer bg-white border border-slate-200 checked:bg-none dark:bg-zink-700 dark:border-zink-500 rounded-sm appearance-none arrow-none relative after:absolute after:content-['\eb7b'] after:top-0 after:left-0 after:font-remix after:leading-none after:opacity-0 checked:after:opacity-100 after:text-custom-500 checked:border-custom-500 dark:after:text-custom-500 dark:checked:border-custom-800"
              type="checkbox"
            />
          </div>
        ),
        accessorKey: "#",
        enableColumnFilter: false,
        enableSorting: true,
        cell: (cell: any) => (
          <>
            <div className="flex items-center h-full">
              <input
                id="productsCheck1"
                className="size-4 cursor-pointer bg-white border border-slate-200 checked:bg-none dark:bg-zink-700 dark:border-zink-500 rounded-sm appearance-none arrow-none relative after:absolute after:content-['\eb7b'] after:top-0 after:left-0 after:font-remix after:leading-none after:opacity-0 checked:after:opacity-100 after:text-custom-500 checked:border-custom-500 dark:after:text-custom-500 dark:checked:border-custom-800"
                type="checkbox"
              />
            </div>
          </>
        ),
      },
      {
        header: "Accounts",
        accessorKey: "accountId",
        enableColumnFilter: false,
        enableSorting: true,
        cell: (cell: any) => (
          <>
            <Link
              to={`/account/details/${cell.row.original._id}`}
              className="transition-all duration-150 ease-linear order_id text-custom-500 hover:text-custom-600"
            >
              {cell.getValue()}
            </Link>
          </>
        ),
      },
      {
        header: "Main Password",
        accessorKey: "mainPassword",
        enableColumnFilter: false,
        enableSorting: true,
      },
      {
        header: "Investor Password",
        accessorKey: "investorPassword",
        enableColumnFilter: false,
        enableSorting: true,
      },
      {
        header: "Type",
        accessorKey: "type",
        enableColumnFilter: false,
        enableSorting: true,
      },
      {
        header: "Server",
        accessorKey: "server",
        enableColumnFilter: false,
        enableSorting: true,
      },
      {
        header: "Balance",
        accessorKey: "balance",
        enableColumnFilter: false,
        enableSorting: true,
      },
      {
        header: "Equity",
        accessorKey: "equity",
        enableColumnFilter: false,
        enableSorting: true,
      },
      {
        header: "Live Status",
        accessorKey: "liveStatus",
        enableColumnFilter: false,
        enableSorting: true,
        cell: (cell: any) => (
          <>
            {cell.row.original.liveStatus === "Active" ? (
              <span className="inline-flex items-center px-2.5 py-0.5 text-xs font-medium rounded border bg-green-100 border-transparent text-green-500 dark:bg-green-500/20 dark:border-transparent">
                <CheckCircle2 className="size-3 ltr:mr-1 rtl:ml-1"></CheckCircle2>
                {cell.row.original.liveStatus}
              </span>
            ) : (
              <span className="inline-flex items-center px-2.5 py-0.5 text-xs font-medium rounded border bg-red-100 border-transparent text-red-500 dark:bg-red-500/20 dark:border-transparent">
                <XCircle className="size-3 ltr:mr-1 rtl:ml-1"></XCircle>
                {cell.row.original.liveStatus}
              </span>
            )}
          </>
        ),
      },
      {
        header: "Action",
        enableColumnFilter: false,
        enableSorting: true,
        cell: (cell: any) => (
          <Dropdown className="relative">
            <Dropdown.Trigger
              id="orderAction1"
              data-bs-toggle="dropdown"
              className="flex items-center justify-center size-[30px] p-0 text-slate-500 btn bg-slate-100 hover:text-white hover:bg-slate-600 focus:text-white focus:bg-slate-600 focus:ring focus:ring-slate-100 active:text-white active:bg-slate-600 active:ring active:ring-slate-100 dark:bg-slate-500/20 dark:text-slate-400 dark:hover:bg-slate-500 dark:hover:text-white dark:focus:bg-slate-500 dark:focus:text-white dark:active:bg-slate-500 dark:active:text-white dark:ring-slate-400/20"
            >
              <MoreHorizontal className="size-3" />
            </Dropdown.Trigger>
            <Dropdown.Content
              placement={cell.row.index ? "top-end" : "right-end"}
              className="absolute z-50 py-2 mt-1 ltr:text-left rtl:text-right list-none bg-white rounded-md shadow-md min-w-[10rem] dark:bg-zink-600"
              aria-labelledby="orderAction1"
            >
              <li>
                <Link
                  to={`/account/details/${cell.row.original._id}`}
                  className="block px-4 py-1.5 text-base transition-all duration-200 ease-linear text-slate-600 hover:bg-slate-100 hover:text-slate-500 focus:bg-slate-100 focus:text-slate-500 dark:text-zink-100 dark:hover:bg-zink-500 dark:hover:text-zink-200 dark:focus:bg-zink-500 dark:focus:text-zink-200"
                >
                  <Eye className="inline-block size-3 ltr:mr-1 rtl:ml-1" />{" "}
                  <span className="align-middle">Overview</span>
                </Link>
              </li>
            </Dropdown.Content>
          </Dropdown>
        ),
      },
    ],
    []
  );
  return (
    <React.Fragment>
      <div className="order-11 col-span-12 2xl:order-1 card 2xl:col-span-12">
        <div className="card-body">
          <div className="grid items-center grid-cols-1 gap-3 mb-5 xl:grid-cols-12">
            <div className="xl:col-span-3">
              <h6 className="text-15">Accounts Statistics</h6>
            </div>
            <div className="xl:col-span-3 xl:col-start-10">
              <div className="flex gap-3">
                <div className="relative grow">
                  <input
                    type="text"
                    className="ltr:pl-8 rtl:pr-8 search form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200"
                    placeholder="Search for ..."
                    autoComplete="off"
                    onChange={(e) => filterSearchData(e)}
                  />
                  <Search className="inline-block size-4 absolute ltr:left-2.5 rtl:right-2.5 top-2.5 text-slate-500 dark:text-zink-200 fill-slate-100 dark:fill-zink-600"></Search>
                </div>
                <button
                  type="button"
                  className="bg-white border-dashed text-custom-500 btn border-custom-500 hover:text-custom-500 hover:bg-custom-50 hover:border-custom-600 focus:text-custom-600 focus:bg-custom-50 focus:border-custom-600 active:text-custom-600 active:bg-custom-50 active:border-custom-600 dark:bg-zink-700 dark:ring-custom-400/20 dark:hover:bg-custom-800/20 dark:focus:bg-custom-800/20 dark:active:bg-custom-800/20"
                >
                  <i className="align-baseline ltr:pr-1 rtl:pl-1 ri-download-2-line"></i>{" "}
                  Export
                </button>
              </div>
            </div>
          </div>
          <TableContainer
            isPagination={true}
            columns={columns || []}
            data={data || []}
            customPageSize={10}
            divclassName="-mx-5 overflow-x-auto"
            tableclassName="w-full whitespace-nowrap"
            theadclassName="ltr:text-left rtl:text-right bg-slate-100 text-slate-500 dark:text-zink-200 dark:bg-zink-600"
            thclassName="px-3.5 py-2.5 first:pl-5 last:pr-5 font-semibold border-y border-slate-200 dark:border-zink-500 w-10"
            tdclassName="px-3.5 py-2.5 first:pl-5 last:pr-5 border-y border-slate-200 dark:border-zink-500"
            PaginationClassName="flex flex-col items-center mt-5 md:flex-row"
          />
        </div>
      </div>
    </React.Fragment>
  );
};

export default AccountsStatistics;
