import React, { useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

interface Option {
  label: string;
  value: string;
  isDisabled?: boolean;
}

const DefaultOptions: Option[] = [
  { label: "Choice 1", value: "Choice 1" },
  { label: "Choice 2", value: "Choice 2" },
  { label: "Choice 3", value: "Choice 3" },
  { label: "Choice 2", value: "Choice 2" },
  { label: "Choice 3", value: "Choice 3" },
  { label: "Choice 4", value: "Choice 4" },
];

const cityOptions: Option[] = [
  { value: "Madrid", label: "Madrid" },
  { value: "Toronto", label: "Toronto" },
  { value: "Vancouver", label: "Vancouver" },
  { value: "London", label: "London" },
  { value: "Manchester", label: "Manchester" },
  { value: "Liverpool", label: "Liverpool" },
  { value: "Paris", label: "Paris" },
  { value: "Malaga", label: "Malaga" },
  { value: "Washington", label: "Washington", isDisabled: true },
  { value: "Lyon", label: "Lyon" },
  { value: "Marseille", label: "Marseille" },
  { value: "Hamburg", label: "Hamburg" },
  { value: "Munich", label: "Munich" },
  { value: "Barcelona", label: "Barcelona" },
  { value: "Berlin", label: "Berlin" },
  { value: "Montreal", label: "Montreal" },
  { value: "New York", label: "New York" },
  { value: "Michigan", label: "Michigan" },
];

const countryOptions: Option[] = [
  { value: "USA", label: "USA" },
  { value: "Toronto", label: "Toronto" },
  { value: "Vancouver", label: "Vancouver" },
  { value: "London", label: "London" },
  { value: "Manchester", label: "Manchester" },
  { value: "Liverpool", label: "Liverpool" },
  { value: "Paris", label: "Paris" },
  { value: "Malaga", label: "Malaga" },
  { value: "Washington", label: "Washington", isDisabled: true },
  { value: "Lyon", label: "Lyon" },
  { value: "Marseille", label: "Marseille" },
  { value: "Hamburg", label: "Hamburg" },
  { value: "Munich", label: "Munich" },
  { value: "Barcelona", label: "Barcelona" },
  { value: "Berlin", label: "Berlin" },
  { value: "Montreal", label: "Montreal" },
  { value: "New York", label: "New York" },
  { value: "Michigan", label: "Michigan" },
];

const zipOptions: Option[] = [
  { value: "00012", label: "00012" },
  { value: "00014", label: "00014" },
  { value: "00016", label: "00016" },
  { value: "88800", label: "88800" },
  { value: "00100", label: "00100" },
  { value: "00001", label: "00001" },
];

const PersonalTabs = ({ user, fetchUser }: { user: any; fetchUser: any }) => {
  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setPhone(user.phone);
    }
  }, [user]);

  const [name, setName] = React.useState<string>("");
  const [email, setEmail] = React.useState<string>("");
  const [phone, setPhone] = React.useState<string>("");
  const [updating, setUpdating] = React.useState<boolean>(false);

  const handleUpdateUser = async () => {
    try {
      setUpdating(true);
      await axios.put(
        `${process.env.REACT_APP_BASE_URI}/auth/update/${user._id}`,
        { name, email, phone },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      fetchUser();
      toast.success("User updated successfully");
    } catch (error) {
      toast.error("Failed to update user");
    } finally {
      setUpdating(false);
    }
  };

  return (
    <React.Fragment>
      <div className="card">
        <div className="card-body">
          <h6 className="mb-1 text-15">Personal Information</h6>
          <p className="mb-4 text-slate-500 dark:text-zink-200">
            Update the personal details of the client here.
          </p>
          <form action="#!">
            <div className="grid grid-cols-1 gap-5 xl:grid-cols-12">
              <div className="xl:col-span-6">
                <label
                  htmlFor="inputValue"
                  className="inline-block mb-2 text-base font-medium"
                >
                  Name
                </label>
                <input
                  disabled={updating}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  id="inputValueFirst"
                  className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200"
                  placeholder="Enter your value"
                />
              </div>
              <div className="xl:col-span-6">
                <label
                  htmlFor="inputValue"
                  className="inline-block mb-2 text-base font-medium"
                >
                  Email
                </label>
                <input
                  disabled={updating}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  id="inputValueLast"
                  className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200"
                  placeholder="Enter your value"
                />
              </div>
              <div className="xl:col-span-6">
                <label
                  htmlFor="inputValue"
                  className="inline-block mb-2 text-base font-medium"
                >
                  Phone Number
                </label>
                <input
                  disabled={updating}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  type="text"
                  id="inputValuePhone"
                  className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200"
                  placeholder="+214 8456 8459 23"
                  defaultValue=""
                />
              </div>
            </div>
            <div className="flex justify-end mt-6 gap-x-4">
              <button
                disabled={updating}
                onClick={handleUpdateUser}
                type="button"
                className="text-white btn bg-custom-500 border-custom-500 hover:text-white hover:bg-custom-600 hover:border-custom-600 focus:text-white focus:bg-custom-600 focus:border-custom-600 focus:ring focus:ring-custom-100 active:text-white active:bg-custom-600 active:border-custom-600 active:ring active:ring-custom-100 dark:ring-custom-400/20"
              >
                {updating ? "Updating..." : "Update"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </React.Fragment>
  );
};

export default PersonalTabs;
