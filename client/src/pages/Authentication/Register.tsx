import React, { useState } from "react";
import AuthIcon from "pages/AuthenticationInner/AuthIcon";
import { Link } from "react-router-dom";
import { register } from "helpers/auth";
import logo from "assets/images/logo.webp";

const Register = () => {
  document.title = "Register | EziFx CRM";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

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

  const handleRegister = async (
    name: string,
    email: string,
    password: string
  ) => {
    try {
      const data = await register(name, email, password);
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <React.Fragment>
      <div className="relative">
        <AuthIcon />

        <div className="mb-0 w-screen lg:w-[500px] card shadow-lg border-none shadow-slate-100 relative">
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
                Create your free account
              </h4>
              <p className="text-slate-500 dark:text-zink-200">
                Get your free Tailwick account now
              </p>
            </div>

            <form
              action="/"
              className="mt-10"
              id="registerForm"
              onSubmit={(event: any) => {
                event.preventDefault();
                return false;
              }}
            >
              {" "}
              <div className="mb-3">
                <label
                  htmlFor="username-field"
                  className="inline-block mb-2 text-base font-medium"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name-field"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  name="name"
                  className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200"
                  placeholder="Enter name"
                />
              </div>
              <div className="mb-3">
                <label
                  htmlFor="email-field"
                  className="inline-block mb-2 text-base font-medium"
                >
                  Email
                </label>
                <input
                  type="text"
                  id="email-field"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  name="email"
                  className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200"
                  placeholder="Enter email"
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  name="password"
                  className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200"
                  placeholder="Enter password"
                />
              </div>
              <div className="mt-10">
                <button
                  onClick={() => handleRegister(name, email, password)}
                  disabled={loading}
                  type="submit"
                  className="w-full text-white transition-all duration-200 ease-linear btn bg-custom-500 border-custom-500 hover:text-white hover:bg-custom-600 hover:border-custom-600 focus:text-white focus:bg-custom-600 focus:border-custom-600 focus:ring focus:ring-custom-100 active:text-white active:bg-custom-600 active:border-custom-600 active:ring active:ring-custom-100 dark:ring-custom-400/20"
                >
                  {loading ? "Loading..." : "Register"}
                </button>
              </div>
              <div className="mt-10 text-center">
                <p className="mb-0 text-slate-500 dark:text-zink-200">
                  Already have an account ?{" "}
                  <Link
                    to="/login"
                    className="font-semibold underline transition-all duration-150 ease-linear text-slate-500 dark:text-zink-200 hover:text-custom-500 dark:hover:text-custom-500"
                  >
                    Login
                  </Link>{" "}
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Register;
