import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../Helpers/axios.js";
import toast from "react-hot-toast";

const initialState = {
  isLoggedIn: localStorage.getItem("isLoggedIn") || false,
  role: localStorage.getItem("role") || "",
  data: localStorage.getItem("data") || {},
  // data:
  //   localStorage.getItem("data") !== undefined
  //     ? JSON.parse(localStorage.getItem("data"))
  //     : {},
};



export const createAcount = createAsyncThunk("/auth/signup", async (data) => {
  try {
    const res = axiosInstance.post("user/register", data);
    toast.promise(res, {
      loading: "wait! creating your account",
      success: (data) => data?.data?.message,
      error: "Failed to create your account",
    });
    return (await res).data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
});

export const login = createAsyncThunk("/auth/login", async (data) => {
  try {
    const res = axiosInstance.post("user/login", data);
    toast.promise(res, {
      loading: "wait! authentication in progress...",
      success: (data) => data?.data?.message,
      error: "Failed to login.",
    });
    return (await res).data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
});

export const loggedout = createAsyncThunk("auth/logout", async () => {
  try {
    let res = axiosInstance.get("user/logout");
    toast.promise(res, {
      loading: "Wait! Log out in progress....",
      success: (data) => {
        return data?.data?.message || "Logout successful";
      },
      error: "Failed to log out",
    });
    return (await res).data;
  } catch (error) {
    toast.error(error.message);
  }
});
export const updateProfile = createAsyncThunk(
  "user/profile/update",
  async (data) => {
    try {
      let res = axiosInstance.put(`user/update/${data[0]}`, data[1]);
      toast.promise(res, {
        loading: "Wait! update in progress....",
        success: (data) => {
          return data?.data?.message;
        },
        error: "Failed to log out",
      });
      return (await res).data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  }
);
//after update we have to get new user data and also update the state to new data for this we will use extra reduser builder.
export const getUserData = createAsyncThunk("user/details", async () => {
  try {
    let res = axiosInstance.get("user/me");
    return (await res).data;
  } catch (error) {
    toast.error(error.message);
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        localStorage.setItem("data", JSON.stringify(action?.payload?.user));
        localStorage.setItem("isLoggedIn", true);
        localStorage.setItem("role", action?.payload?.user?.role);
        state.isLoggedIn = true;
        state.data = action?.payload?.user;
        state.role = action?.payload?.user?.role;
      })
      .addCase(loggedout.fulfilled, (state) => {
        localStorage.clear();
        state.data = {};
        state.isLoggedIn = false;
        state.role = "";
      })
      .addCase(getUserData.fulfilled, (state, action) => {
        localStorage.setItem("data", JSON.stringify(action?.payload?.user));
        localStorage.setItem("isLoggedIn", true);
        localStorage.setItem("role", action?.payload?.user?.role);
        state.isLoggedIn = true;
        state.data = action?.payload?.user;
        state.role = action?.payload?.user?.role;
      }); //after update profile new data is storing in state.
  },
});

export const {} = authSlice.actions;

export default authSlice.reducer;