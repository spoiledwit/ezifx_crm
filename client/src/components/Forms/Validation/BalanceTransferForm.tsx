import React from "react";
import { X } from "lucide-react";
import { useFormik } from "formik";
import * as Yup from "yup";

const BalanceTransferForm = () => {
  const validation: any = useFormik({
    initialValues: {
      email: "",
      amount: "",
    },
    validationSchema: Yup.object().shape({
      amount: Yup.number().required("Amount is required."),
      email: Yup.string()
        .email("Please enter a valid email")
        .required("Email is required."),
    }),
    onSubmit: (values: any) => {
      console.log(values);
    },
  });

  return (
    <React.Fragment>
      <div className="card">
        <div className="card-body">
          <h6 className="mb-4 text-15">Balance Transfer Form</h6>

          <div className="mx-auto md:max-w-lg">
            <form
              action="#!"
              id="signUp"
              onSubmit={(event: any) => {
                event.preventDefault();
                validation.handleSubmit();
              }}
            >
              <div className="grid grid-cols-1 gap-x-5 xl:grid-cols-2">
                <div className="mb-4">
                  <label
                    htmlFor="usernameInput"
                    className="inline-block mb-2 text-base font-medium"
                  >
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="email"
                    className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200"
                    placeholder="Enter email"
                    value={validation.values.email}
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                  />
                  {validation.touched.email && validation.errors.email ? (
                    <p id="email" className="mt-1 text-sm text-red-500">
                      {validation.errors.email}
                    </p>
                  ) : null}
                </div>
              </div>

                <div className="mb-4">
                    <label
                    htmlFor="amountInput"
                    className="inline-block mb-2 text-base font-medium"
                    >
                    Amount <span className="text-red-500">*</span>
                    </label>
                    <input
                    type="number"
                    name="amount"
                    className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200"
                    placeholder="Enter amount"
                    value={validation.values.amount}
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    />
                    {validation.touched.amount && validation.errors.amount ? (
                    <p id="amount" className="mt-1 text-sm text-red-500">
                        {validation.errors.amount}
                    </p>
                    ) : null}
                </div>
                

              <div className="flex justify-end gap-2 mt-5">
                <button
                  type="button"
                  className="text-red-500 bg-white btn hover:text-red-500 hover:bg-red-100 focus:text-red-500 focus:bg-red-100 active:text-red-500 active:bg-red-100 dark:bg-zink-700 dark:hover:bg-red-500/10 dark:focus:bg-red-500/10 dark:active:bg-red-500/10"
                >
                  <X className="inline-block size-4" />{" "}
                  <span className="align-middle">Cancel</span>
                </button>
                <button
                  type="submit"
                  className="text-white btn bg-custom-500 border-custom-500 hover:text-white hover:bg-custom-600 hover:border-custom-600 focus:text-white focus:bg-custom-600 focus:border-custom-600 focus:ring focus:ring-custom-100 active:text-white active:bg-custom-600 active:border-custom-600 active:ring active:ring-custom-100 dark:ring-custom-400/20"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default BalanceTransferForm;
