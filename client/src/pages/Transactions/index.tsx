import BreadCrumb from "Common/BreadCrumb";
import PhotosUploader from "components/Forms/ImageUploader";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import CountUp from "react-countup";
import { toast } from "react-hot-toast";
import { useAuthStore } from "store/useAuthStore";

// icons
import TableContainer from "Common/TableContainer";
import {
  ArrowDown,
  CircleDollarSign,
  Eye,
  Loader,
  MoreHorizontal,
  Plus,
  Search,
} from "lucide-react";
import { Link } from "react-router-dom";

import { Dropdown } from "Common/Components/Dropdown";
import Modal from "Common/Components/Modal";

// Formik
import axios from "axios";
import { useFormik } from "formik";
import { ToastContainer } from "react-toastify";
import * as Yup from "yup";

const Transactions = () => {
  const { user } = useAuthStore();
  const [creatingDeposit, setCreatingDeposit] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [dataList, setDataList] = useState<any>([]);
  const [data, setData] = useState<any>([]);
  const [images, setImages] = useState<any>([]);
  const [show, setShow] = useState<boolean>(false);

  useEffect(() => {
    handleGetAllUserTransactions();
  }, []);

  const handleGetAllUserTransactions = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${process.env.REACT_APP_BASE_URI}/account/all/userTransactions`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setDataList(res.data);
      setData(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const getDepositNumberByStatus = (status: string) => {
    let total = 0;
    dataList.forEach((deposit: any) => {
      if (deposit.status === status) {
        total ++
      }
    });
    return total;
  };

  useEffect(() => {
    if (images.length > 0) {
      validation.setFieldValue("paymentProof", images[0]);
    } else {
      validation.setFieldValue("paymentProof", "");
    }
  }, [images]);

  // validation
  const validation: any = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      accountNumber: "",
      paymentMethod: "",
      amount: "",
      paymentProof: "",
    },
    validationSchema: Yup.object({
      accountNumber: Yup.string().required("Please Enter Account Number"),
      paymentMethod: Yup.string().required("Please Enter Payment Method"),
      amount: Yup.string().required("Please Enter Amount"),
      paymentProof: Yup.string().required("Please Upload Payment Proof"),
    }),

    onSubmit: async (values) => {
      const newData = {
        ...values,
      };
      setCreatingDeposit(true);
      try {
        await axios.post(
          `${process.env.REACT_APP_BASE_URI}/deposit`,
          {
            ...newData,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        handleGetAllUserTransactions();
        toast.success("Deposit made successfully!");
        toggle();
        validation.resetForm();
        setImages([]);
      } catch (error: any) {
        if (!error.response) {
          return toast.error("Network error. Please try again.");
        }
        if (typeof error.response.data === "string") {
          return toast.error(error.response.data);
        }
      } finally {
        setCreatingDeposit(false);
      }
    },
  });

  //
  const toggle = useCallback(() => {
    if (show) {
      setShow(false);
    } else {
      setShow(true);
      validation.resetForm();
    }
  }, [show, validation]);

  // Search Data
  const filterSearchData = (e: any) => {
    const search = e.target.value;
    const keysToSearch = ["depositId", "paymentMethod", "amount", "status"];
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
      let filteredDeposits = dataList;
      if (type !== "all") {
        filteredDeposits = dataList.filter(
          (deposit: any) => deposit.status === type
        );
      }
      setData(filteredDeposits);
    }
  };

  // columns
  const Status = ({ item }: any) => {
    switch (item) {
      case "Approved":
        return (
          <span className="delivery_status px-2.5 py-0.5 text-xs inline-block font-medium rounded border bg-green-100 border-green-200 text-green-500 dark:bg-green-500/20 dark:border-green-500/20">
            {item}
          </span>
        );
      case "Pending":
        return (
          <span className="delivery_status px-2.5 py-0.5 text-xs inline-block font-medium rounded border bg-yellow-100 border-yellow-200 text-yellow-500 dark:bg-yellow-500/20 dark:border-yellow-500/20">
            {item}
          </span>
        );
      case "Rejected":
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
        header: "Amount",
        accessorKey: "amount",
        enableColumnFilter: false,
        enableSorting: false,
      },
      {
        header: "Type",
        accessorKey: "type",
        enableColumnFilter: false,
        enableSorting: false,
      },

      {
        header: "Status",
        accessorKey: "status",
        enableColumnFilter: false,
        enableSorting: true,
        cell: (cell: any) => <Status item={cell.getValue()} />,
      },

      {
        header: "Date",
        accessorKey: "date",
        enableColumnFilter: false,
      },

      // {
      //   header: "Action",
      //   enableColumnFilter: false,
      //   enableSorting: true,
      //   cell: (cell: any) => (
      //     <Dropdown className="relative">
      //       <Dropdown.Trigger
      //         id="orderAction1"
      //         data-bs-toggle="dropdown"
      //         className="flex items-center justify-center size-[30px] p-0 text-slate-500 btn bg-slate-100 hover:text-white hover:bg-slate-600 focus:text-white focus:bg-slate-600 focus:ring focus:ring-slate-100 active:text-white active:bg-slate-600 active:ring active:ring-slate-100 dark:bg-slate-500/20 dark:text-slate-400 dark:hover:bg-slate-500 dark:hover:text-white dark:focus:bg-slate-500 dark:focus:text-white dark:active:bg-slate-500 dark:active:text-white dark:ring-slate-400/20"
      //       >
      //         <MoreHorizontal className="size-3" />
      //       </Dropdown.Trigger>
      //       <Dropdown.Content
      //         placement={cell.row.index ? "top-end" : "right-end"}
      //         className="absolute z-50 py-2 mt-1 ltr:text-left rtl:text-right list-none bg-white rounded-md shadow-md min-w-[10rem] dark:bg-zink-600"
      //         aria-labelledby="orderAction1"
      //       >
      //         <li>
      //           <Link
      //             to={`/deposits/${cell.row.original._id}`}
      //             className="block px-4 py-1.5 text-base transition-all duration-200 ease-linear text-slate-600 hover:bg-slate-100 hover:text-slate-500 focus:bg-slate-100 focus:text-slate-500 dark:text-zink-100 dark:hover:bg-zink-500 dark:hover:text-zink-200 dark:focus:bg-zink-500 dark:focus:text-zink-200"
      //           >
      //             <Eye className="inline-block size-3 ltr:mr-1 rtl:ml-1" />{" "}
      //             <span className="align-middle">Overview</span>
      //           </Link>
      //         </li>
      //       </Dropdown.Content>
      //     </Dropdown>
      //   ),
      // },
    ],
    []
  );

  return (
    <React.Fragment>
      <BreadCrumb title="All Transactions" pageTitle="Transactions" />
      <ToastContainer closeButton={false} limit={1} />
      <div className="grid grid-cols-1 gap-x-5 md:grid-cols-2 2xl:grid-cols-12">
        <div className="2xl:col-span-2 2xl:row-span-1">
          <div className="card">
            <div className="flex items-center gap-3 card-body">
              <div className="flex items-center justify-center size-12 rounded-md text-15 bg-custom-50 text-custom-500 dark:bg-custom-500/20 shrink-0">
                <CircleDollarSign />
              </div>
              <div className="grow">
                <h5 className="mb-1 text-16">
                  <CountUp
                    end={getDepositNumberByStatus("Approved")}
                    separator=","
                    className="counter-value"
                  />
                </h5>
                <p className="text-slate-500 dark:text-zink-200">
                  Total Deposits
                </p>
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
                    end={getDepositNumberByStatus("Pending")}
                    separator=","
                    className="counter-value"
                  />
                </h5>
                <p className="text-slate-500 dark:text-zink-200">
                  Pending Deposit Amount
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="2xl:col-span-2 2xl:row-span-1">
          <div className="card">
            <div className="flex items-center gap-3 card-body">
              <div className="flex items-center justify-center size-12 text-green-500 rounded-md text-15 bg-green-50 dark:bg-green-500/20 shrink-0">
                <ArrowDown />
              </div>
              <div className="grow">
                <h5 className="mb-1 text-16">
                  <CountUp
                    end={getDepositNumberByStatus("Approved")}
                    separator=","
                    className="counter-value"
                  />
                </h5>
                <p className="text-slate-500 dark:text-zink-200">
                  Successfully Deposited
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="2xl:col-span-2 2xl:row-span-1">
          <div className="card">
            <div className="flex items-center gap-3 card-body">
              <div className="flex items-center justify-center size-12 text-red-500 rounded-md text-15 bg-red-50 dark:bg-red-500/20 shrink-0">
                <ArrowDown />
              </div>
              <div className="grow">
                <h5 className="mb-1 text-16">
                  <CountUp
                    end={getDepositNumberByStatus("Rejected")}
                    separator=","
                    className="counter-value"
                  />
                </h5>
                <p className="text-slate-500 dark:text-zink-200">
                  Rejected Deposit Amount
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
                <CircleDollarSign className="inline-block size-4 ltr:mr-1 rtl:ml-1" />{" "}
                <span className="align-middle">All Deposits</span>
              </Link>
            </li>
            <li className={`group ${activeTab === "2" && "active"}`}>
              <Link
                to="#"
                data-tab-toggle
                data-target="all"
                className="inline-block px-4 py-1.5 text-base transition-all duration-300 ease-linear rounded-md text-slate-500 dark:text-zink-200 border border-transparent group-[.active]:bg-custom-500 group-[.active]:text-white dark:group-[.active]:text-white hover:text-custom-500 dark:hover:text-custom-500 active:text-custom-500 dark:active:text-custom-500 -mb-[1px]"
                onClick={() => {
                  toggleTab("2", "Pending");
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
                  toggleTab("3", "Approved");
                }}
              >
                <ArrowDown className="inline-block size-4 ltr:mr-1 rtl:ml-1" />{" "}
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
                  toggleTab("4", "Rejected");
                }}
              >
                <ArrowDown className="inline-block size-4 ltr:mr-1 rtl:ml-1 " />{" "}
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
                  We've searched all deposits, but we did not find any deposits
                  for your search.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Order Modal */}

      <Modal
        show={show}
        onHide={toggle}
        modal-center="true"
        className="fixed flex flex-col transition-all duration-300 ease-in-out left-2/4 z-drawer -translate-x-2/4 -translate-y-2/4"
        dialogClassName="w-screen md:w-[30rem] bg-white shadow rounded-md dark:bg-zink-600"
      >
        <Modal.Header
          className="flex items-center justify-between p-4 border-b dark:border-zink-500"
          closeButtonClass="transition-all duration-200 ease-linear text-slate-400 hover:text-red-500"
        >
          <Modal.Title className="text-16">{"Make a Deposit"}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="max-h-[calc(theme('height.screen')_-_180px)] p-4 overflow-y-auto">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              validation.handleSubmit();
              return false;
            }}
          >
            <div className="grid grid-cols-1 gap-4 xl:grid-cols-12">
              <div className="xl:col-span-12">
                <label
                  htmlFor="orderId"
                  className="inline-block mb-2 text-base font-medium"
                >
                  Select Payment Method
                </label>
                <select
                  name="paymentMethod"
                  id="paymentMethod"
                  className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200"
                  value={validation.values.paymentMethod || ""}
                  onChange={validation.handleChange}
                  required
                >
                  <option value="">Select Payment Method</option>
                  <option value="Bank Transfer">Bank Transfer</option>
                </select>
              </div>
              <div className="xl:col-span-12">
                <label
                  htmlFor="accountNumber"
                  className="inline-block mb-2 text-base font-medium"
                >
                  Account
                </label>
                <select
                  id="accountNumber"
                  className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200"
                  name="accountNumber"
                  onChange={validation.handleChange}
                  value={validation.values.accountNumber || ""}
                >
                  <option value="">Select Account</option>
                  {user?.accounts.map((account: any, index: any) => (
                    <option key={index} value={account}>
                      {account}
                    </option>
                  ))}
                </select>
                {validation.touched.accountNumber &&
                validation.errors.accountNumber ? (
                  <p className="text-red-400">
                    {validation.errors.accountNumber}
                  </p>
                ) : null}
              </div>
              <div className="xl:col-span-12">
                <label
                  htmlFor="amountInput"
                  className="inline-block mb-2 text-base font-medium"
                >
                  Amount
                </label>
                <input
                  type="text"
                  id="amountInput"
                  className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200"
                  placeholder="12345 67890"
                  name="amount"
                  onChange={validation.handleChange}
                  value={validation.values.amount || ""}
                />
                {validation.touched.amount && validation.errors.amount ? (
                  <p className="text-red-400">{validation.errors.amount}</p>
                ) : null}
              </div>
              <div className="xl:col-span-12">
                <label
                  htmlFor="fileUpload"
                  className="inline-block mb-2 text-base font-medium"
                >
                  Upload Payment Proof
                </label>
                <PhotosUploader
                  maxPhotos={1}
                  addedPhotos={images}
                  onChange={(photos: any) => {
                    setImages(photos);
                  }}
                />
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <button
                type="reset"
                className="text-red-500 bg-white btn hover:text-red-500 hover:bg-red-100 focus:text-red-500 focus:bg-red-100 active:text-red-500 active:bg-red-100 dark:bg-zink-600 dark:hover:bg-red-500/10 dark:focus:bg-red-500/10 dark:active:bg-red-500/10"
                onClick={toggle}
              >
                Cancel
              </button>
              <button
                disabled={creatingDeposit}
                type="submit"
                className="text-white btn bg-custom-500 border-custom-500 hover:text-white hover:bg-custom-600 hover:border-custom-600 focus:text-white focus:bg-custom-600 focus:border-custom-600 focus:ring focus:ring-custom-100 active:text-white active:bg-custom-600 active:border-custom-600 active:ring active:ring-custom-100 dark:ring-custom-400/20"
              >
                {creatingDeposit ? "Creating Deposit..." : "Create Deposit"}
              </button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </React.Fragment>
  );
};

export default Transactions;
