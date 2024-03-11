import React from "react";
import withRouter from "Common/withRouter";
import { useNavigate } from "react-router-dom";
import AuthIcon from "pages/AuthenticationInner/AuthIcon";
import { Link } from "react-router-dom";
import logo from "assets/images/logo.webp";
import { login } from "helpers/auth";
import { useAuthStore } from "store/useAuthStore";

const Login = () => {
  const navigate = useNavigate();
  document.title = "Login";

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");

  const signIn = async () => {
    try {
      const data = await login(email, password);
    } catch (error) {
      console.error(error);
    }
    navigate("/");
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

            <div className="mt-8 text-center">
              <h4 className="mb-1 text-custom-500 dark:text-custom-500">
                Welcome Back !
              </h4>
              <p className="text-slate-500 dark:text-zink-200">
                Sign in to continue to EZIFX CRM.
              </p>
            </div>

            <form
              className="mt-10"
              id="signInForm"
              onSubmit={async (event: any) => {
                event.preventDefault();
                await signIn();
                return false;
              }}
            >
              <div className="mb-3">
                <label
                  htmlFor="email"
                  className="inline-block mb-2 text-base font-medium"
                >
                  UserName/ Email ID
                </label>
                <input
                  type="text"
                  id="email"
                  name="email"
                  className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200"
                  placeholder="Enter username or email"
                />
              </div>
              <div className="mb-3">
                <label
                  htmlFor="password"
                  className="inline-block mb-2 text-base font-medium"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200"
                  placeholder="Enter password"
                />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <input
                    id="checkboxDefault1"
                    className="size-4 border rounded-sm appearance-none bg-slate-100 border-slate-200 dark:bg-zink-600 dark:border-zink-500 checked:bg-custom-500 checked:border-custom-500 dark:checked:bg-custom-500 dark:checked:border-custom-500 checked:disabled:bg-custom-400 checked:disabled:border-custom-400"
                    type="checkbox"
                    value=""
                  />
                  <label
                    htmlFor="checkboxDefault1"
                    className="inline-block text-base font-medium align-middle cursor-pointer"
                  >
                    Remember me
                  </label>
                </div>
                {/* <div id="remember-error" className="hidden mt-1 text-sm text-red-500">Please check the "Remember me" before submitting the form.</div> */}
              </div>
              <div className="mt-10">
                <button
                  type="submit"
                  className="w-full text-white btn bg-custom-500 border-custom-500 hover:text-white hover:bg-custom-600 hover:border-custom-600 focus:text-white focus:bg-custom-600 focus:border-custom-600 focus:ring focus:ring-custom-100 active:text-white active:bg-custom-600 active:border-custom-600 active:ring active:ring-custom-100 dark:ring-custom-400/20"
                >
                  Sign In
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default withRouter(Login);
