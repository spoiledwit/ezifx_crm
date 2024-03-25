import AnimationButton from "@/components/UIElement/UiButtons/AnimationButton";
import React from "react";
import { Link } from "react-router-dom";

const OTPModal = () => {
  return (
    <div>
      <dialog id="my_modal_1" className="modal modal-open">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Hello!</h3>
          <p className="py-4">
            Press ESC key or click the button below to close
          </p>
          <div className="modal-action">
          <form
              className="mt-10"
              id="signInForm"
              onSubmit={async (event: any) => {
                event.preventDefault();
                // await signIn();
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
                //   disabled={signing || loading}
                  id="email"
                  name="email"
                //   onChange={(e) => {
                //     setEmail(e.target.value);
                //   }}
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
                //   onChange={(e) => {
                //     setPassword(e.target.value);
                //   }}
                  type="password"
                  id="password"
                //   disabled={signing || loading}
                  name="password"
                  className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200"
                  placeholder="Enter password"
                />
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <input
                    id="checkboxDefault1"
                    className="size-4 border rounded-sm appearance-none bg-slate-100 border-slate-200 dark:bg-zink-600 dark:border-zink-500 checked:bg-custom-500 checked:border-custom-500 dark:checked:bg-custom-500 dark:checked:border-custom-500 checked:disabled:bg-custom-400 checked:disabled:border-custom-400"
                    type="checkbox"
                    // value={remember.toString()}
                    // onChange={() => {
                    //   setRemember(!remember);
                    // }}
                  />
                  <label
                    htmlFor="checkboxDefault1"
                    className="inline-block text-base font-medium align-middle cursor-pointer"
                  >
                    Remember me
                  </label>
                </div>
                <div>
                  <Link
                    to="/forgotPassword"
                    className=" font-semibold underline transition-all duration-150 ease-linear text-slate-500 dark:text-zink-200 hover:text-custom-500 dark:hover:text-custom-500"
                  >
                    Forgot Password?
                  </Link>{" "}
                </div>
                {/* <div
                  id="remember-error"
                  className="hidden mt-1 text-sm text-red-500"
                >
                  Please check the "Remember me" before submitting the form.
                </div> */}
              </div>
              <div className="mt-10">
                {/* <AnimationButton
                  className="w-full items-center justify-center"
                  loading={signing || loading}
                  disabled={signing || loading}
                  loadingText={loading ? "Logging you in..." : "Signing in"}
                  label="Login"
                  onClick={signIn}
                /> */}
              </div>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default OTPModal;
