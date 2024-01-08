import React from "react";
import { FiMenu } from "react-icons/fi";
import { AiFillCloseCircle } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../Component/Footer.jsx";
import { useDispatch, useSelector } from "react-redux";
import { loggedout } from "../Redux/Slices/AuthSlice.js";


function HomeLayout({ children }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //for checking user logged in or not and role admin
  const isLoggedIn = useSelector((state) => state?.auth?.isLoggedIn);
  const role = useSelector((state) => state?.auth?.role);

  const changeWidth = () => {
    const drawerSide = document.getElementsByClassName("drawer-side");
    drawerSide[0].style.width = "auto";
  };

  const hideDrawer = () => {
    const element = document.getElementsByClassName("drawer-toggle");
    element[0].checked = false;

    const drawerSide = document.getElementsByClassName("drawer-side");
    drawerSide[0].style.width = 0;
  };

  async function handleLogout(e) {
    e.preventDefault();
    const res = await dispatch(loggedout());
    console.log(res)
    if (res?.payload?.success) {
      navigate("/");
    }
  }
  // async function handleLogout(e) {
  //   e.preventDefault();
  
  //   try {
  //     // Dispatch the loggedout action
  //     const action = await dispatch(loggedout());
  
  //     if (loggedout.fulfilled.match(action)) {
  //       const successMessage = action.payload;
  //       console.log(successMessage);
  //       navigate("/");
  //     } else {
  //       console.error("Failed to log out");
  //     }
  //   } catch (error) {
  //     console.error("Error during logout:", error.message);
  //   }
  // }
  return (
    <div className="min-h-[90vh]">
      <div className="drawer w-fit z-50  absolute left-0 ">
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          <label htmlFor="my-drawer" className="cursor-pointer relative ">
            <FiMenu
              onClick={changeWidth}
              className="font-bold text-white m-4"
              size={"32px"}
            />
          </label>
        </div>
        <div className="drawer-side w-0">
          <label
            htmlFor="my-drawer"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu bg-gray-700 text-white p-4 w-48 h-[100%] sm:w-80 z-70 text-base-content  relative">
            <li className="w-fit absolute  right-2 z-50 ">
              <button onClick={hideDrawer}>
                <AiFillCloseCircle size={24} />
              </button>
            </li>
            <li className="hover:font-bold transition-all ease-in-out duration-300">
              <Link to="/">Home</Link>
            </li>
            {/* if user is loggedin and admin then show */}
            {isLoggedIn && role === "ADMIN" && (
              <li className="hover:font-bold transition-all ease-in-out duration-300">
                <Link to="/admin/dashboard">Admin Dashboard</Link>
              </li>
            )}

            <li className="hover:font-bold transition-all ease-in-out duration-300">
              <Link to="/about">About Us</Link>
            </li>
            <li className="hover:font-bold transition-all ease-in-out duration-300">
              <Link to="/contact">Contact Us</Link>
            </li>
            <li className="hover:font-bold transition-all ease-in-out duration-300">
              <Link to="/course">All Courses</Link>
            </li>
            {!isLoggedIn && (
              <li className="absolute w-[90%] bottom-4">
                <div className="w-full flex items-center justify-center">
                  <button className="btn-primary bg-blue-700 hover:bg-blue-600 transition-all ease-in-out duration-200  py-1 px-4 font-semibold rounded-md w-full ">
                    <Link to="/login">Login</Link>
                  </button>
                  <button className="btn-secondry bg-red-500 hover:bg-red-600 transition-all ease-in-out duration-200 py-1 px-4 font-semibold rounded-md w-full ">
                    <Link to="/signup">SignUp</Link>
                  </button>
                </div>
              </li>
            )}
            {isLoggedIn && (
              <li className="absolute w-[90%] bottom-4">
                <div className="w-full flex items-center justify-center">
                  <button className="btn-primary bg-blue-700 hover:bg-blue-600 transition-all ease-in-out duration-200  py-1 px-4 font-semibold rounded-md w-full ">
                    <Link to="/user/profile">Profile</Link>
                  </button>
                  <button className="btn-secondry bg-red-500 hover:bg-red-600 transition-all ease-in-out duration-200 py-1 px-4 font-semibold rounded-md w-full ">
                    <Link onClick={handleLogout}>Logout</Link>
                  </button>
                </div>
              </li>
            )}
          </ul>
        </div>
      </div>
      {children}
      <Footer />
    </div>
  );
}

export default HomeLayout;
