import logo from "assets/images/logo.webp";
import error from "assets/images/error.jpg";
import { useAuthStore } from "store/useAuthStore";

const Header = ({ user, setUser }: { user: any; setUser: any }) => {
  return (
    <header className="flex items-center min-h-[60px] justify-between px-4 py-3 bg-white shadow-md dark:bg-zink-800">
      <img src={logo} className="h-6" alt="" />
      <div
        onClick={() => {
          setUser(null);
          localStorage.removeItem("token");
        }}
        className="cursor-pointer text-sm font-semibold text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-200 transition-colors duration-200"
      >
        <p className="">Logout as {user && user.name}</p>
      </div>
    </header>
  );
};

const Disabled = () => {
  const { user, setUser } = useAuthStore();

  return (
    <div>
      <Header user={user} setUser={setUser} />
      <div className="flex items-center justify-center h-screen">
        <div className="flex flex-col items-center mb-20">
          <img
            src={error}
            alt="error"
            className="h-20 w-20 object-cover rounded-full"
          />
          <h1 className="text-3xl font-bold mt-4">Account Disabled</h1>
          <p className="text-gray-500 text-center mt-4">
            Your account has been disabled. Please contact support for more
            information.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Disabled;
