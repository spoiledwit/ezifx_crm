import React from "react";

const PrivacyPolicyTabs = () => {
  return (
    <React.Fragment>
      <div className="card">
        <div className="card-body">
          <h6 className="mb-4 text-15">Security & Privacy</h6>
          <div className="space-y-6">
            <div className="flex flex-col justify-between gap-2 md:flex-row">
              <div>
                <h4 className="text-15">Two-factor Authentication</h4>
                <p className="mt-1 text-slate-500 dark:text-zink-200">
                  Two-factor authentication is an enhanced security. Once
                  enabled, you'll be required to give two types of
                  identification when you log into Google Authentication and SMS
                  are Supported.
                </p>
              </div>
              <div className="shrink-0">
                <button
                  type="button"
                  className="py-1 text-xs px-1.5 text-white btn bg-custom-500 border-custom-500 hover:text-white hover:bg-custom-600 hover:border-custom-600 focus:text-white focus:bg-custom-600 focus:border-custom-600 focus:ring focus:ring-custom-100 active:text-white active:bg-custom-600 active:border-custom-600 active:ring active:ring-custom-100 dark:ring-custom-400/20"
                >
                  Enable Two-factor Authentication
                </button>
              </div>
            </div>
          </div>
          <h6 className="inline-block mt-6 mb-4 underline text-15">
            Application Notifications:
          </h6>
          <div className="space-y-6">
            <div className="flex justify-between gap-2">
              <div>
                <h4 className="text-15">Show email notifications</h4>
                <p className="mt-1 text-slate-500 dark:text-zink-200">
                  You will receive email notifications for all activities.
                </p>
              </div>
              <div className="shrink-0">
                <div className="relative inline-block w-10 align-middle transition duration-200 ease-in ltr:mr-2 rtl:ml-2">
                  <input
                    type="checkbox"
                    disabled
                    name="emailNotification"
                    id="emailNotification"
                    className="absolute block size-5 transition duration-300 ease-linear border-2 rounded-full appearance-none cursor-pointer border-slate-200 dark:border-zink-600 bg-white/80 dark:bg-zink-400 peer/published checked:bg-custom-500 dark:checked:bg-custom-500 ltr:checked:right-0 rtl:checked:left-0 checked:border-custom-100 dark:checked:border-custom-900 arrow-none checked:bg-none"
                    defaultChecked
                  />
                  <label
                    htmlFor="emailNotification"
                    className="block h-5 overflow-hidden duration-300 ease-linear border rounded-full cursor-pointer cursor-pointertransition border-slate-200 dark:border-zink-500 bg-slate-200 dark:bg-zink-600 peer-checked/published:bg-custom-100 dark:peer-checked/published:bg-custom-900 peer-checked/published:border-custom-100 dark:peer-checked/published:border-custom-900"
                  ></label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default PrivacyPolicyTabs;
