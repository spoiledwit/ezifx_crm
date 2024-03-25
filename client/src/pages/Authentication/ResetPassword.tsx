import logo from "assets/images/logo.webp";
import axios from "axios";
import withRouter from "Common/withRouter";
import AnimationButton from "components/UIElement/UiButtons/AnimationButton";
import { getUserFromLocalStorage, login } from "helpers/auth";
import AuthIcon from "pages/AuthenticationInner/AuthIcon";
import React from "react";
import { toast, Toaster } from "react-hot-toast";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAuthStore } from "store/useAuthStore";
import OTPModal from "./OTPModal";

const ResetPassword = () => {
  const navigate = useNavigate();
  document.title = "Forgot Password";

  const [newPassword, setNewPassword] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [signing, setSigning] = React.useState(false);
  const [remember, setRemember] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const [alertMsg, setAlertMsg] = React.useState("");

  const { id, token } = useParams();

  const resetPassword = async () => {
    console.log("iiiiiiiiii", id, token);
    try {
      setSigning(true);
      if (!newPassword) {
        toast.error("Please fill all fields");
        return;
      }

      const res = await axios.post(
        `${process.env.REACT_APP_BASE_URI}/auth/reset-password/${id}/${token}`,
        { password: newPassword }
      );

      console.log("sssssss", res);
      toast.error(res.data.message);
      navigate("/");
    } catch (error: any) {
      if (typeof error.response === "undefined") {
        return toast.error("Network Error");
      }
      if (typeof error.response.data === "string") {
        return toast.error(error.response.data);
      }

      if (error.response.data.error.message) {
        return toast.error(error.response.data.error.message);
      }

      toast.error("Something went wrong, please try again");
    } finally {
      setSigning(false);
    }
  };

  React.useEffect(() => {
    const bodyElement = document.body;

    bodyElement.classList.add(
      "flex",
      "items-center",
      "justify-center",
      "min-h-screen",
      "py-16",
      "lg:py-10",
      "bg-slate-50",
      "dark:bg-zink-800",
      "dark:text-zink-100",
      "font-public"
    );

    return () => {
      bodyElement.classList.remove(
        "flex",
        "items-center",
        "justify-center",
        "min-h-screen",
        "py-16",
        "lg:py-10",
        "bg-slate-50",
        "dark:bg-zink-800",
        "dark:text-zink-100",
        "font-public"
      );
    };
  }, []);

  return (
    <React.Fragment>
      <Toaster />
      <div className="relative">
        <AuthIcon />
        <div className="mb-0 w-screen lg:mx-auto lg:w-[500px] card shadow-lg border-none shadow-slate-100 relative">
          <div className="!px-10 !py-12 card-body">
            <Link to="/">
              <img
                src={logo}
                alt=""
                className="hidden h-6 mx-auto dark:block"
              />
              <img
                src={logo}
                alt=""
                className="block h-6 mx-auto dark:hidden"
              />
            </Link>

            {alertMsg && (
              <div
                role="alert"
                className="flex gap-5 bg-blue-200 p-4 rounded-md my-3 shadow-sm"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="stroke-current shrink-0 w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
                <span>{alertMsg}</span>
              </div>
            )}

            <div className="mt-8 text-center">
              <h4 className="mb-1 text-custom-500 dark:text-custom-500">
                Reset Your Password!
              </h4>
            </div>

            <form
              className="mt-10"
              id="signInForm"
              onSubmit={async (event: any) => {
                event.preventDefault();
                await resetPassword();
              }}
            >
              <div className="mb-3">
                <label
                  htmlFor="newPassword"
                  className="inline-block mb-2 text-base font-medium"
                >
                  New Password
                </label>
                <input
                  type="password"
                  id="newPassword"
                  name="newPassword"
                  onChange={(e) => {
                    setNewPassword(e.target.value);
                  }}
                  className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200"
                  placeholder="Enter username or email"
                />
              </div>

              <div className="mt-10 flex justify-center">
                {/* <button
                  type="submit"
                  className="flex items-center text-white btn bg-custom-500 border-custom-500 hover:text-white hover:bg-custom-600 hover:border-custom-600 focus:text-white focus:bg-custom-600 focus:border-custom-600 focus:ring focus:ring-custom-100 active:text-white active:bg-custom-600 active:border-custom-600 active:ring active:ring-custom-100 dark:ring-custom-400/20"
                >
                  Submit
                </button> */}
                <AnimationButton
                  className="w-full items-center justify-center"
                  loading={signing || loading}
                  disabled={signing || loading}
                  loadingText={loading ? "Submitting ..." : "Submit"}
                  label="Submit"
                  onClick={resetPassword}
                />
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* <OTPModal /> */}
    </React.Fragment>
  );
};

export default withRouter(ResetPassword);
