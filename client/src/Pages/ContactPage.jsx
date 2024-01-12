import React, { useState } from "react";
import HomeLayout from "../Layouts/HomeLayout";
import toast from "react-hot-toast";
import { isValidEmail } from "../Helpers/regexMatcher";
import axiosInstance from "../Helpers/axios";
import { useNavigate } from "react-router-dom";

const ContactPage = () => {
  const navigate = useNavigate()
  const [inputData, setInputData] = useState({
    name: "",
    email: "",
    message: "",
  });

  async function handleUserInput(e) {
    const { name, value } = e.target;
    setInputData({
      ...inputData,
      [name]: value,
    });
  }

  //connecting to backend and adding onsubmit function

  async function onFormSubmit(e) {
    e.preventDefault();
    //adding some validations

    if (!inputData.name || !inputData.email || !inputData.message) {
      toast.error("All feilds are mandatory.");
      return;
    }
    if (!isValidEmail(inputData.email)) {
      toast.error("please enter valid email.");
      return;
    }

    try {
      const res = axiosInstance.post("/contact", inputData);
      toast.promise(res, {
        loading: "submitting your response ",
        success: "Form submitted successfully",
        error: "failed to submit",
      });

      const contactResponse = await res;
      console.log(contactResponse)
      if (contactResponse?.data?.success) {
        setInputData({
          name: "",
          email: "",
          message: "",
        });
        navigate("/")
      }
    } catch (error) {
      console.log(error)
      toast.error("Operation failed...")
    }
  }

  return (
    <HomeLayout>
      <div className="flex items-center justify-center h-[90vh]">
        <form
          onSubmit={onFormSubmit}
          noValidate
          className="flex flex-col items-center justify-center gap-2 p-5 rounded-md text-white shadow-[0_0_10px_black] w-[22rem]"
        >
          <h1 className="text-3xl font-semibold">Contact Form</h1>
          <div className="flex flex-col w-full gap-1">
            <label className="text-xl font-semibold" htmlFor="name">
              Name
            </label>
            <input
              className="bg-transparent border px-2 py-1 rounded-sm"
              id="name"
              type="text"
              name="name"
              placeholder="Enter your name"
              value={inputData.name}
              onChange={handleUserInput}
            />
          </div>

          <div className="flex flex-col w-full gap-1">
            <label className="text-xl font-semibold" htmlFor="email">
              Email
            </label>
            <input
              className="bg-transparent border px-2 py-1 rounded-sm"
              id="email"
              type="email"
              name="email"
              placeholder="Enter the email"
              value={inputData.email}
              onChange={handleUserInput}
            />
          </div>

          <div className="flex flex-col w-full gap-1">
            <label className="text-xl font-semibold" htmlFor="message">
              Message
            </label>
            <textarea
              className="bg-transparent border px-2 py-1 rounded-sm resize-none h-40"
              name="message"
              id="message"
              placeholder="Enter your message"
              value={inputData.message}
              onChange={handleUserInput}
            ></textarea>
          </div>

          <button
            className="w-full bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-sm py-2 font-semibold text-lg cursor-pointer"
            type="submit"
          >
            Submit
          </button>
        </form>
      </div>
    </HomeLayout>
  );
};

export default ContactPage;
