import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { createNewCourse } from "../../Redux/Slices/CourseSlice";
import HomeLayout from "../../Layouts/HomeLayout.jsx";
import { AiOutlineArrowLeft } from "react-icons/ai";

const CreateCourse = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [inputData, setInputData] = useState({
    title: "",
    category: "",
    createdBy: "",
    description: "",
    thumbnail: null,
    previewImage: "",
  });

  //now storing userthumbnail function

  function handleImage(e) {
    e.preventDefault();
    const uploadImg = e.target.files[0];
    console.log(uploadImg)
    if (uploadImg) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(uploadImg);
      fileReader.addEventListener("load", function (){
        setInputData({
          ...inputData,
          previewImage: this.result,
          thumbnail: uploadImg,
        });
      });
    }
  }

  //handle user input
  const handleUserInput = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setInputData({
      ...inputData,
      [name]: value,
    });
  };

  //formsubmit function

  const formOnSubmit = async (e) => {
    e.preventDefault();
    if (
      !inputData.title ||
      !inputData.category ||
      !inputData.createdBy ||
      !inputData.description ||
      !inputData.thumbnail
    ) {
      toast.error("All feilds are mandatory");
      return;
    }

    const response = await dispatch(createNewCourse(inputData));
    if (response?.payload?.success) {
      setInputData({
        title: "",
        category: "",
        createdBy: "",
        description: "",
        thumbnail: null,
        previewImage: "",
      });
      navigate("/course");
    }
  };

  return (
    <HomeLayout>
      <div className="flex items-center justify-center h-[90vh]">
        {/* card for creating the new card */}
        <form
          onSubmit={formOnSubmit}
          className="flex flex-col justify-center gap-5 rounded-lg p-4 text-white w-[700px] h-[450px] my-10 shadow-[0_0_10px_black] relative"
        >
          <Link
            className="absolute top-8 text-2xl link text-accent cursor-pointer"
          >
            <AiOutlineArrowLeft />
          </Link>

          <h1 className="text-center text-2xl font-bold">
            <span>Create New Course</span>
          </h1>

          <main className="grid grid-cols-2 gap-x-10">
            {/* for course basic details */}
            <div className="space-y-6">
              <div>
                {/* input for image file */}
                <label className="cursor-pointer" htmlFor="image_uploads">
                  {inputData.previewImage ? (
                    <img
                      className="w-full h-44 m-auto border"
                      src={inputData.previewImage}
                      alt="preview image"
                    />
                  ) : (
                    <div className="w-full h-44 m-auto flex items-center justify-center border">
                      <h1 className="font-bold text-lg">
                        Upload your course thumbnail
                      </h1>
                    </div>
                  )}
                </label>
                <input
                  onChange={handleImage}
                  className="hidden"
                  type="file"
                  id="image_uploads"
                  name="image_uploads"
                  accept=".jpg, .jpeg, .png"
                />
              </div>

              {/* adding the title section */}
              <div className="flex flex-col gap-1">
                <label className="text-lg font-semibold" htmlFor="title">
                  Course Title
                </label>
                <input
                  required
                  type="name"
                  name="title"
                  id="title"
                  placeholder="Enter the course title"
                  className="bg-transparent px-2 py-1 border"
                  value={inputData.title}
                  onChange={handleUserInput}
                />
              </div>
            </div>

            {/* for course description and go to profile button */}

            {/* adding the course description */}
            <div className="flex flex-col gap-1">
              {/* adding the instructor */}
              <div className="flex flex-col gap-1">
                <label className="text-lg font-semibold" htmlFor="createdBy">
                  Instructor Name
                </label>
                <input
                  required
                  type="name"
                  name="createdBy"
                  id="createdBy"
                  placeholder="Enter the instructure name"
                  className="bg-transparent px-2 py-1 border"
                  value={inputData.createdBy}
                  onChange={handleUserInput}
                />
              </div>

              {/* adding the category */}
              <div className="flex flex-col gap-1">
                <label className="text-lg font-semibold" htmlFor="category">
                  Course Category
                </label>
                <input
                  required
                  type="name"
                  name="category"
                  id="category"
                  placeholder="Enter the category name"
                  className="bg-transparent px-2 py-1 border"
                  value={inputData.category}
                  onChange={handleUserInput}
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-lg font-semibold" htmlFor="description">
                  Course Description
                </label>
                <textarea
                  required
                  type="text"
                  name="description"
                  id="description"
                  placeholder="Enter the course description"
                  className="bg-transparent px-2 py-1 border h-24 overflow-y-scroll resize-none"
                  value={inputData.description}
                  onChange={handleUserInput}
                />
              </div>
            </div>
          </main>

          <button
            className="w-full bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-sm py-2 font-semibold text-lg cursor-pointer"
            type="submit"
          >
            Create Course
          </button>
        </form>
      </div>
    </HomeLayout>
  );
};

export default CreateCourse;
