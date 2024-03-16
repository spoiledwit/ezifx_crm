import { Search } from "lucide-react";
import React from "react";
import BreadCrumb from "Common/BreadCrumb";

const Refferals = () => {
  return (
    <React.Fragment>
      <BreadCrumb pageTitle="Referrals" title="All Referrals" />
      <div>
        <div className="py-6 mt-20 text-center">
          <Search className="size-6 mx-auto text-sky-500 fill-sky-100 dark:sky-500/20" />
          <h5 className="mt-2 mb-1">Sorry! No Data Found</h5>
          <p className="mb-0 text-slate-500 dark:text-zink-200">
            We've searched all records, but we couldn't find any referrals.
          </p>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Refferals;
