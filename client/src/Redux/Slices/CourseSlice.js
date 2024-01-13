import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../Helpers/axios";
import toast from "react-hot-toast";

const initialState = {
  courseData: [],
};

//creating asyncthunk to get course details from server

export const getAllCourses = createAsyncThunk("/course/get", async () => {
  try {
    const response = axiosInstance.get("/course");
    toast.promise(response, {
      loading: "Wait! courses are Fetching....",
      success: "Courses loaded successfully.",
      error: "failed to fetch courses.",
    });
    return (await response).data.courses;
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
});

//create asyncthunk for creating course and connecting it to the server

export const createNewCourse = createAsyncThunk(
  "/course/create",
  async (data) => {
    try {
      //making form data for sending it to the backend server we can defind it on createCourse component also.
      const formData = new FormData();
      formData.append("title", data?.title);
      formData.append("category", data?.category);
      formData.append("createdBy", data?.createdBy);
      formData.append("description", data?.description);
      formData.append("thumbnail", data?.thumbnail);
      //now we req call to the server
      const response = axiosInstance.post("/course", formData);
      toast.promise(response, {
        loading: "Creating new course",
        success: "course created successfully!",
        error: "Failed to create course.",
      });
      return (await response).data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  }
);

// function to delete the course
export const deleteCourse = createAsyncThunk("/course/delete", async (id) => {
  try {
    const res = axiosInstance.delete(`course/${id}`);

    toast.promise(res, {
      loading: "Deleting the course...",
      success: "Courses deleted successfully",
      error: "Failed to delete course",
    });

    const response = await res;

    return response.data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
});

const courseSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllCourses.fulfilled, (state, action) => {
      if (action.payload) {
        console.log(action.payload);
        state.courseData = [...action.payload];
      }
    });
  },
});

export default courseSlice.reducer;
