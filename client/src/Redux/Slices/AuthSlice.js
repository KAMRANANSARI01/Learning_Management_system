// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import axiosInstance from "../../Helpers/axios.js";
// import toast from "react-hot-toast";

// const initialState = {
//   isLoggedIn: localStorage.getItem("isLoggedIn") || false,
//   role: localStorage.getItem("role") || "",
//   data: localStorage.getItem("data") || {},
// };

// // creating asycThunk function to integrate with backend server

// //for register

// export const createAcount = createAsyncThunk("/auth/signup", async (data) => {
//   try {
//     console.log(data);
//     const res = axiosInstance.post("user/register", data);
//     toast.promise(res, {
//       loading: "wait! creating your account",
//       success: (data) => {
//         return data?.data?.message;
//       },
//       error: "Failed to create your account",
//     });
//     return (await res).data;
//   } catch (error) {
//     toast.error(error?.response?.data?.message);
//   }
// });

// //for login

// export const login = createAsyncThunk("/auth/login", async (data) => {
//   try {
//     // console.log(data);
//     const res = axiosInstance.post("user/login", data);
//     toast.promise(res, {
//       loading: "wait! authentication in progress...",
//       success: (data) => {
//         return data?.data?.message;
//       },
//       error: "Failed to login.",
//     });
//     return (await res).data;
//   } catch (error) {
//     toast.error(error?.response?.data?.message);
//   }
// });

// //for logout
// export const loggedout = createAsyncThunk("auth/logout", async () => {
//   try {
//     let res = axiosInstance.post("/user/logout");

//     toast.promise(res, {
//       loading: "wait! log out in progress....",
//       success: (data) => {
//         return data?.data?.message;
//       },
//       error: "Failed to log out",
//     });

//     // getting response resolved here
//     return (await res).data;

//   } catch (error) {
//     toast.error(error.message);
//   }
// });

// const authSlice = createSlice({
//   name: "auth",
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(login.fulfilled, (state, action) => {
//         localStorage.setItem("data", JSON.stringify(action?.payload?.user));
//         localStorage.setItem("isLoggedIn", true);
//         localStorage.setItem("role", action?.payload?.user?.role);
//         state.isLoggedIn = true;
//         state.data = action?.payload?.user;
//         state.role = action?.payload?.user?.role;
//       })
//       .addCase(loggedout.fulfilled, (state) => {
//         localStorage.clear();
//         state.data = {};
//         state.isLoggedIn = false;
//         state.role = "";
//       });
//   },
// });

// export const {} = authSlice.actions;

// export default authSlice.reducer;


import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosInstance from '../../Helpers/axios.js';
import toast from 'react-hot-toast';

const initialState = {
	isLoggedIn: localStorage.getItem('isLoggedIn') || false,
	role: localStorage.getItem('role') || '',
	data: localStorage.getItem('data') || {},
};

export const createAcount = createAsyncThunk('/auth/signup', async (data) => {
	try {
		console.log(data);
		const res = axiosInstance.post('user/register', data);
		toast.promise(res, {
			loading: 'Wait! Creating your account',
			success: (data) => {
				return data?.data?.message || 'Account created successfully';
			},
			error: 'Failed to create your account',
		});
		return (await res).data;
	} catch (error) {
		toast.error(error?.response?.data?.message);
	}
});

export const login = createAsyncThunk('/auth/login', async (data) => {
	try {
		const res = axiosInstance.post('user/login', data);
		toast.promise(res, {
			loading: 'Wait! Authentication in progress...',
			success: (data) => {
				return data?.data?.message || 'Login successful';
			},
			error: 'Failed to login',
		});
		return (await res).data;
	} catch (error) {
		toast.error(error?.response?.data?.message);
	}
});

export const loggedout = createAsyncThunk('auth/logout', async () => {
	try {
		let res = axiosInstance.post('/user/logout');
		toast.promise(res, {
			loading: 'Wait! Log out in progress....',
			success: (data) => {
				return data?.data?.message || 'Logout successful';
			},
			error: 'Failed to log out',
		});
		return (await res).data;
	} catch (error) {
		toast.error(error.message);
	}
});

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(login.fulfilled, (state, action) => {
				localStorage.setItem('data', JSON.stringify(action?.payload?.user));
				localStorage.setItem('isLoggedIn', true);
				localStorage.setItem('role', action?.payload?.user?.role);
				state.isLoggedIn = true;
				state.data = action?.payload?.user;
				state.role = action?.payload?.user?.role;
			})
			.addCase(loggedout.fulfilled, (state) => {
				localStorage.clear();
				state.data = {};
				state.isLoggedIn = false;
				state.role = '';
			});
	},
});

export const {} = authSlice.actions;

export default authSlice.reducer;