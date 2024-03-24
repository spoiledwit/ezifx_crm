import React from "react";
import { BadgeCheck, MapPin, UserCircle } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
import AnimationButton from "components/UIElement/UiButtons/AnimationButton";

// IMage
import avatar1 from "assets/images/users/avatar-1.png";

const AccountInfo = ({
  className,
  user,
  fetchUser,
}: {
  className: string;
  user: any;
  fetchUser: any;
}) => {
  const [selectedImage, setSelectedImage] = React.useState<
    string | ArrayBuffer | null
  >(user?.profilePic ? user.profilePic : avatar1);

  const [enabling, setEnabling] = React.useState(false);
  const [disabling, setDisabling] = React.useState(false);

  const handleDisableUser = async () => {
    try {
      setDisabling(true);
      await axios.put(
        `${process.env.REACT_APP_BASE_URI}/auth/disable/${user._id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      fetchUser();
      toast.success("User disabled successfully");
    } catch (error) {
      toast.error("Failed to disable user");
    } finally {
      setDisabling(false);
    }
  };

  const handleEnableUser = async () => {
    try {
      setEnabling(true);
      await axios.put(
        `${process.env.REACT_APP_BASE_URI}/auth/enable/${user._id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      fetchUser();
      toast.success("User enabled successfully");
    } catch (error) {
      toast.error("Failed to enable user");
    } finally {
      setEnabling(false);
    }
  };

  return (
    <React.Fragment>
      <div className={className}>
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-12 2xl:grid-cols-12">
          <div className="lg:col-span-2 2xl:col-span-1">
            <div className="relative inline-block size-20 rounded-full shadow-md bg-slate-100 profile-user xl:size-28">
              <img
                src={selectedImage?.toString() ?? avatar1}
                alt=""
                className="object-cover border-0 rounded-full img-thumbnail user-profile-image"
              />
            </div>
          </div>
          <div className="lg:col-span-10 2xl:col-span-9">
            <h5 className="mb-1">
              {user?.name}{" "}
              <BadgeCheck className="inline-block size-4 text-sky-500 fill-sky-100 dark:fill-custom-500/20"></BadgeCheck>
            </h5>
            <div className="flex gap-3 mb-4">
              <p className="text-slate-500 dark:text-zink-200">
                <UserCircle className="inline-block size-4 ltr:mr-1 rtl:ml-1 text-slate-500 dark:text-zink-200 fill-slate-100 dark:fill-zink-500"></UserCircle>
                User
              </p>
              <p className="text-slate-500 dark:text-zink-200">
                <MapPin className="inline-block size-4 ltr:mr-1 rtl:ml-1 text-slate-500 dark:text-zink-200 fill-slate-100 dark:fill-zink-500"></MapPin>{" "}
                {user?.address ? user.address : "No Address"}
              </p>
            </div>
            <ul className="flex flex-wrap gap-3 mt-4 text-center divide-x divide-slate-200 dark:divide-zink-500 rtl:divide-x-reverse">
              <li className="px-5">
                <h5>{user?.accounts?.length ?? 0}</h5>
                <p className="text-slate-500 dark:text-zink-200">
                  Trading Accounts
                </p>
              </li>
              <li className="px-5">
                <h5>{user?.totalDeposit ?? 0} USD</h5>
                <p className="text-slate-500 dark:text-zink-200">
                  Total Deposit
                </p>
              </li>
              <li className="px-5">
                <h5>{user?.totalWithdrawal ?? 0} USD </h5>
                <p className="text-slate-500 dark:text-zink-200">
                  Total Withdrawal
                </p>
              </li>
              <li className="px-5">
                <h5>{user?.isDisabled ? "Disabled" : "Active"}</h5>
                <p className="text-slate-500 dark:text-zink-200">
                  Account Status
                </p>
              </li>
              <li className="px-5">
                <h5>{user?.hasKYC ? "Verified" : "Not Verified"}</h5>
                <p className="text-slate-500 dark:text-zink-200">KYC Status</p>
              </li>
            </ul>
            <ul>
              <li
              className="flex mt-5 ml-5"
              >
                <AnimationButton
                  loadingText={user?.isDisabled ? "Enabling" : "Disabling"}
                  onClick={() => {
                    if (user?.isDisabled) {
                      handleEnableUser();
                    } else {
                      handleDisableUser();
                    }
                  }}
                  disabled={enabling || disabling}
                  loading={disabling || enabling}
                  label={user?.isDisabled ? "Enable User" : "Disable User"}
                  className={`${
                    user?.isDisabled
                      ? "bg-sky-500 hover:bg-sky-600 dark:bg-custom-500 dark:hover:bg-custom-600"
                      : "bg-red-500 border-red-100 hover:bg-red-600 dark:bg-red-500 dark:hover:bg-red-600"
                  }`}
                />
              </li>
            </ul>
          </div>
          <div className="lg:col-span-12 2xl:col-span-2">
            <div className="flex gap-2 2xl:justify-end"></div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default AccountInfo;
