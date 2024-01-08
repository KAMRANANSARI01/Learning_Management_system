import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import HomeLayout from "../Layouts/HomeLayout.jsx";
import { BsPersonCircle } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { createAcount } from "../Redux/Slices/AuthSlice.js";
import { isValidEmail, isValidPassword } from "../Helpers/regexMatcher.js";

const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [previewImage, setPreviewImage] = useState("");

  const [signupData, setSignupData] = useState({
    fullName: "",
    email: "",
    password: "",
    avatar: "",
  });

  function handleUserInput(e) {
    const { name, value } = e.target;
    setSignupData({
      ...signupData,
      [name]: value,
    });
  }

  function getImage(event) {
    event.preventDefault();
    //getting image
    const uploadImg = event.target.files[0];

    if (uploadImg) {
      setSignupData({
        ...signupData,
        avatar: uploadImg,
      });
    }

    const fileReader = new FileReader();
    fileReader.readAsDataURL(uploadImg);
    fileReader.addEventListener("load", function () {
      console.log(this.result);
      setPreviewImage(this.result);
    });
  }

  //adding validation

  async function createNewAccount(event) {
    event.preventDefault();
    if (
      !signupData.fullName ||
      !signupData.email ||
      !signupData.password ||
      !signupData.avatar
    ) {
      toast.error("All feilds are mandatory.");
      return;
    }

    //checking name length
    if (signupData.fullName.length < 5) {
      toast.error("name length should be atleast 5 character");
      return;
    }

    //email validation
    if (
      !isValidEmail(signupData.email)
    ) {
      toast.error("Invalid email Id");
      return;
    }
    //Password validation
    if (
      !isValidPassword(signupData.password)
      )
     {
      toast.error(
        "Password must be 6-16 character long with atleast a Number and a special character"
      );
      return;
    }

    //making a form data for sending into server.
    const formData = new FormData();
    formData.append("fullName", signupData.fullName);
    formData.append("email", signupData.email);
    formData.append("password", signupData.password);
    formData.append("avatar", signupData.avatar);

    //making dispatch action
    console.log(formData);
    const response = await dispatch(createAcount(formData));
    console.log(response);
  if (response?.payload?.success) navigate("/");

    setSignupData({
      fullName: "",
      email: "",
      password: "",
      avatar: "",
    });
    setPreviewImage("");
  }

  return (
    <HomeLayout>
      <div className="flex items-center justify-center h-[90vh] w-full">
        <form
          onSubmit={createNewAccount}
          className="flex flex-col items-center justify-center p-4 rounded-large shadow-[0_0_10px_black]  text-white w-[70%] sm:w-[55%] md:w-[40%] lg:w-[25%] "
        >
          <div className="w-full ">
            <h1 className="font-bold text-2xl text-center mb-4">
              Register Here
            </h1>
            <label htmlFor="image_uploads" className="w-24 h-24 cursor-pointer">
              {/* we want to show img if available otherwise show a imgIcon */}
              {previewImage ? (
                <img
                  className="w-24 h-24 rounded-full m-auto"
                  src={previewImage}
                  alt="userImg"
                />
              ) : (
                <BsPersonCircle className="w-24 h-24 rounded-full m-auto" />
              )}
            </label>
            {/* now we add the input for uploading img */}
            <input
              onChange={getImage}
              type="file"
              id="image_uploads"
              className="hidden"
              accept=".jpg, .jpeg, .png, .svg"
            />
            <div className="flex flex-col gap-1">
              <label htmlFor="fullName">Full Name</label>
              <input
                type="text"
                required
                name="fullName"
                id="fullName"
                placeholder="Enter your name.."
                className="bg-transparent px-2 py-1 mb-2 border"
                onChange={handleUserInput}
                value={signupData.fullName}
              />
            </div>
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
                value={signupData.email}
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
                value={signupData.password}
              />
            </div>
            <button
              type="submit"
              className="w-full py-1 px-3 rounded-sm bg-yellow-500 mt-9 font-semibold text-lg hover:bg-yellow-600"
            >
              Create Account
            </button>
            <p className="text-center mt-2">
              Already have an account ?{" "}
              <Link to="/login" className="link hover:text-yellow-500">
                Login
              </Link>
            </p>
          </div>
        </form>
      </div>
    </HomeLayout>
  );
};

export default SignUp;
