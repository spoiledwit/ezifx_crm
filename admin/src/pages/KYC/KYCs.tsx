import BreadCrumb from "Common/BreadCrumb";
import PhotosUploader from "components/Forms/ImageUploader";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import CountUp from "react-countup";
import { toast } from "react-hot-toast";
import { useAuthStore } from "store/useAuthStore";
import moment from "moment";
import AnimationButton from "components/UIElement/UiButtons/AnimationButton";

// icons
import TableContainer from "Common/TableContainer";
import {
  ShieldCheck,
  Loader,
  Shield,
  ShieldXIcon,
  MoreHorizontal,
  Search,
} from "lucide-react";
import { Link } from "react-router-dom";

import { Dropdown } from "Common/Components/Dropdown";

// Formik
import axios from "axios";
import { ToastContainer } from "react-toastify";

const Kycs = () => {
  const { user } = useAuthStore();
  const [loading, setLoading] = useState<boolean>(false);
  const [dataList, setDataList] = useState<any>([]);
  const [data, setData] = useState<any>([]);
  const [approving, setApproving] = useState<boolean>(false);
  const [rejecting, setRejecting] = useState<boolean>(false);
  const [show, setShow] = useState<boolean>(false);

  useEffect(() => {
    handleGetKycs();
  }, []);

  const handleGetKycs = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${process.env.REACT_APP_BASE_URI}/kyc/all`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setDataList(res.data);
      setData(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const getKycNumberByStatus = (status: string) => {
    let total = 0;
    if (status === "all") {
      return dataList.length;
    }
    dataList.forEach((Kyc: any) => {
      if (Kyc.kycStatus === status) {
        total++;
      }
    });
    return total;
  };

  // Search Data
  const filterSearchData = (e: any) => {
    const search = e.target.value;
    const keysToSearch = ["_id", "userId._id", "userId.name", "identityType"];
    const searchResult = dataList.filter((item: any) => {
      return keysToSearch.some((key) => {
        return (
          item[key] &&
          item[key].toString().toLowerCase().includes(search.toLowerCase())
        );
      });
    });
    setData(searchResult);
  };

  const [activeTab, setActiveTab] = useState("1");

  useEffect(() => {
    setDataList(data);
  }, []);

  const toggleTab = (tab: any, type: any) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
      let filteredKycs = dataList;
      if (type !== "all") {
        filteredKycs = dataList.filter((Kyc: any) => Kyc.kycStatus === type);
      }
      setData(filteredKycs);
    }
  };

  // columns
  const Status = ({ item }: any) => {
    switch (item) {
      case "approved":
        return (
          <span className="delivery_status px-2.5 py-0.5 text-xs inline-block font-medium rounded border bg-green-100 border-green-200 text-green-500 dark:bg-green-500/20 dark:border-green-500/20">
            {item}
          </span>
        );
      case "pending":
        return (
          <span className="delivery_status px-2.5 py-0.5 text-xs inline-block font-medium rounded border bg-yellow-100 border-yellow-200 text-yellow-500 dark:bg-yellow-500/20 dark:border-yellow-500/20">
            {item}
          </span>
        );
      case "rejected":
        return (
          <span className="delivery_status px-2.5 py-0.5 text-xs inline-block font-medium rounded border bg-red-100 border-red-200 text-red-500 dark:bg-red-500/20 dark:border-red-500/20">
            {item}
          </span>
        );
      default:
        return (
          <span className="delivery_status px-2.5 py-0.5 text-xs inline-block font-medium rounded border bg-green-100 border-green-200 text-green-500 dark:bg-green-500/20 dark:border-green-500/20">
            {item}
          </span>
        );
    }
  };

  const columns = useMemo(
    () => [
      {
        header: (
          <div className="flex items-center h-full">
            <input
              id="CheckboxAll"
              className="size-4 cursor-pointer bg-white border border-slate-200 checked:bg-none dark:bg-zink-700 dark:border-zink-500 rounded-sm appearance-none arrow-none relative after:absolute after:content-['\eb7b'] after:top-0 after:left-0 after:font-remix after:leading-none after:opacity-0 checked:after:opacity-100 after:text-custom-500 checked:border-custom-500 dark:after:text-custom-500 dark:checked:border-custom-800"
              type="checkbox"
            />
          </div>
        ),
        enableSorting: false,
        id: "checkAll",
        cell: (cell: any) => {
          return (
            <div className="flex items-center h-full">
              <input
                id={"Checkbox" + cell.row.original.id}
                className="size-4 cursor-pointer bg-white border border-slate-200 checked:bg-none dark:bg-zink-700 dark:border-zink-500 rounded-sm appearance-none arrow-none relative after:absolute after:content-['\eb7b'] after:top-0 after:left-0 after:font-remix after:leading-none after:opacity-0 checked:after:opacity-100 after:text-custom-500 checked:border-custom-500 dark:after:text-custom-500 dark:checked:border-custom-800"
                type="checkbox"
              />
            </div>
          );
        },
      },
      {
        header: "Kyc ID",
        accessorKey: "_id",
        enableColumnFilter: false,
        enableSorting: false,
      },
      {
        header: "User ID",
        accessorKey: "userId._id",
        enableColumnFilter: false,
        enableSorting: false,
        cell: (cell: any) => (
          <>
            <Link
              to={`/user-details/${cell.row.original.userId._id}`}
              className="transition-all duration-150 ease-linear order_id text-custom-500 hover:text-custom-600"
            >
              {cell.getValue()}
            </Link>
          </>
        ),
      },
      {
        header: "User Name",
        accessorKey: "userId.name",
        enableColumnFilter: false,
        enableSorting: false,
        cell: (cell: any) => (
          <>
            <Link
              to={`/user-details/${cell.row.original.userId._id}`}
              className="transition-all duration-150 ease-linear order_id text-custom-500 hover:text-custom-600"
            >
              {cell.getValue()}
            </Link>
          </>
        ),
      },
      {
        header: "Identity Type",
        accessorKey: "identityType",
        enableColumnFilter: false,
        enableSorting: false,
      },
      {
        header: "Image Uploaded",
        accessorKey: "image",
        enableColumnFilter: false,
        enableSorting: false,
        cell: (cell: any) => (
          <>
            <a href={cell.getValue()} target="_blank" rel="noreferrer">
              <img
                src={cell.getValue()}
                alt="image"
                className="w-10 h-10 rounded-md"
              />
            </a>
          </>
        ),
      },
      {
        header: "Date Submitted",
        accessorKey: "createdAt",
        enableColumnFilter: false,
        cell: (cell: any) => (
          <>{moment(cell.getValue()).format("DD/MM/YYYY")}</>
        ),
      },
      {
        header: "Kyc Status",
        accessorKey: "kycStatus",
        enableColumnFilter: false,
        enableSorting: true,
        cell: (cell: any) => <Status item={cell.getValue()} />,
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
                <AnimationButton
                  label={approving ? "Approving..." : "Approve"}
                  loading={approving}
                  disabled={approving || rejecting}
                  onClick={() => {
                    handleApprove(cell.row.original._id);
                  }}
                />
              </li>
              <li>
                <AnimationButton
                  label={rejecting ? "Rejecting..." : "Reject"}
                  loading={rejecting}
                  disabled={approving || rejecting}
                  onClick={() => {
                    handleReject(cell.row.original._id);
                  }}
                />
              </li>
            </Dropdown.Content>
          </Dropdown>
        ),
      },
    ],
    []
  );

  const handleApprove = async (id: string) => {
    try {
      setApproving(true);
      await axios.put(
        `${process.env.REACT_APP_BASE_URI}/kyc/approve/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      toast.success("Kyc Approved Successfully");
      handleGetKycs();
    } catch (error) {
      console.log(error);
      toast.error("Couldn't Approve Kyc, Please Try Again");
    } finally {
      setApproving(false);
    }
  };

  const handleReject = async (id: string) => {
    try {
      setRejecting(true);
      await axios.put(
        `${process.env.REACT_APP_BASE_URI}/kyc/reject/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      toast.success("Kyc Rejected Successfully");
      handleGetKycs();
    } catch (error) {
      console.log(error);
      toast.error("Couldn't Reject Kyc, Please Try Again");
    } finally {
      setRejecting(false);
    }
  };

  return (
    <React.Fragment>
      <BreadCrumb title="All Kycs" pageTitle="Kycs" />
      <ToastContainer closeButton={false} limit={1} />
      <div className="grid grid-cols-1 gap-x-5 md:grid-cols-2 2xl:grid-cols-12">
        <div className="2xl:col-span-2 2xl:row-span-1">
          <div className="card">
            <div className="flex items-center gap-3 card-body">
              <div className="flex items-center justify-center size-12 rounded-md text-15 bg-custom-50 text-custom-500 dark:bg-custom-500/20 shrink-0">
                <Shield />
              </div>
              <div className="grow">
                <h5 className="mb-1 text-16">
                  <CountUp
                    end={getKycNumberByStatus("all")}
                    separator=","
                    className="counter-value"
                  />
                </h5>
                <p className="text-slate-500 dark:text-zink-200">Total Kycs</p>
              </div>
            </div>
          </div>
        </div>
        <div className="2xl:col-span-2 2xl:row-span-1">
          <div className="card">
            <div className="flex items-center gap-3 card-body">
              <div className="flex items-center justify-center size-12 text-yellow-500 rounded-md text-15 bg-yellow-50 dark:bg-yellow-500/20 shrink-0">
                <Loader />
              </div>
              <div className="grow">
                <h5 className="mb-1 text-16">
                  <CountUp
                    end={getKycNumberByStatus("pending")}
                    separator=","
                    className="counter-value"
                  />
                </h5>
                <p className="text-slate-500 dark:text-zink-200">
                  Total Approval Pending
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="2xl:col-span-2 2xl:row-span-1">
          <div className="card">
            <div className="flex items-center gap-3 card-body">
              <div className="flex items-center justify-center size-12 text-green-500 rounded-md text-15 bg-green-50 dark:bg-green-500/20 shrink-0">
                <ShieldCheck />
              </div>
              <div className="grow">
                <h5 className="mb-1 text-16">
                  <CountUp
                    end={getKycNumberByStatus("approved")}
                    separator=","
                    className="counter-value"
                  />
                </h5>
                <p className="text-slate-500 dark:text-zink-200">
                  Total Approved
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="2xl:col-span-2 2xl:row-span-1">
          <div className="card">
            <div className="flex items-center gap-3 card-body">
              <div className="flex items-center justify-center size-12 text-red-500 rounded-md text-15 bg-red-50 dark:bg-red-500/20 shrink-0">
                <ShieldXIcon />
              </div>
              <div className="grow">
                <h5 className="mb-1 text-16">
                  <CountUp
                    end={getKycNumberByStatus("rejected")}
                    separator=","
                    className="counter-value"
                  />
                </h5>
                <p className="text-slate-500 dark:text-zink-200">
                  Total Rejected
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="card" id="ordersTable">
        <div className="card-body">
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
            <div className="lg:col-span-3">
              <div className="relative">
                <input
                  type="text"
                  className="ltr:pl-8 rtl:pr-8 search form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200"
                  placeholder="Search for ..."
                  autoComplete="off"
                  onChange={(e) => filterSearchData(e)}
                />
                <Search className="inline-block size-4 absolute ltr:left-2.5 rtl:right-2.5 top-2.5 text-slate-500 dark:text-zink-200 fill-slate-100 dark:fill-zink-600" />
              </div>
            </div>
          </div>

          <ul className="flex flex-wrap w-full mt-5 text-sm font-medium text-center text-gray-500 nav-tabs">
            <li className={`group ${activeTab === "1" && "active"}`}>
              <Link
                to="#"
                data-tab-toggle
                data-target=""
                className="inline-block px-4 py-1.5 text-base transition-all duration-300 ease-linear rounded-md text-slate-500 dark:text-zink-200 border border-transparent group-[.active]:bg-custom-500 group-[.active]:text-white dark:group-[.active]:text-white hover:text-custom-500 dark:hover:text-custom-500 active:text-custom-500 dark:active:text-custom-500 -mb-[1px]"
                onClick={() => {
                  toggleTab("1", "all");
                }}
              >
                <ShieldCheck className="inline-block size-4 ltr:mr-1 rtl:ml-1" />{" "}
                <span className="align-middle">All Kycs</span>
              </Link>
            </li>
            <li className={`group ${activeTab === "2" && "active"}`}>
              <Link
                to="#"
                data-tab-toggle
                data-target="all"
                className="inline-block px-4 py-1.5 text-base transition-all duration-300 ease-linear rounded-md text-slate-500 dark:text-zink-200 border border-transparent group-[.active]:bg-custom-500 group-[.active]:text-white dark:group-[.active]:text-white hover:text-custom-500 dark:hover:text-custom-500 active:text-custom-500 dark:active:text-custom-500 -mb-[1px]"
                onClick={() => {
                  toggleTab("2", "pending");
                }}
              >
                <Loader className="inline-block size-4 ltr:mr-1 rtl:ml-1" />{" "}
                <span className="align-middle">Pending</span>
              </Link>
            </li>
            <li className={`group ${activeTab === "3" && "active"}`}>
              <Link
                to="#"
                data-tab-toggle
                data-target=""
                className="inline-block px-4 py-1.5 text-base transition-all duration-300 ease-linear rounded-md text-slate-500 dark:text-zink-200 border border-transparent group-[.active]:bg-custom-500 group-[.active]:text-white dark:group-[.active]:text-white hover:text-custom-500 dark:hover:text-custom-500 active:text-custom-500 dark:active:text-custom-500 -mb-[1px]"
                onClick={() => {
                  toggleTab("3", "approved");
                }}
              >
                <ShieldCheck className="inline-block size-4 ltr:mr-1 rtl:ml-1" />{" "}
                <span className="align-middle">Approved</span>
              </Link>
            </li>
            <li className={`group ${activeTab === "5" && "active"}`}>
              <Link
                to="#"
                data-tab-toggle
                data-target=""
                className="inline-block px-4 py-1.5 text-base transition-all duration-300 ease-linear rounded-md text-slate-500 dark:text-zink-200 border border-transparent group-[.active]:bg-custom-500 group-[.active]:text-white dark:group-[.active]:text-white hover:text-custom-500 dark:hover:text-custom-500 active:text-custom-500 dark:active:text-custom-500 -mb-[1px]"
                onClick={() => {
                  toggleTab("4", "rejected");
                }}
              >
                <Shield className="inline-block size-4 ltr:mr-1 rtl:ml-1 " />{" "}
                <span className="align-middle">Rejected</span>
              </Link>
            </li>
          </ul>

          {data && data.length > 0 ? (
            <TableContainer
              isPagination={true}
              columns={columns || []}
              data={data || []}
              customPageSize={10}
              divclassName="mt-5 overflow-x-auto"
              tableclassName="w-full whitespace-nowrap"
              theadclassName="ltr:text-left rtl:text-right bg-slate-100 dark:bg-zink-600"
              thclassName="px-3.5 py-2.5 font-semibold text-slate-500 border-b border-slate-200 dark:border-zink-500 dark:text-zink-200"
              tdclassName="px-3.5 py-2.5 border-y border-slate-200 dark:border-zink-500"
              PaginationClassName="flex flex-col items-center mt-5 md:flex-row"
            />
          ) : (
            <div className="noresult">
              <div className="py-6 text-center">
                <Search className="size-6 mx-auto text-sky-500 fill-sky-100 dark:sky-500/20" />
                <h5 className="mt-2 mb-1">Sorry! No Result Found</h5>
                <p className="mb-0 text-slate-500 dark:text-zink-200">
                  We've searched all Kycs, but we did not find any Kycs for your
                  search.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

export default Kycs;
