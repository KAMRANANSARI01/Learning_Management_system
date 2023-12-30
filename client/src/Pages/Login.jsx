import React, { useState } from "react";
import HomeLayout from "../Layouts/HomeLayout";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../Redux/Slices/AuthSlice";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const handleUserInput = (e) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  async function OnLogin(event) {
    event.preventDefault();
    if (!loginData.email || !loginData.password) {
      toast.error("All feilds are mandatory.");
      return;
    }

    //making dispatch action
    const response = await dispatch(login(loginData));
    console.log(response);
    if (response?.payload?.success) navigate("/");
    setLoginData({
      email: "",
      password: "",
    });
  }
  return (
    <HomeLayout>
      <div className="flex items-center justify-center h-[90vh] w-full">
        <form
          onSubmit={OnLogin}
          className="flex flex-col items-center justify-center p-4 rounded-large shadow-[0_0_10px_black]  text-white w-[70%] sm:w-[55%] md:w-[40%] lg:w-[25%] "
        >
          <div className="w-full ">
            <h1 className="font-bold text-2xl text-center mb-4">Login Page</h1>

            <div className="flex flex-col gap-1">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                required
                name="email"
                id="email"
                placeholder="Enter your email.."
                className="bg-transparent px-2 py-1 border mb-2"
                onChange={handleUserInput}
                value={loginData.email}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                required
                name="password"
                id="password"
                placeholder="Enter your password.."
                className="bg-transparent px-2 py-1 border "
                onChange={handleUserInput}
                value={loginData.password}
              />
            </div>
            <button
              type="submit"
              className="w-full py-1 px-3 rounded-sm bg-yellow-500 mt-9 font-semibold text-lg hover:bg-yellow-600"
            >
              Login Here
            </button>
            <p className="text-center mt-2">
              Don't have an account ?
              <Link to="/signup" className="link hover:text-yellow-500">
                Signup
              </Link>
            </p>
          </div>
        </form>
      </div>
    </HomeLayout>
  );
};

export default Login;
