import BreadCrumb from "Common/BreadCrumb";
import Modal from "Common/Components/Modal";
import React, { useCallback, useState } from "react";
import { toast } from "react-hot-toast";

// Formik
import { useFormik } from "formik";
import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import { useAuthStore } from "store/useAuthStore";
import * as Yup from "yup";
// import AccountsStatistics from "./AccountsStatistics";

import axios from "axios";
import { Shield, ShieldCheck, ShieldMinus } from "lucide-react";
import CountUp from "react-countup";
import AccountsStatistics from "../Accounts/AccountsStatistics";

const AccountList = () => {
  const [show, setShow] = useState<boolean>(false);
  const [showDemo, setShowDemo] = useState<boolean>(false);
  const { setUser, user } = useAuthStore();

  const [creatingAccount, setCreatingAccount] = useState<boolean>(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    handleFetchAccounts();
  }, []);

  const handleFetchAccounts = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URI}/account/all`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setData(response.data);
    } catch (error: any) {
      if (!error.response) {
        return toast.error("Network error. Please try again.");
      }
      if (typeof error.response.data === "string") {
        return toast.error(error.response.data);
      }
    } finally {
      setLoading(false);
    }
  };

  // validation for real account
  const validation: any = useFormik({
    enableReinitialize: true,
    initialValues: {
      accountType: "pro",
      leverage: 100,
    },
    validationSchema: Yup.object({
      accountType: Yup.string().required("Account Type is required"),
      leverage: Yup.number()
        .required("Leverage is required")
    }),

    onSubmit: async (values) => {
      const newData = {
        ...values,
        type: "Real",
      };
      if ((values.accountType === "pro" || values.accountType === "prime") && values.leverage >500 ) {
       return toast.error("Leverage must be less than or equal to 500");


      }
      if ((values.accountType === "ecn" || values.accountType === "zero") && values.leverage >1000 ) {
       return toast.error("Leverage must be less than or equal to 1000");
      }
      setCreatingAccount(true);
      try {
        const res = await axios.post(
          `${process.env.REACT_APP_BASE_URI}/account`,
          {
            ...newData,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        // adding account.accountId to user accounts array

        //@ts-ignore
        setUser({
          ...user,
          //@ts-ignore
          accounts: [...user.accounts, res.data.accountId],
        });
        handleFetchAccounts();
        toast.success("Account Created Successfully");
        toggle();
        window.location.reload();
      } catch (error: any) {
        if (!error.response) {
          return toast.error("Network error. Please try again.");
        }
        if (typeof error.response.data === "string") {
          return toast.error(error.response.data);
        }
      } finally {
        setCreatingAccount(false);
      }
    },
  });

  const toggle = useCallback(() => {
    if (show) {
      setShow(false);
    } else {
      setShow(true);
      validation.resetForm();
    }
  }, [show, validation]);

  // validation for demo account
  const validationDemo: any = useFormik({
    enableReinitialize: true,
    initialValues: {
      balance: 100,
      leverage: 100,
    },
    validationSchema: Yup.object({
      balance: Yup.number().required("Balance is required"),
      leverage: Yup.number().required("Leverage is required"),
    }),

    onSubmit: async (values) => {
      const newData = {
        ...values,
        type: "Demo",
      };
      setCreatingAccount(true);
      try {
        await axios.post(
          `${process.env.REACT_APP_BASE_URI}/account`,
          {
            ...newData,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        handleFetchAccounts();
        toast.success("Account Created Successfully");
        toggleDemo();
      } catch (error: any) {
        if (!error.response) {
          return toast.error("Network error. Please try again.");
        }
        if (typeof error.response.data === "string") {
          return toast.error(error.response.data);
        }
      } finally {
        setCreatingAccount(false);
      }
    },
  });

  const toggleDemo = useCallback(() => {
    console.log(showDemo);
    if (showDemo) {
      setShowDemo(false);
    } else {
      setShowDemo(true);
      validationDemo.resetForm();
    }
  }, [showDemo, validationDemo]);


  const getCountsByStatus = (status: string) => {
    let total = 0;
    data?.forEach((account: any) => {
      if (account.type === status) {
        total ++;
      }
    });
    return total;
  };

  return (
    <React.Fragment>
      <BreadCrumb title="All Accounts" pageTitle="Accounts" />
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
                    end={data?.length}
                    separator=","
                    className="counter-value"
                  />
                </h5>
                <p className="text-slate-500 dark:text-zink-200">
                  Total Accounts
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="2xl:col-span-2 2xl:row-span-1">
          <div className="card">
            <div className="flex items-center gap-3 card-body">
              <div className="flex items-center justify-center size-12 text-yellow-500 rounded-md text-15 bg-yellow-50 dark:bg-yellow-500/20 shrink-0">
                <ShieldCheck />
              </div>
              <div className="grow">
                <h5 className="mb-1 text-16">
                  <CountUp
                    end={getCountsByStatus("real")}
                    separator=","
                    className="counter-value"
                  />
                </h5>
                <p className="text-slate-500 dark:text-zink-200">
                  Total Real Accounts
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="2xl:col-span-2 2xl:row-span-1">
          <div className="card">
            <div className="flex items-center gap-3 card-body">
              <div className="flex items-center justify-center size-12 text-green-500 rounded-md text-15 bg-green-50 dark:bg-green-500/20 shrink-0">
                <ShieldMinus />
              </div>
              <div className="grow">
                <h5 className="mb-1 text-16">
                  <CountUp
                    end={getCountsByStatus("demo")}
                    separator=","
                    className="counter-value"
                  />
                </h5>
                <p className="text-slate-500 dark:text-zink-200">
                  Total Demo Accounts
                </p>
              </div>
            </div>
          </div>
        </div>
        
      </div>

      {/* <div className="flex items-center justify-end gap-2">
        <div className="flex justify-end mb-2">
          <button
            className="btn bg-custom-500 text-white hover:bg-custom-600 focus:bg-custom-600 active:bg-custom-600 dark:bg-custom-500/80 dark:hover:bg-custom-600/80 dark:focus:bg-custom-600/80 dark:active:bg-custom-600/80"
            onClick={toggle}
          >
            {"Open a Real Account"}
          </button>
        </div>
        <div className="flex justify-end mb-2">
          <button
            className="btn bg-custom-500 text-white hover:bg-custom-600 focus:bg-custom-600 active:bg-custom-600 dark:bg-custom-500/80 dark:hover:bg-custom-600/80 dark:focus:bg-custom-600/80 dark:active:bg-custom-600/80"
            onClick={toggleDemo}
          >
            {"Open a Demo Account"}
          </button>
        </div>
      </div> */}
      <AccountsStatistics
        data={data}
        setData={setData}
        loading={loading}
        setLoading={setLoading}
        handleFetchAccounts={handleFetchAccounts}
      />
      {/* Real Account Modal */}
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
          <Modal.Title className="text-16">
            {"Create a Real Account"}
          </Modal.Title>
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
                  htmlFor="accountType"
                  className="inline-block mb-2 text-base font-medium"
                >
                  Select An Account Type
                </label>
                <select
                  name="accountType"
                  id="accountType"
                  className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200"
                  value={validation.values.accountType || ""}
                  onChange={validation.handleChange}
                  required
                >
                  <option value="pro">PRO</option>
                  <option value="zero">ZERO</option>
                  <option value="ecn">ECN</option>
                  <option value="prime">PRIME</option>
                </select>
                {validation.touched.accountType &&
                validation.errors.accountType ? (
                  <p className="text-red-400">
                    {validation.errors.accountType}
                  </p>
                ) : null}
              </div>
              <div className="xl:col-span-12">
                <label
                  htmlFor="leverage"
                  className="inline-block mb-2 text-base font-medium"
                >
                  Leverage
                </label>
                <input
                  type="number"
                  name="leverage"
                  id="leverage"
                  className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200"
                  value={validation.values.leverage || ""}
                  onChange={validation.handleChange}
                  required
                />
                {validation.touched.leverage && validation.errors.leverage ? (
                  <p className="text-red-400">{validation.errors.leverage}</p>
                ) : null}
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
                type="submit"
                disabled={creatingAccount}
                className="text-white btn bg-custom-500 border-custom-500 hover:text-white hover:bg-custom-600 hover:border-custom-600 focus:text-white focus:bg-custom-600 focus:border-custom-600 focus:ring focus:ring-custom-100 active:text-white active:bg-custom-600 active:border-custom-600 active:ring active:ring-custom-100 dark:ring-custom-400/20"
              >
                {creatingAccount
                  ? "Creating Account..."
                  : "Create a Real Account"}
              </button>
            </div>
          </form>
        </Modal.Body>
      </Modal>

      {/*Demo Account Modal */}
      <Modal
        show={showDemo}
        onHide={toggleDemo}
        modal-center="true"
        className="fixed flex flex-col transition-all duration-300 ease-in-out left-2/4 z-drawer -translate-x-2/4 -translate-y-2/4"
        dialogClassName="w-screen md:w-[30rem] bg-white shadow rounded-md dark:bg-zink-600"
      >
        <Modal.Header
          className="flex items-center justify-between p-4 border-b dark:border-zink-500"
          closeButtonClass="transition-all duration-200 ease-linear text-slate-400 hover:text-red-500"
        >
          <Modal.Title className="text-16">
            {"Create a Demo Account"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="max-h-[calc(theme('height.screen')_-_180px)] p-4 overflow-y-auto">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              validationDemo.handleSubmit();
              return false;
            }}
          >
            <div className="grid grid-cols-1 gap-4 xl:grid-cols-12">
              <div className="xl:col-span-12">
                <label
                  htmlFor="balance"
                  className="inline-block mb-2 text-base font-medium"
                >
                  Balance
                </label>
                <input
                  type="number"
                  name="balance"
                  id="balance"
                  className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200"
                  value={validationDemo.values.balance || ""}
                  onChange={validationDemo.handleChange}
                  required
                />
                {validationDemo.touched.balance &&
                validationDemo.errors.balance ? (
                  <p className="text-red-400">
                    {validationDemo.errors.balance}
                  </p>
                ) : null}
              </div>
              <div className="xl:col-span-12">
                <label
                  htmlFor="leverage"
                  className="inline-block mb-2 text-base font-medium"
                >
                  Leverage
                </label>
                <input
                  type="number"
                  name="leverage"
                  id="leverage"
                  className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200"
                  value={validationDemo.values.leverage || ""}
                  onChange={validationDemo.handleChange}
                  required
                />
                {validationDemo.touched.leverage &&
                validationDemo.errors.leverage ? (
                  <p className="text-red-400">
                    {validationDemo.errors.leverage}
                  </p>
                ) : null}
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <button
                type="reset"
                className="text-red-500 bg-white btn hover:text-red-500 hover:bg-red-100 focus:text-red-500 focus:bg-red-100 active:text-red-500 active:bg-red-100 dark:bg-zink-600 dark:hover:bg-red-500/10 dark:focus:bg-red-500/10 dark:active:bg-red-500/10"
                onClick={toggleDemo}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={creatingAccount}
                className="text-white btn bg-custom-500 border-custom-500 hover:text-white hover:bg-custom-600 hover:border-custom-600 focus:text-white focus:bg-custom-600 focus:border-custom-600 focus:ring focus:ring-custom-100 active:text-white active:bg-custom-600 active:border-custom-600 active:ring active:ring-custom-100 dark:ring-custom-400/20"
              >
                {creatingAccount
                  ? "Creating Account..."
                  : "Create a Demo Account"}
              </button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </React.Fragment>
  );
};

export default AccountList;
