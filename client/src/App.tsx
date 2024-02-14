import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Layout from "./Layout";
import useAuthStore from "./store/authStore";
import ForgotPass from "./pages/ForgotPass";

const App = () => {

  const { user } = useAuthStore();

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={user ? <Home /> : <Login />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="forgot-password" element={<ForgotPass /> } />
        <Route path="*" element={<h1>Not Found</h1>} />
      </Route>
    </Routes>
  );
};

export default App;
