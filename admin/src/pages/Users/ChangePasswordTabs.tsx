import React from "react";
import AnimationButton from "components/UIElement/UiButtons/AnimationButton";
import axios from "axios";
import toast from "react-hot-toast";

const ChangePasswordTabs = ({user, fetchUser}: {
    user: any;
    fetchUser: any;
}) => {

    const [updating, setUpdating] = React.useState(false);
    const [newPassword, setNewPassword] = React.useState("");
    const [confirmPassword, setConfirmPassword] = React.useState("");

    const handleChangePassword = async () => {
        try {
            setUpdating(true);
            await axios.put(
                `${process.env.REACT_APP_BASE_URI}/auth/updatePassword/${user._id}`,
                {
                    newPassword,
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );
            toast.success("Password changed successfully");
        } catch (error) {
            toast.error("An error occurred while changing password");
        } finally {
            setUpdating(false);
        }
    };

    return (
        <React.Fragment>
            <div className="card">
                <div className="card-body">
                    <h6 className="mb-4 text-15">Changes Password</h6>
                    <form action="#!">
                        <div className="grid grid-cols-1 gap-5 xl:grid-cols-12">
                            
                            <div className="xl:col-span-4">
                                <label htmlFor="inputValueNew" className="inline-block mb-2 text-base font-medium">New Password*</label>
                                <div className="relative">
                                    <input 
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    disabled={updating}
                                    type="password" className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200" id="NewpasswordInput" placeholder="Enter new password" />
                                    {/* <button className="absolute top-2 ltr:right-4 rtl:left-4 " type="button"><i className="align-middle ri-eye-fill text-slate-500 dark:text-zink-200"></i></button> */}
                                </div>
                            </div>
                            <div className="xl:col-span-4">
                                <label htmlFor="inputValue" className="inline-block mb-2 text-base font-medium">Confirm Password*</label>
                                <div className="relative">
                                    <input 
                                    disabled={updating}
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    type="password" className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200" id="ConfirmpasswordInput" placeholder="Confirm password" />
                                    {/* <button className="absolute top-2 ltr:right-4 rtl:left-4 " type="button"><i className="align-middle ri-eye-fill text-slate-500 dark:text-zink-200"></i></button> */}
                                </div>
                            </div>
                            <div className="flex xl:col-span-6">
                                <button 
                                onClick={handleChangePassword}
                                type="button" className="text-white bg-green-500 border-green-500 btn hover:text-white hover:bg-green-600 hover:border-green-600 focus:text-white focus:bg-green-600 focus:border-green-600 focus:ring focus:ring-green-100 active:text-white active:bg-green-600 active:border-green-600 active:ring active:ring-green-100 dark:ring-green-400/10">
                                    {updating ? "Updating..." : "Update Password"}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </React.Fragment>

    );
}

export default ChangePasswordTabs;