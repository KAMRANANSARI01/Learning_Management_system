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

const courseSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllCourses.fulfilled, (state,action)=>{
        if(action.payload){
            console.log(action.payload)
            state.courseData = [...action.payload];
        }
    })
  },
});

export default courseSlice.reducer;
